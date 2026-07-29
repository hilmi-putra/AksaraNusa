<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'invoice_number', 'status', 'subtotal', 'shipping_fee', 
        'insurance_fee', 'discount', 'tax', 'grand_total', 'shipping_address_id', 'shipping_method'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function shippingAddress()
    {
        return $this->belongsTo(UserAddress::class, 'shipping_address_id');
    }

    public function timeline()
    {
        return $this->hasMany(OrderTimeline::class)->orderBy('created_at', 'asc');
    }

    public function shipment()
    {
        return $this->hasOne(OrderShipment::class);
    }

    public function refundRequest()
    {
        return $this->hasOne(RefundRequest::class);
    }
}
