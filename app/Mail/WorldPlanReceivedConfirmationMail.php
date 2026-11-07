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

class WorldPlanReceivedConfirmationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public WorldPlanRegistration $registration,
        public bool $isUpdate = false
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

        $subject = $this->isUpdate
            ? "Updated World Plan Registration Details [Ref #WP-{$regId}] - {$name} ({$timeStr}) | INFINITE"
            : "World Plan Registration Confirmation [Ref #WP-{$regId}] - {$name} ({$timeStr}) | INFINITE";

        return new Envelope(
            subject: $subject,
            replyTo: [
                new Address(
                    config('mail.from.address', 'admin@infinite-limitless.com'),
                    config('mail.from.name', 'Infinite Support Team')
                ),
            ],
        );
    }

    /**
     * Get the message headers to prevent client-side threading and quoting.
     */
    public function headers(): Headers
    {
        return new Headers(
            text: [
                'X-Entity-Ref-ID' => 'WP-' . $this->registration->id . '-' . time(),
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.world_plan_confirmation',
            with: [
                'isUpdate' => $this->isUpdate,
            ],
        );
    }
}
