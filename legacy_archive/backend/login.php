<?php
session_start();
require './db.php';

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

        header("Location: ./dashboard.php");
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

    <style>
    /* === CSS Variables Matching the Brand === */
    :root {
        --ch-teal: #14b8a6;
        --ch-teal-darker: #0f766e;
        --ch-dark-slate: #0f172a;
        --ch-slate-muted: #64748b;
        --ch-white: #ffffff;
        --ch-bg-light: #f8fafc;
        --ch-border: #e2e8f0;
    }

    body {
        font-family: 'Poppins', sans-serif;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow-x: hidden;
        color: #334155;

        background:
            radial-gradient(circle at top left, rgba(20, 184, 166, 0.15), transparent 40%),
            radial-gradient(circle at bottom right, rgba(20, 184, 166, 0.15), transparent 40%),
            linear-gradient(135deg, var(--ch-dark-slate), #0b1121, #080c17);
    }

    /* === Background Effects === */
    .bg-grid {
        position: fixed;
        inset: 0;
        background-image:
            radial-gradient(circle at 1px 1px,
            hsla(0, 0%, 100%, 0.05) 1px,
            transparent 0);
        background-size: 30px 30px;
        z-index: 0;
        pointer-events: none;
    }

    .bg-glow {
        position: fixed;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, rgba(0,0,0,0) 60%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        border-radius: 50%;
        pointer-events: none;
        animation: pulse-glow 8s infinite alternate ease-in-out;
    }

    @keyframes pulse-glow {
        0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
        100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
    }

    /* === Container & Animations === */
    .auth-wrapper {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 440px; /* Sized perfectly for single admin login */
        padding: 20px;
    }

    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-up {
        opacity: 0;
        animation: fadeUp 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }

    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }

    /* === Branding === */
    .brand-logo {
        text-align: center;
        margin-bottom: 2rem;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .brand-logo h1 {
        color: var(--ch-white);
        font-family: 'Bebas Neue', sans-serif;
        font-size: 3.5rem;
        line-height: 0.85;
        letter-spacing: 2px;
        margin: 0;
        text-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }

    .brand-logo span {
        color: var(--ch-teal);
        font-family: 'Barlow', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        letter-spacing: 5px;
        text-transform: uppercase;
        margin-top: 5px;
    }

    /* === Login Card === */
    .login-card {
        background: var(--ch-white);
        border-radius: 1.5rem;
        padding: 2.5rem 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        position: relative;
    }

    .card-header-icon {
        width: 50px;
        height: 50px;
        background: rgba(20, 184, 166, 0.1);
        color: var(--ch-teal);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        margin: 0 auto 1rem auto;
    }

    .login-title {
        font-weight: 700;
        color: var(--ch-dark-slate);
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .login-subtitle {
        color: var(--ch-slate-muted);
        font-size: 0.9rem;
        margin-bottom: 2rem;
    }

    /* =========================================
       FORM INPUTS
    ========================================= */
    .form-floating-custom {
        position: relative;
        margin-bottom: 1.25rem;
    }

    .form-control-custom {
        width: 100%;
        height: 52px;
        background: var(--ch-bg-light);
        border: 1px solid var(--ch-border);
        border-radius: 0.75rem;
        padding-left: 2.8rem;
        padding-right: 1rem;
        font-size: 16px;
        color: var(--ch-dark-slate);
        appearance: none;
        transition: all 0.3s ease;
    }

    .form-control-custom:focus {
        outline: none;
        background: var(--ch-white);
        border-color: var(--ch-teal);
        box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
    }

    /* ICON */
    .form-floating-custom i {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--ch-slate-muted);
        transition: color 0.3s ease;
        pointer-events: none;
        z-index: 2;
    }

    .form-control-custom:focus + i {
        color: var(--ch-teal);
    }

    /* === Submit Button === */
    .btn-login {
        width: 100%;
        height: 52px;
        background: var(--ch-teal);
        color: var(--ch-white);
        border: none;
        border-radius: 0.75rem;
        font-size: 1.05rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s ease;
        margin-top: 0.5rem;
    }

    .btn-login:hover {
        background: var(--ch-teal-darker);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(20, 184, 166, 0.3);
        color: var(--ch-white);
    }

    /* === Error Message === */
    .alert-error {
        background: #fee2e2;
        border-left: 4px solid #ef4444;
        color: #b91c1c;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* === Return Link === */
    .return-link {
        text-align: center;
        margin-top: 1.5rem;
    }

    .return-link a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .return-link a:hover {
        color: var(--ch-white);
    }

    /* =========================================
       RESPONSIVE FIXES
    ========================================= */
    @media (max-width: 480px) {
        .login-card {
            padding: 2rem 1.5rem;
        }
        .brand-logo h1 {
            font-size: 3rem;
        }
    }
    </style>
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