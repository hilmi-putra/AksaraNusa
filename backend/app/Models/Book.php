<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'subtitle', 'slug', 'isbn', 'sku',
        'author_id', 'publisher_id',
        'short_description', 'long_description', 'editor_note', 'additional_info',
        'language', 'page_count', 'weight', 'dimensions',
        'cover_type', 'paper_type', 'edition', 'specifications',
        'price', 'discount', 'promo_price', 'promo_start_at', 'promo_end_at',
        'stock',
        'cover_image', 'image_gallery',
        'digital_file_url', 'digital_file_size', 'digital_file_format',
        'book_type', 'status',
        'is_featured', 'is_bestseller', 'is_editor_choice', 'sort_order',
        'meta_title', 'meta_description', 'meta_keywords',
        'published_at',
    ];

    protected $casts = [
        'image_gallery'   => 'array',
        'specifications'  => 'array',
        'is_featured'     => 'boolean',
        'is_bestseller'   => 'boolean',
        'is_editor_choice'=> 'boolean',
        'published_at'    => 'datetime',
        'promo_start_at'  => 'datetime',
        'promo_end_at'    => 'datetime',
        'price'           => 'decimal:2',
        'discount'        => 'decimal:2',
        'promo_price'     => 'decimal:2',
        'weight'          => 'decimal:2',
    ];

    // --------------- Accessors ---------------

    /**
     * Calculate the effective final price considering discount % and active promo.
     */
    public function getFinalPriceAttribute(): float
    {
        // Check if promo is currently active
        if ($this->promo_price && $this->promo_start_at && $this->promo_end_at) {
            $now = Carbon::now();
            if ($now->between($this->promo_start_at, $this->promo_end_at)) {
                return (float) $this->promo_price;
            }
        }

        // Fall back to percentage discount
        $price = (float) $this->price;
        $discount = (float) $this->discount;

        if ($discount > 0) {
            return round($price - ($price * ($discount / 100)), 2);
        }

        return $price;
    }

    // --------------- Relationships ---------------

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
