<?php
session_start();
require_once 'public_auth_guard.php';

// Get selected country from URL (passed from select-country.php), default to Philippines
$selectedCountry = isset($_GET['country']) ? htmlspecialchars($_GET['country']) : 'Philippines';

// Structured data for the earning ways (Global overview)
$earning_ways = [
    ["icon" => "fa-solid fa-hand-holding-dollar", "title" => "1. Retailing", "desc" => "Earn upfront retail profit by selling our premium products directly to consumers."],
    ["icon" => "fa-solid fa-user-plus", "title" => "2. Direct Referral", "desc" => "Receive a cash bonus for every new entrepreneur you personally sponsor."],
    ["icon" => "fa-solid fa-people-arrows", "title" => "3. Pairing Bonus", "desc" => "Build two sales forces. Earn a bonus whenever sales volume matches on both sides."],
    ["icon" => "fa-solid fa-layer-group", "title" => "4. Unilevel Bonus", "desc" => "Generate passive income from the monthly product reorders of your team."],
    ["icon" => "fa-solid fa-chart-line", "title" => "5. Stair-Step", "desc" => "Earn overriding commissions based on the rank differential between you and your downlines."],
    ["icon" => "fa-solid fa-crown", "title" => "6. Royalty Bonus", "desc" => "Earn a percentage from the income of the leaders you have mentored and promoted."],
    ["icon" => "fa-solid fa-globe", "title" => "7. Global Profit", "desc" => "Reach the top ranks to earn a share of INFINITE's overall global sales revenue."],
    ["icon" => "fa-solid fa-plane-departure", "title" => "8. Incentives", "desc" => "Enjoy all-expense-paid travel incentives, car programs, and lifestyle rewards."]
];

// Structured data for How to Join steps
$join_steps = [
    ["icon" => "fa-solid fa-box-open", "step" => "Step 1", "title" => "Choose Package", "desc" => "Select from our range of premium packages for instant business activation below."],
    ["icon" => "fa-solid fa-file-signature", "step" => "Step 2", "title" => "Register Account", "desc" => "Fill out the official application form with your details to register."],
    ["icon" => "fa-solid fa-chalkboard-user", "step" => "Step 3", "title" => "Attend Training", "desc" => "Join our business orientation to learn effective marketing strategies."],
    ["icon" => "fa-solid fa-rocket", "step" => "Step 4", "title" => "Launch Business", "desc" => "Start sharing the products and utilize our tools to start earning."]
];

