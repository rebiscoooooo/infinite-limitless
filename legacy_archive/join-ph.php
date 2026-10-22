<?php session_start();
require_once 'public_auth_guard.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Join Us | Infinite Live Limitless</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./assets/css/styles.css" />

<style>
    
        /* ========== CSS VARIABLES ========== */
        :root {
            --ch-teal: #14b8a6;
            --ch-teal-dk: #0f766e;
            --ch-teal-darker: #134e4a;
            --ch-yellow: #fbbf24;
            --ch-yellow-dk: #f59e0b;
            --ch-dark-slate: #0f172a;
            --ch-slate: #1e293b;
            --ch-slate-muted: #475569;
            --ch-slate-light: #94a3b8;
            --ch-bg-light: #f8fafc;
            --ch-white: #ffffff;
            --ch-border: #e2e8f0;
            --ch-border-hover: rgba(20, 184, 166, 0.4);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Barlow', sans-serif;
        }

        /* --- PREVENT HORIZONTAL SCROLLING --- */
        html, body {
            max-width: 100%;
            overflow-x: hidden;
        }

        body {
            background: var(--ch-dark-slate);
            color: var(--ch-white);
            -webkit-font-smoothing: antialiased;
        }

        /* --- Scroll Reveal Animation --- */
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
            transition: all 0.3s ease;
        }

        .btn-nav-order:hover {
            background: var(--ch-teal);
            border-color: var(--ch-teal);
            color: var(--ch-white) !important;
        }

        @media (max-width: 991px) {
            #mainNav {
                background: rgba(15, 23, 42, 0.95) !important;
            }
        }

        /* --- Hero Section --- */
        #hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 160px;
            padding-bottom: 100px;
        }

        @media (max-width: 768px) {
            #hero {
                padding-top: 120px;
                padding-bottom: 60px;
            }
        }

        .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            font-size: clamp(0.7rem, 2vw, 0.85rem);
            font-weight: 700;
            letter-spacing: 2px;
            color: #5eead4;
            text-transform: uppercase;
            background: rgba(20, 184, 166, 0.15);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            border: 1px solid rgba(20, 184, 166, 0.4);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .hero-eyebrow .dot {
            width: 8px;
            height: 8px;
            background-color: var(--ch-teal);
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 10px var(--ch-teal);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(20, 184, 166, 0); }
            100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
        }

        .hero-title {
            color: var(--ch-white);
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Bebas Neue', sans-serif;
            text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
            margin-top: 1.5rem;
        }

        .hero-subtitle {
            font-size: clamp(2rem, 5vw, 3.5rem);
            letter-spacing: 2px;
            margin-bottom: 10px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.1;
        }

        /* Elegant Cursive & Typing Styles */
        .elegant-cursive {
            font-family: 'Great Vibes', cursive;
            color: var(--ch-teal);
            font-size: clamp(3rem, 9vw, 5.5rem);
            font-style: normal !important;
            display: inline-block;
            margin-top: -15px;
            border-right: 3px solid transparent;
            padding-right: 5px;
            line-height: 1;
            white-space: nowrap;
        }

        @keyframes blink-caret {

            from,
            to {
                border-color: transparent;
            }

            50% {
                border-color: var(--ch-teal);
            }
        }

        .blinking-cursor {
            animation: blink-caret 0.8s step-end infinite;
        }

        .hero-desc {
            font-size: clamp(1.1rem, 3vw, 1.3rem);
        }
        
        /* =========================================================
            FLAG IMAGE (INFINITE SCROLL) MATCHING INDEX.PHP
        ========================================================= */
        .country-scroll-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding-top: 50px;
            z-index: 2;
        }

        .country-scroll-track {
            display: flex;
            align-items: center;
            gap: 24px;
            width: max-content;
            padding: 12px 0;
            animation: scrollCountries 30s linear infinite;
            will-change: transform;
        }

        .country-scroll-wrapper:hover .country-scroll-track {
            animation-play-state: paused;
        }

        .country-card {
            position: relative;
            z-index: 5;
            transition: transform 0.3s ease;
        }

        .country-card:hover {
            z-index: 999;
        }

        .country-card img {
            width: 250px !important;
            height: 125px !important;
            object-fit: cover;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.20);
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .country-card:hover img {
            transform: scale(1.05);
            border-color: rgba(20, 184, 166, 0.45);
            box-shadow:
                0 10px 30px rgba(20, 184, 166, 0.30),
                0 0 20px rgba(20, 184, 166, 0.20);
        }

        .country-card::before {
            content: attr(data-country);
            position: absolute;
            top: -58px;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background: rgba(15, 23, 42, 0.96);
            color: #ffffff;
            font-size: 0.85rem;
            font-weight: 600;
            padding: 9px 14px;
            border-radius: 12px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            z-index: 999;
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.22);
            transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .country-card::after {
            content: "";
            position: absolute;
            left: 50%;
            top: -18px;
            width: 12px;
            height: 12px;
            background: rgba(15, 23, 42, 0.96);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            transform: translateX(-50%) rotate(-45deg) translateY(10px);
            opacity: 0;
            visibility: hidden;
            z-index: 998;
            transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .country-card:hover::after {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) rotate(-45deg) translateY(0);
        }

        .country-card:hover::before {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }

        @keyframes scrollCountries {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
            .country-scroll-track {
                gap: 16px;
            }

            .country-card {
                width: auto !important;
                height: auto !important;
                border-radius: 22px;
            }

            .country-card img {
                width: 170px !important;
                height: 85px !important;
            }

            .country-card::before {
                font-size: 0.8rem;
                padding: 7px 12px;
            }
        }

        /* =========================
            LEADERSHIP SECTION
        ==========================*/
        .leadership-section {
            position: relative;
            padding: 90px 8%;
            overflow: hidden;
            background:
                linear-gradient(rgba(7, 20, 45, 0.82), rgba(7, 20, 45, 0.82)),
                url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
        }

        .leadership-section::before {
            content: "";
            position: absolute;
            inset: 0;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        .leadership-wrapper {
            position: relative;
            z-index: 2;
            max-width: 1400px;
            margin: auto;
        }

        .section-tag {
            text-align: center;
            color: var(--ch-teal);
            font-size: clamp(12px, 2vw, 14px);
            letter-spacing: 4px;
            font-weight: 700;
            margin-bottom: 18px;
            text-transform: uppercase;
        }

        .section-title,
        .section-name {
            text-align: center;
            font-size: clamp(2.5rem, 6vw, 4rem);
            line-height: 1.1;
            font-weight: 800;
            margin-bottom: 25px;
        }
        
        .section-title { color: #000000; }
        .section-name { color: var(--ch-white); }

        .section-desc {
            max-width: 900px;
            margin: 0 auto 50px;
            text-align: center;
            font-size: clamp(1rem, 2.5vw, 1.125rem);
            line-height: 1.8;
            color: #d6dce8;
        }

        /* =========================
            CARD GRID & GLASSMORPHISM
        ==========================*/
        .leader-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
            gap: 35px;
            padding: 20px 0;
        }

        .leader-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 28px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        .leader-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 100%;
            background: linear-gradient(180deg, rgba(20, 184, 166, 0.2) 0%, transparent 40%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 0;
            pointer-events: none;
        }

        .leader-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(20, 184, 166, 0.3);
            border-color: rgba(20, 184, 166, 0.5);
        }
        
        .leader-card:hover::before {
            opacity: 1;
        }

        .leader-image {
            width: 100%;
            height: clamp(350px, 40vw, 450px);
            overflow: hidden;
            position: relative;
            z-index: 1;
        }

        .leader-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            object-position: top;
            transition: transform 0.6s ease;
        }
        
        .leader-card:hover .leader-image img {
            transform: scale(1.08);
        }

        .leader-content {
            padding: 28px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.6));
        }

        .leader-name {
            font-size: clamp(1.5rem, 3vw, 1.75rem);
            color: var(--ch-white);
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }

        .leader-role {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.05rem;
            margin-bottom: 25px;
            flex-grow: 1;
        }

        .learn-btn {
            border: 1px solid rgba(20, 184, 166, 0.4);
            background: rgba(255, 255, 255, 0.05);
            color: var(--ch-white);
            padding: 14px 28px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            width: 100%;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .learn-btn:hover {
            transform: scale(1.05);
            background: linear-gradient(135deg, var(--ch-teal), var(--ch-teal-dk));
            border-color: transparent;
            box-shadow: 0 5px 15px rgba(20, 184, 166, 0.4);
        }

        /* =========================
            MODAL (LEADERSHIP)
        ==========================*/
        .custom-leader-modal {
            position: fixed;
            inset: 0;
            background: rgba(7, 20, 45, 0.85); /* Deep dark blur */
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: 0.35s ease;
            z-index: 9999;
        }

        .custom-leader-modal.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-box {
            width: 100%;
            max-width: 1250px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 30px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05);
            overflow-y: auto;
            max-height: 90vh;
            position: relative;
            display: grid;
            grid-template-columns: 1.1fr 0.8fr;
            animation: popup 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popup {
            from { transform: translateY(30px) scale(0.96); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .modal-left {
            padding: clamp(30px, 5vw, 60px);
            color: var(--ch-white);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .modal-left h2 {
            font-size: clamp(32px, 5vw, 50px);
            margin-bottom: 10px;
            line-height: 1.1;
            font-weight: 800;
        }

        .modal-left h4 {
            font-size: clamp(18px, 3vw, 22px);
            color: var(--ch-teal);
            margin-bottom: 25px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .modal-left p {
            font-size: clamp(15px, 2vw, 18px);
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 0;
        }

        .modal-right {
            background: linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(15, 23, 42, 0.5));
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-right img {
            width: 100%;
            height: 100%;
            max-height: 780px;
            object-fit: contain; 
            object-position: center; 
            border-radius: 15px;
            display: block; 
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.4));
        }

        /* Fixed the Close Button by moving it out of modal-box and adjusting CSS */
        .close-btn {
            position: absolute;
            top: 25px;
            right: 35px;
            width: 45px;
            height: 45px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            color: var(--ch-white);
            font-size: 28px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .close-btn:hover {
            background: var(--ch-teal);
            border-color: var(--ch-teal);
            transform: rotate(90deg) scale(1.1);
            box-shadow: 0 0 15px rgba(20, 184, 166, 0.5);
        }

        @media(max-width:991px) {
            .modal-box { grid-template-columns: 1fr; }
            .modal-right {
                grid-row: 1;
                padding: 15px;
            }
            .modal-right img { max-height: 350px; }
            .modal-left { grid-row: 2; }
            
            .close-btn {
                top: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
                font-size: 24px;
            }
        }

        @media(max-width:600px) {
            .leadership-section { padding: 60px 5%; }
            .modal-right img { max-height: 250px; }
            .custom-leader-modal { padding: 15px; }
        }

        /*==== INFINITE SCROLL MEMBERSHIPS ========== */
        .membership-scroll-wrapper {
            margin-top: 2rem;
            position: relative;
        }

        .scroll-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            margin: 1.2rem 0;
        }

        .scroll-track {
            display: flex;
            align-items: center;
            width: max-content;
            gap: clamp(1.5rem, 4vw, 3rem);
            animation: infiniteScroll 28s linear infinite;
            will-change: transform;
        }

        .scroll-container:hover .scroll-track {
            animation-play-state: paused;
        }

        .affiliation-item {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
            margin: 0;
            width: auto;
        }

        .affiliation-img {
            width: clamp(100px, 15vw, 180px);
            height: auto;
            object-fit: contain;
            display: block;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .affiliation-item:hover .affiliation-img {
            transform: scale(1.08);
            opacity: 1;
        }

        .affiliation-name,
        .affiliation-full {
            display: none;
        }

        @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        @media (max-width: 480px) {
            .scroll-track { animation-duration: 22s; }
        }
        
        /* =========================================================
            FOOTER & OWNER MODAL
        ========================================================= */
        .owner-link {
            color: var(--ch-teal);
            text-decoration: none;
            font-weight: 700;
            transition: color 0.3s ease;
        }
        
        .owner-link:hover {
            color: var(--ch-white);
            text-decoration: underline;
        }
        
        .owner-modal-content {
            border-radius: 1.5rem;
            border: none;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
        }
        
        .owner-img-col {
            background: linear-gradient(135deg, var(--ch-dark-slate) 0%, var(--ch-teal-dk) 100%);
            position: relative;
            height: clamp(250px, 40vw, 400px);
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
            width: clamp(150px, 20vw, 250px);
            height: clamp(150px, 20vw, 250px);
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

        #ownerModalImg:hover { transform: scale(1.03); }
        
        .owner-text-col {
            background: var(--ch-white);
            padding: clamp(1.5rem, 4vw, 4rem); 
        }
        
        #ownerModalName {
            color: var(--ch-dark-slate);
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.2rem, 8vw, 4rem);
            line-height: 1;
            margin-bottom: 0.3rem;
            word-wrap: break-word; 
        }
        
        #ownerModalTitle {
            font-family: 'Barlow', sans-serif;
            font-weight: 700;
            color: var(--ch-teal);
            letter-spacing: 1.5px;
            font-size: clamp(0.75rem, 3vw, 1rem);
            margin-bottom: 1.5rem;
            line-height: 1.4;
        }

        .owner-bio-box {
            position: relative;
            background: var(--ch-bg-light);
            padding: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.25rem) clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 4vw, 2.5rem);
            border-radius: 1rem;
            border-left: 4px solid var(--ch-teal);
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
        }

        .owner-bio-box .fa-quote-left {
            position: absolute;
            top: -15px;
            left: 20px;
            font-size: clamp(1.5rem, 3vw, 2rem);
            color: var(--ch-teal);
            opacity: 0.2;
            background: var(--ch-white);
            padding: 0 10px;
            border-radius: 50%;
        }
        
        #ownerModalBio {
            font-size: clamp(0.9rem, 2vw, 1rem);
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
            padding: 12px 24px;
            background-color: #0077b5; 
            color: var(--ch-white) !important;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 119, 181, 0.25);
            width: 100%;
        }

        @media (min-width: 576px) { .owner-linkedin { width: auto; } }
        
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
            background-color: var(--ch-white);
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

    <section id="hero" style="position: relative; overflow: hidden;">
        <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('./assets/image/bg/11.jpeg') center center / cover no-repeat; z-index: 0;">
            <div class="hero-grid-lines"></div>
        </div>

        <div class="container-fluid px-3 px-lg-5 hero-content reveal visible" style="position: relative; z-index: 1;">
            <div class="row justify-content-center">
                <div class="col-lg-11 col-xl-10 text-center">
                    <div class="hero-eyebrow justify-content-center mx-auto mb-3">
                        <span class="dot"></span>BECOME A PARTNER
                    </div>

                    <h1 class="hero-title">
                        <span class="hero-subtitle">BUILD A GLOBAL DIGITAL BUSINESS WITH</span>
                        <span class="elegant-cursive blinking-cursor" id="typewriter-text"></span>
                    </h1>

                    <p class="hero-desc mx-auto text-white mt-4 px-3" style="max-width:800px; opacity: 0.9;">
                        Unlock your potential and build a sustainable business through trusted leadership and premium products.
                    </p>
                    
                    <div class="mt-5 mb-5"></div>

                    <div class="container text-center mb-4 reveal">
                        <span class="section-tag d-block mb-2">GLOBAL EXPANSION</span>
                        <h2 class="fw-bold text-white" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.2;">
                            Growing Across The
                            <span style="color: var(--ch-teal);">World</span>
                        </h2>
                        <p class="hero-desc mx-auto text-white mt-3 px-3">
                            Connecting opportunities and leaders worldwide.
                        </p>
                    </div>

                    <div class="country-scroll-wrapper">
                        <div class="country-scroll-track">
                            <div class="country-card" data-country="COTE D'IVOIRE">
                                <img src="./assets/image/flags/cote.png" alt="COTE D'IVOIRE">
                            </div>
                            <div class="country-card" data-country="CAMEROON">
                                <img src="./assets/image/flags/cameroon.png" alt="CAMEROON">
                            </div>
                            <div class="country-card" data-country="DEMOCRATIC REPUBLIC OF CONGO">
                                <img src="./assets/image/flags/dc.png" alt="DEMOCRATIC REPUBLIC OF CONGO">
                            </div>
                            <div class="country-card" data-country="PAPUA NEW GUINEA">
                                <img src="./assets/image/flags/pp.png" alt="PAPUA NEW GUINEA">
                            </div>
                            <div class="country-card" data-country="SOUTH AFRICA">
                                <img src="./assets/image/flags/sa.png" alt="SOUTH AFRICA">
                            </div>
                            <div class="country-card" data-country="TOGO">
                                <img src="./assets/image/flags/tg.png" alt="TOGO">
                            </div>
                            <div class="country-card" data-country="UGANDA">
                                <img src="./assets/image/flags/ug.png" alt="UGANDA">
                            </div>
                            <div class="country-card" data-country="COTE D'IVOIRE">
                                <img src="./assets/image/flags/cote.png" alt="COTE D'IVOIRE">
                            </div>
                            <div class="country-card" data-country="CAMEROON">
                                <img src="./assets/image/flags/cameroon.png" alt="CAMEROON">
                            </div>
                            <div class="country-card" data-country="DEMOCRATIC REPUBLIC OF CONGO">
                                <img src="./assets/image/flags/dc.png" alt="DEMOCRATIC REPUBLIC OF CONGO">
                            </div>
                            <div class="country-card" data-country="PAPUA NEW GUINEA">
                                <img src="./assets/image/flags/pp.png" alt="PAPUA NEW GUINEA">
                            </div>
                            <div class="country-card" data-country="SOUTH AFRICA">
                                <img src="./assets/image/flags/sa.png" alt="SOUTH AFRICA">
                            </div>
                            <div class="country-card" data-country="TOGO">
                                <img src="./assets/image/flags/tg.png" alt="TOGO">
                            </div>
                            <div class="country-card" data-country="UGANDA">
                                <img src="./assets/image/flags/ug.png" alt="UGANDA">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="leadership-section">
        <div class="leadership-wrapper">

            <div class="section-tag reveal">LEADERSHIP</div>

            <h1 class="section-name reveal">
                OUR PILLARS OF LEADERSHIP.
            </h1>

            <p class="section-desc reveal">
                INFINITE Group is guided by a formidable management team,
                blending decades of corporate executive expertise,
                entrepreneurial excellence, and long-term business vision.
            </p>

            <div class="leader-grid">
                <div class="leader-card reveal">
                    <div class="leader-image">
                        <img src="./assets/image/Willy.png" alt="Willy Q. Tee Ten">
                    </div>
                    <div class="leader-content">
                        <h3 class="leader-name">Willy Q. Tee Ten</h3>
                        <div class="leader-role">Chairman WQT</div>

                        <button class="learn-btn" onclick="openLeaderModal('willy')">
                            Learn More <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>

                <div class="leader-card reveal" style="transition-delay: 0.1s;">
                    <div class="leader-image">
                        <img src="./assets/image/owee.png" alt="Norwejann Owee Cruz">
                    </div>
                    <div class="leader-content">
                        <h3 class="leader-name">Norwejann “Owee” Cruz</h3>
                        <div class="leader-role">President</div>

                        <button class="learn-btn" onclick="openLeaderModal('owee')">
                            Learn More <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>

                <div class="leader-card reveal" style="transition-delay: 0.2s;">
                    <div class="leader-image">
                        <img src="./assets/image/anne.png" alt="Joanne Reyes">
                    </div>
                    <div class="leader-content">
                        <h3 class="leader-name">Joanne Reyes</h3>
                        <div class="leader-role">Founder and Director</div>

                        <button class="learn-btn" onclick="openLeaderModal('anne')">
                            Learn More <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="custom-leader-modal" id="leaderModal">
        <button class="close-btn" onclick="closeLeaderModal()">
            &times;
        </button>
        <div class="modal-box">
            <div class="modal-left">
                <h2 id="modalName"></h2>
                <h4 id="modalRole"></h4>
                <p id="modalText"></p>
            </div>

            <div class="modal-right">
                <img id="modalImage" src="" alt="Leader Image">
            </div>
        </div>
    </div>

    <section class="section-pad bg-light" id="registrations" style="padding-top: 80px; padding-bottom: 80px; background: var(--ch-bg-light);">
        <div class="container">
            <div class="row justify-content-center mb-4 text-center reveal px-3">
                <div class="col-lg-8">
                    <span class="section-tag" style="color: var(--ch-teal);">REGISTRATIONS</span>
                    <h2 class="section-title mb-3" style="color: var(--ch-dark-slate);">Our Legal and Government <span class="highlight" style="color: var(--ch-teal);">Registrations</span></h2>
                    <p class="text-muted mt-3 mb-0" style="color: var(--ch-slate-muted);"><i class="fas fa-shield-alt me-2" style="color: var(--ch-teal);"></i> Streamline taxes and legal readiness · Forward-thinking founders staying ahead of government regulations.</p>
                </div>
            </div>

            <div class="row justify-content-center mb-5 reveal px-3">
                <div class="col-lg-10 col-xl-8">
                    <div class="position-relative">
                        <img src="./assets/image/30.png" alt="Legal and Government Registrations" class="img-fluid rounded-4 shadow-lg w-100" style="object-fit: cover; max-height: 450px; border: 4px solid var(--ch-white);">
                        <div class="position-absolute top-0 start-0 translate-middle p-3 rounded-circle shadow-sm d-none d-md-flex align-items-center justify-content-center" style="background: var(--ch-white); border: 2px solid var(--ch-bg-light); width: 60px; height: 60px;">
                            <i class="fas fa-certificate fs-3" style="color: var(--ch-teal);"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4" id="registrationsGrid"></div>
        </div>
    </section>

    <section class="section-pad" id="memberships" style="padding-top: 40px; padding-bottom: 80px; background: var(--ch-bg-light);">
        <div class="container">
            <div class="row justify-content-center mb-4 text-center reveal px-3">
                <div class="col-lg-8">
                    <span class="section-tag" style="color: var(--ch-teal);">MEMBERSHIPS & AFFILIATIONS</span>
                    <h2 class="section-title mb-3" style="color: var(--ch-dark-slate);">Our Memberships and <span class="highlight" style="color: var(--ch-teal);">Affiliations</span></h2>
                    <p class="text-muted mt-3 mb-0" style="color: var(--ch-slate-muted);"><i class="fas fa-handshake me-2" style="color: var(--ch-teal);"></i> Proudly partnered with industry leaders · Building a network of excellence and global trust.</p>
                </div>
            </div>

            <div class="membership-scroll-wrapper reveal">
                <div class="scroll-container">
                    <div class="scroll-track" id="infiniteTrack"></div>
                </div>
                <div class="trust-note d-flex flex-wrap justify-content-center gap-3 px-3 mt-4 text-muted" style="color: var(--ch-slate-muted); font-size: clamp(0.85rem, 2vw, 1rem);">
                    <span><i class="fas fa-check-circle" style="color: var(--ch-teal);"></i> Verified partnerships</span>
                    <span><i class="fas fa-infinity" style="color: var(--ch-teal);"></i> Endless collaboration</span>
                    <span><i class="fas fa-trophy" style="color: var(--ch-teal);"></i> Industry excellence</span>
                </div>
            </div>
        </div>
    </section>

    <section class="section-pad bg-white" style="padding-top: 80px; padding-bottom: 80px; background: var(--ch-white);">
        <div class="container px-4">
            <div class="row align-items-center g-5 text-center text-lg-start">
                <div class="col-lg-6 reveal">
                    <h2 class="fw-bold mb-4 section-title" style="color: var(--ch-dark-slate); text-align: left;">A Business Platform for <br><span style="color: var(--ch-teal);">Global Entrepreneurs</span></h2>
                    <p class="text-muted mb-4 fs-5" style="color: var(--ch-slate-muted);">INFINITE provides a comprehensive ecosystem designed to help you succeed in the digital economy.</p>
                    <a href="select-country.php" class="btn fw-bold px-4 py-3 shadow" style="background-color: var(--ch-teal); color: var(--ch-white); border-radius: 50px;">See How To Join <i class="bi bi-arrow-right ms-2"></i>
                    </a>
                </div>
                <div class="col-lg-6 reveal">
                    <img src="./assets/image/bg/10.jpg" alt="Infinite Business Platform" class="img-fluid rounded-4 shadow-lg w-100" style="object-fit: cover;">
                </div>
            </div>
        </div>
    </section>

    <footer id="contact" style="background: var(--ch-dark-slate); padding-top: 80px;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center g-5 align-items-center">
                <div class="col-lg-5 col-xl-4 reveal text-center text-lg-start">
                    <div class="mb-3" style="color: var(--ch-white); font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 8vw, 50px); letter-spacing: 2px;">INFINITE<span style="color: var(--ch-teal);">.</span></div>
                    <p class="mb-4" style="color: rgba(255,255,255,0.7); font-size: 1.1rem;">Empowering Global Entrepreneurs Through Premium Skincare & Wellness</p>
                    <div class="d-flex justify-content-center justify-content-lg-start gap-3 mb-5">
                        <a href="" class="text-white fs-4"><i class="bi bi-facebook"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-instagram"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-tiktok"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-twitter-x"></i></a>
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
            <div class="row align-items-center pb-4 text-center text-md-start" style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">
                <div class="col-md-6 mb-2 mb-md-0">&copy; <?= date('Y') ?> Infinite. All rights reserved.</div>
                
                <div class="col-md-6 text-md-end">
                    Properties of 
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="primo">Primo Ecalne Jr.</a> | 
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="aera">Aera Claridad</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- OWNER MODAL (Redesigned matching index.php) -->
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

    <div class="modal fade" id="regSuccessModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="border-radius: 1.5rem; overflow: hidden; border: none; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                <div class="modal-header" style="background: var(--ch-teal); color: white; border-bottom: none; padding: 1.5rem;">
                    <h5 class="modal-title fw-bold"><i class="bi bi-clock-history me-2"></i> Application Pending</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" style="padding: 2rem;">
                    <p class="mb-4" style="color: var(--ch-dark-slate); font-size: 1.1rem;">Your registration has been submitted and is currently <strong>pending approval</strong>.</p>
                    
                    <div style="background: var(--ch-bg-light); border-radius: 1rem; padding: 1.5rem; border: 1px dashed var(--ch-teal);">
                        <p class="mb-2 text-muted fw-bold" style="font-size: 0.9rem; letter-spacing: 1px;">TEMPORARY LOGIN CREDENTIALS</p>
                        <p class="mb-1"><strong>Email:</strong> <span id="successEmail" style="color: var(--ch-teal); font-family: monospace; font-size: 1.1rem;"></span></p>
                        <p class="mb-0"><strong>Password:</strong> <span id="successPassword" style="color: var(--ch-teal); font-family: monospace; font-size: 1.1rem;"></span></p>
                    </div>
                    
                    <p class="mt-4 text-muted small">You can use these credentials to log in and access your portal once approved by an Admin.</p>
                </div>
                <div class="modal-footer" style="border-top: none; padding: 1.5rem; justify-content: center;">
                    <a href="login.php" class="btn w-100 fw-bold py-2 text-white" style="background-color: var(--ch-dark-slate); border-radius: 50px;">Go to Login</a>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/script.js"></script>
    <script src="./assets/js/join-ph.js"></script>

    <script>
        // ==========================================
        // TYPEWRITER EFFECT LOGIC (LOOPING)
        // ==========================================
        const textToType = "Infinite";
        const typewriterElement = document.getElementById("typewriter-text");
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = textToType.substring(0, charIndex);
            typewriterElement.textContent = currentText === '' ? '\u200B' : currentText;

            let typingSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex < textToType.length) {
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeText, typingSpeed);
            } else {
                isDeleting = !isDeleting;
                setTimeout(typeText, isDeleting ? 2000 : 500);
            }
        }

        // ==========================================
        // LEADERSHIP MODAL LOGIC (FIXED SCROLL & CLOSE BUTTON)
        // ==========================================
        const leaderData = {
            'willy': {
                name: 'Willy Q. Tee Ten',
                role: 'Chairman WQT',
                text: 'Mr.Tee Ten, also known as WQT, is a respected Filipino business leader and President of AUTOHUB GROUP. With over 40 years of experience, he built one of the country’s leading automotive empires, managing 22 multinational brands, more than 85 dealer branches, and over 2,000 employees nationwide. He also plays a major role in the automotive industry as President of the Philippine Automotive Dealers Association and the Electric Vehicle Association of the Philippines. Known for his achievements and leadership, he earned Top 2 in the 1985 Chemical Engineering Board Exams and received several prestigious awards and recognitions in the motoring and business industries.',
                image: './assets/image/Willy.png'
            },
            'owee': {
                name: 'Norwejann “Owee” Cruz',
                role: 'President',
                text: 'Ms. Cruz is a skilled business leader and creative executive known for driving the success of INFINITE Group through her strong leadership and extensive industry experience. She currently serves as the Chief Marketing Officer and Head of Fleet Sales of AUTOHUB GROUP, General Manager of GAC’s flagship store in BGC, Managing Director of ODV Creative Media Inc., and President of Two Scents International Corporation. With over 20 years of experience in marketing and public relations, she is recognized for her innovation, strategic leadership, and business growth expertise. She is also an alumna of the University of the Philippines, an internationally certified Color Analyst, and a respected BNI Elite Network Leader and Gold Club Member.',
                image: './assets/image/owee.png'
            },
            'anne': {
                name: 'Joanne Reyes',
                role: 'Founder and Director',
                text: 'Ms. Reyes is the youngest partner of INFINITE Group,recognized for her creative mindset, people-centered leadership, and passion for collaboration and innovation. She currently serves as the Treasurer of Cimplex Solutions, Inc. while pursuing her entrepreneurial and creative interests. With more than ten years of experience in network marketing and five years as a professional performer under the Viva Artist Agency, she has developed strong communication and leadership skills.She is also an alumna of the Philippine School of Interior Design and Mapúa University.',
                image: './assets/image/anne.png'
            }
        };

        function openLeaderModal(leaderKey) {
            const data = leaderData[leaderKey];
            if (!data) return;
            
            const leaderModal = document.getElementById("leaderModal");
            document.getElementById("modalName").innerText = data.name;
            document.getElementById("modalRole").innerText = data.role;
            document.getElementById("modalText").innerText = data.text;
            document.getElementById("modalImage").src = data.image;
            
            leaderModal.classList.add("active");
            
            // Lock scrolling on both body and html
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        function closeLeaderModal() {
            document.getElementById("leaderModal").classList.remove("active");
            
            // Restore scrolling on both body and html
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        document.getElementById("leaderModal").addEventListener("click", function(e) {
            if (e.target === this) {
                closeLeaderModal();
            }
        });


        // ==========================================
        // MAIN JAVASCRIPT INITIALIZATION
        // ==========================================
        document.addEventListener("DOMContentLoaded", function() {
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
                // FIX: Prevents Double Submission caused by script.js + inline combination
                if (contactForm.dataset.bound) return;
                contactForm.dataset.bound = "true";

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

            // TRIGGER TYPEWRITER EFFECT
            setTimeout(typeof typeText === 'function' ? typeText : () => {}, 500);

            const navbar = document.getElementById('mainNav');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

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

            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                const elementVisible = 100;
                reveals.forEach((reveal) => {
                    const elementTop = reveal.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('visible');
                    }
                });
            };
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll();
            
            // ==========================================
            // OWNER MODAL POPULATION LOGIC (Matching index.php)
            // ==========================================
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

        // ========== INFINITE SCROLL MEMBERSHIPS ==========
        (function() {
            const affiliationsData = [{
                    img: "./assets/image/logoHadsap.png"
                },
                {
                    img: "./assets/image/logoECCP.png"
                },
                {
                    img: "./assets/image/logoAnzcham.png"
                },
                {
                    img: "./assets/image/logoBNI.png"
                },
                {
                    img: "./assets/image/logoCCIP.png"
                },
                {
                    img: "./assets/image/logoKCCP.png"
                },
            ];

            function createAffiliationCard(aff) {
                const card = document.createElement('div');
                card.className = 'affiliation-item';
                card.innerHTML = `<img src="${aff.img}" alt="Member logo" class="affiliation-img">`;
                return card;
            }

            function buildInfiniteTrack() {
                const track = document.getElementById('infiniteTrack');
                if (!track) return;
                track.innerHTML = '';
                affiliationsData.forEach(aff => track.appendChild(createAffiliationCard(aff)));
                const items = Array.from(track.children);
                items.forEach(item => track.appendChild(item.cloneNode(true)));
            }

            function initInfiniteScroll() {
                buildInfiniteTrack();
                const container = document.querySelector('.scroll-container');
                const track = document.getElementById('infiniteTrack');
                if (!container || !track) return;

                container.addEventListener('touchstart', () => track.style.animationPlayState = 'paused');
                container.addEventListener('touchend', () => track.style.animationPlayState = 'running');
                container.addEventListener('mouseleave', () => {
                    if (!container.matches(':hover')) track.style.animationPlayState = 'running';
                });

                let resizeTimer;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(() => {
                        const currentAnim = track.style.animation;
                        track.style.animation = 'none';
                        requestAnimationFrame(() => {
                            track.style.animation = currentAnim || 'infiniteScroll 32s linear infinite';
                        });
                    }, 150);
                });

                window.addEventListener('load', () => {
                    track.style.animation = 'none';
                    track.offsetHeight;
                    track.style.animation = 'infiniteScroll 32s linear infinite';
                });
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initInfiniteScroll);
            } else {
                initInfiniteScroll();
            }
        })();
    </script>
</body>

</html>