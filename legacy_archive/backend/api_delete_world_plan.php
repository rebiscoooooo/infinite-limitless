<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$id = $_POST['id'] ?? null;

if ($id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM world_plan_registrations WHERE id = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(['status' => 'success', 'message' => 'Registration deleted permanently.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete registration.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid ID.']);
}
?>
