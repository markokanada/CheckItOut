<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Mail\RegisteredMail;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $cred = $request->validated();

        if (Auth::attempt($cred)) {
            $token = $request->user()->createToken('app');

            return response()->json([
                "data" => [
                    "token" => $token->plainTextToken
                ]
            ]);
        } else {
            return response()->json([
                "data" => [
                    "message" => "Sikertelen belépés"
                ]
            ], 401);
        }
    }

    public function register(StoreUserRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);
        event(new Registered($user));
        Mail::to($user->email)->send(new RegisteredMail());
        return response()->json([
            "data" => [
                "message" => "Sikeresen regisztrál $user->email."
            ]
        ]);
    }
}
