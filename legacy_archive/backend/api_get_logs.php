<?php
session_start();
// Prevent PHP from outputting HTML warnings that break JSON parsing
error_reporting(E_ALL);
ini_set('display_errors', 0);

require 'db.php';
header('Content-Type: application/json');

// Security check
if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['error' => true, 'message' => 'Unauthorized access.']); 
    exit;
}

try {
    // Removed action_details to fix the SQL error and align with your requirements
    $query = "
        SELECT 
            admin_user, 
            action_type, 
            device_type, 
            os_browser, 
            ip_address, 
            status, 
            DATE_FORMAT(created_at, '%b %d, %Y %h:%i %p') as formatted_time 
        FROM activity_logs 
        ORDER BY created_at DESC 
        LIMIT 50
    ";
    
    $stmt = $pdo->query($query);
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($logs);
    
} catch (PDOException $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>