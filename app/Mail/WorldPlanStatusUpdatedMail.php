<?php

namespace App\Mail;

use App\Models\WorldPlanRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WorldPlanStatusUpdatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public WorldPlanRegistration $registration)
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $status = $this->registration->status;
        $subject = $status === 'Approved'
            ? 'World Plan Application Approved - Welcome to Infinite!'
            : 'Update Regarding Your Infinite World Plan Application';

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.world_plan_status',
        );
    }
}
