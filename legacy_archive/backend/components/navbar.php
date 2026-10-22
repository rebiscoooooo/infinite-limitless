<?php
$admin_user = $_SESSION['admin_username'] ?? 'Admin';
$last_ip = $_SESSION['last_ip'] ?? $_SERVER['REMOTE_ADDR'];
$last_login = isset($_SESSION['last_login']) ? date('M d, g:i A', strtotime($_SESSION['last_login'])) : 'Now';
?>
<nav class="navbar navbar-expand-lg top-navbar">
    <div class="container-fluid align-items-center">
        <button class="btn btn-light d-md-none" id="menu-toggle" style="border: 1px solid var(--ch-border); padding: 0.375rem 0.75rem;"><i class="fa-solid fa-bars"></i></button>
        <div class="ms-auto d-flex align-items-center gap-3">
            <div class="text-end d-none d-lg-block border-end pe-3">
                <span style="font-size: 0.7rem; font-weight: 700; color: var(--ch-teal); text-transform: uppercase;">Security Tracker</span>
                <div style="font-size: 0.75rem; color: var(--ch-slate-muted);"><i class="fa-solid fa-network-wired me-1"></i> IP: <strong><?= htmlspecialchars($last_ip) ?></strong></div>
                <div style="font-size: 0.75rem; color: var(--ch-slate-muted);"><i class="fa-regular fa-clock me-1"></i> <?= $last_login ?></div>
            </div>
            <div class="text-end d-none d-sm-block">
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--ch-slate-muted); display: block; line-height: 1;">Logged in as</span>
                <span style="font-weight: 700; color: var(--ch-dark-slate);"><?= htmlspecialchars($admin_user) ?></span>
            </div>
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--ch-teal); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">
                <?= strtoupper(substr($admin_user, 0, 1)) ?>
            </div>
        </div>
    </div>
</nav>