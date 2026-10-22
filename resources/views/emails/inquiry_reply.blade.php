<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $replySubject }}</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px 15px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px;">INFINITE<span style="color: #14b8a6;">.</span></h1>
            <p style="color: #14b8a6; text-transform: uppercase; font-size: 11px; font-weight: bold; letter-spacing: 3px; margin-top: 4px;">Live Limitless</p>
        </div>

        <p style="font-size: 16px; color: #e2e8f0;">Dear {{ $inquiry->name }},</p>

        <div style="background-color: #0f172a; border-left: 4px solid #14b8a6; padding: 15px 20px; border-radius: 8px; margin: 20px 0; color: #f1f5f9; line-height: 1.6; white-space: pre-line;">
{{ $replyMessage }}
        </div>

        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px; color: #94a3b8;">
            <p style="margin: 0 0 5px 0;"><strong>In response to your inquiry regarding:</strong> {{ $inquiry->subject }}</p>
            <p style="margin: 0; font-style: italic;">"{{ Str::limit($inquiry->message, 150) }}"</p>
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #64748b;">
            &copy; {{ date('Y') }} INFINITE: Live Limitless. All rights reserved.
        </div>
    </div>
</body>
</html>
