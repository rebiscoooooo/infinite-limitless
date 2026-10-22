document.addEventListener('DOMContentLoaded', function() {
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
                if(window.scrollY > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.transform = 'translateY(0)';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.transform = 'translateY(20px)';
                }
            });
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Scroll Reveal Animation
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                const elementVisible = 120;
                reveals.forEach((reveal) => {
                    const elementTop = reveal.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('visible');
                    }
                });
            };
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll(); 
            
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

            // OWNER MODAL POPULATION LOGIC
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
            if(ownerModal) {
                ownerModal.addEventListener('show.bs.modal', function(event) {
                    const button = event.relatedTarget;
                    const ownerKey = button.getAttribute('data-owner');
                    const data = ownerData[ownerKey];

                    document.getElementById('ownerModalName').textContent = data.name;
                    document.getElementById('ownerModalImg').src = data.img;
                    document.getElementById('ownerModalBio').innerHTML = data.bio; 
                });
            }
        });
        
        // =============================================================
        // NEW PRODUCT CARD JAVASCRIPT (from the replacement code)
        // =============================================================
        const variations = <?php echo json_encode($variations); ?>;
        let currentIndex = 0;

        function cycleProduct() {
            let nextIndex = (currentIndex + 1) % variations.length;
            goToProduct(nextIndex);
        }

        function goToProduct(index) {
            currentIndex = index;
            const currentItem = variations[currentIndex];
            
            const container = document.getElementById('main-container');
            const pouchImg = document.getElementById('product-pouch');
            const description = document.getElementById('main-desc');
            const jobsWrapper = document.getElementById('jobs-wrapper-modern');
            const replacesText = document.getElementById('replaces-text-modern');

            container.style.backgroundColor = currentItem.bg_color;
            pouchImg.style.transform = 'scale(0.9)';
            pouchImg.style.opacity = '0';
            description.style.opacity = '0';
            jobsWrapper.style.opacity = '0';
            replacesText.style.opacity = '0';

            setTimeout(() => {
                pouchImg.src = currentItem.main_image;
                document.getElementById('badge-label').innerText = currentItem.sub_label;
                document.getElementById('main-title').innerText = currentItem.product_title;
                document.getElementById('main-subtitle').innerText = currentItem.sub_title;
                description.innerText = currentItem.description;
                replacesText.innerText = currentItem.replaces;

                let jobsHTML = '';
                currentItem.jobs.forEach(job => {
                    jobsHTML += `
                        <div class="job-item-modern">
                            <div class="job-title-modern">${job.title}</div>
                            <div class="job-text-modern">${job.text}</div>
                        </div>
                    `;
                });
                jobsWrapper.innerHTML = jobsHTML;

                document.querySelectorAll('.thumb-box-modern').forEach(box => box.classList.remove('active'));
                document.getElementById(`thumb-${currentIndex}`).classList.add('active');

                pouchImg.style.transform = 'scale(1)';
                pouchImg.style.opacity = '1';
                description.style.opacity = '1';
                jobsWrapper.style.opacity = '1';
                replacesText.style.opacity = '1';
            }, 250);
        }

        // Contact form submission (unchanged)
        document.addEventListener("DOMContentLoaded", function() {
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault(); 

                    if (!contactForm.checkValidity()) {
                        e.stopPropagation();
                        contactForm.classList.add('was-validated');
                        return;
                    }

                    const submitBtn = document.getElementById('contactSubmitBtn');
                    const originalText = submitBtn.innerHTML;

                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

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
                                alertBox.classList.add('alert-success', 'd-flex');
                                alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                                
                                contactForm.reset(); 
                                contactForm.classList.remove('was-validated');
                            } else {
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
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }
        });

