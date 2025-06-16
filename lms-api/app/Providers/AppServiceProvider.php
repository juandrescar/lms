<?php

namespace App\Providers;

use App\Policies\BorrowingPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

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
