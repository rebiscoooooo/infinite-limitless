<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product->name }} | INFINITE Daily Spotlight</title>
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
<body id="body" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b1120; margin: 0; padding: 25px 0; color: #1e293b;">
    <!-- Anti-trimming hidden preheader with dynamic unique token -->
    <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
        Discover {{ $product->name }} - {{ $product->category_name ?? $product->category }} &bull; Dispatch: {{ now()->format('YmdHis') }}.
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.35);">
        
        <!-- HEADER WITH LOGO -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #134e4a 100%); padding: 32px 20px; text-align: center; border-bottom: 3px solid #14b8a6;">
            <div style="display: inline-block;">
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 34px; font-weight: 900; color: #ffffff; letter-spacing: 2.5px; line-height: 1;">
                    INFINITE
                </div>
                <div style="font-size: 10px; font-weight: 700; color: #14b8a6; text-transform: uppercase; letter-spacing: 4px; margin-top: 4px;">
                    LIVE LIMITLESS
                </div>
            </div>
            <div style="margin-top: 14px;">
                <span style="background: rgba(20, 184, 166, 0.2); color: #5eead4; border: 1px solid rgba(20, 184, 166, 0.4); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 14px; border-radius: 50px; display: inline-block;">
                    🌟 DAILY PRODUCT SPOTLIGHT
                </span>
            </div>
        </div>

        <!-- MAIN BODY -->
        <div style="padding: 30px 28px;">

            <!-- Product Category & Title -->
            <div style="text-align: center; margin-bottom: 20px;">
                @if($product->badge)
                <span style="background-color: #fef08a; color: #854d0e; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 3px 12px; border-radius: 50px; display: inline-block; margin-bottom: 8px;">
                    {{ $product->badge }}
                </span>
                @endif
                <h1 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 4px 0 8px 0; line-height: 1.3;">
                    {{ $product->name }}
                </h1>
                <p style="color: #0f766e; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
                    {{ $product->category_name ?? strtoupper($product->category) }}
                </p>
            </div>

            <!-- PRODUCT HERO IMAGE -->
            <div style="text-align: center; background: radial-gradient(circle, #f0fdfa 0%, #ffffff 80%); border-radius: 16px; padding: 25px 15px; margin: 15px 0 25px 0; border: 1px solid #ccfbf1;">
                <img src="{{ $product->image_url }}" alt="{{ $product->name }}" style="max-width: 100%; height: auto; max-height: 280px; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.12));">
                @if($product->price_display)
                <div style="margin-top: 15px;">
                    <span style="background-color: #0f172a; color: #5eead4; font-size: 16px; font-weight: 800; padding: 6px 20px; border-radius: 50px; display: inline-block;">
                        {{ $product->price_display }}
                    </span>
                </div>
                @endif
            </div>

            <!-- SHORT DESCRIPTION -->
            <div style="margin-bottom: 24px;">
                <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0; text-align: center; font-weight: 500;">
                    {{ $product->short_description ?? $product->description }}
                </p>
            </div>

            <!-- PRODUCT BENEFITS LIST -->
            @if(!empty($product->benefits))
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; margin: 25px 0;">
                <h3 style="margin: 0 0 14px 0; color: #0f766e; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                    ✨ Key Benefits &amp; Health Highlights:
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    @foreach($product->benefits as $benefit)
                    <tr>
                        <td style="vertical-align: top; width: 26px; padding: 6px 0; color: #14b8a6; font-size: 16px;">
                            ✓
                        </td>
                        <td style="padding: 6px 0; color: #334155; line-height: 1.5; font-weight: 500;">
                            {{ $benefit }}
                        </td>
                    </tr>
                    @endforeach
                </table>
            </div>
            @endif

            <!-- EXTENDED DESCRIPTION IF AVAILABLE -->
            @if($product->description && $product->description !== $product->short_description)
            <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #14b8a6; background-color: #f0fdfa; border-radius: 8px;">
                <p style="margin: 0; font-size: 13.5px; color: #134e4a; line-height: 1.6;">
                    {{ $product->description }}
                </p>
            </div>
            @endif

            <!-- CALL TO ACTION BUTTON -->
            <div style="text-align: center; margin: 32px 0 16px 0;">
                <a href="{{ $productUrl }}" style="background: linear-gradient(135deg, #14b8a6 0%, #0f766e 100%); color: #ffffff; padding: 15px 42px; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 15px; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 5px 20px rgba(20, 184, 166, 0.4);">
                    Explore Products on Website &rarr;
                </a>
                <p style="font-size: 12px; color: #64748b; margin-top: 12px;">
                    Official distributor discounts and multi-currency orders available online.
                </p>
            </div>

        </div>

        <!-- FOOTER -->
        <div style="background-color: #0f172a; padding: 24px 20px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.08);">
            <div style="font-weight: 700; color: #ffffff; margin-bottom: 6px;">
                INFINITE LIVE LIMITLESS &bull; Global Wellness &amp; Direct Sales
            </div>
            <p style="margin: 0 0 10px 0; color: #64748b; font-size: 11.5px; line-height: 1.6;">
                You are receiving this daily product spotlight because your email is registered in the INFINITE system (via registration, inquiry, or community membership).
            </p>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08);">
                <a href="{{ $unsubscribeUrl }}" style="color: #5eead4; text-decoration: underline; font-size: 11px;">
                    Unsubscribe from daily marketing spotlights
                </a>
                &bull;
                <a href="{{ url('/') }}" style="color: #94a3b8; text-decoration: none; font-size: 11px;">
                    Visit Homepage
                </a>
            </div>
            <p style="margin: 10px 0 0 0; color: #475569; font-size: 10px;">
                &copy; {{ date('Y') }} INFINITE LIVE LIMITLESS. All rights reserved.
            </p>
        </div>

    </div>
</body>
</html>

