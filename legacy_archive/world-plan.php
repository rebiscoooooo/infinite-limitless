<?php session_start();
require_once 'public_auth_guard.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no" />
    <title>Infinite World Plan | Build Globally. Earn Limitlessly.</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />

    <!-- CSS Dependencies -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&family=Cinzel:wght@600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./assets/css/styles.css" />

    <style>
        :root {
            --ch-teal: #14b8a6;
            --ch-teal-darker: #0f766e;
            --ch-dark-slate: #0f172a;
            --ch-slate-muted: #94a3b8;
            --ch-white: #ffffff;
            --ch-bg-light: #f8fafc;
            --ch-border: #e2e8f0;
            --ch-yellow: #f59e0b;
            --ch-yellow-dk: #d97706;
            --transition-speed: 0.3s;
        }

        html,
        body {
            overflow-x: hidden;
            width: 100%;
            max-width: 100vw;
            scroll-behavior: smooth;
            font-family: 'Barlow', sans-serif;
            background-color: var(--ch-white);
        }

        .section-pad {
            padding: clamp(60px, 8vw, 90px) 0;
        }

        .section-tag {
            color: var(--ch-teal);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 0.85rem;
            display: block;
            margin-bottom: 0.5rem;
        }

        .section-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.5rem, 5vw, 4rem);
            color: var(--ch-dark-slate);
            line-height: 1.1;
        }



        /* =========================================================
           PHP / USD MEMBER BENEFITS + INFINITE EXECUTIVE PROGRAM
           ========================================================= */
        #php-usd-member-benefits-section {
            background: #eef2f7;
            padding: 55px 0 50px;
        }

        .member-benefits-card {
            background: #fff;
            border: 1px solid rgba(15, 23, 42, 0.08);
            border-radius: 28px;
            padding: 42px 48px;
            box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
        }

        .member-benefits-heading {
            display: flex;
            align-items: center;
            gap: 18px;
            margin-bottom: 28px;
        }

        .member-benefits-heading .benefit-star {
            color: var(--ch-yellow);
            font-size: 2.25rem;
            line-height: 1;
            filter: drop-shadow(0 3px 4px rgba(245, 158, 11, .22));
        }

        .member-benefits-heading h3 {
            margin: 0;
            font-family: 'Bebas Neue', sans-serif;
            color: var(--ch-dark-slate);
            font-size: clamp(2rem, 4vw, 3rem);
            letter-spacing: .8px;
            line-height: 1;
        }

        .member-benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            gap: 19px;
        }

        .member-benefits-list li {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            color: #475569;
            font-size: clamp(1rem, 1.5vw, 1.2rem);
            line-height: 1.55;
        }

        .member-benefits-list .benefit-check {
            flex: 0 0 auto;
            width: 30px;
            height: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #22a06b;
            color: #fff;
            font-size: .85rem;
            margin-top: 2px;
        }

        .member-benefits-list strong {
            color: #334155;
            font-weight: 800;
        }

        .executive-program-card {
            margin-top: 26px;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 28px;
            padding: 30px 38px;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 28px;
            box-shadow: 0 14px 35px rgba(15, 23, 42, 0.16);
        }

        .executive-program-icon {
            flex: 0 0 82px;
            width: 82px;
            height: 82px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--ch-teal);
            font-size: 3.2rem;
        }

        .executive-program-card h3 {
            margin: 0 0 9px;
            color: #fff;
            font-family: 'Barlow', sans-serif;
            font-size: clamp(1.5rem, 3vw, 2.2rem);
            font-weight: 800;
        }

        .executive-program-card p {
            margin: 0;
            color: rgba(255, 255, 255, .82);
            font-size: clamp(1rem, 1.5vw, 1.15rem);
            line-height: 1.65;
        }

        .executive-program-card p strong {
            color: var(--ch-teal);
            font-weight: 800;
        }

        @media (max-width: 767.98px) {
            #php-usd-member-benefits-section {
                padding: 40px 0;
            }

            .member-benefits-card {
                border-radius: 20px;
                padding: 30px 22px;
            }

            .member-benefits-heading {
                gap: 12px;
                margin-bottom: 23px;
            }

            .member-benefits-heading .benefit-star {
                font-size: 1.8rem;
            }

            .member-benefits-heading h3 {
                font-size: 2.15rem;
            }

            .member-benefits-list {
                gap: 15px;
            }

            .member-benefits-list li {
                gap: 11px;
                font-size: 1rem;
            }

            .member-benefits-list .benefit-check {
                width: 27px;
                height: 27px;
                font-size: .75rem;
            }

            .executive-program-card {
                border-radius: 20px;
                padding: 25px 22px;
                align-items: flex-start;
                gap: 17px;
            }

            .executive-program-icon {
                flex-basis: 45px;
                width: 45px;
                height: 45px;
                font-size: 2.15rem;
            }

            .executive-program-card h3 {
                font-size: 1.45rem;
            }

            .executive-program-card p {
                font-size: .98rem;
                line-height: 1.55;
            }
        }

        /* --- PRELOADER --- */
        body.is-loading {
            overflow: hidden !important;
            touch-action: none;
        }

        #infinite-preloader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100dvh;
            background: rgba(15, 23, 42, 0.92);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        #infinite-preloader.fade-out {
            opacity: 0;
            visibility: hidden;
        }

        .preloader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: pulse-glow 2s infinite alternate ease-in-out;
        }

        .preloader-brand {
            color: #fff;
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(50px, 8vw, 80px);
            line-height: 0.8;
            letter-spacing: 2px;
        }

        .preloader-slogan {
            color: var(--ch-teal);
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 6px;
            font-size: clamp(10px, 2vw, 14px);
            margin-top: 8px;
        }

        .preloader-line {
            width: 0;
            height: 3px;
            background: var(--ch-teal);
            margin-top: 25px;
            border-radius: 50px;
            box-shadow: 0 0 15px var(--ch-teal);
            animation: loading-bar 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes pulse-glow {
            0% {
                transform: scale(0.98);
                filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.2));
            }

            100% {
                transform: scale(1.02);
                filter: drop-shadow(0 0 30px rgba(20, 184, 166, 0.6));
            }
        }

        @keyframes loading-bar {
            0% {
                width: 0%;
                opacity: 0;
            }

            10% {
                opacity: 1;
            }

            100% {
                width: 100%;
                opacity: 1;
            }
        }

        /* --- NAVBAR --- */
        #mainNav {
            transition: all var(--transition-speed) ease;
            padding: 15px 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
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
        }

        .btn-nav-order:hover {
            background: var(--ch-teal);
            border-color: var(--ch-teal);
            color: #fff !important;
        }

        /* --- HERO SECTION --- */
        .world-hero {
            position: relative;
            padding-top: 170px;
            padding-bottom: 90px;
            background: linear-gradient(rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.96)), url('./assets/image/bg/office.jpg') center center / cover no-repeat;
            overflow: hidden;
            color: white;
        }

        .ola-hero-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(3.8rem, 9vw, 7.5rem);
            color: var(--ch-white);
            line-height: 0.95;
            letter-spacing: 2px;
            text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .ola-script {
            font-family: 'Great Vibes', cursive;
            color: #5eead4;
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            line-height: 1;
            margin-bottom: 10px;
        }

        /* --- CURRENCY SWITCHER BAR --- */
        .currency-switcher-wrapper {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50px;
            padding: 6px;
            display: inline-flex;
            gap: 6px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            flex-wrap: wrap;
            justify-content: center;
        }

        .currency-btn {
            border: none;
            background: transparent;
            color: rgba(255, 255, 255, 0.75);
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            padding: 10px 24px;
            border-radius: 40px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.95rem;
            cursor: pointer;
        }

        .currency-btn img {
            width: 22px;
            height: 16px;
            object-fit: cover;
            border-radius: 3px;
        }

        .currency-btn.active {
            background: var(--ch-teal);
            color: #ffffff;
            box-shadow: 0 4px 20px rgba(20, 184, 166, 0.4);
        }

        .currency-btn:hover:not(.active) {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
        }

        /* --- PREMIUM PRICING CARDS --- */
        .pricing-card {
            background: #fff;
            border-radius: 1.5rem;
            border: 1px solid var(--ch-border);
            position: relative;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            height: 100%;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
            z-index: 1;
            border-top: 6px solid var(--card-color, var(--ch-teal));
            margin-top: 25px;
        }

        .pricing-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 220px;
            background: radial-gradient(circle at top center, var(--card-bg-glow, rgba(20, 184, 166, 0.15)), transparent 70%);
            z-index: -1;
            pointer-events: none;
            border-radius: 1.5rem 1.5rem 0 0;
        }

        .pricing-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
            border-color: var(--card-color, var(--ch-teal));
        }

        .pricing-content {
            padding: 2.5rem 2rem;
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        /* Retail Card Custom Hover */
        .retail-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .retail-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .retail-card:hover .retail-product-img {
            transform: scale(1.08) translateY(-5px);
        }

        /* Custom Themes per Tier */
        .tier-starter {
            --card-color: #10b981;
            --card-bg-glow: rgba(16, 185, 129, 0.15);
        }

        .tier-basic {
            --card-color: #3b82f6;
            --card-bg-glow: rgba(59, 130, 246, 0.15);
        }

        .tier-advance {
            --card-color: #e11d48;
            --card-bg-glow: rgba(225, 29, 72, 0.15);
        }

        .tier-pro {
            --card-color: #4f46e5;
            --card-bg-glow: rgba(79, 70, 229, 0.15);
        }

        .tier-supreme {
            --card-color: #f59e0b;
            --card-bg-glow: rgba(245, 158, 11, 0.15);
        }

        .package-icon-wrapper {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 1.25rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            color: var(--card-color, var(--ch-teal));
            font-size: 2rem;
        }

        .pricing-card.best-seller {
            border: 2px solid var(--card-color, var(--ch-teal));
            box-shadow: 0 15px 35px var(--card-bg-glow, rgba(20, 184, 166, 0.15));
        }

        .best-seller-badge {
            position: absolute;
            top: -18px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card-color, var(--ch-teal));
            color: #fff;
            padding: 8px 24px;
            border-radius: 30px;
            font-weight: 800;
            font-size: 0.85rem;
            letter-spacing: 1.5px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            white-space: nowrap;
            z-index: 10;
        }

        .rank-status-badge {
            background: linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%);
            color: var(--ch-yellow);
            border: 1px solid rgba(245, 158, 11, 0.3);
            font-weight: 800;
            font-size: 0.75rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 12px;
            display: inline-block;
            margin-top: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .package-price {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.8rem, 5vw, 3.5rem);
            color: var(--ch-dark-slate);
            line-height: 1;
            margin: 1rem 0;
            text-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        /* --- ORGANIZATIONAL CHART (BINARY TREE) --- */
        .org-chart-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            border-radius: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 3rem 1rem;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
        }

        .org-chart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
        }

        .org-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 2;
            transition: transform 0.3s ease;
            width: 48%;
        }

        .org-node:hover {
            transform: translateY(-5px);
        }

        .avatar-box {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #1e293b;
            border: 4px solid var(--ch-teal);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 25px rgba(20, 184, 166, 0.4);
            position: relative;
            overflow: hidden;
        }

        .avatar-box i {
            font-size: 3rem;
            color: #ffffff;
        }

        .avatar-box.you {
            border-color: var(--ch-yellow);
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
            width: 115px;
            height: 115px;
        }

        .avatar-box.you i {
            color: var(--ch-yellow);
            font-size: 3.5rem;
        }

        .node-tag {
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 800;
            margin-top: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .node-tag.you-tag {
            background: var(--ch-yellow);
            color: var(--ch-dark-slate);
            border: none;
        }

        .earn-badge {
            background: rgba(20, 184, 166, 0.2);
            border: 1px solid var(--ch-teal);
            color: #5eead4;
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 800;
            margin-top: 8px;
            text-align: center;
        }

        /* Tree Connecting Lines */
        .tree-line-v {
            width: 3px;
            height: 35px;
            background: var(--ch-teal);
            opacity: 0.6;
        }

        .tree-line-h-wrapper {
            width: 75%;
            max-width: 350px;
            height: 60px;
            position: relative;
            margin: 0 auto;
        }

        .tree-line-h {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--ch-teal);
            opacity: 0.6;
        }

        .tree-line-down-left,
        .tree-line-down-right {
            position: absolute;
            top: 0;
            width: 3px;
            height: 60px;
            background: var(--ch-teal);
            opacity: 0.6;
        }

        .tree-line-down-left {
            left: 0;
        }

        .tree-line-down-right {
            right: 0;
        }

        .match-badge-center {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
            width: max-content;
        }

        .branches-row {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 450px;
            position: relative;
            margin: 0 auto;
        }

        /* --- GLASS TABLES & CARDS --- */
        .glass-table-card {
            background: #ffffff;
            border-radius: 1.5rem;
            border: 1px solid var(--ch-border);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
            overflow: hidden;
        }

        .table-custom {
            margin-bottom: 0;
        }

        .table-custom thead {
            background: var(--ch-dark-slate);
            color: #ffffff;
            font-family: 'Barlow', sans-serif;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 1px;
        }

        .table-custom th,
        .table-custom td {
            padding: 1.1rem 1rem;
            vertical-align: middle;
        }

        .table-custom tbody tr {
            transition: background-color 0.2s ease;
        }

        .table-custom tbody tr:hover {
            background-color: rgba(20, 184, 166, 0.04);
        }

        .tier-highlight {
            font-weight: 800;
            color: var(--ch-dark-slate);
        }

        /* --- NEW ENHANCED DEALER CARD --- */
        .dealer-card-enhanced {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 1.5rem;
            padding: 3rem 2rem;
            border: 1px solid rgba(20, 184, 166, 0.3);
            border-top: 6px solid var(--ch-teal);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
        }

        .dealer-card-enhanced:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
            border-color: var(--ch-teal);
        }

        .dealer-photo-large {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border: 4px solid var(--ch-teal);
            padding: 6px;
            margin-bottom: 1rem;
            background: #fff;
            position: relative;
            z-index: 2;
            box-shadow: 0 10px 25px rgba(20, 184, 166, 0.2);
        }

        .dealer-photo-large img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }

        .dealer-card-bg-shape {
            position: absolute;
            top: -60px;
            right: -60px;
            width: 250px;
            height: 250px;
            background: linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0) 100%);
            border-radius: 50%;
            z-index: 1;
        }

        /* --- DEALER CALL TO ACTION BTN --- */
        .dealer-cta-btn {
            border: 1px solid #94a3b8;
            background-color: #ffffff;
            color: var(--ch-dark-slate);
            transition: all 0.3s ease;
        }

        .dealer-cta-btn:hover {
            background-color: var(--ch-bg-light);
            border-color: var(--ch-dark-slate);
            color: var(--ch-dark-slate);
        }

        /* --- OWNER MODAL --- */
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
            background: rgba(255, 255, 255, 0.15);
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
            filter: drop-shadow(0 -10px 25px rgba(0, 0, 0, 0.3));
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
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.02);
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
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            opacity: 0.9;
            transition: all 0.3s ease;
        }

        .btn-close-custom:hover {
            opacity: 1;
            transform: rotate(90deg);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        /* Responsive Tree Fixes */
        @media (max-width: 768px) {
            .tree-line-h-wrapper {
                width: 85%;
            }

            .avatar-box {
                width: 80px;
                height: 80px;
            }

            .avatar-box i {
                font-size: 2rem;
            }

            .avatar-box.you {
                width: 90px;
                height: 90px;
            }

            .avatar-box.you i {
                font-size: 2.5rem;
            }

            .currency-btn {
                padding: 8px 16px;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 576px) {
            .tree-line-h-wrapper {
                width: 90%;
                height: 50px;
            }

            .tree-line-down-left,
            .tree-line-down-right {
                height: 50px;
            }

            .avatar-box {
                width: 70px;
                height: 70px;
                border-width: 3px;
            }

            .avatar-box i {
                font-size: 1.8rem;
            }

            .avatar-box.you {
                width: 85px;
                height: 85px;
            }

            .avatar-box.you i {
                font-size: 2.2rem;
            }

            .node-tag {
                padding: 3px 10px;
                font-size: 0.7rem;
                margin-top: 8px;
            }

            .earn-badge {
                padding: 5px 8px;
                font-size: 0.75rem;
                margin-top: 8px;
            }
        }

        /* --- WORLD PLAN INFORMATION FLOW (PNG) --- */
        .world-info-band {
            background: var(--ch-bg-light);
        }

        .how-start-card,
        .bonus-card,
        .info-card,
        .shipping-card,
        .encash-card {
            background: #fff;
            border: 1px solid var(--ch-border);
            border-radius: 22px;
            height: 100%;
            padding: 1.5rem;
            box-shadow: 0 12px 30px rgba(15, 23, 42, .06);
            transition: transform .25s ease, box-shadow .25s ease;
        }

        .how-start-card:hover,
        .bonus-card:hover,
        .info-card:hover,
        .shipping-card:hover,
        .encash-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 18px 38px rgba(15, 23, 42, .10);
        }

        .step-number {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            background: rgba(20, 184, 166, .12);
            color: var(--ch-teal-dk);
            margin-bottom: 1rem;
        }

        .lifetime-strip {
            border-radius: 18px;
            background: linear-gradient(135deg, var(--ch-dark-slate), #1e293b);
            color: #fff;
            padding: 1rem 1.25rem;
        }

        .bonus-amount {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2.2rem;
            letter-spacing: 1px;
            color: var(--ch-teal-dk);
            line-height: 1;
        }

        .points-card {
            background: linear-gradient(180deg, #fff, #f8fafc);
            border: 1px solid var(--ch-border);
            border-radius: 18px;
            padding: 1.25rem;
            text-align: center;
            height: 100%;
        }

        .points-card strong {
            display: block;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2rem;
            color: var(--ch-dark-slate);
            letter-spacing: 1px;
        }

        .flow-arrow {
            color: var(--ch-teal);
            font-size: 1.35rem;
        }

        .cutoff-table td,
        .cutoff-table th {
            padding: .8rem;
        }

        .why-join-section {
            background: linear-gradient(135deg, var(--ch-dark-slate), #1e293b);
            color: #fff;
        }

        .why-join-card {
            background: rgba(255, 255, 255, .06);
            border: 1px solid rgba(255, 255, 255, .10);
            border-radius: 20px;
            padding: 1.5rem;
            height: 100%;
        }

        .why-join-number {
            color: var(--ch-yellow);
            font-family: 'Bebas Neue', sans-serif;
            font-size: 3rem;
            line-height: 1;
        }

        @media (max-width: 576px) {

            .how-start-card,
            .bonus-card,
            .info-card,
            .shipping-card,
            .encash-card {
                padding: 1.25rem;
                border-radius: 18px;
            }
        }

        /* --- EVENT GALLERY & PAYMENT PROOF SCROLL --- */
        .gallery-wrapper {
            max-width: 1600px;
            margin: 0 auto;
        }

        .gallery-track {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            padding-bottom: 2.5rem;
            -ms-overflow-style: none;
            scrollbar-width: none;
            width: 100%;
            scroll-padding-left: 1.5rem;
        }

        .gallery-track::-webkit-scrollbar {
            display: none;
        }

        /* Glassmorphism Gallery Items */
        .gallery-item {
            flex: 0 0 auto;
            width: 280px;
            height: 380px;
            scroll-snap-align: center;
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            position: relative;
            cursor: pointer;
            border: 2px solid rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        /* Glassmorphism Payment Proof Cards */
        .payment-proof-item {
            flex: 0 0 auto;
            width: 240px;
            scroll-snap-align: center;
            height: 100%;
        }

        .payment-proof-card {
            position: relative;
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 1.25rem;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            cursor: zoom-in;
        }

        .payment-proof-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.15);
            border-color: var(--ch-teal);
        }

        .payment-proof-card img {
            width: 100%;
            aspect-ratio: 9 / 13;
            object-fit: cover;
            display: block;
        }

        .payment-proof-caption {
            padding: 1rem 0.8rem;
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--ch-dark-slate);
            text-align: center;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            border-top: 1px solid rgba(255, 255, 255, 0.4);
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @media (min-width: 768px) {
            .gallery-item {
                width: 320px;
                height: 420px;
            }

            .payment-proof-item {
                width: 280px;
            }
        }

        @media (max-width: 575.98px) {
            .payment-proof-item {
                width: 200px;
            }
        }

        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .gallery-item:hover img {
            transform: scale(1.08);
        }

        .gallery-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding-bottom: 1.5rem;
        }

        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }

        .gallery-overlay i {
            color: #fff;
            font-size: 2rem;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay i {
            transform: translateY(0);
        }


        /* =========================================================
           GLOBAL MODAL OPEN - SCROLL LOCK
           ========================================================= */
        html.global-modal-open,
        html.global-modal-open body {
            overflow: hidden !important;
            overscroll-behavior: none !important;
        }

        html.global-modal-open body {
            width: 100% !important;
        }

        /* Combined Modal Selectors for Infinite Community Format */
        #productReceivedModal,
        #paymentProofModal,
        #momentsHighlightsModal {
            overflow: hidden !important;
            overscroll-behavior: none !important;
            padding-left: 0 !important;
        }

        #productReceivedModal .modal-dialog,
        #paymentProofModal .modal-dialog,
        #momentsHighlightsModal .modal-dialog {
            max-width: 1150px;
            height: calc(100vh - 40px);
            max-height: calc(100vh - 40px);
            margin: 20px auto;
            overflow: hidden !important;
        }

        .product-received-section {
            background: var(--ch-bg-light);
        }

        .product-received-card {
            position: relative;
            width: 100%;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 18px;
            background: var(--ch-white);
            box-shadow: 0 10px 30px rgba(15, 23, 42, .08);
            cursor: pointer;
        }

        .product-received-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform .5s ease;
        }

        .product-received-card:hover img {
            transform: scale(1.07);
        }

        .product-received-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(15, 23, 42, .35);
            opacity: 0;
            transition: opacity .3s ease;
            color: #fff;
            font-size: 1.5rem;
        }

        .product-received-card:hover .product-received-overlay {
            opacity: 1;
        }

        /* Updated System Theme SEE MORE Button */
        .product-received-see-more {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 14px 32px;
            border: none;
            border-radius: 50px;
            background: var(--ch-teal);
            color: #ffffff;
            font-family: 'Barlow', sans-serif;
            font-size: 1rem;
            font-weight: 800;
            letter-spacing: 1.5px;
            cursor: pointer;
            transition: transform .3s ease, background .3s ease, box-shadow .3s ease;
            box-shadow: 0 8px 20px rgba(20, 184, 166, 0.2);
        }

        .product-received-see-more i {
            font-size: 1.2rem;
            transition: transform .3s ease;
        }

        .product-received-see-more:hover {
            background: var(--ch-dark-slate);
            color: #ffffff;
            transform: translateY(-4px);
            box-shadow: 0 12px 25px rgba(15, 23, 42, 0.25);
        }

        .product-received-see-more:hover i {
            transform: translateX(5px);
        }

        /* Modal Body Constraints */
        #productReceivedModal .modal-content,
        #paymentProofModal .modal-content,
        #momentsHighlightsModal .modal-content {
            height: 100%;
            max-height: 100%;
            border: none;
            border-radius: 24px;
            overflow: hidden !important;
            background: #fff;
            box-shadow: 0 30px 80px rgba(0, 0, 0, .3);
            display: flex;
            flex-direction: column;
        }

        .product-received-modal-header {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 25px 30px;
            border-bottom: 1px solid var(--ch-border);
            background: #fff;
        }

        .product-modal-small-title {
            display: block;
            margin-bottom: 4px;
            color: var(--ch-teal);
            font-size: .7rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .product-received-modal-header h3 {
            margin: 0;
            color: var(--ch-dark-slate);
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            letter-spacing: 1.5px;
        }

        .product-received-modal-header h3 span {
            color: var(--ch-teal);
        }

        .product-received-close {
            width: 45px;
            height: 45px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            border-radius: 50%;
            background: #f1f5f9;
            color: var(--ch-dark-slate);
            font-size: 1rem;
            cursor: pointer;
            transition: background .3s ease, color .3s ease, transform .3s ease;
        }

        .product-received-close:hover {
            background: var(--ch-dark-slate);
            color: #fff;
            transform: rotate(90deg);
        }

        .product-received-modal-body {
            flex: 1 1 0;
            min-height: 0;
            height: 0;
            overflow-y: scroll !important;
            overflow-x: hidden;
            padding: 25px 30px 35px;
            overscroll-behavior: contain;
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
            scrollbar-gutter: stable;
        }

        .product-received-modal-body::-webkit-scrollbar {
            width: 8px;
        }

        .product-received-modal-body::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 20px;
        }

        .product-received-modal-body::-webkit-scrollbar-thumb {
            background: var(--ch-teal);
            border-radius: 20px;
        }

        .product-received-modal-body::-webkit-scrollbar-thumb:hover {
            background: var(--ch-teal-dk);
        }

        .product-modal-image {
            position: relative;
            width: 100%;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 16px;
            background: #f8fafc;
            box-shadow: 0 8px 25px rgba(15, 23, 42, .08);
        }

        .product-modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform .45s ease;
        }

        .product-modal-image:hover img {
            transform: scale(1.06);
        }

        @media (max-width:767.98px) {
            #productReceivedModal,
            #paymentProofModal,
            #momentsHighlightsModal {
                padding: 0 !important;
            }

            #productReceivedModal .modal-dialog,
            #paymentProofModal .modal-dialog,
            #momentsHighlightsModal .modal-dialog {
                width: 100%;
                max-width: none;
                height: 100vh;
                height: 100dvh;
                max-height: 100dvh;
                margin: 0;
                overflow: hidden !important;
            }

            #productReceivedModal .modal-content,
            #paymentProofModal .modal-content,
            #momentsHighlightsModal .modal-content {
                border-radius: 0;
            }

            .product-received-modal-header {
                padding: 18px 20px;
            }

            .product-received-modal-body {
                height: 0;
                padding: 18px 15px 30px;
            }

            .product-received-close {
                width: 40px;
                height: 40px;
            }

            .product-modal-image {
                border-radius: 12px;
            }

            .product-received-see-more {
                padding: 13px 25px;
            }
        }
    </style>

