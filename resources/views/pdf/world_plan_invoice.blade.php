<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Official Invoice & Receipt - {{ $invoice_number }}</title>
    <style>
        @page {
            margin: 25px 30px;
        }
        body {
            font-family: 'DejaVu Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 11px;
            color: #0f172a;
            line-height: 1.45;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        /* Tables & Layout */
        table {
            width: 100%;
            border-collapse: collapse;
        }
        td, th {
            vertical-align: top;
        }

        /* Header Styling */
        .header-table {
            margin-bottom: 12px;
            border-bottom: 3px solid #24dbc3;
            padding-bottom: 14px;
        }
        .brand-title {
            font-size: 26px;
            font-weight: bold;
            letter-spacing: 3px;
            color: #061726;
            margin: 0;
            line-height: 1.1;
        }
        .brand-subtitle {
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 2.5px;
            color: #14b8a6;
            text-transform: uppercase;
            margin-top: 3px;
        }
        .brand-contact {
            font-size: 8.5px;
            color: #64748b;
            margin-top: 5px;
            line-height: 1.4;
        }

        .invoice-title {
            font-size: 18px;
            font-weight: bold;
            color: #082033;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            text-align: right;
            margin: 0;
        }
        .badge-paid {
            display: inline-block;
            background-color: #0f766e;
            color: #ffffff;
            font-size: 9px;
            font-weight: bold;
            letter-spacing: 1.5px;
            padding: 4px 12px;
            border-radius: 20px;
            text-transform: uppercase;
            margin-top: 4px;
        }
        .invoice-meta {
            text-align: right;
            font-size: 9.5px;
            color: #475569;
            margin-top: 6px;
            line-height: 1.5;
        }
        .invoice-meta strong {
            color: #082033;
        }

        /* Info Cards */
        .cards-table {
            margin-bottom: 16px;
        }
        .card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 14px;
        }
        .card-header {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #0f766e;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 5px;
            margin-bottom: 8px;
        }
        .info-row {
            font-size: 9.5px;
            margin-bottom: 4px;
            line-height: 1.4;
        }
        .info-label {
            color: #64748b;
            display: inline-block;
            width: 105px;
            font-weight: normal;
        }
        .info-val {
            color: #0f172a;
            font-weight: bold;
        }

        /* Items Table */
        .items-table {
            margin-bottom: 14px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
        }
        .items-table th {
            background-color: #082033;
            color: #ffffff;
            font-size: 9px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 8px 10px;
            text-align: left;
            border: 1px solid #082033;
        }
        .items-table td {
            padding: 8px 10px;
            border: 1px solid #e2e8f0;
            font-size: 9.5px;
        }
        .items-table tr:nth-child(even) td {
            background-color: #f8fafc;
        }
        .item-title {
            font-weight: bold;
            color: #061726;
            font-size: 10.5px;
            margin-bottom: 3px;
        }
        .item-desc {
            font-size: 8.5px;
            color: #475569;
            line-height: 1.4;
        }
        .inclusions-list {
            margin: 4px 0 0 0;
            padding-left: 14px;
            font-size: 8.5px;
            color: #334155;
            line-height: 1.35;
        }

        /* Totals Block */
        .totals-table {
            margin-bottom: 14px;
        }
        .total-box {
            background-color: #f0fdfa;
            border: 1px solid #99f6e4;
            border-radius: 8px;
            padding: 10px 14px;
            width: 250px;
            float: right;
        }
        .total-row {
            font-size: 9.5px;
            margin-bottom: 4px;
            color: #475569;
        }
        .total-row.grand {
            border-top: 1.5px dashed #14b8a6;
            margin-top: 6px;
            padding-top: 6px;
            font-size: 13px;
            font-weight: bold;
            color: #0f766e;
        }

        /* Policy & Terms */
        .policy-box {
            background-color: #f8fafc;
            border-left: 3px solid #14b8a6;
            border-radius: 4px;
            padding: 8px 12px;
            margin-bottom: 16px;
            font-size: 8px;
            color: #475569;
            line-height: 1.45;
        }
        .policy-box strong {
            color: #0f172a;
        }

        /* Signature & Seal */
        .sign-table {
            margin-top: 8px;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
        }
        .seal-box {
            display: inline-block;
            border: 2px dashed #14b8a6;
            border-radius: 6px;
            padding: 6px 12px;
            text-align: center;
            background-color: #f0fdfa;
        }
        .seal-title {
            font-size: 8.5px;
            font-weight: bold;
            color: #0f766e;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .seal-sub {
            font-size: 7.5px;
            color: #0d9488;
        }

        .footer-note {
            text-align: center;
            font-size: 7.5px;
            color: #94a3b8;
            margin-top: 12px;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <table class="header-table">
        <tr>
            <td style="width: 55%;">
                <div class="brand-title">INFINITE</div>
                <div class="brand-subtitle">LIVE LIMITLESS &bull; WORLD PLAN</div>
                <div class="brand-contact">
                    Official Global Distribution &amp; Executive Services<br>
                    Website: <strong>https://infinite-limitless.com</strong> &bull; Support: <strong>support@infinite-limitless.com</strong><br>
                    Authorized International Corporate Office &bull; Ref License: #INF-WP-GL-2026
                </div>
            </td>
            <td style="width: 45%; text-align: right;">
                <div class="invoice-title">Official Invoice &amp; Receipt</div>
                <div><span class="badge-paid">&#10004; {{ $status }}</span></div>
                <div class="invoice-meta">
                    <strong>Invoice No:</strong> {{ $invoice_number }}<br>
                    <strong>Registration Ref:</strong> #{{ $reference_number }}<br>
                    <strong>Invoice Issue Date:</strong> {{ $invoice_date }}<br>
                    <strong>Payment Confirmed Date:</strong> {{ $payment_date }}
                </div>
            </td>
        </tr>
    </table>

    <!-- Billing and Transaction Details Cards -->
    <table class="cards-table">
        <tr>
            <!-- Customer Information -->
            <td style="width: 49%; padding-right: 1%;">
                <div class="card">
                    <div class="card-header">Billed To (Applicant Details)</div>
                    <div class="info-row">
                        <span class="info-label">Full Name:</span>
                        <span class="info-val">{{ $customer_name }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Username:</span>
                        <span class="info-val">&#64;{{ $username }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email Address:</span>
                        <span class="info-val">{{ $email }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Contact Number:</span>
                        <span class="info-val">{{ $contact_no }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Country / Territory:</span>
                        <span class="info-val">{{ $country }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Delivery Address:</span>
                        <span class="info-val" style="font-size: 8.5px; font-weight: normal; color: #1e293b;">{{ $address }}</span>
                    </div>
                </div>
            </td>

            <!-- Transaction & Package Overview -->
            <td style="width: 49%; padding-left: 1%;">
                <div class="card">
                    <div class="card-header">Membership &amp; Payment Summary</div>
                    <div class="info-row">
                        <span class="info-label">Selected Package:</span>
                        <span class="info-val" style="color: #0f766e;">{{ $package_name }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Executive Tier:</span>
                        <span class="info-val">{{ $package_tier }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Payment Method:</span>
                        <span class="info-val">{{ $payment_method }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Sponsoring Enroller:</span>
                        <span class="info-val">{{ $sponsor }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Verification Status:</span>
                        <span class="info-val" style="color: #059669;">Verified Active &bull; Fully Paid</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Logistics Channel:</span>
                        <span class="info-val">DHL International Express / Authorized Depot</span>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%; text-align: center;">#</th>
                <th style="width: 52%;">Item Description &amp; Specifications</th>
                <th style="width: 15%; text-align: center;">Plan / Tier</th>
                <th style="width: 8%; text-align: center;">Qty</th>
                <th style="width: 20%; text-align: right;">Amount Paid</th>
            </tr>
        </thead>
        <tbody>
            <!-- Primary Package Row -->
            <tr>
                <td style="text-align: center; font-weight: bold; color: #64748b;">01</td>
                <td>
                    <div class="item-title">{{ $package_name }}</div>
                    <div class="item-desc">
                        Official International Registration, Executive Membership License, and Wholesale Distribution Entitlement.
                    </div>
                    @if (!empty($inclusions))
                    <div style="margin-top: 4px; font-weight: bold; color: #0f766e; font-size: 8.5px;">
                        Package Product Allotment &amp; Inclusions:
                    </div>
                    <ul class="inclusions-list">
                        @foreach ($inclusions as $inc)
                            <li>{{ $inc }}</li>
                        @endforeach
                    </ul>
                    @endif
                </td>
                <td style="text-align: center; vertical-align: middle;">
                    <span style="font-weight: bold; color: #0f766e; font-size: 8.5px;">{{ $package_tier }}</span>
                </td>
                <td style="text-align: center; vertical-align: middle; font-weight: bold;">
                    1
                </td>
                <td style="text-align: right; vertical-align: middle; font-weight: bold; font-size: 11px; color: #082033;">
                    {{ $price_display }}
                </td>
            </tr>

            <!-- Backoffice System Activation -->
            <tr>
                <td style="text-align: center; font-weight: bold; color: #64748b;">02</td>
                <td>
                    <div class="item-title" style="font-size: 9.5px;">24/7 Global Business Backoffice System Activation</div>
                    <div class="item-desc">
                        Personalized distributor dashboard, real-time sales match monitoring, digital referral link, and commission accounting portal.
                    </div>
                </td>
                <td style="text-align: center; vertical-align: middle; font-size: 8.5px; color: #64748b;">
                    Digital Platform
                </td>
                <td style="text-align: center; vertical-align: middle;">
                    1
                </td>
                <td style="text-align: right; vertical-align: middle; color: #059669; font-weight: bold;">
                    INCLUDED
                </td>
            </tr>

            <!-- International Shipping & Logistics Preparation -->
            <tr>
                <td style="text-align: center; font-weight: bold; color: #64748b;">03</td>
                <td>
                    <div class="item-title" style="font-size: 9.5px;">International Logistics &amp; Product Preparation</div>
                    <div class="item-desc">
                        Wholesale order compilation, quality assurance inspection, and customs documentation for international/regional dispatch.
                    </div>
                </td>
                <td style="text-align: center; vertical-align: middle; font-size: 8.5px; color: #64748b;">
                    Logistics Fulfillment
                </td>
                <td style="text-align: center; vertical-align: middle;">
                    1
                </td>
                <td style="text-align: right; vertical-align: middle; color: #059669; font-weight: bold;">
                    INCLUDED
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Totals Table -->
    <table class="totals-table">
        <tr>
            <td style="width: 55%; padding-right: 15px;">
                @if (!empty($admin_notes))
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px;">
                    <strong style="color: #0f172a; font-size: 8.5px; text-transform: uppercase;">Administrative Note:</strong>
                    <p style="margin: 3px 0 0 0; font-size: 8.5px; color: #334155;">{{ $admin_notes }}</p>
                </div>
                @endif
                <div class="seal-box">
                    <div class="seal-title">&#9733; INFINITE OFFICIAL SEAL &bull; CLEARED &amp; VALIDATED &#9733;</div>
                    <div class="seal-sub">Authorized by Global Distribution Finance &bull; Ref #{{ $reference_number }}</div>
                </div>
            </td>
            <td style="width: 45%;">
                <div class="total-box">
                    <table style="width: 100%;">
                        <tr class="total-row">
                            <td style="color: #64748b;">Package Subtotal:</td>
                            <td style="text-align: right; font-weight: bold; color: #0f172a;">{{ $price_display }}</td>
                        </tr>
                        <tr class="total-row">
                            <td style="color: #64748b;">Handling &amp; Digital Setup:</td>
                            <td style="text-align: right; color: #059669; font-weight: bold;">FREE / $0.00</td>
                        </tr>
                        <tr class="total-row">
                            <td style="color: #64748b;">Applicable Taxes &amp; Duties:</td>
                            <td style="text-align: right; color: #64748b;">Included</td>
                        </tr>
                        <tr class="total-row grand">
                            <td>TOTAL PAID:</td>
                            <td style="text-align: right;">{{ $price_display }}</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: right; font-size: 8px; color: #059669; font-weight: bold; padding-top: 3px;">
                                &#10004; Payment Cleared in Full
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>

    <!-- Official Policies and Terms -->
    <div class="policy-box">
        <strong>Official Policies &amp; Distributor Undertakings:</strong><br>
        &bull; <strong>Official Receipt &amp; Proof of Purchase:</strong> This electronic document serves as the official tax invoice and certified receipt for your INFINITE World Plan registration.<br>
        &bull; <strong>Strict Non-Refundable Policy &amp; Lifetime Validity:</strong> As processing involves immediate product allotment, marketing tier allocation, and international account setup, registrations are strictly <strong>NON-REFUNDABLE</strong> and possess lifetime validity.<br>
        &bull; <strong>DHL International Dispatch &amp; Product Turn-Over:</strong> Package shipments are scheduled via DHL Express or designated authorized country distribution depots. Tracking numbers will be dispatched as soon as the consignment clears dispatch.<br>
        &bull; <strong>Online Account Credentials:</strong> Your customized 24/7 backoffice credentials (Username: <strong>{{ $username }}</strong>) will be transmitted separately via secure administrator dispatch.
    </div>

    <!-- Sign-off Section -->
    <table class="sign-table">
        <tr>
            <td style="width: 50%;">
                <div style="font-size: 8.5px; color: #64748b;">Issued and Certified by:</div>
                <div style="font-size: 11px; font-weight: bold; color: #061726; margin-top: 3px;">INFINITE CORPORATE FINANCE</div>
                <div style="font-size: 8px; color: #0f766e; font-weight: bold;">Global Business Development &amp; Distribution Operations</div>
                <div style="font-size: 7.5px; color: #94a3b8;">infinite-limitless.com &bull; Certified Electronic Copy</div>
            </td>
            <td style="width: 50%; text-align: right;">
                <div style="font-size: 8.5px; color: #64748b;">Applicant Acceptance:</div>
                <div style="font-size: 11px; font-weight: bold; color: #061726; margin-top: 3px;">{{ $customer_name }}</div>
                <div style="font-size: 8px; color: #475569;">Registered Member &bull; Ref #{{ $reference_number }}</div>
                <div style="font-size: 7.5px; color: #059669; font-weight: bold;">ELECTRONICALLY VERIFIED</div>
            </td>
        </tr>
    </table>

    <div class="footer-note">
        This document is an official, digitally generated invoice produced by the INFINITE World Plan Administration System. &bull; Page 1 of 1 &bull; Document Security Hash: {{ substr(md5($invoice_number . $customer_name), 0, 16) }}
    </div>

</body>
</html>
