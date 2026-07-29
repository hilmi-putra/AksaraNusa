<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\Auth\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected AuthService $authService,
    ) {}

    /**
     * Send password reset OTP.
     *
     * POST /api/auth/forgot-password/send-otp
     */
    public function sendOtp(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $this->authService->sendPasswordResetOtp($request->validated('email'));

            return $this->success(
                message: 'Kode verifikasi telah dikirim ke email Anda.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 422,
            );
        }
    }

    /**
     * Verify password reset OTP.
     *
     * POST /api/auth/forgot-password/verify-otp
     */
    public function verifyOtp(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'otp' => ['required', 'string', 'size:6'],
        ]);

        try {
            $this->authService->verifyPasswordResetOtp(
                email: $request->input('email'),
                otp: $request->input('otp'),
            );

            return $this->success(
                message: 'Kode OTP valid. Silakan buat password baru.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 422,
            );
        }
    }

    /**
     * Reset the user's password.
     *
     * POST /api/auth/forgot-password/reset
     */
    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $this->authService->resetPassword(
                email: $request->validated('email'),
                otp: $request->validated('otp'),
                newPassword: $request->validated('password'),
            );

            return $this->success(
                message: 'Password berhasil diubah. Silakan login dengan password baru.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 422,
            );
        }
    }
}
