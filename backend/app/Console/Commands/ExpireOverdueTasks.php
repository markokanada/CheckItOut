<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Task;

class ExpireOverdueTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:expire-overdue-tasks';

    protected $description = 'Set expired status for overdue tasks';

    public function handle()
    {
        $now = Carbon::now();

        $expiredCount = Task::where('status', '!=', 'finished')
            ->where('due_date', '<', $now)
            ->update(['status' => 'expired']);

        $this->info("Updated $expiredCount task(s) to expired.");
    }
}
