<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Mockery;
use PHPUnit\Framework\TestCase;

class TaskTest extends TestCase
{
    public function test_get_statuses_returns_expected_array(): void
    {
        $expectedStatuses = [
            "új",
            "folyamatban",
            "kész"
        ];

        $this->assertEquals($expectedStatuses, Task::getStatuses());
    }
}
