<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('slug')->unique();
            $table->string('isbn')->nullable()->unique();
            $table->string('sku')->nullable()->unique();

            // Relations
            $table->foreignId('author_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publisher_id')->constrained()->cascadeOnDelete();

            // Descriptions & Content
            $table->text('short_description')->nullable();
            $table->longText('long_description')->nullable();
            $table->text('editor_note')->nullable();
            $table->text('additional_info')->nullable();

            // Physical Specifications
            $table->string('language', 10)->default('id');
            $table->unsignedInteger('page_count')->nullable();
            $table->decimal('weight', 8, 2)->nullable()->comment('Weight in grams');
            $table->string('dimensions')->nullable()->comment('L x W x H in cm');
            $table->enum('cover_type', ['softcover', 'hardcover', 'other'])->default('softcover');
            $table->string('paper_type')->nullable();
            $table->string('edition')->nullable();
            $table->json('specifications')->nullable()->comment('Additional key-value specifications');

            // Pricing & Stock
            $table->decimal('price', 15, 2)->default(0);
            $table->decimal('discount', 5, 2)->default(0)->comment('Percentage discount');
            $table->decimal('promo_price', 15, 2)->nullable()->comment('Absolute promo price');
            $table->timestamp('promo_start_at')->nullable();
            $table->timestamp('promo_end_at')->nullable();
            $table->integer('stock')->default(0);

            // Media
            $table->string('cover_image')->nullable();
            $table->json('image_gallery')->nullable()->comment('Array of gallery image URLs');
            $table->string('digital_file_url')->nullable();
            $table->string('digital_file_size')->nullable();
            $table->string('digital_file_format')->nullable();

            // Flags and Types
            $table->enum('book_type', ['physical', 'digital', 'both'])->default('physical');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_editor_choice')->default(false);
            $table->unsignedInteger('sort_order')->default(0);

            // SEO Metadata
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            // Indexes for common queries
            $table->index('status');
            $table->index('is_featured');
            $table->index('is_bestseller');
            $table->index('published_at');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
