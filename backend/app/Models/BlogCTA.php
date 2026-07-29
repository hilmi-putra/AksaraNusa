<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogCTA extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'blog_ctas';

    protected $fillable = [
        'name',
        'title',
        'description',
        'button_text',
        'button_link',
        'image',
    ];

    public function posts()
    {
        return $this->hasMany(BlogPost::class);
    }
}
