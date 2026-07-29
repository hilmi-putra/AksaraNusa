<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case User = 'user';

    /**
     * Get the human-readable label for the role.
     */
    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::User => 'User',
        };
    }

    /**
     * Get the dashboard URL for the role after login.
     */
    public function dashboardUrl(): string
    {
        return match ($this) {
            self::Admin => '/admin/dashboard',
            self::User => '/dashboard',
        };
    }
}
