<?php
session_start();
require 'db.php';
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

$stmt = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC");
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Member Support | Infinite Portal</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <style>
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-teal-dk: #0f766e; --ch-slate-muted: #64748b; --ch-dark-slate: #0f172a; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; transition: left 0.3s ease-in-out; border-right: 1px solid rgba(148, 163, 184, 0.15); z-index: 1050; }
        .sidebar-heading { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .list-group-item { background-color: transparent; border: none; color: #cbd5e1; padding: 0.85rem 1.25rem; font-weight: 500; border-left: 3px solid transparent; transition: all 0.2s; }
        .list-group-item:hover, .list-group-item.active { background-color: rgba(20, 184, 166, 0.1); color: var(--ch-teal); border-left-color: var(--ch-teal); }
        .list-group-item i { width: 24px; text-align: center; margin-right: 10px; color: #94a3b8; }
        .list-group-item:hover i, .list-group-item.active i { color: var(--ch-teal); }
        
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .top-navbar { background: #fff; border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); position: sticky; top: 0; z-index: 1000; }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 25px; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); }
        
        .msg-box { border: 1px solid var(--ch-border); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1rem; transition: 0.3s; background: #fff; }
        .msg-box.unread { border-left: 4px solid var(--ch-teal); background: #f0fdfa; }
        .msg-box .subject { font-weight: 700; color: var(--ch-dark-slate); font-size: 1.1rem; }
        .msg-box .meta { font-size: 0.85rem; color: var(--ch-slate-muted); font-weight: 600; margin-bottom: 1rem; }
        .msg-box .content { background: var(--ch-bg-light); padding: 1rem; border-radius: 0.5rem; font-size: 0.95rem; color: #334155; }
        
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
                    <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">Customer Support</span>
                    <h2 style="font-size: clamp(2rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                        Member <span style="color: var(--ch-teal);">Messages</span>
                    </h2>
                </div>

                <div class="row">
                    <div class="col-12">
                        <?php if (count($messages) > 0): ?>
                            <?php foreach ($messages as $msg): 
                                $isUnread = ($msg['is_read'] == 0);
                                $replySubject = rawurlencode("Reply regarding: " . $msg['subject']);
                                $replyBody = rawurlencode("Hi " . $msg['name'] . ",\n\n");
                            ?>
                                <div class="msg-box <?= $isUnread ? 'unread' : '' ?>" id="msg-<?= $msg['id'] ?>">
                                    <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                        <div>
                                            <div class="subject"><?= htmlspecialchars($msg['subject']) ?> <?php if($isUnread): ?> <span class="badge bg-danger ms-2" style="font-size: 0.7rem;">NEW</span> <?php endif; ?></div>
                                            <div class="meta">
                                                <i class="fa-solid fa-user me-1 text-muted"></i> <?= htmlspecialchars($msg['name']) ?> &nbsp;|&nbsp; 
                                                <i class="fa-solid fa-envelope me-1 text-muted"></i> <a href="mailto:<?= htmlspecialchars($msg['email']) ?>" style="color: var(--ch-teal-dk); text-decoration: none;"><?= htmlspecialchars($msg['email']) ?></a> &nbsp;|&nbsp; 
                                                <i class="fa-regular fa-clock me-1 text-muted"></i> <?= date('M d, Y g:i A', strtotime($msg['created_at'])) ?>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <a href="mailto:<?= htmlspecialchars($msg['email']) ?>?subject=<?= $replySubject ?>&body=<?= $replyBody ?>" class="btn btn-sm btn-outline-primary" style="font-weight: 600;"><i class="fa-solid fa-reply me-1"></i> Reply</a>
                                            <?php if($isUnread): ?>
                                                <button onclick="markRead(<?= $msg['id'] ?>)" class="btn btn-sm btn-outline-success" style="font-weight: 600;"><i class="fa-solid fa-check me-1"></i> Mark Read</button>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="content mt-2">
                                        <?= nl2br(htmlspecialchars($msg['message'])) ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="text-center py-5">
                                <i class="fa-regular fa-comments mb-3" style="font-size: 3rem; color: var(--ch-slate-muted); opacity: 0.5;"></i>
                                <h5 style="color: var(--ch-slate-muted); font-weight: 600;">No support messages right now.</h5>
                            </div>
                        <?php endif; ?>
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

        function markRead(id) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('is_read', 1);
            fetch('api_update_status.php', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'success') location.reload();
            });
        }
    </script>
</body>
</html>