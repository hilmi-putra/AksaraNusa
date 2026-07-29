<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AuthorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $authorId = $this->author ? $this->author->id : '';

        return [
            'name'    => 'required|string|max:255',
            'slug'    => 'nullable|string|max:255|unique:authors,slug,' . $authorId,
            'bio'     => 'nullable|string',
            'photo'   => 'nullable|string',
            'website' => 'nullable|string|max:255',
            'email'   => 'nullable|email|max:255',
        ];
    }
}
