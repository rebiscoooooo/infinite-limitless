<?php

namespace App\Providers;

use App\Models\AdminUser;
use App\Models\Product;
use App\Models\SiteStat;
use App\Models\WorldPlanRegistration;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\StatsSeeder;
use Illuminate\Database\Events\MigrationsEnded;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;
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
        // Avoid interference with isolated unit/feature test suites that test from empty tables
        if (app()->environment('testing')) {
            return;
        }

        // 1. Auto-seed after running migrations from terminal / CLI
        Event::listen(MigrationsEnded::class, function () {
            $this->autoSeedIfNeeded();
        });

        // 2. Auto-seed everywhere outside testing (web requests, tinker, dev server, production).
        // Run the 4+ existence queries at most once per 10 minutes instead of on every request.
        try {
            if (!Cache::get('baseline_seed_checked')) {
                $this->autoSeedIfNeeded();
                Cache::put('baseline_seed_checked', true, 600);
            }
        } catch (\Throwable $e) {
            // Cache table may not exist yet (fresh install before migrations)
            $this->autoSeedIfNeeded();
        }
    }

    /**
     * Automatically seed essential baseline data if tables are empty.
     * Guarantees that admin accounts, original catalog products, site stats,
     * and baseline records are always populated without requiring manual `db:seed`.
     */
    public function autoSeedIfNeeded(): void
    {
        try {
            // Verify database table existence before querying
            if (!Schema::hasTable('admin_users')) {
                return;
            }

            // Auto-seed default Administrator accounts (admin / infinite_admin)
            if (AdminUser::count() === 0) {
                (new AdminUserSeeder())->run();
            }

            // Auto-seed the 18 authentic catalog products
            if (Schema::hasTable('products') && Product::count() === 0) {
                (new ProductSeeder())->run();
            }

            // Auto-seed site metrics and product stats
            if (Schema::hasTable('site_stats') && SiteStat::count() === 0) {
                (new StatsSeeder())->run();
            }

            // Ensure Academy enhancement schema additions exist without manual intervention
            if (Schema::hasTable('academy_trainings')) {
                \App\Models\AcademyTraining::ensureAttachmentsColumn();
                \App\Models\AcademyCommandment::ensureTableExists();
            }
        } catch (\Throwable $e) {
            // Gracefully catch during initial table creation or migrations
        }
    }
}
