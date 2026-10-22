<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: ../login.php");
    exit;
}
require 'db.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Dashboard | Infinite</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <style>
        :root {
            --ch-bg-light: #f8fafc;
            --ch-border: #e2e8f0;
            --ch-teal: #14b8a6;
            --ch-teal-dk: #0f766e;
            --ch-slate-muted: #64748b;
            --ch-dark-slate: #0f172a;
        }

        body {
            background: var(--ch-bg-light);
            font-family: 'Barlow', sans-serif;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }

        /* --- PRELOADER STYLES --- */
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--ch-bg-light);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 0.4s ease-out, visibility 0.4s ease-out;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid var(--ch-border);
            border-top-color: var(--ch-teal);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }

        .preloader-text {
            color: var(--ch-dark-slate);
            font-weight: 700;
            letter-spacing: 2px;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.5rem;
        }

        @keyframes spin { 
            100% { transform: rotate(360deg); } 
        }
        /* --- END PRELOADER STYLES --- */

        #wrapper {
            display: flex;
            width: 100%;
            min-height: 100vh;
        }

        #sidebar-wrapper {
            min-width: 260px;
            max-width: 260px;
            background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
            min-height: 100vh;
            transition: left 0.3s ease-in-out, margin 0.3s ease-in-out;
            border-right: 1px solid rgba(148, 163, 184, 0.15);
            z-index: 1050;
        }

        .sidebar-heading {
            padding: 1.5rem 1.25rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .list-group-item {
            background-color: transparent;
            border: none;
            color: #cbd5e1;
            padding: 0.85rem 1.25rem;
            font-weight: 500;
            border-left: 3px solid transparent;
            transition: all 0.2s;
        }

        .list-group-item:hover,
        .list-group-item.active {
            background-color: rgba(20, 184, 166, 0.1);
            color: var(--ch-teal);
            border-left-color: var(--ch-teal);
        }

        .list-group-item i {
            width: 24px;
            text-align: center;
            margin-right: 10px;
            color: #94a3b8;
        }

        .list-group-item:hover i,
        .list-group-item.active i {
            color: var(--ch-teal);
        }

        #page-content-wrapper {
            min-width: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        .top-navbar {
            background: #fff;
            border-bottom: 1px solid var(--ch-border);
            padding: 1rem 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .dashboard-card {
            background: #fff;
            border: 1px solid var(--ch-border);
            border-radius: 1.25rem;
            padding: 1.5rem;
            box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05);
        }

        .stat-card {
            background: #fff;
            border: 1px solid var(--ch-border);
            border-radius: 1rem;
            padding: 1.25rem;
            box-shadow: 0 4px 15px -10px rgba(15, 23, 42, 0.05);
            text-align: left;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: transform 0.2s;
        }

        /* Table Responsiveness */
        .table-responsive {
            -webkit-overflow-scrolling: touch;
        }

        .table-custom th {
            background-color: transparent;
            color: var(--ch-slate-muted);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-bottom: 2px solid var(--ch-border);
            padding: 1rem;
            white-space: nowrap;
        }

        .table-custom td {
            padding: 1rem;
            vertical-align: middle;
            color: var(--ch-dark-slate);
            border-bottom: 1px solid var(--ch-border);
        }

        #sidebar-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        /* Mobile specific styles */
        @media (max-width: 768px) {
            #sidebar-wrapper {
                position: fixed;
                left: -260px;
                height: 100vh;
                margin-left: 0;
            }

            body.sb-sidenav-toggled #sidebar-wrapper {
                left: 0;
            }

            body.sb-sidenav-toggled #sidebar-overlay {
                display: block;
                opacity: 1;
            }

            .dashboard-card {
                padding: 1rem;
            }
            
            .stat-card h2 {
                font-size: 1.75rem;
            }

            .btn-action-text {
                display: none;
            }
        }
    </style>
</head>

