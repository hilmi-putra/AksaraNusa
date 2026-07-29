<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\CheckoutService;
use Exception;

class CheckoutController extends Controller
{
    protected $checkoutService;

    public function __construct(CheckoutService $checkoutService)
    {
        $this->checkoutService = $checkoutService;
    }

    public function summary(Request $request)
    {
        try {
            $data = $this->checkoutService->getSummary(
                $request->user(),
                $request->address_id,
                $request->shipping_cost ?? 0,
                $request->boolean('use_insurance', false)
            );
            return response()->json(['data' => $data]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function process(Request $request)
    {
        $request->validate([
            'address_id' => 'required|exists:user_addresses,id',
            'shipping_cost' => 'required|integer|min:0',
            'shipping_courier' => 'required|string',
            'shipping_service' => 'required|string',
            'shipping_etd' => 'nullable|string',
            'use_insurance' => 'boolean'
        ]);

        try {
            $result = $this->checkoutService->processCheckout($request->user(), $request->all());
            return response()->json([
                'message' => 'Order created successfully',
                'data' => [
                    'order_id' => $result['order']->id,
                    'invoice_number' => $result['order']->invoice_number,
                    'snap_token' => $result['snap_token'],
                    'redirect_url' => $result['redirect_url'],
                    'client_key' => $result['client_key'],
                    'transaction_number' => $result['transaction_number'],
                ]
            ]);
        } catch (Exception $e) {
            \Illuminate\Support\Facades\Log::error('Checkout Error: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
