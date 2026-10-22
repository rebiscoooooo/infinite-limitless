<?php
session_start();
require_once 'public_auth_guard.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no" />
    <title>O'LAMOUR | Infinite Live Limitless</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="./assets/css/styles.css" />
    
    <style>
        
        /* CSS Variables */
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
        .advantage-bar {
            background: var(--ch-bg-light);
            border: 1px solid var(--ch-border);
            border-radius: 1rem;
            padding: 1.5rem;
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

        /* Elegant Replaces Box */
        .replaces-box {
            background: var(--ch-bg-light);
            border: 1px dashed var(--ch-teal);
            border-radius: 1.25rem;
            padding: 1.5rem;
            margin-top: 2rem;
        }

        .price-tag {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(1.8rem, 6vw, 2.8rem);
            color: var(--ch-dark-slate);
            margin-top: 1.5rem;
            display: flex;
            align-items: baseline;
            flex-wrap: wrap; 
            gap: 10px;
        }
        .price-tag span {
            color: var(--ch-teal);
            font-family: 'Barlow', sans-serif;
            font-size: clamp(1rem, 3.5vw, 1.2rem);
            font-weight: 700;
        }

        .fda-tag {
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            font-size: 0.85rem;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            padding: 6px 14px;
            border-radius: 6px;
            color: var(--ch-teal-darker);
            display: inline-flex;
            align-items: center;
            margin-bottom: 1rem;
            letter-spacing: 1px;
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
            transition: all var(--transition-speed) ease;
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
            transition: color var(--transition-speed) ease;
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

        /* --- Value Comparison Chart Custom Styles --- */
        
        /* CSS Grid for the 4 Cards to match height perfectly */
        .val-comp-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            height: 100%;
        }
        @media (min-width: 768px) {
            .val-comp-grid {
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, 1fr);
            }
        }

        .val-comp-card {
            background: #fff;
            border-radius: 1.25rem;
            padding: 1.5rem;
            border: 1px solid var(--ch-border);
            box-shadow: 0 4px 15px rgba(0,0,0,0.02);
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease; 
        }
        
        /* HOVER EFFECT for the 4 cards */
        .val-comp-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(20, 184, 166, 0.15);
            border-color: rgba(20, 184, 166, 0.4);
        }

        .val-comp-row {
            display: flex;
            align-items: center;
            flex-grow: 1;
            position: relative;
        }
        .val-comp-img-col {
            flex: 1;
            text-align: center;
            padding-right: 1.5rem;
            border-right: 1px dashed var(--ch-border);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        /* VS pseudo-element for desktop */
        .val-comp-img-col::after {
            content: 'VS';
            position: absolute;
            right: -12px;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            padding: 5px 4px;
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--ch-slate-muted);
            font-family: 'Barlow', sans-serif;
            z-index: 2;
        }
        .val-comp-text-col {
            flex: 1.2;
            padding-left: 1.5rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        @media (max-width: 575.98px) {
            .val-comp-row {
                flex-direction: column;
            }
            .val-comp-img-col {
                border-right: none;
                border-bottom: 1px dashed var(--ch-border);
                padding-right: 0;
                padding-bottom: 1.5rem;
                margin-bottom: 1.5rem;
                width: 100%;
            }
            /* Adjust VS pseudo-element for mobile */
            .val-comp-img-col::after {
                right: 50%;
                top: auto;
                bottom: -15px;
                transform: translateX(50%);
            }
            .val-comp-text-col {
                padding-left: 0;
                width: 100%;
            }
        }
        
        /* FULLY RESPONSIVE PRICE STYLING IN CARDS */
        .val-comp-pill {
            background: var(--ch-dark-slate);
            color: #fff;
            font-size: clamp(0.75rem, 2.5vw, 0.9rem); 
            font-weight: 600;
            padding: 0.4rem clamp(1rem, 3vw, 1.5rem);
            border-radius: 50px;
            margin-top: 1rem;
            display: inline-block;
            white-space: nowrap; 
        }
        .val-comp-steps-title {
            font-size: 0.95rem; 
            color: var(--ch-slate-muted);
            margin-bottom: 0.75rem;
            font-weight: 600;
        }
        .val-comp-step {
            font-size: 1.05rem; 
            color: var(--ch-dark-slate);
            font-weight: 700;
            margin-bottom: 0.2rem;
        }
        .val-comp-plus {
            font-size: 0.95rem; 
            color: var(--ch-teal);
            margin-bottom: 0.2rem;
            font-weight: 700;
        }
        .val-comp-est {
            font-size: 0.9rem; 
            color: var(--ch-slate-muted);
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .val-comp-price {
            border: 1px solid var(--ch-border);
            border-radius: 50px;
            padding: 0.3rem clamp(1rem, 3vw, 1.5rem);
            font-size: clamp(1rem, 3vw, 1.15rem); 
            font-weight: 800;
            color: var(--ch-dark-slate);
            display: inline-block;
            margin: 0 auto;
            white-space: nowrap; 
        }
        
        /* FIXED RESPONSIVE TOTAL COMPARISON BOX */
        .val-cost-box {
            background: #475569;
            border-radius: 1rem;
            display: flex;
            flex-direction: row; 
            color: #fff;
            overflow: hidden;
            margin-bottom: 2rem;
        }
        
        @media (max-width: 575.98px) {
            .val-cost-box {
                flex-direction: column; 
            }
        }

        .val-cost-half {
            flex: 1;
            text-align: center;
            padding: 2rem 1rem; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }
        .val-cost-half.olamour-side {
            background: #1e293b; /* Darker to make the teal pop */
        }
        .val-cost-half.luxury-side {
            background: #475569;
            opacity: 0.85; /* Dimmed slightly to emphasize left side */
        }
        
        /* BEST VALUE BADGE */
        .best-value-badge {
            background: rgba(20, 184, 166, 0.15);
            color: #5eead4;
            border: 1px solid rgba(20, 184, 166, 0.3);
            font-size: 0.75rem;
            font-family: 'Barlow', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding: 4px 12px;
            border-radius: 50px;
            display: inline-block;
            margin: 0 auto 0.75rem auto;
            font-weight: 700;
            box-shadow: 0 0 15px rgba(20, 184, 166, 0.2);
        }

        .val-cost-title {
            font-size: 1.1rem; 
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #f8fafc;
        }
        .val-cost-title span {
            font-size: 0.9rem !important; 
            font-weight: 400;
        }
        
        /* REGULAR AMOUNT VS HIGHLIGHTED $200 */
        .val-cost-amount {
            font-size: clamp(1.8rem, 6vw, 2.5rem); 
            font-weight: 700;
            font-family: 'Bebas Neue', sans-serif;
            letter-spacing: 1px;
            line-height: 1;
            word-break: break-word; 
        }
        .val-cost-amount.highlight-price {
            color: #5eead4; /* Bright Teal */
            font-size: clamp(2.5rem, 8vw, 3.5rem); /* Extra Large! */
            text-shadow: 0 0 25px rgba(20, 184, 166, 0.5); /* Glowing Effect */
            margin-top: 0.5rem;
        }
        
        .luxury-vs-text {
            font-size: clamp(1.2rem, 4vw, 1.8rem);
            font-weight: 800;
            color: #94a3b8;
            font-family: 'Barlow', sans-serif;
            opacity: 0.6;
        }
        
        .val-data-points {
            background: var(--ch-bg-light);
            border: 1px solid var(--ch-border);
            border-radius: 1.25rem;
            padding: 2rem;
            transition: all 0.3s ease; 
        }

        /* HOVER EFFECT for the right panel */
        .val-data-points:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(20, 184, 166, 0.15);
            border-color: rgba(20, 184, 166, 0.4);
        }

        .val-data-points h5 {
            font-weight: 800;
            color: var(--ch-dark-slate);
            margin-bottom: 1.5rem;
            font-size: 1.25rem; 
        }
        .val-data-points p {
            font-size: 1rem; 
            color: var(--ch-slate-muted);
            line-height: 1.7;
            margin-bottom: 1.2rem;
        }
        .val-data-points strong {
            color: var(--ch-dark-slate);
        }

        /* =========================================
            ADDED CSS FOR OWNER MODAL
        ========================================= */
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
        <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('./assets/image/banner(1).png') center center / cover no-repeat; z-index: 0;">
            <div class="hero-grid-lines"></div>
        </div>

        <div class="container-fluid px-3 px-lg-5 hero-content reveal visible" style="position: relative; z-index: 1;">
            <div class="row justify-content-center">
                <div class="col-12 col-md-11 col-xl-10 text-center">
                    <div class="hero-eyebrow justify-content-center mx-auto mb-3">
                        <span class="dot"></span>NEXT GENERATION SKIN CARE SCIENCE BY INFINITE
                    </div>

                    <p class="ola-script mt-2">/oh-la-moor/</p>
                    <h1 class="ola-hero-title">O'LAMOUR</h1>

                    <p class="hero-desc mx-auto text-white mt-4 px-2" style="max-width:800px; opacity: 0.9; line-height: 1.8; font-size: 1.15rem;">
                        Korea's clinical biotechnology meets botanical prestige. Discover the next generation of skincare designed to deliver long-lasting, medical-grade glass skin results.
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
                    <span class="section-tag">Affordable Luxury</span>
                    <h2 class="section-title mb-4">The O'LAMOUR <span style="color: var(--ch-teal);">Standard</span></h2>
                    <p class="fs-5 text-muted" style="line-height: 1.8;">
                        We believe true luxury isn't defined by a price tag, but by the integrity of the formula. Every O'LAMOUR product utilizes a <strong>Triple-Solution Formula</strong>. By performing three distinct roles, a single bottle replaces your entire traditional routine—giving you 70% less clutter and 100% more potency.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="collection" class="section-pad" style="background-color: var(--ch-white);">
        <div class="container-fluid px-3 px-lg-5">
            
            <div class="row product-row align-items-center product-showcase reveal">
                <div class="col-12 col-lg-6 order-1 order-lg-1 text-center">
                    <div class="product-img-wrapper">
                        <img src="./assets/image/product/O_LAMOUR_Facial_Essence.png" alt="O'Lamour Facial Essence">
                    </div>
                </div>
                <div class="col-12 col-lg-6 order-2 order-lg-2 px-lg-5 mt-4 mt-lg-0">
                    <div>
                        <span class="section-tag">Step 1: The Preparation</span>
                        <div class="fda-tag"><i class="bi bi-shield-check me-2"></i> FDA: NN-1000016137456</div>
                        
                        <h2 class="section-title mb-2">Facial <span style="color: var(--ch-teal);">Essence</span></h2>
                        <h5 class="text-muted mb-4 fs-5" style="letter-spacing: 1px;">Triple-Solution Hybrid Toner (135ml)</h5>
                        
                        <p class="fs-5 text-muted mb-4">A powerhouse 3-in-1 hybrid toner formulated to tone the skin and give it a healthy plump glow using medical-grade peptides and volume-boosting lipids.</p>

                        <ul class="job-list">
                            <li><span class="job-title">Job 1: Advanced Toner</span> Balances pH and refines skin texture using Damask Rose Water and Witch Hazel.</li>
                            <li><span class="job-title">Job 2: Renewal Serum</span> Features Plant-based Epidermal Growth Factor (EGF) to signal rapid cell turnover.</li>
                            <li><span class="job-title">Job 3: Collagen & Volume Booster</span> Infuses Hydrolyzed Collagen and Volufiline™ for an immediate "liquid filler" plumping effect.</li>
                        </ul>

                        <div class="replaces-box">
                            <span class="section-tag text-dark mb-2"><i class="bi bi-arrow-left-right me-2" style="color: var(--ch-teal);"></i>Replaces 3 Clinical Steps</span>
                            <p class="mb-0 fs-5 fw-bold" style="color: var(--ch-dark-slate);">Hydrating Toner + EGF Renewal Serum + Collagen Plumper</p>
                            <p class="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $240.00</p>
                        </div>
                        <div class="price-tag">PHP 3,000 <span>(USD $50)</span></div>
                    </div>
                </div>
            </div>

            <div class="row product-row align-items-center product-showcase reveal">
                <div class="col-12 col-lg-6 order-1 order-lg-2 text-center">
                    <div class="product-img-wrapper">
                        <img src="./assets/image/product/O’LAMOUR_Quintessence_Ampoule.png" alt="O'Lamour Quintessence Ampoule">
                    </div>
                </div>
                <div class="col-12 col-lg-6 order-2 order-lg-1 px-lg-5 mt-4 mt-lg-0">
                    <div>
                        <span class="section-tag">Step 2: The Repair</span>
                        <div class="fda-tag"><i class="bi bi-shield-check me-2"></i> FDA: NN-1000015767759</div>
                        
                        <h2 class="section-title mb-2">Quintessence <span style="color: var(--ch-teal);">Ampoule</span></h2>
                        <h5 class="text-muted mb-4 fs-5" style="letter-spacing: 1px;">High-Potency Recovery Booster</h5>
                        
                        <p class="fs-5 text-muted mb-4">A premium "recovery booster" acting as a bridge between scientific regenerative medicine & luxury skincare. <strong class="text-danger bg-danger-subtle px-2 py-1 rounded d-inline-block mt-2 mt-md-0"><i class="bi bi-snow2 me-1"></i>Requires Refrigeration</strong>.</p>

                        <ul class="job-list">
                            <li><span class="job-title">Job 1: Intensive DNA Repair</span> Powered by 10,000 ppm PDRN (Sodium DNA) from Japan to heal micro-damage and thicken the dermal layer.</li>
                            <li><span class="job-title">Job 2: Clinical Brightening</span> Utilizes Niacinamide and 12X Plant Extracts to target hyperpigmentation.</li>
                            <li><span class="job-title">Job 3: Longevity Booster</span> Acts as a cellular Sirtuin activator, slowing biological aging for youthful bounce.</li>
                        </ul>

                        <div class="replaces-box">
                            <span class="section-tag text-dark mb-2"><i class="bi bi-arrow-left-right me-2" style="color: var(--ch-teal);"></i>Replaces 3 Clinical Steps</span>
                            <p class="mb-0 fs-5 fw-bold" style="color: var(--ch-dark-slate);">10k ppm PDRN Repair + DNA Recovery + Brightening Serum</p>
                            <p class="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $365.00</p>
                        </div>
                        <div class="price-tag">PHP 3,300 <span>(USD $55)</span></div>
                    </div>
                </div>
            </div>

            <div class="row product-row align-items-center product-showcase reveal">
                <div class="col-12 col-lg-6 order-1 order-lg-1 text-center">
                    <div class="product-img-wrapper">
                        <img src="./assets/image/product/O’LAMOUR_CoreLaCrème.png" alt="O'Lamour CoreLaCrème">
                    </div>
                </div>
                <div class="col-12 col-lg-6 order-2 order-lg-2 px-lg-5 mt-4 mt-lg-0">
                    <div>
                        <span class="section-tag">Step 3: The Structure</span>
                        <div class="fda-tag"><i class="bi bi-shield-check me-2"></i> FDA: NN-1000015998559</div>
                        
                        <h2 class="section-title mb-2">CoreLa<span style="color: var(--ch-teal);">Crème</span></h2>
                        <h5 class="text-muted mb-4 fs-5" style="letter-spacing: 1px;">Ultimate Skin Architecture Solution (50g)</h5>
                        
                        <p class="fs-5 text-muted mb-4">A medical-grade luxury moisturizer that integrates regenerative biotechnology to address deep cellular aging and loss of skin density.</p>

                        <ul class="job-list">
                            <li><span class="job-title">Job 1: Barrier Moisturizer</span> Uses Ceramide NP and Shea Butter to seal in moisture for 24-hour hydration.</li>
                            <li><span class="job-title">Job 2: Topical Lipid-Filler</span> Combines Volufiline™ and Copper Tripeptide-1 to physically plump hollow areas.</li>
                            <li><span class="job-title">Job 3: Antioxidant Shield</span> Infused with Alpine Edelweiss Stem Cells as a biological filter against pollution.</li>
                        </ul>

                        <div class="replaces-box">
                            <span class="section-tag text-dark mb-2"><i class="bi bi-arrow-left-right me-2" style="color: var(--ch-teal);"></i>Replaces 3 Clinical Steps</span>
                            <p class="mb-0 fs-5 fw-bold" style="color: var(--ch-dark-slate);">24H Barrier Cream + Volufiline™ Filler + Antioxidant Shield</p>
                            <p class="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $280.00</p>
                        </div>
                        <div class="price-tag">PHP 3,600 <span>(USD $60)</span></div>
                    </div>
                </div>
            </div>

            <div class="row product-row align-items-center product-showcase reveal">
                <div class="col-12 col-lg-6 order-1 order-lg-2 text-center">
                    <div class="product-img-wrapper">
                        <img src="./assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png" alt="O'Lamour PrimeRenew BB Cream">
                    </div>
                </div>
                <div class="col-12 col-lg-6 order-2 order-lg-1 px-lg-5 mt-4 mt-lg-0">
                    <div>
                        <span class="section-tag">Step 4: The Shield</span>
                        <div class="fda-tag"><i class="bi bi-shield-check me-2"></i> FDA: NN-1000016078043</div>
                        
                        <h2 class="section-title mb-2">PrimeRenew <span style="color: var(--ch-teal);">BB Cream</span></h2>
                        <h5 class="text-muted mb-4 fs-5" style="letter-spacing: 1px;">SPF 50/PA++++ Tinted Sunscreen Serum</h5>
                        
                        <p class="fs-5 text-muted mb-4">A hybrid anti-aging serum bridging the gap between high-performance sun protection and clinical anti-aging therapy. <strong class="text-danger bg-danger-subtle px-2 py-1 rounded d-inline-block mt-2 mt-md-0"><i class="bi bi-snow2 me-1"></i>Requires Refrigeration</strong>.</p>

                        <ul class="job-list">
                            <li><span class="job-title">Job 1: Broad-Spectrum Protector</span> Physical mineral defense (Titanium Dioxide, Zinc Oxide) against UVA/UVB rays.</li>
                            <li><span class="job-title">Job 2: Breathable Foundation</span> Full, lightweight "Cloud Skin" coverage that adapts to skin tones and blurs blemishes.</li>
                            <li><span class="job-title">Job 3: Peptide Therapy Serum</span> Actively treats wrinkles and repairs DNA damage while you wear it.</li>
                        </ul>

                        <div class="replaces-box">
                            <span class="section-tag text-dark mb-2"><i class="bi bi-arrow-left-right me-2" style="color: var(--ch-teal);"></i>Replaces 3 Clinical Steps</span>
                            <p class="mb-0 fs-5 fw-bold" style="color: var(--ch-dark-slate);">SPF 50+ Protector + Full-Coverage Foundation + Peptide Therapy</p>
                            <p class="mb-0 mt-2 text-muted fst-italic">Estimated Luxury Value: $205.00</p>
                        </div>
                        <div class="price-tag">PHP 2,100 <span>(USD $35)</span></div>
                    </div>
                </div>
            </div>
            
            <div class="row product-row align-items-center product-showcase reveal" style="border-bottom: none;">
                <div class="col-12 col-lg-6 order-1 order-lg-1 text-center">
                    <div class="product-img-wrapper position-relative">
                        <div class="position-absolute top-0 end-0 m-3 m-md-4 z-3">
                            <span class="badge rounded-pill" style="background-color: var(--ch-teal); color: #fff; font-family: 'Barlow', sans-serif; font-weight: 800; letter-spacing: 1.5px; padding: 0.6em 1.2em; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);">COMING SOON</span>
                        </div>
                        
                        <img src="./assets/image/product/O’LAMOUR_Essence_Bar.png" alt="O'Lamour Essence Bar" style="max-height: 450px;">
                    </div>
                </div>
                <div class="col-12 col-lg-6 order-2 order-lg-2 px-lg-5 mt-4 mt-lg-0">
                    <div>
                        <span class="section-tag" style="color: var(--ch-yellow-dk);">Complementary Step</span>
                        
                        <h2 class="section-title mb-2">Essence <span style="color: var(--ch-teal);">Bar</span></h2>
                        <h5 class="text-muted mb-4 fs-5" style="letter-spacing: 1px;">Crafted Cleansing Bar Soap</h5>
                        
                        <p class="fs-5 text-muted mb-4">An exquisitely crafted cleansing bar infused with a 2X AHA + BHA complex to gently cleanse and brighten the skin, creating the perfect canvas for your O'LAMOUR routine.</p>

                        <ul class="job-list">
                            <li><span class="job-title">Refined Texture</span> Glycolic and Lactic Acids actively refine texture and enhance luminosity.</li>
                            <li><span class="job-title">Pore Purification</span> Salicylic Acid purifies deep pores for a smoother, clearer appearance.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-dark-slate); color: white;">
        <div class="container reveal text-center px-3">
            <span class="section-tag" style="color: var(--ch-yellow);">Value Proposition</span>
            <h2 class="section-title1 mb-5">The Ultimate <span style="color: var(--ch-teal);">ROI</span> For Your Skin</h2>
            <div class="row justify-content-center align-items-stretch g-4 mt-3">
                <div class="col-12 col-lg-5">
                    <div class="roi-card-ola d-flex flex-column justify-content-center">
                        <h4 class="mb-3 fw-bold fs-3" style="color: var(--ch-teal);">O'LAMOUR Line</h4>
                        <p class="text-muted mb-3 fs-5">4 High-Potency Products</p>
                        <h2 class="fw-bold" style="font-size: clamp(3.5rem, 8vw, 5rem); font-family: 'Bebas Neue', sans-serif; color: var(--ch-dark-slate);">$200</h2>
                        <p class="fs-5 mt-3 fw-bold mb-0" style="color: var(--ch-teal);"><i class="bi bi-clock-history me-2"></i>3-Minute Routine</p>
                    </div>
                </div>
                <div class="col-12 col-lg-2 d-flex align-items-center justify-content-center fw-bold py-4 py-lg-0" style="font-size: 3rem; font-family: 'Bebas Neue', sans-serif; color: var(--ch-yellow);">
                    VS
                </div>
                <div class="col-12 col-lg-5">
                    <div class="roi-card-standard d-flex flex-column justify-content-center">
                        <h4 class="text-white-50 mb-3 fw-bold fs-3">Standard Luxury</h4>
                        <p class="text-white-50 mb-3 fs-5">12 Individual Products</p>
                        <h2 class="fw-bold text-white" style="font-size: clamp(3.5rem, 8vw, 5rem); font-family: 'Bebas Neue', sans-serif; opacity: 0.5;">$1,090</h2>
                        <p class="fs-5 mt-3 text-white-50 mb-0"><i class="bi bi-hourglass-split me-2"></i>45-Minute Routine</p>
                    </div>
                </div>
            </div>
            <p class="fs-5 mt-5 mx-auto text-white-50 px-3" style="max-width: 900px; line-height: 1.6;">
                By consolidating ingredients, we eliminate filler additives. You get pure 10,000 ppm PDRN & Bio-EGF without the chemical buildup of 12 different products. You aren't just paying for the name, you're paying for the concentration that makes 8 other products redundant.
            </p>
        </div>
    </section>

    <section class="section-pad" style="background-color: var(--ch-bg-light);">
        <div class="container reveal">
            <div class="text-center mb-5 pb-3 px-3">
                <span class="section-tag">Hero Ingredients</span>
                <h2 class="section-title mb-3">Clinical Bio-Tech <span style="color: var(--ch-teal);">Meets</span> Botanical Prestige</h2>
                <p class="fs-5 text-muted">The core science powering the O'LAMOUR standard.</p>
            </div>
            <div class="row g-4 justify-content-center px-3">
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-dna mb-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">PDRN <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Sodium DNA)</span></h4>
                        <p class="fs-6 text-muted mb-0">Sourced from Japan, this bio-active compound mimics human DNA to trigger deep cellular regeneration, visibly boosting collagen and elastin synthesis.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-leaf mb-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">Plant-EGF <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Youth Protein)</span></h4>
                        <p class="fs-6 text-muted mb-0">A polypeptide that acts as a molecular switch, signaling the skin to speed up cell turnover and repair the barrier with ultimate biocompatibility.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-droplet mb-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">Volufiline™ <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Topical Filler)</span></h4>
                        <p class="fs-6 text-muted mb-0">Known as topical lipofilling. It promotes lipid storage in adipocytes (fat cells), leading to a visible plumping effect in areas prone to sagging.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-card text-center p-4 h-100 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-mountain mb-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 1px;">Alpine Edelweiss <br><span class="fs-6 text-muted font-monospace" style="font-family: 'Barlow', sans-serif; letter-spacing: 0;">(Plant Stem Cell)</span></h4>
                        <p class="fs-6 text-muted mb-0">A survivalist plant stem cell offering 2x the antioxidant power of Vitamin C, clinically improving skin density and providing a visible lifting effect.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-white);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Industry Overview</span>
                <h2 class="section-title mb-3">Skincare Market <span style="color: var(--ch-teal);">Insights</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    We arm our partners with social currency: the kind of facts, trends, and data that make a product naturally authoritative.
                </p>
            </div>
            <div class="row g-4 px-3">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Salmon DNA / PDRN Craze</div>
                        <p class="text-muted mb-3"><strong>The Fact:</strong> PDRN is often called "The Secret of the Stars" in Korea. It was originally used in medicine to heal scars and regenerate tendons before it became a skincare gold standard.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> The Quintessence Ampoule uses PDRN from Japan, known for the highest purity standards in the world. It's essentially "liquid gold" for skin healing.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Medicalization of Beauty</div>
                        <p class="text-muted mb-3"><strong>The Trend:</strong> Consumers are moving away from fluff skincare toward Dermocosmetics. They want products that look like they belong in a doctor's office.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> O'LAMOUR fits the Clinical-Chic aesthetic. The requirement for refrigeration proves the ingredients are active and potent, not just shelf-stable chemicals.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> Glass Skin vs. Cloud Skin</div>
                        <p class="text-muted mb-3"><strong>The Trend:</strong> While Glass Skin (dewy) was the old goal, the new trend is about Cloud Skin—skin that looks bouncy, blurred, and lit from within.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> The PrimeRenew BB Cream is the perfect tool for this. It provides the blur of a filter while Copper Tripeptides work underneath to create actual biological bounce.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Survivalist Flower</div>
                        <p class="text-muted mb-3"><strong>The Fact:</strong> The Alpine Edelweiss (in CoreLaCrème) grows in extreme altitudes under intense UV radiation and freezing temperatures. It produces its own leontopodic acid to survive.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> This is a "Resilience in a Jar." If this plant can survive the Swiss Alps, its stem cells can protect your skin from harsh city pollution & UV rays.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> Non-Invasive Lipofilling</div>
                        <p class="text-muted mb-3"><strong>The Fact:</strong> There is a growing anti-filler movement where people want volume without needles or injections.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> Volufiline™ is a topical lipid-filler. Highlight that it's clinically studied to increase the volume of fatty tissue in the skin, naturally filling hollow areas.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Blue Light Defense</div>
                        <p class="text-muted mb-3"><strong>The Trend:</strong> Most people don't realize that screen aging (HEV light from phones/laptops) penetrates deeper into the skin than UV rays.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> The Quintessence Ampoule and BB Cream are Digital Shields. The PDRN and SPF 50 specifically combat the oxidative stress caused by 8+ hours of screen time.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> Why Made in Korea?</div>
                        <p class="text-muted mb-3"><strong>The Fact:</strong> South Korea spends more on skincare R&D per capita than any other nation in the world.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> Being ISO-Certified in Korea isn't just a label, it's a guarantee. O'LAMOUR combines Korean innovation with Japanese raw materials, a power duo of Asian beauty science.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> The Skin Longevity Narrative</div>
                        <p class="text-muted mb-3"><strong>The Fact:</strong> Anti-aging is out, Longevity is in. Consumers want to prolong their skin's overall healthspan.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> O'LAMOUR doesn't just hide wrinkles, it rebuilds the scaffold. This appeals to younger Gen Z doing "Pre-juvenation" and older clients doing Restoration.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="insight-card">
                        <div class="insight-badge"><i class="bi bi-search text-secondary"></i> Skip-Care Efficiency</div>
                        <p class="text-muted mb-3"><strong>The Trend:</strong> Consumers are tired of 10-step routines. They want multi-hyphenate, high-performance products.</p>
                        <p class="text-muted mb-0"><strong>The Angle:</strong> Each O'LAMOUR product does 3 jobs. The Facial Essence is a toner + serum + collagen booster. This justifies the premium price, it is high-efficiency luxury.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Sales Enablement</span>
                <h2 class="section-title mb-3">Top 3 Consumer <span style="color: var(--ch-teal);">Objections</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    Data-backed answers to the most common questions from skincare skeptics.
                </p>
            </div>
            <div class="row g-4 px-3 mb-5">
                <div class="col-12 col-lg-4">
                    <div class="objection-card">
                        <h5 class="fw-bold mb-4 text-center">Price vs. Value</h5>
                        <div class="skeptic-bubble">
                            <strong>The Skeptic's View:</strong><br>
                            "It's too expensive compared to standard pharmacy brands."
                        </div>
                        <div class="reality-bubble">
                            <strong class="text-dark">The O'LAMOUR Reality:</strong><br>
                            <span class="text-dark fw-bold d-block mt-2 mb-1">Value Over Price:</span>
                            Standard products often use "marketing levels" (trace amounts) of actives. O'LAMOUR provides 10,000 ppm PDRN, a clinical-grade concentration typically reserved for medical injectables, delivering professional results in a daily bottle.
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="objection-card">
                        <h5 class="fw-bold mb-4 text-center">Efficacy of Topicals</h5>
                        <div class="skeptic-bubble">
                            <strong>The Skeptic's View:</strong><br>
                            "PDRN and EGF are too large to penetrate the skin, they only work when injected."
                        </div>
                        <div class="reality-bubble">
                            <strong class="text-dark">The O'LAMOUR Reality:</strong><br>
                            <span class="text-dark fw-bold d-block mt-2 mb-1">Bio-Available Engineering:</span>
                            O'LAMOUR uses Sodium DNA & sh-Oligopeptide-1 (EGF) formulated with advanced delivery systems to penetrate the dermal layers. The refrigeration policy further ensures these delicate proteins remain stable and potent.
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="objection-card">
                        <h5 class="fw-bold mb-4 text-center">"Hype" Ingredients</h5>
                        <div class="skeptic-bubble">
                            <strong>The Skeptic's View:</strong><br>
                            "Plant stem cells are just a buzzword, they aren't 'live' cells."
                        </div>
                        <div class="reality-bubble">
                            <strong class="text-dark">The O'LAMOUR Reality:</strong><br>
                            <span class="text-dark fw-bold d-block mt-2 mb-1">Scientific Resilience:</span>
                            We use Alpine Edelweiss Callus Culture Extract, which contains high concentrations of leontopodic acids. Clinical data shows these botanical extracts provide 2x the antioxidant power of Vitamin C and effectively inhibit collagen-degrading enzymes.
                        </div>
                    </div>
                </div>
            </div>

            <div class="row px-3">
                <div class="col-12">
                    <div class="advantage-bar">
                        <h5 class="fw-bold mb-3" style="color: var(--ch-dark-slate);">Summary of Advantage over Competition</h5>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <p class="text-muted mb-0 border-end pe-3 h-100"><strong>Concentration:</strong> 10,000 ppm PDRN vs. trace industry averages.</p>
                            </div>
                            <div class="col-md-4">
                                <p class="text-muted mb-0 border-end pe-3 h-100"><strong>Dual-Action:</strong> Products function as both high-end cosmetics and clinical treatments (EGF + Volufiline).</p>
                            </div>
                            <div class="col-md-4">
                                <p class="text-muted mb-0 h-100"><strong>Freshness:</strong> Mandatory refrigeration for the Ampoule and BB Cream ensures medical-grade stability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-white);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Application Guide</span>
                <h2 class="section-title mb-3">The O'LAMOUR <span style="color: var(--ch-teal);">Regimen</span></h2>
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
                                <h4 class="fw-bold mb-1" style="color: var(--ch-dark-slate);">Morning Routine: The Luminous Shield</h4>
                                <p class="text-muted mb-0 small fw-bold text-uppercase" style="letter-spacing: 0.5px;">Goal: Hydration, Instant Plumping, and UV Protection</p>
                            </div>
                        </div>
                        <ul class="job-list">
                            <li><span class="job-title">Prep with Facial Essence:</span> After cleansing, apply to a cotton pad and wipe across the face. This removes overnight debris and provides the first hit of Hydrolyzed Collagen.</li>
                            <li><span class="job-title">Treat with Quintessence Ampoule:</span> Apply 2-3 drops. The PDRN strengthens the skin barrier against daily environmental pollutants and blue light.</li>
                            <li><span class="job-title">Firm with CoreLaCrème:</span> Apply a thin, even layer. The Edelweiss Stem Cells act as a high-potency antioxidant shield for the day.</li>
                            <li><span class="job-title">Protect with PrimeRenew BB Cream:</span> Spread evenly. The Copper Tripeptides work to firm your skin while the SPF 50 / PA++++ prevents photo-aging. Tip: Pat extra on blemishes instead of using heavy concealer.</li>
                        </ul>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="rounded-4 p-4 p-lg-5 border shadow-sm h-100 text-white" style="background-color: var(--ch-dark-slate); border-color: #334155 !important;">
                        <div class="d-flex align-items-center mb-4 pb-3 border-bottom" style="border-color: #334155 !important;">
                            <i class="bi bi-moon-stars-fill fs-1 me-3" style="color: #cbd5e1;"></i>
                            <div>
                                <h4 class="fw-bold mb-1 text-white">Evening Routine: The Deep Regenerative Cycle</h4>
                                <p class="text-white-50 mb-0 small fw-bold text-uppercase" style="letter-spacing: 0.5px;">Goal: Intensive DNA Repair, Muscle Relaxation, and Lipid Restoration.</p>
                            </div>
                        </div>
                        <ul class="job-list">
                            <li style="color: #cbd5e1;"><span class="job-title text-white">Double Prep with Facial Essence:</span> After a thorough cleanse, pat the essence directly into the skin with your palms (skip the cotton pad). This allows the Idebenone and Propolis to deeply nourish the skin.</li>
                            <li style="color: #cbd5e1;"><span class="job-title text-white">Boost with Quintessence Ampoule:</span> Use a more generous amount (4-5 drops). Since skin repair peaks at night, the PDRN works at maximum efficiency to heal micro-damage. Note: Take this cold from the fridge for a soothing, anti-inflammatory effect.</li>
                            <li style="color: #cbd5e1;"><span class="job-title text-white">Rebuild with CoreLaCrème:</span> Massage in upward, circular motions. The Bakuchiol and Ceramides work overnight to refine texture and "architecturally" lift the facial contours.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row px-3">
                <div class="col-12">
                    <div class="advantage-bar bg-white">
                        <h5 class="fw-bold mb-4 text-center" style="color: var(--ch-dark-slate);"><i class="bi bi-lightbulb text-warning me-2"></i>Expert Usage Tips</h5>
                        <div class="row g-4">
                            <div class="col-md-4">
                                <h6 class="fw-bold mb-2" style="color: var(--ch-dark-slate); font-size: 0.95rem;">The Freshness Rule</h6>
                                <p class="text-muted mb-0" style="font-size: 0.9rem;">Keep your Quintessence Ampoule and PrimeRenew BB Cream in the refrigerator after opening. This stabilizes the bio-active PDRN and Ferments.</p>
                            </div>
                            <div class="col-md-4 border-start border-end d-none d-md-block">
                                <div class="px-3">
                                    <h6 class="fw-bold mb-2" style="color: var(--ch-dark-slate); font-size: 0.95rem;">Wait for the "Set"</h6>
                                    <p class="text-muted mb-0" style="font-size: 0.9rem;">Give the CoreLaCrème 60 seconds to "set" before applying the BB Cream in the morning to prevent pilling & ensure a smooth, "glass skin" finish.</p>
                                </div>
                            </div>
                            <div class="col-md-4 d-md-none">
                                <h6 class="fw-bold mb-2" style="color: var(--ch-dark-slate); font-size: 0.95rem;">Wait for the "Set"</h6>
                                <p class="text-muted mb-0" style="font-size: 0.9rem;">Give the CoreLaCrème 60 seconds to "set" before applying the BB Cream in the morning to prevent pilling & ensure a smooth, "glass skin" finish.</p>
                            </div>
                            <div class="col-md-4">
                                <h6 class="fw-bold mb-2" style="color: var(--ch-dark-slate); font-size: 0.95rem;">Neck Care</h6>
                                <p class="text-muted mb-0" style="font-size: 0.9rem;">Apply all four products down to the décolleté. The Volufiline in the Essence and Cream is excellent for smoothing "tech-neck" lines.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container reveal">
            <div class="text-center mb-5 px-3">
                <span class="section-tag">Direct Comparison</span>
                <h2 class="section-title mb-3">Value Comparison <span style="color: var(--ch-teal);">Chart</span></h2>
                <p class="fs-5 text-muted mx-auto" style="max-width: 800px;">
                    See how our Triple-Solution Formulas stack up against traditional luxury regimens.
                </p>
            </div>
            
            <div class="row g-4 px-3 align-items-stretch">
                <div class="col-12 col-xl-8">
                    <div class="val-comp-grid">
                        
                        <div class="val-comp-card">
                            <div class="val-comp-row">
                                <div class="val-comp-img-col">
                                    <img src="./assets/image/product/O_LAMOUR_Facial_Essence.png" alt="O'LAMOUR Facial Essence" class="img-fluid" style="max-height: 140px; width: auto; object-fit: contain;">
                                    <div class="val-comp-pill">USD 50 | PHP 3000</div>
                                </div>
                                <div class="val-comp-text-col">
                                    <div class="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                    <div class="val-comp-step">Hydrating Toner</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">EGF Renewal Serum</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">Collagen Plumper</div>
                                    
                                    <div class="val-comp-est">Estimated Luxury Retail Value</div>
                                    <div class="val-comp-price">$240.00</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="val-comp-card">
                            <div class="val-comp-row">
                                <div class="val-comp-img-col">
                                    <img src="./assets/image/product/O’LAMOUR_Quintessence_Ampoule.png" alt="O'LAMOUR Quintessence Ampoule" class="img-fluid" style="max-height: 140px; width: auto; object-fit: contain;">
                                    <div class="val-comp-pill">USD 55 | PHP 3300</div>
                                </div>
                                <div class="val-comp-text-col">
                                    <div class="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                    <div class="val-comp-step">10k ppm PDRN Repair</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">DNA Recovery</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">Brightening Serum</div>
                                    
                                    <div class="val-comp-est">Estimated Luxury Retail Value</div>
                                    <div class="val-comp-price">$365.00</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="val-comp-card">
                            <div class="val-comp-row">
                                <div class="val-comp-img-col">
                                    <img src="./assets/image/product/O’LAMOUR_CoreLaCrème.png" alt="O'LAMOUR CoreLaCrème" class="img-fluid" style="max-height: 140px; width: auto; object-fit: contain;">
                                    <div class="val-comp-pill">USD 60 | PHP 3600</div>
                                </div>
                                <div class="val-comp-text-col">
                                    <div class="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                    <div class="val-comp-step">24H Barrier Cream</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">Volufiline™ Filler</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">Antioxidant Shield</div>
                                    
                                    <div class="val-comp-est">Estimated Luxury Retail Value</div>
                                    <div class="val-comp-price">$280.00</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="val-comp-card">
                            <div class="val-comp-row">
                                <div class="val-comp-img-col">
                                    <img src="./assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png" alt="O'LAMOUR PrimeRenew BB Cream" class="img-fluid" style="max-height: 140px; width: auto; object-fit: contain;">
                                    <div class="val-comp-pill">USD 35 | PHP 2100</div>
                                </div>
                                <div class="val-comp-text-col">
                                    <div class="val-comp-steps-title">Replaces these 3 clinical steps:</div>
                                    <div class="val-comp-step">SPF 50+ Protector</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">Full-Coverage Foundation</div>
                                    <div class="val-comp-plus">+</div>
                                    <div class="val-comp-step">Peptide Therapy</div>
                                    
                                    <div class="val-comp-est">Estimated Luxury Retail Value</div>
                                    <div class="val-comp-price">$205.00</div>
                                </div>
                            </div>
                        </div>

                    </div> </div>
                
                <div class="col-12 col-xl-4">
                    <div class="val-data-points h-100 d-flex flex-column justify-content-between">
                        <div>
                            <div class="text-center mb-3">
                                <h6 class="fw-bold text-uppercase" style="color: var(--ch-slate-muted); letter-spacing: 1px;">Total Cost Comparison</h6>
                            </div>
                            
                            <div class="val-cost-box shadow-sm">
                                <div class="val-cost-half olamour-side">
                                    <div class="best-value-badge"><i class="bi bi-star-fill me-1"></i> Best Value</div>
                                    
                                    <div class="val-cost-title">O'LAMOUR Line<br><span>(4 Products)</span></div>
                                    
                                    <div class="val-cost-amount highlight-price">$200</div>
                                </div>
                                
                                <div class="val-cost-half luxury-side">
                                    <div class="val-cost-title">Luxury Products<br><span>(12 Products)</span></div>
                                    
                                    <div class="d-flex align-items-center justify-content-center gap-3 mt-1">
                                        <span class="luxury-vs-text">VS</span>
                                        <div class="val-cost-amount" style="color: #cbd5e1;">$1,090.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h5 class="mt-2">Additional O'LAMOUR Winning Data Points</h5>
                            
                            <p><strong>70% Less Clutter, 100% More Potency:</strong> By consolidating ingredients, we eliminate filler additives. You get pure 10,000 ppm PDRN & Bio-EGF without the chemical buildup of 12 different products.</p>
                            
                            <p><strong>The Cold-Chain Freshness:</strong> Unlike mass-market brands, our mandatory refrigeration for the Ampoule and BB Cream ensures medical-grade bio-actives stay alive and effective until the last drop.</p>
                            
                            <p><strong>Time is Luxury:</strong> An O'LAMOUR routine takes 3 minutes, delivering the same results as a 45-minute 12-step regimen.</p>
                            
                            <p class="mb-0">Taking Quintessence Ampoule as example, we do not just sell a skincare solution, we offer a financial optimization too. One bottle of O'LAMOUR Quintessence contains the same Repair Load as 10 bottles of a standard pharmacy serum. When you buy O'LAMOUR, you aren't just paying for the name, you're paying for the concentration that makes 8 other products redundant. It's the ultimate ROI for your skin and your wallet.</p>
                        </div>
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
                        Ready to Build Your <br><span style="color: var(--ch-teal);">Global Empire?</span>
                    </h2>
                    
                    <p class="fs-5 mb-5 text-white-50 mx-auto" style="line-height: 1.8;">
                        Join a network of visionary leaders and redefine the standard of luxury skincare in your market. Step into the future of clinical biotechnology and build a limitless business.
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
                <p class="fs-5 text-muted mt-2">Everything you need to know about the O'LAMOUR standard.</p>
            </div>
            <div class="row justify-content-center px-3">
                <div class="col-12 col-lg-9">
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                                    Can O'LAMOUR products be used during the day and at night?
                                </button>
                            </h2>
                            <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Yes, except for the PrimeRenew BB Cream, which is specifically formulated with SPF 50 for daytime protection. The Facial Essence, Quintessence Ampoule, and CoreLaCrème are designed for both morning and evening use.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                                    Do O'LAMOUR products expire?
                                </button>
                            </h2>
                            <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Yes, all O'LAMOUR products have a shelf life of 2-3 years unopened. Once opened, we recommend using them within 6-12 months for maximum efficacy.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                                    Is O'LAMOUR safe for all skin types, including sensitive skin?
                                </button>
                            </h2>
                            <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    Yes, O'LAMOUR is formulated with clean, skin-loving ingredients. However, as with any active skincare, we recommend a patch test first.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
                                    How soon will I see results?
                                </button>
                            </h2>
                            <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    While many users notice an immediate "glass skin" glow and plumping effect after the first application, clinical changes—like deep wrinkle reduction and pigmentation fading—typically become visible after 28 days of consistent use (one full skin turnover cycle).
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
                        <p class="text-muted mb-4 small">We respond within 2-3 business days.</p>

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
                                    <option value="Order Product">Order Product</option>
                                    <option value="Join Us">Join Us</option>
                                    <option value="Feedback">Feedback</option>
                                </select>
                                <label for="subjectInput" class="text-muted">Subject</label>
                                <div class="invalid-feedback">Please select a subject.</div>
                            </div>
                            <div class="form-floating mb-4">
                                <textarea name="message" id="messageInput" class="form-control bg-light border-0 shadow-none" placeholder="Your message..." style="height: 130px" required></textarea>
                                <label for="messageInput" class="text-muted">Your message...</label>
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
                <div class="col-md-6 mb-2 mb-md-0">&copy; <?= date('Y') ?> Infinite. All rights reserved.</div>
                
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
    
    <script src="./assets/js/olamour.js"></script>
</body>
</html>