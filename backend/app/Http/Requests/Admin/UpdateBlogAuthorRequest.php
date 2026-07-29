<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlogAuthorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('blog_authors', 'slug')->ignore($this->route('author')),
            ],
            'avatar' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'social_media' => 'nullable|array',
        ];
    }
}
