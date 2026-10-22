<?php
session_start();
require_once 'public_auth_guard.php';

// Updated to use your actual transparent PNG product photos from the menu section
$testimonials = [
    [
        'brand' => "VIDA SKIN",
        'before_img' => './assets/image/testimony/before(1).jpeg',
        'after_img' => './assets/image/testimony/after(1).jpeg',
        'product_img' => './assets/image/testimony/100.png',
        'product_name' => 'VIDA SET',
        'product_desc' => 'Lightweight, hydrating sun protection with natural mineral powders and brightening ingredients.'
    ],
    [
        'brand' => "INFINITE",
        'before_img' => './assets/image/testimony/before(2).jpeg',
        'after_img' => './assets/image/testimony/after(2).jpeg',
        'product_img' => './assets/image/testimony/101.png',
        'product_name' => 'INFINITE DEOWHITE SOAP AND INFINITE BODY LOTION',
        'product_desc' => 'Achieve brighter, clearer skin with Rose Water, Niacinamide, and Vitamin C for a luminous glow.'
    ],
    [
        'brand' => "INFINITE",
        'before_img' => './assets/image/testimony/before(3).jpeg',
        'after_img' => './assets/image/testimony/after(3).jpeg',
        'product_img' => './assets/image/testimony/102.png',
        'product_name' => "INFINITE GLOW UP SOAP AND BRIGHTENING SERUM",
        'product_desc' => 'A scientifically advanced multi-function Facial Essence designed to revitalize and improve skin clarity.'
    ]
];

// Team members array
$team_members = [
    [
        "image" => "./assets/image/team/Sir_Primo.png",
        "name" => "PRIMO ECALNE",
        "country" => "PHILIPPINES",
        'country_code' => 'ph',
        "whatsapp" => "+63 916 735 4749",
        "email" => "primoecalnejr@gmail.com"
    ],
    [
        "image" => "./assets/image/team/ma_am(2.png",
        "name" => "AERA CLARIDAD",
        "country" => "PHILIPPINES",
        'country_code' => 'ph',
        "whatsapp" => "+63 915 1988 522",
        "email" => "aeraclaridad0809@gmail.com"
    ],
    [
        "image" => "./assets/image/team/team33.png",
        "name" => "SPHOSETHU MABUDLE",
        "country" => "DURBAN SOUTH AFRICA",
        'country_code' => 'sa',
        "whatsapp" => "+27 73 046 9892",
        "email" => "smabudle@gmail.com"
    ],
    [
        "image" => "./assets/image/team/team(4).png",
        "name" => "SOUN SOUN LUC GEORGES",
        "country" => "CAMEROON",
        'country_code' => 'cameroon',
        "whatsapp" => "+237 699 88 78 97",
        "email" => "sounlucgeorges@yahoo.fr"
    ],
    /*
    [
        "image" => "./assets/image/team/team5.png",
        "name" => "TONIA NATTO",
        "country" => "PAPUA NEW GUINEA",
        'country_code' => 'pp',
        "whatsapp" => "+675 7917 3225",
        "email" => "tonianatto11@gmail.com"
    ],
    */
    [
        "image" => "./assets/image/team/team6.2.png",
        "name" => "KYASIIMIRE PENNINAH ",
        "country" => "UGANDA",
        'country_code' => 'ug',
        "whatsapp" => "+256-779674736",
        "email" => "kyasiimire29@gmail.com"
    ],
    /*
    [
        "image" => "./assets/image/team/team8.png",
        "name" => "LYDIA EREMAS ",
        "country" => "LIHIR, PAPUA NEW GUINEA",
        'country_code' => 'PP',
        "whatsapp" => "+675 7365 7144",
        "email" => "eremaslydia26@gmail.com"
    ]
    */
];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, shrink-to-fit=no" />
    <title>Infinite | Live Limitless</title>
    <link rel="icon" href="./assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Great+Vibes&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="./assets/css/styles.css" />
    <link rel="stylesheet" href="./assets/css/index.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />

    <link rel="stylesheet" href="style.css?v=5">

    
</head>

