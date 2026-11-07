<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $replySubject }}</title>
    <style type="text/css">
        /* Force Gmail and modern email clients to display full message without trimming or quoting */
        .gmail_quote, .gmail_extra, blockquote, div[class*="gmail_quote"] {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            max-height: none !important;
        }
        u + #body a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
    </style>
</head>
<body id="body" style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px 15px;">
    <!-- Anti-trimming hidden preheader with dynamic unique token -->
    <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        Official Support Reply from INFINITE for {{ $inquiry->name }} &bull; Ref #INQ-{{ str_pad($inquiry->id, 5, '0', STR_PAD_LEFT) }}-{{ now()->format('YmdHis') }}.
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px;">INFINITE<span style="color: #14b8a6;">.</span></h1>
            <p style="color: #14b8a6; text-transform: uppercase; font-size: 11px; font-weight: bold; letter-spacing: 3px; margin-top: 4px;">Live Limitless</p>
            <div style="margin-top: 10px; display: inline-block; background-color: rgba(20, 184, 166, 0.15); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 50px; padding: 4px 14px; font-size: 11px; color: #5eead4; letter-spacing: 1px; font-family: monospace;">
                DIRECT SUPPORT DISPATCH &bull; {{ now()->format('M d, Y h:i A') }}
            </div>
        </div>

        <p style="font-size: 16px; color: #e2e8f0;">Dear {{ $inquiry->name }},</p>

        <div style="background-color: #0f172a; border-left: 4px solid #14b8a6; padding: 18px 22px; border-radius: 10px; margin: 20px 0; color: #f1f5f9; line-height: 1.7; white-space: pre-line; font-size: 14px;">
{{ $replyMessage }}
        </div>

        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 13px; color: #94a3b8;">
            <p style="margin: 0 0 5px 0;"><strong>In response to your inquiry regarding:</strong> {{ $inquiry->subject }}</p>
            <p style="margin: 0; font-style: italic;">"{{ Str::limit($inquiry->message, 150) }}"</p>
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #64748b;">
            &copy; {{ date('Y') }} INFINITE: Live Limitless. All rights reserved. &bull; Ref #INQ-{{ str_pad($inquiry->id, 5, '0', STR_PAD_LEFT) }}
        </div>
    </div>
</body>
</html>
