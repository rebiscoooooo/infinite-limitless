<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Infinite World Plan Registration Details</title>
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
<body id="body" style="font-family: 'Barlow', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc;">
    <!-- Anti-trimming hidden preheader with dynamic unique token -->
    <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        Official World Plan Registration Confirmation for {{ $registration->full_name }} &bull; Ref #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }}-{{ now()->format('YmdHis') }}.
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.12); border: 1px solid #e2e8f0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #14b8a6 100%); padding: 36px 25px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase;">INFINITE</h1>
            <p style="color: #5eead4; margin: 6px 0 0; font-weight: 700; letter-spacing: 3px; font-size: 13px;">WORLD PLAN REGISTRATION CONFIRMATION</p>
            <div style="margin-top: 12px; display: inline-block; background-color: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 5px 16px; font-size: 11px; color: #ffffff; letter-spacing: 1px; font-family: monospace; font-weight: bold;">
                OFFICIAL DISPATCH &bull; REF #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }} &bull; {{ now()->format('M d, Y h:i A') }}
            </div>
        </div>

        <div style="padding: 35px 30px;">
            <div style="font-size: 11px; font-weight: 800; color: #0f766e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                @if(!empty($isUpdate)) REVISED SUBMISSION RECORD @else OFFICIAL REGISTRATION RECEIPT @endif
            </div>
            <h2 style="color: #0f172a; margin-top: 0; font-size: 22px;">Hello {{ $registration->full_name }},</h2>
            <p style="color: #475569; font-size: 15px; margin-bottom: 20px;">
                Thank you for taking the step to build your global network with <strong>INFINITE: Live Limitless</strong>. We have officially received your World Plan registration and payment submission for Package <strong>{{ strtoupper($registration->package_type) }}</strong>.
            </p>

            <!-- Status Alert -->
            <div style="background: linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%); border-left: 5px solid #14b8a6; border-radius: 12px; padding: 18px 22px; margin: 25px 0;">
                <p style="margin: 0; font-size: 14px; color: #0f172a;">
                    <strong>Application Status:</strong> <span style="background-color: #fef3c7; color: #b45309; padding: 3px 10px; border-radius: 50px; font-weight: bold; font-size: 12px; margin-left: 6px;">PENDING VERIFICATION</span><br>
                    <span style="font-size: 13px; color: #64748b; display: block; margin-top: 6px;">
                        Our administration team is currently reviewing your application and verifying your payment proof.
                    </span>
                </p>
            </div>

            <!-- Submitted Information Table -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin: 25px 0;">
                <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                    Your Submitted Information
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding: 7px 0; color: #64748b; width: 38%;">Full Name:</td>
                        <td style="padding: 7px 0; color: #0f172a; font-weight: bold;">{{ $registration->full_name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Username:</td>
                        <td style="padding: 7px 0; color: #0f172a; font-weight: bold;">{{ $registration->username }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Email Address:</td>
                        <td style="padding: 7px 0; color: #0f172a;">{{ $registration->email }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Contact Number:</td>
                        <td style="padding: 7px 0; color: #0f172a;">{{ $registration->contact_no }}</td>
                    </tr>
                    @if ($registration->birthdate)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Date of Birth:</td>
                        <td style="padding: 7px 0; color: #0f172a;">{{ $registration->birthdate->format('F d, Y') }}</td>
                    </tr>
                    @endif
                    @if ($registration->country)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Country:</td>
                        <td style="padding: 7px 0; color: #0f172a; font-weight: 600;">{{ $registration->country }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Delivery Address:</td>
                        <td style="padding: 7px 0; color: #0f172a;">{{ $registration->address }}</td>
                    </tr>
                    @if ($registration->sponsor)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Enroller / Sponsor:</td>
                        <td style="padding: 7px 0; color: #0f172a; font-weight: 600;">{{ $registration->sponsor }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Package Level:</td>
                        <td style="padding: 7px 0; color: #0f766e; font-weight: bold;">{{ strtoupper($registration->package_type) }}</td>
                    </tr>
                    @if ($registration->product_set)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Product Set Selection:</td>
                        <td style="padding: 7px 0; color: #0f172a; font-weight: 600;">{{ $registration->product_set }}</td>
                    </tr>
                    @endif
                    @if ($registration->amount_paid)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Amount Paid:</td>
                        <td style="padding: 7px 0; color: #0f172a; font-weight: bold;">{{ $registration->amount_paid }}</td>
                    </tr>
                    @endif
                    @if ($registration->payment_method)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Payment Method:</td>
                        <td style="padding: 7px 0; color: #0f172a;">{{ $registration->payment_method }}</td>
                    </tr>
                    @endif
                    @if ($registration->payment_date)
                    <tr>
                        <td style="padding: 7px 0; color: #64748b;">Payment Date:</td>
                        <td style="padding: 7px 0; color: #0f172a;">{{ $registration->payment_date->format('F d, Y') }}</td>
                    </tr>
                    @endif
                </table>
            </div>

            <!-- Agreed Terms & Privacy Policy Summary -->
            <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 14px; padding: 22px; margin: 25px 0;">
                <h3 style="margin: 0 0 12px 0; color: #0f766e; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">
                    Agreed Terms, Conditions &amp; Privacy Policy
                </h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.8;">
                    <li><strong>Non-Refundable Policy:</strong> As acknowledged, all package amounts and membership payments are strictly <strong>NON-REFUNDABLE</strong> with lifetime validity upon account turnover.</li>
                    <li><strong>Product Availability:</strong> Product allocation and dispatch will be scheduled through DHL once verified in your delivery territory.</li>
                    <li><strong>Online Account Setup:</strong> An official online dashboard with personal login credentials will be prepared for 24/7 business monitoring.</li>
                    <li><strong>Data Privacy Consent:</strong> Your demographic and contact data are processed securely in compliance with the Data Privacy Act and international privacy laws.</li>
                    <li><strong>Consent Status:</strong> <span style="color: #15803d; font-weight: bold;">YES &bull; Officially Accepted</span> (Recorded: {{ optional($registration->agreed_terms_at)->format('F d, Y h:i A') ?? now()->format('F d, Y h:i A') }})</li>
                </ul>
            </div>

            <!-- Edit Information Feature -->
            @if(!empty($registration->edit_url) && $registration->status === 'Pending')
            <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 14px; padding: 22px; margin: 30px 0; text-align: center;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 15px;">Need to update your information?</h4>
                <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b;">
                    If you noticed a typo in your contact number, delivery address, or product set, you can edit your details anytime prior to final admin approval.
                </p>
                <a href="{{ $registration->edit_url }}" style="background-color: #0f172a; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 13px; display: inline-block; box-shadow: 0 3px 10px rgba(15, 23, 42, 0.2);">
                    ✏️ Edit Your Registration Details
                </a>
            </div>
            @endif

            <p style="color: #64748b; font-size: 14px; margin-top: 25px;">
                If you have any questions or require immediate support, reply directly to this email or contact us at <a href="mailto:{{ config('mail.from.address', 'admin@infinite-limitless.com') }}" style="color: #14b8a6; font-weight: bold; text-decoration: none;">{{ config('mail.from.address', 'admin@infinite-limitless.com') }}</a>.
            </p>

            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0 20px 0;">
            <p style="font-size: 13px; color: #64748b; margin: 0;">
                Warm regards,<br>
                <strong style="color: #0f172a;">INFINITE Executive Team</strong>
            </p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Infinite World Plan Administration &bull; Live Limitless</p>
            <p style="margin: 5px 0 0 0; color: #94a3b8;">&copy; {{ date('Y') }} INFINITE. All rights reserved. &bull; Ref #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }}</p>
        </div>
    </div>
</body>
</html>
