<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']); exit;
}

$id = $_POST['id'] ?? null;
$is_read = $_POST['is_read'] ?? null;

if ($id !== null && $is_read !== null) {
    $stmt = $pdo->prepare("UPDATE contact_inquiries SET is_read = ? WHERE id = ?");
    if ($stmt->execute([$is_read, $id])) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update status.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid parameters.']);
}
?>