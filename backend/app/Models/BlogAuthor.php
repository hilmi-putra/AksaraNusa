<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogAuthor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'avatar',
        'bio',
        'social_media',
    ];

    protected $casts = [
        'social_media' => 'array',
    ];

    public function posts()
    {
        return $this->hasMany(BlogPost::class);
    }
}
