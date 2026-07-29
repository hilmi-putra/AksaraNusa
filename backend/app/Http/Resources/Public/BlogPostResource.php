<?php

namespace App\Http\Resources\Public;

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
            'category' => new BlogCategoryResource($this->whenLoaded('category')),
            'author' => new BlogAuthorResource($this->whenLoaded('author')),
            'tags' => BlogTagResource::collection($this->whenLoaded('tags')),
            // Only include CTA if needed in public API
            'cta' => $this->whenLoaded('cta', function () {
                return [
                    'id' => $this->cta->id,
                    'title' => $this->cta->title,
                    'description' => $this->cta->description,
                    'button_text' => $this->cta->button_text,
                    'button_link' => $this->cta->button_link,
                    'image' => $this->cta->image,
                ];
            }),
            'created_at' => $this->created_at,
        ];
    }
}
