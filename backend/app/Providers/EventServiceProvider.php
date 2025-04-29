<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use App\Listeners\CreateDefaultCategoriesForUser;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Az eseményekhez tartozó kezelők.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            CreateDefaultCategoriesForUser::class,
        ],
    ];

    /**
     * Regisztrálja az eseményeket és eseménykezelőket.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
