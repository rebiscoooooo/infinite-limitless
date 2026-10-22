<?php
// CRON JOB FILE - Executes Daily
require 'db.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

$stmt = $pdo->query("
    SELECT id, email, full_name, created_at, 
    DATEDIFF(CURDATE(), DATE(created_at)) AS days_active 
    FROM members_registration 
    WHERE status = 'Approved'
");
$members = $stmt->fetchAll(PDO::FETCH_ASSOC);

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Hostname   = 'infinite-limitless.com';
$mail->Host       = 'smtp.hostinger.com';
$mail->SMTPAuth   = true;
$mail->Username   = 'admin@infinite-limitless.com'; 
$mail->Password   = 'Aesculapius123#'; // FIXED PASSWORD
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port       = 465;
$mail->isHTML(true);

$mail->MessageID = "<" . md5(uniqid(time())) . "@infinite-limitless.com>";
$mail->XMailer = 'INFINITE Marketing Automation';
$mail->setFrom('admin@infinite-limitless.com', 'Infinite Live Limitless');
$mail->addReplyTo('support@infinite-limitless.com', 'Infinite Support');
$mail->addCustomHeader('List-Unsubscribe', '<mailto:admin@infinite-limitless.com?subject=unsubscribe>');

// ==========================================
// 15-DAY DAILY PRODUCT SEQUENCE
// ==========================================
$marketing_sequence = [
    0 => [
        'subject' => "Welcome to the Family, let's explore Barley!",
        'name' => 'Infinite Pure Organic Barley Powder',
        'desc' => 'Start your wellness journey with our 100% Pure Organic Barley Powder. It naturally detoxifies the body, helps regulate blood sugar, and boosts your immune system.',
        'img'  => 'INFINITE_BARLEY_Pure_Organic_Barley_Powder.png',
        'link' => 'barley.php'
    ],
    1 => [
        'subject' => "Healthy Mornings with Infinite Coffee",
        'name' => 'Infinite Black Coffee with Barley',
        'desc' => 'Enjoy your morning brew with a healthy twist. Our Black Coffee infused with Pure Organic Barley gives you the energy you need without the crash, plus all the antioxidant benefits.',
        'img'  => 'INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png',
        'link' => 'barley.php'
    ],
    2 => [
        'subject' => "Radiate from Within \u{2728}",
        'name' => 'White Plus Glutathione',
        'desc' => 'Achieve that radiant glow from within. White Plus Glutathione promotes a healthier liver and helps lighten skin tone for a youthful, glowing complexion.',
        'img'  => 'White_Plus_Glutathione.png',
        'link' => 'index.php'
    ],
    3 => [
        'subject' => "Reveal Brighter Skin Today",
        'name' => 'Infinite Glow Up Soap',
        'desc' => 'Reveal brighter, smoother skin with the Infinite Glow Up Soap. Formulated to gently exfoliate and nourish your skin every time you bathe.',
        'img'  => 'INFINITE_Glow_Up_Soap.png',
        'link' => 'index.php'
    ],
    4 => [
        'subject' => "Stay Fresh & Confident",
        'name' => 'Infinite Deowhite Soap',
        'desc' => 'Stay fresh and confident all day. The Deowhite Soap targets dark areas while providing long-lasting odor protection and skin brightening.',
        'img'  => 'INFINITE_Deowhite_Soap.png',
        'link' => 'index.php'
    ],
    5 => [
        'subject' => "Hydration Your Skin Deserves",
        'name' => 'Infinite White Body Lotion',
        'desc' => 'Hydrate and protect your skin with our White Body Lotion. Non-greasy and easily absorbed, it leaves your skin soft, supple, and visibly brighter.',
        'img'  => 'INFINITE_White_Body_Lotion.png',
        'link' => 'index.php'
    ],
    6 => [
        'subject' => "Elevate Your Cleansing Routine",
        'name' => 'O LAMOUR Essence Bar',
        'desc' => 'Elevate your cleansing routine with the O LAMOUR Essence Bar. Infused with premium ingredients to lock in moisture and maintain your skin s natural barrier.',
        'img'  => 'O LAMOUR_Essence_Bar.png',
        'link' => 'olamour.php'
    ],
    7 => [
        'subject' => "The Perfect Skin Prep",
        'name' => 'O LAMOUR Facial Essence',
        'desc' => 'Prep your skin perfectly. Our Facial Essence deeply hydrates and prepares your pores to absorb the maximum benefits of your skincare routine.',
        'img'  => 'O_LAMOUR_Facial_Essence.png',
        'link' => 'olamour.php'
    ],
    8 => [
        'subject' => "A Concentrated Drop of Perfection",
        'name' => 'O LAMOUR Quintessence Ampoule',
        'desc' => 'The Quintessence Ampoule delivers powerful active ingredients directly to your skin for fast, visible anti-aging results.',
        'img'  => 'O LAMOUR_Quintessence_Ampoule.png',
        'link' => 'olamour.php'
    ],
    9 => [
        'subject' => "Seal in the Goodness",
        'name' => 'O LAMOUR CoreLaCr me',
        'desc' => 'Seal in the goodness. CoreLaCr me is a luxurious moisturizer that provides intense hydration and helps restore skin elasticity.',
        'img'  => 'O LAMOUR_CoreLaCr me.png',
        'link' => 'olamour.php'
    ],
    10 => [
        'subject' => "Flawless Coverage Meets Skincare",
        'name' => 'O LAMOUR Aeterna BB Cream',
        'desc' => 'Flawless coverage meets skincare. Our Aeterna BB Cream evens out your skin tone while protecting it from environmental stressors.',
        'img'  => 'O LAMOUR_Aeterna_BB_Cream.png',
        'link' => 'olamour.php'
    ],
    11 => [
        'subject' => "Experience a Non-Invasive Lift",
        'name' => 'Infinite Botox Serum',
        'desc' => 'The Infinite Botox Serum helps smooth fine lines and wrinkles, giving you a firmer, more youthful appearance without the needles.',
        'img'  => 'INFINITE_BOTOX_SERUM.png',
        'link' => 'olamour.php'
    ],
    12 => [
        'subject' => "Target Dark Spots Effectively",
        'name' => 'Infinite Brightening Serum',
        'desc' => 'Target dark spots and hyperpigmentation. This potent serum brings out your skin s natural, luminous glow.',
        'img'  => 'INFINITE_Brightening_Serum.png',
        'link' => 'olamour.php'
    ],
    13 => [
        'subject' => "Revitalize Tired Skin",
        'name' => 'Vida Skin Lotus Booster Ampoule',
        'desc' => 'Revitalize tired skin. The Lotus Booster Ampoule uses the soothing power of lotus extracts to calm redness and boost overall skin health.',
        'img'  => 'Vida_Skin_Lotus_Booster_Ampoule.png',
        'link' => 'olamour.php'
    ],
    14 => [
        'subject' => "Protect & Perfect Your Skin",
        'name' => 'Vida Tone Up Sun Serum',
        'desc' => 'Protect and perfect. Defend your skin against harmful UV rays while instantly brightening your complexion with our Tone Up Sun Serum.',
        'img'  => 'Vida_Tone_Up_Sun Serum.png', 
        'link' => 'olamour.php'
    ]
];

foreach ($members as $mem) {
    $days = (int)$mem['days_active'];
    
    if (array_key_exists($days, $marketing_sequence)) {
        
        $prod = $marketing_sequence[$days];
        
        $safe_img = str_replace(' ', '%20', $prod['img']);
        $img_url = "https://infinite-limitless.com/assets/image/product/" . $safe_img;
        $page_url = "https://infinite-limitless.com/" . $prod['link'];

        try {
            $mail->clearAddresses();
            $mail->addAddress($mem['email'], $mem['full_name']);
            $mail->Subject = $prod['subject'];
            
            $mail->Body = "
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;'>
                    <div style='background: #0f172a; padding: 25px; text-align: center;'>
                        <h1 style='color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;'>INFINITE</h1>
                        <p style='color: #14b8a6; margin: 0; font-weight: bold; font-size: 12px; letter-spacing: 3px;'>LIVE LIMITLESS</p>
                    </div>
                    <div style='padding: 30px; color: #334155; line-height: 1.6;'>
                        <p>Hi <b>{$mem['full_name']}</b>,</p>
                        
                        <h2 style='color: #0f172a; margin-top: 20px;'>{$prod['name']}</h2>
                        
                        <div style='text-align: center; margin: 20px 0;'>
                            <img src='{$img_url}' alt='{$prod['name']}' style='max-width: 100%; height: auto; border-radius: 8px; max-height: 300px; object-fit: contain;'>
                        </div>
                        
                        <p style='font-size: 15px;'>{$prod['desc']}</p>
                        
                        <div style='text-align: center; margin-top: 30px;'>
                            <a href='{$page_url}' style='padding: 12px 25px; background: #14b8a6; color: white; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;'>Explore Product Details</a>
                        </div>
                    </div>
                    <div style='background: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8;'>
                        <p>You are receiving this because you are an approved member of the Infinite network.</p>
                    </div>
                </div>";
                
            $mail->send();
            
            // Critical Anti-Spam: Wait 2 seconds between emails
            sleep(2);          
        } catch (Exception $e) {
            error_log("Marketing email failed for {$mem['email']}: {$mail->ErrorInfo}");
        }
    }
}
echo "Cron Marketing executed successfully.";
?>