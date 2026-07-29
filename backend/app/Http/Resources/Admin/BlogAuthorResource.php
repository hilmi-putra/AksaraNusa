<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogAuthorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'avatar' => $this->avatar,
            'bio' => $this->bio,
            'social_media' => $this->social_media,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
