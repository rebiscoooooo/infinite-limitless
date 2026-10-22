<?php
// 1. Set PHP to Philippine Time
date_default_timezone_set('Asia/Manila');

$host = 'localhost'; 
$dbname = 'u803120420_infinite_db'; 
$username = 'u803120420_infinite123';      
$password = 'Infinite#1230';          

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec("SET time_zone = '+08:00';");
    
    // Auto-create Activity Logs table
    $pdo->exec("CREATE TABLE IF NOT EXISTS activity_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_user VARCHAR(100),
        action_type VARCHAR(50),
        device_type VARCHAR(50),
        os_browser VARCHAR(100),
        ip_address VARCHAR(50),
        status VARCHAR(20) DEFAULT 'Success',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
} catch (PDOException $e) {
    die("Database Connection failed: " . $e->getMessage());
}

// Global function to log admin activities
// Kept the details parameter in the signature so it doesn't break other files, but we safely ignore it.
function logAdminActivity($pdo, $action_type, $details = '', $status = 'Success') {
    $admin_user = $_SESSION['admin_username'] ?? 'System';
    $ip = $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Detect Device
    $device_type = 'Desktop PC';
    if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', strtolower($user_agent))) {
        $device_type = 'Tablet / iPad';
    } elseif (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile)/i', strtolower($user_agent))) {
        $device_type = 'Mobile Phone';
    }
    
    // Detect OS and Browser
    $os = "Unknown OS"; $browser = "Unknown Browser";
    if (preg_match('/windows|win32/i', $user_agent)) $os = 'Windows';
    elseif (preg_match('/macintosh|mac os x/i', $user_agent)) $os = 'Mac OS';
    elseif (preg_match('/linux/i', $user_agent)) $os = 'Linux';
    elseif (preg_match('/iphone|ipad|ipod/i', $user_agent)) $os = 'iOS';
    elseif (preg_match('/android/i', $user_agent)) $os = 'Android';
    
    if (preg_match('/MSIE/i', $user_agent) || preg_match('/Trident/i', $user_agent)) $browser = 'IE';
    elseif (preg_match('/Edge/i', $user_agent)) $browser = 'Edge';
    elseif (preg_match('/Chrome/i', $user_agent)) $browser = 'Chrome';
    elseif (preg_match('/Firefox/i', $user_agent)) $browser = 'Firefox';
    elseif (preg_match('/Safari/i', $user_agent)) $browser = 'Safari';
    elseif (preg_match('/Opera/i', $user_agent)) $browser = 'Opera';

    $os_browser = $os . ' - ' . $browser;

    try {
        $stmt = $pdo->prepare("INSERT INTO activity_logs (admin_user, action_type, device_type, os_browser, ip_address, status) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$admin_user, $action_type, $device_type, $os_browser, $ip, $status]);
    } catch (PDOException $e) {
        // Fail silently so tracking doesn't break the main app
    }
}
?>