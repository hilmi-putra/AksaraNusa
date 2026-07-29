<?php

namespace Database\Seeders;

use App\Models\BlogAuthor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogAuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $authors = [
            [
                'name' => 'John Doe',
                'bio' => 'Senior Editor at MegaPress.',
                'social_media' => ['twitter' => 'https://twitter.com/johndoe'],
            ],
            [
                'name' => 'Jane Smith',
                'bio' => 'Bestselling author and writing coach.',
                'social_media' => ['instagram' => 'https://instagram.com/janesmith'],
            ],
        ];

        foreach ($authors as $author) {
            BlogAuthor::updateOrCreate(
                ['slug' => Str::slug($author['name'])],
                [
                    'name' => $author['name'],
                    'bio' => $author['bio'],
                    'social_media' => $author['social_media'],
                ]
            );
        }
    }
}
