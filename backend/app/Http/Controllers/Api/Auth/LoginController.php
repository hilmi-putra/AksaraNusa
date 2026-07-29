<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected AuthService $authService,
    ) {}

    /**
     * Login a user and return token.
     *
     * POST /api/auth/login
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->login(
                email: $request->validated('email'),
                password: $request->validated('password'),
            );

            return $this->success(
                data: [
                    'user' => [
                        'id' => $result['user']->id,
                        'name' => $result['user']->name,
                        'email' => $result['user']->email,
                        'role' => $result['user']->role->value,
                        'avatar' => $result['user']->avatar,
                        'phone' => $result['user']->phone,
                    ],
                    'token' => $result['token'],
                    'token_type' => 'Bearer',
                    'redirect_url' => $result['redirect_url'],
                ],
                message: 'Login berhasil.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: $e->getMessage(),
                statusCode: is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 401,
            );
        }
    }

    /**
     * Logout the authenticated user (revoke all tokens).
     *
     * POST /api/auth/logout
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $this->authService->logout($request->user());

            return $this->success(
                message: 'Logout berhasil.',
            );
        } catch (\Exception $e) {
            return $this->error(
                message: 'Gagal logout.',
                statusCode: 500,
            );
        }
    }
}
