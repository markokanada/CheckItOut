<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Task::where('due_date', '<', now())
        ->where('status', '!=', 'expired')
        ->where('status', '!=', 'finished')
        ->update(['status' => 'expired']);

    $tasks = Task::with(["user"])
        ->whereDate("due_date", Carbon::today())
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
        ")
        ->get();

    return TaskResource::collection($tasks);}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        return new TaskResource(Task::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return new TaskResource($task->load(["user", "category"]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task) :JsonResource
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        return $task->delete() ? response()->noContent() : abort(500);
    }
}
