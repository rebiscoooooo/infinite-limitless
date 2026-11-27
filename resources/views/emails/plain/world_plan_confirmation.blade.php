APPLICATION RECEIVED - INFINITE WORLD PLAN
INFINITE: Live Limitless

Dear {{ $registration->full_name }},

Thank you for submitting your World Plan registration. We have successfully received your application:

APPLICATION DETAILS:
- Reference ID: WP-{{ str_pad((string) $registration->id, 5, '0', STR_PAD_LEFT) }}
- Package Chosen: {{ $registration->package_type ?? 'World Plan' }}
- Submission Date: {{ now()->format('F d, Y h:i A') }}

Our compliance and verification team is currently reviewing your payment proof and documents. You will receive an email update once verification is complete.

---
INFINITE: Live Limitless - Global Executive Office
Registered Address: Manila, Philippines
Contact: admin@infinite-limitless.com
