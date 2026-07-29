<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Exception;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Get Midtrans config for frontend
     */
    public function config()
    {
        return response()->json([
            'client_key' => $this->paymentService->getClientKey(),
            'snap_url' => $this->paymentService->getSnapUrl(),
        ]);
    }

    /**
     * Handle Midtrans notification webhook (no auth required)
     */
    public function notification(Request $request)
    {
        try {
            $payment = $this->paymentService->handleNotification($request->all());
            return response()->json(['message' => 'OK', 'payment_status' => $payment->status]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
    /**
     * Sync Midtrans payment status manually (frontend call on success/pending)
     */
    public function sync($orderId)
    {
        try {
            $payment = $this->paymentService->syncStatus($orderId);
            return response()->json(['message' => 'Status synced', 'payment_status' => $payment->status]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
