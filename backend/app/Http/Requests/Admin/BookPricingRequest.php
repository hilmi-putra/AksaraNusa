<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BookPricingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'price'          => 'required|numeric|min:0',
            'discount'       => 'nullable|numeric|min:0|max:100',
            'promo_price'    => 'nullable|numeric|min:0',
            'promo_start_at' => 'nullable|date',
            'promo_end_at'   => 'nullable|date|after_or_equal:promo_start_at',
        ];
    }
}
