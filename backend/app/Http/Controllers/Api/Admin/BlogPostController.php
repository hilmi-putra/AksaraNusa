<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogPostRequest;
use App\Http\Requests\Admin\UpdateBlogPostRequest;
use App\Http\Resources\Admin\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::with(['category', 'author', 'tags', 'cta']);

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('title', 'like', "%{$search}%");
        }

        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        $posts = $query->latest()->paginate($request->get('per_page', 10));

        return BlogPostResource::collection($posts);
    }

    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();
        
        // Auto calculate reading time if not provided or empty
        if (empty($data['reading_time']) && !empty($data['content'])) {
            $data['reading_time'] = ceil(str_word_count(strip_tags($data['content'])) / 200);
        }

        $post = BlogPost::create($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        $post->load(['category', 'author', 'tags', 'cta']);
        return new BlogPostResource($post);
    }

    public function show(BlogPost $post)
    {
        $post->load(['category', 'author', 'tags', 'cta']);
        return new BlogPostResource($post);
    }

    public function update(UpdateBlogPostRequest $request, BlogPost $post)
    {
        $data = $request->validated();

        if (isset($data['content'])) {
            $data['reading_time'] = ceil(str_word_count(strip_tags($data['content'])) / 200);
        }

        $post->update($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        $post->load(['category', 'author', 'tags', 'cta']);
        return new BlogPostResource($post);
    }

    public function destroy(BlogPost $post)
    {
        $post->delete();
        return response()->noContent();
    }

    public function duplicate(BlogPost $post)
    {
        $newPost = $post->replicate();
        $newPost->title = $post->title . ' (Copy)';
        $newPost->slug = $post->slug . '-copy-' . time();
        $newPost->status = 'draft';
        $newPost->view_count = 0;
        $newPost->save();

        // Sync tags
        if ($post->tags->isNotEmpty()) {
            $newPost->tags()->sync($post->tags->pluck('id'));
        }

        $newPost->load(['category', 'author', 'tags', 'cta']);
        return new BlogPostResource($newPost);
    }
}
