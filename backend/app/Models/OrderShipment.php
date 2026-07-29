<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderShipment extends Model
{
    protected $fillable = ['order_id', 'courier', 'service', 'tracking_number', 'status', 'history'];

    protected $casts = [
        'history' => 'array',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
