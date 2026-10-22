// ==========================================
        // REGISTRATION MODAL FORM HANDLER (Routed to Contact Inquiries)
        // ==========================================
        document.addEventListener("DOMContentLoaded", function() {
            const worldForm = document.getElementById('worldAccountForm');
            const alertBox = document.getElementById('worldFormAlertMessage');
            
            if (worldForm) {
                if (worldForm.dataset.bound) return;
                worldForm.dataset.bound = "true";
                
                worldForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Check native Bootstrap validation
                    if (!worldForm.checkValidity()) {
                        e.stopPropagation();
                        worldForm.classList.add('was-validated');
                        return;
                    }

                    const submitBtn = document.getElementById('worldSubmitBtn');
                    const originalText = submitBtn.innerHTML;
                    
                    // Set loading state
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';
                    
                    alertBox.className = 'alert d-none align-items-center rounded-3 shadow-sm mb-4';
                    alertBox.innerHTML = '';

                    // Capture the form data
                    const formData = new FormData(this);

                    // Route to World Plan Registration backend
                    fetch('backend/submit_world_plan.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        alertBox.classList.remove('d-none');
                        
                        if (data.status === 'success') {
                            alertBox.classList.add('alert-success', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i> <div><strong>Success!</strong><br>Your World Account registration has been successfully submitted.</div>';
                            worldForm.reset();
                            worldForm.classList.remove('was-validated');
                        } else {
                            alertBox.classList.add('alert-danger', 'd-flex');
                            alertBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i> <div><strong>Submission Failed</strong><br>' + (data.message || 'Please check your inputs.') + '</div>';
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alertBox.classList.remove('d-none');
                        alertBox.classList.add('alert-danger', 'd-flex');
                        alertBox.innerHTML = '<i class="bi bi-wifi-off fs-4 me-3 text-danger"></i> <div><strong>Network Error</strong><br>Could not connect to the server. Please try again later.</div>';
                    })
                    .finally(() => {
                        // Reset button state
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    });
                });
            }
        });

        // ==========================================
        // DYNAMIC MULTI-CURRENCY DATA DATASET
        // ==========================================
        const currencyData = {
            PHP: {
                code: "PHP",
                symbol: "₱",
                name: "Philippine Peso",
                cashBonus: "+ 100,000 WBP (₱100,000)",
                packages: [
                    { tier: "WORLD STARTER", price: "₱3,500", signup: "₱300", wbp: "250 WBP", m1: "₱150", m2: "₱300", m3: "₱500", cap: "₱500" },
                    { tier: "WORLD BASIC", price: "₱13,500", signup: "₱500", wbp: "750 WBP", m1: "₱500", m2: "₱1,000", m3: "₱1,500", cap: "₱1,500" },
                    { tier: "WORLD ADVANCE", price: "₱24,500", signup: "₱2,000", wbp: "1,500 WBP", m1: "₱1,000", m2: "₱2,000", m3: "₱3,000", cap: "₱3,000" },
                    { tier: "WORLD PRO", price: "₱79,800", signup: "₱5,000", wbp: "3,000 WBP", m1: "₱2,000", m2: "₱4,000", m3: "₱6,000", cap: "₱6,000" },
                    { tier: "WORLD SUPREME", price: "₱193,200", signup: "₱10,000", wbp: "6,000 WBP", m1: "₱4,000", m2: "₱8,000", m3: "₱12,000", cap: "₱12,000" }
                ],
                weeklyCaps: [
                    { tier: "WORLD STARTER", std: "₱20,000", exec: "₱30,000", mexec: "₱40,000" },
                    { tier: "WORLD BASIC", std: "₱30,000", exec: "₱50,000", mexec: "₱60,000" },
                    { tier: "WORLD ADVANCE", std: "₱60,000", exec: "₱90,000", mexec: "₱120,000" },
                    { tier: "WORLD PRO", std: "₱90,000", exec: "₱130,000", mexec: "₱180,000" },
                    { tier: "WORLD SUPREME", std: "₱180,000", exec: "₱230,000", mexec: "₱360,000" }
                ]
            },
            USD: {
                code: "USD",
                symbol: "$",
                name: "US Dollar",
                cashBonus: "+ 100,000 WBP ($1,785.70)",
                packages: [
                    { tier: "WORLD STARTER", price: "$60", signup: "$5.00", wbp: "250 pts", m1: "$2.50", m2: "$5.00", m3: "$8.00", cap: "$8.00" },
                    { tier: "WORLD BASIC", price: "$189", signup: "$15.00", wbp: "500 pts", m1: "$8.00", m2: "$16.00", m3: "$25.00", cap: "$25.00" },
                    { tier: "WORLD ADVANCE", price: "$359", signup: "$33.00", wbp: "1,500 pts", m1: "$16.00", m2: "$33.00", m3: "$50.00", cap: "$50.00" },
                    { tier: "WORLD PRO", price: "$929", signup: "$89.00", wbp: "3,000 pts", m1: "$33.00", m2: "$66.00", m3: "$100.00", cap: "$100.00" },
                    { tier: "WORLD SUPREME", price: "$2,229", signup: "$200.00", wbp: "6,000 pts", m1: "$66.00", m2: "$133.00", m3: "$200.00", cap: "$200.00" }
                ],
                weeklyCaps: [
                    { tier: "WORLD STARTER", std: "$357.00", exec: "$535.00", mexec: "$714.00" },
                    { tier: "WORLD BASIC", std: "$535.00", exec: "$892.00", mexec: "$1,071.00" },
                    { tier: "WORLD ADVANCE", std: "$1,071.00", exec: "$1,607.00", mexec: "$2,142.00" },
                    { tier: "WORLD PRO", std: "$1,607.00", exec: "$2,321.00", mexec: "$3,214.00" },
                    { tier: "WORLD SUPREME", std: "$3,214.00", exec: "$4,107.00", mexec: "$6,428.00" }
                ]
            },
            KINA: {
                code: "KINA",
                symbol: "PGK",
                name: "Papua New Guinea Kina",
                cashBonus: "+ 100,000 WBP (PGK 8,330)",
                packages: [
                    { tier: "WORLD STARTER", price: "PGK 299", signup: "PGK 25", wbp: "250 pts", m1: "PGK 12", m2: "PGK 25", m3: "PGK 60", cap: "PGK 60" },
                    { tier: "WORLD BASIC", price: "PGK 880", signup: "PGK 60", wbp: "500 pts", m1: "PGK 30", m2: "PGK 82", m3: "PGK 123", cap: "PGK 123" },
                    { tier: "WORLD ADVANCE", price: "PGK 1,599", signup: "PGK 160", wbp: "1,500 pts", m1: "PGK 82", m2: "PGK 160", m3: "PGK 245", cap: "PGK 245" },
                    { tier: "WORLD PRO", price: "PGK 5,199", signup: "PGK 410", wbp: "3,000 pts", m1: "PGK 160", m2: "PGK 320", m3: "PGK 490", cap: "PGK 490" },
                    { tier: "WORLD SUPREME", price: "PGK 12,599", signup: "PGK 820", wbp: "6,000 pts", m1: "PGK 320", m2: "PGK 640", m3: "PGK 985", cap: "PGK 985" }
                ],
                weeklyCaps: [
                    { tier: "WORLD STARTER", std: "PGK 1,428", exec: "PGK 2,142", mexec: "PGK 2,857" },
                    { tier: "WORLD BASIC", std: "PGK 2,142", exec: "PGK 3,571", mexec: "PGK 4,285" },
                    { tier: "WORLD ADVANCE", std: "PGK 4,285", exec: "PGK 6,428", mexec: "PGK 8,571" },
                    { tier: "WORLD PRO", std: "PGK 6,428", exec: "PGK 9,285", mexec: "PGK 12,857" },
                    { tier: "WORLD SUPREME", std: "PGK 12,857", exec: "PGK 16,428", mexec: "PGK 25,714" }
                ]
            }
        };

        // Initialize KINA as the default active currency
        let activeCurrency = 'KINA';
        let activeChartTierIndex = 0; // 0: Starter, 1: Basic, 2: Advance, 3: Pro, 4: Supreme

        // Switch active currency
        function switchCurrency(code) {
            activeCurrency = code;

            // Update button styles
            document.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`btn-${code.toLowerCase()}`).classList.add('active');

            // Toggle Sections based on active currency
            const dealerSection = document.getElementById('exclusive-dealer-section');
            const pngPackagesSection = document.getElementById('png-packages-section');
            const phpPackagesSection = document.getElementById('php-packages-section');
            const usdPackagesSection = document.getElementById('usd-packages-section');
            const kinaRetailingSection = document.getElementById('kina-retailing-section');
            const paymentProofSection = document.getElementById('payment-proof-section');
            const kinaEnrollerSection = document.getElementById('kina-enroller-section');
            const kinaSalesMatchSection = document.getElementById('kina-sales-match-section');
            const kinaEncashmentSection = document.getElementById('kina-encashment-section');
            const kinaRegistrationSection = document.getElementById('kina-registration-section');
            const kinaShippingSection = document.getElementById('kina-shipping-section');
            const kinaWhyJoinSection = document.getElementById('kina-why-join-section');
            const kinaOnlySections = [kinaEnrollerSection, kinaSalesMatchSection, kinaEncashmentSection, kinaRegistrationSection, kinaShippingSection, kinaWhyJoinSection];

            if (code === 'KINA') {
                if (dealerSection) dealerSection.style.display = 'block';
                if (pngPackagesSection) pngPackagesSection.style.display = 'block';
                if (kinaRetailingSection) kinaRetailingSection.style.display = 'block';
                if (paymentProofSection) paymentProofSection.style.display = 'block';
                kinaOnlySections.forEach(section => { if (section) section.style.display = 'block'; });
                if (phpPackagesSection) phpPackagesSection.style.display = 'none';
                if (usdPackagesSection) usdPackagesSection.style.display = 'none';
            } else if (code === 'PHP') {
                if (dealerSection) dealerSection.style.display = 'none';
                if (pngPackagesSection) pngPackagesSection.style.display = 'none';
                if (kinaRetailingSection) kinaRetailingSection.style.display = 'none';
                if (paymentProofSection) paymentProofSection.style.display = 'none';
                kinaOnlySections.forEach(section => { if (section) section.style.display = 'none'; });
                if (phpPackagesSection) phpPackagesSection.style.display = 'block';
                if (usdPackagesSection) usdPackagesSection.style.display = 'none';
            } else if (code === 'USD') {
                if (dealerSection) dealerSection.style.display = 'none';
                if (pngPackagesSection) pngPackagesSection.style.display = 'none';
                if (kinaRetailingSection) kinaRetailingSection.style.display = 'none';
                if (paymentProofSection) paymentProofSection.style.display = 'none';
                kinaOnlySections.forEach(section => { if (section) section.style.display = 'none'; });
                if (phpPackagesSection) phpPackagesSection.style.display = 'none';
                if (usdPackagesSection) usdPackagesSection.style.display = 'block';
            } else {
                if (dealerSection) dealerSection.style.display = 'none';
                if (pngPackagesSection) pngPackagesSection.style.display = 'none';
                if (kinaRetailingSection) kinaRetailingSection.style.display = 'none';
                if (paymentProofSection) paymentProofSection.style.display = 'none';
                kinaOnlySections.forEach(section => { if (section) section.style.display = 'none'; });
                if (phpPackagesSection) phpPackagesSection.style.display = 'none';
                if (usdPackagesSection) usdPackagesSection.style.display = 'none';
            }

            // Render updated tables & components
            renderTables();
            updateChartDisplay();
        }

        // Render main package tier table & weekly cap table
        function renderTables() {
            const data = currencyData[activeCurrency];

            // Tag update
            document.getElementById('table-curr-tag').innerText = `Currency: ${data.name} (${data.symbol})`;
            document.getElementById('cash-bonus-val').innerText = data.cashBonus;

            // Render Package Table
            let pkgHtml = '';
            data.packages.forEach(pkg => {
                const isSupreme = pkg.tier === 'WORLD SUPREME';
                pkgHtml += `
                    <tr class="${isSupreme ? 'bg-light fw-bold' : ''}">
                        <td class="tier-highlight">${pkg.tier}</td>
                        <td class="text-teal fw-bold" style="color: var(--ch-teal);">${pkg.price}</td>
                        <td>${pkg.signup}</td>
                        <td><span class="badge bg-secondary">${pkg.wbp}</span></td>
                        <td>${pkg.m1}</td>
                        <td>${pkg.m2}</td>
                        <td>${pkg.m3}</td>
                        <td class="fw-bold">${pkg.cap}</td>
                    </tr>
                `;
            });
            document.getElementById('package-table-body').innerHTML = pkgHtml;

            // Render Weekly Cap Table
            let capHtml = '';
            data.weeklyCaps.forEach(cap => {
                capHtml += `
                    <tr>
                        <td class="tier-highlight">${cap.tier}</td>
                        <td>${cap.std}</td>
                        <td style="color: var(--ch-teal);" class="fw-bold">${cap.exec}</td>
                        <td style="color: var(--ch-yellow-dk);" class="fw-bold">${cap.mexec}</td>
                    </tr>
                `;
            });
            document.getElementById('cap-table-body').innerHTML = capHtml;
        }

        // Set tier for org chart visualizer
        function setChartTier(tierName) {
            const tierMap = { STARTER: 0, BASIC: 1, ADVANCE: 2, PRO: 3, SUPREME: 4 };
            activeChartTierIndex = tierMap[tierName];

            // Update Tier Button UI
            document.querySelectorAll("[id^='chart-tier-']").forEach(btn => btn.classList.remove('active'));
            document.getElementById(`chart-tier-${tierName.toLowerCase()}`).classList.add('active');

            updateChartDisplay();
        }

        // Update values on Org Chart
        function updateChartDisplay() {
            const curr = currencyData[activeCurrency];
            const pkg = curr.packages[activeChartTierIndex];

            document.querySelectorAll('.val-referral').forEach(el => el.innerText = pkg.signup);
            document.getElementById('val-match-center').innerText = pkg.m1;
        }

        // DOM Ready Initializations
        document.addEventListener('DOMContentLoaded', function() {

            // Hide Preloader
            setTimeout(() => {
                const preloader = document.getElementById('infinite-preloader');
                if(preloader) {
                    preloader.classList.add('fade-out');
                    document.body.classList.remove('is-loading');
                    setTimeout(() => preloader.remove(), 800);
                }
            }, 2000);

            // Back to Top Button Logic
            const backToTopBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.style.opacity = '1';
                } else {
                    backToTopBtn.style.opacity = '0';
                }
            });
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Owner Modal Population Logic
            const ownerData = {
                'primo': {
                    name: 'PRIMO ECALNE JR.',
                    img: './assets/image/team/Sir_Primo.png',
                    bio: 'I m Primo, a passionate entrepreneur driven by growth, purpose, and the desire to create meaningful opportunities through INFINITE. I believe success is built through consistency, vision, and the courage to dream beyond limits while continuously becoming a better version of yourself.<br><br>I am passionate about building a strong and positive community where people can grow together, support one another, and create opportunities that lead to long-term personal and financial growth.<br><br><a href="https://www.linkedin.com/in/primo-ecalne-3a87221a2" target="_blank" class="owner-linkedin"><i class="bi bi-linkedin"></i> Connect with me on LinkedIn</a>'
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

            // Initial render - Automatically loading KINA data
            switchCurrency('KINA');
        });

        // ==========================================
        // PAYMENT PROOF GALLERY - SHOW 6 FIRST, THEN MORE
        // ==========================================
        document.addEventListener('DOMContentLoaded', function () {
            const toggleBtn = document.getElementById('paymentProofToggle');
            const toggleText = document.getElementById('paymentProofToggleText');
            const hiddenProofs = document.querySelectorAll('.payment-proof-item.payment-proof-hidden');

            if (toggleBtn && hiddenProofs.length) {
                let expanded = false;

                toggleBtn.addEventListener('click', function () {
                    expanded = !expanded;

                    hiddenProofs.forEach(function (proof) {
                        proof.classList.toggle('is-visible', expanded);
                    });

                    toggleText.textContent = expanded ? 'Show Less Pictures' : 'View More Pictures';

                    if (!expanded) {
                        document.getElementById('payment-proof-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        });

