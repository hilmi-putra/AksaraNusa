<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Services\SearchService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    protected $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function index(Request $request)
    {
        $query = $request->input('q', '');

        if (strlen(trim($query)) < 2) {
            return response()->json([
                'success' => true,
                'data' => [
                    'books' => [],
                    'articles' => []
                ]
            ]);
        }

        $results = $this->searchService->search($query);

        return response()->json([
            'success' => true,
            'data' => $results
        ]);
    }
}
