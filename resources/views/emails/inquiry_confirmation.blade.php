<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Inquiry Confirmation</title>
</head>
<body style="font-family: 'Barlow', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #14b8a6 100%); padding: 35px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 2px; text-transform: uppercase;">INFINITE</h1>
            <p style="color: #ffffff; opacity: 0.9; margin: 5px 0 0; font-weight: bold; letter-spacing: 3px; font-size: 12px;">LIVE LIMITLESS</p>
        </div>
        <div style="padding: 35px 30px;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Hello {{ $inquiry->name }},</h2>
            <p style="color: #475569; font-size: 15px;">Thank you for contacting <strong>INFINITE: Live Limitless</strong>. We have received your inquiry regarding <strong>"{{ $inquiry->subject }}"</strong>.</p>
            <p style="color: #475569; font-size: 15px;">Our global client concierge team will review your message and respond within 2-3 business days.</p>
            
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border-left: 4px solid #14b8a6;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; text-transform: uppercase; font-weight: bold;">Summary of Your Message:</p>
                <p style="margin: 0; font-size: 14px; color: #334155; font-style: italic;">"{{ $inquiry->message }}"</p>
            </div>
            
            <p style="color: #475569; font-size: 15px;">In the meantime, feel free to explore our product lines and global opportunity at <a href="{{ config('app.url') }}" style="color: #14b8a6; font-weight: bold; text-decoration: none;">infinite-limitless.com</a>.</p>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Infinite Global Network &bull; Live Limitless</p>
        </div>
    </div>
</body>
</html>
