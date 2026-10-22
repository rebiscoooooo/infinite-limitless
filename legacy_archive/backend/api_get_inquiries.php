<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode([]); 
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM inquiries ORDER BY created_at DESC");
    $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($inquiries);
} catch (PDOException $e) {
    echo json_encode([]);
}
?>