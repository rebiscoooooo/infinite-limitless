// ========== NAVBAR SCROLL EFFECT ==========
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ========== ACTIVE NAV LINK (Intersection Observer) ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ========== REVEAL ON SCROLL ==========
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

// ========== MENU FILTER & ANIMATION ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        menuItems.forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.style.display = show ? '' : 'none';
            if (show) {
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = 'fadeUp 0.6s ease-out both';
            }
        });
    });
});

// ========== PRODUCT MODAL LOGIC ==========
const productModal = document.getElementById('productModal');
if (productModal) {
    productModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const title = button.getAttribute('data-title');
        const desc = button.getAttribute('data-desc');
        const price = button.getAttribute('data-price');
        const img = button.getAttribute('data-img');
        productModal.querySelector('.modal-body #productModalLabel').textContent = title;
        productModal.querySelector('.modal-body #modalDesc').textContent = desc;
        productModal.querySelector('.modal-body #modalPrice').textContent = price;
        productModal.querySelector('#modalImg').src = img;
        productModal.querySelector('#modalImg').alt = title;
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const navCollapse = document.getElementById('navMenu');
            if (navCollapse && navCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navCollapse)?.hide();
            }
        }
    });
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== TEAM CAROUSEL (Owl Carousel) ==========
if (typeof $ !== 'undefined') {
    $(document).ready(function () {
        if ($('.team-carousel').length) {
            $(".team-carousel").owlCarousel({
                loop: true,
                margin: 20,
                nav: false,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        }
    });
}

// ... [Keep everything above ========== FORMS AND API SUBMISSIONS ========== unchanged] ...

// ========== FORMS AND API SUBMISSIONS ==========
document.addEventListener('DOMContentLoaded', function () {
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // FIX: Prevent double event binding
        if(contactForm.dataset.bound) return; 
        contactForm.dataset.bound = "true";

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const alertBox = document.getElementById('contactAlert'); // Note: index/join use formAlertMessage
            
            // Check validity fallback
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
            btn.disabled = true;
            
            const formData = new FormData(this);
            // FIX: Pointed to correct endpoint
            fetch('backend/submit_inquiry.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (alertBox) {
                    alertBox.classList.remove('d-none', 'alert-success', 'alert-danger');
                    if (data.status === 'success') {
                        alertBox.classList.add('alert-success');
                        alertBox.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> ' + data.message;
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                    } else {
                        alertBox.classList.add('alert-danger');
                        alertBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> ' + data.message;
                    }
                } else {
                    // Fallback if contactAlert doesn't exist (handled by inline script)
                    if(data.status === 'success') { contactForm.reset(); contactForm.classList.remove('was-validated'); }
                }
            })
            .catch(error => {
                if (alertBox) {
                    alertBox.classList.remove('d-none', 'alert-success');
                    alertBox.classList.add('alert-danger');
                    alertBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> System error. Please try again.';
                }
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // Registration Form logic
    const regForm = document.getElementById('memberRegistrationForm') || document.getElementById('registrationForm');
    if (regForm) {
        // FIX: Prevent double binding
        if(regForm.dataset.bound) return; 
        regForm.dataset.bound = "true";

        regForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            const formData = new FormData(this);
            fetch('backend/register_member.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    // This now works because backend returns .email and .password
                    document.getElementById('successEmail').textContent = result.email;
                    document.getElementById('successPassword').textContent = result.password;
                    
                    const regModal = new bootstrap.Modal(document.getElementById('regSuccessModal'));
                    regModal.show();
                    
                    regForm.reset();
                    regForm.classList.remove('was-validated');
                } else {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire('Error', result.message, 'error');
                    } else {
                        alert("Error: " + result.message);
                    }
                }
            })
            .catch(error => {
                if (typeof Swal !== 'undefined') {
                    Swal.fire('Error', 'System error. Please try again.', 'error');
                } else {
                    alert('System error. Please try again.');
                }
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }
});