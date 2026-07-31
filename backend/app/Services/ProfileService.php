<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileService
{
    /**
     * Update user profile information.
     */
    public function updateProfile(User $user, array $data): User
    {
        // Handle avatar upload if present
        if (isset($data['avatar']) && $data['avatar'] instanceof \Illuminate\Http\UploadedFile) {
            // Delete old avatar if exists
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            $path = $data['avatar']->store('avatars', 'public');
            $data['avatar'] = url('storage/' . $path); // Or just the path, but usually it's better to store the path or full URL. The frontend expects a URL or we generate it on the fly. Wait, the frontend assumes `user.avatar` is a full URL or we prepend it. Let's just store the path and use asset() or just store the relative URL. Actually, the frontend might just use the string. I will store `/storage/` + path so it works everywhere.
            $data['avatar'] = '/storage/' . $path;
        } else {
            unset($data['avatar']); // Don't update avatar if not uploaded
        }

        $user->update($data);

        return $user;
    }

    /**
     * Update user password.
     */
    public function updatePassword(User $user, string $currentPassword, string $newPassword): void
    {
        if (!Hash::check($currentPassword, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password saat ini tidak cocok.'],
            ]);
        }

        $user->update([
            'password' => $newPassword, // Hashed automatically by model casts
        ]);
    }
}
