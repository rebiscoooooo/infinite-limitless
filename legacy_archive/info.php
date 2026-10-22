<?php
session_start();
require_once 'public_auth_guard.php';
require_once 'backend/db.php'; // Database connection

// ==========================================
// FETCH APPROVED REGISTRATIONS
// ==========================================
$approved_users = [];
try {
    $stmt = $pdo->query("SELECT first_name, last_name, country, package_type FROM world_plan_registrations WHERE status = 'Approved' ORDER BY id ASC");
    $approved_users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Silently ignore if table doesn't exist yet
}

// Group users by tier
$tier_members = [
    'diamond' => [],
    'sapphire' => [],
    'ruby' => [],
    'pearl' => []
];

foreach ($approved_users as $user) {
    $fullName = strtoupper(trim($user['first_name'] . ' ' . $user['last_name']));
    $country = strtoupper(trim($user['country']));
    $pkg = strtolower(trim($user['package_type']));
    
    $member_data = [
        'name' => $fullName,
        'country' => $country,
        'flag' => strtolower($country), // Best effort flag mapping, or we can use default
        'img' => './assets/image/placeholder-user.jpg', // Placeholder for now
        'coming_soon' => false
    ];

    if (strpos($pkg, 'supreme') !== false) {
        $tier_members['diamond'][] = $member_data;
    } elseif (strpos($pkg, 'pro') !== false) {
        $tier_members['sapphire'][] = $member_data;
    } elseif (strpos($pkg, 'advance') !== false) {
        $tier_members['ruby'][] = $member_data;
    } else {
        $tier_members['pearl'][] = $member_data;
    }
}

// Helper to fill empty slots
function fill_slots($members, $max_slots) {
    $filled = $members;
    $current_count = count($filled);
    if ($current_count < $max_slots) {
        for ($i = $current_count; $i < $max_slots; $i++) {
            $filled[] = ['name' => 'RESERVED SLOT', 'country' => 'AVAILABLE', 'flag' => '', 'img' => '', 'coming_soon' => true];
        }
    }
    return $filled;
}

