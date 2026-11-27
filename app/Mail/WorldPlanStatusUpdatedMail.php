<?php

namespace App\Mail;

use App\Models\WorldPlanRegistration;
use App\Services\WorldPlanInvoiceService;
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

        $fromAddress = config('mail.from.address', 'admin@infinite-limitless.com');

        return new Envelope(
            from: new Address($fromAddress, 'Infinite Support Team'),
            replyTo: [
                new Address($fromAddress, 'Infinite Support Team'),
            ],
            subject: $subject,
        );
    }

    /**
     * Anti-spam & deliverability headers (Gmail/Yahoo/Outlook compliant).
     */
    public function headers(): Headers
    {
        $fromAddress = config('mail.from.address', 'admin@infinite-limitless.com');

        return new Headers(
            text: [
                'X-Entity-Ref-ID' => 'WP-STATUS-' . $this->registration->id . '-' . time(),
                'X-Auto-Response-Suppress' => 'All',
                'Precedence' => 'bulk',
                'Auto-Submitted' => 'auto-generated',
                'List-Unsubscribe' => '<mailto:' . $fromAddress . '?subject=unsubscribe>, <' . url('/unsubscribe') . '>',
                'List-Unsubscribe-Post' => 'List-Unsubscribe=One-Click',
                'X-Report-Abuse' => 'Please report abuse to ' . $fromAddress,
                'Feedback-ID' => 'WORLDPLAN-STATUS:INFINITE:hostinger',
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
            text: 'emails.plain.world_plan_status',
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

        // Attach official package invoice (PDF) & welcome certificate when approved
        if ($this->registration->status === 'Approved') {
            try {
                $invoiceService = app(WorldPlanInvoiceService::class);
                $pdfRaw = $invoiceService->generateInvoiceRawPdf($this->registration);
                $fileName = $invoiceService->getInvoiceFileName($this->registration);

                $attachments[] = Attachment::fromData(fn () => $pdfRaw, $fileName)
                    ->withMime('application/pdf');
            } catch (\Throwable $e) {
                Log::error("Failed to generate PDF invoice attachment for registration #{$this->registration->id}: " . $e->getMessage());
                report($e);
            }

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
