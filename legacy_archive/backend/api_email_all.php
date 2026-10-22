<?php
session_start();
require 'db.php';
require '../vendor/autoload.php'; // Ensure Composer's PHPMailer is included

if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$alertMessage = '';

// Fetch ALL valid emails from the world_plan_registrations table
$query = "SELECT DISTINCT email, first_name, last_name 
          FROM world_plan_registrations 
          WHERE email IS NOT NULL AND email != ''";
$stmt = $pdo->prepare($query);
$stmt->execute();
$recipients = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($subject) || empty($message)) {
        $alertMessage = '<div class="alert alert-warning">Subject and Message cannot be empty.</div>';
    } elseif (count($recipients) === 0) {
        $alertMessage = '<div class="alert alert-warning">No registered users found to send emails to.</div>';
    } else {
        $mail = new PHPMailer(true);
        try {
            // SMTP Settings (Configure with your actual server details)
            $mail->isSMTP();
            $mail->Hostname   = 'infinite-limitless.com';
            $mail->Host       = 'smtp.hostinger.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'admin@infinite-limitless.com';
            $mail->Password   = 'Aesculapius123#'; // <-- This is the crucial fix
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;
                    
            $mail->setFrom('admin@infinite-limitless.com', 'Infinite Live Limitless');
            $mail->isHTML(true);
            $mail->Subject = $subject;
            
            // Basic HTML Template Wrapper
            $htmlBody = '
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                <h2 style="color: #0f172a;">Infinite Global</h2>
                <div style="color: #334155; line-height: 1.6;">
                    ' . nl2br(htmlspecialchars($message)) . '
                </div>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                <p style="font-size: 12px; color: #94a3b8;">You are receiving this because you registered for the Infinite World Plan.</p>
            </div>';

            $mail->Body = $htmlBody;
            $successCount = 0;

            // Loop through all fetched registrations and send individually
            foreach ($recipients as $user) {
                try {
                    $mail->clearAddresses(); // Clear previous recipient
                    
                    $fullName = trim(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? ''));
                    $mail->addAddress($user['email'], $fullName);
                    
                    $mail->send();
                    $successCount++;
                } catch (Exception $e) {
                    // Optionally log individual failures here
                    continue;
                }
            }
            
            $alertMessage = "<div class='alert alert-success'><i class='bi bi-check-circle-fill me-2'></i> Successfully sent blast to <strong>$successCount</strong> registered users!</div>";
        } catch (Exception $e) {
            $alertMessage = "<div class='alert alert-danger'>Mailer Error: {$mail->ErrorInfo}</div>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Email Blast | Infinite Portal</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <style>
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-dark-slate: #0f172a; --ch-slate-muted: #64748b; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; border-right: 1px solid rgba(148, 163, 184, 0.15); z-index: 1050; }
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 25px; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>

        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>

            <div class="container-fluid p-4 p-lg-5">
                <div class="mb-4">
                    <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">Marketing Tools</span>
                    <h2 style="font-size: clamp(2rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                        Email <span style="color: var(--ch-teal);">Blast</span>
                    </h2>
                </div>

                <?= $alertMessage ?>

                <div class="row">
                    <div class="col-lg-8">
                        <div class="dashboard-card">
                            <h5 class="fw-bold mb-4" style="color: var(--ch-dark-slate);">
                                <i class="fa-solid fa-paper-plane me-2 text-primary"></i> Compose Message
                            </h5>
                            
                            <form action="" method="POST">
                                <div class="mb-3">
                                    <label class="form-label fw-bold text-muted small text-uppercase">Recipients</label>
                                    <input type="text" class="form-control bg-light text-secondary border-0" value="All World Plan Registrations (<?= count($recipients) ?> Users)" readonly>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-bold text-muted small text-uppercase">Subject Line</label>
                                    <input type="text" name="subject" class="form-control p-3 shadow-none" placeholder="e.g. Important Update from Infinite" required>
                                </div>

                                <div class="mb-4">
                                    <label class="form-label fw-bold text-muted small text-uppercase">Message Body</label>
                                    <textarea name="message" class="form-control p-3 shadow-none" rows="8" placeholder="Type your message here..." required></textarea>
                                </div>

                                <button type="submit" class="btn w-100 py-3 text-white fw-bold" style="background-color: var(--ch-teal); border-radius: 0.85rem;" onclick="return confirm('Are you sure you want to send this email to <?= count($recipients) ?> users?');">
                                    <i class="fa-solid fa-rocket me-2"></i> Send Email Blast
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-4 mt-4 mt-lg-0">
                        <div class="dashboard-card bg-dark text-white text-center p-5">
                            <i class="fa-solid fa-envelope-open-text mb-3" style="font-size: 3rem; color: var(--ch-teal);"></i>
                            <h4 class="fw-bold">Total Reach</h4>
                            <h1 class="display-4 fw-bold text-white mb-0"><?= count($recipients) ?></h1>
                            <p class="text-white-50 mt-2">Active World Plan Emails</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>