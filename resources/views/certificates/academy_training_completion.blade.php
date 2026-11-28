@php
    // ---- Helpers (closures, so the view can be rendered many times per process) ----
    $star = function (float $cx, float $cy, float $R = 7, float $r = 3) {
        $pts = [];
        for ($i = 0; $i < 10; $i++) {
            $rad = ($i % 2 === 0) ? $R : $r;
            $ang = deg2rad(-90 + $i * 36);
            $pts[] = round($cx + $rad * cos($ang), 2) . ',' . round($cy + $rad * sin($ang), 2);
        }
        return implode(' ', $pts);
    };

    $accent    = $theme['color'] ?? '#24dbc3';
    $starCount = (int) ($theme['stars_count'] ?? 1);
    $rankUpper = strtoupper($rank);

    $nameLen  = mb_strlen($member->full_name);
    $nameSize = $nameLen > 34 ? 30 : ($nameLen > 26 ? 36 : ($nameLen > 20 ? 42 : 48));

    // Scalloped seal edge (centered at 62, 60 inside 124x142 ribbon container)
    $sealEdge = [];
    for ($i = 0; $i < 48; $i++) {
        $rad = ($i % 2 === 0) ? 59 : 54.5;
        $ang = deg2rad($i * 7.5);
        $sealEdge[] = round(62 + $rad * cos($ang), 2) . ',' . round(60 + $rad * sin($ang), 2);
    }
    $sealEdge = implode(' ', $sealEdge);
