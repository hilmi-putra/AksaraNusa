<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\RefundRequest;
use App\Models\OrderTimeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Customer requests a refund for an order.
     */
    public function requestRefund(Request $request, string $id)
    {
        $request->validate([
            'reason' => 'required|string',
        ]);

        $order = Order::where('user_id', $request->user()->id)->findOrFail($id);

        if (!in_array($order->status, ['Paid', 'Processing', 'Ready to Pack', 'Shipped', 'Completed'])) {
            return response()->json(['message' => 'Order is not eligible for refund.'], 400);
        }

        if ($order->refundRequest) {
            return response()->json(['message' => 'A refund request already exists for this order.'], 400);
        }

        DB::beginTransaction();
        try {
            // Upload proof if any
            $proofPath = null;
            if ($request->hasFile('proof_image')) {
                $proofPath = collect($request->file('proof_image'))->first()->store('refunds', 'public');
            }

            RefundRequest::create([
                'order_id' => $order->id,
                'reason' => $request->reason,
                'proof_image' => $proofPath,
                'status' => 'Pending'
            ]);

            $order->status = 'Refund Requested';
            $order->save();

            OrderTimeline::create([
                'order_id' => $order->id,
                'status' => 'Refund Requested',
                'description' => "Pelanggan mengajukan pengembalian dana. Alasan: {$request->reason}"
            ]);

            DB::commit();
            return response()->json(['message' => 'Refund requested successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to request refund', 'error' => $e->getMessage()], 500);
        }
    }
}
