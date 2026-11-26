<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AcademyStatusUpdatedMail;
use App\Models\AcademyAnnouncement;
use App\Models\AcademyMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AcademyAdminController extends Controller
{
    /**
     * Display the Academy Verification and Member Management Console.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status');
        $tier = $request->query('rank_tier');
        $search = $request->query('q');

        $query = AcademyMember::query();

        if ($status && in_array($status, ['Pending', 'Approved', 'Rejected'])) {
            $query->where('status', $status);
        }

        if ($tier) {
            $query->where('rank_tier', $tier);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('member_id', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        $members = $query->latest()->paginate(15)->withQueryString();

        // Statistics
        $counts = [
            'total' => AcademyMember::count(),
            'pending' => AcademyMember::where('status', 'Pending')->count(),
            'approved' => AcademyMember::where('status', 'Approved')->count(),
            'rejected' => AcademyMember::where('status', 'Rejected')->count(),
            'tiers' => [
                'Rookie' => AcademyMember::where('status', 'Approved')->where('rank_tier', 'Rookie')->count(),
                'Elite' => AcademyMember::where('status', 'Approved')->where('rank_tier', 'Elite')->count(),
                'Master' => AcademyMember::where('status', 'Approved')->where('rank_tier', 'Master')->count(),
                'Grand Master' => AcademyMember::where('status', 'Approved')->where('rank_tier', 'Grand Master')->count(),
                'Legend' => AcademyMember::where('status', 'Approved')->where('rank_tier', 'Legend')->count(),
            ],
        ];

        // Announcements
        $announcements = AcademyAnnouncement::latest()->get();

        return Inertia::render('Admin/VerifyAcademy', [
            'members' => $members,
            'counts' => $counts,
            'announcements' => $announcements,
            'filters' => [
                'status' => $status,
                'rank_tier' => $tier,
                'q' => $search,
            ],
            'availableTiers' => [
                [
                    'tier' => 'Rookie',
                    'stars' => 1,
                    'stars_display' => '★',
                    'emblem' => 'Mountain Ascent',
                    'theme' => 'Silver / Platinum',
                    'description' => '1 Star - Foundational ascending member with rising potential.',
                ],
                [
                    'tier' => 'Elite',
                    'stars' => 2,
                    'stars_display' => '★★',
                    'emblem' => 'Growth Chart & Upward Trend',
                    'theme' => 'Electric Blue',
                    'description' => '2 Stars - Proven performance pioneer on high upward trajectory.',
                ],
                [
                    'tier' => 'Master',
                    'stars' => 3,
                    'stars_display' => '★★★',
                    'emblem' => 'Golden Lion Sovereign',
                    'theme' => 'Radiant Gold',
                    'description' => '3 Stars - Fearless leader and accomplished master builder.',
                ],
                [
                    'tier' => 'Grand Master',
                    'stars' => 4,
                    'stars_display' => '★★★★',
                    'emblem' => 'Royal Eagle Imperial Wing',
                    'theme' => 'Imperial Purple',
                    'description' => '4 Stars - Strategic vanguard with eagle-eyed vision and mastery.',
                ],
                [
                    'tier' => 'Legend',
                    'stars' => 5,
                    'stars_display' => '★★★★★',
                    'emblem' => 'Imperial Crown of Prestige',
                    'theme' => 'Crimson Ruby & Gold',
                    'description' => '5 Stars - The supreme apex tier of leadership and legacy achievement.',
                ],
            ],
        ]);
    }

    /**
     * Update application status (Approve with Rank Selection or Reject with Reason).
     */
    public function updateStatus(Request $request, AcademyMember $member): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:Approved,Rejected,Pending'],
            'rank_tier' => ['nullable', 'required_if:status,Approved', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'rejection_reason' => ['nullable', 'string', 'max:1000'],
            'admin_notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $status = $validated['status'];
        $member->status = $status;
        $member->admin_notes = $validated['admin_notes'] ?? $member->admin_notes;

        if ($status === 'Approved') {
            $member->rank_tier = $validated['rank_tier'];
            $member->approved_at = now();
            $member->rejection_reason = null;
        } elseif ($status === 'Rejected') {
            $member->rejection_reason = $validated['rejection_reason'] ?? 'Application requirements not met.';
        } else {
            $member->rejection_reason = null;
        }

        $member->save();

        // Dispatch status update email to user
        try {
            Mail::to($member->email)->send(new AcademyStatusUpdatedMail($member));
        } catch (\Throwable $e) {
            Log::error("Failed sending Academy status update email to {$member->email}: " . $e->getMessage());
        }

        $msg = $status === 'Approved'
            ? "Member {$member->full_name} has been APPROVED as [{$member->rank_tier}]. Official notification email dispatched."
            : ($status === 'Rejected'
                ? "Application for {$member->full_name} was marked REJECTED. Notification email dispatched."
                : "Application for {$member->full_name} status reset to PENDING.");

        return back()->with('success', $msg);
    }

    /**
     * Edit full member details from Admin.
     */
    public function update(Request $request, AcademyMember $member): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'middle_initial' => ['nullable', 'string', 'max:10'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone_country_code' => ['required', 'string', 'max:10'],
            'phone_number' => ['required', 'string', 'max:25'],
            'email' => ['required', 'email', 'max:150', 'unique:academy_members,email,' . $member->id],
            'address' => ['required', 'string', 'max:1000'],
            'status' => ['required', 'in:Pending,Approved,Rejected'],
            'rank_tier' => ['nullable', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'admin_notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $member->update($validated);

        return back()->with('success', "Member details for {$member->full_name} successfully updated.");
    }

    /**
     * Delete an Academy Member.
     */
    public function destroy(AcademyMember $member): RedirectResponse
    {
        $name = $member->full_name;

        if ($member->profile_picture && Storage::disk('public')->exists($member->profile_picture)) {
            Storage::disk('public')->delete($member->profile_picture);
        }

        $member->delete();

        return back()->with('success', "Member {$name} deleted successfully.");
    }

    /**
     * Store new announcement for the Academy portal.
     */
    public function storeAnnouncement(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,gif', 'max:5120'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'announcement_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $imagePath = $file->storeAs('academy_announcements', $filename, 'public');
        }

        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';

        AcademyAnnouncement::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'image_path' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'created_by' => $adminName,
        ]);

        return back()->with('success', 'Announcement published successfully.');
    }

    /**
     * Toggle active status of an announcement.
     */
    public function toggleAnnouncement(AcademyAnnouncement $announcement): RedirectResponse
    {
        $announcement->update([
            'is_active' => !$announcement->is_active,
        ]);

        $state = $announcement->is_active ? 'Activated' : 'Deactivated';
        return back()->with('success', "Announcement {$state}.");
    }

    /**
     * Delete an announcement.
     */
    public function deleteAnnouncement(AcademyAnnouncement $announcement): RedirectResponse
    {
        if ($announcement->image_path && Storage::disk('public')->exists($announcement->image_path)) {
            Storage::disk('public')->delete($announcement->image_path);
        }

        $announcement->delete();

        return back()->with('success', 'Announcement removed successfully.');
    }
}
