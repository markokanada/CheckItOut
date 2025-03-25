<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    Use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_task_index() :void    {
        $n = 5;
        $tasks = Task::factory($n)->create();

        $firstTask = $tasks->first();

        $resp = $this->getJson("/api/tasks");

        $resp->assertStatus(200);
        $resp->assertJsonCount($n, "data");

        $resp->assertJsonPath("data.0.id", $firstTask->id);
        $resp->assertJsonPath("data.0.descreption", $firstTask->descreption);
        $resp->assertJsonPath("data.0.title", $firstTask->title);
        $resp->assertJsonPath("data.0.due", $firstTask->due_date);
        
    }
}
