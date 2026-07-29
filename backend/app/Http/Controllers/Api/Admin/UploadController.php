<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,pdf,epub,mobi|max:20480', // max 20MB
        ]);

        if ($request->file('file')) {
            $file = $request->file('file');
            
            // Store file in public disk under 'uploads' directory
            $path = $file->store('uploads', 'public');
            
            // Generate full URL
            $url = asset('storage/' . $path);

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path,
                'size' => $file->getSize(),
                'name' => $file->getClientOriginalName()
            ]);
        }

        return response()->json(['success' => false, 'message' => 'No file uploaded'], 400);
    }
}
