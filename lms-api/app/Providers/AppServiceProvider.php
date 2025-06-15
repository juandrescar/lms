<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Policies\BorrowingPolicy;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('view-borrowings', [BorrowingPolicy::class, 'viewBorrowings']);
    }
}
