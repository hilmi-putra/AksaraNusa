<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    public function index(Request $request)
    {
        $books = $this->bookService->getPublicBooks($request->all());
        return BookResource::collection($books);
    }

    public function show($slug)
    {
        $book = Book::with(['author', 'publisher', 'categories', 'genres'])
                    ->where('slug', $slug)
                    ->where('status', 'published')
                    ->firstOrFail();
                    
        return new BookResource($book);
    }
}
