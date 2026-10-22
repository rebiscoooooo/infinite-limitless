<?php
session_start();
require_once 'public_auth_guard.php';
// =============================================================
// NEW PRODUCT VARIATIONS ARRAY (for the card)
// =============================================================
$variations = [
    [
        "product_title" => "INFINITE ROBUSTUS",
        "sub_label" => "BLENDED WITH STEVIA LEAVES",
        "sub_title" => "BLACK COFFEE WITH PURE ORGANIC BARLEY",
        "bg_color" => "#2f1b02",
        "main_image" => "./assets/image/blackco.png",
        "description" => "Experience the bold taste of pure Robusta beans blended with our signature organic barley. This is a guilt-free wellness ritual designed for sustained physical energy and mental clarity.",
        "jobs" => [
            ["title" => "Job 1: Zero Sugar Spike", "text" => "Sweetened strictly with Stevia leaves. It provides a rich taste without triggering an insulin response, making it perfectly diabetic-friendly."],
            ["title" => "Job 2: Fat Burning Catalyst", "text" => "Robusta beans contain higher levels of Chlorogenic Acid than Arabica, scientifically proven to boost resting metabolism and aid in fat loss."],
            ["title" => "Job 3: Acid Buffer", "text" => "The addition of alkaline Organic Barley neutralizes the high acidity typical of black coffee, making it exceptionally gentle on the stomach."]
        ],
        "replaces" => "High-Sugar Cafe Drinks + Synthetic Pre-Workouts + Acidic Instant Coffees"
    ],
    [
        "product_title" => "INFINITE BARLEY",
        "sub_label" => "100% ORGANIC & HALAL CERTIFIED",
        "sub_title" => "PURE ORGANIC BARLEY POWDER FROM AUSTRALIA",
        "bg_color" => "#2d4a22",
        "main_image" => "./assets/image/Ley.png",
        "description" => "A powerhouse daily superfood packed with 70+ organic trace minerals, vital chemical precursors, and live structural enzymes harvested directly from pristine Australian farmland.",
        "jobs" => [
            ["title" => "Job 1: Cellular Anti-Aging", "text" => "Contains Superoxide Dismutase (S.O.D.), a critical enzyme that scientifically dismantles oxygen free radicals, slowing down cellular breakdown."],
            ["title" => "Job 2: Deep Blood Purifier", "text" => "Rich in natural Chlorophyll which acts as an internal cleanser, pulling heavy metals and toxins from the liver and bloodstream."],
            ["title" => "Job 3: Gut Health & Weight Control", "text" => "High in soluble fiber to optimize digestion, naturally lower bad cholesterol, and prevent blood sugar spikes."]
        ],
        "replaces" => "Synthetic Multivitamin + Fiber Supplement + Detox Teas"
    ],
    [
        "product_title" => "WHITE PLUS GLUTATHIONE",
        "sub_label" => "NO APPROVED THERAPEUTIC CLAIMS",
        "sub_title" => "ADVANCED FORMULA WITH NAC, VIT C, COLLAGEN & ALA (30 CAPSULES)",
        "bg_color" => "#1E3A5F",
        "main_image" => "./assets/image/Plus.png",
        "description" => "A powerful clinical blend that works deep inside your body. It is a myth that Glutathione is only for skin whitening; it is your body's master antioxidant.",
        "jobs" => [
            ["title" => "Job 1: Liver & Toxin Defense", "text" => "Uses N-Acetyl Cysteine (NAC), a crucial amino acid precursor that allows your liver to synthesize massive amounts of its own intracellular glutathione."],
            ["title" => "Job 2: Sleep & Insomnia Support", "text" => "By neutralizing neuro-inflammation and regulating glutamate levels in the brain (via NAC), it calms the nervous system for deeper, higher-quality sleep."],
            ["title" => "Job 3: Total Skin Transformation", "text" => "Vitamin C, Collagen, and Alpha Lipoic Acid (ALA) work synergistically to recycle antioxidants, improve skin elasticity, and promote a radiant, even glow from within."]
        ],
        "replaces" => "Basic Gluta Pills + Sleep Aids + Standalone Collagen"
    ]
];

