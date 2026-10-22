<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']); exit;
}

$id = $_POST['id'] ?? null;
if ($id) {
    $stmt = $pdo->prepare("DELETE FROM members_registration WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete data.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'ID missing.']);
}
?>