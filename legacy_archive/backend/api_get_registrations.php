<?php
ini_set('display_errors', 0);
error_reporting(0);
session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$stmt = $pdo->query("SELECT * FROM members_registration ORDER BY created_at DESC");
$registrations = $stmt->fetchAll();
echo json_encode($registrations);
?>