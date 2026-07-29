<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\SocialiteService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Stub controller for Google Socialite OAuth.
 *
 * These endpoints will be functional after configuring:
 * - GOOGLE_CLIENT_ID in .env
 * - GOOGLE_CLIENT_SECRET in .env
 * - GOOGLE_REDIRECT_URL in .env
 */
class SocialiteController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected SocialiteService $socialiteService,
    ) {}

    /**
     * Redirect to Google OAuth page.
     *
     * GET /api/auth/google
     */
    public function redirectToGoogle(): JsonResponse
    {
        try {
            $url = $this->socialiteService->getGoogleRedirectUrl();

            return $this->success(
                data: ['redirect_url' => $url],
                message: 'Redirect to Google.',
            );
        } catch (\RuntimeException $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: 501,
            );
        }
    }

    /**
     * Handle Google OAuth callback.
     *
     * GET /api/auth/google/callback
     */
    public function handleGoogleCallback(Request $request): JsonResponse
    {
        try {
            $result = $this->socialiteService->handleGoogleCallback(
                $request->input('code', ''),
            );

            return $this->success(
                data: [
                    'user' => [
                        'id' => $result['user']->id,
                        'name' => $result['user']->name,
                        'email' => $result['user']->email,
                        'role' => $result['user']->role->value,
                        'avatar' => $result['user']->avatar,
                    ],
                    'token' => $result['token'],
                    'token_type' => 'Bearer',
                    'redirect_url' => $result['redirect_url'],
                ],
                message: 'Login dengan Google berhasil.',
            );
        } catch (\RuntimeException $e) {
            $message = $e->getMessage();
            $statusCode = 501;
            
            if (str_contains($message, 'Email belum diverifikasi')) {
                $statusCode = 403; // Return 403 so frontend handles OTP redirect
            }

            return $this->error(
                message: $message,
                statusCode: $statusCode,
            );
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Google callback error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return $this->error(
                message: 'Gagal login dengan Google: ' . $e->getMessage(),
                statusCode: 500,
            );
        }
    }
}
