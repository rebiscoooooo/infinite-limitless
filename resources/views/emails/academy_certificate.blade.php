<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Certificate of Completion Conferred</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #031927;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #334155;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            background-color: #031927;
            padding: 30px 15px;
            box-sizing: border-box;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .header {
            background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
            padding: 35px 30px;
            text-align: center;
            color: #ffffff;
        }
        .badge-pill {
            display: inline-block;
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.4);
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 4px 14px;
            border-radius: 20px;
            margin-bottom: 12px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .header p {
            margin: 8px 0 0 0;
            font-size: 13px;
            color: #e0f2fe;
            font-weight: 500;
        }
        .content {
            padding: 35px 30px;
        }
        .salutation {
            font-size: 18px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 0;
            margin-bottom: 12px;
        }
        .body-text {
            font-size: 14px;
            line-height: 1.65;
            color: #475569;
            margin-bottom: 20px;
        }
        .cert-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #0f766e;
            border-radius: 14px;
            padding: 20px;
            margin: 25px 0;
        }
        .cert-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 13px;
        }
        .cert-label {
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .cert-value {
            color: #0f172a;
            font-weight: 800;
            font-family: monospace;
        }
        .btn-wrap {
            text-align: center;
            margin: 30px 0;
        }
        .btn {
            display: inline-block;
            background-color: #0f766e;
            color: #ffffff !important;
            font-size: 14px;
            font-weight: 800;
            text-decoration: none !important;
            padding: 14px 32px;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
        }
        .signatory-box {
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            margin-top: 30px;
            font-size: 12px;
            color: #64748b;
        }
        .signatory-name {
            font-weight: 800;
            color: #0f172a;
            font-size: 13px;
        }
        .footer {
            background-color: #031927;
            padding: 25px 30px;
            text-align: center;
            font-size: 11px;
            line-height: 1.6;
            color: #94a3b8;
        }
        .footer a {
            color: #24dbc3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="badge-pill">★ Conferred &amp; Accredited</div>
                <h1>Official Certificate Conferred</h1>
                <p>Legacy Club Academy &bull; Leadership Accreditation</p>
            </div>

            <!-- Content -->
            <div class="content">
                <h2 class="salutation">Mabuhay, {{ $member->first_name }}! 🎓</h2>
                <p class="body-text">
                    Congratulations! The Academy Executive Board and Leadership Council have officially approved and conferred your <strong>Certificate of Training Completion</strong> under the <strong>{{ strtoupper($rank) }}</strong> Leadership Curriculum.
                </p>

                <!-- Certificate Metadata -->
                <div class="cert-card">
                    <div style="font-size: 11px; font-weight: 800; color: #0f766e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                        Official Conferred Credentials
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                        <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Recipient:</td>
                            <td style="padding: 4px 0; text-align: right; font-weight: 800; color: #0f172a;">{{ $member->full_name }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Member ID:</td>
                            <td style="padding: 4px 0; text-align: right; font-weight: 800; font-family: monospace; color: #0f766e;">{{ $member->member_id }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Conferred Rank:</td>
                            <td style="padding: 4px 0; text-align: right; font-weight: 800; color: #f59e0b;">{{ strtoupper($rank) }} TIER</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Certificate No:</td>
                            <td style="padding: 4px 0; text-align: right; font-weight: 800; font-family: monospace; color: #0f172a;">{{ $certificateNumber }}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Date Conferred:</td>
                            <td style="padding: 4px 0; text-align: right; font-weight: 800; color: #0f172a;">{{ $issuedDate }}</td>
                        </tr>
                    </table>
                </div>

                <p class="body-text">
                    Your official certificate file has been attached directly to this email for your convenience and records. You can also log in to your Legacy Club Academy Member Portal at any time to view, download, or share your digital credentials.
                </p>

                <div class="btn-wrap">
                    <a href="{{ $loginUrl }}" class="btn" target="_blank">Access Member Portal &rarr;</a>
                    <div style="margin-top: 12px; font-size: 12px; color: #64748b;">
                        Or log in at: <a href="{{ $loginUrl }}" target="_blank" style="color: #0f766e; font-weight: 700; text-decoration: none;">{{ $loginUrl }}</a>
                    </div>
                </div>

                <!-- Signatory Block -->
                <div class="signatory-box">
                    <div class="signatory-name">PRIMO ECALNE JR.</div>
                    <div>Founder &amp; Master Coach</div>
                    <div>Legacy Club Academy &bull; Executive Leadership Board</div>
                </div>
            </div>

            <!-- Anti-Spam Compliant Footer (CAN-SPAM / GDPR) -->
            <div class="footer">
                <div><strong>INFINITE Global Limitless &bull; Legacy Club Academy</strong></div>
                <div style="margin-top: 4px;">Registered Business Address: Manila, Philippines</div>
                <div style="margin-top: 8px; color: #64748b;">
                    You are receiving this official transactional email because you completed accredited leadership training with Legacy Club Academy.
                </div>
                <div style="margin-top: 8px;">
                    <a href="{{ $loginUrl }}">Manage Portal</a> &bull;
                    <a href="mailto:admin@infinite-limitless.com?subject=Unsubscribe">Unsubscribe Preferences</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
