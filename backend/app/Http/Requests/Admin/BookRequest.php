<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $bookId = $this->book ? $this->book->id : '';

        return [
            // Basic Info
            'title'               => 'required|string|max:255',
            'subtitle'            => 'nullable|string|max:255',
            'isbn'                => 'nullable|string|max:255|unique:books,isbn,' . $bookId,
            'sku'                 => 'nullable|string|max:255|unique:books,sku,' . $bookId,
            'author_id'           => 'required|exists:authors,id',
            'publisher_id'        => 'required|exists:publishers,id',
            'language'            => 'nullable|string|max:10',
            'status'              => 'required|in:draft,published,archived',
            'published_at'        => 'nullable|date',

            // Relations
            'categories'          => 'nullable|array',
            'categories.*'        => 'exists:categories,id',
            'genres'              => 'nullable|array',
            'genres.*'            => 'exists:genres,id',

            // Physical Specs
            'page_count'          => 'nullable|integer|min:1',
            'weight'              => 'nullable|numeric|min:0',
            'dimensions'          => 'nullable|string|max:255',
            'cover_type'          => 'nullable|in:softcover,hardcover,other',
            'paper_type'          => 'nullable|string|max:255',
            'edition'             => 'nullable|string|max:255',
            'book_type'           => 'required|in:physical,digital,both',
            'specifications'      => 'nullable|array',

            // Pricing & Stock
            'price'               => 'required|numeric|min:0',
            'discount'            => 'nullable|numeric|min:0|max:100',
            'promo_price'         => 'nullable|numeric|min:0',
            'promo_start_at'      => 'nullable|date',
            'promo_end_at'        => 'nullable|date|after_or_equal:promo_start_at',
            'stock'               => 'required|integer|min:0',

            // Media
            'cover_image'         => 'nullable|string',
            'image_gallery'       => 'nullable|array',
            'digital_file_url'    => 'nullable|string',
            'digital_file_size'   => 'nullable|string|max:50',
            'digital_file_format' => 'nullable|string|max:20',

            // Descriptions
            'short_description'   => 'nullable|string',
            'long_description'    => 'nullable|string',
            'editor_note'         => 'nullable|string',
            'additional_info'     => 'nullable|string',

            // Flags
            'is_featured'         => 'boolean',
            'is_bestseller'       => 'boolean',
            'is_editor_choice'    => 'boolean',
            'sort_order'          => 'nullable|integer|min:0',

            // SEO
            'meta_title'          => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul buku wajib diisi.',
            'title.max' => 'Judul buku maksimal 255 karakter.',
            'author_id.required' => 'Penulis wajib dipilih.',
            'author_id.exists' => 'Penulis yang dipilih tidak valid.',
            'publisher_id.required' => 'Penerbit wajib dipilih.',
            'publisher_id.exists' => 'Penerbit yang dipilih tidak valid.',
            'status.required' => 'Status buku wajib dipilih.',
            'book_type.required' => 'Tipe buku wajib dipilih.',
            'price.required' => 'Harga buku wajib diisi.',
            'price.numeric' => 'Harga buku harus berupa angka.',
            'stock.required' => 'Stok buku wajib diisi.',
            'stock.integer' => 'Stok buku harus berupa angka bulat.',
            'promo_end_at.after_or_equal' => 'Tanggal akhir promo harus sama atau setelah tanggal mulai promo.',
        ];
    }
}
