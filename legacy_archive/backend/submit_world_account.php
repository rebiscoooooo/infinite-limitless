<?php
// backend/submit_world_account.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $country = htmlspecialchars(trim($_POST['country'] ?? ''));
    $subject = htmlspecialchars(trim($_POST['subject'] ?? 'World Account Registration'));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Basic validation
    if (empty($name) || empty($email) || empty($phone) || empty($country) || empty($subject)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Hostname   = 'infinite-limitless.com';
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'admin@infinite-limitless.com';
        $mail->Password   = 'Aesculapius123#'; // FIXED PASSWORD
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('admin@infinite-limitless.com', 'Infinite Registration System');
        $mail->addAddress('infinitelimitless123@gmail.com', 'Admin');  // EDIT THIS: Where you want to receive the notification
        $mail->addReplyTo($email, $name);

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = 'New World Account Registration: ' . $name;
        
        $emailBody = "
            <div style='font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; border-radius: 10px;'>
                <h2 style='color: #0f172a;'>New World Account Registration</h2>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Phone:</strong> {$phone}</p>
                <p><strong>Country:</strong> {$country}</p>
                <p><strong>Subject/Inquiry:</strong> {$subject}</p>
                <hr style='border: 1px solid #e2e8f0;'/>
                <p><strong>Additional Message:</strong><br/>" . nl2br($message) . "</p>
            </div>
        ";
        
        $mail->Body = $emailBody;

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'World Account registration submitted successfully!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Notification could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}