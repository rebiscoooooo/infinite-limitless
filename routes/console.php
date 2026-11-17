<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Send daily product marketing email every morning at 8:00 AM
Schedule::command('marketing:send-daily-product')
    ->dailyAt('08:00')
    ->timezone(config('app.timezone', 'Asia/Manila'))
    ->withoutOverlapping()
    ->runInBackground();

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('mail:test {recipient? : The destination email address}', function ($recipient = null) {
    $targetEmail = $recipient ?: config('mail.admin_address', 'infinitelimitless123@gmail.com');
    $this->info("=== INFINITE EMAIL DIAGNOSTIC ===");
    $this->line("Mailer: " . config('mail.default'));
    $this->line("SMTP Host: " . config('mail.mailers.smtp.host'));
    $this->line("SMTP Port: " . config('mail.mailers.smtp.port'));
    $this->line("Encryption: " . config('mail.mailers.smtp.encryption'));
    $this->line("From Address: " . config('mail.from.address'));
    $this->line("From Name: " . config('mail.from.name'));
    $this->line("Recipient: " . $targetEmail);
    $this->line("---------------------------------");
    $this->comment("Dispatching test email...");

    try {
        \Illuminate\Support\Facades\Mail::raw("This is an automated test email confirming that the Infinite: Live Limitless SMTP email system is fully operational.\n\nTimestamp: " . now()->toRfc2822String(), function ($msg) use ($targetEmail) {
            $msg->to($targetEmail)
                ->subject("INFINITE System - SMTP Operational Test");
        });
        $this->info("SUCCESS: Test email successfully delivered to {$targetEmail}!");
    } catch (\Throwable $e) {
        $this->error("FAILED: Could not send email.");
        $this->error("Error: " . $e->getMessage());
        return 1;
    }
    return 0;
})->purpose('Test live SMTP email sending to a specified or default admin recipient');

Artisan::command('flare:test', function () {
    $this->info("=== SPATIE FLARE & IGNITION DIAGNOSTIC ===");
    $this->line("Package: spatie/laravel-ignition");
    $this->line("Renderer: " . (app()->bound(\Illuminate\Contracts\Foundation\ExceptionRenderer::class) ? 'IgnitionExceptionRenderer Active' : 'Default'));
    $this->line("Theme: " . config('ignition.theme', 'dark'));
    $this->line("Editor: " . config('ignition.editor', 'vscode'));
    $this->line("Flare Key: " . (config('flare.key') ? substr(config('flare.key'), 0, 8) . '...' : '(Not set - errors rendered locally with Ignition)'));
    $stackChannels = config('logging.channels.stack.channels');
    $this->line("Logging Stack: " . (is_array($stackChannels) ? implode(',', $stackChannels) : 'single'));
    $this->line("Flare Logger: " . (config('logging.channels.flare.driver') === 'flare' ? 'Configured (driver=flare)' : 'Not configured'));
    $this->line("------------------------------------------");

    if (config('flare.key')) {
        $this->comment("Dispatching test exception report to Flare (flareapp.io)...");
        try {
            app(\Spatie\FlareClient\Flare::class)->sendTestReport(new \Exception('Test exception from Infinite Flare-Ignition test command'));
            $this->info("SUCCESS: Test report dispatched to Flare successfully!");
        } catch (\Throwable $e) {
            $this->warn("Note: Flare report dispatch returned: " . $e->getMessage());
        }
    } else {
        $this->info("Flare-Ignition is configured and active for error rendering.");
        $this->comment("To send remote exception reports to flareapp.io, set FLARE_KEY=your_key in your .env file.");
    }
    return 0;
})->purpose('Test Spatie Flare & Ignition error reporting and configuration');
