<?php

namespace App\Http\Controllers;

use App\Http\Requests\changePasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\PasswordResetLink;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('list-users');

        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        return new UserResource(User::create($request->validated()));
    }

    public function profile(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        Task::where('user_id', $user->id)
            ->whereDate('due_date', Carbon::today())
            ->where('due_date', '<', now())
            ->where('status', '!=', 'expired')
            ->where('status', '!=', 'finished')
            ->update(['status' => 'expired']);

        return new UserResource(
            $user->load([
                'tasks' => function ($query) {
                    $query->whereDate('due_date', Carbon::today())
                        ->orderByRaw("
                            CASE 
                                WHEN status = 'expired' THEN 0 
                                ELSE 1 
                            END ASC,
                            CASE 
                                WHEN status = 'expired' THEN due_date 
                                ELSE NULL 
                            END ASC,
                            CASE 
                                WHEN status != 'expired' THEN due_date 
                                ELSE NULL 
                            END DESC
                        ");
                },
            ])
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return response()->json(['message' => 'Profil sikeresen frissítve', 'user' => $user]);
    }

    /**
     * Change password for authenticated user
     */
    public function changePassword(changePasswordRequest $request): JsonResponse
    {
        $user = $request->user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'A régi jelszó nem megfelelő!'], 400);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['message' => 'Jelszó sikeresen módosítva']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Get today's finished tasks for user
     */
    public function taskDoneToday(User $user)
    {
        $tasks = Task::whereDate("due_date", Date::today()->toDateString())
            ->get()
            ->where("status", "=", "finished")
            ->where("user_id", "=", $user->id);

        return TaskResource::collection($tasks);
    }

    /**
     * Send password reset link to user's email
     */
    public function sendResetLinkEmail(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'A megadott email cím nem található. / The provided email address was not found.'
            ], 404);
        }

        $token = Str::random(60);
        $hashedToken = Hash::make($token);
        
        $user->forceFill([
            'password_reset_token' => $hashedToken,
            'password_reset_token_created_at' => now()
        ])->save();

        $resetLink = url(config('app.url').'/reset-password?token='.$token.'&email='.$user->email);

        Mail::to($user->email)->send(new PasswordResetLink($resetLink));

        return response()->json([
            'message' => 'Jelszó-visszaállítási link elküldve az email címre. / Password reset link sent to email address.'
        ]);
    }
    protected function isTokenExpired($tokenCreatedAt)
    {
        if (!$tokenCreatedAt instanceof \Carbon\Carbon) {
            $tokenCreatedAt = \Carbon\Carbon::parse($tokenCreatedAt);
        }
        
        return $tokenCreatedAt->addHours(2)->isPast();
    }
    /**
     * Reset user's password using token
     */
    public function resetPassword(Request $request): JsonResponse
    {
        
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|confirmed|min:8',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !$user->password_reset_token) {
            return response()->json([
                'message' => 'Érvénytelen token vagy email cím. / Invalid token or email address.'
            ], 400);
        }
        
        if (!Hash::check($request->token, $user->password_reset_token)) {
            return response()->json([
                'message' => 'Érvénytelen token. / Invalid token.'
            ], 400);
        }
        if ($this->isTokenExpired($user->password_reset_token_created_at)) {
            return response()->json([
                'message' => 'A token lejárt. / The token has expired.'
            ], 400);
        }
        if (!$user->password_reset_token_created_at instanceof \Carbon\Carbon) {
            $user->password_reset_token_created_at = \Carbon\Carbon::parse($user->password_reset_token_created_at);
        }
    
        if ($user->password_reset_token_created_at->addHours(2)->isPast()) {
            return response()->json([
                'message' => 'A token lejárt. / The token has expired.'
            ], 400);
        }
    
        $user->forceFill([
            'password' => Hash::make($request->password),
            'password_reset_token' => null,
            'password_reset_token_created_at' => null
        ])->save();
    
        return response()->json([
            'message' => 'Jelszó sikeresen visszaállítva. / Password successfully reset.'
        ]);
    }
}