<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of all customers with aggregated order stats.
     */
    public function index(Request $request)
    {
        $query = User::where('role', 'user')
            ->withCount('orders')
            ->withSum('orders', 'grand_total');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 15);
        $customers = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json($customers);
    }

    /**
     * Display a specific customer's details and history.
     */
    public function show(string $id)
    {
        $customer = User::where('role', 'user')
            ->with(['addresses', 'orders' => function($q) {
                $q->orderBy('created_at', 'desc')->take(10);
            }])
            ->withCount('orders')
            ->withSum('orders', 'grand_total')
            ->findOrFail($id);

        return response()->json($customer);
    }
}
