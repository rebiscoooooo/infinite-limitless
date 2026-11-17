<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Portal Login Credentials</title>
    <style type="text/css">
        /* Force Gmail and modern email clients to display full message without trimming or quoting */
        .gmail_quote,
        .gmail_extra,
        blockquote,
        div[class*="gmail_quote"] {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            max-height: none !important;
        }

        u+#body a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
        }
    </style>
</head>

<body id="body"
    style="font-family: 'Barlow', Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc;">
    <!-- Anti-trimming hidden preheader with dynamic unique token to prevent email client clipping & spam flags -->
    <div
        style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        Official Portal Login Credentials for {{ $registration->full_name }} &bull; Ref
        #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }}-{{ now()->format('YmdHis') }} &bull; Portal:
        {{ $portalUrl }}.
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <div
        style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.12); border: 1px solid #e2e8f0;">
        <!-- Header Banner (Matches Official System Palette) -->
        <div
            style="background: linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #14b8a6 100%); padding: 36px 25px; text-align: center;">
            <h1
                style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase;">
                INFINITE</h1>
            <p style="color: #5eead4; margin: 6px 0 0; font-weight: 700; letter-spacing: 3px; font-size: 13px;">LIVE
                LIMITLESS &bull; WORLD PLAN</p>
            <div
                style="margin-top: 12px; display: inline-block; background-color: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 5px 16px; font-size: 11px; color: #ffffff; letter-spacing: 1px; font-family: monospace; font-weight: bold;">
                OFFICIAL ACCESS NOTICE &bull; REF #WP-{{ str_pad($registration->id, 5, '0', STR_PAD_LEFT) }} &bull;
                {{ now()->format('M d, Y h:i A') }}
            </div>
        </div>

        <div style="padding: 35px 30px;">
            <!-- Overline Status Badge -->
            <div
                style="font-size: 11px; font-weight: 800; color: #0f766e; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">
                PORTAL ACCOUNT PROVISIONED &bull; CONFIDENTIAL ACCESS
            </div>

            <!-- Salutation -->
            <h2 style="color: #0f172a; margin-top: 0; font-size: 22px;">
                Dear {{ $registration->full_name ?: trim(($registration->first_name ?? '') . ' ' . ($registration->last_name ?? '')) }},
            </h2>

            <!-- Greetings -->
            <p style="font-size: 15px; font-weight: 600; color: #0f766e; margin-bottom: 16px;">
                Greetings from the INFINITE LEGACY CLUB Team!
            </p>

            <!-- Congratulations & Introduction Message -->
            <p style="color: #334155; font-size: 15px; margin: 0 0 18px 0; line-height: 1.7;">
                Congratulations on the successful verification and activation of your <strong>INFINITE World
                    Plan</strong> account! We are excited to officially welcome you to our expanding international
                network of visionary leaders and business partners.
            </p>

            <p style="color: #334155; font-size: 15px; margin: 0 0 25px 0; line-height: 1.7;">
                Your personal distributor business portal has been fully provisioned and is now live. Through your
                dedicated portal, you can monitor sales volume, view commission statements, track product orders, and
                manage team expansion 24/7.
            </p>

            <!-- CREDENTIALS HIGHLIGHT BOX -->
            <div
                style="background: linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(15, 118, 110, 0.05) 100%); border-left: 5px solid #14b8a6; border-radius: 14px; padding: 22px 25px; margin: 25px 0;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 20px;">🔐</span>
                    <h3
                        style="color: #0f766e; margin: 0; font-size: 17px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                        Here are your official login credentials:
                    </h3>
                </div>
                <p style="color: #64748b; font-size: 12px; margin: 0 0 18px 0;">
                    Please keep these access details secure and strictly confidential.
                </p>

                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 38%; font-weight: 600;">Authorized Email:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">{{ $registration->email }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Assigned Username:</td>
                        <td style="padding: 8px 0;">
                            <span
                                style="display: inline-block; background-color: #0f172a; color: #2dd4bf; padding: 4px 14px; border-radius: 8px; font-weight: 800; font-family: 'Courier New', Courier, monospace; font-size: 15px; letter-spacing: 1px;">
                                {{ $username }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Assigned Password:</td>
                        <td style="padding: 8px 0;">
                            <span
                                style="display: inline-block; background-color: #0f172a; color: #5eead4; padding: 4px 14px; border-radius: 8px; font-weight: 800; font-family: 'Courier New', Courier, monospace; font-size: 15px; letter-spacing: 1px;">
                                {{ $password }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Membership Tier:</td>
                        <td style="padding: 8px 0; color: #0f766e; font-weight: 700;">
                            {{ strtoupper($registration->package_type) }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Portal Status:</td>
                        <td style="padding: 8px 0;">
                            <span
                                style="background-color: #dcfce7; color: #15803d; padding: 3px 12px; border-radius: 50px; font-weight: 800; font-size: 11px; letter-spacing: 0.5px;">
                                ACTIVE &bull; VERIFIED
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- DIRECT PORTAL LOGIN CTA BUTTON -->
            <div style="text-align: center; margin: 32px 0;">
                <p style="font-size: 14px; color: #0f172a; font-weight: 700; margin-bottom: 14px;">
                    You can now log in to the official INFINITE portal:
                </p>
                <a href="{{ $portalUrl }}" target="_blank"
                    style="background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%); color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 15px; display: inline-block; box-shadow: 0 4px 18px rgba(20, 184, 166, 0.4); text-transform: uppercase; letter-spacing: 1px;">
                    🚀 Log In to Official Portal &rarr;
                </a>
                <p style="font-size: 12px; color: #64748b; margin: 12px 0 0 0; word-break: break-all;">
                    Direct Web Link: <a href="{{ $portalUrl }}"
                        style="color: #0f766e; font-weight: 600; text-decoration: underline;">{{ $portalUrl }}</a>
                </p>
            </div>

            <!-- STEP-BY-STEP INSTRUCTIONS CARD -->
            <div
                style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin: 25px 0;">
                <h4
                    style="margin: 0 0 14px 0; color: #0f766e; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                    📌 How to Get Started with Your Portal:
                </h4>
                <ol style="margin: 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.8;">
                    <li><strong>Open the Website:</strong> Launch your preferred web browser on mobile or desktop and
                        visit <a href="{{ $portalUrl }}"
                            style="color: #0f766e; font-weight: 600;">helloinfinity.net/iprosperity</a>.</li>
                    <li><strong>Sign In:</strong> Type in your assigned username (<strong>{{ $username }}</strong>) and
                        password exactly as provided above.</li>
                    <li><strong>Explore Dashboard:</strong> View your sales overview, genealogical structure,
                        downloadable media assets, and commission balances.</li>
                    <li><strong>Security Recommendation:</strong> For enhanced account safety, you may change your
                        temporary password under Profile Settings after your first successful login.</li>
                </ol>
            </div>

            <!-- SECURITY & CONFIDENTIALITY NOTICE -->
            <div
                style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px 20px; margin: 25px 0;">
                <div style="display: flex; align-items: flex-start; gap: 10px;">
                    <span style="font-size: 18px;">🛡️</span>
                    <div style="font-size: 13px; color: #92400e; line-height: 1.6;">
                        <strong>Confidentiality Notice:</strong> Your login credentials provide administrative access to
                        your business account. INFINITE staff will never request your password via phone or chat. Never
                        disclose your login credentials to third parties.
                    </div>
                </div>
            </div>

            <!-- CLOSING REMARKS -->
            <div
                style="margin-top: 32px; pt-4; border-top: 1px solid #f1f5f9; color: #334155; font-size: 14px; line-height: 1.7;">
                <p style="margin: 0 0 8px 0;">
                    Welcome aboard once again, and here's to a prosperous, limitless journey ahead!
                </p>
                <p style="margin: 16px 0 4px 0; font-weight: 700; color: #0f172a;">
                    From the Infinite Limitless Team,
                </p>
                <p style="margin: 0; color: #64748b; font-size: 13px;">
                    <strong>Global Operations &amp; Member Onboarding Division</strong><br>
                    INFINITE Enterprise &bull; Live Limitless<br>
                    Official Website: <a href="https://infinite-limitless.com"
                        style="color: #0f766e; text-decoration: none;">https://infinite-limitless.com</a>
                </p>
            </div>
        </div>

        <!-- Footer Banner (Matches System) -->
        <div
            style="background-color: #0f172a; padding: 25px 30px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.7; border-top: 1px solid #1e293b;">
            <p style="margin: 0 0 6px 0; color: #cbd5e1; font-weight: 600;">
                Need help with your account?
            </p>
            <p style="margin: 0 0 12px 0;">
                Contact our customer support desk at <a href="mailto:admin@infinite-limitless.com"
                    style="color: #2dd4bf; text-decoration: none;">admin@infinite-limitless.com</a> or reply directly to
                this email.
            </p>
            <div style="height: 1px; background-color: #1e293b; margin: 15px auto; width: 60%;"></div>
            <p style="margin: 0; font-size: 11px; color: #64748b;">
                &copy; {{ date('Y') }} INFINITE (Live Limitless). All rights reserved. This is an automated
                transactional security communication regarding your registration.
            </p>
        </div>
    </div>
</body>

</html>