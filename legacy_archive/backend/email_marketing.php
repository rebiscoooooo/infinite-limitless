<?php
session_start();
require 'db.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit;
}

$message = '';
$error = '';

// ==========================================
// INFINITE PRODUCT CATALOG
// ==========================================
$products = [
    'none' => [
        'name' => 'No Product (Text Only)',
        'desc' => 'Send a standard text-based announcement without featuring a specific product.',
        'img' => '',
        'link' => ''
    ],
    'barley' => [
        'name' => 'Infinite Pure Organic Barley Powder',
        'desc' => 'Start your wellness journey with our 100% Pure Organic Barley Powder. It naturally detoxifies the body, helps regulate blood sugar, and boosts your immune system.',
        'img'  => 'INFINITE_BARLEY_Pure_Organic_Barley_Powder.png',
        'link' => 'barley.php'
    ],
    'coffee' => [
        'name' => 'Infinite Black Coffee with Barley',
        'desc' => 'Enjoy your morning brew with a healthy twist. Our Black Coffee infused with Pure Organic Barley gives you the energy you need without the crash.',
        'img'  => 'INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png',
        'link' => 'barley.php'
    ],
    'gluta' => [
        'name' => 'White Plus Glutathione',
        'desc' => 'Achieve that radiant glow from within. Promotes a healthier liver and helps lighten skin tone for a youthful, glowing complexion.',
        'img'  => 'White_Plus_Glutathione.png',
        'link' => 'index.php'
    ],
    'glow_soap' => [
        'name' => 'Infinite Glow Up Soap',
        'desc' => 'Reveal brighter, smoother skin. Formulated to gently exfoliate and nourish your skin every time you bathe.',
        'img'  => 'INFINITE_Glow_Up_Soap.png',
        'link' => 'index.php'
    ],
    'deo_soap' => [
        'name' => 'Infinite Deowhite Soap',
        'desc' => 'Stay fresh and confident all day. Targets dark areas while providing long-lasting odor protection and skin brightening.',
        'img'  => 'INFINITE_Deowhite_Soap.png',
        'link' => 'index.php'
    ],
    'lotion' => [
        'name' => 'Infinite White Body Lotion',
        'desc' => 'Hydrate and protect your skin. Non-greasy and easily absorbed, it leaves your skin soft, supple, and visibly brighter.',
        'img'  => 'INFINITE_White_Body_Lotion.png',
        'link' => 'index.php'
    ],
    'olamour_bar' => [
        'name' => 'O LAMOUR Essence Bar',
        'desc' => 'Elevate your cleansing routine. Infused with premium ingredients to lock in moisture and maintain your skin s natural barrier.',
        'img'  => 'O LAMOUR_Essence_Bar.png',
        'link' => 'olamour.php'
    ],
    'olamour_essence' => [
        'name' => 'O LAMOUR Facial Essence',
        'desc' => 'The perfect skin prep. Deeply hydrates and prepares your pores to absorb the maximum benefits of your skincare routine.',
        'img'  => 'O_LAMOUR_Facial_Essence.png',
        'link' => 'olamour.php'
    ],
    'olamour_ampoule' => [
        'name' => 'O LAMOUR Quintessence Ampoule',
        'desc' => 'A concentrated drop of perfection. Delivers powerful active ingredients directly to your skin for fast, visible anti-aging results.',
        'img'  => 'O LAMOUR_Quintessence_Ampoule.png',
        'link' => 'olamour.php'
    ],
    'olamour_creme' => [
        'name' => 'O LAMOUR CoreLaCr me',
        'desc' => 'Seal in the goodness. A luxurious moisturizer that provides intense hydration and helps restore skin elasticity.',
        'img'  => 'O LAMOUR_CoreLaCr me.png',
        'link' => 'olamour.php'
    ],
    'olamour_bb' => [
        'name' => 'O LAMOUR Aeterna BB Cream',
        'desc' => 'Flawless coverage meets skincare. Evens out your skin tone while protecting it from environmental stressors.',
        'img'  => 'O LAMOUR_Aeterna_BB_Cream.png',
        'link' => 'olamour.php'
    ],
    'botox_serum' => [
        'name' => 'Infinite Botox Serum',
        'desc' => 'Experience a non-invasive lift. Helps smooth fine lines and wrinkles, giving you a firmer, more youthful appearance without the needles.',
        'img'  => 'INFINITE_BOTOX_SERUM.png',
        'link' => 'olamour.php'
    ],
    'brightening_serum' => [
        'name' => 'Infinite Brightening Serum',
        'desc' => 'Target dark spots effectively. This potent serum brings out your skin s natural, luminous glow.',
        'img'  => 'INFINITE_Brightening_Serum.png',
        'link' => 'olamour.php'
    ],
    'vida_ampoule' => [
        'name' => 'Vida Skin Lotus Booster Ampoule',
        'desc' => 'Revitalize tired skin. Uses the soothing power of lotus extracts to calm redness and boost overall skin health.',
        'img'  => 'Vida_Skin_Lotus_Booster_Ampoule.png',
        'link' => 'olamour.php'
    ],
    'vida_sun' => [
        'name' => 'Vida Tone Up Sun Serum',
        'desc' => 'Protect and perfect. Defend your skin against harmful UV rays while instantly brightening your complexion.',
        'img'  => 'Vida_Tone_Up_Sun Serum.png',
        'link' => 'olamour.php'
    ]
];

