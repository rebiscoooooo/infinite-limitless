<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = trim(htmlspecialchars(strip_tags($_POST['full_name'] ?? '')));
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $phone = trim(htmlspecialchars(strip_tags($_POST['phone'] ?? '')));
    $sponsor = trim(htmlspecialchars(strip_tags($_POST['sponsor_name'] ?? '')));
    $package = trim(htmlspecialchars(strip_tags($_POST['package'] ?? '')));
    $country = trim(htmlspecialchars(strip_tags($_POST['country'] ?? 'Not Specified')));

    if (!$email || empty($fullName) || empty($phone) || empty($package)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill out all required fields.']);
        exit;
    }

    try {
        $stmtCheck = $pdo->prepare("SELECT id FROM members_registration WHERE email = ? AND status = 'Pending'");
        $stmtCheck->execute([$email]);
        if ($stmtCheck->fetch()) {
            echo json_encode(['status' => 'error', 'message' => 'You already have a pending registration. Please wait for approval.']);
            exit;
        }

        $packagePrices = [
            'exec-emerald'  => 14880.00,
            'exec-pearl'    => 28880.00,
            'exec-ruby'     => 76880.00,
            'exec-sapphire' => 198800.00,
            'exec-diamond'  => 298880.00,
            'reg-gem'       => 5500.00,
            'reg-emerald'   => 9800.00,
            'reg-pearl'     => 18800.00,
            'reg-ruby'      => 49800.00,
            'reg-sapphire'  => 125000.00,
            'reg-diamond'   => 198800.00
        ];
        $price = isset($packagePrices[$package]) ? $packagePrices[$package] : 0.00;

        $stmt = $pdo->prepare("INSERT INTO members_registration 
            (full_name, email, phone, sponsor_name, selected_package, country, status, package_price, marketing_day) 
            VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?, 0)");
            
        $stmt->execute([$fullName, $email, $phone, $sponsor, $package, $country, $price]);
        
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

            $mail->MessageID  = "<" . md5(uniqid(time())) . "@infinite-limitless.com>";
            $mail->XMailer    = 'INFINITE System';
            $mail->setFrom('admin@infinite-limitless.com', 'Infinite Registration');
            $mail->addAddress('infinitelimitless123@gmail.com', 'Admin'); 
            $mail->addReplyTo($email, $fullName);
            $mail->isHTML(true);
            
            $mail->Subject = 'New Member Registration: ' . $fullName;
            
            $displayPackage = strtoupper(str_replace('-', ' ', $package));
            
            $mail->Body = "
            <div style='font-family: \"Barlow\", Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;'>
                <div style='background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #14b8a6;'>
                    <h1 style='color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;'>INFINITE</h1>
                    <p style='color: #14b8a6; margin: 5px 0 0; font-weight: bold; letter-spacing: 3px; font-size: 12px;'>NEW MEMBER REGISTRATION</p>
                </div>
                <div style='padding: 35px 30px; background-color: #ffffff;'>
                    <h2 style='color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;'>Registration Alert</h2>
                    <p style='font-size: 16px; color: #334155;'>A new member has submitted a pre-registration form.</p>
                    <div style='background-color: #f8fafc; border-radius: 12px; padding: 25px; margin: 25px 0; border: 1px solid rgba(20, 184, 166, 0.2);'>
                        <h3 style='color: #14b8a6; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;'>Applicant Details</h3>
                        <p style='margin: 0 0 10px 0; font-size: 15px;'><strong>Full Name:</strong> {$fullName}</p>
                        <p style='margin: 0 0 10px 0; font-size: 15px;'><strong>Email:</strong> {$email}</p>
                        <p style='margin: 0 0 10px 0; font-size: 15px;'><strong>Phone:</strong> {$phone}</p>
                        <p style='margin: 0 0 10px 0; font-size: 15px;'><strong>Country:</strong> {$country}</p>
                        <p style='margin: 0 0 10px 0; font-size: 15px;'><strong>Sponsor:</strong> {$sponsor}</p>
                        <div style='margin-top: 15px; padding-top: 15px; border-top: 1px dashed #cbd5e1;'>
                            <p style='margin: 0; font-size: 16px;'><strong>Selected Package:</strong> <span style='color: #14b8a6; font-weight: bold;'>{$displayPackage} (PHP " . number_format($price, 2) . ")</span></p>
                        </div>
                    </div>
                </div>
            </div>";
            $mail->AltBody = "New Member Registration\nFull Name: {$fullName}\nEmail: {$email}\nPhone: {$phone}\nPackage: {$displayPackage}";
            
            $mail->send();
        } catch (Exception $e) { 
        }

        echo json_encode([
            'status' => 'success', 
            'message' => 'Registration submitted successfully! Our team will contact you shortly.',
            'email' => $email
        ]);

    } catch (PDOException $e) {
        error_log("Registration Error: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error occurred. Please try again later.']);
    }
}
?>