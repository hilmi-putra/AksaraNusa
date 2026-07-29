<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Book;
use Exception;

class CartService
{
    /**
     * Get or create user cart
     */
    public function getCart($user)
    {
        return Cart::firstOrCreate(['user_id' => $user->id]);
    }

    /**
     * Get cart details with items and subtotal
     */
    public function getCartDetails($user)
    {
        $cart = $this->getCart($user);
        $cart->load('items.book.author');
        
        $items = $cart->items->map(function ($item) {
            $book = $item->book;
            $price = $book->final_price;
            $subtotal = $price * $item->quantity;
            
            return [
                'id' => $item->id,
                'book_id' => $book->id,
                'title' => $book->title,
                'author' => $book->author->name ?? null,
                'cover_image' => $book->cover_image,
                'price' => $price,
                'quantity' => $item->quantity,
                'subtotal' => $subtotal,
                'stock' => $book->stock,
                'weight' => $book->weight,
            ];
        });

        $subtotal = $items->sum('subtotal');
        $totalWeight = $items->sum(function ($item) {
            return $item['weight'] * $item['quantity'];
        });

        return [
            'id' => $cart->id,
            'items' => $items,
            'subtotal' => $subtotal,
            'total_weight' => $totalWeight,
            'item_count' => $items->sum('quantity'),
        ];
    }

    /**
     * Add item to cart
     */
    public function addItem($user, $bookId, $quantity = 1)
    {
        $book = Book::findOrFail($bookId);
        
        if ($book->stock < $quantity) {
            throw new Exception("Insufficient stock. Available: {$book->stock}");
        }

        $cart = $this->getCart($user);
        $cartItem = CartItem::where('cart_id', $cart->id)->where('book_id', $bookId)->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;
            if ($book->stock < $newQuantity) {
                throw new Exception("Insufficient stock. Available: {$book->stock}");
            }
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'book_id' => $bookId,
                'quantity' => $quantity,
            ]);
        }

        return $this->getCartDetails($user);
    }

    /**
     * Update item quantity
     */
    public function updateItemQuantity($user, $itemId, $quantity)
    {
        $cart = $this->getCart($user);
        $cartItem = CartItem::where('cart_id', $cart->id)->where('id', $itemId)->firstOrFail();
        
        $book = $cartItem->book;
        if ($book->stock < $quantity) {
            throw new Exception("Insufficient stock. Available: {$book->stock}");
        }

        if ($quantity <= 0) {
            $cartItem->delete();
        } else {
            $cartItem->update(['quantity' => $quantity]);
        }

        return $this->getCartDetails($user);
    }

    /**
     * Remove item from cart
     */
    public function removeItem($user, $itemId)
    {
        $cart = $this->getCart($user);
        CartItem::where('cart_id', $cart->id)->where('id', $itemId)->delete();
        return $this->getCartDetails($user);
    }

    /**
     * Clear cart
     */
    public function clearCart($user)
    {
        $cart = $this->getCart($user);
        $cart->items()->delete();
    }
}
