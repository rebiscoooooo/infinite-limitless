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
    
    $userStmt = $pdo->prepare("SELECT email, first_name, middle_name, last_name, status FROM world_plan_registrations WHERE id = ?");
    $userStmt->execute([$id]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['status'] === 'Pending') {
        
        $stmt = $pdo->prepare("UPDATE world_plan_registrations SET status = ? WHERE id = ?");
        
        if ($stmt->execute([$status, $id])) {
            $fullName = trim($user['first_name'] . ' ' . $user['middle_name'] . ' ' . $user['last_name']);
            
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Hostname   = 'infinite-limitless.com';
                $mail->Host       = 'smtp.hostinger.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'admin@infinite-limitless.com'; 
                $mail->Password   = 'Aesculapius123#';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;

                $mail->MessageID = "<" . md5(uniqid(time())) . "@infinite-limitless.com>";
                $mail->XMailer = 'INFINITE Automation';
                $mail->setFrom('admin@infinite-limitless.com', 'Infinite Admin Portal');
                $mail->addAddress($user['email'], $fullName);
                
                $mail->isHTML(true);
                
                if ($status === 'Approved') {
                    $mail->Subject = "World Plan Application Approved - Welcome to Infinite!";
                    $mail->Body = "
                        <div style='font-family: \"Barlow\", Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #f8fafc; padding: 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); background-color: #ffffff;'>
                            <div style='background: linear-gradient(135deg, #0f172a 0%, #14b8a6 100%); padding: 40px 20px; text-align: center;'>
                                <h1 style='color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;'>INFINITE WORLD PLAN</h1>
                                <p style='color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 4px;'>LIVE LIMITLESS</p>
                            </div>
                            <div style='padding: 40px 30px; background-color: #ffffff;'>
                                <h2 style='color: #0f172a; margin-top: 0;'>Hello, {$fullName}! </h2>
                                <p style='font-size: 16px; color: #0f172a;'>Congratulations!  <br>
                                We are pleased to inform you that your World Plan Registration has been officially <span style='color: #14b8a6; font-weight: bold;'>APPROVED</span>.</p>
                                <p style='font-size: 16px; color: #0f172a;'>You are now one step closer to earning limitlessly through our global platform.</p>
                                <p style='font-size: 16px; color: #0f172a;'>Our team will contact you soon to guide you through the final steps and help you get started.</p>
                                
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
                        </div>";
                } else {
                    $mail->Subject = "Update on your World Plan Application";
                    $mail->Body = "
                        <div style='font-family: \"Barlow\", Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #f8fafc; padding: 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); background-color: #ffffff;'>
                            <div style='background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 20px; text-align: center;'>
                                <h1 style='color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;'>INFINITE WORLD PLAN</h1>
                            </div>
                            <div style='padding: 40px 30px; background-color: #ffffff;'>
                                <h2 style='color: #0f172a; margin-top: 0;'>Hello, {$fullName},</h2>
                                <p style='font-size: 16px; color: #0f172a;'>We regret to inform you that your recent World Plan Registration could not be approved at this time.</p>
                                <p style='font-size: 16px; color: #0f172a;'>This could be due to incomplete information or payment verification issues. If you believe this is a mistake, please reach out to our support team.</p>
                                
                                <p style='font-size: 15px; color: #0f172a; margin-top: 20px;'>Best regards,<br><strong>INFINITE Meraki Nation</strong></p>
                            </div>
                        </div>";
                }
                
                $mail->send();
            } catch (Exception $e) {
                error_log("Auto Approval email failed for World Plan ID $id: " . $mail->ErrorInfo);
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
