<?php

namespace App\Enums;

enum AuthProvider: string
{
    case Google = 'google';

    /**
     * Get the human-readable label for the provider.
     */
    public function label(): string
    {
        return match ($this) {
            self::Google => 'Google',
        };
    }
}