// Structured data for Package Types & Tiers (Updated for Philippines Pricing & Official Inclusions)
$packages = [
    'executive' => [
        [
            "id" => "exec-emerald",
            "name" => "Executive Product Set",
            "tier" => "EMERALD",
            "price" => "₱14,880",
            "worth" => "₱16,200",
            "img" => "./assets/image/badge/Emerald_logo.png",
            "inclusions" => ["1 Facial Essense", "1 Quintessense Ampoule", "1 CoreLacrème", "3 PrimeRenew BB cream", "Executive Badge", "Eligible for 3%-19% Team Rebates", "Potential Income: Up to ₱30,000 / Week"],
            "recommended" => false
        ],
        [
            "id" => "exec-pearl",
            "name" => "Executive Product Set",
            "tier" => "PEARL",
            "price" => "₱28,880",
            "worth" => "₱32,400",
            "img" => "./assets/image/badge/Pearl_logo.png",
            "inclusions" => ["2 Facial Essense", "2 Quintessense Ampoule", "2 CoreLacrème", "6 PrimeRenew BB cream", "Executive Badge", "Eligible for 3%-19% Team Rebates", "Potential Income: Up to ₱50,000 / Week"],
            "recommended" => false
        ],
        [
            "id" => "exec-ruby",
            "name" => "Executive Product Set",
            "tier" => "RUBY",
            "price" => "₱76,880",
            "worth" => "₱88,800",
            "img" => "./assets/image/badge/Ruby_logo.png",
            "inclusions" => ["6 Facial Essense", "6 Quintessense Ampoule", "6 CoreLacrème", "14 PrimeRenew BB cream", "Executive Badge", "Eligible for 3%-19% Team Rebates", "Potential Income: Up to ₱90,000 / Week"],
            "recommended" => true
        ],
        [
            "id" => "exec-sapphire",
            "name" => "Executive Product Set",
            "tier" => "SAPPHIRE",
            "price" => "₱198,800",
            "worth" => "₱237,600",
            "img" => "./assets/image/badge/Sapphire_logo.png",
            "inclusions" => ["17 Facial Essense", "17 Quintessense Ampoule", "17 CoreLacrème", "33 PrimeRenew BB cream", "Executive Badge", "Eligible for 3%-19% Team Rebates", "Potential Income: Up to ₱150,000 / Week"],
            "recommended" => false
        ],
        [
            "id" => "exec-diamond",
            "name" => "Executive Product Set",
            "tier" => "DIAMOND",
            "price" => "₱298,880",
            "worth" => "₱372,900",
            "img" => "./assets/image/badge/Diamond_logo.png",
            "inclusions" => ["26 Facial Essense", "26 Quintessense Ampoule", "26 CoreLacrème", "55 PrimeRenew BB cream", "Executive Badge", "Eligible for 3%-19% Team Rebates", "Potential Income: Up to ₱200,000 / Week"],
            "recommended" => false
        ]
    ],
    'regular' => [
        [
            "id" => "reg-gem",
            "name" => "All Infinite Product Set",
            "tier" => "GEM",
            "price" => "₱5,500",
            "worth" => "₱5,500",
            "img" => "./assets/image/badge/GEM.png", // Update this image path if you have a Gem logo
            "inclusions" => ["1 INFINITE ROBUSTUS", "1 INFINITE WHITEPLUS Glutathione", "1 INFINITE GLOW UP Soap", "1 INFINITE DEOWHITE Soap", "2 INFINITE BOTOX Serum", "1 INFINITE BRIGHTENING Serum", "1 INFINITE WHITE Body Lotion", "Potential Income: Up to ₱12,500 / Week"],
            "recommended" => false
        ],
        [
            "id" => "reg-emerald",
            "name" => "All Infinite Product Set",
            "tier" => "EMERALD",
            "price" => "₱9,800",
            "worth" => "₱10,200",
            "img" => "./assets/image/badge/Emerald_logo.png",
            "inclusions" => ["2 INFINITE ROBUSTUS", "1 INFINITE BARLEY", "2 INFINITE WHITEPLUS Glutathione", "2 INFINITE GLOW UP Soap", "2 INFINITE DEOWHITE Soap", "2 INFINITE BOTOX Serum", "2 INFINITE BRIGHTENING Serum", "1 INFINITE WHITE Body Lotion", "Potential Income: Up to ₱30,000 / Week"],
            "recommended" => false
        ],
        [
            "id" => "reg-pearl",
            "name" => "All Infinite Product Set",
            "tier" => "PEARL",
            "price" => "₱18,800",
            "worth" => "₱20,650",
            "img" => "./assets/image/badge/Pearl_logo.png",
            "inclusions" => ["4 INFINITE ROBUSTUS", "2 INFINITE BARLEY", "4 INFINITE WHITEPLUS Glutathione", "5 INFINITE GLOW UP Soap", "4 INFINITE DEOWHITE Soap", "4 INFINITE BOTOX Serum", "4 INFINITE BRIGHTENING Serum", "2 INFINITE WHITE Body Lotion", "Potential Income: Up to ₱50,000 / Week"],
            "recommended" => false
        ],
        [
            "id" => "reg-ruby",
            "name" => "All Infinite Product Set",
            "tier" => "RUBY",
            "price" => "₱49,800",
            "worth" => "₱57,400",
            "img" => "./assets/image/badge/Ruby_logo.png",
            "inclusions" => ["10 INFINITE ROBUSTUS", "5 INFINITE BARLEY", "11 INFINITE WHITEPLUS Glutathione", "12 INFINITE GLOW UP Soap", "12 INFINITE DEOWHITE Soap", "12 INFINITE BOTOX Serum", "12 INFINITE BRIGHTENING Serum", "7 INFINITE WHITE Body Lotion", "Potential Income: Up to ₱90,000 / Week"],
            "recommended" => true
        ],
        [
            "id" => "reg-sapphire",
            "name" => "All Infinite Product Set",
            "tier" => "SAPPHIRE",
            "price" => "₱125,000",
            "worth" => "₱150,200",
            "img" => "./assets/image/badge/Sapphire_logo.png",
            "inclusions" => ["24 INFINITE ROBUSTUS", "12 INFINITE BARLEY", "30 INFINITE WHITEPLUS Glutathione", "32 INFINITE GLOW UP Soap", "32 INFINITE DEOWHITE Soap", "32 INFINITE BOTOX Serum", "32 INFINITE BRIGHTENING Serum", "17 INFINITE WHITE Body Lotion", "Potential Income: Up to ₱150,000 / Week"],
            "recommended" => false
        ],
        [
            "id" => "reg-diamond",
            "name" => "All Infinite Product Set",
            "tier" => "DIAMOND",
            "price" => "₱198,800",
            "worth" => "₱250,600",
            "img" => "./assets/image/badge/Diamond_logo.png",
            "inclusions" => ["40 INFINITE ROBUSTUS", "20 INFINITE BARLEY", "50 INFINITE WHITEPLUS Glutathione", "54 INFINITE GLOW UP Soap", "54 INFINITE DEOWHITE Soap", "54 INFINITE BOTOX Serum", "54 INFINITE BRIGHTENING Serum", "27 INFINITE WHITE Body Lotion", "Potential Income: Up to ₱200,000 / Week"],
            "recommended" => false
        ]
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Join Community | Infinite Live Limitless</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./assets/css/styles.css" />
    
    <link rel="stylesheet" href="./assets/css/join-community.css" />
</head>

<body>
<nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style="background-color: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px);">
        <div class="container">
            <a class="text-logo mx-auto" href="index.php" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;">
                <span style="color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 50px; font-weight: 900; line-height: 0.8; letter-spacing: 1.5px;">INFINITE</span>
                <span style="color: var(--ch-teal); font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; margin-top: 1.5px;">LIVE LIMITLESS</span>
            </a>
            <div class="d-flex align-items-center gap-3 order-lg-3">
                <a href="./login.php" class="btn-nav-order nav-link d-none d-lg-inline-flex">Login</a>
                <a href="./join-ph.php" class="btn-nav-order nav-link d-none d-lg-inline-flex" style="color: var(--ch-teal);">
                    Join Us <i class="bi bi-arrow-right"></i>
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-label="Toggle">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse order-lg-2" id="navMenu">
                <ul class="navbar-nav mx-auto gap-lg-1">
                    <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="index.php#features">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="index.php#menu">Products</a></li>
                    <li class="nav-item"><a class="nav-link" href="index.php#team">Team</a></li>
                    <li class="nav-item"><a class="nav-link" href="index.php#testimonials">Reviews</a></li>
                    <li class="nav-item"><a class="nav-link" href="index.php#contact">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="world-plan.php">World Plan</a></li>
                    <li class="nav-item d-lg-none"><a class="nav-link" href="./login.php">Login</a></li>
                    <li class="nav-item d-lg-none"><a class="nav-link" href="./join-ph.php">Join Us</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container pt-5 mt-5">
        <div class="alert alert-info text-center shadow-sm" style="border-radius: 1rem;">
            <i class="fas fa-globe-asia me-2"></i> You are joining from: <strong><?= $selectedCountry ?></strong>
        </div>
    </div>

    <section id="how-to-join" class="section-pad" style="background-color: var(--ch-bg-light);">
        <div class="container">
            <div class="text-center mb-5 reveal">
                <span class="section-tag">Join The Community</span>
                <h2 class="section-title">How to Become a <span class="highlight">Member</span></h2>
                <p class="text-muted mt-3 mx-auto" style="max-width: 600px; font-size: 1.1rem;">
                    Follow these simple steps to kickstart your journey with us.
                </p>
            </div>
            <div class="row g-4 position-relative justify-content-center">
                <div class="d-none d-lg-block position-absolute top-50 start-0 w-100" style="height: 2px; background: repeating-linear-gradient(to right, var(--ch-teal) 0, var(--ch-teal) 10px, transparent 10px, transparent 20px); transform: translateY(-50%); z-index: 0; opacity: 0.3;"></div>

                <?php foreach ($join_steps as $index => $step): ?>
                    <div class="col-md-6 col-lg-3 reveal position-relative z-1" style="transition-delay: <?= $index * 0.1 ?>s;">
                        <div class="card step-card h-100 text-center shadow-sm" style="background: #fff; border-radius: 1.5rem; padding: 2rem 1.5rem;">
                            <div class="mx-auto mb-4 position-relative" style="width: 70px; height: 70px; background: var(--ch-bg-light); border: 2px solid var(--ch-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="<?= $step['icon'] ?>" style="font-size: 1.8rem; color: var(--ch-dark-slate);"></i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill shadow-sm" style="background-color: var(--ch-dark-slate); font-size: 0.75rem; padding: 0.4em 0.6em;">
                                    <?= $step['step'] ?>
                                </span>
                            </div>
                            <h4 class="fw-bold mb-3" style="color: var(--ch-dark-slate); font-size: 1.2rem;"><?= $step['title'] ?></h4>
                            <p class="text-muted mb-0" style="font-size: 0.95rem; line-height: 1.6;">
                                <?= $step['desc'] ?>
                            </p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="package-options" class="section-pad bg-white">
        <div class="container">
            <div class="text-center mb-5 reveal">
                <span class="section-tag">Step 1</span>
                <h2 class="section-title">Select Package <span class="highlight">Option</span></h2>
                <p class="text-muted mt-3 mx-auto" style="max-width: 600px; font-size: 1.1rem;">
                    Before selecting your specific product sets, choose the business path that best suits your goals. Click on the card to select.
                </p>
            </div>

            <div class="row justify-content-center align-items-stretch g-4 mb-4">
                <div class="col-md-6 col-lg-5 reveal">
                    <div class="card h-100 shadow-sm option-card active-exec" id="btn-exec" onclick="togglePackage('executive')">
                        <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill shadow" style="background-color: var(--ch-teal); z-index: 10; padding: 0.5em 1.5em; font-size: 0.85rem; letter-spacing: 1px;"><i class="fa-solid fa-crown text-warning me-1"></i> RECOMMENDED</span>
                        <i class="fa-solid fa-circle-check active-check"></i>
                        <div class="card-body p-5 text-center d-flex flex-column">

                            <div class="mb-4 mt-2">
                                <i class="fa-solid fa-gem mb-3" style="font-size: 2.5rem; color: var(--ch-teal);"></i>
                                <h3 class="fw-bold" style="color: var(--ch-dark-slate);">Executive Package</h3>
                            </div>

                            <ul class="list-unstyled text-muted text-start mb-0 flex-grow-1" style="font-size: 1rem; line-height: 1.6;">
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span>Automatically receive an <strong>EXECUTIVE BADGE</strong>.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span><strong>OLAMOUR Premium Skincare Set</strong> Options.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span><strong>The Big Advantage:</strong> You can earn <strong>3%–19% rebates</strong> from all product and package purchases made by your entire team.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span><strong>Additional income </strong>opportunity.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span><strong>Full business </strong>benefits.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-5 reveal" style="transition-delay: 0.1s;">
                    <div class="card h-100 shadow-sm option-card" id="btn-reg" onclick="togglePackage('regular')">
                        <i class="fa-solid fa-circle-check active-check"></i>
                        <div class="card-body p-5 text-center d-flex flex-column">
                            <div class="mb-4 mt-2">
                                <i class="fa-solid fa-box mb-3" style="font-size: 2.5rem; color: var(--ch-slate-muted);"></i>
                                <h3 class="fw-bold" style="color: var(--ch-dark-slate);">Regular Package</h3>
                            </div>

                            <ul class="list-unstyled text-muted text-start mb-0 flex-grow-1" style="font-size: 1rem; line-height: 1.6;">
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span>The price is lower and comes with standard products.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1 fs-5"></i> <span>Same core earning opportunities.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-x-circle-fill text-danger me-3 mt-1 fs-5"></i> <span>Does <strong>not</strong> include the PREMIUM SKINCARE set.</span></li>
                                <li class="mb-3 d-flex align-items-start"><i class="bi bi-info-circle-fill text-primary me-3 mt-1 fs-5"></i> <span>All other earnings are the same, but you will <strong>not be eligible</strong> to earn the 3%–19% rebates from your team’s purchases unless you upgrade.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center reveal" style="transition-delay: 0.2s;">
                <div class="col-lg-10">
                    <div class="alert shadow-sm border-0 d-flex align-items-center p-4" style="background-color: var(--ch-bg-light); border-left: 5px solid var(--ch-teal) !important; border-radius: 1rem;">
                        <i class="fa-solid fa-circle-exclamation me-4" style="font-size: 2rem; color: var(--ch-teal);"></i>
                        <div style="font-size: 0.95rem; color: var(--ch-dark-slate); line-height: 1.5;">
                            <strong>Please Note:</strong> Once you upgrade from a Regular to an Executive package, the rebates are <strong>not retroactive</strong> for previous purchases and points already generated by your Executive members. It serves as an additional way for you to earn more income moving forward.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="tier-selection" class="section-pad pt-0 bg-white">
        <div class="container border-top pt-5">
            <div class="text-center mb-5 reveal">
                <span class="section-tag" id="dynamic-tier-tag">Step 2: Executive Package</span>
                <h2 class="section-title">Choose Your <span class="highlight">Starter Package</span></h2>
                <p class="text-muted mt-3 mx-auto" style="max-width: 600px; font-size: 1.1rem;">
                    Click on a package to view full details.
                </p>
            </div>

            <div class="row justify-content-center g-4 tiers-container active" id="tiers-executive">
                <?php foreach ($packages['executive'] as $pkg): ?>
                    <div class="col-6 col-md-4 col-lg-2 mx-lg-2" style="min-width: 200px;">
                        <div class="card h-100 text-center border shadow-sm package-card" data-bs-toggle="modal" data-bs-target="#modal-<?= $pkg['id'] ?>" style="border-radius: 1.2rem; cursor: pointer; position: relative; <?= $pkg['recommended'] ? 'border: 2px solid var(--ch-teal) !important;' : '' ?>">
                            <?php if ($pkg['recommended']): ?>
                                <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill shadow-sm" style="background-color: var(--ch-teal); z-index: 10; padding: 0.4em 1em; font-size: 0.75rem;">Top Pick</span>
                            <?php endif; ?>
                            <div class="card-body d-flex flex-column align-items-center p-3">
                                <img src="<?= $pkg['img'] ?>" alt="<?= $pkg['tier'] ?>" class="mb-3 mt-2" style="height: 60px; object-fit: contain; <?= $pkg['tier'] === 'GEM' ? 'transform: scale(1.4);' : '' ?>">
                                <h6 class="fw-bold text-dark mb-1" style="font-size: 1.1rem;"><?= $pkg['tier'] ?></h6>
                                <p class="text-muted mb-0" style="font-size: 0.8rem;">Click for details <i class="bi bi-arrow-up-right"></i></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="row justify-content-center g-4 tiers-container" id="tiers-regular">
                <?php foreach ($packages['regular'] as $pkg): ?>
                    <div class="col-6 col-md-4 col-lg-2 mx-lg-2" style="min-width: 200px;">
                        <div class="card h-100 text-center border shadow-sm package-card" data-bs-toggle="modal" data-bs-target="#modal-<?= $pkg['id'] ?>" style="border-radius: 1.2rem; cursor: pointer; position: relative; <?= $pkg['recommended'] ? 'border: 2px solid var(--ch-dark-slate) !important;' : '' ?>">
                            <?php if ($pkg['recommended']): ?>
                                <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill shadow-sm" style="background-color: var(--ch-dark-slate); z-index: 10; padding: 0.4em 1em; font-size: 0.75rem;">Top Pick</span>
                            <?php endif; ?>
                            <div class="card-body d-flex flex-column align-items-center p-3">
                                <img src="<?= $pkg['img'] ?>" alt="<?= $pkg['tier'] ?>" class="mb-3 mt-2" style="height: 60px; object-fit: contain; <?= $pkg['tier'] === 'GEM' ? 'transform: scale(1.4);' : '' ?>">
                                <h6 class="fw-bold text-dark mb-1" style="font-size: 1.1rem;"><?= $pkg['tier'] ?></h6>
                                <p class="text-muted mb-0" style="font-size: 0.8rem;">Click for details <i class="bi bi-arrow-up-right"></i></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

        </div>
    </section>

    <section id="png-earnings" class="section-pad position-relative" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); overflow: hidden;">
        <div class="position-absolute rounded-circle" style="width: 400px; height: 400px; background: rgba(20, 184, 166, 0.12); top: -100px; left: -100px; filter: blur(60px);"></div>
        <div class="position-absolute rounded-circle" style="width: 350px; height: 350px; background: rgba(15, 23, 42, 0.08); bottom: -100px; right: -50px; filter: blur(50px);"></div>

        <div class="container position-relative z-1">
            <div class="text-center mb-5 reveal">
                <span class="section-tag">A Business Platform for Aspiring Global Entrepreneurs</span>
                <h2 class="section-title">Philippines <span class="highlight">Business Plan</span></h2>
                <p class="text-muted mt-3 mx-auto" style="max-width: 600px; font-size: 1.1rem;">
                    Discover tailored strategies, local compensation structures, and how you can establish a limitless business within the Philippines.
                </p>
            </div>

            <div class="row g-5 align-items-start">
                <div class="col-lg-6 reveal">
                    <div class="glass-panel p-4 p-md-5 h-100">
                        <h4 class="fw-bold mb-4" style="color: var(--ch-dark-slate);"><i class="fa-solid fa-chart-pie me-2" style="color: var(--ch-teal);"></i> Ways To Earn </h4>
                        <span>Explore the rewards, bonuses, and income opportunities available through INFINITE.<br></span></li>
                        <div class="accordion glass-accordion" id="accordionPNG">

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        <i class="fa-solid fa-cart-shopping me-3" style="color: var(--ch-teal);"></i> 1. Product Sales
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        You earn a <strong>30% retail profit</strong> on every product you sell. There are no requirements and no monthly quotas.
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                        <i class="fa-solid fa-users-rays me-3" style="color: var(--ch-teal);"></i> 2. Enroller Bonus
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        You earn an Enroller Commission every time someone you personally introduce purchases a Wholesale Package.<br><br>
                                        When they register, the company provides them with a FREE INFINITE Online Account, and you receive a commission based on the package they choose:
                                        <ul class="mt-3 mb-0 list-unstyled">
                                            <li><i class="bi bi-dot"></i> Gem: <strong>₱500</strong></li>
                                            <li><i class="bi bi-dot"></i> Emerald: <strong>₱1,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Pearl: <strong>₱2,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Ruby: <strong>₱5,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Sapphire: <strong>₱10,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Diamond: <strong>₱25,000</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                        <i class="fa-solid fa-layer-group me-3" style="color: var(--ch-teal);"></i> 3. Sales Match Bonus
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        You will build two sales teams — a Left Team and a Right Team. Whenever someone on both sides purchases a Wholesale Package, the company matches the points and rewards you with an additional Sales Match Bonus on top of your direct Enroller Commission.<br><br>
                                        <em>Example: If one member on your Left Team purchases a DIAMOND Package and another member on your Right Team also purchases a DIAMOND Package, you earn an additional <strong>₱10,000</strong> Match Bonus.</em><br><br>
                                        Even if they are not your direct referrals, as long as they are under your organization, you can still earn from their matched sales. You can monitor your growing team and earnings through your online account.

                                        <hr>
                                        <strong class="text-dark">Sales Match Bonus Rates:</strong>
                                        <ul class="mt-2 mb-3 list-unstyled">
                                            <li><i class="bi bi-dot"></i> Gem — <strong>₱500</strong></li>
                                            <li><i class="bi bi-dot"></i> Emerald — <strong>₱1,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Pearl — <strong>₱2,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Ruby — <strong>₱3,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Sapphire — <strong>₱8,000</strong></li>
                                            <li><i class="bi bi-dot"></i> Diamond — <strong>₱10,000</strong></li>
                                        </ul>

                                        <div class="alert p-3 mb-4" style="background-color: rgba(20, 184, 166, 0.1); border-left: 4px solid var(--ch-teal); border-radius: 0.5rem; font-size: 0.85rem;">
                                            <strong class="text-dark"><i class="fa-solid fa-circle-info me-1"></i> Important Note:</strong> Your Sales Match Bonus depends on the package level you registered with. For example, if you registered with an Emerald Package and your Left and Right teams both purchase Diamond Packages, your matching bonus will still be limited to the Emerald Match Bonus of ₱1,000, not ₱10,000. The higher your package, the higher the Sales Match Bonuses you unlock.
                                        </div>

                                        <strong class="text-dark">Passive & Residual Income:</strong><br>
                                        As your Left and Right teams continue growing their own businesses, you can continue earning from their activity while helping and guiding them to grow as well. By encouraging your team members to start building their own networks — even by simply referring at least 2 people — your organization can continue expanding and generating long-term residual income.<br><br>
                                        Because you are their leader and mentor, the company rewards your efforts in guiding, training, and supporting your organization. This allows you to benefit from your team’s success even when you are not directly involved in their daily sales.
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                        <i class="fa-solid fa-calendar-week me-3" style="color: var(--ch-teal);"></i> 4. Potential Weekly Income
                                    </button>
                                </h2>
                                <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        Your potential weekly income depends on the package level you choose and the growth of your sales organization.<br><br>
                                        As you continue building your Left and Right Teams, helping your members grow, and generating matched sales within your network, your earning potential can increase weekly through commissions and Sales Match Bonuses.

                                        <hr>
                                        <strong class="text-dark">Estimated Weekly Potential Income:</strong>
                                        <ul class="mt-2 mb-3 list-unstyled">
                                            <li><i class="bi bi-dot"></i> Gem — Earn Up to <strong>₱12,500 / Week</strong></li>
                                            <li><i class="bi bi-dot"></i> Emerald — Earn Up to <strong>₱30,000 / Week</strong></li>
                                            <li><i class="bi bi-dot"></i> Pearl — Earn Up to <strong>₱50,000 / Week</strong></li>
                                            <li><i class="bi bi-dot"></i> Ruby — Earn Up to <strong>₱90,000 / Week</strong></li>
                                            <li><i class="bi bi-dot"></i> Sapphire — Earn Up to <strong>₱150,000 / Week</strong></li>
                                            <li><i class="bi bi-dot"></i> Diamond — Earn Up to <strong>₱200,000 / Week</strong></li>
                                        </ul>
                                        <em>Your income results will depend on your personal effort, team activity, leadership, and overall business performance. The higher the package, the greater the earning potential and bonus opportunities available.</em>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                                        <i class="fa-solid fa-money-bill-wave me-3" style="color: var(--ch-teal);"></i> 5. Cash Bonus Incentives
                                    </button>
                                </h2>
                                <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        Earn extra cash bonuses from <strong>₱10,000 UP TO ₱200,000</strong> with INFINITE! Your bonus qualification depends on the package level you started with.

                                        <hr>
                                        <strong class="text-dark">Qualification Requirements:</strong>
                                        <ul class="mt-2 mb-3 list-unstyled">
                                            <li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2"></i> Sign up 6 Pearl Packages — Earn <strong>₱10,000</strong></li>
                                            <li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2"></i> Sign up 5 Ruby Packages — Earn <strong>₱50,000</strong></li>
                                            <li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2"></i> Sign up 4 Sapphire Packages — Earn <strong>₱100,000</strong></li>
                                            <li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2"></i> Sign up 4 Diamond Packages — Earn <strong>₱200,000</strong></li>
                                        </ul>

                                        <strong class="text-dark">Cut-Off Schedule:</strong>
                                        <ul class="mt-2 mb-3 list-unstyled">
                                            <li><i class="bi bi-calendar3 me-2"></i> <strong>1st Cut-Off:</strong> Every 1st–15th of the month</li>
                                            <li><i class="bi bi-calendar3 me-2"></i> <strong>2nd Cut-Off:</strong> Every 16th–31st of the month</li>
                                        </ul>

                                        <div class="alert p-3 mb-4" style="background-color: rgba(20, 184, 166, 0.1); border-left: 4px solid var(--ch-teal); border-radius: 0.5rem; font-size: 0.85rem;">
                                            <strong class="text-dark"><i class="fa-solid fa-circle-info me-1"></i> Important Note:</strong> These Cash Bonus Incentives do not yet include the Enroller Bonuses and Sales Match Bonuses you can also earn from signing up those members. This means you can earn from multiple income streams at the same time.
                                        </div>

                                        <hr>
                                        <strong class="text-dark">Example Computation — 4 Diamond Packages:</strong>
                                        <ul class="mt-2 mb-3 list-unstyled p-3 bg-white rounded shadow-sm border">
                                            <li class="mb-2 d-flex justify-content-between"><span>Enroller Bonus (₱25,000 × 4)</span> <strong>₱100,000</strong></li>
                                            <li class="mb-2 d-flex justify-content-between"><span>Sales Match Bonus (₱10,000 × 4)</span> <strong>₱40,000</strong></li>
                                            <li class="mb-3 d-flex justify-content-between text-success"><span>Cash Bonus Incentive</span> <strong>₱200,000</strong></li>
                                            <li class="pt-2 border-top d-flex justify-content-between align-items-center"><strong class="text-dark">Total Potential Income</strong> <strong class="fs-5 text-dark">₱340,000</strong></li>
                                        </ul>
                                        <em>The higher your package and the stronger your team grows, the bigger the bonuses and income opportunities you can unlock with INFINITE.</em>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix">
                                        <i class="fa-solid fa-crown me-3" style="color: var(--ch-teal);"></i> 6. INFINITE Bonus
                                    </button>
                                </h2>
                                <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        Earn every time your direct leaders earn. The INFINITE Bonus rewards you with a percentage of your direct leaders’ monthly income based on the package level you started with.

                                        <hr>
                                        <strong class="text-dark">INFINITE Bonus Rates:</strong>
                                        <div class="d-flex flex-wrap gap-2 mt-2 mb-4">
                                            <span class="badge bg-light text-dark border p-2">Emerald: 10%</span>
                                            <span class="badge bg-light text-dark border p-2">Pearl: 15%</span>
                                            <span class="badge bg-light text-dark border p-2">Ruby: 20%</span>
                                            <span class="badge bg-light text-dark border p-2">Sapphire: 25%</span>
                                            <span class="badge bg-light text-dark border p-2">Diamond: 30%</span>
                                        </div>

                                        <strong class="text-dark">Example Computation:</strong><br>
                                        If a direct leader earns ₱100,000 and you’re a Diamond, you get 30% = <strong>₱30,000</strong>.<br><br>
                                        With 10 leaders earning ₱100,000 each, that’s <strong>₱300,000/month</strong> — just from the INFINITY BONUS alone!

                                        <hr>
                                        <strong class="text-dark">Unlimited Growth Potential:</strong><br>
                                        There is no cap and no limit on how many leaders you can develop. As their income grows, yours grows automatically. This is where real leverage and long-term wealth begin. 💎🔥<br><br>
                                        <em>This income depends on the earnings and performance of your direct leaders, which is why leadership, mentorship, and team support are key to building long-term residual income and financial growth.</em>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven">
                                        <i class="fa-solid fa-calendar-week me-3" style="color: var(--ch-teal);"></i> 7. Executive Level Bonus
                                    </button>
                                </h2>
                                <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionPNG">
                                    <div class="accordion-body text-muted">
                                        Earn rebates ranging from 3% to 19% based on your Executive Rank.<br><br>
                                        This bonus is generated through your team's combined product and package sales, making it a true group performance incentives. 

                                        <hr>
                                        <strong class="text-dark">Executive Rank Rebates:</strong>
                                        <ul class="mt-2 mb-3 list-unstyled">
                                            <li><i class="bi bi-dot"></i> 3% <strong>Executive Rank</strong></li>
                                            <li><i class="bi bi-dot"></i> 6% <strong>1 Star Executive (50,000 pts)</strong></li>
                                            <li><i class="bi bi-dot"></i> 9% <strong>2 Star Executive (150,000 pts)</strong></li>
                                            <li><i class="bi bi-dot"></i> 14% <strong>3 Star Executive (450,000 pts)</strong></li>
                                            <li><i class="bi bi-dot"></i> 19% <strong>Managing Executive (1,000,000 pts)</strong></li>
                                        </ul>

                                        <div class="alert p-3 mb-4" style="background-color: rgba(20, 184, 166, 0.1); border-left: 4px solid var(--ch-teal); border-radius: 0.5rem; font-size: 0.85rem;">
                                            <strong class="text-dark"><i class="fa-solid fa-circle-info me-1"></i> Important Note:</strong> Exclusive earnings available only to Executive Members.
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-lg-6 reveal" style="transition-delay: 0.2s;">
                    <div class="glass-panel p-4 p-md-5 mb-4 shadow-sm">
                        <h4 class="fw-bold mb-3" style="color: var(--ch-dark-slate);"><i class="fa-solid fa-list-check me-2" style="color: var(--ch-teal);"></i> Process of Registration</h4>
                        <ol class="text-muted mb-0 ps-3" style="font-size: 0.95rem; line-height: 1.7;">
                            <li class="mb-2"><strong>Choose Your Package:</strong> Select the option that fits your budget. Includes products and a free lifetime INFINITE account.</li>
                            <li class="mb-2"><strong>Submit Your Information:</strong> Register your official details.</li>
                            <li class="mb-2"><strong>Make Your Payment:</strong> Pay through our gateway using Debit/Credit Card, Western Union, MoneyGram, or Internet Banking.</li>
                            <li class="mb-0"><strong>Receive Products via DHL:</strong> Delivery typically takes 3 to 7 business days (Delivery charges may apply).</li>
                        </ol>
                    </div>

                    <div class="bg-white p-4 rounded-4 shadow-sm border mb-4">
                        <h5 class="fw-bold mb-3" style="color: var(--ch-dark-slate);">⭐ Member Benefits</h5>
                        <ul class="list-unstyled text-muted mb-0" style="font-size: 0.95rem; line-height: 1.6;">
                            <li class="mb-2 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1"></i> <span><strong>30% Discount</strong> on all INFINITE Products.</span></li>
                            <li class="mb-2 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1"></i> <span><strong>Instant Value:</strong> Product package value is higher than your investment.</span></li>
                            <li class="mb-2 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1"></i> <span><strong>Personal Online Dashboard:</strong> Monitor sales, team growth, and commissions in real time.</span></li>
                            <li class="mb-2 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1"></i> <span><strong>Travel & Rewards:</strong> Qualify for local/international travel and leadership incentives.</span></li>
                            <li class="mb-0 d-flex align-items-start"><i class="bi bi-check-circle-fill text-success me-3 mt-1"></i> <span><strong>Mentorship:</strong> Access online trainings, webinars, and coaching.</span></li>
                        </ul>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="bg-white p-4 rounded-4 shadow-sm border h-100">
                                <h6 class="fw-bold" style="color: var(--ch-dark-slate);"><i class="fa-solid fa-graduation-cap text-primary me-2"></i> Training & Support</h6>
                                <p class="text-muted mb-0" style="font-size: 0.85rem;">Access WhatsApp groups, books, and modules for personal development and product info. Receive personal guidance throughout your journey.</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="bg-white p-4 rounded-4 shadow-sm border h-100">
                                <h6 class="fw-bold" style="color: var(--ch-dark-slate);"><i class="fa-solid fa-building-columns text-success me-2"></i> Encashment & Policy</h6>
                                <p class="text-muted mb-0" style="font-size: 0.85rem;">Encashment can be done through <strong>Telegraphic Transfer (TT)</strong> via your online account. Earnings are converted and deposited directly into your personal bank account.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center mt-5 reveal" style="transition-delay: 0.3s;">
    <div class="col-lg-10">
        <div class="alert shadow-sm border-0 d-flex flex-column flex-md-row align-items-center p-4 text-center text-md-start" style="background: linear-gradient(135deg, var(--ch-dark-slate) 0%, #1e293b 100%); border-radius: 1.5rem;">
            <i class="fa-solid fa-plane-departure mb-3 mb-md-0 me-md-4" style="font-size: 3rem; color: var(--ch-teal);"></i>
            <div>
                <h4 class="fw-bold text-white mb-2">
                    INFINITE Executive Program
                </h4>
                <p class="mb-0"
                   style="color: rgba(255, 255, 255, 0.85); font-size: 0.95rem; line-height: 1.6;">
                    The INFINITE Executive Program rewards your leadership and results with powerful incentives like <strong style="color: var(--ch-teal);"> FREE latest gadgets </strong>, a <strong style="color: var(--ch-teal);"> FREE Europe trip </strong> (all expenses paid), and even a <strong style="color: var(--ch-teal);"> FREE car </strong> —built for those ready to win bigger.
                </p>
            </div>
        </div>
    </div>
</div>

            <div class="row justify-content-center mt-5 reveal" style="transition-delay: 0.4s;">
                <div class="col-lg-8 text-center">
                    <h3 class="fw-bold mb-3" style="color: var(--ch-dark-slate);">Ready to Start Your Journey?</h3>
                    <p class="text-muted mb-4" style="font-size: 1.1rem;">Fill out our pre-registration form to secure your package and position in our growing global community.</p>
                    <a href="world-plan.php#register-world-account" class="btn text-white px-5 py-3 shadow-sm fw-bold" style="background-color: var(--ch-teal); border-radius: 2rem; font-size: 1.1rem; text-decoration: none;">
                        <i class="fa-solid fa-file-signature me-2"></i> Start Pre-Registration
                    </a>
                </div>
            </div>

        </div>
    </section>

    <footer id="contact" style="background: var(--ch-dark-slate, #0f172a); padding-top: 5rem; padding-bottom: 2rem;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center g-5 align-items-center">
                <div class="col-12 col-lg-5 col-xl-4 text-center text-lg-start">
                    <div class="footer-brand mb-3" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 50px); color: #fff; letter-spacing: 2px;">INFINITE<span style="color: var(--ch-teal);">.</span></div>
                    <p class="mb-4" style="color: var(--ch-slate-muted); font-size: 1.1rem;">Empowering Global Entrepreneurs Through Premium Skincare & Wellness</p>
                    <div class="d-flex justify-content-center justify-content-lg-start gap-3 mb-5">
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-tiktok"></i></a>
                        <a href="#" class="social-btn" style="width: 38px; height: 38px; border-radius: 0.6rem; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: all 0.2s;"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>

                <div class="col-12 col-lg-6 col-xl-5 offset-xl-1">
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

            <hr class="mt-5" style="border-color: rgba(148, 163, 184, 0.22);"/>
            <div class="row align-items-center pb-2 text-center text-md-start" style="color: #94a3b8; font-size: 0.85rem;">
                <div class="col-12 col-md-6 mb-2 mb-md-0">&copy; <?= date('Y') ?> Infinite. All rights reserved.</div>
                
                <div class="col-12 col-md-6 text-md-end">
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

    <?php
    $all_packages = array_merge($packages['executive'], $packages['regular']);
    foreach ($all_packages as $pkg):
        $isExec = strpos($pkg['id'], 'exec') !== false;
    ?>
        <div class="modal fade" id="modal-<?= $pkg['id'] ?>" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="border-radius: 1.5rem;">
                    <div class="modal-header border-0 pb-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center pt-0 px-4 pb-5">
                        <img src="<?= $pkg['img'] ?>" alt="<?= $pkg['tier'] ?>" style="height: 90px; object-fit: contain; margin-bottom: 1rem; <?= $pkg['tier'] === 'GEM' ? 'transform: scale(1.4);' : '' ?>">
                        <h4 class="fw-bold mb-0 text-dark"><?= $pkg['name'] ?></h4>
                        <h5 class="text-muted mb-4">(<?= $pkg['tier'] ?>)</h5>

                        <h2 class="fw-bold mb-2" style="color: <?= $isExec ? 'var(--ch-teal)' : 'var(--ch-dark-slate)' ?>;"><?= $pkg['price'] ?></h2>
                        <div class="badge mb-4 p-2 px-3 shadow-sm" style="background-color: var(--ch-dark-slate); color: #fff; font-size: 0.95rem; border-radius: 0.5rem;">
                            Total Product Worth: <span style="color: var(--ch-teal);"><?= $pkg['worth'] ?></span>
                        </div>

                        <div class="modal-package-details text-start p-4 mb-4 shadow-sm">
                            <h6 class="fw-bold mb-3" style="color: var(--ch-dark-slate);"><i class="bi bi-box-seam me-2" style="color: var(--ch-teal);"></i>Package Inclusions:</h6>
                            <ul class="list-unstyled text-muted mb-0" style="font-size: 0.95rem;">
                                <?php foreach ($pkg['inclusions'] as $inc): ?>
                                    <li class="mb-2 d-flex align-items-center">
                                        <i class="bi bi-check-circle-fill text-success me-3"></i><?= $inc ?>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>

                        <button class="btn text-white w-100 py-3 fw-bold shadow-sm" style="background-color: var(--ch-teal); border-radius: 0.75rem; font-size: 1.1rem;" data-bs-dismiss="modal"> Ok, Got It! </button>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/script.js"></script>
    <script src="assets/js/main.js?v=<?php echo time(); ?>"></script>

    <script src="./assets/js/join-community.js"></script>
</body>
</html>