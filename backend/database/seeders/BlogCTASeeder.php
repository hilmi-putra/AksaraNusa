<?php

namespace Database\Seeders;

use App\Models\BlogCTA;
use Illuminate\Database\Seeder;

class BlogCTASeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ctas = [
            [
                'name' => 'Publish with Us',
                'title' => 'Ready to Publish Your Book?',
                'description' => 'Join thousands of authors who have successfully published their books with MegaPress.',
                'button_text' => 'Get Started',
                'button_link' => '/publishing',
            ],
            [
                'name' => 'Newsletter Signup',
                'title' => 'Subscribe to Our Newsletter',
                'description' => 'Get the latest tips on writing and publishing delivered straight to your inbox.',
                'button_text' => 'Subscribe Now',
                'button_link' => '#newsletter',
            ],
        ];

        foreach ($ctas as $cta) {
            BlogCTA::updateOrCreate(
                ['name' => $cta['name']],
                $cta
            );
        }
    }
}
