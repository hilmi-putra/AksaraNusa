<?php

namespace App\Services;

use App\Models\Book;
use App\Models\BlogPost;
use Illuminate\Support\Collection;

class SearchService
{
    /**
     * Perform a global search for books and blog posts.
     *
     * @param string $query
     * @param int $limit Per-entity limit
     * @return array
     */
    public function search(string $query, int $limit = 5): array
    {
        $books = $this->searchBooks($query, $limit);
        $articles = $this->searchArticles($query, $limit);

        return [
            'books' => $books,
            'articles' => $articles,
        ];
    }

    private function searchBooks(string $query, int $limit): Collection
    {
        return Book::with(['author', 'categories'])
            ->where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('isbn', 'like', "%{$query}%")
                  ->orWhereHas('author', function ($q2) use ($query) {
                      $q2->where('name', 'like', "%{$query}%");
                  })
                  ->orWhereHas('categories', function ($q3) use ($query) {
                      $q3->where('name', 'like', "%{$query}%");
                  });
            })
            ->orderBy('id', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($book) {
                return [
                    'id' => $book->id,
                    'type' => 'book',
                    'title' => $book->title,
                    'slug' => $book->slug,
                    'thumbnail' => $book->cover_image,
                    'author' => $book->author?->name ?? 'Unknown',
                    'category' => $book->categories->first()?->name ?? 'Uncategorized',
                    'price' => $book->final_price ?? $book->price,
                ];
            });
    }

    private function searchArticles(string $query, int $limit): Collection
    {
        return BlogPost::with(['author', 'category'])
            ->where('status', 'published')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%")
                  ->orWhereHas('author', function ($q2) use ($query) {
                      $q2->where('name', 'like', "%{$query}%");
                  })
                  ->orWhereHas('category', function ($q3) use ($query) {
                      $q3->where('name', 'like', "%{$query}%");
                  });
            })
            ->orderBy('id', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'type' => 'article',
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'thumbnail' => $article->thumbnail ?? $article->featured_image,
                    'author' => $article->author?->name ?? 'Unknown',
                    'category' => $article->category?->name ?? 'Uncategorized',
                    'publish_date' => $article->publish_date,
                ];
            });
    }
}