</head>

<body class="is-loading">

    <!-- PRELOADER -->
    <div id="infinite-preloader">
        <div class="preloader-content">
            <span class="preloader-brand">INFINITE</span>
            <span class="preloader-slogan">WORLD PLAN SYSTEM</span>
            <div class="preloader-line"></div>
        </div>
    </div>

    <?php include 'header.php'; ?>

    <!-- HERO SECTION -->
    <section class="world-hero">
        <div class="container text-center position-relative z-1">
            <span class="section-tag" style="color: #5eead4;">Global Business Opportunity</span>
            <p class="ola-script mt-2">/world-plan/</p>
            <h1 class="ola-hero-title">BUILD GLOBALLY. EARN LIMITLESSLY.</h1>
            <p class="fs-5 text-white-50 mx-auto mt-3" style="max-width: 780px; line-height: 1.8;">
                ONE WORLD. ONE PLAN. ENDLESS POSSIBILITIES. Experience seamless cross-border multi-currency earnings powered by our binary matching platform.
            </p>

            <!-- DYNAMIC CURRENCY SWITCHER TOOLBAR -->
            <div class="mt-4 pt-2">
                <div class="small fw-bold text-uppercase text-light mb-2" style="letter-spacing: 1.5px; opacity: 0.8;">Select Currency View:</div>
                <div class="currency-switcher-wrapper">
                    <button type="button" class="currency-btn" id="btn-php" onclick="switchCurrency('PHP')">
                        <img src="https://flagcdn.com/w40/ph.png" alt="PHP"> PHP (₱)
                    </button>
                    <button type="button" class="currency-btn" id="btn-usd" onclick="switchCurrency('USD')">
                        <img src="https://flagcdn.com/w40/us.png" alt="USD"> USD ($)
                    </button>
                    <button type="button" class="currency-btn active" id="btn-kina" onclick="switchCurrency('KINA')">
                        <img src="https://flagcdn.com/w40/pg.png" alt="KINA"> PGK
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- HOW TO START WITH INFINITE -->
    <section class="section-pad world-info-band">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Your First Steps</span>
                <h2 class="section-title">HOW TO START WITH <span style="color: var(--ch-teal);">INFINITE</span></h2>
                <p class="text-muted mx-auto" style="max-width: 720px;">Start with a package that fits your budget and goals, activate your account, receive your products, and begin building your business.</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="how-start-card">
                        <div class="step-number">01</div>
                        <h5 class="fw-bold">Choose Your Package</h5>
                        <p class="text-muted small mb-0">Select the WorldPlan package that best fits your budget and business goals.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="how-start-card">
                        <div class="step-number">02</div>
                        <h5 class="fw-bold">Activate Your Account</h5>
                        <p class="text-muted small mb-0">Complete your registration after your payment is confirmed.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="how-start-card">
                        <div class="step-number">03</div>
                        <h5 class="fw-bold">Receive Your Products</h5>
                        <p class="text-muted small mb-0">Your package products are prepared and processed for shipment to PNG.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-3">
                    <div class="how-start-card">
                        <div class="step-number">04</div>
                        <h5 class="fw-bold">Start & Grow</h5>
                        <p class="text-muted small mb-0">Use, share, retail, and build your network with the INFINITE opportunity.</p>
                    </div>
                </div>
            </div>
            <div class="lifetime-strip mt-4 text-center"><i class="fa-solid fa-infinity me-2" style="color: var(--ch-yellow);"></i><strong>ONE-TIME LIFETIME INVESTMENT</strong><span class="d-block d-md-inline ms-md-2 text-white-50">No monthly package purchases are required. Choose your package and take your first step with INFINITE.</span></div>
        </div>
    </section>

    <!-- SECTION I: TERMINOLOGY & DEFINITIONS -->
    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Fundamentals</span>
                <h2 class="section-title">Terminology & <span style="color: var(--ch-teal);">Official Classifications</span></h2>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm">
                        <div class="d-flex align-items-center mb-3">
                            <div class="rounded-circle p-3 me-3" style="background: rgba(20, 184, 166, 0.1); color: var(--ch-teal);">
                                <i class="fa-solid fa-user-plus fs-3"></i>
                            </div>
                            <h5 class="fw-bold mb-0" style="color: var(--ch-dark-slate);">Sign-Up Points</h5>
                        </div>
                        <p class="text-muted small mb-0" style="line-height: 1.7;">The Enroller Bonus or Direct Referral Bonus equivalent awarded whenever a wholesaler signs up a new wholesaler under the World Plan.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm">
                        <div class="d-flex align-items-center mb-3">
                            <div class="rounded-circle p-3 me-3" style="background: rgba(245, 158, 11, 0.1); color: var(--ch-yellow);">
                                <i class="fa-solid fa-coins fs-3"></i>
                            </div>
                            <h5 class="fw-bold mb-0" style="color: var(--ch-dark-slate);">World Bonus Points</h5>
                        </div>
                        <p class="text-muted small mb-0" style="line-height: 1.7;">(WBP) Package points used to compute matching bonuses. Serves as the base payout denomination subject to prevailing conversion rates.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm">
                        <div class="d-flex align-items-center mb-3">
                            <div class="rounded-circle p-3 me-3" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                                <i class="fa-solid fa-network-wired fs-3"></i>
                            </div>
                            <h5 class="fw-bold mb-0" style="color: var(--ch-dark-slate);">WBP Match</h5>
                        </div>
                        <p class="text-muted small mb-0" style="line-height: 1.7;">The points-matching bonus earned whenever WBP from your Left and Right sales groups match under the step-up structure.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm">
                        <div class="d-flex align-items-center mb-3">
                            <div class="rounded-circle p-3 me-3" style="background: rgba(236, 72, 153, 0.1); color: #ec4899;">
                                <i class="fa-solid fa-calendar-check fs-3"></i>
                            </div>
                            <h5 class="fw-bold mb-0" style="color: var(--ch-dark-slate);">World Subscription</h5>
                        </div>
                        <p class="text-muted small mb-0" style="line-height: 1.7;">Monthly active subscription made 1 month in advance. FREE for the first two calendar months upon registration month.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION I.II: RETAILING (KINA EXCLUSIVE) -->
    <section class="section-pad" id="kina-retailing-section" style="display: none; background: #ffffff;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">How To Earn</span>
                <h2 class="section-title">Direct <span style="color: var(--ch-teal);">Retailing</span></h2>
                <p class="text-muted mx-auto" style="max-width: 600px;">Enjoy huge profit margins by purchasing products at a member discount and selling them at standard retail prices.</p>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- BARLEY -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm text-center position-relative retail-card">
                        <div class="product-img-container mx-auto mb-3" style="height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
                            <div style="position: absolute; width: 100px; height: 100px; background: rgba(16, 185, 129, 0.15); border-radius: 50%; filter: blur(20px); z-index: 0;"></div>
                            <img src="./assets/image/Ley.png" alt="Infinite Barley" class="retail-product-img" style="max-height: 100%; width: auto; object-fit: contain; z-index: 1; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15)); transition: transform 0.4s ease;">
                        </div>
                        <h4 class="fw-bold mb-1" style="color: var(--ch-dark-slate);">INFINITE BARLEY</h4>
                        <span class="badge bg-light text-muted border px-3 py-1 mb-3">10 Sachets / Box</span>

                        <div class="d-flex flex-column align-items-center gap-2 mt-2">
                            <div class="w-100 p-2 rounded bg-light border">
                                <small class="text-muted text-uppercase fw-bold" style="font-size: 0.75rem;">Non Member Price</small>
                                <div class="fs-5 text-danger">PGK 150</div>
                            </div>
                            <div class="w-100 p-2 rounded border" style="background: rgba(20, 184, 166, 0.05); border-color: rgba(20, 184, 166, 0.2) !important;">
                                <small class="text-teal text-uppercase fw-bold" style="color: var(--ch-teal); font-size: 0.75rem;">Member Price</small>
                                <div class="fs-3 fw-bold" style="color: var(--ch-dark-slate);">PGK 85</div>
                            </div>
                        </div>

                        <div class="mt-3 pt-3 border-top">
                            <small class="fw-bold text-success"><i class="fa-solid fa-arrow-trend-up me-1"></i> Retail Profit: PGK 65</small>
                        </div>
                    </div>
                </div>

                <!-- ROBUSTUS -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm text-center position-relative retail-card">
                        <div class="product-img-container mx-auto mb-3" style="height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
                            <div style="position: absolute; width: 100px; height: 100px; background: rgba(245, 158, 11, 0.15); border-radius: 50%; filter: blur(20px); z-index: 0;"></div>
                            <img src="./assets/image/blackco.png" alt="Robustus Coffee" class="retail-product-img" style="max-height: 100%; width: auto; object-fit: contain; z-index: 1; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15)); transition: transform 0.4s ease;">
                        </div>
                        <h4 class="fw-bold mb-1" style="color: var(--ch-dark-slate);">ROBUSTUS COFFEE</h4>
                        <span class="badge bg-light text-muted border px-3 py-1 mb-3">10 Sachets / Box</span>

                        <div class="d-flex flex-column align-items-center gap-2 mt-2">
                            <div class="w-100 p-2 rounded bg-light border">
                                <small class="text-muted text-uppercase fw-bold" style="font-size: 0.75rem;">Non Member Price</small>
                                <div class="fs-5 text-danger">PGK 70</div>
                            </div>
                            <div class="w-100 p-2 rounded border" style="background: rgba(20, 184, 166, 0.05); border-color: rgba(20, 184, 166, 0.2) !important;">
                                <small class="text-teal text-uppercase fw-bold" style="color: var(--ch-teal); font-size: 0.75rem;">Member Price</small>
                                <div class="fs-3 fw-bold" style="color: var(--ch-dark-slate);">PGK 45</div>
                            </div>
                        </div>

                        <div class="mt-3 pt-3 border-top">
                            <small class="fw-bold text-success"><i class="fa-solid fa-arrow-trend-up me-1"></i> Retail Profit: PGK 25</small>
                        </div>
                    </div>
                </div>

                <!-- GLUTA -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="p-4 bg-white rounded-4 h-100 border shadow-sm text-center position-relative retail-card">
                        <div class="product-img-container mx-auto mb-3" style="height: 160px; display: flex; align-items: center; justify-content: center; position: relative;">
                            <div style="position: absolute; width: 100px; height: 100px; background: rgba(236, 72, 153, 0.15); border-radius: 50%; filter: blur(20px); z-index: 0;"></div>
                            <img src="./assets/image/Plus.png" alt="Whiteplus Gluta" class="retail-product-img" style="max-height: 100%; width: auto; object-fit: contain; z-index: 1; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15)); transition: transform 0.4s ease;">
                        </div>
                        <h4 class="fw-bold mb-1" style="color: var(--ch-dark-slate);">WHITEPLUS GLUTA</h4>
                        <span class="badge bg-light text-muted border px-3 py-1 mb-3">30 Capsules / Bottle</span>

                        <div class="d-flex flex-column align-items-center gap-2 mt-2">
                            <div class="w-100 p-2 rounded bg-light border">
                                <small class="text-muted text-uppercase fw-bold" style="font-size: 0.75rem;">Non Member Price</small>
                                <div class="fs-5 text-danger">PGK 250</div>
                            </div>
                            <div class="w-100 p-2 rounded border" style="background: rgba(20, 184, 166, 0.05); border-color: rgba(20, 184, 166, 0.2) !important;">
                                <small class="text-teal text-uppercase fw-bold" style="color: var(--ch-teal); font-size: 0.75rem;">Member Price</small>
                                <div class="fs-3 fw-bold" style="color: var(--ch-dark-slate);">PGK 150</div>
                            </div>
                        </div>

                        <div class="mt-3 pt-3 border-top">
                            <small class="fw-bold text-success"><i class="fa-solid fa-arrow-trend-up me-1"></i> Retail Profit: PGK 100</small>
                        </div>
                    </div>
                </div>
            </div>


            <div class="lifetime-strip mt-4 text-center mx-auto" style="max-width: 860px; background: linear-gradient(135deg, var(--ch-teal-dk), var(--ch-dark-slate));">
                <strong><i class="fa-solid fa-percent me-2" style="color: var(--ch-yellow);"></i>30% MEMBER DISCOUNT</strong>
                <span class="d-block d-md-inline ms-md-2 text-white-50">As a member, you enjoy discounted product pricing. Example: every qualifying Barley sale can generate up to PGK 65 retail profit.</span>
            </div>

            <!-- NEW CTA FOR PRODUCTS -->
            <div class="mt-5 pt-3 text-center">
                <a href="barley.php" class="btn btn-lg shadow fw-bold px-5 py-3" style="background: var(--ch-teal); color: #fff; border-radius: 50px; border: none; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                    Learn more about our products <i class="bi bi-arrow-right ms-2"></i>
                </a>
            </div>

        </div>
    </section>

    <!-- SECTION I.V: WORLD PLAN OPTION (PHILIPPINES PACKAGES) -->
    <section class="section-pad bg-white" id="php-packages-section" style="display: none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">World Plan Option</span>
                <h2 class="section-title">Philippine <span style="color: var(--ch-teal);">Packages</span></h2>
                <p class="text-muted mx-auto" style="max-width: 600px;">Choose from our official Philippine wholesale package options to activate your business and maximize your earning potential.</p>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- PHP STARTER -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-starter">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-seedling"></i></div>
                            <div class="text-center mb-3">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD STARTER</h4>
                                <span class="badge bg-light text-muted border px-3 py-1 mb-2">ALL INFINITE OPTION 1</span>
                                <div class="package-price">₱ 3,000</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm" style="font-size: 0.9rem;">Product Worth: <span style="color: var(--card-color); font-weight: 800;">₱ 3,200</span></div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Glow Up Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Deowhite Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 Infinite Botox Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Brightening Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 Infinite White Body Lotion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHP BASIC (BEST SELLER) -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-basic best-seller">
                        <div class="best-seller-badge"><i class="fa-solid fa-star text-warning me-1"></i> BEST SELLER</div>
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-leaf"></i></div>
                            <div class="text-center mb-3">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD BASIC</h4>
                                <span class="badge bg-light text-muted border px-3 py-1 mb-2">ALL INFINITE OPTION 1</span>
                                <div class="package-price">₱ 8,880</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm" style="font-size: 0.9rem;">Product Worth: <span style="color: var(--card-color); font-weight: 800;">₱ 9,400</span></div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Whiteplus Glutathione</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Infinite Glow Up Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Infinite Deowhite Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Botox Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Infinite Brightening Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite White Body Lotion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHP ADVANCE -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-advance">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-fire"></i></div>
                            <div class="text-center mb-3">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD ADVANCE</h4>
                                <span class="badge bg-light text-muted border px-3 py-1 mb-2">PREMIUM SKIN CARE SET</span>
                                <div class="package-price">₱ 18,880</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Product Worth: <span style="color: var(--card-color); font-weight: 800;">₱ 20,400</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 O'Lamour Facial Essence</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 O'Lamour CoreLaCreme</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 O'Lamour Quintessence Ampoule</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 O'Lamour PrimeRenew BB Cream</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHP PRO -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-pro">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-gem"></i></div>
                            <div class="text-center mb-3">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD PRO</h4>
                                <span class="badge bg-light text-muted border px-3 py-1 mb-2">PREMIUM SKIN CARE SET</span>
                                <div class="package-price">₱ 49,800</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Product Worth: <span style="color: var(--card-color); font-weight: 800;">₱ 58,500</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> 1 Star Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 4 O'Lamour Facial Essence</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 4 O'Lamour CoreLaCreme</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 4 O'Lamour Quintessence Ampoule</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 9 O'Lamour PrimeRenew BB Cream</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHP SUPREME -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-supreme">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-crown"></i></div>
                            <div class="text-center mb-3">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD SUPREME</h4>
                                <span class="badge bg-light text-muted border px-3 py-1 mb-2">PREMIUM SKIN CARE SET</span>
                                <div class="package-price">₱ 125,000</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Product Worth: <span style="color: var(--card-color); font-weight: 800;">₱ 150,900</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> 2 Star Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 11 O'Lamour Facial Essence</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 11 O'Lamour CoreLaCreme</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 11 O'Lamour Quintessence Ampoule</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 20 O'Lamour PrimeRenew BB Cream</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION I.V: WORLD PLAN OPTION (USD PACKAGES) -->
    <section class="section-pad bg-white" id="usd-packages-section" style="display: none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">World Plan Option</span>
                <h2 class="section-title">Global USD <span style="color: var(--ch-teal);">Packages</span></h2>
                <p class="text-muted mx-auto" style="max-width: 600px;">Choose the perfect starting package to launch your global business and maximize your earning potential.</p>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- USD STARTER -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-starter best-seller">
                        <div class="best-seller-badge"><i class="fa-solid fa-star text-warning me-1"></i> BEST SELLER</div>
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-seedling"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD STARTER</h4>
                                <div class="package-price">$60</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">To Be Added</span></div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 2;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Glow Up Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Deowhite Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 Infinite Botox Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Brightening Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 Infinite White Body Lotion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- USD BASIC -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-basic">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-leaf"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD BASIC</h4>
                                <div class="package-price">$189</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">To Be Added</span></div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 2;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Whiteplus Glutathione</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Infinite Glow Up Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Infinite Deowhite Soap</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Botox Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Infinite Brightening Serum</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite White Body Lotion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- USD ADVANCE -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-advance">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-fire"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD ADVANCE</h4>
                                <div class="package-price">$359</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">To Be Added</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 2;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 O'Lamour Facial Essence</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 O'Lamour CoreLaCreme</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 O'Lamour Quintessence Ampoule</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 O'Lamour PrimeRenew BB Cream</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- USD PRO -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-pro">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-gem"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD PRO</h4>
                                <div class="package-price">$929</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">To Be Added</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> 1 Star Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 4 O'Lamour Facial Essence</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 4 O'Lamour CoreLaCreme</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 4 O'Lamour Quintessence Ampoule</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 9 O'Lamour PrimeRenew BB Cream</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- USD SUPREME -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-supreme">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-crown"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD SUPREME</h4>
                                <div class="package-price">$2,229</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">To Be Added</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> 2 Star Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1 mt-3">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 11 O'Lamour Facial Essence</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 11 O'Lamour CoreLaCreme</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 11 O'Lamour Quintessence Ampoule</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 20 O'Lamour PrimeRenew BB Cream</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION I.V: WORLD PLAN OPTION (PNG PACKAGES) -->
    <section class="section-pad bg-white" id="png-packages-section" style="display: none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">World Plan Option</span>
                <h2 class="section-title">Papua New Guinea <span style="color: var(--ch-teal);">Packages</span></h2>
                <p class="text-muted mx-auto" style="max-width: 600px;">Choose the perfect starting package to launch your global business and maximize your earning potential.</p>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- PNG STARTER -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-starter best-seller">
                        <div class="best-seller-badge"><i class="fa-solid fa-star text-warning me-1"></i> BEST SELLER</div>
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-seedling"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD STARTER</h4>
                                <div class="package-price">PGK 299</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">PGK 360</span></div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 2;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 3 Robustus Coffee</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 1 Infinite Barley</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PNG BASIC -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-basic">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-leaf"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD BASIC</h4>
                                <div class="package-price">PGK 880</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">PGK 1,150</span></div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 2;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 5 Robustus Coffee</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Whiteplus Glutathione</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 2 Infinite Barley</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PNG ADVANCE -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-advance">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-fire"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD ADVANCE</h4>
                                <div class="package-price">PGK 1,599</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">PGK 2,550</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 2;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 15 Robustus Coffee</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 10 Infinite Barley</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PNG PRO -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-pro">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-gem"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD PRO</h4>
                                <div class="package-price">PGK 5,199</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">PGK 7,140</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> 1 Star Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 22 INFINITE Robustus</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 14 INFINITE Barley</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 14 WHITEPLUS Glutathione</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PNG SUPREME -->
                <div class="col-12 col-md-6 col-xl-4">
                    <div class="pricing-card tier-supreme">
                        <div class="pricing-content">
                            <div class="package-icon-wrapper"><i class="fa-solid fa-crown"></i></div>
                            <div class="text-center mb-4">
                                <h4 class="fw-bold" style="color: var(--ch-dark-slate); letter-spacing: 1px;">WORLD SUPREME</h4>
                                <div class="package-price">PGK 12,599</div>
                                <div class="badge bg-light text-dark border p-2 w-100 shadow-sm mb-2" style="font-size: 0.9rem;">Total Worth: <span style="color: var(--card-color); font-weight: 800;">PGK 18,700</span></div>
                                <div class="rank-status-badge"><i class="fa-solid fa-crown me-1"></i> 2 Star Executive Rank Status</div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-3" style="color: var(--ch-slate-muted); text-transform: uppercase; font-size: 0.85rem;">Package Inclusions:</h6>
                                <ul class="list-unstyled mb-0" style="line-height: 1.9;">
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 60 INFINITE Robustus</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 40 INFINITE Barley</li>
                                    <li><i class="bi bi-check-circle-fill me-2" style="color: var(--card-color);"></i> 34 WHITEPLUS Glutathione</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lifetime-strip mt-4 text-center mx-auto" style="max-width: 900px;">
            <i class="fa-solid fa-infinity me-2" style="color: var(--ch-yellow);"></i><strong>ONE-TIME LIFETIME INVESTMENT</strong>
            <span class="d-block d-md-inline ms-md-2 text-white-50">Every package includes products you can use, share, or resell. There are no monthly package purchases required.</span>
        </div>

    </section>





    <!-- PHP / USD MEMBER BENEFITS + INFINITE EXECUTIVE PROGRAM -->
    <section class="section-pad" id="php-usd-member-benefits-section" style="display:none;">
        <div class="container">
            <div class="member-benefits-card">
                <div class="member-benefits-heading">
                    <i class="fa-solid fa-star benefit-star" aria-hidden="true"></i>
                    <h3>MEMBER BENEFITS</h3>
                </div>

                <ul class="member-benefits-list">
                    <li>
                        <span class="benefit-check"><i class="fa-solid fa-check"></i></span>
                        <span><strong>30% Discount</strong> on all INFINITE Products.</span>
                    </li>
                    <li>
                        <span class="benefit-check"><i class="fa-solid fa-check"></i></span>
                        <span><strong>Instant Value:</strong> Product package value is higher than your investment.</span>
                    </li>
                    <li>
                        <span class="benefit-check"><i class="fa-solid fa-check"></i></span>
                        <span><strong>Personal Online Dashboard:</strong> Monitor sales, team growth, and commissions in real time.</span>
                    </li>
                    <li>
                        <span class="benefit-check"><i class="fa-solid fa-check"></i></span>
                        <span><strong>Travel &amp; Rewards:</strong> Qualify for local/international travel and leadership incentives.</span>
                    </li>
                    <li>
                        <span class="benefit-check"><i class="fa-solid fa-check"></i></span>
                        <span><strong>Mentorship:</strong> Access online trainings, webinars, and coaching.</span>
                    </li>
                </ul>

                <div class="executive-program-card">
                    <div class="executive-program-icon" aria-hidden="true">
                        <i class="fa-solid fa-plane-departure"></i>
                    </div>
                    <div>
                        <h3>INFINITE Executive Program</h3>
                        <p>
                            The INFINITE Executive Program rewards your leadership and results with powerful incentives like
                            <strong>FREE latest gadgets</strong>, a <strong>FREE Europe trip</strong> (all expenses paid),
                            and even a <strong>FREE car</strong> — built for those ready to win bigger.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- PHP ENROLLER BONUS -->
    <section class="section-pad world-info-band" id="php-enroller-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Direct Enrollment</span>
                <h2 class="section-title">EARN YOUR <span style="color: var(--ch-teal);">ENROLLER BONUS</span></h2>
                <p class="text-muted mx-auto" style="max-width:700px;">Earn an Enroller Bonus every time you personally enroll a new member. The bonus is based on the package your personally enrolled member chooses.</p>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Starter</div>
                        <div class="bonus-amount">₱300</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Basic</div>
                        <div class="bonus-amount">₱500</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Advance</div>
                        <div class="bonus-amount">₱2,000</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Pro</div>
                        <div class="bonus-amount">₱5,000</div>
                    </div>
                </div>
            </div>
            <div class="info-card mt-4 text-center mx-auto" style="max-width:760px;"><span class="section-tag">Simple Example</span>
                <h5 class="fw-bold mt-2">Personally enroll 5 World Starter members</h5>
                <div class="fs-4 fw-bold" style="color:var(--ch-teal-dk);">5 × ₱300 = ₱1,500</div>
                <p class="text-muted small mb-0 mt-2">Your Enroller Bonus is based on the package purchased by the member you personally enrolled.</p>
            </div>
        </div>
    </section>

    <!-- USD ENROLLER BONUS -->
    <section class="section-pad world-info-band" id="usd-enroller-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Direct Enrollment</span>
                <h2 class="section-title">EARN YOUR <span style="color: var(--ch-teal);">ENROLLER BONUS</span></h2>
                <p class="text-muted mx-auto" style="max-width:700px;">Earn an Enroller Bonus every time you personally enroll a new member. The bonus is based on the package your personally enrolled member chooses.</p>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Starter</div>
                        <div class="bonus-amount">$5</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Basic</div>
                        <div class="bonus-amount">$15</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Advance</div>
                        <div class="bonus-amount">$33</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Pro</div>
                        <div class="bonus-amount">$89</div>
                    </div>
                </div>
            </div>
            <div class="info-card mt-4 text-center mx-auto" style="max-width:760px;"><span class="section-tag">Simple Example</span>
                <h5 class="fw-bold mt-2">Personally enroll 5 World Starter members</h5>
                <div class="fs-4 fw-bold" style="color:var(--ch-teal-dk);">5 × $5 = $25</div>
                <p class="text-muted small mb-0 mt-2">Your Enroller Bonus is based on the package purchased by the member you personally enrolled.</p>
            </div>
        </div>
    </section>

    <!-- PNG ENROLLER BONUS -->
    <section class="section-pad world-info-band" id="kina-enroller-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Direct Enrollment</span>
                <h2 class="section-title">EARN YOUR <span style="color: var(--ch-teal);">ENROLLER BONUS</span></h2>
                <p class="text-muted mx-auto" style="max-width:700px;">Earn an Enroller Bonus every time you personally enroll a new member. The bonus is based on the package your personally enrolled member chooses.</p>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Starter</div>
                        <div class="bonus-amount">PGK 25</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Basic</div>
                        <div class="bonus-amount">PGK 60</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Advance</div>
                        <div class="bonus-amount">PGK 160</div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="bonus-card text-center">
                        <div class="small fw-bold text-uppercase text-muted">World Pro</div>
                        <div class="bonus-amount">PGK 410</div>
                    </div>
                </div>
            </div>
            <div class="info-card mt-4 text-center mx-auto" style="max-width:760px;"><span class="section-tag">Simple Example</span>
                <h5 class="fw-bold mt-2">Personally enroll 5 World Starter members</h5>
                <div class="fs-4 fw-bold" style="color:var(--ch-teal-dk);">5 × PGK 25 = PGK 125</div>
                <p class="text-muted small mb-0 mt-2">Your Enroller Bonus is based on the package purchased by the member you personally enrolled.</p>
            </div>
        </div>
    </section>

    <!-- SECTION II: ORGANIZATIONAL CHART (BINARY TREE VISUALIZER) -->
    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Interactive Visualizer</span>
                <h2 class="section-title">Direct Referral & <span style="color: var(--ch-teal);">Binary Structure</span></h2>
                <p class="text-muted mx-auto" style="max-width: 650px;">
                    Simulate how new team members on your Left and Right sales groups instantly generate sign-up and matching bonuses in your active currency.
                </p>

                <!-- Tier selection for visualizer -->
                <div class="btn-group mt-3 flex-wrap justify-content-center" role="group" aria-label="Tier Selector">
                    <button type="button" class="btn btn-outline-dark fw-bold btn-sm active px-3" id="chart-tier-starter" onclick="setChartTier('STARTER')">Starter Tier</button>
                    <button type="button" class="btn btn-outline-dark fw-bold btn-sm px-3" id="chart-tier-basic" onclick="setChartTier('BASIC')">Basic Tier</button>
                    <button type="button" class="btn btn-outline-dark fw-bold btn-sm px-3" id="chart-tier-advance" onclick="setChartTier('ADVANCE')">Advance Tier</button>
                    <button type="button" class="btn btn-outline-dark fw-bold btn-sm px-3" id="chart-tier-pro" onclick="setChartTier('PRO')">Pro Tier</button>
                    <button type="button" class="btn btn-outline-dark fw-bold btn-sm px-3" id="chart-tier-supreme" onclick="setChartTier('SUPREME')">Supreme Tier</button>
                </div>
            </div>

            <!-- BINARY ORGANIZATIONAL CHART -->
            <div class="org-chart-card">
                <div class="org-chart-container">

                    <!-- TOP NODE: YOU -->
                    <div class="org-node mb-2">
                        <div class="avatar-box you">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <span class="node-tag you-tag"><i class="fa-solid fa-crown me-1"></i> YOU</span>
                    </div>

                    <!-- VERTICAL CONNECTOR LINE -->
                    <div class="tree-line-v"></div>

                    <!-- HORIZONTAL CONNECTOR WRAPPER -->
                    <div class="tree-line-h-wrapper">
                        <div class="tree-line-h"></div>
                        <div class="tree-line-down-left"></div>
                        <div class="tree-line-down-right"></div>

                        <!-- CENTER ABSOLUTE BADGE (MATCHING BONUS) -->
                        <div class="match-badge-center">
                            <div class="badge rounded-pill p-2 p-md-3 shadow-lg" style="background: rgba(245, 158, 11, 0.95); border: 2px dashed #fff; color: #fff; backdrop-filter: blur(5px);">
                                <i class="fa-solid fa-bolt fs-5 fs-md-4 mb-1 d-block"></i>
                                <span class="small fw-bold text-uppercase d-block" style="font-size: clamp(0.6rem, 2vw, 0.75rem);">1st Match Earned</span>
                                <strong class="text-white" style="font-size: clamp(0.9rem, 3vw, 1.25rem);" id="val-match-center">PGK 12</strong>
                            </div>
                        </div>
                    </div>

                    <!-- BRANCHES: PARTNER A & PARTNER B -->
                    <div class="branches-row">
                        <!-- LEFT SALES GROUP -->
                        <div class="org-node text-center position-relative z-2">
                            <div class="small fw-bold text-uppercase mb-2" style="color: #5eead4; letter-spacing: 1px; font-size: clamp(0.6rem, 2vw, 0.85rem);">Left Sales Group</div>
                            <div class="avatar-box mx-auto">
                                <i class="fa-solid fa-user-nurse"></i>
                            </div>
                            <span class="node-tag">PARTNER A</span>
                            <div class="earn-badge text-center" id="node-left-earn">
                                Sign up Bonus <br> <span class="val-referral fw-bold" style="font-size: clamp(0.8rem, 3vw, 1rem);">PGK 25</span>
                            </div>
                        </div>

                        <!-- RIGHT SALES GROUP -->
                        <div class="org-node text-center position-relative z-2">
                            <div class="small fw-bold text-uppercase mb-2" style="color: #5eead4; letter-spacing: 1px; font-size: clamp(0.6rem, 2vw, 0.85rem);">Right Sales Group</div>
                            <div class="avatar-box mx-auto">
                                <i class="fa-solid fa-user-astronaut"></i>
                            </div>
                            <span class="node-tag">PARTNER B</span>
                            <div class="earn-badge text-center" id="node-right-earn">
                                Sign up Bonus <br> <span class="val-referral fw-bold" style="font-size: clamp(0.8rem, 3vw, 1rem);">PGK 25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- PHP SALES MATCH BONUS EXPLANATION -->
    <section class="section-pad bg-white" id="php-sales-match-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Simple Explanation</span>
                <h2 class="section-title">SALES MATCH <span style="color: var(--ch-teal);">BONUS</span></h2>
                <p class="text-muted mx-auto" style="max-width:760px;">Your package is your earning capacity. It determines the maximum points that can be credited to you per match and the Sales Match Bonus structure you can access.</p>
            </div>
            <div class="row g-3 justify-content-center mb-4">
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>STARTER</span><strong>250</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>BASIC</span><strong>500</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>ADVANCE</span><strong>1,500</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>PRO</span><strong>3,000</strong><small class="text-muted">pts per match</small></div>
                </div>
            </div>
            <div class="row g-4 align-items-stretch">
                <div class="col-12 col-lg-7">
                    <div class="info-card"><span class="section-tag">Example</span>
                        <h4 class="fw-bold mt-2">Starter member enrolls a Basic package</h4>
                        <div class="d-flex flex-column gap-2 mt-3">
                            <div><strong>You:</strong> World Starter → 250-point match capacity</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Your personally enrolled member:</strong> World Basic → 500 points purchased</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Sales Match credit:</strong> capped at your Starter level → only 250 points can be credited for matching volume</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Enroller Bonus:</strong> still based on the member's purchased package → ₱500 for a Basic enrollment</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-5">
                    <div class="info-card h-100" style="background:linear-gradient(135deg,var(--ch-dark-slate),#1e293b); color:#fff;"><i class="fa-solid fa-lightbulb fs-2 mb-3" style="color:var(--ch-yellow);"></i>
                        <h4 class="fw-bold">The key difference</h4>
                        <p class="text-white-50 mb-0">You can earn the Enroller Bonus based on the package your personally enrolled member buys. Your Sales Match Bonus and point capacity are based on your own package level. Upgrade your package to increase your points capacity and unlock higher match potential.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- USD SALES MATCH BONUS EXPLANATION -->
    <section class="section-pad bg-white" id="usd-sales-match-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Simple Explanation</span>
                <h2 class="section-title">SALES MATCH <span style="color: var(--ch-teal);">BONUS</span></h2>
                <p class="text-muted mx-auto" style="max-width:760px;">Your package is your earning capacity. It determines the maximum points that can be credited to you per match and the Sales Match Bonus structure you can access.</p>
            </div>
            <div class="row g-3 justify-content-center mb-4">
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>STARTER</span><strong>250</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>BASIC</span><strong>500</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>ADVANCE</span><strong>1,500</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>PRO</span><strong>3,000</strong><small class="text-muted">pts per match</small></div>
                </div>
            </div>
            <div class="row g-4 align-items-stretch">
                <div class="col-12 col-lg-7">
                    <div class="info-card"><span class="section-tag">Example</span>
                        <h4 class="fw-bold mt-2">Starter member enrolls a Basic package</h4>
                        <div class="d-flex flex-column gap-2 mt-3">
                            <div><strong>You:</strong> World Starter → 250-point match capacity</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Your personally enrolled member:</strong> World Basic → 500 points purchased</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Sales Match credit:</strong> capped at your Starter level → only 250 points can be credited for matching volume</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Enroller Bonus:</strong> still based on the member's purchased package → $15 for a Basic enrollment</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-5">
                    <div class="info-card h-100" style="background:linear-gradient(135deg,var(--ch-dark-slate),#1e293b); color:#fff;"><i class="fa-solid fa-lightbulb fs-2 mb-3" style="color:var(--ch-yellow);"></i>
                        <h4 class="fw-bold">The key difference</h4>
                        <p class="text-white-50 mb-0">You can earn the Enroller Bonus based on the package your personally enrolled member buys. Your Sales Match Bonus and point capacity are based on your own package level. Upgrade your package to increase your points capacity and unlock higher match potential.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SALES MATCH BONUS EXPLANATION -->
    <section class="section-pad bg-white" id="kina-sales-match-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Simple Explanation</span>
                <h2 class="section-title">SALES MATCH <span style="color: var(--ch-teal);">BONUS</span></h2>
                <p class="text-muted mx-auto" style="max-width:760px;">Your package is your earning capacity. It determines the maximum points that can be credited to you per match and the Sales Match Bonus structure you can access.</p>
            </div>
            <div class="row g-3 justify-content-center mb-4">
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>STARTER</span><strong>250</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>BASIC</span><strong>500</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>ADVANCE</span><strong>1,500</strong><small class="text-muted">pts per match</small></div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="points-card"><span>PRO</span><strong>3,000</strong><small class="text-muted">pts per match</small></div>
                </div>
            </div>
            <div class="row g-4 align-items-stretch">
                <div class="col-12 col-lg-7">
                    <div class="info-card"><span class="section-tag">Example</span>
                        <h4 class="fw-bold mt-2">Starter member enrolls a Basic package</h4>
                        <div class="d-flex flex-column gap-2 mt-3">
                            <div><strong>You:</strong> World Starter → 250-point match capacity</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Your personally enrolled member:</strong> World Basic → 500 points purchased</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Sales Match credit:</strong> capped at your Starter level → only 250 points can be credited for matching volume</div>
                            <div class="flow-arrow text-center"><i class="fa-solid fa-arrow-down"></i></div>
                            <div><strong>Enroller Bonus:</strong> still based on the member's purchased package → PGK 60 for a Basic enrollment</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-5">
                    <div class="info-card h-100" style="background:linear-gradient(135deg,var(--ch-dark-slate),#1e293b); color:#fff;"><i class="fa-solid fa-lightbulb fs-2 mb-3" style="color:var(--ch-yellow);"></i>
                        <h4 class="fw-bold">The key difference</h4>
                        <p class="text-white-50 mb-0">You can earn the Enroller Bonus based on the package your personally enrolled member buys. Your Sales Match Bonus and point capacity are based on your own package level. Upgrade your package to increase your points capacity and unlock higher match potential.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION III: WORLD PLAN PRODUCT PACKAGES & STEP-UP MATCHING TABLE -->
    <section class="section-pad bg-white">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag" id="table-curr-tag">Currency: PHP (₱)</span>
                <h2 class="section-title">World Plan Packages & <span style="color: var(--ch-teal);">Step-Up Matching</span></h2>
            </div>

            <div class="glass-table-card mb-4">
                <div class="table-responsive">
                    <table class="table table-custom text-center align-middle">
                        <thead>
                            <tr>
                                <th>Package Tier</th>
                                <th>Package Price</th>
                                <th>Sign-Up Bonus</th>
                                <th>World Bonus Points</th>
                                <th>1st - 5th Match</th>
                                <th>6th - 10th Match</th>
                                <th>11th Match Onwards</th>
                                <th>Cap Per Match</th>
                            </tr>
                        </thead>
                        <tbody id="package-table-body">
                            <!-- Dynamically populated via JS -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- CASH BONUS HIGHLIGHT BOX -->
            <div class="bg-dark text-white rounded-4 p-4 shadow-lg text-center mx-auto" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important; border: 1px solid rgba(255,255,255,0.1); max-width: 800px;">
                <div class="d-flex flex-column align-items-center justify-content-center mb-4">
                    <i class="fa-solid fa-trophy mb-3" style="color: var(--ch-yellow); font-size: 3rem;"></i>
                    <h4 class="fw-bold mb-2" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 6vw, 2.8rem); letter-spacing: 1.5px;">CASH BONUS INCENTIVE</h4>
                    <p class="mb-0 text-white-50" style="max-width: 500px; font-size: clamp(0.9rem, 3vw, 1.1rem);">
                        Directly sign-up <strong>5 World Supreme packages</strong> within the same calendar month.
                    </p>
                </div>
                <div class="badge rounded-pill bg-teal py-3 px-2 font-monospace fw-bold text-center d-block mx-auto text-wrap" style="background: var(--ch-teal); color: #fff; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4); font-size: clamp(1rem, 4vw, 1.5rem); line-height: 1.4; width: 95%; max-width: 600px;" id="cash-bonus-val">
                    + 100,000 WBP (₱100,000)
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION IV: WEEKLY MATCHING CAP TABLE -->
    <section class="section-pad" style="background: var(--ch-bg-light);">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Earnings Ceiling</span>
                <h2 class="section-title">Weekly Matching <span style="color: var(--ch-teal);">Cap Structure</span></h2>
            </div>

            <div class="glass-table-card">
                <div class="table-responsive">
                    <table class="table table-custom text-center align-middle">
                        <thead>
                            <tr>
                                <th>Package Tier</th>
                                <th>Standard Cap</th>
                                <th>Executive Status Cap</th>
                                <th>Managing Executive Cap</th>
                            </tr>
                        </thead>
                        <tbody id="cap-table-body">
                            <!-- Dynamically populated via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION V: REQUIREMENTS & TERMS -->
    <section class="section-pad bg-white">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Guidelines</span>
                <h2 class="section-title">Requirements & <span style="color: var(--ch-teal);">Payout Systems</span></h2>
            </div>

            <div class="row g-4">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="p-4 rounded-4 border bg-white shadow-sm h-100">
                        <i class="fa-solid fa-user-shield fs-1 mb-3" style="color: var(--ch-teal);"></i>
                        <h4 class="fw-bold mb-2">Infinite Ambassador</h4>
                        <p class="text-muted small" style="line-height: 1.7;">Direct 3 new World Plan sign-ups within 2 levels lower World Plan package class.</p>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4">
                    <div class="p-4 rounded-4 border bg-white shadow-sm h-100">
                        <i class="fa-solid fa-wallet fs-1 mb-3" style="color: #3b82f6;"></i>
                        <h4 class="fw-bold mb-2">WISE Ecosystem Payout</h4>
                        <p class="text-muted small" style="line-height: 1.7;">Seamless multi-currency payout crediting via Wise Bank details. Payout follows real-time Wise exchange rates with 1 banking day crediting upon processing.</p>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4">
                    <div class="p-4 rounded-4 border bg-white shadow-sm h-100">
                        <i class="fa-solid fa-building-columns fs-1 mb-3" style="color: var(--ch-yellow-dk);"></i>
                        <h4 class="fw-bold mb-2">Local Banking & Cut-offs</h4>
                        <p class="text-muted small" style="line-height: 1.7;">
                            Weekly Cap Cut-off: Sunday 23:59 PM Manila Time.<br>
                            Daily Encashment: Mon-Thu. Weekend cut-offs credit on Tuesday Manila time.<br>
                            Admin Processing Fee: 10% | Redemption Fee: 30 WBP.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- PHP DAILY ENCASHMENT -->
    <section class="section-pad world-info-band" id="php-encashment-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Bonus Payout</span>
                <h2 class="section-title">DAILY <span style="color:var(--ch-teal);">ENCASHMENT</span></h2>
                <p class="text-muted mx-auto" style="max-width:720px;">Register your Wise bank details in your HelloInfinity World Plan profile to receive eligible Sales Bonus encashments with multi-currency support.</p>
            </div>
            <div class="row g-4 align-items-stretch">
                <div class="col-12 col-lg-5">
                    <div class="encash-card h-100">
                        <h4 class="fw-bold"><i class="fa-solid fa-wallet me-2" style="color:var(--ch-teal);"></i>How it works</h4>
                        <ol class="text-muted mb-0 ps-3" style="line-height:2;">
                            <li>Register your Wise bank details in your HelloInfinity World Plan profile.</li>
                            <li>Submit your eligible Sales Bonus encashment.</li>
                            <li>Bonuses are credited based on the applicable Wise exchange rate.</li>
                        </ol>
                    </div>
                </div>
                <div class="col-12 col-lg-7">
                    <div class="encash-card h-100">
                        <h4 class="fw-bold">Encashment cut-off: Monday–Thursday</h4>
                        <div class="table-responsive">
                            <table class="table cutoff-table mb-2">
                                <thead>
                                    <tr>
                                        <th>Encashment Day</th>
                                        <th>Expected Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monday</td>
                                        <td>Tuesday</td>
                                    </tr>
                                    <tr>
                                        <td>Tuesday</td>
                                        <td>Wednesday</td>
                                    </tr>
                                    <tr>
                                        <td>Wednesday</td>
                                        <td>Thursday</td>
                                    </tr>
                                    <tr>
                                        <td>Thursday</td>
                                        <td>Friday</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="small text-muted"><strong>Friday, Saturday & Sunday:</strong> treated as the Monday cut-off and credited on Tuesday.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- USD DAILY ENCASHMENT -->
    <section class="section-pad world-info-band" id="usd-encashment-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Bonus Payout</span>
                <h2 class="section-title">DAILY <span style="color:var(--ch-teal);">ENCASHMENT</span></h2>
                <p class="text-muted mx-auto" style="max-width:720px;">Register your Wise bank details in your HelloInfinity World Plan profile to receive eligible Sales Bonus encashments with multi-currency support.</p>
            </div>
            <div class="row g-4 align-items-stretch">
                <div class="col-12 col-lg-5">
                    <div class="encash-card h-100">
                        <h4 class="fw-bold"><i class="fa-solid fa-wallet me-2" style="color:var(--ch-teal);"></i>How it works</h4>
                        <ol class="text-muted mb-0 ps-3" style="line-height:2;">
                            <li>Register your Wise bank details in your HelloInfinity World Plan profile.</li>
                            <li>Submit your eligible Sales Bonus encashment.</li>
                            <li>Bonuses are credited based on the applicable Wise exchange rate.</li>
                        </ol>
                    </div>
                </div>
                <div class="col-12 col-lg-7">
                    <div class="encash-card h-100">
                        <h4 class="fw-bold">Encashment cut-off: Monday–Thursday</h4>
                        <div class="table-responsive">
                            <table class="table cutoff-table mb-2">
                                <thead>
                                    <tr>
                                        <th>Encashment Day</th>
                                        <th>Expected Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monday</td>
                                        <td>Tuesday</td>
                                    </tr>
                                    <tr>
                                        <td>Tuesday</td>
                                        <td>Wednesday</td>
                                    </tr>
                                    <tr>
                                        <td>Wednesday</td>
                                        <td>Thursday</td>
                                    </tr>
                                    <tr>
                                        <td>Thursday</td>
                                        <td>Friday</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="small text-muted"><strong>Friday, Saturday & Sunday:</strong> treated as the Monday cut-off and credited on Tuesday.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- DAILY ENCASHMENT -->
    <section class="section-pad world-info-band" id="kina-encashment-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Bonus Payout</span>
                <h2 class="section-title">DAILY <span style="color:var(--ch-teal);">ENCASHMENT</span></h2>
                <p class="text-muted mx-auto" style="max-width:720px;">Register your Wise bank details in your HelloInfinity World Plan profile to receive eligible Sales Bonus encashments with multi-currency support.</p>
            </div>
            <div class="row g-4 align-items-stretch">
                <div class="col-12 col-lg-5">
                    <div class="encash-card h-100">
                        <h4 class="fw-bold"><i class="fa-solid fa-wallet me-2" style="color:var(--ch-teal);"></i>How it works</h4>
                        <ol class="text-muted mb-0 ps-3" style="line-height:2;">
                            <li>Register your Wise bank details in your HelloInfinity World Plan profile.</li>
                            <li>Submit your eligible Sales Bonus encashment.</li>
                            <li>Bonuses are credited based on the applicable Wise exchange rate.</li>
                        </ol>
                    </div>
                </div>
                <div class="col-12 col-lg-7">
                    <div class="encash-card h-100">
                        <h4 class="fw-bold">Encashment cut-off: Monday–Thursday</h4>
                        <div class="table-responsive">
                            <table class="table cutoff-table mb-2">
                                <thead>
                                    <tr>
                                        <th>Encashment Day</th>
                                        <th>Expected Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monday</td>
                                        <td>Tuesday</td>
                                    </tr>
                                    <tr>
                                        <td>Tuesday</td>
                                        <td>Wednesday</td>
                                    </tr>
                                    <tr>
                                        <td>Wednesday</td>
                                        <td>Thursday</td>
                                    </tr>
                                    <tr>
                                        <td>Thursday</td>
                                        <td>Friday</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="small text-muted"><strong>Friday, Saturday & Sunday:</strong> treated as the Monday cut-off and credited on Tuesday.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- PRODUCT RECEIVED / DELIVERY PROOF -->
    <!-- Separate from the existing Moments & Highlights gallery. -->
    <section class="section-pad product-received-section" id="product-received-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Product Received</span>
                <h2 class="section-title">PRODUCT <span style="color:var(--ch-teal);">RECEIVED</span></h2>
                <p class="text-muted mx-auto" style="max-width:700px;">Real moments from our members receiving their INFINITE products. See products successfully delivered to our growing community.</p>
            </div>
            <div class="row g-3 g-md-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-1.jpg" alt="INFINITE Product Received 1" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-2.jpg" alt="INFINITE Product Received 2" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-3.jpg" alt="INFINITE Product Received 3" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-4.jpg" alt="INFINITE Product Received 4" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
            </div>
            <div class="text-center w-100 d-block mt-4 pt-4 pb-3" style="clear: both; position: relative; z-index: 10;">
                <button type="button" class="product-received-see-more" data-bs-toggle="modal" data-bs-target="#productReceivedModal"><span>SEE MORE</span><i class="bi bi-arrow-right"></i></button>
            </div>
        </div>
    </section>


    <!-- PROCESS OF REGISTRATION -->
    <section class="section-pad bg-white" id="kina-registration-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">PNG Registration</span>
                <h2 class="section-title">PROCESS OF <span style="color:var(--ch-teal);">REGISTRATION</span></h2>
                <p class="text-muted mx-auto" style="max-width:760px;">For package purchases, payment can be made through SMS Banking or Bank Deposit directly to an authorized Area Dealer in PNG for real-time payment confirmation and faster processing.</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-sm-6 col-lg">
                    <div class="how-start-card">
                        <div class="step-number">01</div>
                        <h6 class="fw-bold">Payment to Area Dealer</h6>
                        <p class="text-muted small mb-0">Send payment through the approved local process.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg">
                    <div class="how-start-card">
                        <div class="step-number">02</div>
                        <h6 class="fw-bold">Confirmed in PNG</h6>
                        <p class="text-muted small mb-0">Payment and member details are verified.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg">
                    <div class="how-start-card">
                        <div class="step-number">03</div>
                        <h6 class="fw-bold">Forwarded to PH Team</h6>
                        <p class="text-muted small mb-0">Confirmed details are sent for processing.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg">
                    <div class="how-start-card">
                        <div class="step-number">04</div>
                        <h6 class="fw-bold">Registration Processed</h6>
                        <p class="text-muted small mb-0">Your registration and package order are processed.</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg">
                    <div class="how-start-card">
                        <div class="step-number">05</div>
                        <h6 class="fw-bold">Products Prepared</h6>
                        <p class="text-muted small mb-0">Products are prepared for shipment to PNG.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- PAYMENT PROOF GALLERY -->
    <section class="section-pad world-info-band media-gallery-section" id="payment-proof-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Payment Verification</span>
                <h2 class="section-title">PROOF OF <span style="color:var(--ch-teal);">PAYMENT</span></h2>
                <p class="text-muted mx-auto" style="max-width:720px;">Here are examples of payment confirmations and transactions processed with our team.</p>
            </div>
            <div class="row g-3 g-md-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/proof1.jpg" alt="Payment Proof 1" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/proof2.jpg" alt="Payment Proof 2" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/proof3.jpg" alt="Payment Proof 3" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/proof4.jpg" alt="Payment Proof 4" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
            </div>
            <div class="text-center w-100 d-block mt-4 pt-4 pb-3" style="clear: both; position: relative; z-index: 10;">
                <button type="button" class="product-received-see-more" data-bs-toggle="modal" data-bs-target="#paymentProofModal"><span>SEE MORE</span><i class="bi bi-arrow-right"></i></button>
            </div>
        </div>
    </section>

    <!-- LOGISTICS & SHIPPING TO PNG -->
    <section class="section-pad world-info-band" id="kina-shipping-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag">Product Delivery</span>
                <h2 class="section-title">LOGISTICS & SHIPPING TO <span style="color:var(--ch-teal);">PNG</span></h2>
                <p class="text-muted mx-auto" style="max-width:720px;">International logistics are coordinated through DHL, with products normally shipped weekly by air cargo depending on aircraft availability.</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="shipping-card"><i class="fa-solid fa-plane-departure fs-2 mb-3" style="color:var(--ch-teal);"></i>
                        <h5 class="fw-bold">Shipping Schedule</h5>
                        <p class="text-muted small mb-2"><strong>Cut-off:</strong><br>Friday — 12:00 PM Philippines Time<br>Friday — 2:00 PM PNG Time</p>
                        <p class="text-muted small mb-0">Normally shipped every Sunday or Monday, depending on aircraft availability.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="shipping-card"><i class="fa-solid fa-box fs-2 mb-3" style="color:var(--ch-yellow-dk);"></i>
                        <h5 class="fw-bold">Shipping Fee</h5>
                        <div class="bonus-amount">PGK 125</div>
                        <p class="text-muted small mb-0">Minimum shipping fee for up to 3KG. Even if your order is only 1KG, the minimum 3KG shipping fee still applies. Ordering more products together can help maximize the shipping cost.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="shipping-card"><i class="fa-solid fa-location-dot fs-2 mb-3" style="color:#ef4444;"></i>
                        <h5 class="fw-bold">Outside Port Moresby</h5>
                        <p class="text-muted small mb-2"><strong>Option 1:</strong> Arrange pickup in Port Moresby.</p>
                        <p class="text-muted small mb-0"><strong>Option 2:</strong> Request delivery to your province through a domestic logistics partner. An additional domestic delivery fee applies.</p>
                    </div>
                </div>
            </div>
            <div class="lifetime-strip mt-4 text-center"><strong>ORDER BIGGER • SAVE ON SHIPPING • MAXIMIZE YOUR BUSINESS</strong></div>
        </div>
    </section>

    <!-- KINA PRODUCT RECEIVED: placed after Product Delivery / Logistics -->
    <section class="section-pad product-received-section" id="kina-product-received-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Product Received</span>
                <h2 class="section-title">PRODUCT <span style="color:var(--ch-teal);">RECEIVED</span></h2>
                <p class="text-muted mx-auto" style="max-width:700px;">Real moments from our members receiving their INFINITE products. See products successfully delivered to our growing community.</p>
            </div>
            <div class="row g-3 g-md-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-1.jpg" alt="INFINITE Product Received 1" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-2.jpg" alt="INFINITE Product Received 2" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-3.jpg" alt="INFINITE Product Received 3" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/product-received/product-received-4.jpg" alt="INFINITE Product Received 4" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
            </div>
            <div class="text-center w-100 d-block mt-4 pt-4 pb-3" style="clear: both; position: relative; z-index: 10;">
                <button type="button" class="product-received-see-more" data-bs-toggle="modal" data-bs-target="#productReceivedModal"><span>SEE MORE</span><i class="bi bi-arrow-right"></i></button>
            </div>
        </div>
    </section>

    <!-- SECTION VI: EXCLUSIVE KINA DEALER -->
    <section class="section-pad" id="exclusive-dealer-section" style="display: none; background: var(--ch-bg-light);">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Papua New Guinea</span>
                <h2 class="section-title">EXCLUSIVE AREA <span style="color: var(--ch-teal);">DEALER</span></h2>

                <h4 class="fw-bold mt-4 mb-3" style="color: var(--ch-dark-slate);">
                    <i class="fa-solid fa-shop text-teal me-2"></i> Find Your Nearest INFINITE Area Dealer!
                </h4>
                <p class="text-muted mx-auto fs-6" style="max-width: 750px; line-height: 1.7;">
                    Connect with our Official Member Area Dealers and get INFINITE products conveniently available near you. <br>
                    <span class="d-inline-block mt-3 fw-semibold px-4 py-2 rounded-pill shadow-sm" style="background: var(--ch-white); border: 1px solid var(--ch-border); color: var(--ch-dark-slate);">
                        <i class="fa-solid fa-address-card text-teal me-1"></i> For Registrations &amp; <i class="fa-solid fa-box-open text-teal ms-2 me-1"></i> Product Orders, simply message your nearest Area Dealer.
                    </span>
                </p>
            </div>

            <!-- Dealership Cards Grid (Responsive & Duplicated) -->
            <div class="row g-4 justify-content-center">

                <!-- Original Dealer Card -->
                <div class="col-12 col-lg-6">
                    <div class="dealer-card-enhanced h-100">
                        <div class="dealer-card-bg-shape"></div>
                        <div class="dealer-photo-large">
                            <img src="./assets/image/team/photo_2026-08-11_22-16-02.jpg" alt="Martina Pidi">
                        </div>

                        <div class="badge rounded-pill mb-3 shadow-sm px-3 py-2" style="background: black; color: #fff; position: relative; z-index: 2; font-size: 0.8rem; letter-spacing: 1px;">
                            <i class="fa-solid fa-award me-1" style="color: var(--ch-yellow);"></i> INFINITE MEMBER AREA DEALER
                        </div>

                        <h3 class="text-dark mb-2" style="font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; letter-spacing: 1.5px; position: relative; z-index: 2;">MARTINA PIDI</h3>

                        <p class="text-muted fw-medium mb-4 fs-5" style="position: relative; z-index: 2;">
                            <i class="fa-solid fa-location-dot me-1" style="color: var(--ch-teal);"></i> Kokopo, PNG
                        </p>

                        <a href="https://wa.me/67573396960" class="btn btn-lg btn-success w-100 fw-bold rounded-pill shadow-sm py-3 mt-auto" target="_blank" style="position: relative; z-index: 2; transition: all 0.3s ease;">
                            <i class="bi bi-whatsapp me-2 fs-5"></i> +675 7339 6960
                        </a>
                    </div>
                </div>

                <!-- Duplicated Dealer Card -->
                <div class="col-12 col-lg-6">
                    <div class="dealer-card-enhanced h-100">
                        <div class="dealer-card-bg-shape"></div>
                        <div class="dealer-photo-large d-flex align-items-center justify-content-center bg-light">
                            <img src="./assets/image/team/photo_2026-08-11_22-19-04.jpg" alt="Daniel Tade">
                        </div>

                        <div class="badge rounded-pill mb-3 shadow-sm px-3 py-2" style="background: black; color: #fff; position: relative; z-index: 2; font-size: 0.8rem; letter-spacing: 1px;">
                            <i class="fa-solid fa-award me-1" style="color: var(--ch-yellow);"></i> INFINITE MEMBER AREA DEALER
                        </div>

                        <h3 class="text-dark mb-2" style="font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; letter-spacing: 1.5px; position: relative; z-index: 2;">DANIEL TADE</h3>

                        <p class="text-muted fw-medium mb-4 fs-5" style="position: relative; z-index: 2;">
                            <i class="fa-solid fa-location-dot me-1" style="color: var(--ch-teal);"></i> Kimbe, PNG
                        </p>

                        <a href="https://wa.me/67573644499" class="btn btn-lg btn-success w-100 fw-bold rounded-pill shadow-sm py-3 mt-auto" target="_blank" style="position: relative; z-index: 2; transition: all 0.3s ease;">
                            <i class="bi bi-whatsapp me-2 fs-5"></i> +675 7364 4499
                        </a>
                    </div>
                </div>

                <!-- Duplicated Dealer Card -->
                <div class="col-12 col-lg-6">
                    <div class="dealer-card-enhanced h-100">
                        <div class="dealer-card-bg-shape"></div>
                        <div class="dealer-photo-large d-flex align-items-center justify-content-center bg-light">
                            <img src="./assets/image/team/Barosie.jpg" alt="Jeanette Barosie">
                        </div>

                        <div class="badge rounded-pill mb-3 shadow-sm px-3 py-2" style="background: black; color: #fff; position: relative; z-index: 2; font-size: 0.8rem; letter-spacing: 1px;">
                            <i class="fa-solid fa-award me-1" style="color: var(--ch-yellow);"></i> INFINITE MEMBER AREA DEALER
                        </div>

                        <h3 class="text-dark mb-2" style="font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; letter-spacing: 1.5px; position: relative; z-index: 2;">JEANETTE BAROSIE</h3>

                        <p class="text-muted fw-medium mb-4 fs-5" style="position: relative; z-index: 2;">
                            <i class="fa-solid fa-location-dot me-1" style="color: var(--ch-teal);"></i> Arawa, BOUGAINVILLE ISLAND
                        </p>

                        <a href="https://wa.me/67570422028" class="btn btn-lg btn-success w-100 fw-bold rounded-pill shadow-sm py-3 mt-auto" target="_blank" style="position: relative; z-index: 2; transition: all 0.3s ease;">
                            <i class="bi bi-whatsapp me-2 fs-5"></i> +675 7042 2028
                        </a>
                    </div>
                </div>

            </div>

            <!-- NEW DEALER CALL TO ACTION -->
            <div class="mt-5 text-center px-3">
                <div class="p-4 p-md-5 rounded-4 shadow-sm mx-auto" style="max-width: 750px; background-color: #ffffff; border: 1px solid #f1f5f9;">
                    <h4 class="fw-bolder text-uppercase mb-3" style="color: var(--ch-dark-slate); font-size: clamp(1.2rem, 3vw, 1.5rem); letter-spacing: 0.5px;">
                        <i class="fa-solid fa-handshake me-2" style="color: var(--ch-dark-slate);"></i> Want to become an exclusive area dealer?
                    </h4>
                    <p class="text-muted mb-4 mx-auto" style="line-height: 1.6; font-size: clamp(0.9rem, 2vw, 1.05rem); max-width: 650px;">
                        Secure your region and become the primary distributor of INFINITE products in your area. For inquiries and exclusive application details, reach out directly to our founder.
                    </p>
                    <a href="https://wa.me/639167354749" class="dealer-cta-btn btn fw-bold rounded-pill px-4 py-2 d-inline-flex align-items-center" target="_blank">
                        <i class="bi bi-whatsapp me-2" style="color: #25D366; font-size: 1.2rem;"></i> Message Primo Ecalne
                    </a>
                </div>
            </div>

        </div>
    </section>



    <!-- THE PHILIPPINES PIONEERING OPPORTUNITY -->
    <section class="section-pad why-join-section" id="php-why-join-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag" style="color:var(--ch-yellow);">Pioneering Opportunity</span>
                <h2 class="section-title text-white">🔥 THIS IS YOUR BEST TIME TO <span style="color:var(--ch-yellow);">JOIN</span></h2>
                <p class="text-white-50 mx-auto" style="max-width:760px;">We are still in the pioneering stage in the Philippines. The community is growing, the market remains open, and early members have the opportunity to build their foundation while the network continues to expand.</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">01</div>
                        <h5 class="fw-bold">BUILD EARLY</h5>
                        <p class="text-white-50 small mb-0">Start building your network while the opportunity and community are still developing.</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">02</div>
                        <h5 class="fw-bold">POSITION EARLY</h5>
                        <p class="text-white-50 small mb-0">Establish your presence and develop your area while the market is still wide open.</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">03</div>
                        <h5 class="fw-bold">GROW WITH THE COMMUNITY</h5>
                        <p class="text-white-50 small mb-0">Build alongside the INFINITE community as more members take action and the network expands.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <p class="fs-5 mb-0">Don’t wait until everyone knows about INFINITE. <strong>Get in early, take action, and grow with us.</strong></p>
            </div>
        </div>
    </section>

    <!-- THE GLOBAL MARKET PIONEERING OPPORTUNITY -->
    <section class="section-pad why-join-section" id="usd-why-join-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag" style="color:var(--ch-yellow);">Pioneering Opportunity</span>
                <h2 class="section-title text-white">🔥 THIS IS YOUR BEST TIME TO <span style="color:var(--ch-yellow);">JOIN</span></h2>
                <p class="text-white-50 mx-auto" style="max-width:760px;">We are still in the pioneering stage in the global market. The community is growing, the market remains open, and early members have the opportunity to build their foundation while the network continues to expand.</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">01</div>
                        <h5 class="fw-bold">BUILD EARLY</h5>
                        <p class="text-white-50 small mb-0">Start building your network while the opportunity and community are still developing.</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">02</div>
                        <h5 class="fw-bold">POSITION EARLY</h5>
                        <p class="text-white-50 small mb-0">Establish your presence and develop your area while the market is still wide open.</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">03</div>
                        <h5 class="fw-bold">GROW WITH THE COMMUNITY</h5>
                        <p class="text-white-50 small mb-0">Build alongside the INFINITE community as more members take action and the network expands.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <p class="fs-5 mb-0">Don’t wait until everyone knows about INFINITE. <strong>Get in early, take action, and grow with us.</strong></p>
            </div>
        </div>
    </section>

    <!-- WHY JOIN NOW -->
    <section class="section-pad why-join-section" id="kina-why-join-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5"><span class="section-tag" style="color:var(--ch-yellow);">Pioneering Opportunity</span>
                <h2 class="section-title text-white">🔥 THIS IS YOUR BEST TIME TO <span style="color:var(--ch-yellow);">JOIN</span></h2>
                <p class="text-white-50 mx-auto" style="max-width:760px;">We are still in the pioneering stage in Papua New Guinea. The community is growing, the market remains open, and early members have the opportunity to build their foundation while the network continues to expand.</p>
            </div>
            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">01</div>
                        <h5 class="fw-bold">BUILD EARLY</h5>
                        <p class="text-white-50 small mb-0">Start building your network while the opportunity and community are still developing.</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">02</div>
                        <h5 class="fw-bold">POSITION EARLY</h5>
                        <p class="text-white-50 small mb-0">Establish your presence and develop your area while the market is still wide open.</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="why-join-card">
                        <div class="why-join-number">03</div>
                        <h5 class="fw-bold">GROW WITH THE COMMUNITY</h5>
                        <p class="text-white-50 small mb-0">Build alongside the INFINITE community as more members take action and the network expands.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <p class="fs-5 mb-0">Don’t wait until everyone knows about INFINITE. <strong>Get in early, take action, and grow with us.</strong></p>
            </div>
        </div>
    </section>

    <!-- EVENT GALLERY SECTION -->
    <section class="section-pad bg-white media-gallery-section" id="infinite-gallery-section" style="display:none;">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-tag">Moments & Highlights</span>
                <h2 class="section-title">THE <span style="color: var(--ch-teal);">INFINITE</span> GALLERY</h2>
                <p class="text-muted mx-auto" style="max-width: 650px;">Glimpses of our growing global community, events, and milestones.</p>
            </div>
            <div class="row g-3 g-md-4 justify-content-center">
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-53-58.jpg" alt="Gallery Image 1" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-01.jpg" alt="Gallery Image 2" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-02.jpg" alt="Gallery Image 3" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="product-received-card gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-03 (2).jpg" alt="Gallery Image 4" loading="lazy">
                        <div class="product-received-overlay"><i class="fa-solid fa-expand"></i></div>
                    </div>
                </div>
            </div>
            <div class="text-center w-100 d-block mt-4 pt-4 pb-3" style="clear: both; position: relative; z-index: 10;">
                <button type="button" class="product-received-see-more" data-bs-toggle="modal" data-bs-target="#momentsHighlightsModal"><span>SEE MORE</span><i class="bi bi-arrow-right"></i></button>
            </div>
        </div>
    </section>

    <!-- CALL TO ACTION / REGISTRATION -->
    <section id="register-world-account" class="section-pad text-white" style="background: linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%);">
        <div class="container text-center">
            <span class="section-tag" style="color: var(--ch-yellow);">Get Started</span>
            <h2 class="ola-hero-title mb-3" style="font-size: clamp(2.5rem, 6vw, 4.5rem);">READY TO LAUNCH YOUR GLOBAL NETWORK?</h2>
            <p class="fs-5 text-white-50 mx-auto mb-4" style="max-width: 650px;">
                Secure your World Plan account today and capitalize on our global binary matrix, travel incentives, and multi-currency payout infrastructure.
            </p>
            <button data-bs-toggle="modal" data-bs-target="#worldAccountModal" class="btn btn-lg shadow-lg fw-bold px-5 py-3" style="background: var(--ch-teal); color: #fff; border-radius: 50px; border: none;">
                Register World Account <i class="bi bi-arrow-right ms-2"></i>
            </button>
        </div>
    </section>

    <!-- FOOTER -->
    <footer id="contact" style="background: var(--ch-dark-slate); padding-top: 5rem; padding-bottom: 2rem;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center g-5 align-items-center">
                <div class="col-12 col-md-8 col-lg-6 text-center">
                    <div class="footer-brand mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: 50px; color: #fff; letter-spacing: 2px;">
                        INFINITE<span style="color: var(--ch-teal);">.</span>
                    </div>
                    <p class="mb-4 text-white-50">Empowering Global Entrepreneurs Through Premium Skincare & Wellness</p>
                    <div class="d-flex justify-content-center gap-3 mb-5">
                        <a href="#" class="text-white fs-4"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-white fs-4"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="text-white fs-4"><i class="bi bi-tiktok"></i></a>
                        <a href="#" class="text-white fs-4"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>
            </div>
            <hr class="mt-5" style="border-color: rgba(255,255,255,0.1);" />
            <div class="row align-items-center pb-2 text-center text-md-start text-white-50 small">
                <div class="col-md-6">&copy; <?= date('Y') ?> Infinite. All rights reserved.</div>
                <div class="col-md-6 text-md-end">
                    Properties of
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="primo">Primo Ecalne Jr.</a> |
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="aera">Aera Claridad</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- PRODUCT RECEIVED MODAL -->
    <div class="modal fade" id="productReceivedModal" tabindex="-1" aria-labelledby="productReceivedModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content product-received-modal">
                <div class="product-received-modal-header">
                    <div><span class="product-modal-small-title">INFINITE COMMUNITY</span>
                        <h3 id="productReceivedModalLabel">PRODUCT <span>RECEIVED</span></h3>
                    </div>
                    <button type="button" class="product-received-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="product-received-modal-body">
                    <div class="row g-3 g-md-4" id="productReceivedGallery">
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-1.jpg" alt="Product Received 1" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-2.jpg" alt="Product Received 2" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-3.jpg" alt="Product Received 3" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-4.jpg" alt="Product Received 4" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-5.jpg" alt="Product Received 5" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-6.jpg" alt="Product Received 6" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-7.jpg" alt="Product Received 7" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-8.jpg" alt="Product Received 8" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-9.jpg" alt="Product Received 9" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="product-modal-image gallery-clickable"><img src="./assets/image/product-received/product-received-10.jpg" alt="Product Received 10" loading="lazy"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- OWNER MODAL -->
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

    <!-- PAYMENT PROOF FULL GALLERY MODAL -->
    <div class="modal fade" id="paymentProofModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content product-received-modal">
                <div class="product-received-modal-header">
                    <div><span class="product-modal-small-title">INFINITE COMMUNITY</span>
                        <h3 id="paymentProofModalLabel">PAYMENT <span>VERIFICATION</span></h3>
                    </div>
                    <button type="button" class="product-received-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="product-received-modal-body">
                    <div class="row g-3">
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof1.jpg" alt="Payment Proof 1" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof2.jpg" alt="Payment Proof 2" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof3.jpg" alt="Payment Proof 3" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof4.jpg" alt="Payment Proof 4" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof5.jpg" alt="Payment Proof 5" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof6.jpg" alt="Payment Proof 6" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof7.jpg" alt="Payment Proof 7" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof8.jpg" alt="Payment Proof 8" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof9.jpg" alt="Payment Proof 9" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/proof10.jpg" alt="Payment Proof 10" loading="lazy"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MOMENTS & HIGHLIGHTS FULL GALLERY MODAL -->
    <div class="modal fade" id="momentsHighlightsModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content product-received-modal">
                <div class="product-received-modal-header">
                    <div><span class="product-modal-small-title">INFINITE COMMUNITY</span>
                        <h3 id="momentsHighlightsModalLabel">MOMENTS <span>& HIGHLIGHTS</span></h3>
                    </div>
                    <button type="button" class="product-received-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="product-received-modal-body">
                    <div class="row g-3">
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-53-58.jpg" alt="Gallery Image 1" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-01.jpg" alt="Gallery Image 2" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-02.jpg" alt="Gallery Image 3" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-03 (2).jpg" alt="Gallery Image 4" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-03.jpg" alt="Gallery Image 5" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-04.jpg" alt="Gallery Image 6" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-05.jpg" alt="Gallery Image 7" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-06 (2).jpg" alt="Gallery Image 8" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-06.jpg" alt="Gallery Image 9" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-07.jpg" alt="Gallery Image 10" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-08.jpg" alt="Gallery Image 11" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-22 (2).jpg" alt="Gallery Image 12" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-22.jpg" alt="Gallery Image 13" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-23.jpg" alt="Gallery Image 14" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-24.jpg" alt="Gallery Image 15" loading="lazy"></div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="media-gallery-modal-image gallery-clickable"><img src="./assets/image/gallery/photo_2026-09-05_21-54-25.jpg" alt="Gallery Image 16" loading="lazy"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- GALLERY LIGHTBOX MODAL -->
    <div class="modal fade" id="galleryLightbox" tabindex="-1" aria-hidden="true">
        <!-- Kept modal-fullscreen for responsive image centering on all devices without breaking forms -->
        <div class="modal-dialog modal-fullscreen">
            <!-- Semi-transparent dark background strictly for the lightbox -->
            <div class="modal-content border-0" style="background-color: rgba(15, 23, 42, 0.95); backdrop-filter: blur(8px);">
                <button type="button" class="btn-close btn-close-white shadow-none position-absolute top-0 end-0 m-3 m-md-4 z-3" data-bs-dismiss="modal" aria-label="Close" style="width: 1.5rem; height: 1.5rem; opacity: 1;"></button>
                <div class="modal-body d-flex align-items-center justify-content-center p-2 p-md-5 w-100 h-100" style="overflow: hidden;">
                    <!-- Auto-scaling image that preserves aspect ratio strictly inside the viewport -->
                    <img src="" id="lightboxImage" class="img-fluid rounded-3 shadow-lg" style="max-height: 90vh; max-width: 100%; width: auto; height: auto; object-fit: contain;" alt="Expanded Image">
                </div>
            </div>
        </div>
    </div>

    <!-- World Account Registration Modal (SCROLL BUG FIXED) -->
    <div class="modal fade" id="worldAccountModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <!-- BUG FIX: Removed inline 'overflow: hidden' which was breaking the scrollable form body -->
            <div class="modal-content border-0 shadow-lg" style="border-radius: 1.5rem; background-color: #ffffff;">
                <div class="modal-header border-0 pb-0 pt-4 px-4 px-md-5">
                    <h3 class="modal-title fw-bold" style="color: var(--ch-dark-slate); font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px;">
                        <i class="bi bi-globe-americas me-2" style="color: var(--ch-teal);"></i> Register World Account
                    </h3>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 p-md-5 pt-3">
                    <p class="text-muted mb-4 small">Fill out the official application form with your details to register.</p>

                    <div id="worldFormAlertMessage" class="alert d-none align-items-center rounded-3 shadow-sm mb-4" role="alert"></div>

                    <!-- Added enctype for file uploads -->
                    <form id="worldAccountForm" class="needs-validation" enctype="multipart/form-data" novalidate>
                        <div class="row g-3">
                            <!-- Account Details -->
                            <div class="col-md-6 form-floating mb-3">
                                <input type="text" name="username" id="worldUsername" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Username" required />
                                <label for="worldUsername" class="text-black fw-medium ms-2">Username (uses for login)</label>
                                <div class="invalid-feedback">Please provide a username.</div>
                            </div>
                            <div class="col-md-6 form-floating mb-3">
                                <input type="email" name="email" id="worldEmail" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Email Address" required />
                                <label for="worldEmail" class="text-black fw-medium ms-2">Email Address</label>
                                <div class="invalid-feedback">Please provide a valid email address.</div>
                            </div>

                            <!-- Full Name -->
                            <div class="col-md-4 form-floating mb-3">
                                <input type="text" name="firstName" id="worldFirstName" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="First Name" required />
                                <label for="worldFirstName" class="text-black fw-medium ms-2">First Name</label>
                                <div class="invalid-feedback">Required.</div>
                            </div>
                            <div class="col-md-4 form-floating mb-3">
                                <input type="text" name="middleName" id="worldMiddleName" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Middle Name (Optional)" />
                                <label for="worldMiddleName" class="text-black fw-medium ms-2">Middle Name (Optional)</label>
                            </div>
                            <div class="col-md-4 form-floating mb-3">
                                <input type="text" name="lastName" id="worldLastName" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Last Name" required />
                                <label for="worldLastName" class="text-black fw-medium ms-2">Last Name</label>
                                <div class="invalid-feedback">Required.</div>
                            </div>

                            <!-- Personal Info -->
                            <div class="col-md-6 form-floating mb-3">
                                <input type="date" name="birthdate" id="worldBirthdate" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Birthdate" required />
                                <label for="worldBirthdate" class="text-black fw-medium ms-2">Birthdate</label>
                                <div class="invalid-feedback">Required.</div>
                            </div>
                            <div class="col-md-6 form-floating mb-3">
                                <input type="text" name="contact" id="worldContact" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Contact #" required />
                                <label for="worldContact" class="text-black fw-medium ms-2">Contact #</label>
                                <div class="invalid-feedback">Required.</div>
                            </div>

                            <div class="col-12 form-floating mb-3">
                                <input type="text" name="address" id="worldAddress" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Complete Address" required />
                                <label for="worldAddress" class="text-black fw-medium ms-2">Complete Address</label>
                                <div class="invalid-feedback">Please provide your address.</div>
                            </div>

                            <!-- Payment & Package Details -->
                            <div class="col-md-6 form-floating mb-3">
                                <select name="packageType" id="worldPackageType" class="form-select bg-light border-0 shadow-none text-black fw-medium" required>
                                    <option value="" disabled selected>Select Package...</option>
                                    <option value="World Starter">World Starter</option>
                                    <option value="World Basic">World Basic</option>
                                    <option value="World Advance">World Advance</option>
                                    <option value="World Pro">World Pro</option>
                                    <option value="World Supreme">World Supreme</option>
                                </select>
                                <label for="worldPackageType" class="text-black fw-medium">Package Type</label>
                                <div class="invalid-feedback">Please select a package.</div>
                            </div>
                            <div class="col-md-6 form-floating mb-3">
                                <input type="date" name="paymentDate" id="worldPaymentDate" class="form-control bg-light border-0 shadow-none text-black fw-medium" placeholder="Date of Payment" required />
                                <label for="worldPaymentDate" class="text-black fw-medium ms-2">Date of Payment</label>
                                <div class="invalid-feedback">Required.</div>
                            </div>

                            <!-- File Upload -->
                            <div class="col-12 mb-4">
                                <label for="worldPaymentProof" class="form-label text-black small fw-medium ms-1">Upload Payment Proof</label>
                                <input type="file" name="paymentProof" id="worldPaymentProof" class="form-control bg-light border-0 shadow-none py-2 text-black fw-medium" accept="image/*,.pdf" required />
                                <div class="invalid-feedback">Please upload your payment receipt.</div>
                            </div>
                        </div>

                        <button type="submit" id="worldSubmitBtn" class="btn w-100 fw-bold py-3 text-white rounded-3 shadow-sm" style="background-color: var(--ch-teal); transition: all 0.3s ease;">
                            <i class="bi bi-send me-2"></i> Submit Registration
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- BACK TO TOP BUTTON -->
    <button id="backToTop" class="btn border-0 shadow" aria-label="Back to top" style="position: fixed; bottom: 28px; right: 28px; width: 48px; height: 48px; border-radius: 50%; background: var(--ch-teal); color: #fff; display: flex; align-items: center; justify-content: center; z-index: 500; opacity: 0; transition: all 0.3s;">
        <i class="bi bi-arrow-up fs-5"></i>
    </button>

    <!-- JS SCRIPTS -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="./assets/js/world-plan.js"></script>

    <!-- Currency-specific sections added for PHP/USD -->
    <script>
        (function() {
            /*
             * Currency page layout
             *
             * PHP / USD must show the common World Plan information in this order:
             * Your First Steps
             * Fundamentals
             * World Plan Option
             * Direct Enrollment
             * Interactive Visualizer
             * Simple Explanation
             * Currency: Philippines peso
             * Earnings Ceiling
             * Guidelines
             * Bonus Payouts
             * Product Received
             * Pioneering Opportunity
             * Moments & Highlights
             * Get Started
             *
             * KINA keeps its PNG-specific sections.
             */
            const currencySections = {
                PHP: [
                    'php-packages-section',
                    'php-usd-member-benefits-section',
                    'php-enroller-section',
                    'php-sales-match-section',
                    'php-encashment-section',
                    'product-received-section',
                    'php-why-join-section',
                    'infinite-gallery-section'
                ],
                USD: [
                    'usd-packages-section',
                    'php-usd-member-benefits-section',
                    'usd-enroller-section',
                    'usd-sales-match-section',
                    'usd-encashment-section',
                    'product-received-section',
                    'usd-why-join-section',
                    'infinite-gallery-section'
                ],
                KINA: [
                    'png-packages-section',
                    'kina-retailing-section',
                    'kina-enroller-section',
                    'kina-sales-match-section',
                    'kina-encashment-section',
                    'kina-registration-section',
                    'payment-proof-section',
                    'kina-shipping-section',
                    'kina-product-received-section',
                    'exclusive-dealer-section',
                    'kina-why-join-section',
                    'infinite-gallery-section'
                ]
            };

            /* Sections that belong only to a different currency are hidden by the
               function below. Sections without an ID are intentionally left alone
               because they are shared by PHP and USD (Your First Steps, Fundamentals,
               Interactive Visualizer, Currency table, Earnings Ceiling, Guidelines,
               and Get Started). */

            function updateCurrencySpecificSections(currency) {
                const allIds = [...new Set(Object.values(currencySections).flat())];
                const visibleIds = new Set(currencySections[currency] || []);

                allIds.forEach(id => {
                    const section = document.getElementById(id);
                    if (!section) return;

                    if (visibleIds.has(id)) {
                        section.style.setProperty('display', '', 'important');
                    } else {
                        section.style.setProperty('display', 'none', 'important');
                    }
                });
            }

            const originalSwitchCurrency = window.switchCurrency;
            if (typeof originalSwitchCurrency === 'function') {
                window.switchCurrency = function(currency) {
                    originalSwitchCurrency(currency);
                    updateCurrencySpecificSections(currency);
                };
            }

            document.addEventListener('DOMContentLoaded', function() {
                const activeButton = document.querySelector('.currency-btn.active');
                if (activeButton && activeButton.id === 'btn-php') updateCurrencySpecificSections('PHP');
                else if (activeButton && activeButton.id === 'btn-usd') updateCurrencySpecificSections('USD');
                else updateCurrencySpecificSections('KINA');
            });
        })();
    </script>

    <!-- Custom inline JS for Gallery Tracking -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Gallery Scrollers
            const track = document.getElementById('infiniteGallery');
            const leftBtn = document.getElementById('gal-left');
            const rightBtn = document.getElementById('gal-right');

            if (track && leftBtn && rightBtn) {
                leftBtn.addEventListener('click', () => {
                    track.scrollBy({
                        left: -340,
                        behavior: 'smooth'
                    });
                });
                rightBtn.addEventListener('click', () => {
                    track.scrollBy({
                        left: 340,
                        behavior: 'smooth'
                    });
                });
            }

            // Payment Proof Scrollers
            const receiptTrack = document.getElementById('receiptGallery');
            const receiptLeftBtn = document.getElementById('receipt-left');
            const receiptRightBtn = document.getElementById('receipt-right');

            if (receiptTrack && receiptLeftBtn && receiptRightBtn) {
                receiptLeftBtn.addEventListener('click', () => {
                    receiptTrack.scrollBy({
                        left: -260,
                        behavior: 'smooth'
                    });
                });
                receiptRightBtn.addEventListener('click', () => {
                    receiptTrack.scrollBy({
                        left: 260,
                        behavior: 'smooth'
                    });
                });
            }

            // Global Modal Scroll Lock: lock the page at the exact scroll position for ALL modals.
            let savedScrollPosition = 0;
            let originalBodyStyles = null;
            let originalHtmlStyles = null;
            let lockActive = false;
            let openModalCount = 0; // Track open modals in case of stacked modals

            const lockPage = function() {
                openModalCount++;
                if (lockActive) return;
                lockActive = true;

                savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;

                originalBodyStyles = {
                    position: document.body.style.position,
                    top: document.body.style.top,
                    left: document.body.style.left,
                    right: document.body.style.right,
                    width: document.body.style.width,
                    overflow: document.body.style.overflow,
                    paddingRight: document.body.style.paddingRight
                };

                originalHtmlStyles = {
                    overflow: document.documentElement.style.overflow
                };

                // Freeze the document itself. The modal body remains independently scrollable.
                document.body.style.position = 'fixed';
                document.body.style.top = `-${savedScrollPosition}px`;
                document.body.style.left = '0';
                document.body.style.right = '0';
                document.body.style.width = '100%';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                document.documentElement.classList.add('global-modal-open');
            };

            const unlockPage = function() {
                openModalCount--;
                if (openModalCount > 0) return; // Don't unlock if another modal is still open
                if (!lockActive) return;

                const restoreY = savedScrollPosition;
                const bodyStyles = originalBodyStyles || {};
                const htmlStyles = originalHtmlStyles || {};

                // Restore the document before Bootstrap finishes its cleanup.
                document.body.style.position = bodyStyles.position || '';
                document.body.style.top = bodyStyles.top || '';
                document.body.style.left = bodyStyles.left || '';
                document.body.style.right = bodyStyles.right || '';
                document.body.style.width = bodyStyles.width || '';
                document.body.style.overflow = bodyStyles.overflow || '';
                document.body.style.paddingRight = bodyStyles.paddingRight || '';
                document.documentElement.style.overflow = htmlStyles.overflow || '';
                document.documentElement.classList.remove('global-modal-open');
                lockActive = false;

                // Prevent the browser from using focus restoration to move the page.
                const previousScrollBehavior = document.documentElement.style.scrollBehavior;
                document.documentElement.style.scrollBehavior = 'auto';

                // Bootstrap removes modal-open/backdrop state during this cycle.
                window.scrollTo(0, restoreY);
                requestAnimationFrame(function() {
                    window.scrollTo(0, restoreY);
                    requestAnimationFrame(function() {
                        window.scrollTo(0, restoreY);
                        document.documentElement.style.scrollBehavior = previousScrollBehavior;
                    });
                });
            };

            // Apply scroll lock to ALL modals automatically on page load
            const allModals = document.querySelectorAll('.modal');
            allModals.forEach(modal => {
                modal.addEventListener('show.bs.modal', lockPage);
                modal.addEventListener('hidden.bs.modal', unlockPage);

                // Extra protection for mouse-wheel/touch overscroll inside modal scrollable bodies
                const modalBody = modal.querySelector('.modal-body, .product-received-modal-body, .media-gallery-modal-body');
                if (modalBody) {
                    modalBody.addEventListener('wheel', function(e) {
                        const canScroll = this.scrollHeight > this.clientHeight;
                        if (!canScroll) {
                            e.preventDefault();
                            return;
                        }

                        const atTop = this.scrollTop <= 0;
                        const atBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 1;
                        if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                            e.preventDefault();
                        }
                    }, {
                        passive: false
                    });
                }
            });

            // Global Lightbox Handler for Payment, Moments & Highlights, and Product Received
            const lightboxImg = document.getElementById('lightboxImage');
            const galleryLightbox = document.getElementById('galleryLightbox');
            const clickableGalleryImages = document.querySelectorAll('.gallery-clickable img, .gallery-item img, .payment-proof-card img, .product-modal-image img, .media-gallery-modal-image img');
            clickableGalleryImages.forEach(img => {
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const src = this.getAttribute('src');
                    if (!src || !lightboxImg || !galleryLightbox) return;
                    lightboxImg.setAttribute('src', src);
                    const modal = new bootstrap.Modal(galleryLightbox);
                    modal.show();
                });
            });
        });
    </script>

</body>

</html>