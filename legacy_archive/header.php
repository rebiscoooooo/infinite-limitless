<!-- header.php -->
<nav class="navbar navbar-expand-lg fixed-top" id="mainNav">
    <div class="container-fluid px-3 px-lg-5">
        <a class="text-logo mx-auto" href="index.php" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;">
            <span style="color: #fff; font-family: 'Bebas Neue', sans-serif; font-weight: 900; line-height: 0.8; letter-spacing: 1.5px;">INFINITE</span>
            <span style="color: var(--ch-teal); font-family: 'Barlow', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; margin-top: 1.5px;">LIVE LIMITLESS</span>
        </a>
        <div class="d-flex align-items-center gap-2 gap-lg-3 order-lg-3">
            <a href="./login.php" class="btn-nav-order nav-link d-none d-lg-inline-flex">Login</a>
            <a href="./join-ph.php" class="btn-nav-order nav-link d-none d-lg-inline-flex" style="background: var(--ch-teal); color: #fff !important; border-color: var(--ch-teal);">
                Join Us <i class="bi bi-arrow-right ms-1"></i>
            </a>
            <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-label="Toggle">
                <i class="bi bi-list text-white" style="font-size: 2rem;"></i>
            </button>
        </div>
        <div class="collapse navbar-collapse order-lg-2" id="navMenu">
            <ul class="navbar-nav mx-auto gap-lg-1 text-start text-lg-center ps-2 ps-lg-0 pt-3 pt-lg-0">
                <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php#features">About</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php#menu">Products</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php#team">Team</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php#testimonials">Testimony</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php#contact">Contact</a></li>
                <!-- WORLD PLAN ITEM ADDED HERE -->
                <li class="nav-item"><a class="nav-link" href="world-plan.php">World Plan</a></li>
                <li class="nav-item d-lg-none"><a class="nav-link" href="./join-ph.php" style="color: var(--ch-teal) !important;">Join Us</a></li>
                <li class="nav-item d-lg-none"><a class="nav-link" href="./login.php">Login</a></li>
            </ul>
        </div>
    </div>
</nav>