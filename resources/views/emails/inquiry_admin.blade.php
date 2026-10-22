<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Website Inquiry</title>
</head>
<body style="font-family: 'Barlow', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #14b8a6;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">INFINITE</h1>
            <p style="color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 3px; font-size: 12px;">SYSTEM NOTIFICATION</p>
        </div>
        <div style="padding: 35px 30px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">New Inquiry Received</h2>
            
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid rgba(20, 184, 166, 0.2);">
                <p style="margin: 0 0 10px 0; font-size: 15px;"><strong style="color: #14b8a6;">Sender Name:</strong><br>{{ $inquiry->name }}</p>
                <p style="margin: 0 0 10px 0; font-size: 15px;"><strong style="color: #14b8a6;">Email Address:</strong><br><a href="mailto:{{ $inquiry->email }}" style="color: #0f172a; text-decoration: none;">{{ $inquiry->email }}</a></p>
                <p style="margin: 0; font-size: 15px;"><strong style="color: #14b8a6;">Subject:</strong><br>{{ $inquiry->subject }}</p>
            </div>
            
            <div style="background-color: #ffffff; border-left: 4px solid #14b8a6; padding: 15px 20px; margin-bottom: 25px;">
                <p style="margin: 0; font-size: 15px; color: #475569; white-space: pre-wrap;">{{ $inquiry->message }}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:{{ $inquiry->email }}?subject=Re: {{ urlencode($inquiry->subject) }}" style="display: inline-block; background: #14b8a6; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-size: 14px;">Direct Reply to Sender</a>
            </div>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Infinite: Live Limitless Automated System Notification</p>
        </div>
    </div>
</body>
</html>
