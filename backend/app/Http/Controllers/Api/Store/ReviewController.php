<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Review;
use App\Models\Order;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $reviews = $request->user()->reviews()->with('book')->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $reviews]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'order_id' => 'required|exists:orders,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string'
        ]);

        // Check if user has bought this book and order is completed
        $hasBought = Order::where('user_id', $request->user()->id)
            ->where('id', $request->order_id)
            ->where('status', 'Completed')
            ->whereHas('items', function ($q) use ($request) {
                $q->where('book_id', $request->book_id);
            })
            ->exists();

        if (!$hasBought) {
            return response()->json(['message' => 'You can only review books you have purchased and received.'], 403);
        }

        // Check if already reviewed
        $existingReview = Review::where('user_id', $request->user()->id)
            ->where('book_id', $request->book_id)
            ->first();

        if ($existingReview) {
            return response()->json(['message' => 'You have already reviewed this book.'], 403);
        }

        $review = $request->user()->reviews()->create($validated);

        return response()->json(['message' => 'Review submitted successfully', 'data' => $review]);
    }

    public function getProductReviews($bookId)
    {
        $reviews = Review::with('user:id,name,avatar')->where('book_id', $bookId)->latest()->get();
        
        $averageRating = $reviews->avg('rating');
        $count = $reviews->count();

        return response()->json([
            'data' => $reviews,
            'meta' => [
                'average_rating' => round($averageRating, 1),
                'total_reviews' => $count
            ]
        ]);
    }
}
