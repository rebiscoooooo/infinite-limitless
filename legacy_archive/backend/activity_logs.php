<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) { header("Location: ../login.php"); exit; }
require 'db.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Login & Device Logs | Infinite</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
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
        .top-navbar { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 1000; }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 1.5rem; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); }
        .table-custom th { color: var(--ch-slate-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid var(--ch-border); padding: 1rem; white-space: nowrap; }
        .table-custom td { padding: 1rem; vertical-align: middle; color: var(--ch-dark-slate); border-bottom: 1px solid var(--ch-border); font-size: 0.95rem; }
        .badge-action { padding: 0.4rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        
        /* Fixed Overlay for Mobile */
        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; transition: opacity 0.3s ease-in-out; }
        @media (max-width: 768px) { 
            #sidebar-wrapper { position: fixed; left: -260px; height: 100vh; z-index: 1050; } 
            body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } 
            body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } 
        }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>
        
        <div id="sidebar-overlay"></div>

        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>

            <div class="container-fluid p-4 p-lg-5">
                <div class="mb-4">
                    <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">Security & Tracking</span>
                    <h2 style="font-size: clamp(1.75rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                        Login & <span style="color: var(--ch-teal);">Device Logs</span>
                    </h2>
                </div>

                <div class="dashboard-card">
                    <div class="table-responsive">
                        <table class="table table-custom table-hover align-middle mb-0" style="min-width: 850px;">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Account</th>
                                    <th>Session Event</th>
                                    <th>Device & Browser</th>
                                    <th>IP Address & Status</th>
                                </tr>
                            </thead>
                            <tbody id="logsTableBody">
                                <tr>
                                    <td colspan="5" class="text-center py-4 text-muted">
                                        <i class="fa-solid fa-spinner fa-spin me-2"></i> Loading live session logs...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    // Sidebar Mobile Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', e => { 
            e.preventDefault(); 
            document.body.classList.toggle('sb-sidenav-toggled'); 
        });
    }
    
    // This part specifically closes the sidebar when you click the dark background outside
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => { 
            document.body.classList.remove('sb-sidenav-toggled'); 
        });
    }

    function fetchLogs() {
        fetch('api_get_logs.php')
            .then(res => res.json())
            .then(data => {
                const tbody = document.getElementById('logsTableBody');
                tbody.innerHTML = '';
                
                if(data && data.error) {
                    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-5 text-danger"><i class="fa-solid fa-triangle-exclamation mb-3" style="font-size: 2rem;"></i><br><b>Error:</b> ${data.message}</td></tr>`;
                    return;
                }

                if(!data || data.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-5 text-muted"><i class="fa-solid fa-shield-halved mb-3" style="font-size: 2rem; opacity: 0.3;"></i><br>No login activities logged yet.</td></tr>`;
                    return;
                }

                let displayedCount = 0;

                data.forEach(log => {
                    let actionText = log.action_type || '-';
                    const actionString = actionText.toLowerCase();
                    
                    // FRONTEND FILTER: Ipapakita lang natin pag Login or Logout
                    if(!actionString.includes('log') && !actionString.includes('session') && !actionString.includes('auth')) {
                        return;
                    }
                    
                    displayedCount++;

                    // Smart parser para hiwalayin yung duration at yung word na "Logout"
                    let durationHtml = '';
                    const match = actionText.match(/^(.*?)\s*\((.*?)\)$/);
                    if (match) {
                        actionText = match[1]; 
                        durationHtml = `<div class="mt-1 text-muted" style="font-size: 0.75rem; font-weight: 600;"><i class="fa-solid fa-stopwatch me-1"></i>${match[2]} session</div>`;
                    }

                    // Kulay ng Badge
                    let actionBadge = 'bg-secondary';
                    if(actionString.includes('login')) actionBadge = 'bg-primary';
                    if(actionString.includes('logout')) actionBadge = 'bg-dark';
                    if(actionString.includes('fail')) actionBadge = 'bg-danger';

                    // Kulay ng Status
                    let statusBadge = 'text-success';
                    let statusIcon = 'fa-circle-check';
                    const statusString = (log.status || '').toLowerCase();
                    if(statusString.includes('fail') || statusString.includes('error')) {
                        statusBadge = 'text-danger';
                        statusIcon = 'fa-circle-xmark';
                    }

                    // Logic para sa Device Icon
                    let deviceIcon = 'fa-laptop';
                    const devString = (log.device_type || '').toLowerCase();
                    if(devString.includes('mobile') || devString.includes('phone')) deviceIcon = 'fa-mobile-screen-button';
                    else if(devString.includes('tablet') || devString.includes('ipad')) deviceIcon = 'fa-tablet-screen-button';
                    else if(devString.includes('desktop') || devString.includes('pc')) deviceIcon = 'fa-desktop';

                    const row = `<tr>
                        <td class="text-muted" style="white-space: nowrap; font-size: 0.9rem;"><i class="fa-regular fa-clock me-1"></i> ${log.formatted_time || 'N/A'}</td>
                        <td style="font-weight: 700;"><i class="fa-solid fa-user-shield me-1" style="color: var(--ch-teal);"></i> ${log.admin_user || 'System'}</td>
                        <td>
                            <span class="badge badge-action ${actionBadge}">${actionText}</span>
                            ${durationHtml}
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div style="width: 30px; text-align: center;"><i class="fa-solid ${deviceIcon} fs-5 text-secondary"></i></div>
                                <div class="device-info">
                                    <div class="fw-bold text-dark" style="font-size: 0.85rem;">${log.device_type || 'Unknown'}</div>
                                    <div class="text-muted" style="font-size: 0.75rem;">${log.os_browser || 'Unknown'}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="fw-bold" style="font-family: monospace; color: var(--ch-dark-slate); font-size: 0.9rem;">
                                <i class="fa-solid fa-network-wired me-1" style="color: var(--ch-slate-muted);"></i> ${log.ip_address || '0.0.0.0'}
                            </div>
                            <div class="${statusBadge}" style="font-size: 0.75rem; font-weight: 700; margin-top: 2px;">
                                <i class="fa-solid ${statusIcon} me-1"></i> ${log.status || 'Success'}
                            </div>
                        </td>
                    </tr>`;
                    tbody.insertAdjacentHTML('beforeend', row);
                });

                if (displayedCount === 0) {
                    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-5 text-muted"><i class="fa-solid fa-shield-halved mb-3" style="font-size: 2rem; opacity: 0.3;"></i><br>No recent login or session activities found.</td></tr>`;
                }
            })
            .catch(err => console.error(err));
    }
    
    fetchLogs();
    setInterval(fetchLogs, 5000); 
    </script>
</body>
</html>