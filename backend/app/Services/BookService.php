<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BookService
{
    public function getAllAdminBooks($filters = [])
    {
        $query = Book::with(['author', 'publisher', 'categories', 'genres']);

        // Search
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('isbn', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%");
            });
        }

        // Filters
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (isset($filters['is_featured'])) {
            $query->where('is_featured', filter_var($filters['is_featured'], FILTER_VALIDATE_BOOLEAN));
        }
        if (isset($filters['is_bestseller'])) {
            $query->where('is_bestseller', filter_var($filters['is_bestseller'], FILTER_VALIDATE_BOOLEAN));
        }
        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', fn($q) => $q->where('categories.id', $filters['category_id']));
        }
        if (!empty($filters['author_id'])) {
            $query->where('author_id', $filters['author_id']);
        }
        if (!empty($filters['book_type'])) {
            $query->where('book_type', $filters['book_type']);
        }

        // Sorting
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $allowedSorts = ['title', 'price', 'stock', 'status', 'created_at', 'published_at', 'sort_order'];

        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function getPublicBooks($filters = [])
    {
        $query = Book::with(['author', 'publisher', 'categories', 'genres'])->where('status', 'published');

        if (!empty($filters['featured'])) {
            $query->where('is_featured', true);
        }
        if (!empty($filters['bestseller'])) {
            $query->where('is_bestseller', true);
        }
        if (!empty($filters['editor_choice'])) {
            $query->where('is_editor_choice', true);
        }
        if (!empty($filters['category'])) {
            $query->whereHas('categories', fn($q) => $q->where('slug', $filters['category']));
        }
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%");
            });
        }

        $query->orderBy('sort_order', 'asc')->orderBy('published_at', 'desc');

        if (!empty($filters['limit'])) {
            return $query->limit($filters['limit'])->get();
        }

        return $query->paginate($filters['per_page'] ?? 12);
    }

    public function createBook(array $data)
    {
        return DB::transaction(function () use ($data) {
            if (empty($data['slug'])) {
                $data['slug'] = Str::slug($data['title'] . '-' . Str::random(6));
            }

            $book = Book::create($data);

            if (!empty($data['categories'])) {
                $book->categories()->sync($data['categories']);
            }
            if (!empty($data['genres'])) {
                $book->genres()->sync($data['genres']);
            }

            return $book;
        });
    }

    public function updateBook(Book $book, array $data)
    {
        return DB::transaction(function () use ($book, $data) {
            if (isset($data['title']) && $data['title'] !== $book->title) {
                $data['slug'] = Str::slug($data['title'] . '-' . Str::random(6));
            }

            $book->update($data);

            if (isset($data['categories'])) {
                $book->categories()->sync($data['categories']);
            }
            if (isset($data['genres'])) {
                $book->genres()->sync($data['genres']);
            }

            return $book;
        });
    }

    public function duplicateBook(Book $book): Book
    {
        return DB::transaction(function () use ($book) {
            $newBook = $book->replicate();
            $newBook->title = $book->title . ' (Copy)';
            $newBook->slug = Str::slug($newBook->title . '-' . Str::random(6));
            $newBook->isbn = null;
            $newBook->sku = null;
            $newBook->status = 'draft';
            $newBook->save();

            $newBook->categories()->sync($book->categories->pluck('id'));
            $newBook->genres()->sync($book->genres->pluck('id'));

            return $newBook;
        });
    }

    public function deleteBook(Book $book)
    {
        return $book->delete();
    }
}
