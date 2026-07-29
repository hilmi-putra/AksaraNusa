<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Wishlist;
use App\Models\Book;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlists = Wishlist::with('book.author')->where('user_id', $request->user()->id)->get();
        return response()->json(['data' => $wishlists]);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        $wishlist = Wishlist::where('user_id', $request->user()->id)
                            ->where('book_id', $request->book_id)
                            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Removed from wishlist', 'is_wishlisted' => false]);
        } else {
            Wishlist::create([
                'user_id' => $request->user()->id,
                'book_id' => $request->book_id,
            ]);
            return response()->json(['message' => 'Added to wishlist', 'is_wishlisted' => true]);
        }
    }

    public function check(Request $request, $bookId)
    {
        $exists = Wishlist::where('user_id', $request->user()->id)
                            ->where('book_id', $bookId)
                            ->exists();
                            
        return response()->json(['is_wishlisted' => $exists]);
    }
}
