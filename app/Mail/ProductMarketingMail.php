<?php

namespace App\Mail;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class ProductMarketingMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public Product $product,
        public string $recipientEmail,
        public string $unsubscribeUrl
    ) {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subjectPrefix = match ($this->product->category) {
            'barley' => '🌱 Daily Wellness Spotlight: ',
            'skincare' => '✨ Luxury Beauty Focus: ',
            'beverages' => '☕ Energize Your Day: ',
            'supplements' => '🛡️ Master Cellular Defense: ',
            default => '🌟 Featured Product Spotlight: ',
        };

        return new Envelope(
            from: new Address(
                config('mail.from.address', 'infinitelimitless123@gmail.com'),
                config('mail.from.name', 'INFINITE Live Limitless')
            ),
            subject: $subjectPrefix . $this->product->name,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $productUrl = 'https://infinite-limitless.com/#menu';
        $appUrl = config('app.url');
        if (!empty($appUrl) && !str_contains($appUrl, '127.0.0.1') && !str_contains($appUrl, 'localhost')) {
            $productUrl = url('/#menu');
        }

        return new Content(
            view: 'emails.product_marketing',
            with: [
                'product' => $this->product,
                'recipientEmail' => $this->recipientEmail,
                'unsubscribeUrl' => $this->unsubscribeUrl,
                'productUrl' => $productUrl,
                'productImageUrl' => $this->product->public_image_url,
                'localImagePath' => $this->product->local_image_path,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        $localPath = $this->product->local_image_path;

        if ($localPath && file_exists($localPath)) {
            $ext = pathinfo($localPath, PATHINFO_EXTENSION) ?: 'png';
            $filename = Str::slug($this->product->name) . '.' . $ext;
            $mime = mime_content_type($localPath) ?: 'image/png';

            $attachments[] = Attachment::fromPath($localPath)
                ->as($filename)
                ->withMime($mime);
        }

        return $attachments;
    }
}

