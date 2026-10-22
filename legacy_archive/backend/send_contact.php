<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim(htmlspecialchars(strip_tags($_POST['name'] ?? '')));
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $subject = trim(htmlspecialchars(strip_tags($_POST['subject'] ?? '')));
    $message = trim(htmlspecialchars(strip_tags($_POST['message'] ?? '')));

    if (!$email || empty($name) || empty($subject) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill out all required fields.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $subject, $message]);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: Could not save your message.']);
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
        $mail->addReplyTo($email, $name);
        
        $mail->isHTML(true);
        $mail->Subject = "New Website Contact: $subject";
        
        $mail->Body = "
        <div style='font-family: \"Barlow\", Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;'>
            <div style='background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #14b8a6;'>
                <h1 style='color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;'>INFINITE</h1>
                <p style='color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 3px; font-size: 12px;'>SYSTEM NOTIFICATION</p>
            </div>
            <div style='padding: 35px 30px; background-color: #ffffff;'>
                <h2 style='color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;'>New Inquiry Received</h2>
                
                <div style='background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid rgba(20, 184, 166, 0.2);'>
                    <p style='margin: 0 0 10px 0; font-size: 15px;'><strong style='color: #14b8a6;'>Sender Name:</strong><br>{$name}</p>
                    <p style='margin: 0 0 10px 0; font-size: 15px;'><strong style='color: #14b8a6;'>Email Address:</strong><br><a href='mailto:{$email}' style='color: #0f172a; text-decoration: none;'>{$email}</a></p>
                    <p style='margin: 0; font-size: 15px;'><strong style='color: #14b8a6;'>Subject:</strong><br>{$subject}</p>
                </div>
                <h3 style='color: #0f172a; font-size: 16px; margin: 30px 0 15px 0;'>Message Details:</h3>
                <div style='background-color: #ffffff; border-left: 4px solid #14b8a6; padding: 15px 20px; margin: 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border-radius: 0 8px 8px 0; color: #334155; font-size: 15px;'>
                    " . nl2br($message) . "
                </div>
                
                <div style='text-align: center; margin-top: 40px;'>
                    <a href='https://www.infinite-limitless.com/login.php' style='background-color: #14b8a6; color: #ffffff; padding: 14px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 15px; display: inline-block; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);'>GO TO PORTAL</a>
                </div>
            </div>
            <div style='background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;'>
                &copy; " . date('Y') . " INFINITE Portal System.<br>
                You received this email because it was sent through your website's contact form.
            </div>
        </div>
        ";
        
        $mail->AltBody = "New Inquiry Received\n\nSender Name: {$name}\nEmail Address: {$email}\nSubject: {$subject}\n\nMessage Details:\n{$message}\n\nGo to portal to reply: https://www.infinite-limitless.com/login.php";
        
        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
        
    } catch (Exception $e) {
        error_log("Inquiry email notification failed: {$mail->ErrorInfo}");
        echo json_encode(['status' => 'success', 'message' => 'Your message has been saved!']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>