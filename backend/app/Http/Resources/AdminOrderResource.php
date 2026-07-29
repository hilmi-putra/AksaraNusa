<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice_number' => $this->invoice_number,
            'status' => $this->status,
            
            // Monetary
            'subtotal' => $this->subtotal,
            'shipping_fee' => $this->shipping_fee,
            'insurance_fee' => $this->insurance_fee,
            'discount' => $this->discount,
            'tax' => $this->tax,
            'grand_total' => $this->grand_total,
            
            // Shipping
            'shipping_method' => $this->shipping_method,
            
            // Dates
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relations
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'phone' => $this->user->phone,
            ],
            'shipping_address' => $this->whenLoaded('shippingAddress'),
            'payment' => $this->whenLoaded('payment'),
            'items' => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'book_id' => $item->book_id,
                        'book_title' => $item->book ? $item->book->title : 'Unknown',
                        'book_cover' => $item->book ? $item->book->cover_image : null,
                        'format' => $item->format,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'total' => $item->total,
                    ];
                });
            }),
            'timeline' => $this->whenLoaded('timeline'),
            'shipment' => $this->whenLoaded('shipment'),
            'refund_request' => $this->whenLoaded('refundRequest'),
        ];
    }
}
