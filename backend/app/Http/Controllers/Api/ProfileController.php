<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdatePasswordRequest;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Services\ProfileService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ProfileService $profileService,
    ) {}

    /**
     * Get the authenticated user's profile.
     *
     * GET /api/profile
     */
    public function show(Request $request): JsonResponse
    {
        return $this->success(
            data: $request->user(),
            message: 'Profil berhasil dimuat.'
        );
    }

    /**
     * Update the authenticated user's profile.
     *
     * POST /api/profile (with _method=PUT for FormData)
     * PUT /api/profile
     */
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $user = $this->profileService->updateProfile(
                user: $request->user(),
                data: $request->validated()
            );

            return $this->success(
                data: $user,
                message: 'Profil berhasil diperbarui.'
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: 500
            );
        }
    }

    /**
     * Update the authenticated user's password.
     *
     * PUT /api/profile/password
     */
    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        try {
            $this->profileService->updatePassword(
                user: $request->user(),
                currentPassword: $request->validated('current_password'),
                newPassword: $request->validated('password')
            );

            return $this->success(
                data: null,
                message: 'Password berhasil diperbarui.'
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: 500
            );
        }
    }
}
