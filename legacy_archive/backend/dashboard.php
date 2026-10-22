<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

// === 15-MINUTE INACTIVITY AUTO-LOGOUT ===
$timeout_duration = 900; // 15 minutes in seconds (15 * 60)

if (isset($_SESSION['last_activity'])) {
    // Calculate the session's "age"
    $duration = time() - $_SESSION['last_activity'];

    if ($duration > $timeout_duration) {
        // Session expired: destroy session and redirect to login
        session_unset();
        session_destroy();
        
        header("Location: login.php?msg=expired");
        exit;
    }
}

// Update the last activity time so the timer resets on every page load/action
$_SESSION['last_activity'] = time();
// =========================================

// === MOCK PRODUCT ANALYTICS DATA ===
$product_analytics = [
    ["name" => "Infinite Robustus Coffee", "category" => "Wellness", "clicks" => 15420, "growth" => "+14.5%", "trend" => "up"],
    ["name" => "Infinite Barley Powder", "category" => "Wellness", "clicks" => 14105, "growth" => "+12.2%", "trend" => "up"],
    ["name" => "White Plus Glutathione", "category" => "Wellness", "clicks" => 12850, "growth" => "+8.4%", "trend" => "up"],
    ["name" => "O'Lamour Core La Crème", "category" => "O'Lamour", "clicks" => 11200, "growth" => "+5.1%", "trend" => "up"],
    ["name" => "Infinite Botox Serum", "category" => "Skincare", "clicks" => 9850, "growth" => "+4.2%", "trend" => "up"],
    ["name" => "Infinite Brightening Serum", "category" => "Skincare", "clicks" => 9100, "growth" => "-1.5%", "trend" => "down"],
    ["name" => "O'Lamour Aeterna BB Cream", "category" => "O'Lamour", "clicks" => 8750, "growth" => "+2.8%", "trend" => "up"],
    ["name" => "Infinite White Body Lotion", "category" => "Skincare", "clicks" => 8100, "growth" => "+3.1%", "trend" => "up"],
    ["name" => "O'Lamour Quintessence Ampoule", "category" => "O'Lamour", "clicks" => 7650, "growth" => "-0.5%", "trend" => "down"],
    ["name" => "Infinite Glow-Up Soap", "category" => "Skincare", "clicks" => 7200, "growth" => "+10.2%", "trend" => "up"],
    ["name" => "Vida Tone-Up Sun Serum", "category" => "Vida Skin", "clicks" => 6800, "growth" => "+6.7%", "trend" => "up"],
    ["name" => "O'Lamour Facial Essence", "category" => "O'Lamour", "clicks" => 6400, "growth" => "-2.1%", "trend" => "down"],
    ["name" => "Infinite Deowhite Soap", "category" => "Skincare", "clicks" => 5900, "growth" => "+1.4%", "trend" => "up"],
    ["name" => "Vida Lotus Soothing Toner", "category" => "Vida Skin", "clicks" => 5400, "growth" => "+0.8%", "trend" => "up"],
    ["name" => "Vida Doux Cleanser", "category" => "Vida Skin", "clicks" => 4900, "growth" => "-1.2%", "trend" => "down"],
    ["name" => "O'Lamour Essence Bar", "category" => "O'Lamour", "clicks" => 4500, "growth" => "+4.5%", "trend" => "up"],
    ["name" => "Vida Skin Lotus Booster Ampoule", "category" => "Vida Skin", "clicks" => 4100, "growth" => "-3.4%", "trend" => "down"],
    ["name" => "Vida Skin Glow Vita Cream", "category" => "Vida Skin", "clicks" => 3800, "growth" => "0.0%", "trend" => "stable"],
];