<body class="is-loading">

    <!-- PRELOADER START -->
    <div id="infinite-preloader">
        <div class="preloader-content">
            <span class="preloader-brand">INFINITE</span>
            <span class="preloader-slogan">LIVE LIMITLESS</span>
            <div class="preloader-line"></div>
        </div>
    </div>
    <!-- PRELOADER END -->

    <?php include 'header.php'; ?>

    <section id="hero" style="position: relative; overflow: hidden; padding-top: 160px; padding-bottom: 100px;">
        <div class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('./assets/image/bg/office.jpg') center center / cover no-repeat; z-index: 0;">
            <div class="hero-grid-lines"></div>
        </div>

        <div class="container-fluid px-3 px-lg-5 hero-content reveal visible" style="position: relative; z-index: 1;">
            <div class="row justify-content-center">
                <div class="col-lg-11 col-xl-10 text-center">
                    <div class="hero-eyebrow justify-content-center mx-auto mb-3">
                        <span class="dot"></span>WELCOME TO
                    </div>

                    <h1 class="hero-title">
                        <span class="bold">INFINITE</span>
                        <span class="elegant-cursive blinking-cursor" id="typewriter-text"></span>
                    </h1>

                    <p class="hero-desc mx-auto text-white mt-4" style="max-width:800px; opacity: 0.9;">
                        Building limitless opportunities through leadership, premium products, and global expansion.
                    </p>
                    <a href="./join-ph.php" class="btn btn-outline-light mt-4 fw-bold px-4 py-2" style="border-radius: 50px;">
                        <i class="bi bi-play-circle me-2"><b></i> Learn More
                    </a></b>


                    <br><br>
                    <br><br>

                    <div class="container text-center mb-5 reveal">

                        <span class="section-tag">
                            GLOBAL EXPANSION
                        </span>

                        <h2 class="section-title1 fw-bold">
                            Growing Across The
                            <span style="color: var(--ch-teal);">
                                World
                            </span>
                        </h2>

                        <p class="hero-desc mx-auto text-white mt-4 px-3">
                            Connecting opportunities and leaders worldwide.
                        </p>

                    </div>

                    <div class="country-scroll-wrapper">
                        <div class="country-scroll-track">
                            <div class="country-card" data-country="COTE D'IVOIRE">
                                <img src="./assets/image/flags/cote.png" alt="COTE D'IVOIRE">
                            </div>
                            <div class="country-card" data-country="CAMEROON">
                                <img src="./assets/image/flags/cameroon.png" alt="CAMEROON">
                            </div>
                            <div class="country-card" data-country="DEMOCRATIC REPUBLIC OF CONGO">
                                <img src="./assets/image/flags/dc.png" alt="DEMOCRATIC REPUBLIC OF CONGO">
                            </div>
                            <div class="country-card" data-country="PAPUA NEW GUINEA">
                                <img src="./assets/image/flags/pp.png" alt="PAPUA NEW GUINEA">
                            </div>
                            <div class="country-card" data-country="SOUTH AFRICA">
                                <img src="./assets/image/flags/sa.png" alt="SOUTH AFRICA">
                            </div>
                            <div class="country-card" data-country="TOGO">
                                <img src="./assets/image/flags/tg.png" alt="TOGO">
                            </div>
                            <div class="country-card" data-country="UGANDA">
                                <img src="./assets/image/flags/ug.png" alt="UGANDA">
                            </div>
                            <div class="country-card" data-country="COTE D'IVOIRE">
                                <img src="./assets/image/flags/cote.png" alt="COTE D'IVOIRE">
                            </div>
                            <div class="country-card" data-country="CAMEROON">
                                <img src="./assets/image/flags/cameroon.png" alt="CAMEROON">
                            </div>
                            <div class="country-card" data-country="DEMOCRATIC REPUBLIC OF CONGO">
                                <img src="./assets/image/flags/dc.png" alt="DEMOCRATIC REPUBLIC OF CONGO">
                            </div>
                            <div class="country-card" data-country="PAPUA NEW GUINEA">
                                <img src="./assets/image/flags/pp.png" alt="PAPUA NEW GUINEA">
                            </div>
                            <div class="country-card" data-country="SOUTH AFRICA">
                                <img src="./assets/image/flags/sa.png" alt="SOUTH AFRICA">
                            </div>
                            <div class="country-card" data-country="TOGO">
                                <img src="./assets/image/flags/tg.png" alt="TOGO">
                            </div>
                            <div class="country-card" data-country="UGANDA">
                                <img src="./assets/image/flags/ug.png" alt="UGANDA">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="features" class="section-pad">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row mb-5">
                <div class="col-lg-6 reveal">
                    <span class="section-tag">Why Infinite?</span>
                    <h2 class="section-title">"Build Your <span class="highlight">Future </span>Without Limits."</h2>
                </div>
                <div class="col-lg-6 reveal">
                    <p class="text-muted mt-3 mt-lg-4" style="font-size:1rem; max-width: 600px;">
                        We are currently in our pioneering stage giving early partners a powerful advantage as the company prepares for international expansion. INFINITE is built for leaders, visionaries, and entrepreneurs who want to grow with a company from its foundation stage.
                    </p>
                </div>
            </div>

            <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
                <div class="carousel-inner" style="border-radius: 1.5rem; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div class="carousel-item active"><img src="./assets/image/product1.png" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product2.png" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product3.png" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product4.png" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product5.png" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product6.jpeg" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product7.jpeg" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product8.jpeg" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product9.jpeg" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product10.jpeg" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product11.jpeg" class="d-block w-100" alt="..."></div>
                    <div class="carousel-item"><img src="./assets/image/product12.jpeg" class="d-block w-100" alt="..."></div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: rgba(0,0,0,0.5); border-radius: 50%;"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: rgba(0,0,0,0.5); border-radius: 50%;"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="row justify-content-center mt-5">
                <div class="col-xl-10 reveal">
                    <div class="text-center mb-5">
                        <span class="section-tag">Why Leaders Choose INFINITE?</span>
                    </div>
                    <div class="row g-4">
                        <div class="col-md-6 col-lg-3">
                            <div class="mission-item flex-column text-center p-4">
                                <div class="mission-icon mb-3 me-0"><i class="fa-solid fa-earth-americas"></i></div>
                                <div class="mission-text">Sustainable business opportunities</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="mission-item flex-column text-center p-4">
                                <div class="mission-icon mb-3 me-0"><i class="fa-solid fa-spa"></i></div>
                                <div class="mission-text">Premium skincare and wellness products</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="mission-item flex-column text-center p-4">
                                <div class="mission-icon mb-3 me-0"><i class="fa-solid fa-scale-balanced"></i></div>
                                <div class="mission-text">Ethical and transparent compensation programs</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="mission-item flex-column text-center p-4">
                                <div class="mission-icon mb-3 me-0"><i class="fa-solid fa-arrow-trend-up"></i></div>
                                <div class="mission-text">A platform for personal and financial growth</div>
                            </div>
                        </div>
                        <div class="col-12 reveal text-center mx-auto mt-5">
                            <a href="select-country.php" class="btn fw-bold px-5 py-3 shadow-sm" style="background-color: var(--ch-teal); color: #fff; border-radius: 50px;">Join now<i class="bi bi-arrow-down ms-2"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="menu" class="section-pad bg-light">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row align-items-end mb-5">
                <div class="col-md-6 reveal text-center text-md-start">
                    <span class="section-tag">Discover</span>
                    <h2 class="section-title">Our Products</h2>
                </div>
                <div class="col-md-6 reveal">
                    <div class="menu-filters justify-content-center justify-content-md-end mt-3 mt-md-0">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="wellness">Wellness</button>
                        <button class="filter-btn" data-filter="skincare">Skincare</button>
                        <button class="filter-btn" data-filter="o'lamour">O'Lamour</button>
                    </div>
                </div>
            </div>

            <div class="row g-4" id="menuGrid">
                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper">
                            <img src="./assets/image/product/INFINITE_BOTOX_SERUM.png" class="img-fluid" alt="Infinite Botox Serum">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Infinite Botox Serum</h5>
                            <p class="product-desc flex-grow-1">INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract.</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal" data-title="Infinite Botox Serum" data-img="./assets/image/product/INFINITE_BOTOX_SERUM.png" data-desc="INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract, and Sakura Extract. This unique formula mimics Botox effects without the needles, smoothing fine lines, wrinkles, and blemishes while deeply hydrating your skin. Perfect for a non-invasive, age- defying solution, it delivers a youthful, radiant glow with every use.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/INFINITE_Brightening_Serum.png" class="img-fluid" alt="INFINITE Brightening Serum">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">INFINITE Brightening Serum</h5>
                            <p class="product-desc flex-grow-1">Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="INFINITE Brightening Serum"
                                    data-img="./assets/image/product/INFINITE_Brightening_Serum.png"
                                    data-desc="Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract. This lightweight, glow-boosting formula hydrates, evens out skin tone, and combats blemishes, leaving your complexion refreshed and radiant. Say goodbye to dullness and hello to a youthful, luminous glow.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/INFINITE_White_Body_Lotion.png" class="img-fluid" alt="INFINITE White Body Lotion">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">INFINITE White Body Lotion</h5>
                            <p class="product-desc flex-grow-1">Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="INFINITE White Body Lotion"
                                    data-img="./assets/image/product/INFINITE_White_Body_Lotion.png"
                                    data-desc="Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin. Infused with AHA, Vitamin C, and Niacinamide, it fades dark spots, hyperpigmentation, and discoloration while promoting a radiant glow. This advanced lotion leaves your skin smoother, brighter, and more youthful, delivering visible results with every use.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/INFINITE_Glow_Up_Soap.png" class="img-fluid" alt="INFINITE Glow-Up Soap">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">INFINITE Glow-Up Soap</h5>
                            <p class="product-desc flex-grow-1">Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide. </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="INFINITE Glow-Up Soap"
                                    data-img="./assets/image/product/INFINITE_Glow_Up_Soap.png"
                                    data-desc="Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide. This powerful trio works together to brighten, even out your skin tone, and reduce dark spots and pigmentation. Perfect for tackling uneven skin tone and hyperpigmentation, it leaves your skin smoother, clearer, and radiant.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/INFINITE_Deowhite_Soap.png" class="img-fluid" alt="INFINITE Deowhite Soap">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">INFINITE Deowhite Soap</h5>
                            <p class="product-desc flex-grow-1">Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint. </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="INFINITE Deowhite Soap"
                                    data-img="./assets/image/product/INFINITE_Deowhite_Soap.png"
                                    data-desc="Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint. This all-natural soap cleanses, fights odor, and cools the skin, leaving you feeling fresh and invigorated. Ideal for daily use, it combines antibacterial properties, soothing benefits, and a refreshing sensation to keep you energized all day.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/Vida_Lotus_Soothing_Toner.png" class="img-fluid" alt="Vida Lotus Soothing Toner">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Vida Lotus Soothing Toner</h5>
                            <p class="product-desc flex-grow-1">Vida Skin Lotus Soothing Toner rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin.</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal" data-title="Vida Lotus Soothing Toner" data-img="./assets/image/product/Vida_Lotus_Soothing_Toner.png" data-desc="Rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin texture with its powerful moisturizing effect.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/Vida_Tone_Up_Sun Serum.png" class="img-fluid" alt="Vida Tone-Up Sun Serum">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Vida Tone-Up Sun Serum</h5>
                            <p class="product-desc flex-grow-1">Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="Vida Tone-Up Sun Serum"
                                    data-img="./assets/image/product/Vida_Tone_Up_Sun Serum.png"
                                    data-desc="Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients like niacinamide and glutathione. This serum helps even skin tone while delivering a radiant, glowing finish-perfect for daily wear.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/Vida_Doux_Cleanser.png" class="img-fluid" alt="Vida Doux Cleanser">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Vida Doux Cleanser</h5>
                            <p class="product-desc flex-grow-1">Vida Skin Doux Cleanser's fine bubble system removes excess sebum and other residues within the pores leaving</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="Vida Doux Cleanser"
                                    data-img="./assets/image/product/Vida_Doux_Cleanser.png"
                                    data-desc="Vida Skin Doux Cleanser's fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed and comfortable, yet not drying with powerful hydrating and calming properties.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/Vida_Skin_Lotus_Booster_Ampoule.png" class="img-fluid" alt="Vida Skin Lotus Booster Ampoule">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Vida Skin Lotus Booster Ampoule</h5>
                            <p class="product-desc flex-grow-1">Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="Vida Skin Lotus Booster Ampoule"
                                    data-img="./assets/image/product/Vida_Skin_Lotus_Booster_Ampoule.png"
                                    data-desc="Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening the skin barrier creating a firm and healthy skin.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="skincare">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/Vida_Skin_Glow_Vita_Cream.png" class="img-fluid" alt="Vida Skin Glow Vita Cream">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Vida Skin Glow Vita Cream</h5>
                            <p class="product-desc flex-grow-1">Vida Skin Glow Vita Cream uses VIDA's special formula to balance healthy skin oil and moisture levels, creating healthy</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="Vida Skin Glow Vita Cream"
                                    data-img="./assets/image/product/Vida_Skin_Glow_Vita_Cream.png"
                                    data-desc="Vida Skin Glow Vita Cream uses VIDA's special formula to balance healthy skin oil and moisture levels, creating healthy moisturized and vitalized skin conditions.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="wellness">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper">
                            <img src="./assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png" class="img-fluid" alt="Barley Pure">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">Barley Pure Organic Powder</h5>
                            <p class="product-desc flex-grow-1">A natural supplement made from 100% organic barley grass, rich in vitamins, minerals, and antioxidants.</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal" data-title="Barley Pure Organic Powder" data-img="./assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png" data-desc="A nutrient-rich superfood made from pure, organic young barley grass. Rich in antioxidants and fiber, INFINITE BARLEY supports immune health, aids digestion, promotes detoxification, and helps boost energy levels naturally.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="wellness">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png" class="img-fluid" alt="INFINITE Black Coffee with Pure Organic Barley Powdered Drink Mix">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">INFINITE Black Coffee with Pure Organic Barley Powdered </h5>
                            <p class="product-desc flex-grow-1">INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="INFINITE Black Coffee with Pure Organic Barley Powdered "
                                    data-img="./assets/image/product/INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png"
                                    data-desc="INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with natural stevia for a guilt-free boost. Designed to energize between flavor and function. Enjoy a cup that satisfies your craving and elevates your daily routine.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="wellness">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/White_Plus_Glutathione.png" class="img-fluid" alt="White Plus Glutathione">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">White Plus Glutathione</h5>
                            <p class="product-desc flex-grow-1">Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="White Plus Glutathione"
                                    data-img="./assets/image/product/White_Plus_Glutathione.png"
                                    data-desc="Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, N-Acetylcysteine, Vitamin C, Collagen, and Alpha Lipoic Acid. This potent supplement detoxifies your system, neutralizes free radicals, and supports overall wellness. Boost your health and vitality with every dose for a brighter, more energized you.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="o'lamour">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper">
                            <img src="./assets/image/product/O_LAMOUR_Facial_Essence.png" class="img-fluid" alt="O'Lamour Facial Essence">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">O'Lamour Facial Essence</h5>
                            <p class="product-desc flex-grow-1">A scientifically advanced multi-function Facial Essence designed to revitalize, and improve skin clarity.</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal" data-title="O'Lamour Facial Essence" data-img="./assets/image/product/O_LAMOUR_Facial_Essence.png" data-desc="Formulated with BIO E.G.F, it stimulates skin renewal. Hydrolyzed Collagen and Volufiline work in synergy and help to plump, firm and lift-the skin for a youthful complexion.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="o'lamour">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png" class="img-fluid" alt="O'Lamour Aeterna BB Cream">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">O'Lamour Aeterna BB Cream</h5>
                            <p class="product-desc flex-grow-1">A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="O'Lamour Aeterna BB Cream"
                                    data-img="./assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png"
                                    data-desc="A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel. Formulated with SPF 50 / PA+++ broad-spectrum protection, it shields the skin against UVA and UVB damage while preserving comfort and long-lasting wear throughtout the day.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="o'lamour">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/O’LAMOUR_Quintessence_Ampoule.png" class="img-fluid" alt="O'Lamour Quintessence Ampoule">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">O'Lamour Quintessence Ampoule</h5>
                            <p class="product-desc flex-grow-1">A premium multi-function skincare innvation expertly formulated to help reduce the apperance of wrinkles and </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="O'Lamour Quintessence Ampoule"
                                    data-img="./assets/image/product/O’LAMOUR_Quintessence_Ampoule.png"
                                    data-desc="A premium multi-function skincare innvation expertly formulated to help reduce the apperance of wrinkles and help brighten the skin. Powered by PDRN (Polydeoxyribonu-cleo-tide) Sodium DNA, a clinically recognized bioactive compound plus 12X plant-based essential extracts, this fast-acting ampoule works at the skin's foundational level to reveal a more radiant complexion.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="o'lamour">
                    <div class="product-card h-100 d-flex flex-column">
                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/O’LAMOUR_CoreLaCrème.png" class="img-fluid" alt="O'Lamour Core La Crème">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">O'Lamour Core La Crème</h5>
                            <p class="product-desc flex-grow-1">An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and Epidermal </p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="O'Lamour Core La Crème"
                                    data-img="./assets/image/product/O’LAMOUR_CoreLaCrème.png"
                                    data-desc="An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and Epidermal Growth Factor (EGF) for a youthful radiance. Infused with PDRN  Sodium DNA, Niacinamide, Euphorbia Cerifera, and Chamomilla Recutita, it deeply hydrates skin tone for a smoother, brighter complexion.">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-md-4 col-xl-3 menu-item reveal" data-category="o'lamour">
                    <div class="product-card h-100 d-flex flex-column position-relative">
                        <div class="position-absolute top-0 end-0 m-3 z-3">
                            <span class="badge rounded-pill" style="background-color: var(--ch-teal); color: #fff; font-family: 'Barlow', sans-serif; font-weight: 800; letter-spacing: 1.5px; padding: 0.6em 1.2em; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);">COMING SOON</span>
                        </div>

                        <div class="card-img-wrapper text-center">
                            <img src="./assets/image/product/O’LAMOUR_Essence_Bar.png" class="img-fluid" alt="O'Lamour Essence Bar">
                        </div>
                        <div class="card-body p-4 d-flex flex-column flex-grow-1">
                            <h5 class="product-title">O'Lamour Essence Bar</h5>
                            <p class="product-desc flex-grow-1">An exquisitely crafted cleansin bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin.</p>
                            <div class="product-footer mt-3">
                                <a href="javascript:void(0)" class="read-more-link" data-bs-toggle="modal" data-bs-target="#productModal"
                                    data-title="O'Lamour Essence Bar"
                                    data-img="./assets/image/product/O’LAMOUR_Essence_Bar.png"
                                    data-desc="An exquisitely crafted cleansin bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin. Glycolic and Lactic Acids refine texture and enhance luminosity, while Salicylic Acid puurifies pores for a smoother,cleaer apperance. ">
                                    Read More <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- UPDATED PRODUCT CATALOG BUTTON -->
                <div class="col-12 text-center mt-5 mb-3 reveal">
                    <a href="https://t.me/+alDRLOJNgo1lZGY1" class="btn shadow-sm" style="background-color: var(--ch-teal); color: var(--ch-white); border-radius: 50px; padding: 8px 24px; font-size: 0.9rem; font-weight: 600;">
                        <i class="bi bi-journal-text me-2"></i>View Product Catalog
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section id="team" class="section-pad">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center text-center mb-5 reveal">
                <div class="col-lg-8 col-xl-6">
                    <h2 class="section-title mb-3">Meet Our Global Partners</h2>
                    <p class="text-muted" style="font-size: 1.15rem;">
                        A global community of passionate individuals building opportunities, inspiring growth, and living limitless together.
                    </p>
                </div>
            </div>

            <div class="owl-carousel owl-theme team-carousel reveal">
                <?php foreach ($team_members as $member): ?>
                    <div class="item px-2">
                        <div class="card border-0 position-relative overflow-hidden shadow-sm" style="height: 650px; background: linear-gradient(135deg, #0f172a 0%, #14b8a6 100%);">

                            <img src="<?= htmlspecialchars($member['image']) ?>" class="team-img" alt="<?= htmlspecialchars($member['name']) ?>" style="width: 100%; height: 100%; object-fit: cover;">

                            <div class="position-absolute bottom-0 start-0 w-100 d-flex flex-column align-items-center justify-content-end pb-4" style="height: 70%; background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 100%); z-index: 2;">

                                <h3 class="text-white fw-medium mb-1 w-100 px-3" style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(2rem, 2.5vw, 2.8rem); letter-spacing: 1px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                    <?= htmlspecialchars($member['name']) ?>
                                </h3>

                                <div class="d-flex align-items-center mb-3 text-white">
                                    <img src="./assets/image/flags/<?= strtolower(htmlspecialchars($member['country_code'])) ?>.png" alt="Flag" style="width: 20px; height: 14px; margin-right: 8px; object-fit: cover; border-radius: 2px;">
                                    <b style="font-size: 0.95rem; letter-spacing: 1px; text-transform: uppercase;"><?= htmlspecialchars($member['country']) ?></b>
                                </div>

                                <div class="d-flex flex-column align-items-start justify-content-center px-4 py-3 shadow-sm hover-lift" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 1rem; width: 85%; transition: all 0.3s ease;">
                                    <p class="mb-2 w-100 text-truncate" style="color: var(--ch-white); font-size: 1rem;">
                                        <i class="bi bi-whatsapp me-2" style="color: #25D366;"></i> <?= htmlspecialchars($member['whatsapp']) ?>
                                    </p>
                                    <p class="mb-0 w-100 text-truncate" style="color: var(--ch-white); font-size: 1rem;">
                                        <i class="bi bi-envelope-fill me-2" style="color: var(--ch-teal);"></i> <?= htmlspecialchars($member['email']) ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- NEW CORPORATE/COMPANY INFO HERO SECTION -->
    <section class="corporate-hero-section">
        <div class="corporate-container">
            <div class="corporate-content">
                <span class="corporate-badge"><i class="fa-solid fa-building-shield me-2"></i>Company Profile</span>
                <h1 class="corporate-title">
                    Built on Trust.
                    <span class="gradient-text">Proven Excellence.</span>
                </h1>
                <h2 class="corporate-script">
                    Infinite Possibilities
                </h2>
                <p class="corporate-desc">
                    Discover the foundation of our success. Learn about our mission, explore our blogs, and verify our legitimacy as a globally recognized brand.
                </p>
                <a href="info.php" class="corporate-btn">
                    Read Our Story <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
            <div class="corporate-image-wrapper">
                <div class="corporate-glow-orb"></div>
                <div class="corporate-glass-panel"></div>
                <!-- Using an existing image asset for the company profile -->
                <img src="./assets/image/bg/office.jpg" alt="Company Profile and Legitimacy" class="corporate-img" style="object-fit: cover; aspect-ratio: 4/3;">
            </div>
        </div>
    </section>

    <section class="olamour-hero-section">
        <div class="olamour-container">
            <!-- Swapped order: Image Left, Text Right -->
            <div class="olamour-image-wrapper">
                <div class="olamour-glow-orb"></div>
                <div class="olamour-glass-panel"></div>
                <img src="./assets/image/banner(1).png" alt="Olamour Premium Skincare" class="olamour-img">
            </div>
            <div class="olamour-content">
                <span class="olamour-badge"><i class="fa-solid fa-sparkles me-2"></i>Premium Skincare</span>
                <h1 class="olamour-title">
                    Elevate Your Beauty with
                    <span class="gradient-text">O’LAMOUR Skincare</span>
                </h1>
                <h2 class="olamour-script">
                    Glow Beyond Limits
                </h2>
                <p class="olamour-desc">
                    Discover O’LAMOUR Premium Skincare — where science meets luxury for timeless beauty.
                </p>
                <a href="olamour.php" class="olamour-btn">
                    Explore O’LAMOUR <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>
    
    
    <section class="barley-hero-section">
        <div class="barley-container">
            <div class="barley-content">
                <span class="barley-badge"><i class="fa-solid fa-leaf me-2"></i>INFINITE Wellness</span>
                <h1 class="barley-title">
                    Live Well.
                    <span class="gradient-text">Glow Naturally.</span>
                </h1>
                <h2 class="barley-script">
                    Live With Strength
                </h2>
                <p class="barley-desc">
                    Unlock your ultimate wellness journey with premium health & beauty products designed for a better you.
                </p>
                <a href="barley.php" class="barley-btn">
                    Explore Infinite Barley <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
            <div class="barley-image-wrapper">
                <div class="barley-blob"></div>
                <img src="./assets/image/Barley.png" alt="Infinite Wellness" class="barley-img">
            </div>
        </div>
    </section>


    <section id="testimonials" class="section-pad" style="background-color: #f8fafc;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="text-center mb-5 reveal">
                <span class="section-tag">PRODUCTS TESTIMONY</span>
                <h2 class="section-title fw-bold">
                    Real Stories.
                    <span class="highlight">Real Growth.</span>
                    Real Partnerships.
                </h2>
                <p class="text-muted mt-3">
                    <b>See how our solutions are making a measurable difference.</b>
                </p>
            </div>

            <div class="row justify-content-center g-4 align-items-stretch">
                <?php foreach ($testimonials as $i => $t): ?>
                    <div class="col-md-6 col-lg-4 col-xl-4 reveal" style="transition-delay:<?= $i * 0.1 ?>s">
                        <div class="testimony-card text-center h-100">

                            <div class="app-style-header">
                                <div class="dots-wrapper">
                                    <span class="header-dot bg-danger"></span>
                                    <span class="header-dot bg-warning"></span>
                                    <span class="header-dot bg-success"></span>
                                </div>
                                <div class="header-text"><?= $t['brand'] ?></div>
                            </div>

                            <div class="testimony-images-grid">
                                <div class="before-after-wrapper">
                                    <div class="img-block before position-relative">
                                        <img src="<?= $t['before_img'] ?>" alt="Before">
                                        <span class="badge bg-dark position-absolute top-0 start-0 m-2 shadow-sm">BEFORE</span>
                                    </div>

                                    <div class="testimony-arrow">
                                        <i class="fa-solid fa-arrow-right-long" style="color: var(--ch-dark-slate); font-size: 1.1rem;"></i>
                                    </div>

                                    <div class="img-block after position-relative">
                                        <img src="<?= $t['after_img'] ?>" alt="After">
                                        <span class="badge bg-success position-absolute top-0 start-0 m-2 shadow-sm">AFTER <i class="fa-solid fa-heart ms-1 text-white"></i></span>
                                    </div>
                                </div>
                            </div>

                            <div class="testimony-product-info">
                                <div class="testimony-product-img-wrapper">
                                    <img src="<?= $t['product_img'] ?>" alt="Product">
                                </div>
                                <h4 class="product-name"><?= $t['product_name'] ?></h4>
                                <p class="product-desc"><?= $t['product_desc'] ?></p>
                            </div>

                        </div>
                    </div>
                <?php endforeach; ?>

                <!-- LOWER REVIEW CARDS -->
                <div class="row g-4 mt-5 justify-content-center">

                    <?php
                    $reviews = [
                        [
                            "name" => "WILMA BOHAGE",
                            "loc" => "Papua New Guinea",
                            "image" => "./assets/image/wilma.png",
                            "text" => "From the very first try, my energy skyrocketed to levels I’ve never felt before! No more sluggish mornings, no more achy muscles — just pure vitality that lasts all day. INFINITE ROBUSTUS gave me my energy back, and the feeling is nothing short of miraculous!"
                        ],
                        [
                            "name" => "BILLIE MICHAEL",
                            "loc" => "Papua New Guinea",
                            "image" => "./assets/image/billie.png",
                            "text" => "INFINITE Robustus coffee and INFINITE barley changed my life! I lost belly fat, normalized my cholesterol, and gained control over hypertension. Even at 85kg, I feel lighter, healthier, and more active — climbing ladders with ease and sleeping comfortably again. Truly thankful for these positive changes!"
                        ],
                        [
                            "name" => "RAVELYN RIVERA",
                            "loc" => "Philippines",
                            "image" => "./assets/image/ravelyn.png",
                            "text" => "INFINITE Barley is so magical for me. Last week I had a severe cough and asthma. I took so many medicine and antibiotics as well. I said, 'I have barley in my products, why not I take it?' When I drink the barley, and after 1 minute my severe cough and asthma is gone."
                        ]
                    ];

                    foreach ($reviews as $review):
                    ?>

                        <div class="col-12 col-md-6 col-xl-4 reveal">

                            <div class="review-card h-100">

                                <div class="stars mb-3">
                                    ★★★★★
                                </div>

                                <p class="review-text">
                                    "<?= $review['text']; ?>"
                                </p>

                                <div class="review-user">

                                    <div class="review-avatar">
                                        <img src="<?= $review['image']; ?>" alt="<?= $review['name']; ?>">
                                    </div>

                                    <div>
                                        <div class="review-name">
                                            <?= $review['name']; ?>
                                        </div>

                                        <div class="review-location">
                                            <i class="bi bi-geo-alt-fill"></i>
                                            <?= $review['loc']; ?>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    <?php endforeach; ?>

                </div>
                <div class="col-12 text-center mt-5 reveal">
                    <p class="text-muted mx-auto" style="max-width: 800px; font-size: 1rem;">
                        <b><i>
                                "Transformation is a deeply personal experience, and here, we celebrate the milestones of our community. <br class="d-none d-md-block">
                                This gallery highlights the intersection of self-care and tangible change, showcasing how our solutions empower individuals to look and feel their best."
                            </i></b>
                    </p>
                </div>

            </div>
        </div>
    </section>

    <footer id="contact" style="background: var(--ch-dark-slate); padding-top: 80px;">
        <div class="container-fluid px-3 px-lg-5">
            <div class="row justify-content-center g-5 align-items-center">
                <div class="col-lg-5 col-xl-4 reveal text-center text-lg-start">
                    <div class="mb-3" style="color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 50px; letter-spacing: 2px;">INFINITE<span style="color: var(--ch-teal);">.</span></div>
                    <p class="mb-4" style="color: var(--ch-slate-muted); font-size: 1.1rem;">Empowering Global Entrepreneurs Through Premium Skincare & Wellness</p>
                    <div class="d-flex justify-content-center justify-content-lg-start gap-3 mb-5">
                        <a href="" class="text-white fs-4"><i class="bi bi-facebook"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-instagram"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-tiktok"></i></a>
                        <a href="" class="text-white fs-4"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>

                <div class="col-lg-6 col-xl-5 offset-xl-1 reveal">
                    <div class="bg-white rounded-4 p-4 p-md-5 shadow">
                        <h3 class="fw-bold mb-2" style="color:var(--ch-dark-slate);">Send Us a Message</h3>
                        <p class="text-muted mb-4 small">We respond within 2-3 business days.</p>

                        <!-- Form Alert Box -->
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

    <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 1.5rem; overflow: hidden;">
                <button type="button" class="btn-close position-absolute top-0 end-0 m-3 bg-white" data-bs-dismiss="modal" style="z-index: 10; padding: 0.6rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); cursor: pointer;"></button>
                <div class="row g-0">
                    <div class="col-md-5 bg-light d-flex align-items-center justify-content-center p-4">
                        <img src="" id="modalImg" class="img-fluid" style="max-height: 40vh; object-fit: contain;" alt="Product">
                    </div>
                    <div class="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center">
                        <h3 class="fw-bold mb-3" id="productModalLabel" style="color: var(--ch-dark-slate);">Title</h3>
                        <p id="modalDesc" class="text-muted mb-4" style="line-height: 1.6;">Description goes here.</p>
                        <button type="button" class="btn w-100 fw-bold py-2 mt-auto text-white" data-bs-dismiss="modal" style="background-color: var(--ch-dark-slate); border-radius: 50px;">Close Preview</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- OWNER MODAL (Redesigned) -->
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

    <button id="backToTop" class="btn border-0 shadow" aria-label="Back to top" style="position: fixed; bottom: 30px; right: 30px; display: none; background-color: var(--ch-teal); color: #fff; border-radius: 50%; width: 50px; height: 50px; z-index: 999; align-items: center; justify-content: center;">
        <i class="bi bi-arrow-up fs-5"></i>
    </button>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

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

        document.addEventListener('DOMContentLoaded', function() {
            // Infinite Looping Typing Animation Logic
            const typeWriterElement = document.getElementById('typewriter-text');
            const textToType = "Live Limitless";

            const typingSpeed = 150;
            const erasingSpeed = 100;
            const pauseEnd = 2000;
            const pauseStart = 500;

            let charIndex = 0;
            let isDeleting = false;

            function typeText() {
                const currentText = textToType.substring(0, charIndex);
                typeWriterElement.innerHTML = currentText === '' ? '&nbsp;' : currentText;

                if (!isDeleting && charIndex < textToType.length) {
                    charIndex++;
                    setTimeout(typeText, typingSpeed);
                } else if (isDeleting && charIndex > 0) {
                    charIndex--;
                    setTimeout(typeText, erasingSpeed);
                } else {
                    isDeleting = !isDeleting;
                    setTimeout(typeText, isDeleting ? pauseEnd : pauseStart);
                }
            }
            setTimeout(typeText, 500);

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
            const backToTopBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
            });
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Scroll Reveal Animation
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                const elementVisible = 100;
                reveals.forEach((reveal) => {
                    const elementTop = reveal.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('visible');
                    }
                });
            };
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll();

            // Product Filtering
            const filterBtns = document.querySelectorAll('.filter-btn');
            const menuItems = document.querySelectorAll('.menu-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    menuItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            // Product Modal Population
            const productModal = document.getElementById('productModal');
            productModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                document.getElementById('productModalLabel').textContent = button.getAttribute('data-title');
                document.getElementById('modalImg').src = button.getAttribute('data-img');
                document.getElementById('modalDesc').textContent = button.getAttribute('data-desc');
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
            ownerModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                const ownerKey = button.getAttribute('data-owner');
                const data = ownerData[ownerKey];

                document.getElementById('ownerModalName').textContent = data.name;
                document.getElementById('ownerModalImg').src = data.img;
                document.getElementById('ownerModalBio').innerHTML = data.bio;
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
        });

        $(document).ready(function() {
            $(".team-carousel").owlCarousel({
                loop: true,
                margin: 10,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        });

        document.addEventListener("DOMContentLoaded", function() {
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
                // FIX: Added dataset boundary to prevent double-submit loops
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