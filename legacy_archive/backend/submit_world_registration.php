<?php
// backend/submit_world_registration.php

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require Composer's autoloader
require '../vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Sanitize Form Inputs
    $firstName   = htmlspecialchars($_POST['firstName'] ?? '');
    $middleName  = htmlspecialchars($_POST['middleName'] ?? '');
    $lastName    = htmlspecialchars($_POST['lastName'] ?? '');
    $username    = htmlspecialchars($_POST['username'] ?? '');
    $email       = htmlspecialchars($_POST['email'] ?? '');
    $birthdate   = htmlspecialchars($_POST['birthdate'] ?? '');
    $contact     = htmlspecialchars($_POST['contact'] ?? '');
    $address     = htmlspecialchars($_POST['address'] ?? '');
    $packageType = htmlspecialchars($_POST['packageType'] ?? '');
    $paymentDate = htmlspecialchars($_POST['paymentDate'] ?? '');
    
    // Format current date for the email timestamp
    $submissionDate = date('F j, Y, g:i A');

    // Build the HTML Email Body using Heredoc syntax
    $htmlBody = <<<HTML
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New World Account Registration</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">

        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        
                        <!-- Header Section -->
                        <tr>
                            <td align="center" style="background-color: #0f172a; padding: 45px 30px; border-bottom: 5px solid #14b8a6;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 800; letter-spacing: 2px;">
                                    INFINITE<span style="color: #14b8a6;">.</span>
                                </h1>
                                <p style="margin: 12px 0 0 0; color: #94a3b8; font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase;">
                                    World Account Registration
                                </p>
                            </td>
                        </tr>

                        <!-- Body Section -->
                        <tr>
                            <td style="padding: 35px 40px;">
                                
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                    <tr>
                                        <td align="right" style="color: #64748b; font-size: 13px;">
                                            Received: <strong style="color: #475569;">$submissionDate</strong>
                                        </td>
                                    </tr>
                                </table>

                                <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 18px; font-weight: bold;">
                                    Applicant Information
                                </h2>

                                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                    <tr>
                                        <td style="background-color: #f1f5f9; padding: 12px 15px; border-bottom: 1px solid #e2e8f0; border-radius: 6px 0 0 0;">
                                            <span style="color: #475569; font-size: 14px; font-weight: bold;">Field</span>
                                        </td>
                                        <td style="background-color: #f1f5f9; padding: 12px 15px; border-bottom: 1px solid #e2e8f0; border-radius: 0 6px 0 0;">
                                            <span style="color: #475569; font-size: 14px; font-weight: bold;">Details</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Full Name</span>
                                            <br>
                                            <span style="color: #94a3b8; font-size: 12px;">Applicant</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #14b8a6; font-size: 15px; font-weight: bold;">$firstName $middleName $lastName</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Username</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #334155; font-size: 14px; font-weight: bold;">$username</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Email Address</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <a href="mailto:$email" style="color: #3b82f6; font-size: 14px; text-decoration: none;">$email</a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Contact Number</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #334155; font-size: 14px;">$contact</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Birthdate</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #334155; font-size: 14px;">$birthdate</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Complete Address</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #334155; font-size: 14px; line-height: 1.5;">$address</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Package Type</span>
                                        </td>
                                        <td style="padding: 16px 15px; border-bottom: 1px solid #f1f5f9;">
                                            <span style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: bold;">$packageType</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="padding: 16px 15px;">
                                            <span style="color: #0f172a; font-size: 14px; font-weight: bold;">Date of Payment</span>
                                            <br>
                                            <span style="color: #94a3b8; font-size: 12px;">Attached Proof</span>
                                        </td>
                                        <td style="padding: 16px 15px;">
                                            <span style="color: #334155; font-size: 14px; font-weight: bold;">$paymentDate</span>
                                        </td>
                                    </tr>
                                </table>

                                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                    <tr>
                                        <td align="center">
                                            <p style="margin: 0; color: #64748b; font-size: 13px; font-style: italic;">
                                                * Note: The payment proof attachment is included with this email.
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                    </table>
                    
                    <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin-top: 20px;">
                        <tr>
                            <td align="center" style="padding: 0 20px;">
                                <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                                    This is an automated message generated by the INFINITE System.<br>
                                    Please do not reply directly to this email.
                                </p>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
HTML;

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // --- 1. SMTP SERVER CONFIGURATION ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';             // Set your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your_sending_email@gmail.com'; // Replace with your system email
        $mail->Password   = 'your_app_password_here';       // Replace with your Google App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // --- 2. RECIPIENTS ---
        $mail->setFrom('your_sending_email@gmail.com', 'Infinite Inquiry System');
        $mail->addAddress('jrsaturno66@gmail.com', 'Jay-ar Saturno De Guzman'); // Target receiver
        
        // Add applicant's email as the Reply-To address
        if(!empty($email)){
            $mail->addReplyTo($email, "$firstName $lastName");
        }

        // --- 3. ATTACHMENTS ---
        if (isset($_FILES['paymentProof']) && $_FILES['paymentProof']['error'] === UPLOAD_ERR_OK) {
            $tmpPath = $_FILES['paymentProof']['tmp_name'];
            $fileName = $_FILES['paymentProof']['name'];
            $mail->addAttachment($tmpPath, $fileName);
        }

        // --- 4. EMAIL CONTENT ---
        $mail->isHTML(true);
        $mail->Subject = 'New Website Inquiry: World Account Registration';
        $mail->Body    = $htmlBody;
        $mail->AltBody = "New World Account Registration from $firstName $lastName. Package: $packageType."; // Plain text fallback

        // Send Email
        $mail->send();
        
        // Return JSON success response to your JS Fetch API
        echo json_encode([
            'status' => 'success', 
            'message' => 'Registration sent successfully.'
        ]);

    } catch (Exception $e) {
        // Return JSON error response to your JS Fetch API
        echo json_encode([
            'status' => 'error', 
            'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>