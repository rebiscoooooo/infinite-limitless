<?php

use App\Http\Controllers\Api\EmailApiController;
use App\Http\Controllers\RealtimeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Inquiries API
Route::post('/inquiries', [EmailApiController::class, 'submitInquiry'])->name('api.inquiries.submit');
Route::post('/inquiries/{inquiry?}/reply', [EmailApiController::class, 'sendReply'])->name('api.inquiries.reply');

// World Plan Registrations API
Route::post('/world-plan/registrations', [EmailApiController::class, 'submitWorldRegistration'])->name('api.world-plan.register');
Route::post('/world-plan/registrations/{registration?}/status', [EmailApiController::class, 'updateWorldPlanStatus'])->name('api.world-plan.status');

// Diagnostic SMTP Test API
Route::post('/mail/test', [EmailApiController::class, 'testEmail'])->name('api.mail.test');

// Realtime Engine APIs
Route::get('/realtime/pulse', [RealtimeController::class, 'pulse'])->name('api.realtime.pulse');
Route::get('/realtime/stream', [RealtimeController::class, 'stream'])->name('api.realtime.stream');


