<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']); 
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    try {
        $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id = ?");
        if ($stmt->execute([$_POST['id']])) {
            
            // Optional: Log the deletion using our master function in db.php
            if(function_exists('logAdminActivity')) {
                logAdminActivity($pdo, 'Deleted Inquiry', "Admin deleted contact inquiry ID: " . $_POST['id']);
            }
            
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete record.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>