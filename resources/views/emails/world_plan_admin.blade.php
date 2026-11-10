<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New World Plan Registration</title>
</head>
<body style="font-family: 'Barlow', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #14b8a6;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">INFINITE</h1>
            <p style="color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 3px; font-size: 12px;">NEW REGISTRATION NOTIFICATION</p>
        </div>
        <div style="padding: 35px 30px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">New World Plan Application</h2>
            
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid rgba(20, 184, 166, 0.2);">
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Applicant Full Name:</strong><br>{{ $registration->full_name }}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Username:</strong><br>{{ $registration->username }}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Email:</strong><br><a href="mailto:{{ $registration->email }}" style="color: #0f172a; text-decoration: none;">{{ $registration->email }}</a></p>
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Contact Number:</strong><br>{{ $registration->contact_no }}</p>
                @if($registration->country)
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Country / Territory:</strong><br>{{ $registration->country }}</p>
                @endif
                @if($registration->sponsor)
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Sponsor / Enroller:</strong><br>{{ $registration->sponsor }}</p>
                @endif
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Package Type:</strong><br><span style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 3px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">{{ strtoupper($registration->package_type) }}</span></p>
                @if($registration->product_set)
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Product Set:</strong><br>{{ $registration->product_set }}</p>
                @endif
                @if($registration->amount_paid)
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Amount Paid:</strong><br>{{ $registration->amount_paid }}</p>
                @endif
                @if($registration->payment_method)
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Payment Method:</strong><br>{{ $registration->payment_method }}</p>
                @endif
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Birthdate:</strong><br>{{ $registration->birthdate ? $registration->birthdate->format('F d, Y') : 'N/A' }}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Delivery Address:</strong><br>{{ $registration->address }}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong style="color: #0f766e;">Payment Date:</strong><br>{{ $registration->payment_date ? $registration->payment_date->format('F d, Y') : 'N/A' }}</p>
                <p style="margin: 0; font-size: 14px;"><strong style="color: #0f766e;">Terms &amp; Privacy Agreed:</strong><br><span style="color: #15803d; font-weight: bold;">YES (Acknowledged Non-Refundable &amp; Privacy Policy)</span></p>
            </div>

            @if ($registration->payment_proof)
                <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 15px 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #0f766e;">
                        <strong>Payment Proof Attached:</strong> The applicant's receipt file ({{ $registration->payment_proof }}) is attached to this email and accessible in the admin portal.
                    </p>
                    @if(!empty($receiptPath) && !empty($isImageReceipt) && isset($message))
                        <div style="text-align: center; margin: 15px 0 10px 0; background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #ccfbf1;">
                            <img src="{{ $message->embed($receiptPath) }}" alt="Payment Receipt" style="max-width: 100%; max-height: 320px; border-radius: 6px; object-fit: contain;">
                        </div>
                    @endif
                </div>
            @endif
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ config('app.url') }}/admin/world-plan" style="display: inline-block; background: #14b8a6; color: #ffffff; font-weight: bold; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);">Review &amp; Approve Application</a>
            </div>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Infinite: Live Limitless Automated Registration Notification</p>
        </div>
    </div>
</body>
</html>

