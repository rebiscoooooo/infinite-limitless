<?php
session_start();
require 'db.php';

// Uncomment to enforce admin authentication
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

$search = $_GET['search'] ?? '';
$sort = $_GET['sort'] ?? 'name_asc';

// Filter ONLY approved members
$query = "SELECT * FROM world_plan_registrations WHERE status = 'Approved'";
$params = [];

// Handle Search (using CONCAT for first and last name to match schema)
if (!empty($search)) {
    $query .= " AND (CONCAT(first_name, ' ', last_name) LIKE ? OR email LIKE ? OR phone LIKE ?)";
    $searchTerm = "%$search%"; 
    $params = [$searchTerm, $searchTerm, $searchTerm];
}

// Handle Sorting
$sort_options = [ 
    'name_asc' => 'first_name ASC, last_name ASC', 
    'name_desc' => 'first_name DESC, last_name DESC', 
    'joined_new' => 'created_at DESC', 
    'joined_old' => 'created_at ASC' 
];
$query .= " ORDER BY " . ($sort_options[$sort] ?? 'first_name ASC, last_name ASC');

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Approved World Plan Members | Infinite Portal</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <style>
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-dark-slate: #0f172a; --ch-slate-muted: #64748b; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; transition: left 0.3s; border-right: 1px solid rgba(148, 163, 184, 0.15); z-index: 1050; }
        .sidebar-heading { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .list-group-item { background: transparent; border: none; color: #cbd5e1; padding: 0.85rem 1.25rem; font-weight: 500; border-left: 3px solid transparent; transition: all 0.2s; }
        .list-group-item:hover, .list-group-item.active { background-color: rgba(20, 184, 166, 0.1); color: var(--ch-teal); border-left-color: var(--ch-teal); }
        .list-group-item i { width: 24px; text-align: center; margin-right: 10px; color: #94a3b8; }
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .top-navbar { background: #fff; border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 25px; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); }
        .table-custom th { color: var(--ch-slate-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid var(--ch-border); padding: 1rem; white-space: nowrap; }
        .table-custom td { padding: 1rem; vertical-align: middle; color: var(--ch-dark-slate); border-bottom: 1px solid var(--ch-border); font-weight: 500; }
        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; transition: opacity 0.3s; }
        @media (max-width: 768px) { #sidebar-wrapper { position: fixed; left: -260px; height: 100vh; } body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>

        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>

            <div class="container-fluid p-4 p-lg-5">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">System Management</span>
                        <h2 style="font-size: clamp(2rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                            Approved <span style="color: var(--ch-teal);">World Plan</span> Members
                        </h2>
                    </div>
                    <div>
                        <button onclick="exportCSVData('registrations')" class="btn btn-primary" style="font-size: 0.85rem; border-radius: 0.85rem; background-color: var(--ch-teal); border: none; font-weight: 600;"><i class="fa-solid fa-file-csv me-1"></i> Export Data to Email</button>
                    </div>
                </div>

                <form method="GET" action="" class="mb-4">
                    <div class="row g-2 align-items-center">
                        <div class="col-md-7 col-12">
                            <div class="input-group bg-white h-100" style="border: 1px solid var(--ch-border); border-radius: 0.85rem; overflow: hidden;">
                                <span class="input-group-text bg-white border-0 text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
                                <input type="text" class="form-control border-0 shadow-none py-2" name="search" placeholder="Search by name, email, or contact number..." value="<?= htmlspecialchars($search) ?>">
                            </div>
                        </div>
                        <div class="col-md-3 col-12">
                            <select name="sort" class="form-select bg-white" style="border: 1px solid var(--ch-border); border-radius: 0.85rem; padding: 0.6rem 1rem; color: var(--ch-dark-slate); cursor: pointer;" onchange="this.form.submit()">
                                <option value="name_asc" <?= $sort == 'name_asc' ? 'selected' : '' ?>>Sort: Name (A-Z)</option>
                                <option value="name_desc" <?= $sort == 'name_desc' ? 'selected' : '' ?>>Sort: Name (Z-A)</option>
                                <option value="joined_new" <?= $sort == 'joined_new' ? 'selected' : '' ?>>Sort: Newest Leads</option>
                                <option value="joined_old" <?= $sort == 'joined_old' ? 'selected' : '' ?>>Sort: Oldest Leads</option>
                            </select>
                        </div>
                        <div class="col-md-2 col-12">
                            <button type="submit" class="btn w-100 py-2" style="background-color: var(--ch-dark-slate); color: white; border-radius: 0.85rem; border: none; font-weight: 600;">Apply Filters</button>
                        </div>
                    </div>
                </form>

                <div class="row">
                    <div class="col-12">
                        <div class="dashboard-card">
                            <div class="table-responsive">
                                <table class="table table-custom table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th><i class="fa-regular fa-id-card me-1"></i> Full Name</th>
                                            <th><i class="fa-solid fa-phone me-1"></i> Contact Number</th>
                                            <th><i class="fa-regular fa-envelope me-1"></i> Email</th>
                                            <th><i class="fa-solid fa-globe me-1"></i> Country</th>
                                            <th><i class="fa-solid fa-box-open me-1"></i> Package</th>
                                            <th><i class="fa-solid fa-signal me-1"></i> Status</th>
                                            <th><i class="fa-regular fa-calendar me-1"></i> Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if (count($users) > 0): ?>
                                            <?php foreach ($users as $user): ?>
                                                <tr>
                                                    <td class="fw-bold" style="color: var(--ch-dark-slate);">
                                                        <?= htmlspecialchars(trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? ''))) ?>
                                                    </td>
                                                    <!-- Displaying Contact Number (Phone) -->
                                                    <td>
                                                        <a href="tel:<?= htmlspecialchars($user['phone'] ?? '') ?>" class="text-decoration-none text-dark fw-medium">
                                                            <?= htmlspecialchars($user['phone'] ?? 'N/A') ?>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a href="mailto:<?= htmlspecialchars($user['email']) ?>" class="text-decoration-none" style="color: var(--ch-teal);">
                                                            <?= htmlspecialchars($user['email']) ?>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <img src="../assets/image/flags/<?= strtolower(htmlspecialchars(trim($user['country'] ?? ''))) ?>.png" 
                                                             alt="Flag" class="me-2 rounded shadow-sm" style="width: 20px; height: 14px; object-fit: cover;" 
                                                             onerror="this.style.display='none'">
                                                        <?= htmlspecialchars(strtoupper($user['country'] ?? '')) ?>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-primary text-uppercase" style="letter-spacing: 0.5px;">
                                                            <?= htmlspecialchars($user['package_type'] ?? 'N/A') ?>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i><?= htmlspecialchars($user['status']) ?></span>
                                                    </td>
                                                    <td><?= !empty($user['created_at']) ? date('M d, Y', strtotime($user['created_at'])) : 'N/A' ?></td>
                                                </tr>
                                            <?php endforeach; ?>
                                        <?php else: ?>
                                            <tr><td colspan="7" class="text-center py-5 text-muted"><i class="fa-solid fa-users-slash mb-3" style="font-size: 2.5rem; opacity: 0.3;"></i><br><span style="font-weight: 600;">No approved members match your criteria.</span></td></tr>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sidebar Overlay -->
    <div id="sidebar-overlay"></div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('menu-toggle')?.addEventListener('click', e => { e.preventDefault(); document.body.classList.toggle('sb-sidenav-toggled'); });
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => { document.body.classList.remove('sb-sidenav-toggled'); });
        
        function exportCSVData(type) {
            const email = prompt("Enter email address to receive the CSV data export:");
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('type', type);
                fetch('api_export_data.php', { method: 'POST', body: formData })
                .then(res => res.json())
                .then(data => alert(data.message))
                .catch(err => alert("An error occurred during export."));
            } else if(email) { alert("Invalid email format."); }
        }
    </script>
</body>
</html>