<body>
    <div id="preloader">
        <div class="spinner"></div>
        <div class="preloader-text">INFINITE ADMIN</div>
    </div>

    <div id="wrapper">
        <div id="sidebar-wrapper">
            <div class="sidebar-heading text-center">
                <a class="navbar-brand text-logo mx-auto" href="../index.php" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;">
                    <span class="logo-main" style="color: #fff; font-size: 32px; font-weight: 900; line-height: 0.8; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1.5px;">INFINITE</span>
                    <span class="logo-sub" style="color: var(--ch-teal); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin-top: 4px;">ADMIN PORTAL</span>
                </a>
            </div>
            <div class="list-group list-group-flush mt-3">
                <a href="dashboard.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'dashboard.php' ? 'active' : '' ?>">
                    <i class="fa-solid fa-chart-pie"></i> Analytics Dashboard
                </a>
                <a href="registrations.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'registrations.php' ? 'active' : '' ?>">
                    <i class="fa-solid fa-file-signature"></i> Registrations & Inquiries
                </a>
                <a href="manage_users.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'manage_users.php' ? 'active' : '' ?>">
                    <i class="fa-solid fa-users"></i> Manage Members
                </a>
                <a href="admin_messages.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'admin_messages.php' ? 'active' : '' ?>">
                    <i class="fa-solid fa-comments"></i> Member Support
                </a>
                <a href="add_admin.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'add_admin.php' ? 'active' : '' ?>">
                    <i class="fa-solid fa-user-shield"></i> Admin Accounts
                </a>
                <a href="logout.php" class="list-group-item list-group-item-action text-danger mt-4" style="border-left-color: transparent;">
                    <i class="fa-solid fa-right-from-bracket text-danger"></i> Logout
                </a>
            </div>
        </div>

        <div id="sidebar-overlay"></div>

        <div id="page-content-wrapper">
            <nav class="navbar navbar-expand-lg top-navbar">
                <div class="container-fluid align-items-center">
                    <button class="btn btn-light d-md-none" id="menu-toggle" style="border: 1px solid var(--ch-border); padding: 0.375rem 0.75rem;">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <div class="ms-auto d-flex align-items-center gap-2 gap-md-3">
                        <div class="text-end d-none d-sm-block">
                            <span style="font-size: 0.8rem; font-weight: 600; color: var(--ch-slate-muted); display: block; line-height: 1;">Logged in as</span>
                            <span style="font-weight: 700; color: var(--ch-dark-slate);"><?= htmlspecialchars($_SESSION['admin_username'] ?? 'Admin') ?></span>
                        </div>
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--ch-teal); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0;">
                            <?= strtoupper(substr($_SESSION['admin_username'] ?? 'A', 0, 1)) ?>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="container-fluid p-3 p-lg-5">
                <div class="row mb-4">
                    <div class="col-6 col-xl-3 mb-3">
                        <div class="stat-card">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Total Site Visits</h6>
                                    <h2 class="mb-0" id="stat-visits" style="font-weight: 800; color: var(--ch-dark-slate);">0</h2>
                                </div>
                                <div class="d-none d-sm-block" style="color: var(--ch-teal); font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-eye"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-xl-3 mb-3">
                        <div class="stat-card">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Product Clicks</h6>
                                    <h2 class="mb-0" id="stat-clicks" style="font-weight: 800; color: #f59e0b;">0</h2>
                                </div>
                                <div class="d-none d-sm-block" style="color: #f59e0b; font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-hand-pointer"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-xl-3 mb-3">
                        <div class="stat-card">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Active Users</h6>
                                    <h2 class="mb-0" id="stat-users" style="font-weight: 800; color: #10b981;">0</h2>
                                </div>
                                <div class="d-none d-sm-block" style="color: #10b981; font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-users"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-xl-3 mb-3">
                        <div class="stat-card">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Bounce Rate</h6>
                                    <h2 class="mb-0" id="stat-bounce" style="font-weight: 800; color: var(--ch-dark-slate);">0%</h2>
                                </div>
                                <div class="d-none d-sm-block" style="color: var(--ch-slate-muted); font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-chart-simple"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">System Performance <span id="live-indicator" style="color: #ef4444; font-size: 0.6rem; vertical-align: top;"><i class="fa-solid fa-circle"></i> LIVE</span></span>
                        <h2 style="font-size: clamp(1.75rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                            Website <span style="color: var(--ch-teal);">Analytics</span>
                        </h2>
                    </div>
                    <div class="d-flex gap-2">
                        <button onclick="fetchAnalyticsData(true)" class="btn btn-outline-secondary bg-white" style="font-size: 0.85rem; border-radius: 0.85rem; padding: 0.6rem 1.25rem;">
                            <i class="fa-solid fa-rotate-right"></i> <span class="btn-action-text">Refresh Data</span>
                        </button>
                        <button onclick="sendEmailReport()" class="btn btn-primary" style="font-size: 0.85rem; border-radius: 0.85rem; padding: 0.6rem 1.25rem; background-color: var(--ch-teal); border: none;">
                            <i class="fa-solid fa-file-export"></i> <span class="btn-action-text">Send Email Report</span>
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="dashboard-card">
                            <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 1.5rem;">Top Performing Products</h5>
                            <div class="table-responsive">
                                <table class="table table-custom table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th><i class="fa-solid fa-box me-1"></i> Product Name</th>
                                            <th><i class="fa-solid fa-hand-pointer me-1"></i> Clicks / Views</th>
                                            <th><i class="fa-solid fa-arrow-trend-up me-1"></i> Trend</th>
                                            <th class="text-center"><i class="fa-solid fa-signal me-1"></i> Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="top-products-body">
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Sidebar Toggle Logic
        const menuToggle = document.getElementById('menu-toggle');
        const overlay = document.getElementById('sidebar-overlay');
        const body = document.body;

        function toggleSidebar(e) {
            if(e) e.preventDefault();
            body.classList.toggle('sb-sidenav-toggled');
        }

        menuToggle.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);

        // --- REAL-TIME DATA FETCHING ---
        function fetchAnalyticsData(manualRefresh = false) {
            fetch('api_get_analytics.php')
                .then(res => res.json())
                .then(data => {
                    if(data.error) return;

                    // Update Top Stats
                    document.getElementById('stat-visits').innerText = data.stats.total_visits;
                    document.getElementById('stat-clicks').innerText = data.stats.product_clicks;
                    document.getElementById('stat-users').innerText = data.stats.active_users;
                    document.getElementById('stat-bounce').innerText = data.stats.bounce_rate;

                    // Update Table
                    const tbody = document.getElementById('top-products-body');
                    tbody.innerHTML = ''; // Clear current rows
                    
                    data.products.forEach(product => {
                        let trendIcon = 'fa-minus';
                        let trendClass = 'text-warning';
                        
                        if (product.trend_dir === 'up') {
                            trendIcon = 'fa-arrow-up';
                            trendClass = 'text-success';
                        } else if (product.trend_dir === 'down') {
                            trendIcon = 'fa-arrow-down';
                            trendClass = 'text-danger';
                        }

                        const row = `
                        <tr>
                            <td><div style="font-weight: 700; font-size: 1.05rem;">${product.name}</div></td>
                            <td><div style="font-weight: 600;">${product.clicks} clicks</div></td>
                            <td class="${trendClass}"><i class="fa-solid ${trendIcon} me-1"></i> ${product.trend_text}</td>
                            <td class="text-center"><span class="badge ${product.status_class}">${product.status}</span></td>
                        </tr>`;
                        tbody.insertAdjacentHTML('beforeend', row);
                    });

                    // Flashing Live Indicator Effect
                    const indicator = document.getElementById('live-indicator');
                    indicator.style.opacity = '0';
                    setTimeout(() => indicator.style.opacity = '1', 200);

                    if(manualRefresh) {
                        // Small animation to show it refreshed
                        const btnText = document.querySelector('.fa-rotate-right');
                        btnText.classList.add('fa-spin');
                        setTimeout(() => btnText.classList.remove('fa-spin'), 1000);
                    }
                })
                .catch(err => console.error("Data fetch error:", err));
        }

        // Initialize Real-time Loop and Preloader
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Fetch the data immediately
            fetchAnalyticsData();

            // 2. Hide preloader smoothly after a short delay (so the data has time to load)
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800); // 0.8 second delay

            // 3. Set Interval to fetch data every 5 seconds (Real-time polling)
            setInterval(fetchAnalyticsData, 5000); 
        });

        // --- EMAIL REPORT SCRIPT ---
        function sendEmailReport() {
            const targetEmail = prompt("Enter the admin email address to receive the Analytics Report:");
            
            if (targetEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(targetEmail)) {
                    alert("Please enter a valid email address.");
                    return;
                }

                const formData = new FormData();
                formData.append('email', targetEmail);

                const btnText = document.querySelector('.fa-file-export').nextElementSibling;
                const originalText = btnText.innerText;
                btnText.innerText = "Sending...";

                fetch('api_send_analytics.php', {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert("Success! \n" + data.message);
                    } else {
                        alert("Error: \n" + data.message);
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    alert("Something went wrong processing your request. Please try again.");
                })
                .finally(() => {
                    btnText.innerText = originalText;
                });
            }
        }
    </script>
</body>
</html>