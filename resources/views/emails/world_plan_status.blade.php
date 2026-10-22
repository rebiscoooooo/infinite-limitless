<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>World Plan Application Status</title>
</head>
<body style="font-family: 'Barlow', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #14b8a6 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">INFINITE WORLD PLAN</h1>
            <p style="color: #ffffff; opacity: 0.95; margin: 5px 0 0; font-weight: bold; letter-spacing: 4px;">LIVE LIMITLESS</p>
        </div>
        <div style="padding: 40px 30px;">
            <h2 style="color: #0f172a; margin-top: 0;">Hello, {{ $registration->full_name }}!</h2>
            
            @if ($registration->status === 'Approved')
                <p style="font-size: 16px; color: #0f172a;">Congratulations! <br>
                We are pleased to inform you that your World Plan Registration has been officially <span style="color: #14b8a6; font-weight: bold;">APPROVED</span>.</p>
                
                <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 12px; padding: 20px; margin: 25px 0;">
                    <p style="margin: 0 0 10px 0;"><strong>Username:</strong> {{ $registration->username }}</p>
                    <p style="margin: 0 0 10px 0;"><strong>Package:</strong> {{ strtoupper($registration->package_type) }}</p>
                    <p style="margin: 0;"><strong>Status:</strong> <span style="color: #0f766e; font-weight: bold;">ACTIVE / APPROVED</span></p>
                </div>
                
                <p style="color: #475569;">Your executive account is now active on our global network. You can now access full commission overrides, leadership rebates, and DHL shipping dispatch tracking.</p>
            @else
                <p style="font-size: 16px; color: #0f172a;">Thank you for your application to the Infinite World Plan.</p>
                <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; margin: 25px 0;">
                    <p style="margin: 0; color: #991b1b;">Your registration could not be approved at this time. Please ensure your payment proof receipt matches the chosen package and contact our support desk.</p>
                </div>
            @endif
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Infinite World Plan Administration &bull; Live Limitless</p>
        </div>
    </div>
</body>
</html>
