<?php

namespace Database\Seeders;

use App\Models\Publisher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PublisherSeeder extends Seeder
{
    /**
     * Seed the default Megapress publisher.
     *
     * This seeder is idempotent — it will not create a duplicate
     * if the publisher already exists.
     */
    public function run(): void
    {
        Publisher::firstOrCreate(
            ['slug' => 'megapress'],
            [
                'name' => 'Megapress',
                'description' => 'Penerbit buku ajar, buku referensi, novel, dan jurnal di bawah naungan Aksara Nusa Mediatama.',
                'website' => 'https://megapress.co.id',
                'email' => 'info@megapress.co.id',
                'phone' => null,
                'address' => null,
                'logo' => null,
            ]
        );

        $this->command->info('✓ Publisher created/verified: Megapress');
    }
}
