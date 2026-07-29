<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogCTARequest;
use App\Http\Requests\Admin\UpdateBlogCTARequest;
use App\Http\Resources\Admin\BlogCTAResource;
use App\Models\BlogCTA;
use Illuminate\Http\Request;

class BlogCTAController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogCTA::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $ctas = $query->latest()->paginate($request->get('per_page', 10));

        return BlogCTAResource::collection($ctas);
    }

    public function store(StoreBlogCTARequest $request)
    {
        $cta = BlogCTA::create($request->validated());
        return new BlogCTAResource($cta);
    }

    public function show(BlogCTA $cta)
    {
        return new BlogCTAResource($cta);
    }

    public function update(UpdateBlogCTARequest $request, BlogCTA $cta)
    {
        $cta->update($request->validated());
        return new BlogCTAResource($cta);
    }

    public function destroy(BlogCTA $cta)
    {
        $cta->delete();
        return response()->noContent();
    }
}
