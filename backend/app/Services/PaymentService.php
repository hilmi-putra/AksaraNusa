<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Str;
use Midtrans\Config as MidtransConfig;
use Midtrans\Snap;
use Midtrans\Notification;
use Exception;

class PaymentService
{
    public function __construct()
    {
        // Configure Midtrans
        MidtransConfig::$serverKey = config('midtrans.server_key');
        MidtransConfig::$clientKey = config('midtrans.client_key');
        MidtransConfig::$isProduction = config('midtrans.is_production', false);
        MidtransConfig::$isSanitized = true;
        MidtransConfig::$is3ds = config('midtrans.credit_card.secure', true);
    }

    /**
     * Create Midtrans Snap Transaction and return snap token
     */
    public function createSnapTransaction(Order $order): array
    {
        $order->load(['items.book', 'user', 'shippingAddress']);

        $transactionNumber = 'MP-' . date('Ymd') . '-' . strtoupper(Str::random(8));

        // Build item details
        $itemDetails = [];
        foreach ($order->items as $item) {
            $itemDetails[] = [
                'id' => 'BOOK-' . $item->book_id,
                'price' => (int) $item->price,
                'quantity' => $item->quantity,
                'name' => Str::limit($item->book->title ?? 'Book', 50),
            ];
        }

        // Add shipping fee as item
        if ($order->shipping_fee > 0) {
            $itemDetails[] = [
                'id' => 'SHIPPING',
                'price' => (int) $order->shipping_fee,
                'quantity' => 1,
                'name' => 'Ongkos Kirim (' . ($order->shipping_method ?? 'Standard') . ')',
            ];
        }

        // Add insurance as item
        if ($order->insurance_fee > 0) {
            $itemDetails[] = [
                'id' => 'INSURANCE',
                'price' => (int) $order->insurance_fee,
                'quantity' => 1,
                'name' => 'Asuransi Pengiriman',
            ];
        }

        // Add tax as item
        if ($order->tax > 0) {
            $itemDetails[] = [
                'id' => 'TAX',
                'price' => (int) $order->tax,
                'quantity' => 1,
                'name' => 'Pajak',
            ];
        }

        // Discount as negative item
        if ($order->discount > 0) {
            $itemDetails[] = [
                'id' => 'DISCOUNT',
                'price' => -(int) $order->discount,
                'quantity' => 1,
                'name' => 'Diskon',
            ];
        }

        // Customer details
        $user = $order->user;
        $address = $order->shippingAddress;

        $customerDetails = [
            'first_name' => $user->name ?? 'Customer',
            'email' => $user->email ?? 'customer@megapress.id',
            'phone' => $user->phone ?? '',
        ];

        if ($address) {
            $customerDetails['shipping_address'] = [
                'first_name' => $address->recipient_name,
                'phone' => $address->phone,
                'address' => $address->address,
                'city' => $address->regency_name ?? 'Unknown',
                'postal_code' => $address->postal_code ?? '',
                'country_code' => 'IDN',
            ];
        }

        // Transaction params
        $params = [
            'transaction_details' => [
                'order_id' => $transactionNumber,
                'gross_amount' => (int) $order->grand_total,
            ],
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
            'enabled_payments' => config('midtrans.enabled_payments', []),
            'callbacks' => [
                'finish' => config('app.frontend_url', 'http://localhost:3000') . "/checkout/success?order_id={$order->id}",
            ],
        ];

        try {
            $snapTransaction = Snap::createTransaction($params);
            $snapToken = $snapTransaction->token;
            $redirectUrl = $snapTransaction->redirect_url;
        } catch (Exception $e) {
            throw new Exception('Failed to create payment: ' . $e->getMessage());
        }

        // Create payment record
        $payment = Payment::create([
            'order_id' => $order->id,
            'payment_method' => 'Midtrans',
            'status' => 'Pending',
            'transaction_number' => $transactionNumber,
            'snap_token' => $snapToken,
            'amount' => $order->grand_total,
            'response_payload' => [
                'snap_token' => $snapToken,
                'redirect_url' => $redirectUrl,
            ],
        ]);

        return [
            'snap_token' => $snapToken,
            'redirect_url' => $redirectUrl,
            'transaction_number' => $transactionNumber,
            'payment_id' => $payment->id,
            'client_key' => config('midtrans.client_key'),
        ];
    }