// ==========================================
// EXECUTIVES DATA ARRAY (DYNAMIC)
// ==========================================
$executive_tiers = [
    [
        'id' => 'diamond',
        'theme_class' => 'diamond-theme diamond-layout',
        'gem_img' => './assets/image/diamond.png',
        'rank_name' => 'DIAMOND EXECUTIVES',
        'rank_sub' => '',
        'is_diamond_layout' => true,
        'leaders' => fill_slots($tier_members['diamond'], 3)
    ],
    [
        'id' => 'sapphire',
        'theme_class' => 'sapphire-theme',
        'gem_img' => './assets/image/sapphire.png',
        'rank_name' => 'SAPPHIRE',
        'rank_sub' => 'EXECUTIVES',
        'is_diamond_layout' => false,
        'leaders' => fill_slots($tier_members['sapphire'], 4)
    ],
    [
        'id' => 'ruby',
        'theme_class' => 'ruby-theme',
        'gem_img' => './assets/image/ruby.png',
        'rank_name' => 'RUBY',
        'rank_sub' => 'EXECUTIVES',
        'is_diamond_layout' => false,
        'leaders' => fill_slots($tier_members['ruby'], 4)
    ],
    [
        'id' => 'pearl',
        'theme_class' => 'pearl-theme',
        'gem_img' => './assets/image/pearl.png',
        'rank_name' => 'PEARL',
        'rank_sub' => 'EXECUTIVES',
        'is_diamond_layout' => false,
        'leaders' => fill_slots($tier_members['pearl'], 4)
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no" />
    <title>Infinite | Proof of Legitimacy</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="./assets/css/styles.css" />
    <link rel="stylesheet" href="./assets/css/info.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />

    <link rel="stylesheet" href="style.css?v=5">

    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&display=swap" rel="stylesheet" />

    
</head>
<body class="is-loading">

    <div id="infinite-preloader">
        <div class="preloader-content">
            <span class="preloader-brand">INFINITE</span>
            <span class="preloader-slogan">COMPANY TRANSPARENCY</span>
            <div class="preloader-line"></div>
        </div>
    </div>
    
    <?php include 'header.php'; ?>

    <section class="modern-hero" id="hero" style="position: relative; overflow: hidden; padding-top: 160px; padding-bottom: 100px;">
        <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('./assets/image/bg/info.jpg') center center / cover no-repeat; z-index: 0;">
            <div class="hero-grid-lines"></div>
        </div>
        <div class="container hero-wrapper">
            <div class="hero-text">
                <small>100% VERIFIED & TRUSTED</small>
                <h1>PROOF OF <span>Legitimacy</span></h1>
                <div class="hero-line"></div>
                <p>At Infinite, we believe that true success is built on a foundation of trust. Explore our legal certifications, daily transaction proofs, and real feedback from our growing global community.</p>
            </div>
            <div class="hero-image">
                <div class="shield-icon">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>
            </div>
        </div>
    </section>

    <section class="tabs-section">
        <div class="container">
            <div class="tabs" id="tabButtons">
                <div class="tab-item active" data-tab="receipt"><div class="tab-icon"><i class="fa-solid fa-receipt"></i></div><h4>RECEIPT</h4><div class="active-line"></div></div>
                <div class="tab-item" data-tab="tracking"><div class="tab-icon"><i class="fa-solid fa-truck"></i></div><h4>LOGISTICS</h4><div class="active-line"></div></div>
                <div class="tab-item" data-tab="delivered"><div class="tab-icon"><i class="fa-solid fa-circle-check"></i></div><h4>DELIVERED</h4><div class="active-line"></div></div>
                <div class="tab-item" data-tab="offices"><div class="tab-icon"><i class="fa-solid fa-building"></i></div><h4>OFFICES</h4><div class="active-line"></div></div>
                <div class="tab-item" data-tab="certificate"><div class="tab-icon"><i class="fa-solid fa-certificate"></i></div><h4>CERTIFICATE</h4><div class="active-line"></div></div>
                <div class="tab-item" data-tab="gallery"><div class="tab-icon"><i class="fa-solid fa-image"></i></div><h4>GALLERY</h4><div class="active-line"></div></div>
                <div class="tab-item" data-tab="executives"><div class="tab-icon"><i class="fa-solid fa-users"></i></div><h4>EXECUTIVES</h4><div class="active-line"></div></div>
            </div>
        </div>
    </section>

    <div class="panel-container">
        <div class="container">
            <div id="panel-receipt" class="content-panel active-panel">
                <div class="panel-header"><i class="fa-solid fa-receipt"></i><h2>Payment Receipts</h2></div>
                <div class="cards-grid">
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-file-invoice-dollar"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Bank Transfers</h3><div class="price">Coming Soon</div><div class="meta">Verified payment receipts will be displayed here</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-mobile-screen"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>E-Wallets</h3><div class="price">Coming Soon</div><div class="meta">Verified GCash/Maya transactions</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-money-bill-transfer"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Remittances</h3><div class="price">Coming Soon</div><div class="meta">International & local remittance proofs</div></div>
                    </div>
                </div>
            </div>
            
            <div id="panel-tracking" class="content-panel">
                <div class="panel-header"><i class="fa-solid fa-truck"></i><h2>Logistics & Shipping</h2></div>
                <div class="cards-grid">
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-boxes-packing"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Order Preparation</h3><div class="meta">Photos of packages ready for dispatch</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-truck-fast"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Courier Turnover</h3><div class="meta">Waybills and logistics handover</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-plane-departure"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Global Shipping</h3><div class="meta">International dispatch tracking</div></div>
                    </div>
                </div>
            </div>
            
            <div id="panel-delivered" class="content-panel">
                <div class="panel-header"><i class="fa-solid fa-circle-check"></i><h2>Successfully Delivered</h2></div>
                <div class="cards-grid">
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-house-circle-check"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Local Deliveries</h3><div class="price">Coming Soon</div><div class="meta">Packages safely arrived at destinations</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-globe"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>International Orders</h3><div class="price">Coming Soon</div><div class="meta">Worldwide successful deliveries</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-box-open"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Unboxing</h3><div class="price">Coming Soon</div><div class="meta">Customer unboxing photos</div></div>
                    </div>
                </div>
            </div>
            
            <div id="panel-offices" class="content-panel">
                <div class="panel-header"><i class="fa-solid fa-building"></i><h2>Our Offices</h2></div>
                <div class="cards-grid">
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-building-flag"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Headquarters</h3><div class="price">Coming Soon</div><div class="meta">Main office facade and interior</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-map-location-dot"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Regional Branches</h3><div class="price">Coming Soon</div><div class="meta">Photos of our expansion hubs</div></div>
                    </div>
                </div>
            </div>
            
            <div id="panel-certificate" class="content-panel">
                <div class="panel-header"><i class="fa-solid fa-certificate"></i><h2>Certifications & Accreditations</h2></div>
                <div class="cards-grid">
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-award"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Business Registration</h3><div class="price">Coming Soon</div><div class="meta">Official government permits</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-file-contract"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Product Quality</h3><div class="price">Coming Soon</div><div class="meta">Safety & health accreditations</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-handshake-angle"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Chamber Memberships</h3><div class="price">Coming Soon</div><div class="meta">ECCP, KCCP, HADSAP accreditations</div></div>
                    </div>
                </div>
            </div>
            
            <div id="panel-gallery" class="content-panel">
                <div class="panel-header"><i class="fa-solid fa-image"></i><h2>Brand Gallery</h2></div>
                <div class="cards-grid">
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-camera-retro"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Product Highlights</h3><div class="price">Coming Soon</div><div class="meta">High-quality lifestyle shots</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-people-group"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Community Events</h3><div class="price">Coming Soon</div><div class="meta">Summits, meetups, and gatherings</div></div>
                    </div>
                    <div class="info-card">
                        <div class="card-img"><div class="coming-soon-img"><i class="fa-solid fa-star"></i><span>IMAGE TBD</span></div></div>
                        <div class="card-body"><h3>Transformations</h3><div class="price">Coming Soon</div><div class="meta">Real customer results</div></div>
                    </div>
                </div>
            </div>

            <div id="panel-executives" class="content-panel">
                <div class="elite-executives" style="padding: 20px 0 0;">
                    <div class="executive-heading">
                        <div class="mini-crown">♛</div>
                        <h1>EXECUTIVES</h1>
                        <p>LEADERSHIP. EXCELLENCE. LEGACY.</p>
                        <div class="heading-divider"><span></span><div class="diamond-shape"></div><span></span></div>
                    </div>
                    
                    <div class="executive-wrapper">
                        <?php foreach($executive_tiers as $tier): ?>
                            <?php if($tier['is_diamond_layout']): ?>
                                <div class="executive-row <?= $tier['theme_class'] ?>">
                                    <div class="diamond-header">
                                        <div class="gem-circle diamond-gem">
                                            <img src="<?= $tier['gem_img'] ?>" alt="Diamond Logo">
                                        </div>
                                        <div class="rank-text diamond-rank-text">
                                            <h2><?= $tier['rank_name'] ?></h2>
                                            <div class="mini-divider center-divider">
                                                <span></span>
                                                <div class="mini-diamond"></div>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="leaders-grid diamond-grid">
                                        <?php foreach($tier['leaders'] as $leader): ?>
                                            <div class="leader-box">
                                                <?php if($leader['coming_soon']): ?>
                                                    <div class="leader-photo coming-soon-photo">
                                                        <i class="fa-solid fa-user-lock"></i>
                                                        <span>RESERVED</span>
                                                    </div>
                                                <?php else: ?>
                                                    <div class="leader-photo"><img src="<?= $leader['img'] ?>" alt="<?= $leader['name'] ?>"></div>
                                                <?php endif; ?>
                                                
                                                <div class="leader-meta">
                                                    <h4><?= $leader['name'] ?></h4>
                                                    <p>
                                                        <?php if($leader['coming_soon']): ?>
                                                            <i class="fa-solid fa-globe me-2" style="opacity: 0.5;"></i>
                                                        <?php else: ?>
                                                            <img src="./assets/image/flags/<?= $leader['flag'] ?>.png" alt="<?= $leader['country'] ?>" class="flag-img"> 
                                                        <?php endif; ?>
                                                        <?= $leader['country'] ?>
                                                    </p>
                                                </div>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            <?php else: ?>
                                <div class="executive-row <?= $tier['theme_class'] ?>">
                                    <div class="rank-side">
                                        <div class="gem-circle <?= $tier['id'] ?>-gem"><img src="<?= $tier['gem_img'] ?>" alt="<?= ucfirst($tier['id']) ?> Logo"></div>
                                        <div class="rank-text">
                                            <h2><?= $tier['rank_name'] ?></h2><h3><?= $tier['rank_sub'] ?></h3>
                                            <div class="mini-divider"><span></span><div class="mini-diamond"></div><span></span></div>
                                        </div>
                                    </div>
                                    <div class="leaders-grid">
                                        <?php foreach($tier['leaders'] as $leader): ?>
                                            <div class="leader-box">
                                                <?php if($leader['coming_soon']): ?>
                                                    <div class="leader-photo coming-soon-photo">
                                                        <i class="fa-solid fa-user-lock"></i>
                                                        <span>RESERVED</span>
                                                    </div>
                                                <?php else: ?>
                                                    <div class="leader-photo"><img src="<?= $leader['img'] ?>" alt="<?= $leader['name'] ?>"></div>
                                                <?php endif; ?>
                                                
                                                <div class="leader-meta">
                                                    <h4><?= $leader['name'] ?></h4>
                                                    <p>
                                                        <?php if($leader['coming_soon']): ?>
                                                            <i class="fa-solid fa-globe me-2" style="opacity: 0.5;"></i>
                                                        <?php else: ?>
                                                            <img src="./assets/image/flags/<?= $leader['flag'] ?>.png" alt="<?= $leader['country'] ?>" class="flag-img"> 
                                                        <?php endif; ?>
                                                        <?= $leader['country'] ?>
                                                    </p>
                                                </div>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <section class="features-modern" id="features">
        <div class="container">
            <div class="features-grid">
                <div class="feature-modern"><div class="feature-icon-modern"><i class="fa-solid fa-file-shield"></i></div><h3>Legally Registered</h3><p>We are a fully registered business entity compliant with all local and international trading regulations.</p></div>
                <div class="feature-modern"><div class="feature-icon-modern"><i class="fa-solid fa-shield-heart"></i></div><h3>Premium Quality</h3><p>Our skincare and wellness products undergo strict quality control and testing.</p></div>
                <div class="feature-modern"><div class="feature-icon-modern"><i class="fa-solid fa-handshake"></i></div><h3>Transparent Process</h3><p>Full transparency from order to doorstep with tracking and reliable support.</p></div>
            </div>
        </div>
    </section>

    <footer id="contact" style="background: var(--ch-dark-slate); padding-top: 80px;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center g-5 align-items-center">
                <div class="col-lg-5 col-xl-4 text-center text-lg-start">
                    <div class="mb-3" style="color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 50px; letter-spacing: 2px;">INFINITE<span style="color: var(--ch-teal);">.</span></div>
                    <p class="mb-4" style="color: var(--ch-slate-muted); font-size: 1.1rem;">Empowering Global Entrepreneurs Through Premium Skincare & Wellness</p>
                    <div class="d-flex justify-content-center justify-content-lg-start gap-3 mb-5">
                        <a href="" class="text-white fs-4"><i class="bi bi-facebook"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-instagram"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-tiktok"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>

                <div class="col-lg-6 col-xl-5 offset-xl-1">
                    <div class="bg-white rounded-4 p-4 p-md-5 shadow">
                        <h3 class="fw-bold mb-2" style="color:var(--ch-dark-slate);">Send Us a Message</h3>
                        <p class="text-muted mb-4 small">We respond within 2-3 business days.</p>

                        <div id="formAlertMessage" class="alert d-none align-items-center rounded-3 shadow-sm mb-4" role="alert"></div>
                        
                        <form id="contactForm" class="needs-validation" novalidate>
                            <div class="form-floating mb-3">
                                <input type="text" name="name" id="nameInput" class="form-control bg-light border-0 shadow-none" placeholder="Your Name" required />
                                <label for="nameInput" class="text-muted">Your Name</label>
                                <div class="invalid-feedback">Please provide your name.</div>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" name="email" id="emailInput" class="form-control bg-light border-0 shadow-none" placeholder="Email Address" required />
                                <label for="emailInput" class="text-muted">Email Address</label>
                                <div class="invalid-feedback">Please provide a valid email address.</div>
                            </div>
                            <div class="form-floating mb-3">
                                <select name="subject" id="subjectInput" class="form-select bg-light border-0 shadow-none" required>
                                    <option value="" selected disabled>Select Subject</option>
                                    <option value="Order Product">Order Product</option>
                                    <option value="Join Us">Join Us</option>
                                    <option value="Feedback">Feedback</option>
                                </select>
                                <label for="subjectInput" class="text-muted">Subject</label>
                                <div class="invalid-feedback">Please select a subject.</div>
                            </div>
                            <div class="form-floating mb-4">
                                <textarea name="message" id="messageInput" class="form-control bg-light border-0 shadow-none" placeholder="Your message..." style="height: 130px" required></textarea>
                                <label for="messageInput" class="text-muted">Your message...</label>
                                <div class="invalid-feedback">Please write your message.</div>
                            </div>
                            <button type="submit" id="contactSubmitBtn" class="btn w-100 fw-bold py-3 text-white rounded-3 shadow-sm" style="background-color: var(--ch-teal); transition: all 0.3s ease;">
                                <i class="bi bi-send me-2"></i> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <hr class="mt-5" style="border-color: rgba(255,255,255,0.1);" />
            <div class="row align-items-center pb-4 text-center text-md-start" style="color: var(--ch-slate-muted); font-size: 0.85rem;">
                <div class="col-md-6 mb-2 mb-md-0">&copy; <?= date('Y') ?> Infinite. All rights reserved.</div>

                <div class="col-md-6 text-md-end">
                    Properties of
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="primo">Primo Ecalne Jr.</a> |
                    <a href="#" class="owner-link" data-bs-toggle="modal" data-bs-target="#ownerModal" data-owner="aera">Aera Claridad</a>
                </div>

            </div>
        </div>
    </footer>

    <div class="modal fade" id="ownerModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content owner-modal-content">
                <button type="button" class="btn-close btn-close-custom" data-bs-dismiss="modal" aria-label="Close"></button>

                <div class="row g-0 align-items-stretch">
                    <div class="col-lg-5 owner-img-col">
                        <div class="glow-effect"></div>
                        <img src="" id="ownerModalImg" alt="Owner">
                    </div>

                    <div class="col-lg-7 owner-text-col d-flex flex-column justify-content-center">

                        <h3 id="ownerModalName">Name Here</h3>
                        <h6 id="ownerModalTitle">INFINITE AMBASSADOR / DIAMOND EXECUTIVE</h6>

                        <div class="owner-bio-box">
                            <i class="fa-solid fa-quote-left"></i>
                            <div id="ownerModalBio"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <button class="back-to-top border-0 shadow" id="backToTopBtn" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // ==========================================
        // PRELOADER LOGIC (3-5 Second Delay)
        // ==========================================
        window.addEventListener('load', () => {
            const preloader = document.getElementById('infinite-preloader');
            
            // Set the exact time you want the preloader to show (3000ms = 3 seconds)
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.remove('is-loading'); // Re-enables scrolling
                
                // Remove from DOM completely after the fade transition finishes
                setTimeout(() => {
                    preloader.remove();
                }, 800); 
            }, 3000); 
        });

        // Tabs functionality (with executives panel)
        const tabs = document.querySelectorAll('.tab-item');
        const panels = {
            receipt: document.getElementById('panel-receipt'),
            tracking: document.getElementById('panel-tracking'),
            delivered: document.getElementById('panel-delivered'),
            offices: document.getElementById('panel-offices'),
            certificate: document.getElementById('panel-certificate'),
            gallery: document.getElementById('panel-gallery'),
            executives: document.getElementById('panel-executives')
        };
        function setActiveTab(activeTabElement) { tabs.forEach(tab => tab.classList.remove('active')); activeTabElement.classList.add('active'); }
        function showPanel(panelId) { Object.values(panels).forEach(panel => { if (panel) panel.classList.remove('active-panel'); }); if (panels[panelId]) panels[panelId].classList.add('active-panel'); }
        tabs.forEach(tab => { tab.addEventListener('click', () => { const tabName = tab.getAttribute('data-tab'); setActiveTab(tab); showPanel(tabName); }); });

        // Navbar Scroll Effect
        const navbar = document.getElementById('mainNav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTopBtn');
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
            if(window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === "#" || href === "") return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Close mobile menu on click
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarCollapse = document.getElementById('navMenu');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });

        // ==========================================
        // OWNER MODAL POPULATION LOGIC
        // ==========================================
        const ownerData = {
            'primo': {
                name: 'PRIMO ECALNE JR.',
                img: './assets/image/team/Sir_Primo.png',
                bio: 'I’m Primo, a passionate entrepreneur driven by growth, purpose, and the desire to create meaningful opportunities through INFINITE. I believe success is built through consistency, vision, and the courage to dream beyond limits while continuously becoming a better version of yourself.<br><br>I am passionate about building a strong and positive community where people can grow together, support one another, and create opportunities that lead to long-term personal and financial growth.<br><br><a href="https://www.linkedin.com/in/primo-ecalne-3a87221a2" target="_blank" class="owner-linkedin"><i class="bi bi-linkedin"></i> Connect with me on LinkedIn</a>'
            },
            'aera': {
                name: 'AERA CLARIDAD',
                img: './assets/image/team/ma_am(2.png',
                bio: 'My name is Aera Claridad, and I am passionate about helping people create a better future for themselves through INFINITE. I started this journey with a simple goal: to grow not only financially, but also personally while inspiring others to do the same.<br><br>I believe that everyone deserves the opportunity to achieve time and financial freedom. Through dedication, consistency, and the right environment, I want to help people unlock their potential and build a life they truly want for themselves and their families.<br><br>For me, success is not just about income. It is about creating impact, building genuine connections, and growing together with the people around me.<br><br><a href="https://www.linkedin.com/in/aera-claridad-68ba94179" target="_blank" class="owner-linkedin"><i class="bi bi-linkedin"></i> Connect with me on LinkedIn</a>'
            }
        };

        const ownerModal = document.getElementById('ownerModal');
        if(ownerModal){
            ownerModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                const ownerKey = button.getAttribute('data-owner');
                const data = ownerData[ownerKey];

                document.getElementById('ownerModalName').textContent = data.name;
                document.getElementById('ownerModalImg').src = data.img;
                document.getElementById('ownerModalBio').innerHTML = data.bio;
            });
        }

        // ==========================================
        // CONTACT FORM LOGIC
        // ==========================================
        document.addEventListener("DOMContentLoaded", function() {
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
                // Prevent double-submit loops
                if(contactForm.dataset.bound) return;
                contactForm.dataset.bound = "true";

                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault(); 

                    // Trigger Bootstrap native validation UI
                    if (!contactForm.checkValidity()) {
                        e.stopPropagation();
                        contactForm.classList.add('was-validated');
                        return;
                    }

                    const submitBtn = document.getElementById('contactSubmitBtn');
                    const originalText = submitBtn.innerHTML;

                    // Disable button & show Bootstrap spinner
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

                    // Reset alert box states before new submission
                    alertBox.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    alertBox.innerHTML = '';

                    const formData = new FormData(this);

                    fetch('backend/submit_inquiry.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            alertBox.classList.remove('d-none');
                            
                            if (data.status === 'success') {
                                // Bootstrap Success Alert
                                alertBox.classList.add('alert-success', 'd-flex');
                                alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                                
                                contactForm.reset(); 
                                contactForm.classList.remove('was-validated');
                            } else {
                                // Bootstrap Error Alert
                                alertBox.classList.add('alert-danger', 'd-flex');
                                alertBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Failed to Send</strong><br>' + (data.message || 'Please fill out all required fields.') + '</div>';
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alertBox.classList.remove('d-none');
                            alertBox.classList.add('alert-danger', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-wifi-off fs-4 me-3 text-danger"></i> <div><strong>Network Error</strong><br>Could not connect to the server. Please try again later.</div>';
                        })
                        .finally(() => {
                            // Restore button
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }
        });
    </script>
</body>
</html>