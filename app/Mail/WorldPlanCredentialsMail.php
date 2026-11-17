<?php

namespace App\Mail;

use App\Models\WorldPlanRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;

class WorldPlanCredentialsMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public WorldPlanRegistration $registration,
        public string $username,
        public string $password,
        public string $portalUrl = 'https://helloinfinity.net/iprosperity'
    ) {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $regId = str_pad((string) $this->registration->id, 5, '0', STR_PAD_LEFT);
        $name = $this->registration->full_name ?: trim(($this->registration->first_name ?? '') . ' ' . ($this->registration->last_name ?? ''));
        $timeStr = now()->format('M d, g:i A');

        return new Envelope(
            subject: "🔐 Official Portal Login Credentials [Ref #WP-{$regId}] - {$name} ({$timeStr}) | INFINITE",
            replyTo: [
                new Address(
                    config('mail.from.address', 'admin@infinite-limitless.com'),
                    config('mail.from.name', 'Infinite Support Team')
                ),
            ],
        );
    }

    /**
     * Get the message headers to avoid spam detection, threading, and clipping.
     */
    public function headers(): Headers
    {
        $regId = $this->registration->id;
        $timestamp = time();

        return new Headers(
            text: [
                'X-Entity-Ref-ID' => 'WP-CREDENTIALS-' . $regId . '-' . $timestamp,
                'X-Auto-Response-Suppress' => 'All',
                'Precedence' => 'bulk',
                'Auto-Submitted' => 'auto-generated',
                'X-Report-Abuse-To' => config('mail.from.address', 'admin@infinite-limitless.com'),
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.world_plan_credentials',
            with: [
                'registration' => $this->registration,
                'username' => $this->username,
                'password' => $this->password,
                'portalUrl' => $this->portalUrl,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}

