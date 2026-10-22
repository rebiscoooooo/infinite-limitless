<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode([]);
    exit;
}

// Auto-heal database: Ensure 'status' column exists in world_plan_registrations
try {
    $pdo->exec("ALTER TABLE world_plan_registrations ADD COLUMN status VARCHAR(20) DEFAULT 'Pending'");
} catch (PDOException $e) {
    // Ignore error if column already exists
}

try {
    $stmt = $pdo->query("SELECT * FROM world_plan_registrations ORDER BY created_at DESC");
    $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Convert first_name, middle_name, last_name to full_name for JS parsing convenience if needed
    foreach ($registrations as &$reg) {
        $reg['full_name'] = trim($reg['first_name'] . ' ' . $reg['middle_name'] . ' ' . $reg['last_name']);
        if (empty($reg['status'])) {
            $reg['status'] = 'Pending';
        }
    }
    
    echo json_encode($registrations);
} catch (PDOException $e) {
    echo json_encode([]);
}
?>
