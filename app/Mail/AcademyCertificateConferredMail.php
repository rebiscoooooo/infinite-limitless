<?php

namespace App\Mail;

use App\Models\AcademyCertificate;
use App\Models\AcademyMember;
use App\Services\AcademyCertificateService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AcademyCertificateConferredMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public AcademyMember $member,
        public AcademyCertificate $certificate
    ) {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $fromAddress = config('mail.from.address', 'admin@infinite-limitless.com');
        $fromName = 'Legacy Club Academy';
        $rank = strtoupper($this->certificate->rank_tier ?? 'ROOKIE');
        $name = $this->member->full_name;

        return new Envelope(
            from: new Address($fromAddress, $fromName),
            replyTo: [
                new Address($fromAddress, $fromName),
            ],
            subject: "🎓 Official Certificate of Completion Conferred - [{$rank}] {$name} | Legacy Club Academy",
        );
    }

    /**
     * Message headers optimized to prevent spam filtering (RFC & Gmail/Yahoo 2024-2026 compliant).
     */
    public function headers(): Headers
    {
        $unsubscribeUrl = url('/academy-portal');
        $fromAddress = config('mail.from.address', 'admin@infinite-limitless.com');
        $certId = $this->certificate->id;

        return new Headers(
            text: [
                'X-Entity-Ref-ID' => 'LCA-CERT-' . $certId . '-' . time(),
                'X-Auto-Response-Suppress' => 'All',
                'Precedence' => 'bulk',
                'Auto-Submitted' => 'auto-generated',
                'List-Unsubscribe' => '<mailto:' . $fromAddress . '?subject=unsubscribe>, <' . $unsubscribeUrl . '>',
                'List-Unsubscribe-Post' => 'List-Unsubscribe=One-Click',
                'X-Report-Abuse' => 'Please report abuse to ' . $fromAddress,
                'Feedback-ID' => 'LCA-CERTIFICATE:INFINITE:hostinger',
            ],
        );
    }

    /**
     * Get the message content definition (Dual HTML + Plain Text for maximum deliverability).
     */
    public function content(): Content
    {
        $loginUrl = url('/academy-login');
        $portalUrl = url('/academy-portal');
        $rank = $this->certificate->rank_tier ?? 'Rookie';

        return new Content(
            view: 'emails.academy_certificate',
            text: 'emails.plain.academy_certificate',
            with: [
                'member' => $this->member,
                'certificate' => $this->certificate,
                'rank' => $rank,
                'loginUrl' => $loginUrl,
                'portalUrl' => $portalUrl,
                'certificateNumber' => $this->certificate->certificate_number,
                'issuedDate' => $this->certificate->issued_at ? $this->certificate->issued_at->format('F d, Y') : now()->format('F d, Y'),
            ],
        );
    }

    /**
     * Attach the official certificate (custom admin uploaded file or generated PDF).
     */
    public function attachments(): array
    {
        $attachments = [];

        try {
            // Case 1: Custom Certificate uploaded by Admin
            if ($this->certificate->file_path && Storage::disk('public')->exists($this->certificate->file_path)) {
                $absolutePath = Storage::disk('public')->path($this->certificate->file_path);
                $ext = strtolower(pathinfo($this->certificate->file_path, PATHINFO_EXTENSION));
                $mime = match ($ext) {
                    'png' => 'image/png',
                    'jpg', 'jpeg' => 'image/jpeg',
                    'webp' => 'image/webp',
                    default => 'application/pdf',
                };

                $filename = "LegacyClubAcademy_Certificate_{$this->certificate->certificate_number}." . $ext;

                $attachments[] = Attachment::fromPath($absolutePath)
                    ->as($filename)
                    ->withMime($mime);
            } else {
                // Case 2: Generated PDF
                $service = app(AcademyCertificateService::class);
                $pdf = $service->generatePdf($this->certificate);
                $pdfRaw = $pdf->output();
                $filename = "LegacyClubAcademy_Certificate_{$this->certificate->certificate_number}.pdf";

                $attachments[] = Attachment::fromData(fn () => $pdfRaw, $filename)
                    ->withMime('application/pdf');
            }
        } catch (\Throwable $e) {
            Log::error("Failed attaching certificate to email for member #{$this->member->id}: " . $e->getMessage());
        }

        return $attachments;
    }
}
