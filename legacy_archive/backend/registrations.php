<?php
session_start();
require 'db.php';
if (!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Contact Inquiries | Infinite Portal</title>
    <link rel="icon" href="../assets/image/logo-infinite.webp" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/styles.css" />
    <style>
        :root { --ch-bg-light: #f8fafc; --ch-border: #e2e8f0; --ch-teal: #14b8a6; --ch-dark-slate: #0f172a; --ch-slate-muted: #64748b; }
        body { background: var(--ch-bg-light); font-family: 'Barlow', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        #wrapper { display: flex; width: 100%; min-height: 100vh; }
        #sidebar-wrapper { min-width: 260px; max-width: 260px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; transition: left 0.3s ease-in-out; border-right: 1px solid rgba(148, 163, 184, 0.15); z-index: 1050; }
        .sidebar-heading { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .list-group-item { background-color: transparent; border: none; color: #cbd5e1; padding: 0.85rem 1.25rem; font-weight: 500; border-left: 3px solid transparent; transition: all 0.2s; }
        .list-group-item:hover, .list-group-item.active { background-color: rgba(20, 184, 166, 0.1); color: var(--ch-teal); border-left-color: var(--ch-teal); }
        .list-group-item i { width: 24px; text-align: center; margin-right: 10px; color: #94a3b8; }
        #page-content-wrapper { min-width: 0; width: 100%; display: flex; flex-direction: column; }
        .top-navbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--ch-border); padding: 1rem 1.5rem; position: sticky; top: 0; z-index: 1000; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .dashboard-card { background: #fff; border: 1px solid var(--ch-border); border-radius: 1.25rem; padding: 25px; box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.05); }
        .table-custom th { color: var(--ch-slate-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid var(--ch-border); padding: 1rem; white-space: nowrap; }
        .table-custom td { padding: 1rem; vertical-align: middle; color: var(--ch-dark-slate); border-bottom: 1px solid var(--ch-border); }
        
        /* Custom UI for Tabs */
        .custom-tabs { gap: 10px; }
        .custom-tabs .nav-link { background: #fff; border: 1px solid var(--ch-border); border-radius: 10px; color: var(--ch-slate-muted) !important; font-weight: 700; padding: 12px 20px; transition: all 0.3s; }
        .custom-tabs .nav-link:hover { background: #f1f5f9; }
        .custom-tabs .nav-link.active { background: var(--ch-teal) !important; color: #fff !important; border-color: var(--ch-teal) !important; box-shadow: 0 4px 10px rgba(20, 184, 166, 0.3); }

        /* Custom Input Styles */
        .form-control-custom { border-radius: 0.5rem; border: 1px solid #cbd5e1; padding: 0.75rem 1rem; font-size: 0.95rem; }
        .form-control-custom:focus { border-color: var(--ch-teal); box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15); }

        #sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1040; opacity: 0; }
        @media (max-width: 768px) { #sidebar-wrapper { position: fixed; left: -260px; height: 100vh; } body.sb-sidenav-toggled #sidebar-wrapper { left: 0; } body.sb-sidenav-toggled #sidebar-overlay { display: block; opacity: 1; } }
    </style>
</head>
<body>
    <div id="wrapper">
        <?php include 'components/sidebar.php'; ?>

        <div id="page-content-wrapper">
            <?php include 'components/navbar.php'; ?>

            <div class="container-fluid p-4 p-lg-5">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                    <div>
                        <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ch-teal);">System Management</span>
                        <h2 style="font-size: clamp(2rem, 4vw, 2.5rem); line-height: 1; color: var(--ch-dark-slate); font-weight: 800; margin-top: 5px;">
                            Contact <span style="color: var(--ch-teal);">Inquiries</span>
                        </h2>
                    </div>
                    <div class="d-flex gap-2 flex-wrap">
                        <button onclick="fetchAllData()" class="btn btn-outline-secondary bg-white" style="font-size: 0.85rem; border-radius: 0.85rem; font-weight: 600;"><i class="fa-solid fa-rotate-right me-1"></i> Sync Data</button>
                    </div>
                </div>

                <div>
                        <div class="dashboard-card">
                            <div class="table-responsive">
                                <table class="table table-custom table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th><i class="fa-regular fa-clock me-1"></i> Date Received</th>
                                            <th><i class="fa-regular fa-user me-1"></i> Sender Info</th>
                                            <th><i class="fa-solid fa-tag me-1"></i> Subject</th>
                                            <th style="min-width: 200px;"><i class="fa-regular fa-comment me-1"></i> Message Snippet</th>
                                            <th class="text-center"><i class="fa-solid fa-bolt me-1"></i> Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="inqTableBody">
                                        <tr><td colspan="5" class="text-center py-5 text-muted"><i class="fa-solid fa-spinner fa-spin me-2"></i> Fetching...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


            </div>
        </div>
    </div>

    <div class="modal fade" id="viewInquiryModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="border-radius: 1rem; border: none; overflow: hidden;">
                <div class="modal-header" style="background: var(--ch-bg-light); border-bottom: 1px solid var(--ch-border);">
                    <h5 class="modal-title" style="font-weight: 700; color: var(--ch-dark-slate);">
                        <i class="fa-solid fa-envelope-open-text me-2" style="color: var(--ch-teal);"></i>Inquiry Details
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="mb-3 border-bottom pb-3">
                        <label class="text-muted" style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">From</label>
                        <div id="modal-inq-name" style="font-weight: 800; font-size: 1.1rem; color: var(--ch-dark-slate);"></div>
                        <a id="modal-inq-email" href="#" style="font-size: 0.9rem; color: var(--ch-teal); text-decoration: none;"></a>
                    </div>
                    <div class="mb-3">
                        <label class="text-muted" style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Subject</label>
                        <div id="modal-inq-subject" class="badge bg-light text-dark border p-2" style="font-size: 0.9rem; display: inline-block;"></div>
                    </div>
                    <div>
                        <label class="text-muted" style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Message</label>
                        <div id="modal-inq-message" style="background: #f8fafc; padding: 15px; border-radius: 10px; border: 1px solid #e2e8f0; color: var(--ch-dark-slate); white-space: pre-wrap; font-size: 0.95rem; max-height: 300px; overflow-y: auto;"></div>
                    </div>
                </div>
                <div class="modal-footer" style="border-top: none; padding: 0 1.5rem 1.5rem;">
                    <button type="button" class="btn btn-secondary w-100" style="border-radius: 0.85rem; font-weight: 600;" data-bs-dismiss="modal">Close Window</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="replyInquiryModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" style="border-radius: 1rem; border: none; overflow: hidden;">
                <div class="modal-header" style="background: var(--ch-dark-slate); border-bottom: none; color: white;">
                    <h5 class="modal-title" style="font-weight: 700;">
                        <i class="fa-solid fa-reply me-2" style="color: var(--ch-teal);"></i> Reply to Inquiry
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="replyForm" onsubmit="sendReply(event)">
                    <div class="modal-body p-4">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label text-muted fw-bold" style="font-size: 0.8rem; text-transform: uppercase;">To (Name)</label>
                                <input type="text" id="reply-inq-name" name="recipient_name" class="form-control form-control-custom bg-light" readonly>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted fw-bold" style="font-size: 0.8rem; text-transform: uppercase;">To (Email Address)</label>
                                <input type="email" id="reply-inq-email" name="recipient_email" class="form-control form-control-custom bg-light" readonly>
                            </div>
                            <div class="col-12">
                                <label class="form-label text-muted fw-bold" style="font-size: 0.8rem; text-transform: uppercase;">Subject</label>
                                <input type="text" id="reply-inq-subject" name="reply_subject" class="form-control form-control-custom" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label text-muted fw-bold" style="font-size: 0.8rem; text-transform: uppercase;">Your Message</label>
                                <textarea id="reply-inq-message" name="reply_message" class="form-control form-control-custom" rows="6" placeholder="Type your professional reply here..." required></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" style="border-top: 1px solid var(--ch-border); padding: 1.5rem; background: var(--ch-bg-light);">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" style="border-radius: 0.5rem; font-weight: 600;">Cancel</button>
                        <button type="submit" id="btn-send-reply" class="btn btn-primary px-4" style="background-color: var(--ch-teal); border: none; border-radius: 0.5rem; font-weight: 600;">
                            <i class="fa-solid fa-paper-plane me-1"></i> Send Reply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('menu-toggle').addEventListener('click', e => { e.preventDefault(); document.body.classList.toggle('sb-sidenav-toggled'); });
        document.getElementById('sidebar-overlay').addEventListener('click', () => { document.body.classList.remove('sb-sidenav-toggled'); });

        let inquiriesData = []; // Store data globally for the modal

        function fetchAllData() { 
            fetchInquiries();
        }

        // --- EXPORT API ---
        function exportCSVData(type) {
            const email = prompt("Enter the admin email address to receive the CSV data export:");
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                const formData = new FormData(); formData.append('email', email); formData.append('type', type);
                fetch('api_export_data.php', { method: 'POST', body: formData })
                .then(res => res.json()).then(data => alert(data.message));
            }
        }

        // Registrations logic removed

        // --- INQUIRIES LOGIC ---
        function viewInquiry(id) {
            const inq = inquiriesData.find(i => i.id === id);
            if (inq) {
                document.getElementById('modal-inq-name').innerText = inq.name;
                document.getElementById('modal-inq-email').innerText = inq.email;
                document.getElementById('modal-inq-email').href = "mailto:" + inq.email;
                document.getElementById('modal-inq-subject').innerText = inq.subject;
                document.getElementById('modal-inq-message').innerText = inq.message;
                
                const myModal = new bootstrap.Modal(document.getElementById('viewInquiryModal'));
                myModal.show();
            }
        }

        // NEW: Open Reply Modal Logic
        function openReplyModal(id) {
            const inq = inquiriesData.find(i => i.id === id);
            if (inq) {
                document.getElementById('reply-inq-name').value = inq.name;
                document.getElementById('reply-inq-email').value = inq.email;
                document.getElementById('reply-inq-subject').value = "Re: " + inq.subject;
                document.getElementById('reply-inq-message').value = ""; // Clear previous draft
                
                const myModal = new bootstrap.Modal(document.getElementById('replyInquiryModal'));
                myModal.show();
            }
        }

        // NEW: AJAX Logic to Send Reply
        function sendReply(event) {
            event.preventDefault();
            const btn = document.getElementById('btn-send-reply');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Sending...';
            btn.disabled = true;

            const formData = new FormData(document.getElementById('replyForm'));

            fetch('api_send_reply.php', { method: 'POST', body: formData })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                    if(data.status === 'success') {
                        // Close modal on success
                        bootstrap.Modal.getInstance(document.getElementById('replyInquiryModal')).hide();
                        document.getElementById('replyForm').reset();
                    }
                })
                .catch(err => {
                    alert("A network error occurred while sending the email.");
                    console.error(err);
                })
                .finally(() => {
                    btn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> Send Reply';
                    btn.disabled = false;
                });
        }

        function deleteInquiry(id) {
            if (confirm("Delete this contact inquiry permanently?")) {
                const formData = new FormData(); formData.append('id', id);
                fetch('api_delete_inquiry.php', { method: 'POST', body: formData })
                    .then(res => res.json()).then(data => { if (data.status === 'success') fetchInquiries(); });
            }
        }

        function fetchInquiries() {
            fetch('api_get_inquiries.php')
                .then(r => r.json())
                .then(data => {
                    inquiriesData = data; 
                    const tbody = document.getElementById('inqTableBody'); tbody.innerHTML = '';
                    if (data.length === 0) { tbody.innerHTML = `<tr><td colspan="5" class="text-center py-5 text-muted">No inquiries received yet.</td></tr>`; return; }
                    
                    data.forEach(inq => {
                        const dateStr = new Date(inq.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                        
                        let snippet = inq.message.length > 50 ? inq.message.substring(0, 50) + "..." : inq.message;

                        // Added the "Reply" button here
                        tbody.insertAdjacentHTML('beforeend', `<tr>
                            <td style="white-space: nowrap;"><div style="font-weight: 700; color: var(--ch-dark-slate);">${dateStr}</div></td>
                            <td><div style="font-weight: 800; font-size: 1.05rem;">${inq.name}</div><div style="font-size: 0.85rem; color: var(--ch-slate-muted);"><i class="fa-solid fa-envelope me-1"></i> ${inq.email}</div></td>
                            <td><span class="badge bg-light text-dark border p-2">${inq.subject}</span></td>
                            <td><div style="font-size: 0.9rem; color: var(--ch-slate-muted); font-style: italic;">"${snippet}"</div></td>
                            <td class="text-center" style="white-space: nowrap;">
                                <button onclick="viewInquiry(${inq.id})" class="btn btn-sm btn-outline-primary me-1" title="Read Full Message"><i class="fa-solid fa-book-open"></i> Read</button>
                                <button onclick="openReplyModal(${inq.id})" class="btn btn-sm btn-outline-success me-1" title="Reply to Inquiry"><i class="fa-solid fa-reply"></i> Reply</button>
                                <button onclick="deleteInquiry(${inq.id})" class="btn btn-sm btn-outline-danger" title="Delete Inquiry"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`);
                    });
                });
        }

        // INITIALIZE
        fetchAllData(); 
        setInterval(fetchAllData, 15000); // Sync every 15 secs silently
    </script>
</body>
</html>