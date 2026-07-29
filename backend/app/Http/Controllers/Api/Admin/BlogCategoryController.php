<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogCategoryRequest;
use App\Http\Requests\Admin\UpdateBlogCategoryRequest;
use App\Http\Resources\Admin\BlogCategoryResource;
use App\Models\BlogCategory;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogCategory::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $categories = $query->latest()->paginate($request->get('per_page', 10));

        return BlogCategoryResource::collection($categories);
    }

    public function store(StoreBlogCategoryRequest $request)
    {
        $category = BlogCategory::create($request->validated());
        return new BlogCategoryResource($category);
    }

    public function show(BlogCategory $category)
    {
        return new BlogCategoryResource($category);
    }

    public function update(UpdateBlogCategoryRequest $request, BlogCategory $category)
    {
        $category->update($request->validated());
        return new BlogCategoryResource($category);
    }

    public function destroy(BlogCategory $category)
    {
        // Check if there are posts using this category before deleting (optional but good practice)
        if ($category->posts()->exists()) {
            return response()->json(['message' => 'Cannot delete category with associated posts.'], 400);
        }
        
        $category->delete();
        return response()->noContent();
    }
}
