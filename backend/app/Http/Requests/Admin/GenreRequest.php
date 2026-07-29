<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class GenreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $genreId = $this->genre ? $this->genre->id : '';

        return [
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:genres,slug,' . $genreId,
            'description' => 'nullable|string',
        ];
    }
}
