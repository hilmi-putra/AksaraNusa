<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\CartService;
use Exception;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index(Request $request)
    {
        return response()->json([
            'data' => $this->cartService->getCartDetails($request->user())
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        try {
            $data = $this->cartService->addItem($request->user(), $request->book_id, $request->quantity ?? 1);
            return response()->json(['message' => 'Item added to cart', 'data' => $data]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function updateQuantity(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0'
        ]);

        try {
            $data = $this->cartService->updateItemQuantity($request->user(), $itemId, $request->quantity);
            return response()->json(['message' => 'Cart updated', 'data' => $data]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function remove(Request $request, $itemId)
    {
        $data = $this->cartService->removeItem($request->user(), $itemId);
        return response()->json(['message' => 'Item removed from cart', 'data' => $data]);
    }

    public function clear(Request $request)
    {
        $this->cartService->clearCart($request->user());
        return response()->json(['message' => 'Cart cleared']);
    }
}
