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
    );}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return response()->json(['message' => 'Profil sikeresen frissítve', 'user' => $user]);
    }

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

    public function taskDoneToday(User $user){
        $tasks = Task::whereDate("due_date", Date::today()->toDateString())->get()->where("status", "=", "finished")->where("user_id", "=", $user->id);


        return TaskResource::collection($tasks);
    }

}
