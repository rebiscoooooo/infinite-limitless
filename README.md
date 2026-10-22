# INFINITE: Live Limitless Platform
### Enterprise Modernization from Legacy Procedural PHP to Laravel 11 + React (Inertia.js v2) + Tailwind CSS

---

## 1. System Overview & Technology Stack

The **INFINITE: Live Limitless** platform has been completely re-architected from legacy procedural PHP files, Bootstrap 5, and jQuery into an enterprise-grade, full-stack reactive web application.

- **Backend Framework:** [Laravel 11.x](https://laravel.com/) (PHP 8.2+)
- **Frontend Engine:** [Inertia.js v2](https://inertiajs.com/) with React 18
- **Styling Architecture:** [Tailwind CSS 3.4](https://tailwindcss.com/) with custom `ch` brand palette & responsive clamp typography
- **Typography:** *Bebas Neue* (display headers), *Barlow* (body & metrics), *Great Vibes* (luxury script accents)
- **Icons & Transitions:** Lucide React & Framer Motion
- **ORM & Database:** Eloquent ORM with MariaDB/MySQL (`u803120420_infinite_db`) and SQLite local dev support
- **Authentication & Security:** Bcrypt hashing, custom `admin.auth` guard, `LogAdminActivity` telemetry middleware, CSRF & Form Request validation

---

## 2. Directory Structure & Key File Map

```text
_public_html/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php             # GET /
│   │   │   ├── ProductController.php          # GET /barley, /olamour
│   │   │   ├── CompanyController.php          # GET /info (Legitimacy & dynamic executive tiers)
│   │   │   ├── CountryController.php          # GET /select-country
│   │   │   ├── RegistrationController.php     # GET /join-community/{country}
│   │   │   ├── WorldPlanController.php        # GET /world-plan, POST /register-world-plan
│   │   │   ├── InquiryController.php          # POST /inquiries
│   │   │   └── Admin/
│   │   │       ├── AuthController.php         # Admin login / logout
│   │   │       ├── DashboardController.php    # Admin metrics, visits, click stats
│   │   │       ├── InquiryAdminController.php # Inquiry read/unread toggles, delete
│   │   │       ├── WorldPlanAdminController.php # Member approvals & proof audit
│   │   │       └── ActivityLogAdminController.php # Security audit telemetry
│   │   ├── Middleware/
│   │   │   ├── AuthenticateAdmin.php          # Admin session verification
│   │   │   ├── LogAdminActivity.php           # Audit logging IP, OS, Browser, Device
│   │   │   └── HandleInertiaRequests.php      # Global Inertia shared props
│   │   └── Requests/
│   │       ├── StoreInquiryRequest.php        # Inquiry validation
│   │       └── StoreWorldPlanRequest.php      # World plan multipart form validation
│   ├── Mail/
│   │   ├── InquiryReceivedAdminMail.php       # Queued admin notification
│   │   ├── InquiryConfirmationUserMail.php    # User auto-responder
│   │   └── WorldPlanStatusUpdatedMail.php     # Approval/rejection notification
│   └── Models/
│       ├── AdminUser.php                      # Admin backoffice accounts
│       ├── ActivityLog.php                    # Action and device telemetry
│       ├── AdminLog.php                       # Audit trails
│       ├── Inquiry.php                        # Contact and order leads
│       ├── MemberRegistration.php             # Community registrations
│       ├── WorldPlanRegistration.php          # Global plan & payment proofs
│       ├── ProductStat.php                    # Product popularity metrics
│       └── SiteStat.php                       # Traffic & engagement metrics
├── database/
│   ├── migrations/                            # 11 clean relational migrations
│   └── seeders/
│       ├── AdminUserSeeder.php                # Default admin account
│       ├── StatsSeeder.php                    # Product and site stats
│       ├── WorldPlanSeeder.php                # Approved executive leaders
│       └── DatabaseSeeder.php                 # Master seeder
├── resources/
│   ├── css/app.css                            # Glassmorphism, dot-matrix, themes
│   ├── js/
│   │   ├── app.jsx                            # Inertia bootstrap
│   │   ├── Components/
│   │   │   ├── AppNavbar.jsx                  # Transparent-to-blur navigation
│   │   │   ├── AppFooter.jsx                  # Footer with inquiry & modal triggers
│   │   │   ├── Preloader.jsx                  # Smooth React fade preloader
│   │   │   ├── BackToTop.jsx                  # Scroll progress indicator
│   │   │   ├── FlashToast.jsx                 # Inertia session flash notices
│   │   │   ├── OwnerModal.jsx                 # Founders biographies
│   │   │   ├── InquiryForm.jsx                # Reactive inquiry form
│   │   │   ├── CountryFlagMarquee.jsx         # Infinite scroll flag ticker
│   │   │   ├── PartnerCarousel.jsx            # Global partner cards
│   │   │   ├── TestimonialGrid.jsx            # Interactive split-card before/after
│   │   │   └── ProductQuickViewModal.jsx      # Product dossier quick view
│   │   ├── Layouts/
│   │   │   ├── AppLayout.jsx                  # Public site layout
│   │   │   └── AdminLayout.jsx                # Secure admin backoffice layout
│   │   └── Pages/
│   │       ├── Home.jsx                       # Modern landing showcase
│   │       ├── Barley.jsx                     # Dynamic interactive product card
│   │       ├── Olamour.jsx                    # Skincare ceremony & dossier
│   │       ├── Info.jsx                       # Proof of Legitimacy & Executive Wall
│   │       ├── SelectCountry.jsx              # Regional distribution portal
│   │       ├── JoinCommunity.jsx              # Package switcher & 8-way comp plan
│   │       ├── WorldPlan.jsx                  # Multipart form & proof submission
│   │       └── Admin/
│   │           ├── Login.jsx                  # Secure admin portal
│   │           ├── Dashboard.jsx              # Metrics & audit summary
│   │           ├── Inquiries.jsx              # Lead management
│   │           ├── WorldPlanRegistrations.jsx # Proof audit & approval workflow
│   │           └── ActivityLogs.jsx           # Audit trail log viewer
│   └── views/
│       ├── app.blade.php                      # Inertia root layout template
│       └── emails/                            # Responsive HTML email templates
├── legacy_archive/                            # Archived original procedural PHP
├── public/assets/                             # Optimized brand images, flags, gems
├── tailwind.config.js                         # Custom ch color tokens & typography
└── tests/Feature/InfiniteMigrationTest.php    # Automated feature test suite
```

---

## 3. Database Architecture & Migrations

All 11 relational tables adhere to strict Laravel schema conventions with indexes and typed columns:

1. **`users`**: General user accounts with bcrypt passwords.
2. **`admin_users`**: Dedicated backoffice administrators with login auditing.
3. **`activity_logs`**: Security telemetry capturing `admin_user`, `action_type`, `device_type`, `os_browser`, `ip_address`, and timestamps.
4. **`admin_logs`**: Granular administrative audit actions.
5. **`inquiries`**: Lead capture supporting subjects (`Order Product`, `Order Barley`, `Order Coffee`, `Order Gluta`, `Join Us`, `Feedback`) with `is_read` boolean flags.
6. **`members_registration`**: Community registrations with currency pricing, marketing day counters, and email timestamps.
7. **`world_plan_registrations`**: Global executive tier submissions with payment receipt file paths (`payment_proof`) and verification status (`Pending`, `Approved`, `Rejected`).
8. **`product_stats`**: Product click analytics with trend directions and status classes.
9. **`site_stats`**: Aggregate visitors, active sessions, and bounce rate tracking.
10. **`messages`**: Internal communication channel.
11. **`sessions` & `cache`**: Database-driven high-performance session and cache drivers.

---

## 4. Design System & Tokens

Defined in `tailwind.config.js`:

```javascript
colors: {
  ch: {
    teal: '#14b8a6',
    'teal-darker': '#0f766e',
    'teal-light': '#5eead4',
    'dark-slate': '#0f172a',
    'slate-muted': '#64748b',
    white: '#ffffff',
    'bg-light': '#f8fafc',
    border: '#e2e8f0',
    yellow: '#f59e0b',
    'yellow-dk': '#d97706',
    'yellow-light': '#fef08a',
  }
}
```

- **Glassmorphism:** `backdrop-blur-md bg-slate-900/80 border border-white/10 shadow-glass`
- **Hero Dot-Matrix:** Radial gradient layered background on `bg-ch-dark-slate`
- **Dynamic Product Card:** Transitions seamlessly between `#2f1b02` (Infinite Robustus), `#2d4a22` (Infinite Barley), and `#1E3A5F` (White Plus Glutathione)

---

## 5. Admin Backoffice Access

- **Login URL:** `http://localhost:8000/admin/login` (or `/login`)
- **Default Username:** `admin`
- **Default Password:** `Infinite#1230`

Features available in Admin:
- **Dashboard:** Real-time metrics counters, product click distribution, and live security telemetry feed.
- **Inquiry Management:** Filter unread inquiries, toggle read/unread status, delete inquiries, and view lead contact details.
- **World Plan Auditing:** Inspect uploaded payment receipts directly in-modal, approve or reject applications, and update membership status.
- **Activity Log Auditing:** Inspect IP addresses, OS, browser user agents, and timestamps for all administrative operations.

---

## 6. Local Setup & Verification

### Prerequisites
- PHP 8.2+
- Composer 2.x
- Node.js 18+ and NPM

### Quickstart Commands
```bash
# 1. Install dependencies (already executed)
composer install
npm install

# 2. Environment configuration
cp .env.example .env
php artisan key:generate

# 3. Database migrations & seeders (already configured with SQLite)
php artisan migrate:fresh --seed

# 4. Storage symlink
php artisan storage:link

# 5. Build frontend production assets
npm run build

# 6. Run development server
php artisan serve --port=8000
```

### Running Automated Tests
```bash
php artisan test --filter=InfiniteMigrationTest
```
All **8 automated feature tests with 125 assertions** pass out of the box.

---

## 7. MariaDB / MySQL Production Deployment

To connect to your live database (`u803120420_infinite_db`):
1. In `.env`, change:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=u803120420_infinite_db
   DB_USERNAME=u803120420_infinite_user
   DB_PASSWORD=your_secure_password_here
   ```
2. Run migrations and seeders:
   ```bash
   php artisan migrate --force
   php artisan db:seed --force
   ```
3. Optimize configuration for production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
#   i n f i n i t e - l i m i t l e s s  
 