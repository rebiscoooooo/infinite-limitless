<?php

namespace App\Mail;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
        return new Content(
            view: 'emails.product_marketing',
            with: [
                'product' => $this->product,
                'recipientEmail' => $this->recipientEmail,
                'unsubscribeUrl' => $this->unsubscribeUrl,
                'productUrl' => url('/#menu'),
            ]
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

