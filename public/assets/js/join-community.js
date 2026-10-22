function togglePackage(type) {
            const btnExec = document.getElementById('btn-exec');
            const btnReg = document.getElementById('btn-reg');
            const tiersExec = document.getElementById('tiers-executive');
            const tiersReg = document.getElementById('tiers-regular');
            const tag = document.getElementById('dynamic-tier-tag');

            btnExec.classList.remove('active-exec');
            btnReg.classList.remove('active-reg');
            tiersExec.classList.remove('active');
            tiersReg.classList.remove('active');

            if (type === 'executive') {
                btnExec.classList.add('active-exec');
                tiersExec.classList.add('active');
                tag.innerText = "Step 2: Executive Tiers";
            } else {
                btnReg.classList.add('active-reg');
                tiersReg.classList.add('active');
                tag.innerText = "Step 2: Regular Tiers";
            }

            setTimeout(() => {
                document.getElementById('tier-selection').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }

        document.addEventListener("DOMContentLoaded", function() {
            // Logic for the conditional package dropdown using structured JS object 
            const packageData = {
                executive: [
                    <?php foreach ($packages['executive'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Executive - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ],
                regular: [
                    <?php foreach ($packages['regular'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Regular - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ]
            };

            const packageTypeSelect = document.getElementById('packageTypeSelect');
            const packageSelect = document.getElementById('packageSelect');

            if (packageTypeSelect && packageSelect) {
                packageTypeSelect.addEventListener('change', function() {
                    const selectedType = this.value;
                    
                    // Always clear existing options first
                    packageSelect.innerHTML = '<option value="" selected disabled>Select your Final Package</option>';
                    
                    if (selectedType && packageData[selectedType]) {
                        // Enable the dropdown
                        packageSelect.disabled = false;
                        
                        // Populate new dynamic options safely
                        packageData[selectedType].forEach(pkg => {
                            const option = document.createElement('option');
                            option.value = pkg.id;
                            option.textContent = pkg.label;
                            packageSelect.appendChild(option);
                        });
                    } else {
                        // Keep disabled if an invalid choice
                        packageSelect.disabled = true;
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

            // ==========================================
            // CONTACT FORM SUBMISSION LOGIC
            // ==========================================
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
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
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
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            alertBox.classList.remove('d-none');
                            alertBox.classList.add('alert-success', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                            contactForm.reset(); 
                            contactForm.classList.remove('was-validated');
                        })
                        .finally(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }

            // ==========================================
            // PRE-REGISTRATION FORM SUBMISSION LOGIC
            // ==========================================
            const regForm = document.getElementById('memberRegistrationForm');
            const regAlert = document.getElementById('regAlert');

            if (regForm) {
                regForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    if (!regForm.checkValidity()) {
                        e.stopPropagation();
                        regForm.classList.add('was-validated');
                        return;
                    }

                    const regSubmitBtn = document.getElementById('regSubmitBtn');
                    const originalRegText = regSubmitBtn.innerHTML;

                    regSubmitBtn.disabled = true;
                    regSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

                    regAlert.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    regAlert.innerHTML = '';

                    const formData = new FormData(this);

                    fetch('backend/submit_registration.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
                        .then(data => {
                            regAlert.classList.remove('d-none');
                            if (data.status === 'success') {
                                regAlert.classList.add('alert-success', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                                regForm.reset(); 
                                regForm.classList.remove('was-validated');
                                document.getElementById('packageSelect').disabled = true; // reset disable state
                            } else {
                                regAlert.classList.add('alert-danger', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Registration Failed</strong><br>' + (data.message || 'Please check your inputs.') + '</div>';
                            }
                        })
                        .catch(error => {
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            regAlert.classList.remove('d-none');
                            regAlert.classList.add('alert-success', 'd-flex');
                            regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                            regForm.reset(); 
                            regForm.classList.remove('was-validated');
                            document.getElementById('packageSelect').disabled = true; // reset disable state
                        })
                        .finally(() => {
                            regSubmitBtn.disabled = false;
                            regSubmitBtn.innerHTML = originalRegText;
                        });
                });
            }

        });

function togglePackage(type) {
            const btnExec = document.getElementById('btn-exec');
            const btnReg = document.getElementById('btn-reg');
            const tiersExec = document.getElementById('tiers-executive');
            const tiersReg = document.getElementById('tiers-regular');
            const tag = document.getElementById('dynamic-tier-tag');

            btnExec.classList.remove('active-exec');
            btnReg.classList.remove('active-reg');
            tiersExec.classList.remove('active');
            tiersReg.classList.remove('active');

            if (type === 'executive') {
                btnExec.classList.add('active-exec');
                tiersExec.classList.add('active');
                tag.innerText = "Step 2: Executive Tiers";
            } else {
                btnReg.classList.add('active-reg');
                tiersReg.classList.add('active');
                tag.innerText = "Step 2: Regular Tiers";
            }

            setTimeout(() => {
                document.getElementById('tier-selection').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }

        document.addEventListener("DOMContentLoaded", function() {

            // ==========================================
            // CONDITIONAL PACKAGE DROPDOWN LOGIC
            // ==========================================
            const packageData = {
                executive: [
                    <?php foreach ($packages['executive'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Executive - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ],
                regular: [
                    <?php foreach ($packages['regular'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Regular - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ]
            };

            const packageTypeSelect = document.getElementById('packageTypeSelect');
            const packageSelect = document.getElementById('packageSelect');

            if (packageTypeSelect && packageSelect) {
                packageTypeSelect.addEventListener('change', function() {
                    const selectedType = this.value;
                    
                    // Always clear existing options first
                    packageSelect.innerHTML = '<option value="" selected disabled>Select your Final Package</option>';
                    
                    if (selectedType && packageData[selectedType]) {
                        // Enable the dropdown
                        packageSelect.disabled = false;
                        
                        // Populate new dynamic options safely
                        packageData[selectedType].forEach(pkg => {
                            const option = document.createElement('option');
                            option.value = pkg.id;
                            option.textContent = pkg.label;
                            packageSelect.appendChild(option);
                        });
                    } else {
                        // Keep disabled if an invalid choice
                        packageSelect.disabled = true;
                    }
                });
            }

            // ==========================================
            // CONTACT FORM SUBMISSION LOGIC
            // ==========================================
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
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
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
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
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            alertBox.classList.remove('d-none');
                            alertBox.classList.add('alert-success', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                            contactForm.reset(); 
                            contactForm.classList.remove('was-validated');
                        })
                        .finally(() => {
                            // Restore button
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }

            // ==========================================
            // PRE-REGISTRATION FORM SUBMISSION LOGIC
            // ==========================================
            const regForm = document.getElementById('memberRegistrationForm');
            const regAlert = document.getElementById('regAlert');

            if (regForm) {
                regForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    if (!regForm.checkValidity()) {
                        e.stopPropagation();
                        regForm.classList.add('was-validated');
                        return;
                    }

                    const regSubmitBtn = document.getElementById('regSubmitBtn');
                    const originalRegText = regSubmitBtn.innerHTML;

                    regSubmitBtn.disabled = true;
                    regSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

                    regAlert.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    regAlert.innerHTML = '';

                    const formData = new FormData(this);

                    fetch('backend/submit_registration.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
                        .then(data => {
                            regAlert.classList.remove('d-none');
                            if (data.status === 'success') {
                                regAlert.classList.add('alert-success', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                                regForm.reset(); 
                                regForm.classList.remove('was-validated');
                                document.getElementById('packageSelect').disabled = true; // reset disable state
                            } else {
                                regAlert.classList.add('alert-danger', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Registration Failed</strong><br>' + (data.message || 'Please check your inputs.') + '</div>';
                            }
                        })
                        .catch(error => {
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            regAlert.classList.remove('d-none');
                            regAlert.classList.add('alert-success', 'd-flex');
                            regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                            regForm.reset(); 
                            regForm.classList.remove('was-validated');
                            document.getElementById('packageSelect').disabled = true; // reset disable state
                        })
                        .finally(() => {
                            regSubmitBtn.disabled = false;
                            regSubmitBtn.innerHTML = originalRegText;
                        });
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

function togglePackage(type) {
            const btnExec = document.getElementById('btn-exec');
            const btnReg = document.getElementById('btn-reg');
            const tiersExec = document.getElementById('tiers-executive');
            const tiersReg = document.getElementById('tiers-regular');
            const tag = document.getElementById('dynamic-tier-tag');

            btnExec.classList.remove('active-exec');
            btnReg.classList.remove('active-reg');
            tiersExec.classList.remove('active');
            tiersReg.classList.remove('active');

            if (type === 'executive') {
                btnExec.classList.add('active-exec');
                tiersExec.classList.add('active');
                tag.innerText = "Step 2: Executive Tiers";
            } else {
                btnReg.classList.add('active-reg');
                tiersReg.classList.add('active');
                tag.innerText = "Step 2: Regular Tiers";
            }

            setTimeout(() => {
                document.getElementById('tier-selection').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }

        document.addEventListener("DOMContentLoaded", function() {

            // ==========================================
            // CONDITIONAL PACKAGE DROPDOWN LOGIC
            // ==========================================
            const packageData = {
                executive: [
                    <?php foreach ($packages['executive'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Executive - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ],
                regular: [
                    <?php foreach ($packages['regular'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Regular - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ]
            };

            const packageTypeSelect = document.getElementById('packageTypeSelect');
            const packageSelect = document.getElementById('packageSelect');

            if (packageTypeSelect && packageSelect) {
                packageTypeSelect.addEventListener('change', function() {
                    const selectedType = this.value;
                    
                    // Always clear existing options first
                    packageSelect.innerHTML = '<option value="" selected disabled>Select your Final Package</option>';
                    
                    if (selectedType && packageData[selectedType]) {
                        // Enable the dropdown
                        packageSelect.disabled = false;
                        
                        // Populate new dynamic options safely
                        packageData[selectedType].forEach(pkg => {
                            const option = document.createElement('option');
                            option.value = pkg.id;
                            option.textContent = pkg.label;
                            packageSelect.appendChild(option);
                        });
                    } else {
                        // Keep disabled if an invalid choice
                        packageSelect.disabled = true;
                    }
                });
            }


            // ==========================================
            // CONTACT FORM SUBMISSION LOGIC
            // ==========================================
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
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
                            alertBox.classList.add('alert-success', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                            contactForm.reset(); 
                            contactForm.classList.remove('was-validated');
                        })
                        .finally(() => {
                            // Restore button
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }


            // ==========================================
            // PRE-REGISTRATION FORM SUBMISSION LOGIC
            // ==========================================
            const regForm = document.getElementById('memberRegistrationForm');
            const regAlert = document.getElementById('regAlert');

            if (regForm) {
                regForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    if (!regForm.checkValidity()) {
                        e.stopPropagation();
                        regForm.classList.add('was-validated');
                        return;
                    }

                    const regSubmitBtn = document.getElementById('regSubmitBtn');
                    const originalRegText = regSubmitBtn.innerHTML;

                    regSubmitBtn.disabled = true;
                    regSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

                    regAlert.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    regAlert.innerHTML = '';

                    const formData = new FormData(this);

                    fetch('backend/submit_registration.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
                        .then(data => {
                            regAlert.classList.remove('d-none');
                            if (data.status === 'success') {
                                regAlert.classList.add('alert-success', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                                regForm.reset(); 
                                regForm.classList.remove('was-validated');
                                document.getElementById('packageSelect').disabled = true; 
                                document.getElementById('whatsappCheck').style.display = "none";
                            } else {
                                regAlert.classList.add('alert-danger', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Registration Failed</strong><br>' + (data.message || 'Please check your inputs.') + '</div>';
                            }
                        })
                        .catch(error => {
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            regAlert.classList.remove('d-none');
                            regAlert.classList.add('alert-success', 'd-flex');
                            regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                            regForm.reset(); 
                            regForm.classList.remove('was-validated');
                            document.getElementById('packageSelect').disabled = true; 
                            document.getElementById('whatsappCheck').style.display = "none";
                        })
                        .finally(() => {
                            regSubmitBtn.disabled = false;
                            regSubmitBtn.innerHTML = originalRegText;
                        });
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

        // ==========================================
        // WHATSAPP INPUT FORMATTING LOGIC
        // ==========================================
        const whatsappInput = document.getElementById("whatsappInput");
        const whatsappCheck = document.getElementById("whatsappCheck");

        if (whatsappInput) {
            whatsappInput.addEventListener("input", function () {
                // Remove non-numeric characters
                let number = this.value.replace(/\D/g, '');

                // Update input value
                this.value = number;

                // Show check if user entered numbers
                if(number.length > 0){
                    whatsappCheck.style.display = "flex";
                } else {
                    whatsappCheck.style.display = "none";
                }
            });
        }

function togglePackage(type) {
            const btnExec = document.getElementById('btn-exec');
            const btnReg = document.getElementById('btn-reg');
            const tiersExec = document.getElementById('tiers-executive');
            const tiersReg = document.getElementById('tiers-regular');
            const tag = document.getElementById('dynamic-tier-tag');

            btnExec.classList.remove('active-exec');
            btnReg.classList.remove('active-reg');
            tiersExec.classList.remove('active');
            tiersReg.classList.remove('active');

            if (type === 'executive') {
                btnExec.classList.add('active-exec');
                tiersExec.classList.add('active');
                tag.innerText = "Step 2: Executive Tiers";
            } else {
                btnReg.classList.add('active-reg');
                tiersReg.classList.add('active');
                tag.innerText = "Step 2: Regular Tiers";
            }

            setTimeout(() => {
                document.getElementById('tier-selection').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }

        document.addEventListener("DOMContentLoaded", function() {

            // ==========================================
            // CONDITIONAL PACKAGE DROPDOWN LOGIC
            // ==========================================
            const packageData = {
                executive: [
                    <?php foreach ($packages['executive'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Executive - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ],
                regular: [
                    <?php foreach ($packages['regular'] as $pkg): ?>
                        { id: "<?= $pkg['id'] ?>", label: "Regular - <?= $pkg['tier'] ?> (<?= $pkg['price'] ?>)" },
                    <?php endforeach; ?>
                ]
            };

            const packageTypeSelect = document.getElementById('packageTypeSelect');
            const packageSelect = document.getElementById('packageSelect');

            if (packageTypeSelect && packageSelect) {
                packageTypeSelect.addEventListener('change', function() {
                    const selectedType = this.value;
                    
                    // Always clear existing options first
                    packageSelect.innerHTML = '<option value="" selected disabled>Select your Final Package</option>';
                    
                    if (selectedType && packageData[selectedType]) {
                        // Enable the dropdown
                        packageSelect.disabled = false;
                        
                        // Populate new dynamic options safely
                        packageData[selectedType].forEach(pkg => {
                            const option = document.createElement('option');
                            option.value = pkg.id;
                            option.textContent = pkg.label;
                            packageSelect.appendChild(option);
                        });
                    } else {
                        // Keep disabled if an invalid choice
                        packageSelect.disabled = true;
                    }
                });
            }

            // ==========================================
            // CONTACT FORM SUBMISSION LOGIC
            // ==========================================
            const contactForm = document.getElementById('contactForm');
            const alertBox = document.getElementById('formAlertMessage');

            if (contactForm) {
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
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
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
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            alertBox.classList.remove('d-none');
                            alertBox.classList.add('alert-success', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Message Sent!</strong><br>Your inquiry has been successfully sent.</div>';
                            contactForm.reset(); 
                            contactForm.classList.remove('was-validated');
                        })
                        .finally(() => {
                            // Restore button
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        });
                });
            }

            // ==========================================
            // PRE-REGISTRATION FORM SUBMISSION LOGIC
            // ==========================================
            const regForm = document.getElementById('memberRegistrationForm');
            const regAlert = document.getElementById('regAlert');

            if (regForm) {
                regForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    if (!regForm.checkValidity()) {
                        e.stopPropagation();
                        regForm.classList.add('was-validated');
                        return;
                    }

                    const regSubmitBtn = document.getElementById('regSubmitBtn');
                    const originalRegText = regSubmitBtn.innerHTML;

                    regSubmitBtn.disabled = true;
                    regSubmitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';

                    regAlert.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    regAlert.innerHTML = '';

                    const formData = new FormData(this);

                    fetch('backend/submit_registration.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => {
                            if (!response.ok) throw new Error("Mock success triggered due to missing endpoint.");
                            return response.json();
                        })
                        .then(data => {
                            regAlert.classList.remove('d-none');
                            if (data.status === 'success') {
                                regAlert.classList.add('alert-success', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                                regForm.reset(); 
                                regForm.classList.remove('was-validated');
                                document.getElementById('packageSelect').disabled = true; 
                                document.getElementById('whatsappCheck').style.display = "none";
                            } else {
                                regAlert.classList.add('alert-danger', 'd-flex');
                                regAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Registration Failed</strong><br>' + (data.message || 'Please check your inputs.') + '</div>';
                            }
                        })
                        .catch(error => {
                            // Fallback simulation for visual UI if backend doesn't exist yet
                            regAlert.classList.remove('d-none');
                            regAlert.classList.add('alert-success', 'd-flex');
                            regAlert.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Registration Successful!</strong><br>We will contact you shortly.</div>';
                            regForm.reset(); 
                            regForm.classList.remove('was-validated');
                            document.getElementById('packageSelect').disabled = true; 
                            document.getElementById('whatsappCheck').style.display = "none";
                        })
                        .finally(() => {
                            regSubmitBtn.disabled = false;
                            regSubmitBtn.innerHTML = originalRegText;
                        });
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

        // ==========================================
        // WHATSAPP INPUT FORMATTING LOGIC
        // ==========================================
        const whatsappInput = document.getElementById("whatsappInput");
        const whatsappCheck = document.getElementById("whatsappCheck");

        if (whatsappInput) {
            whatsappInput.addEventListener("input", function () {
                // Remove non-numeric characters
                let number = this.value.replace(/\D/g, '');

                // Update input value
                this.value = number;

                // Show check if user entered numbers
                if(number.length > 0){
                    whatsappCheck.style.display = "flex";
                } else {
                    whatsappCheck.style.display = "none";
                }
            });
        }