    /**
     * Handle Midtrans notification webhook
     */
    public function handleNotification(array $notificationData): Payment
    {
        $orderId = $notificationData['order_id'] ?? null;
        $transactionStatus = $notificationData['transaction_status'] ?? null;
        $fraudStatus = $notificationData['fraud_status'] ?? null;
        $paymentType = $notificationData['payment_type'] ?? null;

        if (!$orderId) {
            throw new Exception('Invalid notification: missing order_id');
        }

        // Verify signature
        $signatureKey = $notificationData['signature_key'] ?? '';
        $serverKey = config('midtrans.server_key');
        $statusCode = $notificationData['status_code'] ?? '';
        $grossAmount = $notificationData['gross_amount'] ?? '';

        $expectedSignature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        if ($signatureKey !== $expectedSignature) {
            throw new Exception('Invalid signature key');
        }

        $payment = Payment::where('transaction_number', $orderId)->firstOrFail();
        $order = $payment->order;
        $orderService = new OrderService();

        // Map payment type to human-readable name
        $methodMap = [
            'credit_card' => 'Credit Card',
            'bank_transfer' => 'Bank Transfer',
            'echannel' => 'Mandiri Bill',
            'gopay' => 'GoPay',
            'shopeepay' => 'ShopeePay',
            'qris' => 'QRIS',
            'cstore' => 'Convenience Store',
        ];

        $payment->payment_method = $methodMap[$paymentType] ?? $paymentType;
        $payment->response_payload = $notificationData;

        if ($transactionStatus === 'capture') {
            if ($fraudStatus === 'accept') {
                $payment->status = 'Paid';
                $payment->payment_date = now();
                $orderService->updateStatus($order, 'Processing');
            } elseif ($fraudStatus === 'challenge') {
                $payment->status = 'Pending';
            }
        } elseif ($transactionStatus === 'settlement') {
            $payment->status = 'Paid';
            $payment->payment_date = now();
            $orderService->updateStatus($order, 'Processing');
        } elseif ($transactionStatus === 'pending') {
            $payment->status = 'Pending';
        } elseif (in_array($transactionStatus, ['deny', 'cancel'])) {
            $payment->status = 'Failed';
            $orderService->updateStatus($order, 'Failed');
        } elseif ($transactionStatus === 'expire') {
            $payment->status = 'Expired';
            $orderService->updateStatus($order, 'Expired');
        } elseif ($transactionStatus === 'refund' || $transactionStatus === 'partial_refund') {
            $payment->status = 'Refunded';
            $payment->response_payload = array_merge($payment->response_payload ?? [], $notificationData);
        }

        $payment->save();

        return $payment;
    }

    /**
     * Manually sync payment status from Midtrans API (useful for local development where webhooks fail)
     */
    public function syncStatus(string $transactionNumber): Payment
    {
        $payment = Payment::where('transaction_number', $transactionNumber)->firstOrFail();
        
        try {
            $statusResponse = \Midtrans\Transaction::status($transactionNumber);
            $statusData = (array) $statusResponse;
            
            // Add a mock signature key to pass the handleNotification check, or just process it directly.
            // Since handleNotification requires a valid signature, we'll bypass it and update directly.
            $transactionStatus = $statusData['transaction_status'] ?? null;
            $fraudStatus = $statusData['fraud_status'] ?? null;
            $paymentType = $statusData['payment_type'] ?? null;

            $orderService = new OrderService();
            $order = $payment->order;

            if ($paymentType) {
                $methodMap = [
                    'credit_card' => 'Credit Card',
                    'bank_transfer' => 'Bank Transfer',
                    'echannel' => 'Mandiri Bill',
                    'gopay' => 'GoPay',
                    'shopeepay' => 'ShopeePay',
                    'qris' => 'QRIS',
                    'cstore' => 'Convenience Store',
                ];
                $payment->payment_method = $methodMap[$paymentType] ?? $paymentType;
            }

            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'challenge') {
                    $payment->status = 'Pending';
                } else if ($fraudStatus == 'accept') {
                    $payment->status = 'Paid';
                    $orderService->updateStatus($order, 'Processing');
                }
            } else if ($transactionStatus == 'settlement') {
                $payment->status = 'Paid';
                $orderService->updateStatus($order, 'Processing');
            } else if ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
                $payment->status = 'Failed';
                $orderService->updateStatus($order, 'Cancelled');
            } else if ($transactionStatus == 'pending') {
                $payment->status = 'Pending';
            }

            $payment->response_payload = array_merge($payment->response_payload ?? [], $statusData);
            $payment->save();

            return $payment;
        } catch (Exception $e) {
            throw new Exception('Failed to sync status from Midtrans: ' . $e->getMessage());
        }
    }

    /**
     * Get Midtrans client key for frontend
     */
    public function getClientKey(): string
    {
        return config('midtrans.client_key', '');
    }

    /**
     * Get Midtrans Snap URL for frontend script
     */
    public function getSnapUrl(): string
    {
        return config('midtrans.snap_url', 'https://app.sandbox.midtrans.com/snap/snap.js');
    }
}
