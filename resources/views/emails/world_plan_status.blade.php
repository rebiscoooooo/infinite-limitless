<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Plan Application Status</title>
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
        Status Update on INFINITE World Plan Application for {{ $registration->full_name }} &bull; Ref #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }}-{{ now()->format('YmdHis') }} &bull; Status: {{ $registration->status }}.
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.12); border: 1px solid #e2e8f0;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #14b8a6 100%); padding: 36px 25px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase;">INFINITE</h1>
            <p style="color: #5eead4; margin: 6px 0 0; font-weight: 700; letter-spacing: 3px; font-size: 13px;">LIVE LIMITLESS &bull; WORLD PLAN</p>
            <div style="margin-top: 12px; display: inline-block; background-color: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 5px 16px; font-size: 11px; color: #ffffff; letter-spacing: 1px; font-family: monospace; font-weight: bold;">
                OFFICIAL NOTICE &bull; REF #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }} &bull; {{ now()->format('M d, Y h:i A') }}
            </div>
        </div>

        <div style="padding: 35px 30px;">
            <div style="font-size: 11px; font-weight: 800; color: {{ $registration->status === 'Approved' ? '#0f766e' : '#b45309' }}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                APPLICATION DECISION &bull; {{ strtoupper($registration->status) }}
            </div>
            <h2 style="color: #0f172a; margin-top: 0; font-size: 22px;">Hello {{ $registration->full_name }},</h2>
            
            @if ($registration->status === 'Approved')
                <!-- Built-in Approved Response -->
                <div style="background: linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(15, 118, 110, 0.05) 100%); border-left: 5px solid #14b8a6; border-radius: 12px; padding: 20px 25px; margin: 25px 0;">
                    <h3 style="color: #0f766e; margin: 0 0 10px 0; font-size: 18px; font-weight: 800;">
                        🎉 CONGRATULATIONS! REGISTRATION APPROVED
                    </h3>
                    <p style="color: #0f172a; margin: 0; font-size: 15px; font-weight: 500;">
                        We are thrilled to confirm that your official registration for the <strong>INFINITE World Plan</strong> has been officially <strong>APPROVED</strong>!
                    </p>
                </div>

                <!-- Registration Summary Card -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin: 25px 0;">
                    <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Approved Registration &amp; Package Details</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr>
                            <td style="padding: 6px 0; color: #64748b; width: 40%;">Registered Username:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">{{ $registration->username }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Selected Package:</td>
                            <td style="padding: 6px 0; color: #0f766e; font-weight: bold;">{{ strtoupper($registration->package_type) }}</td>
                        </tr>
                        @if ($registration->product_set)
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Product Set / Allotment:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">{{ $registration->product_set }}</td>
                        </tr>
                        @endif
                        @if ($registration->country)
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Country / Destination:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">{{ $registration->country }}</td>
                        </tr>
                        @endif
                        @if ($registration->sponsor)
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Enroller / Sponsor:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">{{ $registration->sponsor }}</td>
                        </tr>
                        @endif
                        @if ($registration->payment_method)
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Payment Method:</td>
                            <td style="padding: 6px 0; color: #0f172a;">{{ $registration->payment_method }}</td>
                        </tr>
                        @endif
                        <tr>
                            <td style="padding: 6px 0; color: #64748b;">Verification Status:</td>
                            <td style="padding: 6px 0;"><span style="background-color: #dcfce7; color: #15803d; padding: 3px 10px; border-radius: 50px; font-weight: bold; font-size: 12px;">ACTIVE &amp; APPROVED</span></td>
                        </tr>
                    </table>
                </div>

                <!-- Terms & Operational Commitments from Official Certificate -->
                <div style="background-color: #ffffff; border: 1px solid #ccfbf1; border-radius: 14px; padding: 22px; margin: 25px 0;">
                    <h4 style="margin: 0 0 12px 0; color: #0f766e; font-size: 15px;">Official Process &amp; Next Steps</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.8;">
                        <li><strong>Product Availability &amp; Dispatch:</strong> We will keep you posted with your products availability once it's available in your area for DHL international dispatch.</li>
                        <li><strong>Online Account Setup:</strong> We will create your online account and it will be up soon to monitor your business 24/7. It comes with your personal username (<strong>{{ $registration->username }}</strong>) and secure password login.</li>
                        <li><strong>Non-Refundable Policy &amp; Lifetime Validity:</strong> As you have taken process this is strictly <strong>NON-REFUNDABLE</strong>. From now and your lifetime registration validity after we turn over your account.</li>
                    </ul>
                </div>

                @if(!empty($registration->admin_notes))
                <div style="background-color: #f1f5f9; border-left: 4px solid #64748b; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #334155;">
                    <strong style="color: #0f172a;">Note from Administration:</strong><br>
                    {{ $registration->admin_notes }}
                </div>
                @endif

                <!-- Congratulations Graphic Notice -->
                <div style="text-align: center; margin: 30px 0;">
                    <p style="font-size: 13px; color: #64748b; margin-bottom: 14px;">Please find your official <strong>INFINITE Welcome &amp; Registration Certificate</strong> attached to this email (<em>image.png</em>).</p>
                    <a href="{{ config('app.url') }}" style="background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%); color: #ffffff; padding: 14px 38px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.35);">
                        🌐 Explore INFINITE Website &rarr;
                    </a>
                    <p style="font-size: 12px; color: #94a3b8; margin: 12px 0 0 0;">
                        While our onboarding team prepares your official 24/7 business backoffice and package dispatch, feel free to explore our product lines, stories, and global community.
                    </p>
                </div>
            @else
                <!-- Built-in Rejected Response -->
                <div style="background-color: #fef2f2; border-left: 5px solid #ef4444; border-radius: 12px; padding: 20px 25px; margin: 25px 0;">
                    <h3 style="color: #b91c1c; margin: 0 0 10px 0; font-size: 17px; font-weight: 700;">
                        Application Status: Not Approved
                    </h3>
                    <p style="color: #7f1d1d; margin: 0; font-size: 14px;">
                        Thank you for your interest in the Infinite World Plan. After careful verification, your application for package <strong>{{ strtoupper($registration->package_type) }}</strong> could not be approved at this time.
                    </p>
                </div>

                @if(!empty($registration->rejection_reason))
                <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 14px; color: #881337;">
                    <strong style="color: #9f1239;">Reason for Disapproval:</strong><br>
                    {{ $registration->rejection_reason }}
                </div>
                @else
                <p style="color: #475569; font-size: 14px;">
                    This is commonly due to an unreadable or unverified payment slip, an incomplete proof of remittance, or an invalid applicant identity detail.
                </p>
                @endif

                <p style="color: #475569; font-size: 14px;">
                    If you would like to resubmit your payment receipt or clarify your application, please reply directly to this email or visit our registration portal at <a href="{{ url('/registration') }}" style="color: #14b8a6; font-weight: bold;">infinite-limitless.com/registration</a>.
                </p>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="mailto:{{ config('mail.from.address', 'admin@infinite-limitless.com') }}?subject=World%20Plan%20Application%20Re-verification%20-{{ urlencode($registration->username) }}" style="background-color: #0f172a; color: #ffffff; padding: 13px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 13px; display: inline-block;">
                        Contact Support Desk
                    </a>
                </div>
            @endif

            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 35px 0 20px 0;">
            <p style="font-size: 14px; color: #64748b; margin: 0;">
                Warm regards,<br>
                <strong style="color: #0f172a;">INFINITE Executive Administration</strong><br>
                <span style="font-size: 12px; color: #94a3b8;">People &bull; Products &bull; Opportunities &bull; A Better Tomorrow</span>
            </p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Infinite World Plan Administration &bull; Live Limitless</p>
            <p style="margin: 5px 0 0 0; color: #94a3b8;">&copy; {{ date('Y') }} INFINITE. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

