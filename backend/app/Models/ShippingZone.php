<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingZone extends Model
{
    protected $fillable = [
        'province_id', 'city_id', 'courier', 'service', 'etd', 'cost'
    ];
}
