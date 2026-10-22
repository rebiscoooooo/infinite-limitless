
<?php
session_start();
date_default_timezone_set('Asia/Manila');
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin | World Plan Registrations</title>
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
        .top-navbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .dashboard-header { background-color: #0f172a; color: white; padding: 1.5rem; border-radius: 1rem; margin-bottom: 2rem; }
        .table-card { background: white; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 1.5rem; overflow: hidden; }
        .proof-img { max-width: 100%; max-height: 70vh; object-fit: contain; }
        
        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; }
        @media (max-width: 768px) { #sidebar-wrapper { position: fixed; left: -260px; height: 100vh; } body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>

        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>

            <div class="container-fluid p-4 p-lg-5">
                <div class="dashboard-header d-flex justify-content-between align-items-center">
                    <h2 class="m-0"><i class="fa-solid fa-globe-americas me-2 text-info"></i> World Plan Registrations</h2>
            <span class="badge bg-info fs-6" id="totalCountBadge">Total: 0</span>
        </div>

        <div class="table-card">
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Date Submitted</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Package Type</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="worldPlanTableBody">
                        <tr><td colspan="8" class="text-center py-5 text-muted"><i class="fa-solid fa-spinner fa-spin me-2"></i> Fetching...</td></tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
    
    <div id="sidebar-overlay"></div>

    <!-- Payment Proof Modal -->
    <div class="modal fade" id="proofModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Payment Proof: <span id="modalUserName" class="text-primary"></span></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center bg-light">
                    <div id="fileContainer">
                        <!-- Image or PDF will be injected here -->
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <a href="#" id="downloadLink" class="btn btn-success" download><i class="fa-solid fa-download"></i> Download</a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('menu-toggle')?.addEventListener('click', (e) => { e.preventDefault(); document.body.classList.toggle('sb-sidenav-toggled'); });
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => { document.body.classList.remove('sb-sidenav-toggled'); });

        const proofModal = document.getElementById('proofModal');
        proofModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const userName = button.getAttribute('data-name');
            const filePath = button.getAttribute('data-file');
            
            document.getElementById('modalUserName').textContent = userName;
            document.getElementById('downloadLink').href = filePath;
            
            const fileContainer = document.getElementById('fileContainer');
            fileContainer.innerHTML = ''; // Clear previous
            
            // Check if file is PDF or Image
            if (filePath.toLowerCase().endsWith('.pdf')) {
                fileContainer.innerHTML = `<iframe src="${filePath}" width="100%" height="500px" style="border: none;"></iframe>`;
            } else {
                fileContainer.innerHTML = `<img src="${filePath}" class="proof-img shadow-sm rounded" alt="Payment Proof">`;
            }
        });

        // --- ASYNC API LOGIC FOR WORLD PLAN ---
        function updateStatus(id, newStatus) {
            if (confirm(`Mark this world plan registration as ${newStatus}?`)) {
                const formData = new FormData(); formData.append('id', id); formData.append('status', newStatus);
                fetch('api_update_world_plan_status.php', { method: 'POST', body: formData })
                    .then(res => res.json()).then(data => { if (data.status === 'success') fetchWorldPlan(); });
            }
        }

        function deleteReg(id) {
            if (confirm("Permanently delete this world plan registration?")) {
                const formData = new FormData(); formData.append('id', id);
                fetch('api_delete_world_plan.php', { method: 'POST', body: formData })
                    .then(res => res.json()).then(data => { if (data.status === 'success') fetchWorldPlan(); });
            }
        }

        function fetchWorldPlan() {
            fetch('api_get_world_plan.php')
                .then(r => r.json())
                .then(data => {
                    const tbody = document.getElementById('worldPlanTableBody'); 
                    tbody.innerHTML = '';
                    
                    document.getElementById('totalCountBadge').textContent = 'Total: ' + data.length;
                    
                    if (data.length === 0) { 
                        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-5 text-muted">No world plan registrations found.</td></tr>`; 
                        return; 
                    }

                    data.forEach(reg => {
                        const dateStr = new Date(reg.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                        const paymentDateStr = new Date(reg.payment_date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
                        
                        let badgeClass = 'bg-secondary';
                        if (reg.status === 'Pending') badgeClass = 'bg-warning text-dark';
                        if (reg.status === 'Approved') badgeClass = 'bg-success';
                        if (reg.status === 'Rejected') badgeClass = 'bg-danger';

                        let actionButtons = `<button class="btn btn-sm btn-outline-info me-1 mb-1" data-bs-toggle="modal" data-bs-target="#proofModal" data-name="${reg.full_name}" data-file="../uploads/payments/${reg.payment_proof}" title="View Proof"><i class="fa-solid fa-eye"></i></button>`;
                        
                        if (reg.status === 'Pending') {
                            actionButtons += `<button onclick="updateStatus(${reg.id}, 'Approved')" class="btn btn-sm btn-outline-success me-1 mb-1" title="Approve"><i class="fa-solid fa-check"></i></button>`;
                            actionButtons += `<button onclick="updateStatus(${reg.id}, 'Rejected')" class="btn btn-sm btn-outline-warning me-1 mb-1" title="Reject"><i class="fa-solid fa-xmark"></i></button>`;
                        }
                        actionButtons += `<button onclick="deleteReg(${reg.id})" class="btn btn-sm btn-outline-danger mb-1" title="Delete"><i class="fa-solid fa-trash"></i></button>`;

                        let pkgBadgeClass = 'bg-primary';
                        const pkg = reg.package_type.toLowerCase();
                        if (pkg.includes('supreme')) pkgBadgeClass = 'bg-warning text-dark'; // Gold/Diamond
                        else if (pkg.includes('pro')) pkgBadgeClass = 'bg-primary'; // Sapphire
                        else if (pkg.includes('advance')) pkgBadgeClass = 'bg-danger'; // Ruby
                        else if (pkg.includes('basic')) pkgBadgeClass = 'bg-info text-dark'; // Light blue
                        else if (pkg.includes('starter')) pkgBadgeClass = 'bg-secondary'; // Gray

                        tbody.insertAdjacentHTML('beforeend', `<tr>
                            <td>#${reg.id}</td>
                            <td style="white-space: nowrap;"><div style="font-weight: 700; color: var(--ch-dark-slate);">${dateStr}</div></td>
                            <td><strong>${reg.username}</strong></td>
                            <td>
                                <div style="font-weight: 800; font-size: 1.05rem;">${reg.full_name}</div>
                                <div style="font-size: 0.85rem; color: var(--ch-slate-muted);"><i class="fa-solid fa-envelope me-1"></i> ${reg.email}<br><i class="fa-solid fa-phone me-1"></i> ${reg.contact_no}</div>
                            </td>
                            <td><span class="badge ${pkgBadgeClass}">${reg.package_type}</span></td>
                            <td style="white-space: nowrap;">${paymentDateStr}</td>
                            <td><span class="badge ${badgeClass}">${reg.status}</span></td>
                            <td style="white-space: nowrap; text-align: center;">${actionButtons}</td>
                        </tr>`);
                    });
                });
        }

        fetchWorldPlan();
        setInterval(fetchWorldPlan, 15000); // Sync every 15 secs silently
    </script>
</body>
</html>