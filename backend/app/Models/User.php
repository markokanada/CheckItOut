<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'password_reset_token_created_at' => 'datetime'
        ];
    }

    public function shared_tasks(){
        return $this->belongsToMany(Task::class, "users_tasks");
    }

    public function shared_tasklists_guests()
    {
        return $this->belongsToMany(User::class, 'users_users', 'owner_id', 'guest_id');
    }

    public function shared_tasklists_owners()
    {
        return $this->belongsToMany(User::class, 'users_users', 'guest_id', 'owner_id');
    }

    public function tasks() : HasMany {
        return $this->hasMany(Task::class, "user_id", "id");
    }

    public function schedules() : HasMany {
        return $this->hasMany(Schedule::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
