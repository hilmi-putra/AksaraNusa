<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShippingZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\ShippingZone::create([
            'province_id' => '9',
            'city_id' => '22',
            'courier' => 'JNE',
            'service' => 'REG',
            'etd' => '1-2',
            'cost' => 15000,
        ]);

        $zones = [
            // Mock data: Province ID 11 (Jawa Timur), City ID 444 (Surabaya)
            ['province_id' => '11', 'city_id' => '444', 'courier' => 'JNE', 'service' => 'CTCYES (CTCYES23)', 'etd' => '1-1D', 'cost' => 24000],
            ['province_id' => '11', 'city_id' => '444', 'courier' => 'SICEPAT', 'service' => 'BEST', 'etd' => '1-2D', 'cost' => 30000],
            ['province_id' => '11', 'city_id' => '444', 'courier' => 'STANDARD', 'service' => 'DELIVERY', 'etd' => '3-5D', 'cost' => 0],
            
            // Province ID 6 (DKI Jakarta), City ID 152 (Jakarta Pusat)
            ['province_id' => '6', 'city_id' => '152', 'courier' => 'JNE', 'service' => 'REG', 'etd' => '2-3D', 'cost' => 15000],
            ['province_id' => '6', 'city_id' => '152', 'courier' => 'JNE', 'service' => 'YES', 'etd' => '1-1D', 'cost' => 25000],
            ['province_id' => '6', 'city_id' => '152', 'courier' => 'STANDARD', 'service' => 'DELIVERY', 'etd' => '3-5D', 'cost' => 0],
        ];

        foreach ($zones as $zone) {
            \App\Models\ShippingZone::create($zone);
        }
    }
}
