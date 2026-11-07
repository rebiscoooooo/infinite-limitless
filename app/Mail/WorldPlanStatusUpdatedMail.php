<?php

namespace App\Mail;

use App\Models\WorldPlanRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
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
        $regId = str_pad((string) $this->registration->id, 5, '0', STR_PAD_LEFT);
        $name = $this->registration->full_name ?: trim(($this->registration->first_name ?? '') . ' ' . ($this->registration->last_name ?? ''));
        $timeStr = now()->format('M d, g:i A');

        $subject = $status === 'Approved'
            ? "🎉 Congratulations! World Plan Approved [Ref #WP-{$regId}] - {$name} ({$timeStr}) | Welcome to INFINITE"
            : "Update Regarding Your World Plan Application [Ref #WP-{$regId}] - {$name} ({$timeStr}) | INFINITE";

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
                'X-Entity-Ref-ID' => 'WP-STATUS-' . $this->registration->id . '-' . time(),
            ],
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

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];

        // Attach welcome congratulatory flyer when approved
        if ($this->registration->status === 'Approved') {
            $flyerPaths = [
                public_path('assets/image/flyers/image.png'),
                public_path('assets/image/flyer.png'),
                public_path('assets/image/flyer.jpg'),
                public_path('assets/image/image.png'),
                public_path('image.png'),
                base_path('image.png'),
            ];

            foreach ($flyerPaths as $path) {
                if (file_exists($path)) {
                    $attachments[] = Attachment::fromPath($path)
                        ->as('INFINITE_Welcome_Certificate.png')
                        ->withMime('image/png');
                    break;
                }
            }
        }

        return $attachments;
    }
}
