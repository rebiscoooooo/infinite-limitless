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

    public const LEGACY_PORTAL_LOGIN_URL = 'https://infinite-limitless.com/academy-login';

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
        $fromAddress = config('mail.from.address', 'admin@infinite-limitless.com');

        $subject = $status === 'Approved'
            ? "👑 Welcome to Legacy Club Academy! Approved as [{$rank}] ({$memberId}) - {$name} | INFINITE"
            : "Update Regarding Your Legacy Club Academy Application ({$memberId}) - {$name} | INFINITE";

        return new Envelope(
            from: new Address($fromAddress, 'Legacy Club Academy'),
            replyTo: [
                new Address($fromAddress, 'Legacy Club Academy'),
            ],
            subject: $subject,
        );
    }

    /**
     * Anti-spam & deliverability headers (Gmail/Yahoo/Outlook 2024-2026 compliant).
     */
    public function headers(): Headers
    {
        $fromAddress = config('mail.from.address', 'admin@infinite-limitless.com');
        $portalUrl = self::LEGACY_PORTAL_LOGIN_URL;

        return new Headers(
            text: [
                'X-Entity-Ref-ID' => 'LCA-' . $this->member->id . '-' . time(),
                'X-Auto-Response-Suppress' => 'All',
                'Precedence' => 'bulk',
                'Auto-Submitted' => 'auto-generated',
                'List-Unsubscribe' => '<mailto:' . $fromAddress . '?subject=unsubscribe>, <' . $portalUrl . '>',
                'List-Unsubscribe-Post' => 'List-Unsubscribe=One-Click',
                'X-Report-Abuse' => 'Please report abuse to ' . $fromAddress,
                'Feedback-ID' => 'LCA-STATUS:INFINITE:hostinger',
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
            text: 'emails.plain.academy_status',
            with: [
                'member' => $this->member,
                'rankDetails' => $this->member->rank_details,
                'loginUrl' => self::LEGACY_PORTAL_LOGIN_URL,
                'portalUrl' => self::LEGACY_PORTAL_LOGIN_URL,
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