// Sort array by clicks (highest to lowest)
usort($product_analytics, function($a, $b) {
    return $b['clicks'] <=> $a['clicks'];
});
// =========================================
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
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-dark-slate: #0f172a; --ch-slate-muted: #64748b; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; transition: left 0.3s ease-in-out; border-right: 1px solid rgba(148, 163, 184, 0.15); z-index: 1050; }
        .sidebar-heading { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .list-group-item { background-color: transparent; border: none; color: #cbd5e1; padding: 0.85rem 1.25rem; font-weight: 500; border-left: 3px solid transparent; transition: all 0.2s; }
        .list-group-item:hover, .list-group-item.active { background-color: rgba(20, 184, 166, 0.1); color: var(--ch-teal); border-left-color: var(--ch-teal); }
        .list-group-item i { width: 24px; text-align: center; margin-right: 10px; color: #94a3b8; }
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .top-navbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
        
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 1.5rem; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); height: 100%; display: flex; flex-direction: column;}
        .stat-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 4px 15px -10px rgba(15, 23, 42, 0.05); transition: transform 0.2s; }
        .stat-card:hover { transform: translateY(-3px); }
        
        /* Custom Table & Scrollbar Styles */
        .table-scrollable { max-height: 400px; overflow-y: auto; overflow-x: auto; padding-right: 5px;}
        .table-scrollable::-webkit-scrollbar { width: 6px; height: 6px; }
        .table-scrollable::-webkit-scrollbar-track { background: var(--ch-bg-light); border-radius: 10px; }
        .table-scrollable::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .table-scrollable::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .table-custom { margin-bottom: 0; width: 100%; min-width: 500px;}
        .table-custom thead th { position: sticky; top: 0; background: #fff; color: var(--ch-slate-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid var(--ch-border); padding: 1rem; white-space: nowrap; z-index: 1; box-shadow: 0 1px 0 var(--ch-border); }
        .table-custom td { padding: 1rem; vertical-align: middle; color: var(--ch-dark-slate); border-bottom: 1px solid var(--ch-border); }
        
        /* Category Badges */
        .badge-wellness { background-color: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
        .badge-skincare { background-color: rgba(244, 63, 94, 0.1); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.2); }
        .badge-olamour { background-color: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.2); }
        .badge-vida { background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }

        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; transition: opacity 0.3s ease-in-out; }
        @media (max-width: 768px) { #sidebar-wrapper { position: fixed; left: -260px; height: 100vh; } body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>

        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>

            <div class="container-fluid p-3 p-lg-5">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">System Performance <span id="live-indicator" style="color: #ef4444; font-size: 0.6rem; vertical-align: top;"><i class="fa-solid fa-circle pe-1"></i>LIVE</span></span>
                        <h2 style="font-size: clamp(1.75rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                            System <span style="color: var(--ch-teal);">Overview</span>
                        </h2>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button id="btnExport" onclick="exportToEmail()" class="btn text-white shadow-sm" style="background-color: var(--ch-teal); font-size: 0.85rem; border-radius: 0.85rem; padding: 0.6rem 1.25rem; border: none; transition: all 0.3s;">
                            <i class="fa-solid fa-envelope me-1"></i> Export Report
                        </button>
                        <button onclick="fetchDashboardData(true)" class="btn btn-outline-secondary bg-white shadow-sm" style="font-size: 0.85rem; border-radius: 0.85rem; padding: 0.6rem 1.25rem;">
                            <i class="fa-solid fa-rotate-right"></i> Refresh
                        </button>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-6 col-xl-3 mb-3"><div class="stat-card"><div class="d-flex justify-content-between align-items-center"><div><h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Inquiries</h6><h2 class="mb-0" id="stat-total-inq" style="font-weight: 800; color: var(--ch-dark-slate);">0</h2></div><div class="d-none d-sm-block" style="color: var(--ch-teal); font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-inbox"></i></div></div></div></div>
                    <div class="col-6 col-xl-3 mb-3"><div class="stat-card"><div class="d-flex justify-content-between align-items-center"><div><h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Pending Reg</h6><h2 class="mb-0" id="stat-pending-reg" style="font-weight: 800; color: #10b981;">0</h2></div><div class="d-none d-sm-block" style="color: #10b981; font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-user-clock"></i></div></div></div></div>
                    <div class="col-6 col-xl-3 mb-3"><div class="stat-card"><div class="d-flex justify-content-between align-items-center"><div><h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Approved Reg</h6><h2 class="mb-0" id="stat-approved-reg" style="font-weight: 800; color: var(--ch-dark-slate);">0</h2></div><div class="d-none d-sm-block" style="color: var(--ch-slate-muted); font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-user-check"></i></div></div></div></div>
                    <div class="col-6 col-xl-3 mb-3"><div class="stat-card"><div class="d-flex justify-content-between align-items-center"><div><h6 class="text-muted mb-1" style="font-weight: 600; font-size: 0.85rem; text-transform:uppercase;">Web Visits</h6><h2 class="mb-0" id="stat-visits" style="font-weight: 800; color: #f59e0b;">0</h2></div><div class="d-none d-sm-block" style="color: #f59e0b; font-size: 2rem; opacity: 0.8;"><i class="fa-solid fa-eye"></i></div></div></div></div>
                </div>

                <div class="row">
                    <div class="col-xl-7 mb-4">
                        <div class="dashboard-card">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 0;"><i class="fa-solid fa-box-open me-2" style="color: var(--ch-teal);"></i>Top Performing Products</h5>
                                <span class="badge bg-light text-dark border">Global Catalog</span>
                            </div>
                            
                            <div class="table-scrollable">
                                <table class="table table-custom table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>Product Name & Category</th>
                                            <th class="text-end">Views/Clicks</th>
                                            <th class="text-end">Status & Rating</th>
                                            <th class="text-center">Trend / Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($product_analytics as $product): 
                                            // Determine Category Badge Color
                                            $badgeClass = 'badge-wellness';
                                            if ($product['category'] == 'Skincare') $badgeClass = 'badge-skincare';
                                            if ($product['category'] == "O'Lamour") $badgeClass = 'badge-olamour';
                                            if ($product['category'] == "Vida Skin") $badgeClass = 'badge-vida';

                                            // Determine Trend Icons & Colors
                                            $trendIcon = 'fa-minus text-secondary';
                                            $growthClass = 'text-secondary';
                                            if ($product['trend'] == 'up') {
                                                $trendIcon = 'fa-arrow-trend-up text-success';
                                                $growthClass = 'text-success fw-bold';
                                            } elseif ($product['trend'] == 'down') {
                                                $trendIcon = 'fa-arrow-trend-down text-danger';
                                                $growthClass = 'text-danger fw-bold';
                                            }

                                            // Dynamic Status and Rating based on Clicks
                                            $rating = number_format(min(5.0, 4.0 + ($product['clicks'] / 18000)), 1);
                                            
                                            if ($product['clicks'] >= 10000) {
                                                $statusText = 'Top Pick';
                                                $statusIcon = 'fa-fire';
                                                $statusColor = 'color: #ef4444;'; // Red
                                            } elseif ($product['clicks'] >= 6000) {
                                                $statusText = 'Trending';
                                                $statusIcon = 'fa-arrow-trend-up';
                                                $statusColor = 'color: #3b82f6;'; // Blue
                                            } else {
                                                $statusText = 'Recommended';
                                                $statusIcon = 'fa-thumbs-up';
                                                $statusColor = 'color: #10b981;'; // Green
                                            }
                                        ?>
                                        <tr>
                                            <td>
                                                <div style="font-weight: 700; font-size: 0.95rem;"><?= htmlspecialchars($product['name']) ?></div>
                                                <span class="badge rounded-pill <?= $badgeClass ?> mt-1" style="font-size: 0.7rem; font-weight: 600;"><?= htmlspecialchars($product['category']) ?></span>
                                            </td>
                                            <td class="text-end">
                                                <div style="font-weight: 700; font-size: 0.95rem; color: var(--ch-dark-slate);"><?= number_format($product['clicks']) ?></div>
                                                <div style="font-size: 0.75rem; color: var(--ch-slate-muted);">Total Clicks</div>
                                            </td>
                                            <td class="text-end">
                                                <div style="font-weight: 700; font-size: 0.95rem; <?= $statusColor ?>"><i class="fa-solid <?= $statusIcon ?> me-1"></i><?= $statusText ?></div>
                                                <div style="font-size: 0.75rem; color: var(--ch-slate-muted); font-weight: 600;"><i class="fa-solid fa-star text-warning"></i> <?= $rating ?> Rating</div>
                                            </td>
                                            <td class="text-center">
                                                <div class="<?= $growthClass ?>" style="font-size: 0.9rem;"><?= $product['growth'] ?></div>
                                                <i class="fa-solid <?= $trendIcon ?> mt-1"></i>
                                            </td>
                                        </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-5 mb-4">
                        <div class="dashboard-card">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 0;"><i class="fa-solid fa-envelope me-2" style="color: var(--ch-teal);"></i>Recent Inquiries</h5>
                                <a href="registrations.php" class="btn btn-sm btn-light border" style="font-weight: 600; font-size: 0.75rem;">View All</a>
                            </div>
                            <div class="table-responsive flex-grow-1">
                                <table class="table table-custom table-hover align-middle mb-0">
                                    <thead><tr><th>Sender</th><th>Subject</th><th class="text-end">Date</th></tr></thead>
                                    <tbody id="recent-inquiries-body">
                                        <tr><td colspan="3" class="text-center text-muted py-3"><i class="fa-solid fa-spinner fa-spin me-2"></i>Loading...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="alert bg-white border d-flex align-items-center shadow-sm" style="border-radius: 1rem;" role="alert">
                            <div class="bg-success bg-opacity-10 p-2 rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;"><i class="fa-solid fa-bolt text-success fs-5"></i></div>
                            <div>
                                <h6 class="mb-1" style="font-weight: 700; color: var(--ch-dark-slate);">Real-Time Data Synced</h6>
                                <p class="mb-0 text-muted" style="font-size: 0.85rem;">All analytics and forms displayed are securely fetched from the live database. <strong>Last updated:</strong> <span id="last-refresh-time" style="color: var(--ch-teal); font-weight: 600;">Just now</span></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div id="sidebar-overlay"></div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('menu-toggle')?.addEventListener('click', (e) => { e.preventDefault(); document.body.classList.toggle('sb-sidenav-toggled'); });
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => { document.body.classList.remove('sb-sidenav-toggled'); });

        // --- FETCH LIVE DATA FUNCTION ---
        function fetchDashboardData(manualRefresh = false) {
            fetch('api_get_stats.php')
                .then(res => res.json())
                .then(data => {
                    if(data.status !== 'success') return;
                    
                    document.getElementById('stat-total-inq').innerText = data.system.total_inquiries;
                    document.getElementById('stat-pending-reg').innerText = data.system.pending_regs;
                    document.getElementById('stat-approved-reg').innerText = data.system.approved_regs;
                    document.getElementById('stat-visits').innerText = data.analytics.total_visits;

                    // Populate Inquiries
                    const inqBody = document.getElementById('recent-inquiries-body');
                    inqBody.innerHTML = '';
                    if(data.recent_inquiries.length > 0) {
                        data.recent_inquiries.forEach(inq => {
                            const d = new Date(inq.created_at);
                            inqBody.insertAdjacentHTML('beforeend', `<tr>
                                <td><div style="font-weight: 700;">${inq.name}</div><div style="font-size: 0.8rem; color: #64748b;">${inq.email}</div></td>
                                <td><span class="badge bg-light text-dark border">${inq.subject}</span></td>
                                <td class="text-end" style="font-size: 0.85rem; color: #64748b;">${d.toLocaleDateString('en-US', {month:'short', day:'numeric'})}</td>
                            </tr>`);
                        });
                    } else {
                        inqBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-4">No recent inquiries found.</td></tr>';
                    }
                    
                    // Live Indicator & Timestamp
                    const indicator = document.getElementById('live-indicator');
                    indicator.style.opacity = '0';
                    setTimeout(() => indicator.style.opacity = '1', 200);
                    document.getElementById('last-refresh-time').innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                    if(manualRefresh) {
                        const btnText = document.querySelector('.fa-rotate-right');
                        if (btnText) {
                            btnText.classList.add('fa-spin'); 
                            setTimeout(() => btnText.classList.remove('fa-spin'), 1000);
                        }
                    }
                }).catch(err => console.error("Data error:", err));
        }

        // --- EXPORT TO EMAIL FUNCTION ---
        function exportToEmail() {
            const btn = document.getElementById('btnExport');
            const originalText = btn.innerHTML;
            
            // Set button to loading state
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Sending...';

            fetch('export_report.php') // Adjust path if needed
                .then(response => response.json())
                .then(data => {
                    if(data.status === 'success') {
                        alert("Success: " + data.message); 
                    } else {
                        alert("Error: " + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("A network error occurred while trying to send the email.");
                })
                .finally(() => {
                    // Restore button
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                });
        }

        // Initialize and Set Interval
        document.addEventListener('DOMContentLoaded', () => {
            fetchDashboardData();
            setInterval(fetchDashboardData, 10000); // Auto-refresh stats every 10 seconds
        });
    </script>
</body>
</html>