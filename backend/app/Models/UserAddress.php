<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $fillable = [
        'user_id', 'label', 'recipient_name', 'phone', 'address', 
        'province_code', 'province_name', 'regency_code', 'regency_name', 
        'district_code', 'district_name', 'village_code', 'village_name',
        'postal_code', 'is_primary'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
