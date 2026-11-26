<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Legacy Club Academy Application Status</title>
    <style type="text/css">
        .gmail_quote, .gmail_extra, blockquote, div[class*="gmail_quote"] {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            max-height: none !important;
        }
        u + #body a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
    </style>
</head>
<body id="body" style="font-family: 'Barlow', 'Helvetica Neue', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 24px; background-color: #030d17;">
    <!-- Anti-trimming hidden preheader -->
    <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        Legacy Club Academy Official Decision &bull; Member: {{ $member->full_name }} &bull; Status: {{ $member->status }} &bull; Ref: {{ $member->member_id }} &bull; {{ now()->format('YmdHis') }}
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <div style="max-width: 640px; margin: 0 auto; background-color: #061726; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); border: 1px solid rgba(36, 219, 195, 0.25);">
        <!-- Header Banner with System Palette -->
        <div style="background: radial-gradient(ellipse at 50% 0%, #0d2a45 0%, #061726 100%); padding: 38px 25px; text-align: center; border-bottom: 1px solid rgba(36, 219, 195, 0.2);">
            <div style="margin-bottom: 14px;">
                <img src="{{ asset('assets/image/academy/logo-chrome-trimmed.png') }}" alt="Legacy Club PH" style="height: 48px; width: auto; display: inline-block;" />
            </div>
            <div style="font-size: 11px; font-weight: 800; color: #24dbc3; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 6px;">
                INFINITE &bull; LIVE LIMITLESS
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase;">
                LEGACY CLUB ACADEMY
            </h1>
            <div style="margin-top: 14px; display: inline-block; background-color: rgba(36, 219, 195, 0.12); border: 1px solid rgba(36, 219, 195, 0.35); border-radius: 50px; padding: 6px 18px; font-size: 11px; color: #24dbc3; letter-spacing: 1.5px; font-family: monospace; font-weight: bold;">
                MEMBER ID: {{ $member->member_id }} &bull; {{ now()->format('M d, Y') }}
            </div>
        </div>

        <div style="padding: 36px 30px; color: #e2e8f0;">
            <div style="font-size: 12px; font-weight: 800; color: {{ $member->status === 'Approved' ? '#24dbc3' : '#f59e0b' }}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
                APPLICATION STATUS &bull; {{ strtoupper($member->status) }}
            </div>
            <h2 style="color: #ffffff; margin-top: 0; font-size: 22px; font-weight: 700;">
                Dear {{ $member->full_name }},
            </h2>

            @if ($member->status === 'Approved')
                <!-- Approved Announcement Box -->
                <div style="background: linear-gradient(135deg, rgba(36, 219, 195, 0.15) 0%, rgba(20, 184, 166, 0.05) 100%); border-left: 4px solid #24dbc3; border-radius: 12px; padding: 22px 24px; margin: 24px 0;">
                    <h3 style="color: #24dbc3; margin: 0 0 10px 0; font-size: 18px; font-weight: 800;">
                        CONGRATULATIONS &amp; WELCOME TO THE ACADEMY!
                    </h3>
                    <p style="color: #f1f5f9; margin: 0; font-size: 15px; line-height: 1.6;">
                        Your membership application for the <strong>Legacy Club Academy</strong> has been officially <strong>APPROVED</strong> by the Executive Board. You now possess verified access to the exclusive academy portal and resources.
                    </p>
                </div>

                <!-- Assigned Rank Tier Card -->
                <div style="background-color: #030e18; border: 1px solid rgba(36, 219, 195, 0.3); border-radius: 14px; padding: 24px; margin: 24px 0; text-align: center;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; font-weight: 700; margin-bottom: 8px;">
                        YOUR OFFICIAL RANK &amp; DESIGNATION
                    </div>

                    @if (!empty($rankDetails['badge_image']))
                        <div style="margin: 14px auto 10px; text-align: center;">
                            <img src="{{ asset($rankDetails['badge_image']) }}" alt="{{ $rankDetails['name'] ?? 'Tier Badge' }}" style="height: 100px; width: auto; display: inline-block;" />
                        </div>
                    @endif
                    
                    <div style="font-size: 26px; letter-spacing: 3px; color: #24dbc3; font-weight: 900; text-transform: uppercase; margin: 6px 0;">
                        {{ $rankDetails['name'] ?? 'MEMBER' }}
                    </div>

                    <div style="font-size: 20px; color: #f59e0b; letter-spacing: 6px; margin-bottom: 12px;">
                        {{ $rankDetails['stars_display'] ?? '★' }}
                    </div>

                    <div style="display: inline-block; background-color: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 6px 14px; font-size: 12px; color: #cbd5e1; font-weight: 600;">
                        {{ $rankDetails['title'] ?? 'Verified Member' }}
                    </div>

                    <p style="color: #94a3b8; font-size: 13px; margin: 14px auto 0; max-width: 460px; line-height: 1.5;">
                        {{ $rankDetails['description'] ?? 'Member of the Legacy Club Academy.' }}
                    </p>
                </div>

                <!-- Member Credentials Summary -->
                <div style="background-color: #030e18; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 22px; margin: 24px 0;">
                    <h4 style="margin: 0 0 16px 0; color: #ffffff; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                        Verified Account Credentials
                    </h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr>
                            <td style="padding: 7px 0; color: #64748b; width: 38%;">Member ID:</td>
                            <td style="padding: 7px 0; color: #24dbc3; font-weight: bold; font-family: monospace;">{{ $member->member_id }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; color: #64748b;">Full Name:</td>
                            <td style="padding: 7px 0; color: #ffffff; font-weight: 600;">{{ $member->full_name }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; color: #64748b;">Country:</td>
                            <td style="padding: 7px 0; color: #cbd5e1;">
                                <span style="font-size: 16px; vertical-align: middle;">{{ $member->country_info['flag'] ?? '🌐' }}</span>
                                {{ $member->country_info['name'] ?? 'International' }} ({{ $member->phone_country_code }})
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; color: #64748b;">Registered Email:</td>
                            <td style="padding: 7px 0; color: #ffffff;">{{ $member->email }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; color: #64748b;">Contact Number:</td>
                            <td style="padding: 7px 0; color: #cbd5e1;">{{ $member->phone_country_code }} {{ $member->phone_number }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 7px 0; color: #64748b;">Approval Date:</td>
                            <td style="padding: 7px 0; color: #cbd5e1;">{{ now()->format('F d, Y - h:i A') }}</td>
                        </tr>
                    </table>
                </div>

                <!-- Action Button -->
                <div style="text-align: center; margin: 34px 0 20px;">
                    <a href="{{ $loginUrl }}" style="display: inline-block; background: linear-gradient(135deg, #24dbc3 0%, #14b8a6 100%); color: #031422; text-decoration: none; padding: 16px 36px; border-radius: 12px; font-weight: 800; font-size: 15px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 10px 25px rgba(36, 219, 195, 0.35);">
                        ACCESS ACADEMY PORTAL &rarr;
                    </a>
                    <div style="margin-top: 12px; font-size: 12px; color: #64748b;">
                        Or navigate to: <a href="{{ $loginUrl }}" style="color: #24dbc3;">{{ $loginUrl }}</a>
                    </div>
                </div>
            @else
                <!-- Rejection Notice -->
                <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; border-radius: 12px; padding: 22px 24px; margin: 24px 0;">
                    <h3 style="color: #f87171; margin: 0 0 10px 0; font-size: 18px; font-weight: 800;">
                        APPLICATION NOT APPROVED
                    </h3>
                    <p style="color: #e2e8f0; margin: 0; font-size: 15px; line-height: 1.6;">
                        Thank you for your interest in the Legacy Club Academy. After careful review by our administration, we regret to inform you that we are unable to approve your application at this time.
                    </p>
                    @if ($member->rejection_reason)
                        <div style="margin-top: 16px; padding: 14px; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px dashed rgba(239, 68, 68, 0.4);">
                            <div style="font-size: 11px; text-transform: uppercase; color: #fca5a5; font-weight: 700; margin-bottom: 4px;">Reason specified:</div>
                            <div style="font-size: 14px; color: #ffffff;">{{ $member->rejection_reason }}</div>
                        </div>
                    @endif
                </div>

                <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
                    If you believe this was in error or you have updated information to provide, please contact our support team at <a href="mailto:support@infinite-limitless.com" style="color: #24dbc3;">support@infinite-limitless.com</a>.
                </p>
            @endif

            <!-- Security Notice -->
            <div style="margin-top: 35px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #64748b; line-height: 1.6;">
                <strong>Security Reminder:</strong> Never share your password or security credentials with anyone. INFINITE administrators will never ask for your account password.
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #030a12; padding: 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: #64748b;">
            <div style="font-weight: 700; color: #cbd5e1; margin-bottom: 4px;">INFINITE: LIVE LIMITLESS &bull; LEGACY CLUB ACADEMY</div>
            <div>Official Executive System Communication &bull; All Rights Reserved.</div>
        </div>
    </div>
</body>
</html>
