<?php

namespace App\Exceptions\Auth;

use Exception;

class OtpException extends Exception
{
    public static function expired(): self
    {
        return new self('Kode OTP sudah kedaluwarsa. Silakan minta kode baru.', 422);
    }

    public static function invalid(): self
    {
        return new self('Kode OTP tidak valid.', 422);
    }

    public static function maxAttemptsExceeded(): self
    {
        return new self('Terlalu banyak percobaan. Silakan minta kode OTP baru.', 429);
    }

    public static function resendThrottled(): self
    {
        return new self('Mohon tunggu beberapa saat sebelum meminta kode OTP baru.', 429);
    }

    public static function notFound(): self
    {
        return new self('Tidak ditemukan kode OTP aktif untuk email ini.', 404);
    }
}
