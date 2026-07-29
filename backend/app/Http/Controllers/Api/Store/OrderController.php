<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Services\PaymentService;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with(['items.book', 'shippingAddress'])->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $orders]);
    }

    public function show(Request $request, $id)
    {
        $order = $request->user()->orders()
                         ->with(['items.book', 'payment', 'shippingAddress'])
                         ->findOrFail($id);
                         
        return response()->json(['data' => $order]);
    }

    public function mockPaymentCallback(Request $request, PaymentService $paymentService)
    {
        $request->validate([
            'transaction_number' => 'required|string',
            'status' => 'required|in:success,failed,expired'
        ]);

        $payment = $paymentService->handleCallback($request->transaction_number, $request->status);

        return response()->json([
            'message' => 'Payment status updated',
            'data' => $payment
        ]);
    }
}
