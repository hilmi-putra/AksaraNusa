<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            BookSeeder::class,
            BlogCategorySeeder::class,
            BlogTagSeeder::class,
            BlogAuthorSeeder::class,
            BlogCTASeeder::class,
            BlogPostSeeder::class,
            UserAddressSeeder::class,
            ShippingZoneSeeder::class,
        ]);
        
        // Uncomment to generate dummy users
        // User::factory(10)->create();
    }
}
