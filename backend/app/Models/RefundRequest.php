<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefundRequest extends Model
{
    protected $fillable = ['order_id', 'reason', 'proof_image', 'admin_notes', 'status'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
