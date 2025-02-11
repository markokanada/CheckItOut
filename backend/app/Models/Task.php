<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        "description",
        "due_date",
        "priority",
        "status",
        "category_id"
    ];

    public static function getStatuses() {
        return [
            "új",
            "folyamatban",
            "kész"
        ];
    }

    public function user() : BelongsTo {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function schudels() : BelongsToMany {
        return $this->belongsToMany("task_schedule");
    }
}
