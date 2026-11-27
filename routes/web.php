<?php

use App\Http\Controllers\AcademyAuthController;
use App\Http\Controllers\Admin\AcademyAdminController;
use App\Http\Controllers\Admin\ActivityLogAdminController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InquiryAdminController;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Admin\WorldPlanAdminController;
use App\Http\Controllers\Api\EmailApiController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RealtimeController;
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
Route::get('/company-profile', [CompanyController::class, 'profile'])->name('company.profile');
Route::get('/select-country', [CountryController::class, 'index'])->name('country.select');
Route::redirect('/SelectCountry', '/select-country');
Route::get('/join-community/{country?}', [RegistrationController::class, 'showCommunity'])->name('community.show');
Route::get('/join-ph', fn () => redirect()->route('community.show', ['country' => 'ph']))->name('join.ph');
Route::get('/world-plan', [WorldPlanController::class, 'index'])->name('world-plan.index');

// New Registration Module (/registration)
Route::get('/registration', [RegistrationController::class, 'index'])->name('registration');
Route::post('/registration', [RegistrationController::class, 'store'])->name('registration.store');
Route::get('/registration/edit/{token}', [RegistrationController::class, 'edit'])->name('registration.edit');
Route::post('/registration/edit/{token}', [RegistrationController::class, 'update'])->name('registration.update');

Route::post('/inquiries', [InquiryController::class, 'store'])->name('inquiries.store');
Route::post('/register-world-plan', [RegistrationController::class, 'store'])->name('world-plan.store');

// Marketing Unsubscribe
Route::get('/unsubscribe', [MarketingController::class, 'unsubscribe'])->name('marketing.unsubscribe');

// Payment Receipt / Proof Serving & Download Routes
Route::get('/storage/payment_proofs/{filename}', [WorldPlanAdminController::class, 'viewReceipt'])->name('receipt.view');
Route::get('/storage/payment_proofs/{filename}/download', [WorldPlanAdminController::class, 'downloadReceipt'])->name('receipt.download');
Route::get('/receipts/{filename}', [WorldPlanAdminController::class, 'viewReceipt']);
Route::get('/receipts/{filename}/download', [WorldPlanAdminController::class, 'downloadReceipt']);

// Realtime Engine Routes
Route::get('/realtime/pulse', [RealtimeController::class, 'pulse'])->name('realtime.pulse');
Route::get('/realtime/stream', [RealtimeController::class, 'stream'])->name('realtime.stream');

// Flare & Ignition Diagnostic Test Route
Route::get('/flare-test-error', function () {
    throw new \Exception('Infinite System Test Exception: Laravel Flare & Ignition is successfully active and capturing application errors!');
})->name('flare.test.error');

// Legacy Club Academy Portal & Authentication Routes
Route::get('/academy-register', [AcademyAuthController::class, 'showRegister'])->name('academy.register');
Route::post('/academy-register', [AcademyAuthController::class, 'register'])->name('academy.register.submit');
Route::get('/academy-verify', [AcademyAuthController::class, 'showVerify'])->name('academy.verify');
Route::get('/academy-login', [AcademyAuthController::class, 'showLogin'])->name('academy.login');
Route::post('/academy-login', [AcademyAuthController::class, 'login'])->name('academy.login.submit');
Route::post('/academy-logout', [AcademyAuthController::class, 'logout'])->name('academy.logout');

// Member Protected Portal (Separate Dedicated Pages)
Route::middleware('academy.auth')->group(function () {
    Route::get('/academy-portal', [AcademyAuthController::class, 'showPortal'])->name('academy.portal');
    Route::get('/academy-profile', [AcademyAuthController::class, 'showPortal'])->name('academy.profile');
    Route::get('/academy-portal/trainings', [AcademyAuthController::class, 'showTrainings'])->name('academy.trainings');
    Route::get('/academy-portal/requirements', [AcademyAuthController::class, 'showRequirements'])->name('academy.requirements');
    Route::get('/academy-portal/certificates', [AcademyAuthController::class, 'showCertificates'])->name('academy.certificates');
    Route::get('/academy-portal/leaderboards', [AcademyAuthController::class, 'showLeaderboards'])->name('academy.leaderboards');
    Route::get('/academy-portal/announcements', [AcademyAuthController::class, 'showAnnouncements'])->name('academy.announcements');
    Route::get('/academy-portal/rank-matrix', [AcademyAuthController::class, 'showRankMatrix'])->name('academy.rank-matrix');
    Route::get('/academy-portal/settings', [AcademyAuthController::class, 'showSettings'])->name('academy.settings');

    Route::post('/academy-profile', [AcademyAuthController::class, 'updateProfile'])->name('academy.profile.update');
    Route::post('/academy-portal/language', [AcademyAuthController::class, 'switchLanguage'])->name('academy.portal.language');
    Route::post('/academy-portal/trainings/{training}/reflect', [AcademyAuthController::class, 'submitReflection'])->name('academy.trainings.reflect');
    Route::get('/academy-portal/certificates/{certificate}/download', [AcademyAuthController::class, 'downloadCertificate'])->name('academy.certificates.download');
});

