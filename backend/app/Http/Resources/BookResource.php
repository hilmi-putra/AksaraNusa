<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'title'              => $this->title,
            'subtitle'           => $this->subtitle,
            'slug'               => $this->slug,
            'isbn'               => $this->isbn,
            'sku'                => $this->sku,

            // Relations
            'author' => [
                'id'   => $this->whenLoaded('author', fn() => $this->author->id),
                'name' => $this->whenLoaded('author', fn() => $this->author->name),
            ],
            'publisher' => [
                'id'   => $this->whenLoaded('publisher', fn() => $this->publisher->id),
                'name' => $this->whenLoaded('publisher', fn() => $this->publisher->name),
            ],
            'categories' => $this->whenLoaded('categories', function () {
                return $this->categories->map(fn($cat) => [
                    'id' => $cat->id, 'name' => $cat->name, 'slug' => $cat->slug,
                ]);
            }),
            'genres' => $this->whenLoaded('genres', function () {
                return $this->genres->map(fn($genre) => [
                    'id' => $genre->id, 'name' => $genre->name, 'slug' => $genre->slug,
                ]);
            }),

            // Descriptions & Content
            'short_description'  => $this->short_description,
            'long_description'   => $this->long_description,
            'editor_note'        => $this->editor_note,
            'additional_info'    => $this->additional_info,

            // Physical Specifications
            'language'           => $this->language,
            'page_count'         => $this->page_count,
            'weight'             => $this->weight ? (float) $this->weight : null,
            'dimensions'         => $this->dimensions,
            'cover_type'         => $this->cover_type,
            'paper_type'         => $this->paper_type,
            'edition'            => $this->edition,
            'specifications'     => $this->specifications,

            // Pricing
            'price'              => (float) $this->price,
            'discount'           => (float) $this->discount,
            'promo_price'        => $this->promo_price ? (float) $this->promo_price : null,
            'promo_start_at'     => $this->promo_start_at?->toIso8601String(),
            'promo_end_at'       => $this->promo_end_at?->toIso8601String(),
            'final_price'        => (float) $this->final_price,

            // Stock
            'stock'              => (int) $this->stock,

            // Media
            'cover_image'        => $this->cover_image,
            'image_gallery'      => $this->image_gallery,
            'digital_file_url'   => $this->digital_file_url,
            'digital_file_size'  => $this->digital_file_size,
            'digital_file_format'=> $this->digital_file_format,

            // Flags & Types
            'book_type'          => $this->book_type,
            'status'             => $this->status,
            'is_featured'        => (bool) $this->is_featured,
            'is_bestseller'      => (bool) $this->is_bestseller,
            'is_editor_choice'   => (bool) $this->is_editor_choice,
            'sort_order'         => (int) $this->sort_order,

            // SEO
            'meta_title'         => $this->meta_title,
            'meta_description'   => $this->meta_description,
            'meta_keywords'      => $this->meta_keywords,

            // Timestamps
            'published_at'       => $this->published_at?->toIso8601String(),
            'created_at'         => $this->created_at->toIso8601String(),
            'updated_at'         => $this->updated_at->toIso8601String(),
        ];
    }
}
