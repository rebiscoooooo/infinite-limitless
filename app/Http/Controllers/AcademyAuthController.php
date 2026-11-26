<?php

namespace App\Http\Controllers;

use App\Models\AcademyAnnouncement;
use App\Models\AcademyMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AcademyAuthController extends Controller
{
    /**
     * Show the Academy Registration Form.
     */
    public function showRegister(): Response
    {
        return Inertia::render('Academy/Register', [
            'countryCodes' => $this->getCountryDialCodes(),
        ]);
    }

    /**
     * Handle member registration submission.
     */
    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'middle_initial' => ['nullable', 'string', 'max:10'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone_country_code' => ['required', 'string', 'max:10'],
            'phone_number' => ['required', 'string', 'max:25'],
            'email' => ['required', 'string', 'email', 'max:150', 'unique:academy_members,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'address' => ['required', 'string', 'max:1000'],
            'profile_picture' => ['required', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'terms' => ['accepted'],
        ], [
            'profile_picture.required' => 'Please upload a formal profile picture (JPEG, PNG, WebP, or GIF).',
            'terms.accepted' => 'You must agree to the Terms and Conditions to proceed with registration.',
        ]);

        // Upload Profile Picture
        $profilePath = null;
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = 'academy_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $profilePath = $file->storeAs('academy_profiles', $filename, 'public');
        }

        // Create member with Pending status
        $member = AcademyMember::create([
            'first_name' => $validated['first_name'],
            'middle_initial' => $validated['middle_initial'] ? strtoupper(trim(str_replace('.', '', $validated['middle_initial']))) : null,
            'last_name' => $validated['last_name'],
            'phone_country_code' => $validated['phone_country_code'],
            'phone_number' => $validated['phone_number'],
            'email' => $validated['email'],
            'password' => $validated['password'], // Casts will hash automatically
            'address' => $validated['address'],
            'profile_picture' => $profilePath,
            'status' => 'Pending',
            'rank_tier' => null,
            'agreed_terms' => 'Yes',
        ]);

        // Put reference info in session for verification confirmation page
        session()->flash('submitted_member', [
            'member_id' => $member->member_id,
            'full_name' => $member->full_name,
            'email' => $member->email,
        ]);

        return redirect()->route('academy.verify')->with('success', 'Your application to the Legacy Club Academy has been submitted successfully and is now pending executive review.');
    }

    /**
     * Show Application Pending Verification Page.
     */
    public function showVerify(): Response
    {
        $submitted = session('submitted_member');

        return Inertia::render('Academy/Verify', [
            'submittedMember' => $submitted,
        ]);
    }

    /**
     * Show Academy Dedicated Login Page.
     */
    public function showLogin(): Response|RedirectResponse
    {
        if (Auth::guard('academy')->check()) {
            return redirect()->route('academy.portal');
        }

        return Inertia::render('Academy/Login');
    }

    /**
     * Authenticate Academy Member.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $member = AcademyMember::where('email', $credentials['email'])->first();

        if (!$member || !Hash::check($credentials['password'], $member->password)) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->withInput($request->only('email'));
        }

        // Check Membership Status
        if ($member->status === 'Pending') {
            return back()->withErrors([
                'email' => 'Your application (Member ID: ' . $member->member_id . ') is currently PENDING review by the Executive Board. You will be notified via email once approved.',
            ])->withInput($request->only('email'))->with('member_status', 'Pending');
        }

        if ($member->status === 'Rejected') {
            $reasonText = $member->rejection_reason ? " Reason: {$member->rejection_reason}" : '';
            return back()->withErrors([
                'email' => 'Your application was not approved by administration.' . $reasonText . ' Please contact support if you need assistance.',
            ])->withInput($request->only('email'))->with('member_status', 'Rejected');
        }

        if ($member->status !== 'Approved') {
            return back()->withErrors([
                'email' => 'Your account status (' . $member->status . ') does not permit portal access.',
            ])->withInput($request->only('email'));
        }

        // Log the member in
        Auth::guard('academy')->login($member, $request->boolean('remember'));

        // Update login audit timestamp
        $member->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        $request->session()->regenerate();

        return redirect()->intended(route('academy.portal'))->with('success', 'Welcome back, ' . $member->full_name . '!');
    }

    /**
     * Log out of the Academy portal.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('academy')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('academy.login')->with('success', 'You have been successfully logged out of the Academy portal.');
    }

    /**
     * Show Academy Member Portal (plain black and white styling).
     */
    public function showPortal(): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user();

        // Get active announcements
        $announcements = AcademyAnnouncement::active()
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Academy/Profile', [
            'member' => $member->toSharedArray(),
            'announcements' => $announcements,
        ]);
    }

    /**
     * Update member profile info from portal.
     */
    public function updateProfile(Request $request): RedirectResponse
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user();

        $validated = $request->validate([
            'phone_country_code' => ['required', 'string', 'max:10'],
            'phone_number' => ['required', 'string', 'max:25'],
            'address' => ['required', 'string', 'max:1000'],
            'profile_picture' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'current_password' => ['nullable', 'string'],
            'new_password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        if (!empty($validated['current_password'])) {
            if (!Hash::check($validated['current_password'], $member->password)) {
                return back()->withErrors(['current_password' => 'The provided current password is incorrect.']);
            }
            if (!empty($validated['new_password'])) {
                $member->password = $validated['new_password'];
            }
        }

        if ($request->hasFile('profile_picture')) {
            if ($member->profile_picture && Storage::disk('public')->exists($member->profile_picture)) {
                Storage::disk('public')->delete($member->profile_picture);
            }
            $file = $request->file('profile_picture');
            $filename = 'academy_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $member->profile_picture = $file->storeAs('academy_profiles', $filename, 'public');
        }

        $member->phone_country_code = $validated['phone_country_code'];
        $member->phone_number = $validated['phone_number'];
        $member->address = $validated['address'];
        $member->save();

        return back()->with('success', 'Profile information successfully updated.');
    }

    /**
     * International Dial Codes List.
     */
    private function getCountryDialCodes(): array
    {
        return [
            ['code' => '+63', 'country' => 'Philippines', 'flag' => '🇵🇭'],
            ['code' => '+1', 'country' => 'United States / Canada', 'flag' => '🇺🇸'],
            ['code' => '+44', 'country' => 'United Kingdom', 'flag' => '🇬🇧'],
            ['code' => '+61', 'country' => 'Australia', 'flag' => '🇦🇺'],
            ['code' => '+65', 'country' => 'Singapore', 'flag' => '🇸🇬'],
            ['code' => '+81', 'country' => 'Japan', 'flag' => '🇯🇵'],
            ['code' => '+82', 'country' => 'South Korea', 'flag' => '🇰🇷'],
            ['code' => '+971', 'country' => 'United Arab Emirates', 'flag' => '🇦🇪'],
            ['code' => '+966', 'country' => 'Saudi Arabia', 'flag' => '🇸🇦'],
            ['code' => '+852', 'country' => 'Hong Kong', 'flag' => '🇭🇰'],
            ['code' => '+886', 'country' => 'Taiwan', 'flag' => '🇹🇼'],
            ['code' => '+60', 'country' => 'Malaysia', 'flag' => '🇲🇾'],
            ['code' => '+62', 'country' => 'Indonesia', 'flag' => '🇮🇩'],
            ['code' => '+66', 'country' => 'Thailand', 'flag' => '🇹🇭'],
            ['code' => '+84', 'country' => 'Vietnam', 'flag' => '🇻🇳'],
            ['code' => '+91', 'country' => 'India', 'flag' => '🇮🇳'],
            ['code' => '+49', 'country' => 'Germany', 'flag' => '🇩🇪'],
            ['code' => '+33', 'country' => 'France', 'flag' => '🇫🇷'],
            ['code' => '+39', 'country' => 'Italy', 'flag' => '🇮🇹'],
            ['code' => '+34', 'country' => 'Spain', 'flag' => '🇪🇸'],
            ['code' => '+226', 'country' => 'Burkina Faso', 'flag' => '🇧🇫'],
            ['code' => '+675', 'country' => 'Papua New Guinea', 'flag' => '🇵🇬'],
            ['code' => '+234', 'country' => 'Nigeria', 'flag' => '🇳🇬'],
            ['code' => '+27', 'country' => 'South Africa', 'flag' => '🇿🇦'],
            ['code' => '+55', 'country' => 'Brazil', 'flag' => '🇧🇷'],
            ['code' => '+52', 'country' => 'Mexico', 'flag' => '🇲🇽'],
            ['code' => '+64', 'country' => 'New Zealand', 'flag' => '🇳🇿'],
        ];
    }
}
