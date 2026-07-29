<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'News', 'color' => '#3b82f6', 'description' => 'Latest updates and announcements.'],
            ['name' => 'Tutorials', 'color' => '#10b981', 'description' => 'Step-by-step guides and how-tos.'],
            ['name' => 'Author Tips', 'color' => '#f59e0b', 'description' => 'Helpful tips for writers and authors.'],
            ['name' => 'Publishing', 'color' => '#8b5cf6', 'description' => 'Insights into the publishing industry.'],
        ];

        foreach ($categories as $category) {
            BlogCategory::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'color' => $category['color'],
                    'description' => $category['description'],
                ]
            );
        }
    }
}
