<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\RefundRequest;
use App\Models\Order;
use App\Models\OrderTimeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefundController extends Controller
{
    /**
     * Display a listing of refund requests.
     */
    public function index(Request $request)
    {
        $query = RefundRequest::with(['order.user', 'order.payment']);

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('order', function ($qo) use ($search) {
                $qo->where('invoice_number', 'like', "%{$search}%")
                   ->orWhereHas('user', function ($qu) use ($search) {
                       $qu->where('name', 'like', "%{$search}%");
                   });
            });
        }

        $perPage = $request->get('per_page', 15);
        $refunds = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($refunds);
    }

    /**
     * Resolve (Approve or Reject) a refund request.
     */
    public function resolve(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:Approved,Rejected',
            'admin_notes' => 'nullable|string'
        ]);

        $refund = RefundRequest::findOrFail($id);

        if ($refund->status !== 'Pending') {
            return response()->json(['message' => 'This request has already been resolved.'], 400);
        }

        DB::beginTransaction();
        try {
            $refund->status = $request->status;
            $refund->admin_notes = $request->admin_notes;
            $refund->save();

            $order = $refund->order;
            
            if ($request->status === 'Approved') {
                $order->status = 'Refunded';
                $order->save();
                
                OrderTimeline::create([
                    'order_id' => $order->id,
                    'status' => 'Refunded',
                    'description' => "Pengajuan refund disetujui oleh admin. Catatan: {$request->admin_notes}"
                ]);
            } else {
                OrderTimeline::create([
                    'order_id' => $order->id,
                    'status' => $order->status,
                    'description' => "Pengajuan refund ditolak oleh admin. Catatan: {$request->admin_notes}"
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Refund request resolved successfully',
                'refund' => $refund->load(['order.user'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to resolve refund', 'error' => $e->getMessage()], 500);
        }
    }
}
