<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function summary(Request $request)
    {
        $user = $request->user();
        
        $booksPurchased = $user->orders()->where('status', 'Completed')->withCount('items')->get()->sum('items_count');

        $stats = [
            'total_orders' => $user->orders()->count(),
            'pending_payment' => $user->orders()->where('status', 'Pending')->count(),
            'books_purchased' => $booksPurchased,
            'wishlist_count' => $user->wishlists()->count(),
            'review_count' => $user->reviews()->count(),
        ];
        
        $recentOrders = $user->orders()->orderByDesc('created_at')->take(3)->get();

        return response()->json([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'phone' => $user->phone,
            ],
            'stats' => $stats,
            'recent_orders' => $recentOrders,
        ]);
    }
}
