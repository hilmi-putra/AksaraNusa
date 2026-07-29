<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Book;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Reduce stock for books in an order
     */
    public function reduceStock(Order $order)
    {
        foreach ($order->items as $item) {
            $book = Book::find($item->book_id);
            if ($book) {
                if ($book->stock < $item->quantity) {
                    throw new Exception("Stock not available for book: {$book->title}");
                }
                $book->decrement('stock', $item->quantity);
            }
        }
    }

    /**
     * Restore stock for books in an order
     */
    public function restoreStock(Order $order)
    {
        foreach ($order->items as $item) {
            $book = Book::find($item->book_id);
            if ($book) {
                $book->increment('stock', $item->quantity);
            }
        }
    }

    /**
     * Update order status
     */
    public function updateStatus(Order $order, $status)
    {
        DB::beginTransaction();
        try {
            $order->update(['status' => $status]);

            // If cancelled, failed, expired, we restore the stock
            if (in_array($status, ['Cancelled', 'Failed', 'Expired'])) {
                $this->restoreStock($order);
            }

            DB::commit();
            return $order;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Generate unique invoice number
     */
    public function generateInvoiceNumber(): string
    {
        $prefix = 'INV/' . date('Ymd') . '/MP/';
        
        $latestOrder = Order::where('invoice_number', 'LIKE', $prefix . '%')
            ->orderBy('id', 'desc')
            ->first();

        if (!$latestOrder) {
            $sequence = '00001';
        } else {
            $lastInvoice = $latestOrder->invoice_number;
            $parts = explode('/', $lastInvoice);
            $lastSequence = intval(end($parts));
            $sequence = str_pad($lastSequence + 1, 5, '0', STR_PAD_LEFT);
        }

        return $prefix . $sequence;
    }
}
