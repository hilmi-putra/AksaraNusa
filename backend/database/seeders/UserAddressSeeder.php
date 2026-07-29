<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = \App\Models\User::first();
        if (!$user) return;

        \App\Models\UserAddress::create([
            'user_id' => $user->id,
            'label' => 'Home',
            'recipient_name' => $user->name ?? 'John Doe',
            'phone' => $user->phone ?? '08123456789',
            'address' => 'Jl. Merdeka No. 123, RT 01/RW 02',
            'province_code' => '11',
            'regency_code' => '444',
            'district_name' => 'Wonokromo',
            'postal_code' => '60241',
            'is_primary' => true,
        ]);
        
        \App\Models\UserAddress::create([
            'user_id' => $user->id,
            'label' => 'Office',
            'recipient_name' => $user->name ?? 'John Doe',
            'phone' => $user->phone ?? '08123456789',
            'address' => 'Gedung MegaPress Lt. 5, Jl. Sudirman No. 1',
            'province_code' => '6',
            'regency_code' => '152',
            'district_name' => 'Menteng',
            'postal_code' => '10310',
            'is_primary' => false,
        ]);
    }
}
