<?php

namespace App\Http\Controllers\Api\Store;

use App\Http\Controllers\Controller;
use App\Services\ShippingService;
use Illuminate\Http\Request;
use Exception;

class ShippingController extends Controller
{
    protected ShippingService $shippingService;

    public function __construct(ShippingService $shippingService)
    {
        $this->shippingService = $shippingService;
    }

    /**
     * Calculate shipping cost
     */
    public function cost(Request $request)
    {
        $request->validate([
            'destination' => 'required|array',
            'destination.province_name' => 'required|string',
            'destination.regency_name' => 'required|string',
            'destination.district_name' => 'required|string',
            'destination.village_name' => 'required|string',
            'destination.village_code' => 'required|string',
            'weight' => 'required|integer|min:1',
            'courier' => 'nullable|string',
        ]);

        try {
            $courier = $request->courier;
            $destinationInfo = $request->destination;

            // Resolve RajaOngkir ID based on the provided names
            $rajaOngkirId = $this->shippingService->resolveDestinationId($destinationInfo);

            if (!$rajaOngkirId) {
                return response()->json(['message' => 'Alamat tidak dikenali oleh sistem pengiriman.'], 400);
            }

            if ($courier) {
                $services = $this->shippingService->calculateShippingCost(
                    $rajaOngkirId,
                    $request->weight,
                    $courier
                );
            } else {
                $services = $this->shippingService->calculateAllCouriers(
                    $rajaOngkirId,
                    $request->weight
                );
            }

            return response()->json(['data' => $services]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
