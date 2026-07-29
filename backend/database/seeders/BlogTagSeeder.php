<?php

namespace Database\Seeders;

use App\Models\BlogTag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = ['Writing', 'Marketing', 'Self-Publishing', 'Fiction', 'Non-Fiction', 'Editing', 'Cover Design'];

        foreach ($tags as $tag) {
            BlogTag::updateOrCreate(
                ['slug' => Str::slug($tag)],
                ['name' => $tag]
            );
        }
    }
}
