<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribe Confirmation | INFINITE Live Limitless</title>
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Bebas+Neue&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #0f172a;
            color: #ffffff;
            font-family: 'Barlow', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card {
            background: #1e293b;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 40px 30px;
            max-width: 480px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .brand-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 38px;
            letter-spacing: 2px;
            color: #fff;
            margin: 0;
            line-height: 1;
        }
        .brand-sub {
            font-size: 10px;
            font-weight: 700;
            color: #14b8a6;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-top: 4px;
            margin-bottom: 25px;
        }
        .btn-home {
            background: #14b8a6;
            color: #0f172a;
            font-weight: 700;
            padding: 12px 28px;
            border-radius: 50px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1 class="brand-title">INFINITE</h1>
        <div class="brand-sub">LIVE LIMITLESS</div>

        @if($isValid)
            <div style="font-size: 48px; margin-bottom: 15px;">✓</div>
            <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 10px; color: #5eead4;">Successfully Unsubscribed</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                <strong>{{ $email }}</strong> has been unsubscribed from our daily product marketing spotlights. You will no longer receive daily promotional emails.
            </p>
        @else
            <div style="font-size: 48px; margin-bottom: 15px; color: #f87171;">⚠️</div>
            <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 10px; color: #f87171;">Invalid or Expired Link</h2>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                The unsubscribe link is invalid or expired. If you need assistance, please contact us directly at <a href="mailto:infinitelimitless123@gmail.com" style="color: #5eead4;">infinitelimitless123@gmail.com</a>.
            </p>
        @endif

        <a href="/" class="btn-home">Return to Homepage</a>
    </div>
</body>
</html>

