<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Genre;
use App\Models\Publisher;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $authors = Author::factory(10)->create();
        $publishers = Publisher::factory(3)->create();
        $categories = Category::factory(5)->create();
        $genres = Genre::factory(10)->create();

        Book::factory(30)->make()->each(function ($book) use ($authors, $publishers, $categories, $genres) {
            $book->author_id = $authors->random()->id;
            $book->publisher_id = $publishers->random()->id;
            $book->save();

            // Attach categories (1 to 3)
            $book->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );

            // Attach genres (1 to 3)
            $book->genres()->attach(
                $genres->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
