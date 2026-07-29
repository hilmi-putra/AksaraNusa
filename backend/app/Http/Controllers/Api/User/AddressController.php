<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\UserAddress;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'data' => $request->user()->addresses()->orderByDesc('is_primary')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string',
            'recipient_name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'province_code' => 'required|string',
            'province_name' => 'required|string',
            'regency_code' => 'required|string',
            'regency_name' => 'required|string',
            'district_code' => 'required|string',
            'district_name' => 'required|string',
            'village_code' => 'nullable|string',
            'village_name' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'is_primary' => 'boolean',
        ]);

        if ($validated['is_primary'] ?? false) {
            $request->user()->addresses()->update(['is_primary' => false]);
        }

        $address = $request->user()->addresses()->create($validated);
        
        return response()->json(['message' => 'Address created', 'data' => $address]);
    }

    public function update(Request $request, $id)
    {
        $address = $request->user()->addresses()->findOrFail($id);
        
        $validated = $request->validate([
            'label' => 'sometimes|string',
            'recipient_name' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'address' => 'sometimes|string',
            'province_code' => 'sometimes|string',
            'province_name' => 'sometimes|string',
            'regency_code' => 'sometimes|string',
            'regency_name' => 'sometimes|string',
            'district_code' => 'sometimes|string',
            'district_name' => 'sometimes|string',
            'village_code' => 'nullable|string',
            'village_name' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'is_primary' => 'boolean',
        ]);

        if ($validated['is_primary'] ?? false) {
            $request->user()->addresses()->update(['is_primary' => false]);
        }

        $address->update($validated);

        return response()->json(['message' => 'Address updated', 'data' => $address]);
    }

    public function destroy(Request $request, $id)
    {
        $address = $request->user()->addresses()->findOrFail($id);
        $address->delete();
        
        return response()->json(['message' => 'Address deleted']);
    }
}
