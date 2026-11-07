<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::command('marketing:send-daily-product')->dailyAt('09:00');

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
