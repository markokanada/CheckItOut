<?php

namespace Tests\Feature;

use App\Models\Schedule;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScheduleApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_schedule_index(): void
    {
        $n = 5;
        $schedules = Schedule::factory($n)->create();
        $firstSchedule = $schedules->first();

        $response = $this->getJson('/api/schedules');

        $response->assertStatus(200);
        $response->assertJsonCount($n, 'data');
        $response->assertJsonPath('data.0.id', $firstSchedule->id);
        $response->assertJsonPath('data.0.title', $firstSchedule->title);
        $response->assertJsonPath('data.0.deadline', $firstSchedule->deadline);
    }
    public function test_schedule_store(): void
    {
        $schedule = Schedule::factory()->make();

        $response = $this->postJson('/api/schedules', $schedule->toArray());

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'deadline',
            ]
        ]);
        $response->assertJsonFragment([
            'title' => $schedule->title,
            'deadline' => $schedule->deadline,
        ]);
    }
}
