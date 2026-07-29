<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BookRequest;
use App\Http\Requests\Admin\BookInventoryRequest;
use App\Http\Requests\Admin\BookIsbnRequest;
use App\Http\Requests\Admin\BookDigitalRequest;
use App\Http\Requests\Admin\BookPricingRequest;
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
        $books = $this->bookService->getAllAdminBooks($request->all());
        return BookResource::collection($books);
    }

    public function store(BookRequest $request)
    {
        $book = $this->bookService->createBook($request->validated());
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function show(Book $book)
    {
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function update(BookRequest $request, Book $book)
    {
        $book = $this->bookService->updateBook($book, $request->validated());
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function destroy(Book $book)
    {
        $this->bookService->deleteBook($book);
        return response()->json(['message' => 'Book deleted successfully']);
    }

    public function duplicate(Book $book)
    {
        $newBook = $this->bookService->duplicateBook($book);
        return new BookResource($newBook->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function updateInventory(BookInventoryRequest $request, Book $book)
    {
        $book->update($request->validated());
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function updateIsbn(BookIsbnRequest $request, Book $book)
    {
        $book->update($request->validated());
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function updateDigital(BookDigitalRequest $request, Book $book)
    {
        $book->update($request->validated());
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }

    public function updatePricing(BookPricingRequest $request, Book $book)
    {
        $book->update($request->validated());
        return new BookResource($book->load(['author', 'publisher', 'categories', 'genres']));
    }
}
