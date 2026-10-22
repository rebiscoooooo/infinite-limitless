<?php
session_start();
require './db.php';

// Check if logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit;
}

$message = '';
$error = '';

// Handle adding new admin
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_admin'])) {
    $new_username = trim(htmlspecialchars($_POST['username']));
    $new_password = $_POST['password'];

    if (!empty($new_username) && !empty($new_password)) {
        // Check if username already exists
        $stmtCheck = $pdo->prepare("SELECT id FROM admin_users WHERE username = ?");
        $stmtCheck->execute([$new_username]);
        if ($stmtCheck->fetch()) {
            $error = "Username already exists!";
        } else {
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $stmtInsert = $pdo->prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)");
            if ($stmtInsert->execute([$new_username, $hashed_password])) {
                $message = "New admin account added successfully!";
            } else {
                $error = "Failed to add admin account.";
            }
        }
    } else {
        $error = "Please fill in all fields.";
    }
}

// Fetch all admins
$stmtAdmins = $pdo->query("SELECT id, username, last_login, last_ip, created_at FROM admin_users ORDER BY created_at DESC");
$admins = $stmtAdmins->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Manage Admins | Infinite Portal</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <style>
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-teal-dk: #0f766e; --ch-slate-muted: #64748b; --ch-dark-slate: #0f172a; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        /* SIDEBAR */
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; transition: left 0.3s ease-in-out; border-right: 1px solid rgba(148, 163, 184, 0.15); z-index: 1050; }
        .sidebar-heading { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .list-group-item { background-color: transparent; border: none; color: #cbd5e1; padding: 0.85rem 1.25rem; font-weight: 500; border-left: 3px solid transparent; transition: all 0.2s; }
        .list-group-item:hover, .list-group-item.active { background-color: rgba(20, 184, 166, 0.1); color: var(--ch-teal); border-left-color: var(--ch-teal); }
        .list-group-item i { width: 24px; text-align: center; margin-right: 10px; color: #94a3b8; }
        .list-group-item:hover i, .list-group-item.active i { color: var(--ch-teal); }
        
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .top-navbar { background: #fff; border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); position: sticky; top: 0; z-index: 1000; }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 25px; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); }
        
        .table-custom th { background-color: transparent; color: var(--ch-slate-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid var(--ch-border); padding: 1rem; }
        .table-custom td { padding: 1rem; vertical-align: middle; border-bottom: 1px solid var(--ch-border); font-weight: 500; }
        
        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; transition: opacity 0.3s; }
        @media (max-width: 768px) { #sidebar-wrapper { position: fixed; left: -260px; } body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } }
    </style>
</head>
<body>
    <div id="wrapper">
        <div id="sidebar-wrapper">
            <div class="sidebar-heading text-center">
                <a class="navbar-brand text-logo mx-auto" href="../index.php" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;">
                    <span class="logo-main" style="color: #fff; font-size: 32px; font-weight: 900; line-height: 0.8; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1.5px;">INFINITE</span>
                    <span class="logo-sub" style="color: var(--ch-teal); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin-top: 4px;">ADMIN CRM</span>
                </a>
            </div>
            <div class="list-group list-group-flush mt-3">
                <a href="dashboard.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'dashboard.php' ? 'active' : '' ?>"><i class="fa-solid fa-chart-pie"></i> Analytics Dashboard</a>
                <a href="registrations.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'registrations.php' ? 'active' : '' ?>"><i class="fa-solid fa-file-signature"></i> Registrations & Inquiries</a>
                <a href="email_marketing.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'email_marketing.php' ? 'active' : '' ?>"><i class="fa-solid fa-envelope-open-text"></i> Email Marketing</a>
                <a href="manage_users.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'manage_users.php' ? 'active' : '' ?>"><i class="fa-solid fa-address-book"></i> Leads Directory</a>
                <a href="admin_messages.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'admin_messages.php' ? 'active' : '' ?>"><i class="fa-solid fa-comments"></i> Member Support</a>
                <a href="add_admin.php" class="list-group-item list-group-item-action <?= basename($_SERVER['PHP_SELF']) == 'add_admin.php' ? 'active' : '' ?>"><i class="fa-solid fa-user-shield"></i> Admin Accounts</a>
                <a href="logout.php" class="list-group-item list-group-item-action text-danger mt-4" style="border-left-color: transparent;"><i class="fa-solid fa-right-from-bracket text-danger"></i> Logout</a>
            </div>
        </div>

        <div id="sidebar-overlay"></div>

        <div id="page-content-wrapper">
            <nav class="navbar navbar-expand-lg top-navbar">
                <div class="container-fluid align-items-center">
                    <button class="btn btn-light d-md-none" id="menu-toggle" style="border: 1px solid var(--ch-border); padding: 0.375rem 0.75rem;"><i class="fa-solid fa-bars"></i></button>
                    <div class="ms-auto d-flex align-items-center gap-3">
                        <div class="text-end d-none d-lg-block border-end pe-3">
                            <span style="font-size: 0.7rem; font-weight: 700; color: var(--ch-teal); text-transform: uppercase;">Security</span>
                            <div style="font-size: 0.75rem; color: var(--ch-slate-muted);"><i class="fa-solid fa-network-wired me-1"></i> IP: <strong><?= htmlspecialchars($_SESSION['last_ip'] ?? 'Unknown') ?></strong></div>
                            <div style="font-size: 0.75rem; color: var(--ch-slate-muted);"><i class="fa-regular fa-clock me-1"></i> <?= isset($_SESSION['last_login']) ? date('M d, g:i A', strtotime($_SESSION['last_login'])) : 'Now' ?></div>
                        </div>
                        <div class="text-end d-none d-sm-block">
                            <span style="font-size: 0.8rem; font-weight: 600; color: var(--ch-slate-muted); display: block; line-height: 1;">Logged in as</span>
                            <span style="font-weight: 700; color: var(--ch-dark-slate);"><?= htmlspecialchars($_SESSION['admin_username'] ?? 'Admin') ?></span>
                        </div>
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--ch-teal); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0;">
                            <?= strtoupper(substr($_SESSION['admin_username'] ?? 'A', 0, 1)) ?>
                        </div>
                        <a href="logout.php" class="btn btn-outline-danger btn-sm ms-1 ms-md-2" style="border-radius: 0.6rem; font-weight: 600; padding: 0.4rem 0.75rem;"><i class="fa-solid fa-right-from-bracket"></i></a>
                    </div>
                </div>
            </nav>

            <div class="container-fluid p-4 p-lg-5">
                <div class="mb-4">
                    <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">System Management</span>
                    <h2 style="font-size: clamp(2rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                        Admin <span style="color: var(--ch-teal);">Accounts</span>
                    </h2>
                </div>

                <div class="row g-4">
                    <div class="col-lg-4">
                        <div class="dashboard-card">
                            <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 1.5rem;"><i class="fa-solid fa-user-plus me-2" style="color: var(--ch-teal);"></i> Add New Admin</h5>
                            
                            <?php if($message): ?><div class="alert alert-success" style="font-size: 0.9rem;"><i class="fa-solid fa-check-circle me-2"></i><?= $message ?></div><?php endif; ?>
                            <?php if($error): ?><div class="alert alert-danger" style="font-size: 0.9rem;"><i class="fa-solid fa-triangle-exclamation me-2"></i><?= $error ?></div><?php endif; ?>
                            
                            <form method="POST">
                                <div class="mb-3">
                                    <label class="form-label text-muted" style="font-weight: 600; font-size: 0.85rem;">Username</label>
                                    <input type="text" class="form-control" name="username" required style="border-radius: 0.5rem; padding: 0.7rem 1rem;">
                                </div>
                                <div class="mb-4">
                                    <label class="form-label text-muted" style="font-weight: 600; font-size: 0.85rem;">Password</label>
                                    <input type="password" class="form-control" name="password" required style="border-radius: 0.5rem; padding: 0.7rem 1rem;">
                                </div>
                                <button type="submit" name="add_admin" class="btn w-100" style="background-color: var(--ch-teal); color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.7rem;">Create Account</button>
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="dashboard-card h-100">
                            <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 1.5rem;"><i class="fa-solid fa-shield-halved me-2" style="color: var(--ch-teal);"></i> Active Administrators</h5>
                            <div class="table-responsive">
                                <table class="table table-custom table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Last IP Address</th>
                                            <th>Last Login Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($admins as $admin): ?>
                                            <tr>
                                                <td class="fw-bold" style="color: var(--ch-dark-slate); font-size: 1.05rem;">
                                                    <i class="fa-solid fa-user-shield me-2 text-muted"></i><?= htmlspecialchars($admin['username']) ?>
                                                    <?php if($admin['id'] == $_SESSION['admin_id']): ?> <span class="badge bg-success ms-2">You</span> <?php endif; ?>
                                                </td>
                                                <td><span style="font-family: monospace; color: var(--ch-teal-dk); background: rgba(20,184,166,0.1); padding: 4px 8px; border-radius: 4px;"><?= htmlspecialchars($admin['last_ip'] ?? 'Never logged in') ?></span></td>
                                                <td style="color: var(--ch-slate-muted); font-size: 0.9rem;">
                                                    <?= $admin['last_login'] ? date('M d, Y - g:i A', strtotime($admin['last_login'])) : 'N/A' ?>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
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
        document.getElementById('menu-toggle').addEventListener('click', function(e) {
            e.preventDefault(); document.body.classList.toggle('sb-sidenav-toggled');
        });
        document.getElementById('sidebar-overlay').addEventListener('click', function() {
            document.body.classList.remove('sb-sidenav-toggled');
        });
    </script>
</body>
</html>