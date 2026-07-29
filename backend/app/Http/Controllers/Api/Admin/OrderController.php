<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderTimeline;
use Illuminate\Http\Request;
use App\Http\Resources\AdminOrderResource;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'payment', 'shippingAddress']);

        // Filtering by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by invoice or customer name
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($qu) use ($search) {
                      $qu->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        // Sorting
        $sort_by = $request->get('sort_by', 'created_at');
        $sort_dir = $request->get('sort_dir', 'desc');
        
        $allowedSorts = ['created_at', 'grand_total', 'status', 'invoice_number'];
        if (in_array($sort_by, $allowedSorts)) {
            $query->orderBy($sort_by, $sort_dir);
        }

        $perPage = $request->get('per_page', 15);
        $orders = $query->paginate($perPage);

        return AdminOrderResource::collection($orders);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with([
            'user', 
            'shippingAddress', 
            'payment', 
            'items.book', 
            'timeline', 
            'shipment', 
            'refundRequest'
        ])->findOrFail($id);

        return new AdminOrderResource($order);
    }

    /**
     * Update order status.
     */
    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|string',
            'description' => 'nullable|string'
        ]);

        $order = Order::findOrFail($id);
        
        // Prevent changing status if cancelled or refunded
        if (in_array($order->status, ['Cancelled', 'Refunded'])) {
            return response()->json(['message' => 'Cannot update status of a cancelled or refunded order.'], 400);
        }

        DB::beginTransaction();
        try {
            $oldStatus = $order->status;
            $order->status = $request->status;
            $order->save();

            // Create timeline log
            OrderTimeline::create([
                'order_id' => $order->id,
                'status' => $request->status,
                'description' => $request->description ?? "Status pesanan diubah dari {$oldStatus} menjadi {$request->status} oleh Admin."
            ]);

            DB::commit();
            return response()->json([
                'message' => 'Order status updated successfully',
                'order' => new AdminOrderResource($order->load('timeline'))
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to update status', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Cancel an order manually by admin.
     */
    public function cancel(Request $request, string $id)
    {
        $request->validate([
            'reason' => 'required|string'
        ]);

        $order = Order::findOrFail($id);
        
        if (in_array($order->status, ['Cancelled', 'Refunded', 'Completed', 'Shipped'])) {
            return response()->json(['message' => 'Order cannot be cancelled in its current state.'], 400);
        }

        DB::beginTransaction();
        try {
            $order->status = 'Cancelled';
            $order->save();

            OrderTimeline::create([
                'order_id' => $order->id,
                'status' => 'Cancelled',
                'description' => "Pesanan dibatalkan oleh Admin. Alasan: {$request->reason}"
            ]);

            // Optional: If payment is Paid, trigger refund via midtrans here later.

            DB::commit();
            return response()->json([
                'message' => 'Order cancelled successfully',
                'order' => new AdminOrderResource($order->load('timeline'))
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to cancel order', 'error' => $e->getMessage()], 500);
        }
    }
}
