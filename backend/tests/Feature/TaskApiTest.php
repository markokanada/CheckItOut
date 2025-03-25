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

    public function test_task_store() : void {
        $task = Task::factory()->make();

        $resp = $this->postJson("/api/tasks", $task->toArray());

        $resp->assertStatus(201);
        $resp->assertJsonCount(1);

        $resp->assertJsonStructure([
            "data" => [
                "id",
                "title",
                "description",
                "due"
            ]
            ])
            ->assertJsonFragment([
                "title" => $task->title,
                "due" => $task->due_date
            ]);
    }

    public function test_task_delete() : Void {
        $tasks = Task::factory(5);
        $id = $tasks->last()->id;

        $resp = $this->deleteJson("/api/tasks/$id");

        $resp->assertStatus(204);
        $this->assertDatabaseMissing(Task::class, ["id" => $id]);
    }
}