@endphp
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate of Training Completion - {{ $member->full_name }}</title>
    <style>
        @page { size: 842pt 595pt; margin: 0; }
        html, body { margin: 0; padding: 0; background-color: #031927; }
        body { font-family: Helvetica, Arial, sans-serif; color: #ffffff; }
        .abs { position: absolute; }
        .center { position: absolute; left: 0; width: 842pt; text-align: center; }
        .serif { font-family: 'Times New Roman', Times, serif; }
        .label { font-size: 6.5pt; letter-spacing: 2.4pt; color: #7f93a6; text-transform: uppercase; }
        .value { font-family: Courier, monospace; font-size: 10.5pt; font-weight: bold; color: #ffffff; margin-top: 2pt; }
    </style>
</head>
<body>

    <!-- ============ FULL-PAGE BACKGROUND ARTWORK (no gridlines, vector only) ============ -->
    <div class="abs" style="left:0; top:0; width:842pt; height:595pt;">
        @php ob_start(); @endphp
<svg width="842" height="595" viewBox="0 0 842 595" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="842" height="595" fill="#031927"/>

            <!-- soft teal glows in the corners -->
            <circle cx="0"   cy="0"   r="300" fill="#0f766e" fill-opacity="0.20"/>
            <circle cx="0"   cy="0"   r="190" fill="#0f766e" fill-opacity="0.18"/>
            <circle cx="842" cy="595" r="330" fill="#0f766e" fill-opacity="0.20"/>
            <circle cx="842" cy="595" r="210" fill="#0f766e" fill-opacity="0.18"/>

            <!-- diagonal accent bands -->
            <polygon points="842,0 842,170 672,0" fill="#24dbc3" fill-opacity="0.07"/>
            <polygon points="842,0 842,90 752,0"  fill="#f59e0b" fill-opacity="0.10"/>
            <polygon points="0,595 0,425 170,595" fill="#24dbc3" fill-opacity="0.07"/>
            <polygon points="0,595 0,505 90,595"  fill="#f59e0b" fill-opacity="0.10"/>

            <!-- centre watermark rings -->
            <circle cx="421" cy="300" r="120" fill="none" stroke="#24dbc3" stroke-opacity="0.07" stroke-width="1"/>
            <circle cx="421" cy="300" r="165" fill="none" stroke="#24dbc3" stroke-opacity="0.06" stroke-width="1"/>
            <circle cx="421" cy="300" r="210" fill="none" stroke="#24dbc3" stroke-opacity="0.05" stroke-width="1"/>
            <circle cx="421" cy="300" r="255" fill="none" stroke="#24dbc3" stroke-opacity="0.04" stroke-width="1"/>

            <!-- ceremonial frame -->
            <rect x="20" y="20" width="802" height="555" fill="none" stroke="#f59e0b" stroke-width="2.4"/>
            <rect x="30" y="30" width="782" height="535" fill="none" stroke="#24dbc3" stroke-opacity="0.45" stroke-width="0.7"/>

            <!-- corner jewels (diamonds sitting on the frame corners) -->
            <polygon points="20,8 32,20 20,32 8,20"         fill="#031927" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="822,8 834,20 822,32 810,20"    fill="#031927" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="822,563 834,575 822,587 810,575" fill="#031927" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="20,563 32,575 20,587 8,575"    fill="#031927" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="20,15 25,20 20,25 15,20"       fill="#24dbc3"/>
            <polygon points="822,15 827,20 822,25 817,20"   fill="#24dbc3"/>
            <polygon points="822,570 827,575 822,580 817,575" fill="#24dbc3"/>
            <polygon points="20,570 25,575 20,580 15,575"   fill="#24dbc3"/>

            <!-- top & bottom centre jewels sitting on the frame -->
            <polygon points="421,12 431,22 421,32 411,22" fill="#f59e0b"/>
            <polygon points="421,563 431,573 421,583 411,573" fill="#f59e0b"/>
        </svg>
@php $__svg = ob_get_clean(); @endphp
<img src="data:image/svg+xml;base64,{{ base64_encode($__svg) }}" style="width:842pt; height:595pt; vertical-align:bottom;" />
    </div>

    <!-- ============ BRAND ============ -->
    <div class="center" style="top:46pt;">
        <div style="font-family: Helvetica, Arial, sans-serif; font-size:15pt; font-weight:bold; letter-spacing:7pt; color:#24dbc3;">LEGACY CLUB</div>
        <div style="font-size:7pt; font-weight:bold; letter-spacing:6pt; color:#f59e0b; margin-top:3pt;">ACADEMY</div>
    </div>

    <!-- ============ TITLE ============ -->
    <div class="center serif" style="top:84pt; font-size:50pt; font-weight:bold; letter-spacing:9pt; color:#ffffff; line-height:1;">
        CERTIFICATE
    </div>
    <div class="center" style="top:142pt; font-size:13.5pt; font-weight:bold; letter-spacing:10pt; color:#f59e0b;">
        OF COMPLETION
    </div>
    <div class="center" style="top:168pt; font-size:7.5pt; font-weight:bold; letter-spacing:4.5pt; color:#24dbc3;">
        {{ $rankUpper }} &nbsp;LEADERSHIP CURRICULUM
    </div>

    <!-- ============ RECIPIENT ============ -->
    <div class="center" style="top:206pt; font-size:8pt; letter-spacing:4.5pt; color:#9fb2c4;">
        THIS CERTIFICATE IS PROUDLY PRESENTED TO
    </div>
    <div class="center serif" style="top:226pt; font-size:{{ $nameSize }}pt; font-weight:bold; font-style:italic; color:#ffffff; line-height:1.15;">
        {{ $member->full_name }}
    </div>

    <!-- name underline ornament -->
    <div class="abs" style="left:241pt; top:292pt; width:360pt; height:14pt;">
        @php ob_start(); @endphp
<svg width="360" height="14" viewBox="0 0 360 14" xmlns="http://www.w3.org/2000/svg">
            <line x1="0"   y1="7" x2="156" y2="7" stroke="#f59e0b" stroke-width="1.4"/>
            <line x1="204" y1="7" x2="360" y2="7" stroke="#f59e0b" stroke-width="1.4"/>
            <polygon points="180,0 188,7 180,14 172,7" fill="#24dbc3"/>
            <polygon points="164,4 169,7 164,10 159,7" fill="#f59e0b"/>
            <polygon points="196,4 201,7 196,10 191,7" fill="#f59e0b"/>
        </svg>
@php $__svg = ob_get_clean(); @endphp
<img src="data:image/svg+xml;base64,{{ base64_encode($__svg) }}" style="width:360pt; height:14pt; vertical-align:bottom;" />
    </div>

    <!-- citation -->
    <div class="abs" style="left:171pt; top:318pt; width:500pt; text-align:center; font-size:10.5pt; line-height:1.75; color:#cbd5e1;">
        For successfully completing every required sequential training module and reflection milestone of the
        <span style="color:#f59e0b; font-weight:bold; letter-spacing:1pt;">{{ $rankUpper }}</span>
        curriculum of the Legacy Club Academy, demonstrating dedication to personal excellence,
        integrity, and transformative leadership.
    </div>

    <!-- ============ SIGNATORY (LEFT) ============ -->
    <div class="abs" style="left:70pt; top:402pt; width:240pt; text-align:center;">
        @php ob_start(); @endphp
<svg width="190" height="40" viewBox="0 0 190 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 28 C18 10, 24 5, 32 8 C40 11, 38 22, 28 25 C20 27, 22 14, 38 12 C52 10, 68 8, 80 18 C88 24, 76 30, 68 28 C62 26, 64 16, 76 14 C90 12, 108 14, 122 18 C132 20, 142 16, 155 12 M48 24 L72 10 M110 22 C120 12, 134 10, 146 16 C156 21, 168 18, 178 14"
                  fill="none" stroke="#24dbc3" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 33 C50 29, 110 27, 175 31" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
@php $__svg = ob_get_clean(); @endphp
<img src="data:image/svg+xml;base64,{{ base64_encode($__svg) }}" style="width:190pt; height:40pt; vertical-align:bottom;" />
        <div style="width:170pt; margin:3pt auto 5pt auto; border-top:1pt solid #f59e0b;"></div>
        <div style="font-size:11.5pt; font-weight:bold; letter-spacing:2pt; color:#ffffff;">PRIMO ECALNE JR.</div>
        <div style="font-size:7.5pt; font-weight:bold; letter-spacing:1.6pt; color:#f59e0b; margin-top:3pt;">FOUNDER &amp; MASTER COACH</div>
        <div style="font-size:6.5pt; letter-spacing:1.4pt; color:#7f93a6; margin-top:3pt;">LEGACY CLUB EXECUTIVE BOARD</div>
    </div>

    <!-- ============ OFFICIAL SEAL (CENTRE) ============ -->
    <div class="abs" style="left:359pt; top:390pt; width:124pt; height:142pt;">
        {{-- Layer 1: Ribbon tails, scalloped gold medal, and solid navy medallion background --}}
        @php ob_start(); @endphp
<svg width="124" height="142" viewBox="0 0 124 142" xmlns="http://www.w3.org/2000/svg">
            <!-- ribbon tails -->
            <polygon points="40,95 65,102 58,139 48,129 37,134" fill="#0f766e"/>
            <polygon points="59,102 84,95 87,134 76,129 66,139" fill="#115e59"/>

            <!-- scalloped medal -->
            <polygon points="{{ $sealEdge }}" fill="#f59e0b"/>
            <circle cx="62" cy="60" r="50.5" fill="#072538"/>

            @if (empty($badgeBase64))
                <circle cx="62" cy="60" r="50.5" fill="none" stroke="{{ $accent }}" stroke-width="2.2"/>
                <circle cx="62" cy="60" r="44.5" fill="none" stroke="#f59e0b" stroke-opacity="0.75" stroke-width="0.9" stroke-dasharray="2 2.5"/>
                <text x="62" y="58" text-anchor="middle" font-family="Helvetica" font-weight="bold" font-size="24" fill="#f59e0b">LC</text>
                <text x="62" y="70" text-anchor="middle" font-family="Helvetica" font-weight="bold" font-size="5.6" fill="#24dbc3">ACADEMY</text>

                @php $gap = $starCount > 3 ? 10.5 : 13; $startX = 62 - (($starCount - 1) * $gap / 2); @endphp
                @for ($i = 0; $i < $starCount; $i++)
                    <polygon points="{{ $star($startX + $i * $gap, 83, $starCount > 3 ? 4.4 : 5, 2) }}" fill="#f59e0b"/>
                @endfor
                <polygon points="{{ $star(62, 37, 4, 1.8) }}" fill="{{ $accent }}"/>
            @endif
        </svg>
@php $__svgBase = ob_get_clean(); @endphp
<img src="data:image/svg+xml;base64,{{ base64_encode($__svgBase) }}" style="position:absolute; left:0; top:0; width:124pt; height:142pt; vertical-align:bottom;" />
        @if (!empty($badgeBase64))
            {{-- Layer 2: Large, centered rank/tier badge logo --}}
            <img src="{{ $badgeBase64 }}" alt="{{ $rank }} Rank Badge" style="position:absolute; left:32.8pt; top:20pt; width:58.4pt; height:80pt;" />
            {{-- Layer 3: Crisp accent border & inner gold dashed ring over medallion edge --}}
            @php ob_start(); @endphp
<svg width="124" height="142" viewBox="0 0 124 142" xmlns="http://www.w3.org/2000/svg">
                <circle cx="62" cy="60" r="50.5" fill="none" stroke="{{ $accent }}" stroke-width="2.2"/>
                <circle cx="62" cy="60" r="44.5" fill="none" stroke="#f59e0b" stroke-opacity="0.8" stroke-width="1" stroke-dasharray="2.2 2.6"/>
            </svg>
@php $__svgRings = ob_get_clean(); @endphp
<img src="data:image/svg+xml;base64,{{ base64_encode($__svgRings) }}" style="position:absolute; left:0; top:0; width:124pt; height:142pt; vertical-align:bottom;" />
        @endif
    </div>

    <!-- ============ REGISTRY (RIGHT) ============ -->
    <div class="abs" style="left:532pt; top:446pt; width:240pt; text-align:center;">
        <div style="width:170pt; margin:0 auto 8pt auto; border-top:1pt solid #f59e0b;"></div>
        <div class="label">Certificate No.</div>
        <div class="value" style="color:#f59e0b;">{{ $certificateNumber }}</div>

        <div class="label" style="margin-top:8pt;">Date Issued</div>
        <div class="value">{{ $issuedDate }}</div>

        <div class="label" style="margin-top:8pt;">Member ID</div>
        <div class="value" style="color:#24dbc3;">{{ $member->member_id }}</div>
    </div>

    <!-- ============ FOOTER ============ -->
    <div class="center" style="top:541pt; font-size:6pt; letter-spacing:2.6pt; color:#5f7487;">
        OFFICE OF THE ACADEMY REGISTRAR &nbsp;&bull;&nbsp; INFINITE LEGACY
    </div>

</body>
</html>
