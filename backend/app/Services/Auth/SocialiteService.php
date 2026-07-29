<?php

namespace App\Services\Auth;

use App\Enums\AuthProvider;
use App\Enums\UserRole;
use App\Models\User;

/**
 * Stub service for Google Socialite integration.
 *
 * This service is prepared for future implementation.
 * After configuring Google OAuth credentials in .env:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - GOOGLE_REDIRECT_URL
 *
 * Uncomment the Socialite usage and implement the methods.
 */
class SocialiteService
{
    /**
     * Get the redirect URL for Google OAuth.
     *
     * TODO: Implement after Google OAuth is configured.
     *
     * @return string
     */
    public function getGoogleRedirectUrl(): string
    {
        return \Laravel\Socialite\Facades\Socialite::driver('google')
            ->stateless()
            ->redirect()
            ->getTargetUrl();
    }

    /**
     * Handle the Google OAuth callback and return user + token.
     *
     * @return array{user: User, token: string, redirect_url: string}
     */
    public function handleGoogleCallback(string $code): array
    {
        $driver = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless();

        // Fix for local Laragon/Windows environment where IPv6 or SSL might cause the request to hang or fail
        if (app()->environment('local')) {
            $driver->setHttpClient(new \GuzzleHttp\Client([
                'curl' => [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4],
                'verify' => false,
            ]));
        }

        $googleUser = $driver->user();
        
        $user = User::where('email', $googleUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => bcrypt(\Illuminate\Support\Str::random(16)), // Dummy password
                'provider' => AuthProvider::Google->value,
                'provider_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'role' => UserRole::User,
                'is_active' => true,
                'email_verified_at' => now(), // Auto-verify email for Google OAuth
            ]);
        } else {
            // Update provider info if they login via Google again
            $user->update([
                'provider' => AuthProvider::Google->value,
                'provider_id' => $googleUser->getId(),
                'avatar' => $user->avatar ?? $googleUser->getAvatar(),
                'email_verified_at' => $user->email_verified_at ?? now(), // Verify if not yet verified
            ]);
        }
        
        $token = $user->createToken('auth-token')->plainTextToken;
        
        return [
            'user' => $user,
            'token' => $token,
            'redirect_url' => $user->getDashboardUrl(),
        ];
    }
}
