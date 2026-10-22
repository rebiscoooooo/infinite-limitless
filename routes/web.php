<?php

use App\Http\Controllers\Admin\ActivityLogAdminController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InquiryAdminController;
use App\Http\Controllers\Admin\WorldPlanAdminController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\WorldPlanController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/barley', [ProductController::class, 'barley'])->name('products.barley');
Route::get('/olamour', [ProductController::class, 'olamour'])->name('products.olamour');
Route::get('/info', [CompanyController::class, 'legitimacy'])->name('company.info');
Route::get('/select-country', [CountryController::class, 'index'])->name('country.select');
Route::get('/join-community/{country?}', [RegistrationController::class, 'showCommunity'])->name('community.show');
Route::get('/world-plan', [WorldPlanController::class, 'index'])->name('world-plan.index');

Route::post('/inquiries', [InquiryController::class, 'store'])->name('inquiries.store');
Route::post('/register-world-plan', [WorldPlanController::class, 'store'])->name('world-plan.store');

// Legacy login redirect
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');

/*
|--------------------------------------------------------------------------
| Admin Authentication Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    /*
    |--------------------------------------------------------------------------
    | Admin Protected Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware(['admin.auth', 'admin.activity'])->group(function () {
        Route::get('/', fn () => redirect()->route('admin.dashboard'));
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Inquiry Management
        Route::get('/inquiries', [InquiryAdminController::class, 'index'])->name('inquiries.index');
        Route::patch('/inquiries/{inquiry}/toggle-read', [InquiryAdminController::class, 'toggleRead'])->name('inquiries.toggle-read');
        Route::delete('/inquiries/{inquiry}', [InquiryAdminController::class, 'destroy'])->name('inquiries.destroy');

        // World Plan Registrations
        Route::get('/world-plan', [WorldPlanAdminController::class, 'index'])->name('world-plan.index');
        Route::patch('/world-plan/{registration}/status', [WorldPlanAdminController::class, 'updateStatus'])->name('world-plan.status');
        Route::delete('/world-plan/{registration}', [WorldPlanAdminController::class, 'destroy'])->name('world-plan.destroy');

        // Activity Logs
        Route::get('/activity-logs', [ActivityLogAdminController::class, 'index'])->name('activity-logs.index');
    });
});
