<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id', 'payment_method', 'status', 'transaction_number', 
        'snap_token', 'amount', 'payment_date', 'response_payload'
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'response_payload' => 'array'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
