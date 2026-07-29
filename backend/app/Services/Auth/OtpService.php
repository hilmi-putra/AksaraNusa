<?php

namespace App\Services\Auth;

use App\Enums\OtpType;
use App\Exceptions\Auth\OtpException;
use App\Mail\OtpVerificationMail;
use App\Models\OtpVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class OtpService
{
    /**
     * Maximum number of verification attempts per OTP.
     */
    protected const MAX_ATTEMPTS = 5;

    /**
     * Minimum interval (in seconds) between resend requests.
     */
    protected const RESEND_THROTTLE_SECONDS = 60;

    /**
     * Generate a new OTP for the given email and type.
     *
     * @return string The plain OTP code (for sending via email).
     */
    public function generate(string $email, OtpType $type, string $userName = 'User'): string
    {
        // Invalidate any existing active OTPs for this email and type
        OtpVerification::forEmail($email)
            ->forType($type)
            ->active()
            ->delete();

        // Generate a random 6-digit OTP
        $plainOtp = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store the hashed OTP
        $expiryMinutes = (int) config('auth.otp_expiry_minutes', 10);

        OtpVerification::create([
            'email' => $email,
            'otp' => Hash::make($plainOtp),
            'type' => $type,
            'expires_at' => now()->addMinutes($expiryMinutes),
            'attempts' => 0,
        ]);

        // Send the OTP via email
        Mail::to($email)->send(new OtpVerificationMail(
            otp: $plainOtp,
            userName: $userName,
            expiryMinutes: $expiryMinutes,
        ));

        return $plainOtp;
    }

    /**
     * Verify the OTP for the given email and type.
     *
     * @throws OtpException
     */
    public function verify(string $email, string $otp, OtpType $type): bool
    {
        $otpRecord = OtpVerification::forEmail($email)
            ->forType($type)
            ->active()
            ->latestFirst()
            ->first();

        if (!$otpRecord) {
            throw OtpException::notFound();
        }

        if ($otpRecord->isExpired()) {
            throw OtpException::expired();
        }

        if ($otpRecord->hasExceededAttempts(self::MAX_ATTEMPTS)) {
            throw OtpException::maxAttemptsExceeded();
        }

        // Increment attempts before checking
        $otpRecord->incrementAttempts();

        if (!Hash::check($otp, $otpRecord->otp)) {
            throw OtpException::invalid();
        }

        // Mark as verified
        $otpRecord->markAsVerified();

        return true;
    }

    /**
     * Resend OTP — invalidate old ones and generate a new one.
     *
     * @throws OtpException
     * @return string The new plain OTP code.
     */
    public function resend(string $email, OtpType $type, string $userName = 'User'): string
    {
        // Throttle resend requests
        $lastOtp = OtpVerification::forEmail($email)
            ->forType($type)
            ->latestFirst()
            ->first();

        if ($lastOtp && $lastOtp->created_at->diffInSeconds(now()) < self::RESEND_THROTTLE_SECONDS) {
            throw OtpException::resendThrottled();
        }

        return $this->generate($email, $type, $userName);
    }

    /**
     * Clean up all OTPs for the given email and type after successful verification.
     */
    public function cleanup(string $email, OtpType $type): void
    {
        OtpVerification::forEmail($email)
            ->forType($type)
            ->delete();
    }
}
