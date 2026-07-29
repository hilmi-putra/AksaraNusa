<?php

namespace App\Services\Auth;

use App\Enums\OtpType;
use App\Enums\UserRole;
use App\Exceptions\Auth\AuthenticationException;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        protected OtpService $otpService,
    ) {}

    /**
     * Register a new user and send OTP verification email.
     *
     * @param array<string, mixed> $data
     * @return User
     */
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'], // Hashed via model cast
                'phone' => $data['phone'] ?? null,
                'role' => UserRole::User,
                'is_active' => true,
            ]);

            // Generate and send OTP
            $this->otpService->generate(
                email: $user->email,
                type: OtpType::EmailVerification,
                userName: $user->name,
            );

            return $user;
        });
    }

    /**
     * Verify email OTP and activate the user account.
     *
     * @throws \App\Exceptions\Auth\OtpException
     */
    public function verifyEmailOtp(string $email, string $otp): User
    {
        // Verify the OTP (throws exception if invalid)
        $this->otpService->verify($email, $otp, OtpType::EmailVerification);

        // Find the user and mark email as verified
        $user = User::where('email', $email)->firstOrFail();
        $user->markEmailAsVerified();

        // Clean up all OTPs for this email
        $this->otpService->cleanup($email, OtpType::EmailVerification);

        return $user;
    }

    /**
     * Resend email verification OTP.
     *
     * @throws \App\Exceptions\Auth\OtpException
     * @throws AuthenticationException
     */
    public function resendEmailOtp(string $email): void
    {
        $user = User::where('email', $email)->firstOrFail();

        if ($user->hasVerifiedEmail()) {
            throw new AuthenticationException('Email sudah terverifikasi.', 422);
        }

        $this->otpService->resend(
            email: $user->email,
            type: OtpType::EmailVerification,
            userName: $user->name,
        );
    }

    /**
     * Login a user with email and password.
     *
     * @return array{user: User, token: string, redirect_url: string}
     * @throws AuthenticationException
     */
    public function login(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        // Check credentials
        if (!$user || !Hash::check($password, $user->password)) {
            throw new AuthenticationException('Email atau password salah.');
        }

        // Check if email is verified
        if (!$user->hasVerifiedEmail()) {
            throw new AuthenticationException('Email belum diverifikasi. Silakan cek inbox Anda.', 403);
        }

        // Check if account is active
        if (!$user->is_active) {
            throw new AuthenticationException('Akun Anda telah dinonaktifkan. Hubungi administrator.', 403);
        }

        // Revoke existing tokens (optional: single device login)
        $user->tokens()->delete();

        // Create new Sanctum token
        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'redirect_url' => $user->getDashboardUrl(),
        ];
    }

    /**
     * Logout a user by revoking all tokens.
     */
    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }

    /**
     * Send password reset OTP.
     *
     * @throws \App\Exceptions\Auth\OtpException
     */
    public function sendPasswordResetOtp(string $email): void
    {
        $user = User::where('email', $email)->firstOrFail();

        $this->otpService->generate(
            email: $user->email,
            type: OtpType::PasswordReset,
            userName: $user->name,
        );
    }

    /**
     * Verify password reset OTP.
     *
     * @throws \App\Exceptions\Auth\OtpException
     */
    public function verifyPasswordResetOtp(string $email, string $otp): bool
    {
        return $this->otpService->verify($email, $otp, OtpType::PasswordReset);
    }

    /**
     * Reset the user's password using a valid OTP.
     *
     * @throws \App\Exceptions\Auth\OtpException
     */
    public function resetPassword(string $email, string $otp, string $newPassword): void
    {
        // First verify the OTP again to be secure
        $this->otpService->verify($email, $otp, OtpType::PasswordReset);

        $user = User::where('email', $email)->firstOrFail();
        
        $user->update([
            'password' => $newPassword,
        ]);

        // Clean up OTP after successful reset
        $this->otpService->cleanup($email, OtpType::PasswordReset);

        // Optional: revoke all tokens so user has to login with new password
        $user->tokens()->delete();
    }
}
