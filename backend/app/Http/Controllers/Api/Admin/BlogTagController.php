<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogTagRequest;
use App\Http\Requests\Admin\UpdateBlogTagRequest;
use App\Http\Resources\Admin\BlogTagResource;
use App\Models\BlogTag;
use Illuminate\Http\Request;

class BlogTagController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogTag::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $tags = $query->latest()->paginate($request->get('per_page', 10));

        return BlogTagResource::collection($tags);
    }

    public function store(StoreBlogTagRequest $request)
    {
        $tag = BlogTag::create($request->validated());
        return new BlogTagResource($tag);
    }

    public function show(BlogTag $tag)
    {
        return new BlogTagResource($tag);
    }

    public function update(UpdateBlogTagRequest $request, BlogTag $tag)
    {
        $tag->update($request->validated());
        return new BlogTagResource($tag);
    }

    public function destroy(BlogTag $tag)
    {
        $tag->delete();
        return response()->noContent();
    }
}
