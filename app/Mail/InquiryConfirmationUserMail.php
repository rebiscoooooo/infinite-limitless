<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;

class InquiryConfirmationUserMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Inquiry $inquiry)
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $inqId = str_pad((string) $this->inquiry->id, 5, '0', STR_PAD_LEFT);
        $name = $this->inquiry->name ?: 'Valued Customer';
        $timeStr = now()->format('M d, g:i A');

        return new Envelope(
            subject: "We Received Your Inquiry [Ref #INQ-{$inqId}] - {$name} ({$timeStr}) | INFINITE",
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
                'X-Entity-Ref-ID' => 'INQ-' . $this->inquiry->id . '-' . time(),
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.inquiry_confirmation',
        );
    }
}