// ==========================================
// HANDLE EMAIL BLAST POST REQUEST
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['send_blast'])) {
    $target = $_POST['target'];
    $subject = htmlspecialchars($_POST['subject']);
    $content = $_POST['content']; 
    $selected_product_key = $_POST['product_select'];

    // Fetch from world_plan_registrations instead of members_registration
    if ($target === 'all_approved') {
        $stmt = $pdo->query("SELECT email, first_name, last_name FROM world_plan_registrations WHERE status = 'Approved'");
    } elseif ($target === 'all_pending') {
        $stmt = $pdo->query("SELECT email, first_name, last_name FROM world_plan_registrations WHERE status = 'Pending'");
    } else {
        $stmt = $pdo->query("SELECT email, first_name, last_name FROM world_plan_registrations"); 
    }
    
    $recipients = $stmt->fetchAll();
    
    if (count($recipients) > 0) {
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
            $mail->XMailer = 'INFINITE Marketing System';
            $mail->setFrom('admin@infinite-limitless.com', 'Infinite Team');
            $mail->addReplyTo('support@infinite-limitless.com', 'Infinite Support');
            $mail->isHTML(true);
            $mail->Subject = $subject;
            
            // Build the Product HTML Block if a product was selected
            $product_html = "";
            if ($selected_product_key !== 'none' && isset($products[$selected_product_key])) {
                $prod = $products[$selected_product_key];
                $safe_img = str_replace(' ', '%20', $prod['img']);
                $img_url = "https://infinite-limitless.com/assets/image/product/" . $safe_img;
                $page_url = "https://infinite-limitless.com/" . $prod['link'];

                $product_html = "
                    <div style='margin-top: 30px; border-top: 2px dashed #e2e8f0; padding-top: 30px; text-align: center;'>
                        <h2 style='color: #0f172a; margin-bottom: 15px; font-size: 22px;'>Featured Product</h2>
                        <img src='{$img_url}' alt='{$prod['name']}' style='max-width: 100%; height: auto; max-height: 250px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 20px;'>
                        <h3 style='color: #14b8a6; margin-bottom: 10px;'>{$prod['name']}</h3>
                        <p style='font-size: 15px; color: #475569; margin-bottom: 20px;'>{$prod['desc']}</p>
                        <a href='{$page_url}' style='padding: 12px 25px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;'>Discover More</a>
                    </div>
                ";
            }

            $successCount = 0;
            foreach ($recipients as $rec) {
                // Skip if email is missing or empty
                if (empty($rec['email'])) continue;

                // Safely handle first and last names
                $full_name = trim(($rec['first_name'] ?? '') . ' ' . ($rec['last_name'] ?? ''));
                if (empty($full_name)) {
                    $full_name = 'Valued Member';
                }

                $mail->clearAddresses();
                $mail->addAddress($rec['email'], $full_name);
                
                $mail->Body = "
                <div style='font-family: Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;'>
                    <div style='background: #0f172a; padding: 25px; text-align: center;'>
                        <h1 style='color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;'>INFINITE</h1>
                        <p style='color: #14b8a6; margin: 0; font-weight: bold; font-size: 12px; letter-spacing: 3px;'>LIVE LIMITLESS</p>
                    </div>
                    <div style='padding: 30px;'>
                        <p>Hi <b>{$full_name}</b>,</p>
                        <p>" . nl2br($content) . "</p>
                        {$product_html}
                    </div>
                    <div style='background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;'>
                        <p>Infinite Live Limitless | Sent automatically by the marketing system.</p>
                    </div>
                </div>";
                
                if($mail->send()) { $successCount++; sleep(1); } // Anti-spam delay
            }
            $message = "Email Blast sent successfully to $successCount recipient(s).";
            
        } catch (Exception $e) {
            $error = "Mailer Error: " . $mail->ErrorInfo;
        }
    } else {
        $error = "No recipients found for the selected target.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Product Marketing Hub | Infinite</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
    <style>
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-dark-slate: #0f172a; --ch-slate-muted: #64748b; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; border-right: 1px solid rgba(148, 163, 184, 0.15); transition: left 0.3s; z-index: 1050; }
        .sidebar-heading { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .list-group-item { background: transparent; border: none; color: #cbd5e1; padding: 0.85rem 1.25rem; font-weight: 500; border-left: 3px solid transparent; transition: all 0.2s; }
        .list-group-item:hover, .list-group-item.active { background-color: rgba(20, 184, 166, 0.1); color: var(--ch-teal); border-left-color: var(--ch-teal); }
        .list-group-item i { width: 24px; text-align: center; margin-right: 10px; color: #94a3b8; }
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .top-navbar { background: #fff; border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 25px; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); height: 100%; }
        
        .form-control, .form-select { border-radius: 0.5rem; padding: 0.7rem 1rem; border-color: #cbd5e1; }
        .form-control:focus, .form-select:focus { border-color: var(--ch-teal); box-shadow: 0 0 0 0.25rem rgba(20, 184, 166, 0.25); }
        
        .preview-box { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 1rem; padding: 2rem; text-align: center; transition: all 0.3s ease; }
        .preview-box img { max-height: 200px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); display: none; }
        .preview-box h4 { color: var(--ch-dark-slate); font-weight: 700; margin-bottom: 10px; display: none; }
        .preview-box p { color: var(--ch-slate-muted); font-size: 0.9rem; display: none; }
        
        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; transition: opacity 0.3s; }
        @media (max-width: 768px) { #sidebar-wrapper { position: fixed; left: -260px; } body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>
        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>
            <div class="container-fluid p-4 p-lg-5">
                <div class="mb-4">
                    <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">Marketing Hub</span>
                    <h2 style="font-size: clamp(2rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                        Product <span style="color: var(--ch-teal);">Campaigns</span>
                    </h2>
                </div>

                <?php if($message): ?><div class="alert alert-success"><i class="fa-solid fa-check-circle me-2"></i><?= $message ?></div><?php endif; ?>
                <?php if($error): ?><div class="alert alert-danger"><i class="fa-solid fa-triangle-exclamation me-2"></i><?= $error ?></div><?php endif; ?>

                <form method="POST" id="campaignForm">
                    <div class="row g-4">
                        <div class="col-lg-7">
                            <div class="dashboard-card">
                                <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 1.5rem;"><i class="fa-solid fa-pen-nib me-2" style="color: var(--ch-teal);"></i> Campaign Details</h5>
                                
                                <div class="mb-3">
                                    <label class="form-label text-muted" style="font-weight: 600; font-size: 0.85rem;">Target Audience</label>
                                    <select class="form-select" name="target" required>
                                        <option value="all_leads">All Leads & Members (Everyone)</option>
                                        <option value="all_approved">Approved Members Only</option>
                                        <option value="all_pending">Pending Applications Only</option>
                                    </select>
                                </div>
                                
                                <div class="mb-3">
                                    <label class="form-label text-muted" style="font-weight: 600; font-size: 0.85rem;">Feature a Product</label>
                                    <select class="form-select" name="product_select" id="productSelect" style="border-color: var(--ch-teal); background-color: #f0fdfa;">
                                        <?php foreach($products as $key => $prod): ?>
                                            <option value="<?= $key ?>"><?= $prod['name'] ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label text-muted" style="font-weight: 600; font-size: 0.85rem;">Email Subject</label>
                                    <input type="text" class="form-control" name="subject" placeholder="E.g., Unlock Radiant Skin with O'Lamour!" required>
                                </div>
                                
                                <div class="mb-4">
                                    <label class="form-label text-muted" style="font-weight: 600; font-size: 0.85rem;">Custom Introduction Message</label>
                                    <textarea class="form-control" name="content" rows="5" placeholder="Write a custom message here. This will appear ABOVE the featured product." required></textarea>
                                </div>
                                
                                <button type="submit" name="send_blast" class="btn w-100" style="background-color: var(--ch-teal); color: white; font-weight: 600; border-radius: 0.5rem; padding: 0.8rem; border:none;" onclick="return confirm('Are you sure you want to send this campaign?');">
                                    <i class="fa-solid fa-paper-plane me-2"></i> Launch Email Campaign
                                </button>
                            </div>
                        </div>

                        <div class="col-lg-5">
                            <div class="dashboard-card" style="background-color: #f8fafc;">
                                <h5 style="font-weight: 700; color: var(--ch-dark-slate); margin-bottom: 1.5rem;"><i class="fa-solid fa-eye me-2" style="color: var(--ch-slate-muted);"></i> Product Preview</h5>
                                
                                <div class="preview-box" id="previewBox">
                                    <div id="noProductMsg" style="color: #94a3b8; font-style: italic;">
                                        <i class="fa-solid fa-image fa-3x mb-3" style="opacity: 0.3;"></i><br>
                                        Select a product to preview the showcase that will be attached to your email.
                                    </div>
                                    
                                    <img id="previewImg" src="" alt="Product">
                                    <h4 id="previewTitle"></h4>
                                    <p id="previewDesc"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('menu-toggle')?.addEventListener('click', e => { e.preventDefault(); document.body.classList.toggle('sb-sidenav-toggled'); });
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => { document.body.classList.remove('sb-sidenav-toggled'); });

        const products = <?= json_encode($products) ?>;
        
        const selectEl = document.getElementById('productSelect');
        const previewBox = document.getElementById('previewBox');
        const imgEl = document.getElementById('previewImg');
        const titleEl = document.getElementById('previewTitle');
        const descEl = document.getElementById('previewDesc');
        const noProdMsg = document.getElementById('noProductMsg');

        function updatePreview() {
            const key = selectEl.value;
            const data = products[key];

            if(key === 'none' || !data.img) {
                imgEl.style.display = 'none';
                titleEl.style.display = 'none';
                descEl.style.display = 'none';
                noProdMsg.style.display = 'block';
                previewBox.style.borderColor = '#cbd5e1';
                previewBox.style.backgroundColor = '#f8fafc';
            } else {
                noProdMsg.style.display = 'none';
                
                const safeUrl = encodeURI("https://infinite-limitless.com/assets/image/product/" + data.img);
                imgEl.src = safeUrl;
                titleEl.innerText = data.name;
                descEl.innerText = data.desc;

                imgEl.style.display = 'inline-block';
                titleEl.style.display = 'block';
                descEl.style.display = 'block';
                
                previewBox.style.borderColor = 'var(--ch-teal)';
                previewBox.style.backgroundColor = '#ffffff';
            }
        }

        selectEl.addEventListener('change', updatePreview);
        updatePreview();
    </script>
</body>
</html>