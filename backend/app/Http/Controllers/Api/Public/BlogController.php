<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\Public\BlogCategoryResource;
use App\Http\Resources\Public\BlogPostResource;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::with(['category', 'author', 'tags'])
            ->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('publish_date')
                  ->orWhere('publish_date', '<=', now());
            });

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->get('category'));
            });
        }

        if ($request->has('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->get('tag'));
            });
        }

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('title', 'like', "%{$search}%");
        }

        $posts = $query->latest('publish_date')->paginate($request->get('per_page', 10));

        return BlogPostResource::collection($posts);
    }

    public function show($slug)
    {
        $post = BlogPost::with(['category', 'author', 'tags', 'cta'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment view count
        $post->increment('view_count');

        // Get previous and next posts
        $previous = BlogPost::where('status', 'published')
            ->where('publish_date', '<', $post->publish_date ?? $post->created_at)
            ->orderBy('publish_date', 'desc')
            ->first();

        $next = BlogPost::where('status', 'published')
            ->where('publish_date', '>', $post->publish_date ?? $post->created_at)
            ->orderBy('publish_date', 'asc')
            ->first();

        // Get related posts by same category
        $related = BlogPost::where('status', 'published')
            ->where('id', '!=', $post->id)
            ->where('blog_category_id', $post->blog_category_id)
            ->inRandomOrder()
            ->take(3)
            ->get();

        $resource = new BlogPostResource($post);
        $resource->additional([
            'meta' => [
                'previous' => $previous ? new BlogPostResource($previous) : null,
                'next' => $next ? new BlogPostResource($next) : null,
                'related' => BlogPostResource::collection($related),
            ]
        ]);

        return $resource;
    }

    public function categories()
    {
        $categories = BlogCategory::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        return BlogCategoryResource::collection($categories);
    }

    public function featured()
    {
        $posts = BlogPost::with(['category', 'author', 'tags'])
            ->where('status', 'published')
            ->where('is_featured', true)
            ->latest('publish_date')
            ->take(3)
            ->get();

        return BlogPostResource::collection($posts);
    }

    public function popular()
    {
        $posts = BlogPost::with(['category', 'author', 'tags'])
            ->where('status', 'published')
            ->orderBy('view_count', 'desc')
            ->take(4)
            ->get();

        return BlogPostResource::collection($posts);
    }
}
