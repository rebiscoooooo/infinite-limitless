<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require 'db.php';

header('Content-Type: application/json');

// Security Check
if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized Access.']);
    exit;
}

// Retrieve Form Data
$recipient_name = trim(htmlspecialchars(strip_tags($_POST['recipient_name'] ?? '')));
$recipient_email = filter_var($_POST['recipient_email'] ?? '', FILTER_VALIDATE_EMAIL);
$reply_subject = trim(htmlspecialchars(strip_tags($_POST['reply_subject'] ?? '')));
$reply_message = trim(htmlspecialchars(strip_tags($_POST['reply_message'] ?? '')));

if (!$recipient_email || empty($reply_subject) || empty($reply_message)) {
    echo json_encode(['status' => 'error', 'message' => 'Validation error: Please ensure all fields are properly filled out.']);
    exit;
}

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

    // Header Setup
    $mail->MessageID  = "<" . md5(uniqid(time())) . "@infinite-limitless.com>";
    $mail->XMailer    = 'INFINITE Support System';
    $mail->setFrom('admin@infinite-limitless.com', 'Infinite Support Team');
    $mail->addAddress($recipient_email, $recipient_name);
    
    // Add Reply-to just in case the client replies back
    $mail->addReplyTo('admin@infinite-limitless.com', 'Infinite Support Team');

    $mail->isHTML(true);
    $mail->Subject = $reply_subject;

    // Formatted Reply Message for safe HTML display
    $formatted_message = nl2br($reply_message);
    
    // Aesthetic HTML Email Body matches your Marketing Design
    $mail->Body = "
    <div style='font-family: \"Barlow\", Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;'>
        <div style='background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #14b8a6;'>
            <h1 style='color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;'>INFINITE</h1>
            <p style='color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 3px; font-size: 12px;'>CUSTOMER SUPPORT</p>
        </div>
        
        <div style='padding: 35px 30px; background-color: #ffffff;'>
            <h2 style='color: #0f172a; margin-top: 0; font-size: 18px;'>Hello {$recipient_name},</h2>
            
            <p style='color: #334155; font-size: 15px;'>Thank you for reaching out to us. We have received your inquiry and our team has prepared a response for you.</p>
            
            <div style='background-color: #f8fafc; border-left: 4px solid #14b8a6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; color: #0f172a; font-size: 15px;'>
                {$formatted_message}
            </div>
            
            <p style='color: #334155; font-size: 15px;'>If you have any further questions or need more assistance, feel free to reply directly to this email.</p>
            
            <p style='margin-top: 30px; font-size: 15px; color: #0f172a;'>
                Best Regards,<br>
                <strong>The Infinite Team</strong>
            </p>
            
            <div style='text-align: center; margin-top: 40px;'>
                <a href='https://www.infinite-limitless.com' style='background-color: #0f172a; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; display: inline-block;'>Visit Our Website</a>
            </div>
        </div>
        
        <div style='background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;'>
            &copy; " . date('Y') . " INFINITE Portal System.<br>
            You are receiving this email because you submitted an inquiry on our website.
        </div>
    </div>
    ";
    
    // Plain Text Fallback
    $mail->AltBody = "Hello {$recipient_name},\n\nThank you for reaching out. Here is our response to your inquiry:\n\n{$reply_message}\n\nBest Regards,\nThe Infinite Team\nhttps://www.infinite-limitless.com";

    // Send the Email
    if($mail->send()) {
        echo json_encode(['status' => 'success', 'message' => "Reply successfully sent to {$recipient_email}!"]);
    } else {
        echo json_encode(['status' => 'error', 'message' => "The email could not be sent. Please try again later."]);
    }
    
} catch (Exception $e) {
    // Log the error for admin troubleshooting
    error_log("Inquiry Reply failed to send to {$recipient_email}. Error: {$mail->ErrorInfo}");
    echo json_encode(['status' => 'error', 'message' => "Mailer Error: Check server connection or email configuration."]);
}
?>