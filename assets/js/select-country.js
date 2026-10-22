document.addEventListener("DOMContentLoaded", function() {
            // --- 1. CONTACT FORM LOGIC ---
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

                    const formData = new FormData(this);
                    fetch('backend/submit_inquiry.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            alertBox.classList.remove('d-none');
                            if (data.status === 'success') {
                                alertBox.className = 'alert alert-success d-flex align-items-center rounded-3 shadow-sm mb-4';
                                alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                                contactForm.reset();
                                contactForm.classList.remove('was-validated');
                            } else {
                                alertBox.className = 'alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4';
                                alertBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Failed to Send</strong><br>' + (data.message || 'Please fill out all required fields.') + '</div>';
                            }
                        })
                        .catch(error => {
                            alertBox.classList.remove('d-none');
                            alertBox.className = 'alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4';
                            alertBox.innerHTML = '<i class="bi bi-wifi-off fs-4 me-3 text-danger"></i> <div><strong>Network Error</strong><br>Could not connect to the server.</div>';
                        })
                        .finally(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }

            // --- 2. REGION REDIRECTION LOGIC ---
            const regionForm = document.getElementById('regionForm');
            const countrySelect = document.getElementById('countrySelect');
            const warningMessage = document.getElementById('warningMessage');
            const continueBtn = document.getElementById('continueBtn');

            if (regionForm) {
                regionForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    if (countrySelect.value === "") {
                        warningMessage.style.display = "block";
                    } else {
                        warningMessage.style.display = "none";

                        // Get the selected option's data-initials
                        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
                        const countryInitials = selectedOption.getAttribute('data-initials');

                        // Provide UI feedback that redirection is happening
                        continueBtn.disabled = true;
                        continueBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Redirecting...';

                        // Save to session for use on the next page
                        sessionStorage.setItem('selectedCountry', countrySelect.value);

                        // Redirect to join-community-bf.php, join-community-cm.php, etc.
                        window.location.href = `join-community-${countryInitials}.php`;
                    }
                });
            }

            if (countrySelect) {
                countrySelect.addEventListener('change', function() {
                    if (this.value !== "") {
                        warningMessage.style.display = "none";
                    }
                });
            }

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
            if (ownerModal) {
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

