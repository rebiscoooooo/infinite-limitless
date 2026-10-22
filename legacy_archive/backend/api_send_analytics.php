<?php
session_start();
require 'db.php'; 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized access.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $to = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address provided.']);
        exit;
    }

    try {
        $statStmt = $pdo->query("SELECT * FROM site_stats LIMIT 1");
        $stats = $statStmt->fetch();
        
        $total_visits = $stats ? $stats['total_visits'] : 0; 
        $product_clicks = $stats ? $stats['product_clicks'] : 0;
        $active_users = $stats ? $stats['active_users'] : 0;
        $bounce_rate = $stats ? $stats['bounce_rate'] : "0%";

        $prodStmt = $pdo->query("SELECT * FROM product_stats ORDER BY clicks DESC LIMIT 5");
        $products = $prodStmt->fetchAll(PDO::FETCH_ASSOC);

        $product_rows = "";
        if ($products) {
            foreach($products as $p) {
                $color = ($p['trend_dir'] == 'up') ? '#10b981' : (($p['trend_dir'] == 'down') ? '#ef4444' : '#f59e0b');
                
                $product_rows .= "
                <tr>
                    <td style='padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;'>{$p['name']}</td>
                    <td style='padding: 12px; border-bottom: 1px solid #e2e8f0;'>" . number_format($p['clicks']) . "</td>
                    <td style='padding: 12px; border-bottom: 1px solid #e2e8f0; color: {$color}; font-weight: bold;'>{$p['trend_text']}</td>
                </tr>";
            }
        } else {
            $product_rows = "<tr><td colspan='3' style='padding: 12px; text-align:center;'>No product data available.</td></tr>";
        }

        $subject = "Infinite Website Analytics Report - " . date('F j, Y');
        
        $message = "
        <html>
        <head><title>Infinite Analytics Report</title></head>
        <body style='font-family: Arial, sans-serif; color: #334155; line-height: 1.6; background-color: #f8fafc; margin: 0; padding: 20px;'>
            <div style='max-width: 600px; margin: 0 auto; background: #ffffff; padding: 0; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);'>
                
                <div style='background-color: #0f172a; color: #ffffff; padding: 25px; text-align: center;'>
                    <h1 style='margin: 0; color: #14b8a6; font-size: 28px; letter-spacing: 2px;'>INFINITE</h1>
                    <p style='margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #cbd5e1;'>Website Analytics Report</p>
                </div>
                
                <div style='padding: 30px;'>
                    <p style='margin-top: 0;'>Hello Admin,</p>
                    <p>Here is the latest snapshot of your website's performance as of <strong>" . date('F j, Y, g:i a') . "</strong>.</p>
                    
                    <table style='width: 100%; border-collapse: separate; border-spacing: 10px 0; margin-top: 25px;'>
                        <tr>
                            <td style='background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; width: 50%; text-align: center; margin-bottom: 10px;'>
                                <h3 style='margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase;'>Total Site Visits</h3>
                                <p style='margin: 0; font-size: 24px; font-weight: bold; color: #0f172a;'>" . number_format($total_visits) . "</p>
                            </td>
                            <td style='background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; width: 50%; text-align: center; margin-bottom: 10px;'>
                                <h3 style='margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase;'>Product Clicks</h3>
                                <p style='margin: 0; font-size: 24px; font-weight: bold; color: #f59e0b;'>" . number_format($product_clicks) . "</p>
                            </td>
                        </tr>
                        <tr>
                            <td style='background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; width: 50%; text-align: center; margin-top: 10px;'>
                                <h3 style='margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase;'>Active Users</h3>
                                <p style='margin: 0; font-size: 24px; font-weight: bold; color: #10b981;'>" . number_format($active_users) . "</p>
                            </td>
                            <td style='background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; width: 50%; text-align: center; margin-top: 10px;'>
                                <h3 style='margin: 0 0 5px 0; color: #64748b; font-size: 12px; text-transform: uppercase;'>Bounce Rate</h3>
                                <p style='margin: 0; font-size: 24px; font-weight: bold; color: #0f172a;'>" . $bounce_rate . "</p>
                            </td>
                        </tr>
                    </table>
                    
                    <h3 style='margin-top: 35px; color: #0f172a; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;'>Top Performing Products</h3>
                    <table style='width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;'>
                        <tr style='background: #f1f5f9; text-align: left;'>
                            <th style='padding: 12px; border-bottom: 2px solid #cbd5e1; color: #475569;'>Product Name</th>
                            <th style='padding: 12px; border-bottom: 2px solid #cbd5e1; color: #475569;'>Clicks</th>
                            <th style='padding: 12px; border-bottom: 2px solid #cbd5e1; color: #475569;'>Status</th>
                        </tr>
                        {$product_rows}
                    </table>
                </div>
                
                <div style='background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;'>
                    <p style='margin: 0;'>This is an automated message generated from the Infinite Admin Portal.</p>
                    <p style='margin: 5px 0 0 0;'>Do not reply directly to this email.</p>
                </div>
            
            </div>
        </body>
        </html>
        ";

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Hostname   = 'infinite-limitless.com';
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'admin@infinite-limitless.com';
        $mail->Password   = 'Aesculapius123#'; // FIXED PASSWORD
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('admin-noreply@infinite-limitless.com', 'Infinite Analytics System');
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        if ($mail->send()) {
            echo json_encode(['status' => 'success', 'message' => 'Report successfully sent!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to send email via SMTP.']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Email dispatch failed. Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}
?>