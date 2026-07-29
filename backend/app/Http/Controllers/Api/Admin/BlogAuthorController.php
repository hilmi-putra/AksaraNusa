<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogAuthorRequest;
use App\Http\Requests\Admin\UpdateBlogAuthorRequest;
use App\Http\Resources\Admin\BlogAuthorResource;
use App\Models\BlogAuthor;
use Illuminate\Http\Request;

class BlogAuthorController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogAuthor::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $authors = $query->latest()->paginate($request->get('per_page', 10));

        return BlogAuthorResource::collection($authors);
    }

    public function store(StoreBlogAuthorRequest $request)
    {
        $author = BlogAuthor::create($request->validated());
        return new BlogAuthorResource($author);
    }

    public function show(BlogAuthor $author)
    {
        return new BlogAuthorResource($author);
    }

    public function update(UpdateBlogAuthorRequest $request, BlogAuthor $author)
    {
        $author->update($request->validated());
        return new BlogAuthorResource($author);
    }

    public function destroy(BlogAuthor $author)
    {
        if ($author->posts()->exists()) {
            return response()->json(['message' => 'Cannot delete author with associated posts.'], 400);
        }

        $author->delete();
        return response()->noContent();
    }
}
