<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BookFactory extends Factory
{
    private const BOOK_TITLES = [
        'Menari di Atas Awan', 'Cahaya di Ujung Lorong', 'Sang Penjelajah Waktu',
        'Bisikan Angin Malam', 'Mimpi Seribu Pulau', 'Langkah Pertama Menuju Bintang',
        'Rinduku Bersemi di Taman', 'Dalam Pelukan Hujan', 'Api di Balik Keheningan',
        'Jejak Langkah di Pasir', 'Perahu Kertas Melintasi Samudra', 'Bulan di Atas Kota',
        'Kisah Sang Perantau', 'Melodi dari Negeri Pelangi', 'Waktu yang Tak Kembali',
        'Ombak Membawa Pesan', 'Senja di Pelabuhan Tua', 'Rindu yang Terpendam',
        'Pelangi Setelah Badai', 'Rahasia di Balik Cermin', 'Suara Hati yang Berbisik',
        'Tarian Kunang-Kunang', 'Dermaga Kenangan', 'Kata yang Tak Terucap',
        'Burung-Burung Migran', 'Cerita dari Ujung Dunia', 'Surat untuk Masa Depan',
        'Labirin Cinta', 'Pulang ke Kampung Halaman', 'Sketsa Kehidupan',
        'Novel Grafis Nusantara', 'Antologi Puisi Rindu', 'Panduan Menulis Kreatif',
        'Ensiklopedia Flora Indonesia', 'Atlas Sejarah Maritim', 'Kamus Bahasa Daerah',
        'Resep Masakan Tradisional', 'Fotografi Alam Liar', 'Arsitektur Vernakular',
        'Filosofi Hidup Sederhana',
    ];

    private const LANGUAGES = ['id', 'en', 'jv', 'su', 'ms'];
    private const PAPER_TYPES = ['HVS 70gsm', 'HVS 80gsm', 'Book Paper 55gsm', 'Book Paper 70gsm', 'Art Paper 120gsm', 'Ivory 230gsm'];
    private const EDITIONS = ['Edisi Pertama', 'Edisi Kedua', 'Edisi Revisi', 'Edisi Spesial', 'Edisi Terbatas', null];
    private const DIMENSIONS_OPTIONS = ['14 x 21 cm', '15 x 23 cm', '13 x 19 cm', '17.5 x 25 cm', '20 x 20 cm', '21 x 29.7 cm'];

    public function definition(): array
    {
        $title = $this->faker->unique()->randomElement(self::BOOK_TITLES);
        $price = $this->faker->randomElement([49000, 59000, 65000, 75000, 85000, 95000, 115000, 125000, 149000, 175000, 199000]);
        $hasDiscount = $this->faker->boolean(30);
        $hasPromo = !$hasDiscount && $this->faker->boolean(15);
        $pageCount = $this->faker->numberBetween(80, 500);
        $status = $this->faker->randomElement(['draft', 'published', 'published', 'published']); // bias toward published

        return [
            'title'              => $title,
            'subtitle'           => $this->faker->boolean(40) ? $this->faker->sentence(4) : null,
            'slug'               => Str::slug($title . '-' . Str::random(6)),
            'isbn'               => '978-' . $this->faker->numerify('###-##-####-#'),
            'sku'                => 'MP-' . strtoupper(Str::random(3)) . '-' . $this->faker->numerify('####'),
            'author_id'          => Author::factory(),
            'publisher_id'       => Publisher::factory(),
            'short_description'  => $this->faker->paragraph(2),
            'long_description'   => '<h2>Sinopsis</h2><p>' . implode('</p><p>', $this->faker->paragraphs(4)) . '</p><h2>Tentang Buku Ini</h2><p>' . $this->faker->paragraph(3) . '</p><blockquote>' . $this->faker->sentence(12) . '</blockquote><p>' . $this->faker->paragraph(2) . '</p>',
            'editor_note'        => $this->faker->boolean(50) ? $this->faker->paragraphs(2, true) : null,
            'additional_info'    => $this->faker->boolean(40) ? $this->faker->paragraph() : null,
            'language'           => $this->faker->randomElement(self::LANGUAGES),
            'page_count'         => $pageCount,
            'weight'             => round($pageCount * 0.6 + $this->faker->numberBetween(20, 80), 0), // approximate
            'dimensions'         => $this->faker->randomElement(self::DIMENSIONS_OPTIONS),
            'cover_type'         => $this->faker->randomElement(['softcover', 'softcover', 'hardcover']),
            'paper_type'         => $this->faker->randomElement(self::PAPER_TYPES),
            'edition'            => $this->faker->randomElement(self::EDITIONS),
            'specifications'     => [
                'format'  => $this->faker->randomElement(['Cetak', 'Print on Demand']),
                'binding' => $this->faker->randomElement(['Perfect Binding', 'Saddle Stitch', 'Case Binding']),
                'color'   => $this->faker->randomElement(['Full Color', 'Black & White', 'Duotone']),
            ],
            'price'              => $price,
            'discount'           => $hasDiscount ? $this->faker->randomElement([10, 15, 20, 25, 30]) : 0,
            'promo_price'        => $hasPromo ? round($price * 0.7) : null,
            'promo_start_at'     => $hasPromo ? now()->subDays(3) : null,
            'promo_end_at'       => $hasPromo ? now()->addDays(14) : null,
            'stock'              => $this->faker->numberBetween(0, 150),
            'cover_image'        => 'https://placehold.co/400x600/e8e0d4/3d3d3d.png?text=' . urlencode($title),
            'image_gallery'      => [
                'https://placehold.co/400x600/e8e0d4/3d3d3d.png?text=Front+Cover',
                'https://placehold.co/400x600/d4d0c8/3d3d3d.png?text=Back+Cover',
                'https://placehold.co/200x600/c8c4bc/3d3d3d.png?text=Spine',
                'https://placehold.co/600x400/f0ece4/3d3d3d.png?text=Inside+Pages',
            ],
            'digital_file_url'   => $this->faker->boolean(25) ? 'https://storage.megapress.co.id/ebooks/' . Str::slug($title) . '.pdf' : null,
            'digital_file_size'  => $this->faker->boolean(25) ? $this->faker->numberBetween(2, 45) . ' MB' : null,
            'digital_file_format'=> $this->faker->boolean(25) ? $this->faker->randomElement(['PDF', 'EPUB']) : null,
            'book_type'          => $this->faker->randomElement(['physical', 'physical', 'physical', 'digital', 'both']),
            'status'             => $status,
            'is_featured'        => $this->faker->boolean(20),
            'is_bestseller'      => $this->faker->boolean(15),
            'is_editor_choice'   => $this->faker->boolean(10),
            'sort_order'         => $this->faker->numberBetween(0, 100),
            'published_at'       => $status === 'published' ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
            'meta_title'         => $title . ' - Mega Press',
            'meta_description'   => Str::limit($this->faker->sentence(15), 160),
            'meta_keywords'      => implode(', ', $this->faker->words(6)),
        ];
    }
}
