<?php
session_start();
require 'db.php'; // Required para matawag yung logger function natin

if (function_exists('logAdminActivity') && isset($_SESSION['admin_logged_in'])) {
    
    $duration_str = "";
    
    // I-compute kung gaano katagal siya naka-login (Session Duration)
    if (isset($_SESSION['last_login'])) {
        $login_time = strtotime($_SESSION['last_login']);
        $current_time = time();
        $diff_seconds = abs($current_time - $login_time);
        $diff_minutes = floor($diff_seconds / 60);
        
        if ($diff_minutes < 1) {
            $duration_str = " (< 1 min)";
        } elseif ($diff_minutes >= 60) {
            $hours = floor($diff_minutes / 60);
            $mins = $diff_minutes % 60;
            $duration_str = " ({$hours}h {$mins}m)";
        } else {
            $duration_str = " ({$diff_minutes} mins)";
        }
    }
    
    // I-log natin sa database yung action kasama yung oras (e.g. "Logout (15 mins)")
    logAdminActivity($pdo, 'Logout' . $duration_str, '', 'Success');
}

// Sirain na ang session para tuluyan nang ma-logout
$_SESSION = array(); 
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
} 
session_destroy();
header("Location: ../login.php");
exit;
?>