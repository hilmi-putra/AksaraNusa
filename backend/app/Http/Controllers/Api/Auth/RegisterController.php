<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResendOtpRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Services\Auth\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected AuthService $authService,
    ) {}

    /**
     * Register a new user account.
     *
     * POST /api/auth/register
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->register($request->validated());

            return $this->success(
                data: [
                    'email' => $user->email,
                ],
                message: 'Registrasi berhasil. Silakan cek email Anda untuk kode verifikasi.',
                statusCode: 201,
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: $e->getCode() ?: 500,
            );
        }
    }

    /**
     * Verify email using OTP code.
     *
     * POST /api/auth/verify-otp
     */
    public function verifyOtp(VerifyOtpRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->verifyEmailOtp(
                email: $request->validated('email'),
                otp: $request->validated('otp'),
            );

            return $this->success(
                data: [
                    'email' => $user->email,
                    'verified_at' => $user->email_verified_at->toISOString(),
                ],
                message: 'Email berhasil diverifikasi. Silakan login.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 422,
            );
        }
    }

    /**
     * Resend OTP verification code.
     *
     * POST /api/auth/resend-otp
     */
    public function resendOtp(ResendOtpRequest $request): JsonResponse
    {
        try {
            $this->authService->resendEmailOtp(
                email: $request->validated('email'),
            );

            return $this->success(
                message: 'Kode verifikasi baru telah dikirim ke email Anda.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 422,
            );
        }
    }
}
