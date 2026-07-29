<?php

namespace Database\Seeders;

use App\Models\BlogAuthor;
use App\Models\BlogCategory;
use App\Models\BlogCTA;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = BlogCategory::all();
        $authors = BlogAuthor::all();
        $tags = BlogTag::all();
        $ctas = BlogCTA::all();

        if ($categories->isEmpty() || $authors->isEmpty()) {
            return;
        }

        $posts = [
            [
                'title' => 'The Future of Self-Publishing in 2027',
                'excerpt' => 'Discover the emerging trends that will shape the self-publishing industry.',
                'content' => '<h2>Introduction</h2><p>The publishing industry is evolving rapidly. As we approach 2027, authors have more tools than ever to reach their audience.</p><p>Key trends include AI-assisted editing, direct-to-consumer sales, and immersive reading experiences.</p>',
                'status' => 'published',
                'is_featured' => true,
                'view_count' => 1500,
            ],
            [
                'title' => 'How to Overcome Writer\'s Block',
                'excerpt' => 'Practical strategies to get your creative juices flowing again.',
                'content' => '<h2>What is Writer\'s Block?</h2><p>It happens to the best of us. You stare at a blank page, and nothing comes to mind.</p><p>Here are three ways to overcome it: 1. Freewriting. 2. Taking a walk. 3. Reading a book in a different genre.</p>',
                'status' => 'published',
                'is_featured' => false,
                'view_count' => 850,
            ],
            [
                'title' => 'Marketing Your First Book',
                'excerpt' => 'A beginner\'s guide to book marketing.',
                'content' => '<h2>Start Early</h2><p>Don\'t wait until your book is published to start marketing. Build an audience early.</p><p>Use social media, build a mailing list, and consider reaching out to book bloggers.</p>',
                'status' => 'draft',
                'is_featured' => false,
                'view_count' => 0,
            ],
        ];

        foreach ($posts as $index => $postData) {
            $postData['slug'] = Str::slug($postData['title']);
            $postData['blog_category_id'] = $categories->random()->id;
            $postData['blog_author_id'] = $authors->random()->id;
            $postData['blog_cta_id'] = $ctas->random()->id ?? null;
            $postData['publish_date'] = $postData['status'] === 'published' ? now()->subDays(rand(1, 30)) : null;
            $postData['reading_time'] = ceil(str_word_count(strip_tags($postData['content'])) / 200);

            $post = BlogPost::updateOrCreate(
                ['slug' => $postData['slug']],
                $postData
            );

            // Attach 2-3 random tags
            if ($tags->isNotEmpty()) {
                $post->tags()->sync($tags->random(rand(1, 3))->pluck('id'));
            }
        }
    }
}
