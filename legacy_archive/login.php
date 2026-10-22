<?php
session_start();
require_once 'public_auth_guard.php';
require './backend/db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['password_hash'])) {
        // Capture IP and Time for Security Logging
        $ip = $_SERVER['REMOTE_ADDR'];
        $updateStmt = $pdo->prepare("UPDATE admin_users SET last_login = NOW(), last_ip = ? WHERE id = ?");
        $updateStmt->execute([$ip, $admin['id']]);

        // Set core session variables
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        $_SESSION['last_login'] = date('Y-m-d H:i:s'); 
        $_SESSION['last_ip'] = $ip;
        
        // NEW: Initialize last activity time for the 15-minute timeout
        $_SESSION['last_activity'] = time(); 

        // Trigger Tracking
        logAdminActivity($pdo, 'Login', 'Administrator successfully authenticated into the portal.');

        header("Location: ./backend/dashboard.php");
        exit;
    } else {
        $error = "Access Denied: Invalid administrator credentials.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinite Admin Portal | Login</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>

    <link rel="stylesheet" href="./assets/css/login.css" />
</head>
<body>

    <div class="bg-grid"></div>
    <div class="bg-glow"></div>

    <div class="auth-wrapper">
        
        <a href="index.php" class="brand-logo animate-up">
            <h1>INFINITE</h1>
            <span>ADMIN PORTAL</span>
        </a>

        <div class="login-card animate-up delay-1">
            
            <div class="text-center">
                <div class="card-header-icon animate-up delay-2">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <h2 class="login-title animate-up delay-2">Admin Security</h2>
                <p class="login-subtitle animate-up delay-2">Please authenticate to manage the system.</p>
            </div>

            <?php if($error): ?>
                <div class="alert-error animate-up delay-3">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" class="animate-up delay-3">

                <div class="form-floating-custom">
                    <input type="text" class="form-control-custom" name="username" placeholder="Administrator ID" required autocomplete="off">
                    <i class="fa-solid fa-user"></i>
                </div>

                <div class="form-floating-custom">
                    <input type="password" class="form-control-custom" name="password" placeholder="Password" required>
                    <i class="fa-solid fa-key"></i>
                </div>

                <button type="submit" class="btn-login animate-up delay-4">
                    Sign In <i class="fa-solid fa-arrow-right"></i>
                </button>

            </form>
        </div>

        <div class="return-link animate-up delay-4">
            <a href="index.php">
                <i class="fa-solid fa-arrow-left me-1"></i> Return to Homepage
            </a>
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>