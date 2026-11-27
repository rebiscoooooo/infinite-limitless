YOUR INFINITE WORLD PLAN ACCESS CREDENTIALS
INFINITE: Live Limitless

Dear {{ $registration->full_name }},

Welcome to the INFINITE World Plan community! Here are your secure account details:

ACCOUNT DETAILS:
- Member Name: {{ $registration->full_name }}
- Portal Username: {{ $registration->username }}
- Member Ref: WP-{{ str_pad((string) $registration->id, 5, '0', STR_PAD_LEFT) }}
- Package: {{ $registration->package_type ?? 'World Plan' }}

Login Portal: {{ url('/login') }}

Security Notice: Never share your account password. INFINITE support staff will never request your password.

---
INFINITE: Live Limitless - Global Executive Office
Registered Address: Manila, Philippines
Support: admin@infinite-limitless.com
