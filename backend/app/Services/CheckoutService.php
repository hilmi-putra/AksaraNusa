<?php

namespace App\Services;

use App\Models\UserAddress;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Exception;

class CheckoutService
{
    protected $cartService;
    protected $orderService;
    protected $paymentService;

    public function __construct(CartService $cartService, OrderService $orderService, PaymentService $paymentService)
    {
        $this->cartService = $cartService;
        $this->orderService = $orderService;
        $this->paymentService = $paymentService;
    }

    /**
     * Calculate checkout summary
     */
    public function getSummary($user, $addressId = null, $shippingCost = 0, $useInsurance = false)
    {
        $cartDetails = $this->cartService->getCartDetails($user);
        
        if ($cartDetails['items']->isEmpty()) {
            throw new Exception("Cart is empty");
        }

        $subtotal = $cartDetails['subtotal'];
        $totalWeight = $cartDetails['total_weight'];
        
        $shippingFee = (int) $shippingCost;
        $insuranceFee = 0;
        $tax = 0;

        if ($useInsurance) {
            // 0.2% of subtotal, minimum Rp 1.000
            $insuranceFee = (int) ceil($subtotal * 0.002);
            if ($insuranceFee < 1000) {
                $insuranceFee = 1000;
            }
        }

        $discount = 0; // Voucher logic can be integrated later

        $grandTotal = $subtotal + $shippingFee + $insuranceFee + $tax - $discount;

        return [
            'subtotal' => $subtotal,
            'shipping_fee' => $shippingFee,
            'insurance_fee' => $insuranceFee,
            'discount' => $discount,
            'tax' => $tax,
            'grand_total' => $grandTotal,
            'items' => $cartDetails['items'],
            'total_weight' => $totalWeight,
        ];
    }

    /**
     * Process checkout to create order + get snap token
     */
    public function processCheckout($user, $data)
    {
        return DB::transaction(function () use ($user, $data) {
            $shippingCost = $data['shipping_cost'] ?? 0;
            $useInsurance = $data['use_insurance'] ?? false;

            $summary = $this->getSummary(
                $user, 
                $data['address_id'], 
                $shippingCost,
                $useInsurance
            );

            // Fetch shipping details
            $address = UserAddress::findOrFail($data['address_id']);
            
            $shippingMethod = null;
            if (isset($data['shipping_courier']) && isset($data['shipping_service'])) {
                $shippingMethod = $data['shipping_courier'] . ' ' . $data['shipping_service'];
            }

            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'invoice_number' => $this->orderService->generateInvoiceNumber(),
                'status' => 'Pending',
                'subtotal' => $summary['subtotal'],
                'shipping_fee' => $summary['shipping_fee'],
                'insurance_fee' => $summary['insurance_fee'],
                'discount' => $summary['discount'],
                'tax' => $summary['tax'],
                'grand_total' => $summary['grand_total'],
                'shipping_address_id' => $address->id,
                'shipping_method' => $shippingMethod,
            ]);

            // Create Order Items
            foreach ($summary['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $item['book_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['subtotal'],
                ]);
            }

            // Reduce Stock
            $this->orderService->reduceStock($order);

            // Clear Cart
            $this->cartService->clearCart($user);

            // Create Midtrans Snap Transaction
            $paymentData = $this->paymentService->createSnapTransaction($order);

            return [
                'order' => $order,
                'snap_token' => $paymentData['snap_token'],
                'redirect_url' => $paymentData['redirect_url'],
                'client_key' => $paymentData['client_key'],
                'transaction_number' => $paymentData['transaction_number'] ?? null,
            ];
        });
    }
}
