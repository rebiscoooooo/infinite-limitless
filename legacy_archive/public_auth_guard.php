<?php
// Secure public pages from logged-in admins
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: backend/dashboard.php');
    exit;
}
?>
