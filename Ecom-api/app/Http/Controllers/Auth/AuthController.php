<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Service\AuthService;
use Illuminate\Http\Request;


use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    protected AuthService  $AuthService;
    public function __construct(AuthService $AuthService)
    {
        $this->AuthService = $AuthService;
    }

    public function register(Request $request)
    {
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => ['required' ,
            'confirmed',
            Password::min(8)
            ->mixedCase()
            ->letters()
            ->numbers()
            ->symbols()
            ->uncompromised()
            ],

        ]);

        return $this->AuthService->Register($validated);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
        return $this->AuthService->login($validated);
    }

    public function logout(Request $request)
    {
        return $this->AuthService->logout($request->user());
    }
}


