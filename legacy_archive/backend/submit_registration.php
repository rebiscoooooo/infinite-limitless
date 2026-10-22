<?php
// backend/submit_registration.php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = strip_tags(trim($_POST["full_name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"] ?? ''));
    $sponsorName = strip_tags(trim($_POST["sponsor_name"] ?? 'N/A'));
    $package = strip_tags(trim($_POST["package"] ?? ''));
    $country = strip_tags(trim($_POST["country"] ?? 'Unknown Location'));

    if (empty($fullName) || empty($email) || empty($phone) || empty($package)) {
        echo json_encode(["status" => "error", "message" => "Please fill out all required fields."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Hostname   = 'infinite-limitless.com';
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'admin@infinite-limitless.com';
        $mail->Password   = 'Aesculapius123#'; // FIXED PASSWORD
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('admin@infinite-limitless.com', 'Infinite Registration System');
        $mail->addAddress('infinitelimitless123@gmail.com', 'Admin'); 
        $mail->addCC($email, $fullName); 

        $mail->isHTML(true);
        $mail->Subject = 'New Member Pre-Registration from ' . $country;
        $mail->Body    = "
            <div style='font-family: Arial, sans-serif; color: #333;'>
                <h2 style='color: #0f172a;'>New Pre-Registration Received</h2>
                <p>A new user has submitted a pre-registration form from <strong>{$country}</strong>.</p>
                <table style='width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;'>
                    <tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Full Name:</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>{$fullName}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Email:</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>{$email}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Phone:</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>{$phone}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Sponsor Name:</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0;'>{$sponsorName}</td></tr>
                    <tr><td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>Selected Package:</strong></td><td style='padding: 8px; border: 1px solid #e2e8f0; color: #14b8a6; font-weight: bold;'>{$package}</td></tr>
                </table>
            </div>
        ";
        
        $mail->send();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Registration could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>