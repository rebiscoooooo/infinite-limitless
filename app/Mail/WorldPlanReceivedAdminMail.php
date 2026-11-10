<?php

namespace App\Mail;

use App\Models\WorldPlanRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class WorldPlanReceivedAdminMail extends Mailable implements ShouldQueue
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
        return new Envelope(
            subject: 'New World Plan Registration: ' . $this->registration->full_name . ' (' . strtoupper($this->registration->package_type) . ')',
            replyTo: [
                new Address($this->registration->email, $this->registration->full_name),
            ],
        );
    }

    /**
     * Get candidate path on filesystem for payment proof.
     */
    protected function resolveReceiptPath(): ?string
    {
        if (empty($this->registration->payment_proof)) {
            return null;
        }

        $clean = basename($this->registration->payment_proof);
        $candidates = [
            storage_path('app/public/payment_proofs/' . $clean),
            public_path('storage/payment_proofs/' . $clean),
            public_path('uploads/payments/' . $clean),
            base_path('uploads/payments/' . $clean),
            storage_path('app/public/' . $clean),
        ];

        foreach ($candidates as $candidate) {
            if (file_exists($candidate) && is_file($candidate)) {
                return $candidate;
            }
        }

        return null;
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $receiptPath = $this->resolveReceiptPath();
        $isImageReceipt = false;
        if ($receiptPath) {
            $ext = strtolower(pathinfo($receiptPath, PATHINFO_EXTENSION));
            $isImageReceipt = in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']);
        }

        return new Content(
            view: 'emails.world_plan_admin',
            with: [
                'registration' => $this->registration,
                'receiptPath' => $receiptPath,
                'isImageReceipt' => $isImageReceipt,
                'receiptViewUrl' => $this->registration->payment_proof_url,
            ]
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
        $receiptPath = $this->resolveReceiptPath();

        if ($receiptPath) {
            $clean = basename($this->registration->payment_proof);
            $ext = pathinfo($receiptPath, PATHINFO_EXTENSION);
            $filename = 'receipt-' . ($this->registration->username ?: 'applicant') . '.' . $ext;

            $attachments[] = Attachment::fromPath($receiptPath)
                ->as($filename);
        }

        return $attachments;
    }
}
