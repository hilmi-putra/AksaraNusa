<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderShipment;
use App\Models\OrderTimeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShipmentController extends Controller
{
    /**
     * Get a list of orders that require shipping management.
     * Includes orders that are 'Ready to Pack', 'Shipped', or 'Completed'.
     */
    public function index(Request $request)
    {
        $query = Order::with(['user', 'shipment', 'shippingAddress'])
                      ->whereIn('status', ['Ready to Pack', 'Shipped', 'Completed']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('shipment', function ($qs) use ($search) {
                      $qs->where('tracking_number', 'like', "%{$search}%");
                  });
            });
        }

        $perPage = $request->get('per_page', 15);
        $orders = $query->orderBy('updated_at', 'desc')->paginate($perPage);

        return response()->json($orders);
    }

    /**
     * Update tracking number and courier for an order.
     * This will automatically create an OrderShipment if it doesn't exist,
     * and update the order status to 'Shipped'.
     */
    public function updateTracking(Request $request, string $orderId)
    {
        $request->validate([
            'courier' => 'required|string',
            'tracking_number' => 'required|string',
            'service' => 'nullable|string'
        ]);

        $order = Order::findOrFail($orderId);

        DB::beginTransaction();
        try {
            // Create or update shipment
            $shipment = OrderShipment::updateOrCreate(
                ['order_id' => $order->id],
                [
                    'courier' => $request->courier,
                    'tracking_number' => $request->tracking_number,
                    'service' => $request->service,
                    'status' => 'In Transit'
                ]
            );

            // Update order status if not already shipped or completed
            if (in_array($order->status, ['Ready to Pack', 'Processing', 'Paid'])) {
                $order->status = 'Shipped';
                $order->save();

                OrderTimeline::create([
                    'order_id' => $order->id,
                    'status' => 'Shipped',
                    'description' => "Pesanan telah dikirim melalui {$request->courier} dengan nomor resi {$request->tracking_number}."
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Tracking information updated successfully',
                'shipment' => $shipment,
                'order' => $order
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to update tracking', 'error' => $e->getMessage()], 500);
        }
    }
}
