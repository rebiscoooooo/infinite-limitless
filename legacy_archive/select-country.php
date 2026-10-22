<?php
session_start();
require_once 'public_auth_guard.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Choose Region | Infinite</title>

    <link rel="icon" href="./assets/image/logo-infinite.webp" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./assets/css/select-country.css" />
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


    <section class="region-section">
        <div class="container">
            <div class="region-wrapper">
                <div class="row g-0 align-items-center">

                    <div class="col-lg-7">
                        <div class="region-left">
                            <div class="region-tag">OUR GLOBAL FOOTPRINT</div>
                            <h1 class="region-title">CHOOSE YOUR REGION</h1>
                            <p class="region-desc">
                                Access your local business presentation, currency, and registration details
                            </p>

                            <form id="regionForm">
                                <div class="country-select">
                                    <i class="bi bi-globe2"></i>
                                    <select id="countrySelect" required>
                                        <option value="" selected disabled>Select your region</option>
                                        <option value="Burkina Faso" data-initials="bf">Burkina Faso</option>
                                        <option value="Cameroon" data-initials="cm">Cameroon</option>
                                        <option value="Côte D'ivoire" data-initials="ci">Côte D'ivoire</option>
                                        <option value="Democratic Republic Of Congo" data-initials="drc">Democratic Republic Of Congo</option>
                                        <option value="Papua New Guinea" data-initials="png">Papua New Guinea</option>
                                        <option value="Philippines" data-initials="ph">Philippines</option>
                                        <option value="South Africa" data-initials="sa">South Africa</option>
                                        <option value="Togo" data-initials="tg">Togo</option>
                                        <option value="Uganda" data-initials="ug">Uganda</option>
                                        <option value="Zimbabwe" data-initials="zw">Zimbabwe</option>
                                        <option value="Others Countries" data-initials="others">Others Countries</option>
                                    </select>
                                </div>

                                <div class="warning-message" id="warningMessage">
                                    <i class="bi bi-exclamation-circle"></i> Please select your country first.
                                </div>

                                <div class="text-center mt-4">
                                    <button type="submit" class="btn-continue" id="continueBtn">Continue</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-5">
                        <div class="region-right">
                            <div class="map-wrapper">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/BlankMap-World_gray.svg" alt="World Map">
                                <div class="pin pin1"></div>
                                <div class="pin pin2"></div>
                                <div class="pin pin3"></div>
                                <div class="pin pin4"></div>
                                <div class="pin pin5"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <footer id="contact" style="background: var(--ch-dark-slate); padding-top: 5rem; padding-bottom: 2rem;">
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

            <hr class="mt-5" style="border-color: rgba(148, 163, 184, 0.22);" />
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="./assets/js/select-country.js"></script>

</body>

</html>