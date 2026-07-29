<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GenreRequest;
use App\Models\Genre;
use Illuminate\Support\Str;

class GenreController extends Controller
{
    public function index()
    {
        $query = Genre::query();

        if (request('search')) {
            $search = request('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $perPage = request('per_page', 50);
        $genres = $query->latest()->paginate($perPage);

        return response()->json($genres);
    }

    public function store(GenreRequest $request)
    {
        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $genre = Genre::create($data);
        return response()->json($genre, 201);
    }

    public function show(Genre $genre)
    {
        return response()->json($genre);
    }

    public function update(GenreRequest $request, Genre $genre)
    {
        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $genre->update($data);
        return response()->json($genre);
    }

    public function destroy(Genre $genre)
    {
        $genre->delete();
        return response()->json(null, 204);
    }
}
