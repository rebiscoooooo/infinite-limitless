<?php
session_start();
require 'db.php';
use PHPMailer\PHPMailer\PHPMailer;
require '../vendor/autoload.php';

header('Content-Type: application/json');

// Security Check
if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']); exit;
}

$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$type = $_POST['type'] ?? '';

if (!$email) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address provided.']); exit;
}

// Generate CSV File in Memory
$output = fopen('php://temp', 'w');
$filename = "Infinite_Export_" . ucfirst($type) . "_" . date('Ymd_His') . ".csv";

if ($type === 'registrations') {
    fputcsv($output, ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Country', 'Sponsor', 'Package', 'Status']);
    $stmt = $pdo->query("SELECT id, created_at, full_name, email, phone, country, sponsor_name, selected_package, status FROM members_registration ORDER BY created_at DESC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) { fputcsv($output, $row); }
} elseif ($type === 'inquiries') {
    fputcsv($output, ['ID', 'Date', 'Name', 'Email', 'Subject', 'Message', 'Is Read']);
    $stmt = $pdo->query("SELECT id, created_at, name, email, subject, message, is_read FROM contact_inquiries ORDER BY created_at DESC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) { fputcsv($output, $row); }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid export type.']); exit;
}

rewind($output);
$csvData = stream_get_contents($output);
fclose($output);

// Send Email via PHPMailer (Anti-Spam compliance)
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Hostname   = 'infinite-limitless.com';
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'admin@infinite-limitless.com';
    $mail->Password   = 'Aesculapius123#'; // <-- This is the crucial fix
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    
    // Anti-spam Headers
    $mail->MessageID = "<" . md5(uniqid(time())) . "@infinite-limitless.com>";
    $mail->XMailer = 'INFINITE CRM System';

    $mail->setFrom('admin@infinite-limitless.com', 'Infinite Admin Portal');
    $mail->addAddress($email);
    $mail->Subject = "System Data Export: " . ucfirst($type);
    $mail->Body = "Hello Admin,\n\nAttached is the requested CSV data export for $type generated securely from the Infinite Admin Portal.\n\nDate Generated: " . date('Y-m-d H:i:s');
    
    // Attach the CSV string
    $mail->addStringAttachment($csvData, $filename, 'base64', 'text/csv');

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Export successful! The CSV file has been securely sent to your email.']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send email. Verify Hostinger SMTP settings.']);
}
?>