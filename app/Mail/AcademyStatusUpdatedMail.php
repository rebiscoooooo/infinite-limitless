<?php

namespace App\Mail;

use App\Models\AcademyMember;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;

class AcademyStatusUpdatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public AcademyMember $member)
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $status = $this->member->status;
        $memberId = $this->member->member_id ?? ('LCA-' . str_pad((string) $this->member->id, 5, '0', STR_PAD_LEFT));
        $name = $this->member->full_name;
        $rank = $this->member->rank_tier ? strtoupper($this->member->rank_tier) : 'MEMBER';
        $timeStr = now()->format('M d, g:i A');

        $subject = $status === 'Approved'
            ? "👑 Welcome to Legacy Club Academy! Approved as [{$rank}] ({$memberId}) - {$name} | INFINITE"
            : "Update Regarding Your Legacy Club Academy Application ({$memberId}) - {$name} | INFINITE";

        return new Envelope(
            subject: $subject,
            replyTo: [
                new Address(
                    config('mail.from.address', 'academy@infinite-limitless.com'),
                    config('mail.from.name', 'Legacy Club Academy')
                ),
            ],
        );
    }

    /**
     * Anti-threading headers.
     */
    public function headers(): Headers
    {
        return new Headers(
            text: [
                'X-Entity-Ref-ID' => 'LCA-' . $this->member->id . '-' . time(),
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.academy_status',
            with: [
                'member' => $this->member,
                'rankDetails' => $this->member->rank_details,
                'loginUrl' => url('/academy-login'),
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
