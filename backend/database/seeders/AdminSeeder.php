<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Seed the default Super Admin account.
     *
     * This seeder is idempotent — it will not create a duplicate
     * if the admin account already exists.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'superadmin@megapress.co.id'],
            [
                'name' => 'megapress',
                'password' => 'passwordhilmi',
                'role' => UserRole::Admin,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('✓ Super Admin account created/verified: superadmin@megapress.co.id');
    }
}
