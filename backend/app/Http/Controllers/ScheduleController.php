<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use App\Models\User;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ScheduleResource::collection(Schedule::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request)
    {
        $schedule = Schedule::create($request->all());
        return new ScheduleResource($schedule);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        return new ScheduleResource($schedule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScheduleRequest $request, Schedule $schedule)
    {
        $schedule = Schedule::findOrfail($schedule->id);
        $schedule->update($request->all());
        return new ScheduleResource($schedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        Schedule::destroy($schedule->id);
        return response()->json(null, 204);
    }

    public function scheduleComposer(User $user) : mixed {
        $schedules = $user->load("tasks")->only("tasks")['tasks']->toArray();
        usort($schedules, function ($a, $b){
            return $b['priority'] <=> $a['priority'];
        });

        usort($schedules, function ($a, $b){
            return $a['due_date'] <=> $b['due_date'];
        });
        return $schedules;
    }
}
