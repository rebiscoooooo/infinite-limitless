WORLD PLAN REGISTRATION STATUS UPDATE
INFINITE: Live Limitless

Dear {{ $registration->full_name }},

Your registration status has been updated:

STATUS: {{ strtoupper($registration->status) }}
REFERENCE ID: WP-{{ str_pad((string) $registration->id, 5, '0', STR_PAD_LEFT) }}
PACKAGE: {{ $registration->package_type ?? 'World Plan' }}

@if ($registration->status === 'Approved')
Congratulations! Your World Plan registration has been officially APPROVED.
Your package invoice and welcome documentation are attached to this email.
@elseif ($registration->status === 'Rejected')
Your application was not approved.
Reason: {{ $registration->rejection_reason ?? 'Verification requirements not fulfilled.' }}
@endif

---
INFINITE: Live Limitless - Global Executive Office
Registered Address: Manila, Philippines
Contact: admin@infinite-limitless.com
