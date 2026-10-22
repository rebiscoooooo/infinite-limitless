<?php
session_start();
require 'db.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$id = $_POST['id'] ?? null;
$status = $_POST['status'] ?? null;

if ($id && in_array($status, ['Approved', 'Rejected'])) {
    
    $userStmt = $pdo->prepare("SELECT email, full_name, status FROM members_registration WHERE id = ?");
    $userStmt->execute([$id]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['status'] === 'Pending') {
        
        $stmt = $pdo->prepare("UPDATE members_registration SET status = ? WHERE id = ?");
        
        if ($stmt->execute([$status, $id])) {
            
            if ($status === 'Approved') {
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

                    $mail->MessageID = "<" . md5(uniqid(time())) . "@infinite-limitless.com>";
                    $mail->XMailer = 'INFINITE Automation';
                    $mail->setFrom('admin@infinite-limitless.com', 'Infinite Admin Portal');
                    $mail->addAddress($user['email'], $user['full_name']);
                    
                    $mail->isHTML(true);
                    $mail->Subject = "Application Approved - Welcome to Infinite!";
                    $mail->Body = "
                            <div style='font-family: \"Barlow\", Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #f8fafc; padding: 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); background-color: #ffffff;'>
                                <div style='background: linear-gradient(135deg, #0f172a 0%, #14b8a6 100%); padding: 40px 20px; text-align: center;'>
                                    <h1 style='color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;'>INFINITE</h1>
                                    <p style='color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 4px;'>LIVE LIMITLESS</p>
                                </div>
                                <div style='padding: 40px 30px; background-color: #ffffff;'>
                                    <h2 style='color: #0f172a; margin-top: 0;'>Hello, {$user['full_name']}! </h2>
                                    <p style='font-size: 16px; color: #0f172a;'>Congratulations!  <br>
                                    We are pleased to inform you that your Pre-Registration has been officially <span style='color: #14b8a6; font-weight: bold;'>APPROVED</span>.</p>
                                    <p style='font-size: 16px; color: #0f172a;'>You are now one step closer to becoming part of a global community focused on leadership, premium wellness, and financial growth through <strong>INFINITE</strong>.</p>
                                    <p style='font-size: 16px; color: #0f172a;'>Our team will contact you soon via the WhatsApp number or email address you provided to guide you through the final registration process.</p>
                                    
                                    <div style='background-color: #f8fafc; border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid rgba(20, 184, 166, 0.2);'>
                                        <h3 style='color: #14b8a6; margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;'>  What's Next?</h3>
                                        <ul style='margin: 0; padding-left: 20px; font-size: 15px; color: #0f172a; line-height: 1.8;'>
                                            <li>Wait for your sponsor or team leader to contact you</li>
                                            <li>Choose and confirm your preferred package</li>
                                            <li>Complete your official membership payment</li>
                                            <li>Attend the New Distributor Orientation (NDO)</li>
                                            <li>Set up your Infinite Dashboard and begin your journey</li>
                                        </ul>
                                    </div>
                                    
                                    <div style='background-color: #ffffff; border-left: 4px solid #14b8a6; padding: 15px 20px; margin: 25px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border-radius: 0 8px 8px 0;'>
                                        <p style='margin: 0; font-weight: bold; color: #0f172a; font-size: 15px;'>  Please Note:</p>
                                        <p style='margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;'>Your account will become officially activated once payment for your chosen package has been completed.</p>
                                    </div>
                                    
                                    <p style='font-size: 16px; color: #0f172a;'>We are excited to welcome you to the team and support you on your journey to Infinite Live Limitless.  </p><br>
                                    <p style='font-size: 18px; color: #14b8a6; font-weight: bold;'>Welcome to INFINITE LIVE LIMITLESS!</p>
                                    
                                    <hr style='border: 0; border-top: 1px solid #f8fafc; margin: 35px 0;'>
                                    
                                    <div style='text-align: center;'>
                                        <a href='https://infinite-limitless.com' style='background-color: #14b8a6; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>Visit the Website
                                        </a>
                                    </div>
                                    <p style='font-size: 15px; color: #0f172a; margin-top: 20px;'>Best regards,<br><strong>INFINITE Meraki Nation</strong></p>
                                </div>
                                <div style='background-color: #f8fafc; padding: 25px 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;'>
                                    &copy; " . date('Y') . " INFINITE Live Limitless. All rights reserved.<br>
                                    This is an automated message, please do not reply directly to this email.
                                </div>
                            </div>
                        </div>
                    </div>";
                    
                    $mail->send();
                } catch (Exception $e) {
                    error_log("Auto Approval email failed for ID $id: " . $mail->ErrorInfo);
                }
            }
            echo json_encode(['status' => 'success', 'message' => 'Status updated successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update database.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Registration already processed or not found.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid parameters.']);
}
?>