// Friendly aliases for requested /infinite-limitless/ paths
Route::redirect('/infinite-limitless/academy-register', '/academy-register');
Route::redirect('/infinite-limitless/academy-verify', '/academy-verify');
Route::redirect('/infinite-limitless/academy-login', '/academy-login');
Route::redirect('/infinite-limitless/academy-portal', '/academy-portal');
Route::redirect('/infinite-limitless/admin/verify-academy', '/admin/verify-academy');

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

        // Products Management & Bulk Actions
        Route::get('/products', [ProductAdminController::class, 'index'])->name('products.index');
        Route::post('/products', [ProductAdminController::class, 'store'])->name('products.store');
        Route::post('/products/bulk-archive', [ProductAdminController::class, 'bulkArchive'])->name('products.bulk-archive');
        Route::post('/products/bulk-restore', [ProductAdminController::class, 'bulkRestore'])->name('products.bulk-restore');
        Route::match(['post', 'delete'], '/products/bulk-delete', [ProductAdminController::class, 'bulkDelete'])->name('products.bulk-delete');
        Route::post('/products/{product}', [ProductAdminController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductAdminController::class, 'destroy'])->name('products.destroy');
        Route::patch('/products/{product}/toggle-status', [ProductAdminController::class, 'toggleStatus'])->name('products.toggle-status');

        // Inquiry Management & Bulk Actions
        Route::get('/inquiries', [InquiryAdminController::class, 'index'])->name('inquiries.index');
        Route::post('/inquiries/bulk-archive', [InquiryAdminController::class, 'bulkArchive'])->name('inquiries.bulk-archive');
        Route::post('/inquiries/bulk-restore', [InquiryAdminController::class, 'bulkRestore'])->name('inquiries.bulk-restore');
        Route::match(['post', 'delete'], '/inquiries/bulk-delete', [InquiryAdminController::class, 'bulkDelete'])->name('inquiries.bulk-delete');
        Route::patch('/inquiries/{inquiry}/toggle-read', [InquiryAdminController::class, 'toggleRead'])->name('inquiries.toggle-read');
        Route::post('/inquiries/{inquiry}/reply', [InquiryAdminController::class, 'reply'])->name('inquiries.reply');
        Route::delete('/inquiries/{inquiry}', [InquiryAdminController::class, 'destroy'])->name('inquiries.destroy');

        // World Plan Registrations & Bulk Actions
        Route::get('/world-plan', [WorldPlanAdminController::class, 'index'])->name('world-plan.index');
        Route::get('/world-plan/{registration}/invoice', [WorldPlanAdminController::class, 'downloadInvoice'])->name('world-plan.invoice');
        Route::post('/world-plan/bulk-archive', [WorldPlanAdminController::class, 'bulkArchive'])->name('world-plan.bulk-archive');
        Route::post('/world-plan/bulk-restore', [WorldPlanAdminController::class, 'bulkRestore'])->name('world-plan.bulk-restore');
        Route::match(['post', 'delete'], '/world-plan/bulk-delete', [WorldPlanAdminController::class, 'bulkDelete'])->name('world-plan.bulk-delete');
        Route::patch('/world-plan/{registration}/status', [WorldPlanAdminController::class, 'updateStatus'])->name('world-plan.status');
        Route::post('/world-plan/{registration}/send-credentials', [WorldPlanAdminController::class, 'sendCredentials'])->name('world-plan.send-credentials');
        Route::delete('/world-plan/{registration}', [WorldPlanAdminController::class, 'destroy'])->name('world-plan.destroy');

        // Legacy Club Academy Members & Verification
        Route::get('/verify-academy', [AcademyAdminController::class, 'index'])->name('academy.index');
        Route::patch('/verify-academy/{member}/status', [AcademyAdminController::class, 'updateStatus'])->name('academy.status');
        Route::match(['put', 'patch'], '/verify-academy/{member}', [AcademyAdminController::class, 'update'])->name('academy.update');
        Route::delete('/verify-academy/{member}', [AcademyAdminController::class, 'destroy'])->name('academy.destroy');
        Route::post('/verify-academy/members/{member}/promote', [AcademyAdminController::class, 'promoteMember'])->name('academy.member.promote');
        Route::post('/verify-academy/members/{member}/requirements/{requirement}', [AcademyAdminController::class, 'updateMemberRequirement'])->name('academy.requirements.update');
        Route::post('/verify-academy/trainings/{progress}/review', [AcademyAdminController::class, 'reviewTrainingReflection'])->name('academy.trainings.review');
        Route::post('/verify-academy/members/{member}/trainings/{training}/grant', [AcademyAdminController::class, 'grantMemberTraining'])->name('academy.trainings.grant');
        Route::post('/verify-academy/members/{member}/trainings/grant-all', [AcademyAdminController::class, 'grantAllMemberTrainings'])->name('academy.trainings.grant-member-all');
        Route::post('/verify-academy/trainings/{training}/grant-all', [AcademyAdminController::class, 'grantTrainingToAllMembers'])->name('academy.trainings.grant-rank-all');
        Route::post('/verify-academy/trainings', [AcademyAdminController::class, 'storeTraining'])->name('academy.trainings.store');
        Route::match(['put', 'patch'], '/verify-academy/trainings/{training}', [AcademyAdminController::class, 'updateTraining'])->name('academy.trainings.update');
        Route::delete('/verify-academy/trainings/{training}', [AcademyAdminController::class, 'deleteTraining'])->name('academy.trainings.destroy');
        Route::post('/verify-academy/requirements', [AcademyAdminController::class, 'storeRequirement'])->name('academy.requirements.store');
        Route::match(['put', 'patch'], '/verify-academy/requirements/{requirement}', [AcademyAdminController::class, 'updateRequirement'])->name('academy.requirements.definition.update');
        Route::delete('/verify-academy/requirements/{requirement}', [AcademyAdminController::class, 'deleteRequirement'])->name('academy.requirements.destroy');
        Route::get('/verify-academy/certificates/{certificate}/download', [AcademyAdminController::class, 'downloadCertificate'])->name('academy.admin.certificates.download');
        Route::post('/verify-academy/members/{member}/certificates/upload', [AcademyAdminController::class, 'uploadMemberCertificate'])->name('academy.certificates.upload');
        Route::post('/verify-academy/announcements', [AcademyAdminController::class, 'storeAnnouncement'])->name('academy.announcements.store');
        Route::patch('/verify-academy/announcements/{announcement}/toggle', [AcademyAdminController::class, 'toggleAnnouncement'])->name('academy.announcements.toggle');
        Route::delete('/verify-academy/announcements/{announcement}', [AcademyAdminController::class, 'deleteAnnouncement'])->name('academy.announcements.destroy');

        // Administrator Users Management & Creation
        Route::get('/admins', [AdminUserController::class, 'index'])->name('admins.index');
        Route::post('/admins', [AdminUserController::class, 'store'])->name('admins.store');
        Route::post('/admins/bulk-archive', [AdminUserController::class, 'bulkArchive'])->name('admins.bulk-archive');
        Route::post('/admins/bulk-restore', [AdminUserController::class, 'bulkRestore'])->name('admins.bulk-restore');
        Route::match(['post', 'delete'], '/admins/bulk-delete', [AdminUserController::class, 'bulkDelete'])->name('admins.bulk-delete');
        Route::match(['post', 'put', 'patch'], '/admins/{admin}', [AdminUserController::class, 'update'])->name('admins.update');
        Route::post('/admins/{admin}/change-password', [AdminUserController::class, 'changeAdminPassword'])->name('admins.change-password');
        Route::delete('/admins/{admin}', [AdminUserController::class, 'destroy'])->name('admins.destroy');
        Route::patch('/admins/{admin}/toggle-status', [AdminUserController::class, 'toggleStatus'])->name('admins.toggle-status');

        // Administrator Password Security & Profile
        Route::post('/change-password', [AdminAuthController::class, 'changePassword'])->name('change-password');
        Route::post('/profile/change-password', [AdminAuthController::class, 'changePassword'])->name('profile.change-password');

        // Activity Logs & Bulk Actions
        Route::get('/activity-logs', [ActivityLogAdminController::class, 'index'])->name('activity-logs.index');
        Route::post('/activity-logs/bulk-archive', [ActivityLogAdminController::class, 'bulkArchive'])->name('activity-logs.bulk-archive');
        Route::post('/activity-logs/bulk-restore', [ActivityLogAdminController::class, 'bulkRestore'])->name('activity-logs.bulk-restore');
        Route::match(['post', 'delete'], '/activity-logs/bulk-delete', [ActivityLogAdminController::class, 'bulkDelete'])->name('activity-logs.bulk-delete');

        // Email Diagnostic Testing & Marketing
        Route::post('/test-email', [EmailApiController::class, 'testEmail'])->name('test-email');
        Route::post('/marketing/dispatch-daily', [DashboardController::class, 'dispatchDailyMarketing'])->name('marketing.dispatch-daily');
    });
});

/*
|--------------------------------------------------------------------------
| Legacy Backend Endpoints Compatibility Layer
|--------------------------------------------------------------------------
| Supports legacy PHP form submissions & fetch calls from original assets/js
*/
Route::prefix('backend')->group(function () {
    Route::post('/submit_inquiry.php', [EmailApiController::class, 'submitInquiry']);
    Route::post('/send_contact.php', [EmailApiController::class, 'submitInquiry']);
    Route::post('/api_send_reply.php', [EmailApiController::class, 'sendReply']);
    Route::post('/api_update_world_plan_status.php', [EmailApiController::class, 'updateWorldPlanStatus']);
    Route::post('/api_update_reg_status.php', [EmailApiController::class, 'updateMemberRegistrationStatus']);
    Route::post('/submit_world_registration.php', [EmailApiController::class, 'submitWorldRegistration']);
    Route::post('/submit_world_plan.php', [EmailApiController::class, 'submitWorldRegistration']);
});
