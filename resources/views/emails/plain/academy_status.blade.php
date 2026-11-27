LEGACY CLUB ACADEMY - OFFICIAL STATUS UPDATE
INFINITE: Live Limitless

Dear {{ $member->full_name }},

Your application for the Legacy Club Academy has been updated:

STATUS: {{ strtoupper($member->status) }}
MEMBER ID: {{ $member->member_id }}

@if ($member->status === 'Approved')
CONGRATULATIONS & WELCOME TO THE ACADEMY!
Your membership application has been officially APPROVED.
Assigned Rank Tier: {{ strtoupper($member->rank_tier ?? 'ROOKIE') }}
Rank Title: {{ $rankDetails['title'] ?? 'Verified Member' }}

You can now log in to your official Academy Member Portal:
{{ $loginUrl }}
@else
APPLICATION NOT APPROVED
Reason: {{ $member->rejection_reason ?? 'Application requirements not met at this time.' }}

If you believe this was in error, contact support at: admin@infinite-limitless.com
@endif

---
INFINITE: LIVE LIMITLESS & LEGACY CLUB ACADEMY
Registered Business Address: Manila, Philippines
Official Executive System Communication
To contact support or manage email preferences: admin@infinite-limitless.com
