<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Exception;

class ShippingService
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.rajaongkir.api_key');
        $this->baseUrl = config('services.rajaongkir.base_url', 'https://rajaongkir.komerce.id/api/v1');
    }

    /**
     * Resolve RajaOngkir Destination ID from wilayah.id region names
     */
    public function resolveDestinationId(array $destinationInfo): ?string
    {
        $villageCode = $destinationInfo['village_code'] ?? null;
        $villageName = $destinationInfo['village_name'] ?? '';
        $districtName = $destinationInfo['district_name'] ?? '';
        $regencyName = $destinationInfo['regency_name'] ?? '';
        $provinceName = $destinationInfo['province_name'] ?? '';

        if (!$villageCode || !$villageName) {
            return null;
        }

        // Cache the mapping mapping using village_code to avoid repeated searches
        return Cache::rememberForever("rajaongkir_mapping_{$villageCode}", function () use ($villageName, $districtName, $regencyName, $provinceName) {
            
            // Build search query containing village, district, regency
            // We use a combination to make the search as specific as possible
            $searchQuery = trim("{$villageName} {$districtName} {$regencyName}");
            
            $response = Http::withHeaders([
                'Key' => $this->apiKey,
                'Accept' => 'application/json'
            ])->timeout(15)->get($this->baseUrl . '/destination/domestic-destination', [
                'search' => $searchQuery
            ]);

            if ($response->failed()) {
                // Fallback to searching just the village name if combination fails or API errors
                return $this->fallbackSearch($villageName, $regencyName);
            }

            $results = $response->json('data', []);
            
            if (empty($results)) {
                return $this->fallbackSearch($villageName, $regencyName);
            }

            // Find the most exact match
            foreach ($results as $result) {
                // Check if city matches (RajaOngkir city_name might have KOTA/KABUPATEN prefixes, so we use string contains)
                $resultCity = strtoupper($result['city_name'] ?? '');
                $inputCity = strtoupper($regencyName);
                
                // Clean input city from prefixes for safer matching
                $inputCityClean = str_replace(['KOTA ', 'KABUPATEN ', 'KAB. '], '', $inputCity);

                if (Str::contains($resultCity, $inputCityClean) || Str::contains($inputCityClean, $resultCity)) {
                    return (string) $result['id'];
                }
            }

            // If no perfect match found but we have results, return the first one as best effort
            return (string) $results[0]['id'];
        });
    }

    /**
     * Fallback search if the combined search yields no result
     */
    private function fallbackSearch(string $villageName, string $regencyName): ?string
    {
        $response = Http::withHeaders([
            'Key' => $this->apiKey,
            'Accept' => 'application/json'
        ])->timeout(15)->get($this->baseUrl . '/destination/domestic-destination', [
            'search' => $villageName
        ]);

        if ($response->failed()) {
            return null;
        }

        $results = $response->json('data', []);
        
        foreach ($results as $result) {
            $resultCity = strtoupper($result['city_name'] ?? '');
            $inputCityClean = str_replace(['KOTA ', 'KABUPATEN ', 'KAB. '], '', strtoupper($regencyName));

            if (Str::contains($resultCity, $inputCityClean) || Str::contains($inputCityClean, $resultCity)) {
                return (string) $result['id'];
            }
        }

        return !empty($results) ? (string) $results[0]['id'] : null;
    }

    /**
     * Calculate shipping cost via RajaOngkir V2 domestic cost
     */
    public function calculateShippingCost(string $destinationSubDistrictId, int $weight, string $courier): array
    {
        $originSubDistrictId = config('services.rajaongkir.origin_city_id', env('STORE_ORIGIN_CITY_ID', '433')); 
        
        $weight = max($weight, 1);

        $cacheKey = "shipping_cost_v2_{$originSubDistrictId}_{$destinationSubDistrictId}_{$weight}_{$courier}";

        return Cache::remember($cacheKey, 60 * 60, function () use ($originSubDistrictId, $destinationSubDistrictId, $weight, $courier) {
            $response = Http::asForm()->withHeaders([
                'Key' => $this->apiKey,
                'Accept' => 'application/json'
            ])->timeout(15)->post($this->baseUrl . '/calculate/domestic-cost', [
                'origin' => (string)$originSubDistrictId,
                'destination' => (string)$destinationSubDistrictId,
                'weight' => $weight,
                'courier' => $courier,
            ]);

            if ($response->failed()) {
                throw new Exception('Failed to calculate shipping cost: ' . $response->body());
            }

            $results = $response->json('data', []);
            $services = [];

            foreach ($results as $cost) {
                $services[] = [
                    'courier' => strtoupper($cost['code'] ?? $courier),
                    'courier_name' => $cost['name'] ?? $courier,
                    'service' => $cost['service'],
                    'description' => $cost['description'],
                    'cost' => $cost['cost'] ?? 0,
                    'etd' => $cost['etd'] ?? '-',
                ];
            }

            return $services;
        });
    }

    /**
     * Calculate shipping for multiple couriers
     */
    public function calculateAllCouriers(string $destinationSubDistrictId, int $weight): array
    {
        $availableCouriers = ['jnt'];
        $allServices = [];

        foreach ($availableCouriers as $courier) {
            try {
                $services = $this->calculateShippingCost($destinationSubDistrictId, $weight, $courier);
                $allServices = array_merge($allServices, $services);
            } catch (Exception $e) {
                continue;
            }
        }

        return $allServices;
    }
}
