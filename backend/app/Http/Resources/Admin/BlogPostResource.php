<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featured_image,
            'thumbnail' => $this->thumbnail,
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'publish_date' => $this->publish_date,
            'reading_time' => $this->reading_time,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_keywords' => $this->meta_keywords,
            'canonical_url' => $this->canonical_url,
            'og_image' => $this->og_image,
            'view_count' => $this->view_count,
            'blog_category_id' => $this->blog_category_id,
            'category' => new BlogCategoryResource($this->whenLoaded('category')),
            'blog_author_id' => $this->blog_author_id,
            'author' => new BlogAuthorResource($this->whenLoaded('author')),
            'blog_cta_id' => $this->blog_cta_id,
            'cta' => new BlogCTAResource($this->whenLoaded('cta')),
            'tags' => BlogTagResource::collection($this->whenLoaded('tags')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
