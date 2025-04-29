<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource("users", UserController::class)->except("index");

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource("categories", CategoryController::class);
    Route::apiResource("schedule", ScheduleController::class);
    Route::apiResource("tasks", TaskController::class);

    Route::get("/scheduleComposer/{user}", [ScheduleController::class, 'scheduleComposer'])
        ->name("schedule.compose");

    Route::get("users", [AdminController::class, "index"]);
    Route::get("tasks/today/{user}", [UserController::class, 'taskDoneToday']);
});