// =============================================================
// CATEGORIZED CONDITIONS RESPONSIVE TO BARLEY
// =============================================================
$barley_categories = [
    [
        "title" => "Cardiovascular & Blood",
        "icon" => "bi-heart-pulse-fill",
        "color" => "#ef4444", // Red
        "bg" => "rgba(239, 68, 68, 0.1)",
        "items" => ["Anemia", "Blood Pressure", "Cholesterol", "High Blood", "Hypertension", "Leukemia", "Stroke"]
    ],
    [
        "title" => "Reproductive & Hormonal",
        "icon" => "bi-person-heart",
        "color" => "#ec4899", // Pink
        "bg" => "rgba(236, 72, 153, 0.1)",
        "items" => ["Breast Cancer", "Cervical Cancer", "Dysmenorrhea", "Endometriosis", "Hormonal Imbalance", "Infertility", "Irregular Menstruation", "Low Sperm Count", "Myoma", "Prostate Cancer"]
    ],
    [
        "title" => "Digestive & Internal Organs",
        "icon" => "bi-activity",
        "color" => "#f59e0b", // Amber/Orange
        "bg" => "rgba(245, 158, 11, 0.1)",
        "items" => ["Constipation", "Detox", "Diabetes", "Gallstone", "Goiter", "Hepatitis", "Hyperacidity", "Kidney Disease", "Kidney Stones", "Liver Problem", "Thyroid Problem", "Ulcer"]
    ],
    [
        "title" => "Immunity, Pain & General",
        "icon" => "bi-shield-fill-plus",
        "color" => "var(--ch-teal)", // Teal
        "bg" => "rgba(20, 184, 166, 0.1)",
        "items" => ["Arthritis", "Asthma", "Bronchitis", "Cancer", "Cataract", "Cyst", "Gout", "Immune Deficiency", "Insomnia", "Mental Tiredness", "Migraine", "Muscle & Nerve Pain", "Overweight", "Psoriasis", "Skin Disease/Acne", "Slow Ageing Process", "Tuberculosis", "Tumor"]
    ]
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no" />
    <title>INFINITE WELLNESS | Pure. Organic. Powerful.</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="./assets/css/styles.css" />

    <style>
        /* CSS Variables - Restored to original O'LAMOUR Teal Palette */
        :root {
            --ch-teal: #14b8a6; 
            --ch-teal-darker: #0f766e;
            --ch-dark-slate: #0f172a;
            --ch-slate-muted: #64748b;
            --ch-white: #ffffff;
            --ch-bg-light: #f8fafc;
            --ch-border: #e2e8f0;
            --ch-yellow: #f59e0b;
            --ch-yellow-dk: #d97706;
            --ch-yellow-light: #fef08a;
        }

        /* Strict overflow control for all devices */
        html, body {
            overflow-x: hidden;
            width: 100%;
            background-color: var(--ch-white);
            scroll-behavior: smooth;
        }

        /* Hero Grid Lines */
        .hero-grid-lines {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle at 1px 1px, hsla(0, 0%, 100%, 0.15) 1px, transparent 0);
            background-size: 40px 40px;
            z-index: 1;
        }

        /* Hero Typography */
        .ola-hero-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(3.5rem, 10vw, 8.5rem);
            color: var(--ch-white);
            line-height: 1;
            letter-spacing: 2px;
            text-shadow: 0 10px 30px rgba(0,0,0,0.5);
            margin-bottom: 0;
        }

        .ola-script {
            font-family: 'Great Vibes', cursive;
            color: #5eead4;
            font-size: clamp(2.5rem, 6vw, 5.5rem);
            line-height: 1;
            margin-bottom: 10px;
            text-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
        }

        /* Blinking dot animation */
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-eyebrow .dot {
            width: 8px; height: 8px; background: #5eead4;
            border-radius: 50%; display: inline-block;
            animation: pulse-dot 2s infinite;
        }

        /* Section Global Spacing */
        .section-pad {
            padding: 5rem 0;
        }
        @media (min-width: 992px) {
            .section-pad {
                padding: 8rem 0;
            }
        }

        .section-tag {
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--ch-teal);
            font-size: 0.85rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .section-title, .section-title1 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.5rem, 5vw, 4rem);
            color: var(--ch-dark-slate);
            line-height: 1.1;
        }
        .section-title1 { color: var(--ch-white); }

        /* =========================================================
            NEW PRODUCT CARD STYLES (EXPANDED & MORE READABLE)
        ========================================================= */
        .product-card-modern {
            width: 100%;
            max-width: 1400px; /* EXPANDED HORIZONTALLY */
            margin: 0 auto;
            border-radius: 36px;
            overflow: hidden;
            display: flex;
            color: white;
            position: relative;
            box-shadow: 0 35px 70px rgba(0, 0, 0, 0.5);
            transition: background-color 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            background-color: <?php echo $variations[0]['bg_color']; ?>;
        }

        .card-body-modern {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1.1fr 1.1fr;
            align-items: center;
            padding: 60px 70px; /* EXPANDED VERTICALLY AND HORIZONTALLY */
            gap: 40px; /* INCREASED GAP */
        }

        /* Left Column */
        .left-column-modern {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .badge-modern {
            align-self: flex-start;
            border: 1px solid #2dd4bf;
            color: #2dd4bf;
            font-size: 13px; /* INCREASED */
            font-weight: bold;
            padding: 6px 14px; /* ADJUSTED */
            border-radius: 6px;
            margin-bottom: 18px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .left-column-modern h1 {
            font-size: clamp(2.5rem, 4vw, 3.8rem); /* INCREASED & RESPONSIVE CLAMP */
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: 0.5px;
            font-family: 'Bebas Neue', sans-serif;
        }
        .product-subtitle-modern {
            font-size: 16px; /* INCREASED */
            color: #9ca3af;
            font-weight: bold;
            margin-top: 10px; 
            margin-bottom: 30px;
            letter-spacing: 0.5px;
        }
        .main-description-modern {
            font-size: 18px; /* INCREASED */
            line-height: 1.8; /* MORE BREATHING ROOM */
            color: #e5e7eb;
            margin-bottom: 40px;
            transition: opacity 0.25s;
        }
        .thumb-section-title-modern {
            font-size: 15px; /* INCREASED */
            font-weight: bold;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
            color: #9ca3af;
        }
        .thumbnail-row-modern {
            display: flex;
            gap: 15px;
        }
        .thumb-box-modern {
            width: 75px; /* INCREASED */
            height: 75px; /* INCREASED */
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid transparent;
            border-radius: 14px;
            cursor: pointer;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            transition: all 0.3s ease;
        }
        .thumb-box-modern:hover {
            transform: translateY(-3px);
            background-color: rgba(255, 255, 255, 0.15);
        }
        .thumb-box-modern.active {
            border-color: #2dd4bf;
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* Center Column */
        .center-column-modern {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .pouch-img-modern {
            max-width: 150%;
            z-index: 2;
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
        }
        .center-column-modern:hover .pouch-img-modern {
            transform: scale(1.05);
        }

        /* Right Column */
        .right-column-modern {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 20px;
        }
        .job-item-modern {
            margin-bottom: 25px; /* INCREASED */
            transition: opacity 0.25s;
        }
        .job-title-modern {
            font-size: 18px; /* INCREASED */
            font-weight: bold;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .job-title-modern::before {
            content: '✓';
            color: #2dd4bf;
            font-weight: bold;
            font-size: 20px;
        }
        .job-text-modern {
            font-size: 16px; /* INCREASED */
            color: #d1d5db;
            line-height: 1.6; 
            padding-left: 24px;
        }
        .replaces-box-modern {
            border: 2px dashed rgba(45, 212, 191, 0.4);
            background: rgba(45, 212, 191, 0.05);
            border-radius: 16px;
            padding: 22px;
            margin-top: 20px;
            transition: opacity 0.25s;
        }
        .replaces-title-modern {
            font-size: 15px; /* INCREASED */
            font-weight: bold;
            color: #2dd4bf;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .replaces-content-modern {
            font-size: 17px; /* INCREASED */
            font-weight: bold;
            color: white;
            line-height: 1.6;
        }

        /* Responsive Mobile/Tablet Adjustments */
        @media (max-width: 1199px) {
            .card-body-modern {
                padding: 50px 40px;
            }
        }
        @media (max-width: 991px) {
            .card-body-modern {
                grid-template-columns: 1fr;
                padding: 40px 30px;
                gap: 40px;
            }
            .center-column-modern {
                order: -1;
            }
            .right-column-modern {
                padding-left: 0;
            }
            .thumb-box-modern {
                width: 65px;
                height: 65px;
            }
            .left-column-modern h1 {
                font-size: 2.8rem;
            }
            .main-description-modern, .job-text-modern {
                font-size: 16px; 
            }
            .replaces-content-modern {
                font-size: 15px;
            }
            .pouch-img-modern {
                max-width: 80%; /* PREVENT HUGE IMAGES ON MOBILE */
            }
        }

        /* Product Image Wrapper */
        .product-showcase {
            padding: 4rem 0;
            border-bottom: 1px solid var(--ch-border);
        }
        .product-showcase:last-child {
            border-bottom: none;
        }
        
        .product-img-wrapper {
            position: relative;
            text-align: center;
            padding: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--ch-bg-light);
            border-radius: 2.5rem;
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            width: 100%;
            margin-bottom: 2rem;
        }
        @media (min-width: 992px) {
            .product-img-wrapper { margin-bottom: 0; }
        }
        
        .product-img-wrapper img {
            max-height: 500px;
            width: 100%;
            object-fit: contain;
            filter: drop-shadow(0 20px 35px rgba(0,0,0,0.12));
            transition: transform 0.5s ease;
        }

        .product-row:hover .product-img-wrapper {
            transform: translateY(-8px);
        }

        .product-row:hover .product-img-wrapper img {
            transform: scale(1.05) translateY(-10px);
        }

        @media (max-width: 991.98px) {
            .product-img-wrapper img { max-height: 350px; }
            .product-showcase { padding: 3rem 0; }
        }
        @media (max-width: 767.98px) {
            .product-img-wrapper img { max-height: 280px; }
            .product-img-wrapper { padding: 1.5rem; border-radius: 1.5rem; }
        }

        /* Conditions Responsive Custom Styling */
        .condition-card {
            background: #fff;
            border-radius: 1.5rem;
            border: 1px solid var(--ch-border);
            padding: 2.2rem;
            height: 100%;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.02);
            position: relative;
            overflow: hidden;
        }
        .condition-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
            border-color: rgba(20, 184, 166, 0.3);
        }
        .condition-icon-wrapper {
            width: 55px;
            height: 55px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        .condition-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem 1rem;
        }
        @media(max-width: 575px) {
            .condition-list { grid-template-columns: 1fr; }
        }
        .condition-list li {
            font-size: 0.95rem;
            color: var(--ch-slate-muted);
            display: flex;
            align-items: flex-start;
        }
        .condition-list li i {
            font-size: 1rem;
            margin-top: 1px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        /* ROI Cards (Value Proposition) */
        .roi-card-ola {
            background: #fff;
            border: 2px solid var(--ch-teal);
            border-radius: 1.5rem;
            padding: 2.5rem 1.5rem;
            box-shadow: 0 15px 40px rgba(20, 184, 166, 0.15);
            transition: transform 0.4s ease;
            height: 100%;
        }
        .roi-card-standard {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1.5rem;
            padding: 2.5rem 1.5rem;
            transition: transform 0.4s ease;
            height: 100%;
        }
        @media (min-width: 992px) {
            .roi-card-ola, .roi-card-standard {
                padding: 3.5rem 2.5rem;
            }
        }
        .roi-card-ola:hover, .roi-card-standard:hover {
            transform: translateY(-8px);
        }

        /* New Market Insights Cards */
        .insight-card {
            background: #fff;
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid var(--ch-border);
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            transition: transform 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .insight-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(20, 184, 166, 0.1);
        }
        .insight-badge {
            background: var(--ch-bg-light);
            border: 1px solid var(--ch-border);
            padding: 8px 16px;
            border-radius: 50px;
            font-weight: 700;
            color: var(--ch-dark-slate);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 1.25rem;
            font-size: 0.9rem;
        }
        
        /* New Objections Cards */
        .objection-card {
            background: #fff;
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid var(--ch-border);
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .skeptic-bubble {
            background: var(--ch-yellow-light);
            color: var(--ch-yellow-dk);
            padding: 1.25rem;
            border-radius: 1rem 1rem 1rem 0;
            margin-bottom: 1.5rem;
            font-weight: 500;
            font-size: 0.95rem;
            position: relative;
        }
        .skeptic-bubble::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            border-width: 10px 10px 0 0;
            border-style: solid;
            border-color: var(--ch-yellow-light) transparent transparent transparent;
        }
        .reality-bubble {
            background: var(--ch-bg-light);
            color: var(--ch-slate-muted);
            padding: 1.25rem;
            border-radius: 1rem 1rem 0 1rem;
            border: 1px solid var(--ch-border);
            font-size: 0.95rem;
            position: relative;
            flex-grow: 1;
        }

        /* FAQ Section Styling */
        .accordion-item {
            background: #fff;
            border: 1px solid var(--ch-border);
            border-radius: 15px !important;
            margin-bottom: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.02);
            transition: box-shadow 0.3s ease;
        }
        .accordion-item:hover {
            box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }
        .accordion-button {
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            color: var(--ch-dark-slate);
            padding: 1.25rem 1rem;
            font-size: 1.05rem;
        }
        @media (min-width: 992px) {
            .accordion-button { padding: 1.5rem; font-size: 1.1rem; }
            .accordion-body { padding: 1.5rem; }
        }
        .accordion-button:not(.collapsed) {
            background-color: rgba(20, 184, 166, 0.05);
            color: var(--ch-teal-darker);
            box-shadow: inset 0 -1px 0 rgba(0,0,0,0.05);
        }
        .accordion-body {
            color: var(--ch-slate-muted);
            line-height: 1.7;
            font-size: 1rem;
            padding: 1.25rem 1rem;
        }

        /* Job List */
        .job-list {
            list-style: none;
            padding: 0;
            margin-top: 1.5rem;
        }
        .job-list li {
            position: relative;
            padding-left: 2.8rem;
            margin-bottom: 1.2rem;
            font-size: 1rem;
            color: var(--ch-slate-muted);
            line-height: 1.6;
        }
        @media (min-width: 992px) {
            .job-list li { font-size: 1.05rem; }
        }
        .job-list li::before {
            content: '\f00c'; 
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            position: absolute;
            left: 0;
            top: 2px;
            color: var(--ch-teal);
            background: rgba(20, 184, 166, 0.1);
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
        }
        .job-title {
            font-weight: 800;
            color: var(--ch-dark-slate);
            display: block;
            margin-bottom: 0.2rem;
        }

        /* Reveal Animations */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* --- Navbar --- */
        #mainNav {
            transition: all 0.3s ease;
            padding: 15px 0;
            background: transparent;
        }

        #mainNav.scrolled {
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .text-logo span:first-child {
            font-size: clamp(35px, 6vw, 50px) !important;
        }

        .text-logo span:last-child {
            font-size: clamp(9px, 1.5vw, 11px) !important;
        }

        .nav-link {
            color: rgba(255, 255, 255, 0.85) !important;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-link:hover,
        .nav-item.active .nav-link {
            color: var(--ch-teal) !important;
        }

        .btn-nav-order {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            padding: 8px 20px !important;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .btn-nav-order:hover {
            background: var(--ch-teal);
            border-color: var(--ch-teal);
            color: #fff !important;
        }

        /* Owner Modal */
        .owner-link {
            color: var(--ch-teal);
            text-decoration: none;
            font-weight: 700;
            transition: color 0.3s ease;
        }
        .owner-link:hover {
            color: #fff;
            text-decoration: underline;
        }
        
        .owner-modal-content {
            border-radius: 1.5rem;
            border: none;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
        }
        
        .owner-img-col {
            background: linear-gradient(135deg, #0f172a 0%, #14b8a6 100%);
            position: relative;
            height: 280px; 
            display: flex;
            align-items: flex-end;
            justify-content: center;
            overflow: hidden;
        }
        
        @media (min-width: 992px) {
            .owner-img-col { 
                height: auto;
                min-height: 550px; 
            }
        }

        .glow-effect {
            position: absolute;
            width: 250px;
            height: 250px;
            background: rgba(255,255,255,0.15);
            filter: blur(60px);
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }

        #ownerModalImg {
            width: 85%;
            max-height: 95%;
            object-fit: contain;
            object-position: bottom;
            position: absolute;
            bottom: 0;
            z-index: 2;
            filter: drop-shadow(0 -10px 25px rgba(0,0,0,0.3));
            transition: transform 0.4s ease;
        }

        #ownerModalImg:hover {
            transform: scale(1.03);
        }
        
        .owner-text-col {
            background: #ffffff;
            padding: 2rem 1.5rem; 
        }
        
        @media (min-width: 992px) {
            .owner-text-col { 
                padding: 4rem 3.5rem; 
            }
        }
        
        #ownerModalName {
            color: var(--ch-dark-slate);
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.5rem, 10vw, 4rem);
            line-height: 1;
            margin-bottom: 0.3rem;
            word-wrap: break-word; 
        }
        
        #ownerModalTitle {
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            color: var(--ch-teal);
            letter-spacing: 1.5px;
            font-size: clamp(0.8rem, 3.5vw, 1rem);
            margin-bottom: 1.5rem;
            line-height: 1.4;
        }

        .owner-bio-box {
            position: relative;
            background: var(--ch-bg-light);
            padding: 1.5rem 1.25rem 1.5rem 2.5rem;
            border-radius: 1rem;
            border-left: 4px solid var(--ch-teal);
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
        }

        .owner-bio-box .fa-quote-left {
            position: absolute;
            top: -15px;
            left: 20px;
            font-size: 2rem;
            color: var(--ch-teal);
            opacity: 0.2;
            background: #fff;
            padding: 0 10px;
            border-radius: 50%;
        }
        
        #ownerModalBio {
            font-size: 1rem;
            line-height: 1.7;
            color: var(--ch-dark-slate);
            margin: 0;
        }
        
        .owner-linkedin {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 25px;
            padding: 14px 24px;
            background-color: #0077b5; 
            color: #fff !important;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            font-family: 'Barlow', sans-serif;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 119, 181, 0.25);
            width: 100%;
        }

        @media (min-width: 576px) {
            .owner-linkedin {
                width: auto;
            }
        }
        
        .owner-linkedin:hover {
            background-color: #005885;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 119, 181, 0.35);
        }

        .btn-close-custom {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 1050;
            background-color: #ffffff;
            border-radius: 50%;
            padding: 0.75rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            opacity: 0.9;
            transition: all 0.3s ease;
        }

        .btn-close-custom:hover {
            opacity: 1;
            transform: rotate(90deg);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
    </style>
</head>

<body>
    
    <?php include 'header.php'; ?>

    <section id="hero" style="position: relative; overflow: hidden; padding-top: 160px; padding-bottom: 100px;">
        <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(./assets/image/barley.png) center center / cover no-repeat; z-index: 0;">
            <div class="hero-grid-lines"></div>
        </div>

        <div class="container-fluid px-3 px-lg-5 hero-content reveal visible" style="position: relative; z-index: 1;">
            <div class="row justify-content-center">
                <div class="col-12 col-md-11 col-xl-10 text-center">
                    <div class="hero-eyebrow justify-content-center mx-auto mb-3">
                        <span class="dot"></span>PURE. ORGANIC. POWERFUL.
                    </div>

                    <p class="ola-script mt-2">/well-ness/</p>
                    <h1 class="ola-hero-title">INFINITE WELLNESS</h1>

                    <p class="hero-desc mx-auto text-white mt-4 px-2" style="max-width:800px; opacity: 0.9; line-height: 1.8; font-size: 1.15rem;">
                        Nature’s most potent ingredients engineered for modern health. Discover the synergy of 100% Organic Australian Barley, Metabolic Robustus Coffee, and Cellular-repairing White Plus Glutathione.
                    </p>
                    
                    <a href="#collection" class="btn btn-outline-light mt-4 fw-bold px-4 py-3" style="border-radius: 50px; border-width: 2px; letter-spacing: 1px;">
                        Explore The Collection <i class="bi bi-arrow-down ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container reveal">
            <div class="row justify-content-center text-center px-3">
                <div class="col-12 col-lg-10">
                    <span class="section-tag">Total System Care</span>
                    <h2 class="section-title mb-4">The Infinite <span style="color: var(--ch-teal);">Standard</span></h2>
                    <p class="fs-5 text-muted" style="line-height: 1.8;">
                        We believe true wellness isn't achieved by masking symptoms, but by repairing the body at a cellular level. Every product in the Infinite line is formulated with a <strong>Multi-Action Synergy</strong>. By addressing detox, energy, and cellular repair simultaneously, our simple 3-product system replaces your entire supplement cabinet—giving you less clutter and 100% more potency.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="collection" class="section-pad" style="background: #f8fafc;">
        <!-- CHANGED FROM container TO container-fluid px-3 px-xl-5 TO EXPAND HORIZONTALLY -->
        <div class="container-fluid px-3 px-xl-5">
            <div class="text-center mb-5">
                <span class="section-tag" style="color: #5eead4;">Product Catalogue</span>
                <h2 class="section-title text-var(--ch-dark-slate)">Discover Our Formulations</h2>
            </div>

            <div class="product-card-modern" id="main-container">
                <div class="card-body-modern">
                    
                    <div class="left-column-modern">
                        <div class="badge-modern" id="badge-label"><?php echo $variations[0]['sub_label']; ?></div>
                        <h1 id="main-title"><?php echo $variations[0]['product_title']; ?></h1>
                        <div class="product-subtitle-modern" id="main-subtitle"><?php echo $variations[0]['sub_title']; ?></div>
                        
                        <p class="main-description-modern" id="main-desc">
                            <?php echo $variations[0]['description']; ?>
                        </p>

                        <div class="thumb-section-title-modern">SELECT PRODUCT</div>
                        <div class="thumbnail-row-modern">
                            <?php foreach($variations as $index => $variant): ?>
                                <div 
                                    class="thumb-box-modern <?php echo $index === 0 ? 'active' : ''; ?>" 
                                    id="thumb-<?php echo $index; ?>"
                                    style="background-image: url('<?php echo $variant['main_image']; ?>');"
                                    onclick="goToProduct(<?php echo $index; ?>); event.stopPropagation();">
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div class="center-column-modern" onclick="cycleProduct()">
                        <img id="product-pouch" class="pouch-img-modern" src="<?php echo $variations[0]['main_image']; ?>" alt="Product Pouch">
                    </div>

                    <div class="right-column-modern">
                        <div id="jobs-wrapper-modern">
                            <?php foreach($variations[0]['jobs'] as $job): ?>
                                <div class="job-item-modern">
                                    <div class="job-title-modern"><?php echo $job['title']; ?></div>
                                    <div class="job-text-modern"><?php echo $job['text']; ?></div>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <div class="replaces-box-modern">
                            <div class="replaces-title-modern">⚡ REPLACES 3 HARMFUL HABITS</div>
                            <div class="replaces-content-modern" id="replaces-text-modern">
                                <?php echo $variations[0]['replaces']; ?>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <section id="ingredients" class="section-pad" style="background-color: var(--ch-bg-light);">
        <div class="container reveal">
            <div class="text-center mb-5 pb-3 px-3">
                <span class="section-tag">Hero Ingredients</span>
                <h2 class="section-title mb-3">Powered By <span style="color: var(--ch-teal);">Science</span></h2>
                <p class="fs-5 text-muted">The clinical bio-actives driving the Infinite Wellness standard.</p>
            </div>
            <div class="row g-4 justify-content-center px-3">
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-leaf mb-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">S.O.D. <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Superoxide Dismutase)</span></h4>
                        <p class="fs-6 text-muted mb-0">Found heavily in young Barley leaves, this powerful enzyme is the body’s first line of defense against the most dangerous free radicals, vastly outperforming basic vitamins.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-mug-hot mb-4" style="font-size: 3rem; color: var(--ch-yellow-dk);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">Robusta <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Chlorogenic Acid)</span></h4>
                        <p class="fs-6 text-muted mb-0">Contains almost double the antioxidants and caffeine of Arabica. Its high Chlorogenic Acid content actively slows carbohydrate absorption and burns fat.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-capsules mb-4" style="font-size: 3rem; color: #db2777;"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">NAC <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(N-Acetyl Cysteine)</span></h4>
                        <p class="fs-6 text-muted mb-0">Oral glutathione is poorly absorbed. NAC acts as the crucial building block that easily enters cells, instructing your liver to synthesize its own master antioxidants.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-network-wired mb-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">ALA <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Alpha Lipoic Acid)</span></h4>
                        <p class="fs-6 text-muted mb-0">A unique antioxidant that is both fat and water-soluble, allowing it to enter all parts of the cell to protect DNA and effectively recycle used Vitamin C and Glutathione.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="conditions" class="section-pad" style="background: var(--ch-white);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Healing Potential</span>
                <h2 class="section-title mb-3">Conditions Responsive to <span style="color: var(--ch-teal);">Barley</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    Powered by <strong>68 micronutrients</strong> found in pure organic barley, supporting the body's natural ability to heal and restore balance.
                </p>
            </div>
            
            <div class="row g-4 px-3">
                <?php foreach($barley_categories as $category): ?>
                <div class="col-12 col-lg-6">
                    <div class="condition-card">
                        <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                            <div class="condition-icon-wrapper me-3 shadow-sm" style="color: <?php echo $category['color']; ?>; background: <?php echo $category['bg']; ?>;">
                                <i class="bi <?php echo $category['icon']; ?>"></i>
                            </div>
                            <h4 class="fw-bold mb-0" style="color: var(--ch-dark-slate); font-family: 'Barlow', sans-serif; letter-spacing: 0.5px; font-size: 1.3rem;">
                                <?php echo $category['title']; ?>
                            </h4>
                        </div>
                        <ul class="condition-list">
                            <?php foreach($category['items'] as $item): ?>
                            <li>
                                <i class="bi bi-check-circle-fill me-2" style="color: <?php echo $category['color']; ?>;"></i>
                                <span class="fw-medium"><?php echo strtoupper($item); ?></span>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="row justify-content-center px-3 mt-5 pt-3">
                <div class="col-12">
                    <div class="bg-white rounded-4 p-4 p-md-5 shadow-sm border border-light d-flex flex-wrap justify-content-around align-items-center gap-4 text-center" style="background-image: linear-gradient(to right, rgba(20, 184, 166, 0.02), rgba(20, 184, 166, 0.05));">
                        
                        <div class="px-2">
                            <i class="bi bi-shield-check fs-2 mb-2" style="color: var(--ch-teal); filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2));"></i>
                            <div class="small fw-bolder mt-1" style="color: var(--ch-dark-slate); font-family: 'Barlow', sans-serif; letter-spacing: 1px;">100% ORGANIC</div>
                        </div>
                        
                        <div class="px-2">
                            <i class="bi bi-patch-check fs-2 mb-2" style="color: var(--ch-teal); filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2));"></i>
                            <div class="small fw-bolder mt-1" style="color: var(--ch-dark-slate); font-family: 'Barlow', sans-serif; letter-spacing: 1px;">HALAL CERTIFIED</div>
                        </div>
                        
                        <div class="px-2">
                            <i class="bi bi-lightning-charge fs-2 mb-2" style="color: var(--ch-teal); filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2));"></i>
                            <div class="small fw-bolder mt-1" style="color: var(--ch-dark-slate); font-family: 'Barlow', sans-serif; letter-spacing: 1px;">NATURAL DETOXIFIER</div>
                        </div>
                        
                        <div class="px-2">
                            <i class="bi bi-heart-pulse fs-2 mb-2" style="color: var(--ch-teal); filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2));"></i>
                            <div class="small fw-bolder mt-1" style="color: var(--ch-dark-slate); font-family: 'Barlow', sans-serif; letter-spacing: 1px;">SUPPORTS IMMUNITY</div>
                        </div>
                        
                        <div class="px-2">
                            <i class="bi bi-droplet fs-2 mb-2" style="color: var(--ch-teal); filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.2));"></i>
                            <div class="small fw-bolder mt-1" style="color: var(--ch-dark-slate); font-family: 'Barlow', sans-serif; letter-spacing: 1px;">RICH IN NUTRIENTS</div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>

    <section id="insights" class="section-pad" style="background: var(--ch-white);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Wellness Education</span>
                <h2 class="section-title mb-3">Understanding Your <span style="color: var(--ch-teal);">Body</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    We arm our community with the biological facts that make our formulations naturally authoritative.
                </p>
            </div>
            <div class="row g-4 px-3">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Sugar Spike Trap</div>
                        <p class="text-muted mb-3"><strong>The Problem:</strong> Most instant coffees use white sugar or artificial creamers, spiking insulin, storing fat, and causing severe afternoon energy crashes.</p>
                        <p class="text-muted mb-0"><strong>The Solution:</strong> Robustus uses Stevia. It provides zero glycemic impact. You retain steady physical energy and keep your body in a fat-burning state all day.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Acidic Coffee Dilemma</div>
                        <p class="text-muted mb-3"><strong>The Problem:</strong> Coffee drinkers often suffer from acid reflux, bloating, or stomach pain due to the high acidity of poorly processed beans.</p>
                        <p class="text-muted mb-0"><strong>The Solution:</strong> The pure organic barley in Robustus acts as an alkaline buffer. It neutralizes the stomach environment, giving you the focus of coffee with the comfort of tea.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Whitening Myth</div>
                        <p class="text-muted mb-3"><strong>The Problem:</strong> The market treats Glutathione strictly as a cosmetic whitening pill, ignoring its primary biological function.</p>
                        <p class="text-muted mb-0"><strong>The Solution:</strong> White Plus respects Glutathione as a liver defender. Skin brightening is merely a side-effect of a deeply cleansed liver and reduced internal oxidative stress.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Consumer Education</span>
                <h2 class="section-title mb-3">Top 3 Health <span style="color: var(--ch-teal);">Misconceptions</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    Data-backed answers to the most common questions regarding supplementation.
                </p>
            </div>
            <div class="row g-4 px-3 mb-5">
                <div class="col-12 col-lg-4">
                    <div class="objection-card">
                        <h5 class="fw-bold mb-4 text-center">"I eat vegetables, I don't need Barley."</h5>
                        <div class="skeptic-bubble">
                            <strong>The Assumption:</strong><br>
                            "My normal diet provides enough greens and fiber for my body to detox naturally."
                        </div>
                        <div class="reality-bubble">
                            <strong class="text-dark">The Infinite Reality:</strong><br>
                            <span class="text-dark fw-bold d-block mt-2 mb-1">Soil Depletion:</span>
                            Modern agriculture has severely depleted soil minerals. Infinite Barley is grown in pristine Australian soil and harvested specifically at the "young leaf" stage—when trace minerals, chlorophyll, and amino acids are at their absolute peak concentration, far exceeding standard grocery vegetables.
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="objection-card">
                        <h5 class="fw-bold mb-4 text-center">"Coffee makes me palpitate."</h5>
                        <div class="skeptic-bubble">
                            <strong>The Assumption:</strong><br>
                            "I avoid strong coffee because it gives me jitters, anxiety, and an upset stomach."
                        </div>
                        <div class="reality-bubble">
                            <strong class="text-dark">The Infinite Reality:</strong><br>
                            <span class="text-dark fw-bold d-block mt-2 mb-1">The Clean Energy Matrix:</span>
                            Palpitations are often caused by sugar spikes combined with synthetic caffeine. Robustus uses natural Robusta caffeine balanced with Stevia (no sugar spike) and alkaline Barley (soothes the stomach). This creates a steady, focused "clean energy" release without the harsh physiological crash.
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="objection-card">
                        <h5 class="fw-bold mb-4 text-center">"Glutathione pills don't work for me."</h5>
                        <div class="skeptic-bubble">
                            <strong>The Assumption:</strong><br>
                            "I've tried standard glutathione capsules before and didn't see any improvement in my skin or energy."
                        </div>
                        <div class="reality-bubble">
                            <strong class="text-dark">The Infinite Reality:</strong><br>
                            <span class="text-dark fw-bold d-block mt-2 mb-1">The Bio-Availability Problem:</span>
                            Plain oral glutathione gets destroyed by stomach acid. White Plus solves this by including NAC (N-Acetyl Cysteine), which survives digestion and travels to the liver, providing the exact raw materials your body needs to manufacture its own highly-absorbable Glutathione internally.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="regimen" class="section-pad" style="background: var(--ch-white);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Application Guide</span>
                <h2 class="section-title mb-3">The Daily <span style="color: var(--ch-teal);">Regimen</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    Maximize your results with our targeted morning and evening protocols.
                </p>
            </div>

            <div class="row g-4 px-3 mb-5">
                <div class="col-12 col-lg-6">
                    <div class="bg-white rounded-4 p-4 p-lg-5 border shadow-sm h-100">
                        <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                            <i class="bi bi-sun-fill fs-1 me-3" style="color: var(--ch-yellow);"></i>
                            <div>
                                <h4 class="fw-bold mb-1" style="color: var(--ch-dark-slate);">Morning: The Activation Phase</h4>
                                <p class="text-muted mb-0 small fw-bold text-uppercase" style="letter-spacing: 0.5px;">Goal: Detoxification, Metabolism, and Focus</p>
                            </div>
                        </div>
                        <ul class="job-list">
                            <li><span class="job-title">Wake Up with Infinite Barley:</span> Mix 1 scoop (or sachet) in 150ml of cold or room-temperature water. Drink on an <strong>empty stomach</strong>. The chlorophyll instantly begins flushing out toxins accumulated overnight, while the alkaline nature balances your gut pH.</li>
                            <li><span class="job-title">Fuel Up with Robustus:</span> Replace your morning cafe drink with 1 sachet of Robustus Black Coffee mixed in hot water. The Robusta caffeine sharpens your mind for work, while the Stevia keeps your body in a low-insulin, fat-burning state until lunch.</li>
                        </ul>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="rounded-4 p-4 p-lg-5 border shadow-sm h-100 text-white" style="background-color: var(--ch-dark-slate); border-color: #334155 !important;">
                        <div class="d-flex align-items-center mb-4 pb-3 border-bottom" style="border-color: #334155 !important;">
                            <i class="bi bi-moon-stars-fill fs-1 me-3" style="color: #cbd5e1;"></i>
                            <div>
                                <h4 class="fw-bold mb-1 text-white">Evening: The Recovery Phase</h4>
                                <p class="text-white-50 mb-0 small fw-bold text-uppercase" style="letter-spacing: 0.5px;">Goal: Liver Repair, Deep Sleep, and Cellular Anti-Aging</p>
                            </div>
                        </div>
                        <ul class="job-list">
                            <li style="color: #cbd5e1;"><span class="job-title text-white">Repair with White Plus:</span> Take 1-2 capsules of White Plus Glutathione 30 minutes before bed. During the night, your liver does its heaviest detox work. The NAC and ALA provide the biological tools to repair cellular damage from daily pollution.</li>
                            <li style="color: #cbd5e1;"><span class="job-title text-white">Sleep Optimization:</span> By reducing neuro-inflammation, the formulation actively calms the brain, promoting faster sleep onset and allowing you to wake up feeling refreshed and looking radiant.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad position-relative" style="background: linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%); overflow: hidden;">
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background-image: radial-gradient(circle at 20% 150%, rgba(20, 184, 166, 0.15) 0%, transparent 50%); z-index: 0; pointer-events: none;"></div>
        <div class="position-absolute top-0 end-0 w-100 h-100" style="background-image: radial-gradient(circle at 80% -50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%); z-index: 0; pointer-events: none;"></div>
        
        <div class="container reveal position-relative" style="z-index: 1;">
            <div class="row justify-content-center text-center px-3">
                <div class="col-12 col-lg-8 col-xl-7">
                    <span class="section-tag mb-3" style="color: var(--ch-yellow); letter-spacing: 3px;">Global Business Opportunity</span>
                    
                    <h2 class="section-title1 mb-4" style="color: var(--ch-white); font-size: clamp(2.8rem, 6vw, 4.5rem); text-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        Ready to Build Your <br><span style="color: var(--ch-teal);">Wellness Empire?</span>
                    </h2>
                    
                    <p class="fs-5 mb-5 text-white-50 mx-auto" style="line-height: 1.8;">
                        Join a network of visionary leaders and redefine the standard of health in your market. Step into the future of biological nutrition and build a limitless business.
                    </p>
                    
                    <a href="select-country.php" class="btn btn-lg shadow-lg" 
                       style="background: var(--ch-teal); color: var(--ch-white); border-radius: 50px; font-family: 'Barlow', sans-serif; font-weight: 700; padding: 1.1rem 2.5rem; font-size: clamp(1rem, 2vw, 1.15rem); letter-spacing: 1px; transition: all 0.3s ease; border: 2px solid transparent;"
                       onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 35px rgba(20, 184, 166, 0.3)'; this.style.background='var(--ch-teal-darker)';"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1rem 3rem rgba(0,0,0,.175)'; this.style.background='var(--ch-teal)';">
                        See How To Join <i class="bi bi-arrow-right-circle ms-2 fs-5 align-middle"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-white);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Help Center</span>
                <h2 class="section-title">Frequently Asked <span style="color: var(--ch-teal);">Questions</span></h2>
                <p class="fs-5 text-muted mt-2">Everything you need to know about the Infinite Wellness standard.</p>
            </div>
            <div class="row justify-content-center px-3">
                <div class="col-12 col-lg-9">
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                                    Can I drink Infinite Barley with hot water?
                                </button>
                            </h2>
                            <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    No, it is highly recommended to mix Infinite Barley with cold or room-temperature water. Hot water can destroy the delicate, live enzymes (like S.O.D.) and diminish the product's nutritional potency.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                                    Are these products safe for pregnant or nursing women?
                                </button>
                            </h2>
                            <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    While Infinite Barley is 100% organic and generally safe as a whole food, we always advise pregnant or nursing women to consult their healthcare provider before adding any new supplement (including Robustus and White Plus) to their routine.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                                    Is Robustus coffee safe for people with acid reflux (GERD)?
                                </button>
                            </h2>
                            <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Yes, many users with sensitive stomachs tolerate Robustus very well. The infusion of pure organic barley acts as a natural alkaline buffer, significantly reducing the acidity usually associated with black coffee.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
                                    How soon will I see results from White Plus Glutathione?
                                </button>
                            </h2>
                            <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Many users notice improved sleep quality and higher energy levels within the first week due to the liver detoxifying effects of NAC. Visible skin brightening and evening of tone typically require 4 to 8 weeks of consistent daily use, as skin cells take time to turn over.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer id="contact" style="background: var(--ch-dark-slate); padding-top: 5rem;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center g-5 align-items-center">
                <div class="col-12 col-lg-5 col-xl-4 reveal text-center text-lg-start">
                    <div class="footer-brand mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 50px); color: #fff; letter-spacing: 2px;">INFINITE<span style="color: var(--ch-teal);">.</span></div>
                    <p class="mb-4" style="color: var(--ch-slate-muted); font-size: 1.1rem;">Empowering Global Entrepreneurs Through Premium Skincare & Wellness</p>
                    <div class="d-flex justify-content-center justify-content-lg-start gap-3 mb-5">
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-tiktok"></i></a>
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>

                <div class="col-12 col-lg-6 col-xl-5 offset-xl-1">
                    <div class="bg-white rounded-4 p-4 p-md-5 shadow">
                        <h3 class="fw-bold mb-2" style="color:var(--ch-dark-slate);">Send Us a Message</h3>
                        <p class="text-muted mb-4 small">Secure your official Infinite Wellness products.</p>

                        <div id="formAlertMessage" class="alert d-none align-items-center rounded-3 shadow-sm mb-4" role="alert"></div>

                        <form id="contactForm" class="needs-validation" novalidate>
                            <div class="form-floating mb-3">
                                <input type="text" name="name" id="nameInput" class="form-control bg-light border-0 shadow-none" placeholder="Your Name" required />
                                <label for="nameInput" class="text-muted">Your Name</label>
                                <div class="invalid-feedback">Please provide your name.</div>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" name="email" id="emailInput" class="form-control bg-light border-0 shadow-none" placeholder="Email Address" required />
                                <label for="emailInput" class="text-muted">Email Address</label>
                                <div class="invalid-feedback">Please provide a valid email address.</div>
                            </div>
                            <div class="form-floating mb-3">
                                <select name="subject" id="subjectInput" class="form-select bg-light border-0 shadow-none" required>
                                    <option value="" selected disabled>Select Subject</option>
                                    <option value="Order Barley">Order Infinite Barley</option>
                                    <option value="Order Coffee">Order Robustus Coffee</option>
                                    <option value="Order Gluta">Order White Plus</option>
                                    <option value="Join Us">Join Us (Distributor)</option>
                                </select>
                                <label for="subjectInput" class="text-muted">Subject</label>
                                <div class="invalid-feedback">Please select a subject.</div>
                            </div>
                            <div class="form-floating mb-4">
                                <textarea name="message" id="messageInput" class="form-control bg-light border-0 shadow-none" placeholder="Your message..." style="height: 130px" required></textarea>
                                <label for="messageInput" class="text-muted">Delivery Details / Message</label>
                                <div class="invalid-feedback">Please write your message.</div>
                            </div>
                            <button type="submit" id="contactSubmitBtn" class="btn w-100 fw-bold py-3 text-white rounded-3 shadow-sm" style="background-color: var(--ch-teal); transition: all 0.3s ease;">
                                <i class="bi bi-send me-2"></i> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <hr class="mt-5" style="border-color: rgba(255,255,255,0.1);" />
            <div class="row align-items-center pb-4 text-center text-md-start" style="color: var(--ch-slate-muted); font-size: 0.85rem;">
                <div class="col-md-6 mb-2 mb-md-0">&copy; <?= date('Y') ?> Infinite Wellness. All rights reserved.</div>
                
                <div class="col-md-6 text-md-end">
                    Properties of 
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="primo">Primo Ecalne Jr.</a> | 
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="aera">Aera Claridad</a>
                </div>
                
            </div>
        </div>
    </footer>

    <div class="modal fade" id="ownerModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content owner-modal-content">
                <button type="button" class="btn-close btn-close-custom" data-bs-dismiss="modal" aria-label="Close"></button>
                
                <div class="row g-0 align-items-stretch">
                    <div class="col-lg-5 owner-img-col">
                        <div class="glow-effect"></div>
                        <img src="" id="ownerModalImg" alt="Owner">
                    </div>
                    
                    <div class="col-lg-7 owner-text-col d-flex flex-column justify-content-center">
                        <h3 id="ownerModalName">Name Here</h3>
                        <h6 id="ownerModalTitle">INFINITE AMBASSADOR / DIAMOND EXECUTIVE</h6>
                        <div class="owner-bio-box">
                            <i class="fa-solid fa-quote-left"></i>
                            <div id="ownerModalBio"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button id="backToTop" class="btn border-0 shadow" aria-label="Back to top" style="position: fixed; bottom: 28px; right: 28px; width: 44px; height: 44px; border-radius: 50%; background: var(--ch-teal); color: #fff; display: flex; align-items: center; justify-content: center; z-index: 500; opacity: 0; transform: translateY(20px); transition: all 0.3s;">
        <i class="bi bi-arrow-up"></i>
    </button>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Navbar Scroll Effect
            const navbar = document.getElementById('mainNav');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Back to Top Button
            const backToTopBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                if(window.scrollY > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.transform = 'translateY(0)';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.transform = 'translateY(20px)';
                }
            });
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Scroll Reveal Animation
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                const elementVisible = 120;
                reveals.forEach((reveal) => {
                    const elementTop = reveal.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('visible');
                    }
                });
            };
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll(); 
            
            // Close mobile menu on click
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            const navbarCollapse = document.getElementById('navMenu');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                });
            });

            // OWNER MODAL POPULATION LOGIC
            const ownerData = {
                'primo': {
                    name: 'PRIMO ECALNE JR.',
                    img: './assets/image/team/Sir_Primo.png',
                    bio: 'I’m Primo, a passionate entrepreneur driven by growth, purpose, and the desire to create meaningful opportunities through INFINITE. I believe success is built through consistency, vision, and the courage to dream beyond limits while continuously becoming a better version of yourself.<br><br>I am passionate about building a strong and positive community where people can grow together, support one another, and create opportunities that lead to long-term personal and financial growth.<br><br><a href="https://www.linkedin.com/in/primo-ecalne-3a87221a2" target="_blank" class="owner-linkedin"><i class="bi bi-linkedin"></i> Connect with me on LinkedIn</a>'
                },
                'aera': {
                    name: 'AERA CLARIDAD',
                    img: './assets/image/team/ma_am(2.png',
                    bio: 'My name is Aera Claridad, and I am passionate about helping people create a better future for themselves through INFINITE. I started this journey with a simple goal: to grow not only financially, but also personally while inspiring others to do the same.<br><br>I believe that everyone deserves the opportunity to achieve time and financial freedom. Through dedication, consistency, and the right environment, I want to help people unlock their potential and build a life they truly want for themselves and their families.<br><br>For me, success is not just about income. It is about creating impact, building genuine connections, and growing together with the people around me.<br><br><a href="https://www.linkedin.com/in/aera-claridad-68ba94179" target="_blank" class="owner-linkedin"><i class="bi bi-linkedin"></i> Connect with me on LinkedIn</a>'
                }
            };

            const ownerModal = document.getElementById('ownerModal');
            if(ownerModal) {
                ownerModal.addEventListener('show.bs.modal', function(event) {
                    const button = event.relatedTarget;
                    const ownerKey = button.getAttribute('data-owner');
                    const data = ownerData[ownerKey];

                    document.getElementById('ownerModalName').textContent = data.name;
                    document.getElementById('ownerModalImg').src = data.img;
                    document.getElementById('ownerModalBio').innerHTML = data.bio; 
                });
            }
        });
        
        // =============================================================
        // NEW PRODUCT CARD JAVASCRIPT (from the replacement code)
        // =============================================================
        const variations = <?php echo json_encode($variations); ?>;
        let currentIndex = 0;

        function cycleProduct() {
            let nextIndex = (currentIndex + 1) % variations.length;
            goToProduct(nextIndex);
        }

        function goToProduct(index) {
            currentIndex = index;
            const currentItem = variations[currentIndex];
            
            const container = document.getElementById('main-container');
            const pouchImg = document.getElementById('product-pouch');
            const description = document.getElementById('main-desc');
            const jobsWrapper = document.getElementById('jobs-wrapper-modern');
            const replacesText = document.getElementById('replaces-text-modern');

            container.style.backgroundColor = currentItem.bg_color;
            pouchImg.style.transform = 'scale(0.9)';
            pouchImg.style.opacity = '0';
            description.style.opacity = '0';
            jobsWrapper.style.opacity = '0';
            replacesText.style.opacity = '0';

            setTimeout(() => {
                pouchImg.src = currentItem.main_image;
                document.getElementById('badge-label').innerText = currentItem.sub_label;
                document.getElementById('main-title').innerText = currentItem.product_title;
                document.getElementById('main-subtitle').innerText = currentItem.sub_title;
                description.innerText = currentItem.description;
                replacesText.innerText = currentItem.replaces;

                let jobsHTML = '';
                currentItem.jobs.forEach(job => {
                    jobsHTML += `
                        <div class="job-item-modern">
                            <div class="job-title-modern">${job.title}</div>
                            <div class="job-text-modern">${job.text}</div>
                        </div>
                    `;
                });
                jobsWrapper.innerHTML = jobsHTML;

                document.querySelectorAll('.thumb-box-modern').forEach(box => box.classList.remove('active'));
                document.getElementById(`thumb-${currentIndex}`).classList.add('active');

                pouchImg.style.transform = 'scale(1)';
                pouchImg.style.opacity = '1';
                description.style.opacity = '1';
                jobsWrapper.style.opacity = '1';
                replacesText.style.opacity = '1';
            }, 250);
        }

        // Contact form submission (unchanged)
        document.addEventListener("DOMContentLoaded", function() {
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault(); 

                    if (!contactForm.checkValidity()) {
                        e.stopPropagation();
                        contactForm.classList.add('was-validated');
                        return;
                    }

                    const submitBtn = document.getElementById('contactSubmitBtn');
                    const originalText = submitBtn.innerHTML;

                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

                    alertBox.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    alertBox.innerHTML = '';

                    const formData = new FormData(this);

                    fetch('backend/submit_inquiry.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            alertBox.classList.remove('d-none');
                            
                            if (data.status === 'success') {
                                alertBox.classList.add('alert-success', 'd-flex');
                                alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                                
                                contactForm.reset(); 
                                contactForm.classList.remove('was-validated');
                            } else {
                                alertBox.classList.add('alert-danger', 'd-flex');
                                alertBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Failed to Send</strong><br>' + (data.message || 'Please fill out all required fields.') + '</div>';
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alertBox.classList.remove('d-none');
                            alertBox.classList.add('alert-danger', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-wifi-off fs-4 me-3 text-danger"></i> <div><strong>Network Error</strong><br>Could not connect to the server. Please try again later.</div>';
                        })
                        .finally(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }
        });
    </script>
</body>
</html>