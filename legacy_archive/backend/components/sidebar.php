<?php $current_page = basename($_SERVER['PHP_SELF']); ?>
<div id="sidebar-wrapper">
    <div class="sidebar-heading text-center">
        <a class="navbar-brand text-logo mx-auto" href="../index.php" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;">
            <span style="color: #fff; font-size: 32px; font-weight: 900; line-height: 0.8; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1.5px;">INFINITE</span>
            <span style="color: var(--ch-teal); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin-top: 4px;">ADMIN CRM</span>
        </a>
    </div>
    <div class="list-group list-group-flush mt-3">
        <a href="dashboard.php" class="list-group-item list-group-item-action <?= $current_page == 'dashboard.php' ? 'active' : '' ?>"><i class="fa-solid fa-chart-pie"></i> Analytics Dashboard</a>
        <a href="registrations.php" class="list-group-item list-group-item-action <?= $current_page == 'registrations.php' ? 'active' : '' ?>"><i class="fa-solid fa-envelope-open-text"></i> Contact Inquiries</a>
        <a href="world_plan.php" class="list-group-item list-group-item-action <?= $current_page == 'world_plan.php' ? 'active' : '' ?>"><i class="fa-solid fa-globe-americas"></i> World Plan</a>
        <a href="email_marketing.php" class="list-group-item list-group-item-action <?= $current_page == 'email_marketing.php' ? 'active' : '' ?>"><i class="fa-solid fa-envelope-open-text"></i> Email Marketing</a>
        <a href="manage_users.php" class="list-group-item list-group-item-action <?= $current_page == 'manage_users.php' ? 'active' : '' ?>"><i class="fa-solid fa-users"></i> Manage Members</a>
        <a href="activity_logs.php" class="list-group-item list-group-item-action <?= $current_page == 'activity_logs.php' ? 'active' : '' ?>"><i class="fa-solid fa-clipboard-list"></i> Activity Logs</a>
        <a href="logout.php" class="list-group-item list-group-item-action text-danger mt-4" style="border-left-color: transparent;"><i class="fa-solid fa-right-from-bracket text-danger"></i> Logout</a>
    </div>
</div>
<div id="sidebar-overlay"></div>