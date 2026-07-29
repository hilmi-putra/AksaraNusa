<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogPost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'thumbnail',
        'status',
        'is_featured',
        'publish_date',
        'reading_time',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
        'og_image',
        'view_count',
        'blog_category_id',
        'blog_author_id',
        'blog_cta_id',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'publish_date' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function author()
    {
        return $this->belongsTo(BlogAuthor::class, 'blog_author_id');
    }

    public function tags()
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag');
    }

    public function cta()
    {
        return $this->belongsTo(BlogCTA::class, 'blog_cta_id');
    }
}
