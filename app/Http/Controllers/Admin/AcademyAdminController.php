<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\RealtimeController;
use App\Mail\AcademyStatusUpdatedMail;
use App\Models\AcademyAnnouncement;
use App\Models\AcademyCertificate;
use App\Models\AcademyCommandment;
use App\Models\AcademyMember;
use App\Models\AcademyMemberRequirementProgress;
use App\Models\AcademyRankRequirement;
use App\Models\AcademyTraining;
use App\Models\AcademyTrainingProgress;
use App\Services\AcademyCertificateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        $eligibleFilter = $request->query('eligible'); // '1' or 'true'

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

        if ($eligibleFilter) {
            $query->where('status', 'Approved')->where('eligible_for_promotion', true);
        }

        $members = $query->latest()->paginate(15)->withQueryString();

        // Transform members to include dynamic progress stats
        $members->getCollection()->transform(function ($m) {
            $snapshot = $m->progressSnapshot();

            // Sync database boolean if eligible
            if ($snapshot['promotion']['is_eligible'] && !$m->eligible_for_promotion) {
                $m->update(['eligible_for_promotion' => true]);
            }

            return $m->toSharedArray($snapshot);
        });

        // Statistics (single grouped query instead of 8 separate COUNTs)
        $grouped = AcademyMember::selectRaw('status, rank_tier, COUNT(*) as total')
            ->groupBy('status', 'rank_tier')
            ->get();
        $countStatus = fn (string $s) => (int) $grouped->where('status', $s)->sum('total');
        $countTier = fn (string $t) => (int) $grouped->where('status', 'Approved')->where('rank_tier', $t)->sum('total');

        // Eligibility scan is expensive (loops every approved member) – cache briefly
        $eligibleCount = Cache::remember('academy_eligible_count', 15, function () {
            return AcademyMember::where('status', 'Approved')->get()
                ->filter(fn ($m) => $m->progressSnapshot()['promotion']['is_eligible'])
                ->count();
        });
        $pendingReflectionsCount = AcademyTrainingProgress::where('status', 'submitted')->count();

        $counts = [
            'total' => (int) $grouped->sum('total'),
            'pending' => $countStatus('Pending'),
            'approved' => $countStatus('Approved'),
            'rejected' => $countStatus('Rejected'),
            'eligible' => $eligibleCount,
            'pending_reflections' => $pendingReflectionsCount,
            'tiers' => [
                'Rookie' => $countTier('Rookie'),
                'Elite' => $countTier('Elite'),
                'Master' => $countTier('Master'),
                'Grand Master' => $countTier('Grand Master'),
                'Legend' => $countTier('Legend'),
            ],
        ];

        // Pending training reflections for review
        $pendingReflections = AcademyTrainingProgress::where('status', 'submitted')
            ->with(['member', 'training'])
            ->latest('submitted_at')
            ->take(30)
            ->get()
            ->map(function ($p) {
                $member = $p->member;
                $training = $p->training;
                $rank = $training?->rank_tier ?? $member?->rank_tier ?? 'Rookie';

                $levelTrainingIds = AcademyTraining::where(function ($q) use ($rank, $member) {
                        $q->where(function ($sub) use ($rank) {
                            $sub->where('rank_tier', $rank)->whereNull('target_member_id');
                        });
                        if ($member) {
                            $q->orWhere('target_member_id', $member->id);
                        }
                    })
                    ->where('is_published', true)
                    ->orderBy('order')
                    ->orderBy('id')
                    ->pluck('id');

                $lastTrainingId = $levelTrainingIds->last();
                $isLastModule = $training && $lastTrainingId !== null && (int) $training->id === (int) $lastTrainingId;

                return [
                    'id' => $p->id,
                    'member_id' => $p->member_id,
                    'member_name' => $member?->full_name,
                    'member_code' => $member?->member_id,
                    'member_rank' => $member?->rank_tier,
                    'training_id' => $p->training_id,
                    'training_title' => $training?->title_en,
                    'training_order' => $training?->order,
                    'total_level_modules' => $levelTrainingIds->count(),
                    'is_last_module' => $isLastModule,
                    'reflection_prompt' => $training?->reflection_prompt_en,
                    'reflection_submission' => $p->reflection_submission,
                    'submitted_at' => $p->submitted_at?->format('M d, Y h:i A'),
                ];
            });

        // Requirements definitions grouped by rank
        $rankRequirements = AcademyRankRequirement::orderBy('rank_tier')
            ->orderBy('order')
            ->get();

        // Trainings curriculum grouped by rank (with formatted downloadable attachment links)
        $rankTrainings = AcademyTraining::orderBy('rank_tier')
            ->orderBy('order')
            ->get()
            ->map(function (AcademyTraining $t) {
                $arr = $t->toArray();
                $arr['attachments'] = $t->getFormattedAttachments('admin.academy.trainings.attachments.download');
                return $arr;
            });

        // Tier commandments managed by admin
        $rankCommandments = \Illuminate\Support\Facades\Schema::hasTable('academy_commandments')
            ? AcademyCommandment::orderBy('rank_tier')
                ->orderBy('order')
                ->orderBy('id')
                ->get()
            : collect();

        // Announcements and Recognitions
        $announcements = AcademyAnnouncement::with('featuredMember')
            ->latest()
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'type' => $a->type ?? 'announcement',
                'badge_text' => $a->badge_text,
                'image_url' => $a->image_path ? asset('storage/' . $a->image_path) : null,
                'is_active' => (bool) $a->is_active,
                'created_by' => $a->created_by,
                'featured_member' => $a->featuredMember ? [
                    'id' => $a->featuredMember->id,
                    'full_name' => $a->featuredMember->full_name,
                    'avatar_url' => $a->featuredMember->avatar_url,
                    'rank_tier' => $a->featuredMember->rank_tier,
                ] : null,
                'created_at' => $a->created_at->format('M d, Y'),
            ]);

        // Recently issued certificates
        $certificates = AcademyCertificate::with('member')
            ->latest('issued_at')
            ->take(30)
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'member_id' => $c->member_id,
                'member_name' => $c->member?->full_name,
                'member_code' => $c->member?->member_id,
                'rank_tier' => $c->rank_tier,
                'certificate_number' => $c->certificate_number,
                'certificate_type' => $c->certificate_type,
                'issued_at' => $c->issued_at->format('M d, Y'),
                'download_url' => route('admin.academy.admin.certificates.download', $c->id),
                'is_custom' => (bool) $c->file_path,
                'file_name' => $c->file_path ? basename($c->file_path) : null,
            ]);

        return Inertia::render('Admin/VerifyAcademy', [
            'members' => $members,
            'counts' => $counts,
            'pendingReflections' => $pendingReflections,
            'rankRequirements' => $rankRequirements,
            'rankTrainings' => $rankTrainings,
            'rankCommandments' => $rankCommandments,
            'announcements' => $announcements,
            'certificates' => $certificates,
            'filters' => [
                'status' => $status,
                'rank_tier' => $tier,
                'q' => $search,
                'eligible' => $eligibleFilter,
            ],
            'availableTiers' => [
                [
                    'tier' => 'Rookie',
                    'stars' => 1,
                    'stars_display' => '★',
                    'emblem' => 'Mountain Ascent',
                    'theme' => 'Silver / Platinum',
                    'badge_image' => '/assets/image/academy/badge-rookie.png',
                    'description' => '1 Star - Foundational ascending member with rising potential.',
                ],
                [
                    'tier' => 'Elite',
                    'stars' => 2,
                    'stars_display' => '★★',
                    'emblem' => 'Growth Chart & Upward Trend',
                    'theme' => 'Electric Blue',
                    'badge_image' => '/assets/image/academy/badge-elite.png',
                    'description' => '2 Stars - Proven performance pioneer on high upward trajectory.',
                ],
                [
                    'tier' => 'Master',
                    'stars' => 3,
                    'stars_display' => '★★★',
                    'emblem' => 'Golden Lion Sovereign',
                    'theme' => 'Radiant Gold',
                    'badge_image' => '/assets/image/academy/badge-master.png',
                    'description' => '3 Stars - Fearless leader and accomplished master builder.',
                ],
                [
                    'tier' => 'Grand Master',
                    'stars' => 4,
                    'stars_display' => '★★★★',
                    'emblem' => 'Royal Eagle Imperial Wing',
                    'theme' => 'Imperial Purple',
                    'badge_image' => '/assets/image/academy/badge-grand-master.png',
                    'description' => '4 Stars - Strategic vanguard with eagle-eyed vision and mastery.',
                ],
                [
                    'tier' => 'Legend',
                    'stars' => 5,
                    'stars_display' => '★★★★★',
                    'emblem' => 'Imperial Crown of Prestige',
                    'theme' => 'Crimson Ruby & Gold',
                    'badge_image' => '/assets/image/academy/badge-legend.png',
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
            $rank = $validated['rank_tier'] ?? 'Rookie';
            $member->rank_tier = $rank;
            $member->approved_at = now();
            $member->rejection_reason = null;

            // Start 60-day development program & initialize progression records
            $member->initializeRankProgression($rank);
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
            ? "Member {$member->full_name} has been APPROVED as [{$member->rank_tier}]. 60-day program initialized."
            : ($status === 'Rejected'
                ? "Application for {$member->full_name} was marked REJECTED. Notification email dispatched."
                : "Application for {$member->full_name} status reset to PENDING.");

        RealtimeController::flushAcademyCache();

        return back()->with('success', $msg);
    }

    /**
     * Officially promote an eligible member to the next rank tier.
     */
    public function promoteMember(Request $request, AcademyMember $member): RedirectResponse
    {
        if (!$member->next_rank) {
            return back()->withErrors(['promote' => "Member is already at the highest apex rank of Legend."]);
        }

        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';
        $prevRank = $member->rank_tier;
        $success = $member->promoteToNextRank($adminName);

        if (!$success) {
            return back()->withErrors(['promote' => "Failed to promote member."]);
        }

        // Send congratulations promotion email
        try {
            Mail::to($member->email)->send(new AcademyStatusUpdatedMail($member));
        } catch (\Throwable $e) {
            Log::error("Failed sending promotion email to {$member->email}: " . $e->getMessage());
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', "Member {$member->full_name} has been officially PROMOTED from {$prevRank} to [{$member->rank_tier}]! A new 60-day development cycle has been initialized.");
    }

    /**
     * Update individual requirement progress for a member.
     */
    public function updateMemberRequirement(Request $request, AcademyMember $member, AcademyRankRequirement $requirement): RedirectResponse
    {
        $validated = $request->validate([
            'current_value' => ['required', 'integer', 'min:0'],
            'is_verified' => ['required', 'boolean'],
            'admin_notes' => ['nullable', 'string', 'max:500'],
        ]);

        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';

        $progress = AcademyMemberRequirementProgress::updateOrCreate(
            [
                'member_id' => $member->id,
                'requirement_id' => $requirement->id,
            ],
            [
                'current_value' => $validated['current_value'],
                'is_verified' => $validated['is_verified'],
                'admin_notes' => $validated['admin_notes'] ?? null,
                'verified_at' => $validated['is_verified'] ? now() : null,
                'updated_by' => $adminName,
            ]
        );

        // Check if member is now eligible for promotion
        $eligibility = $member->fresh()->promotion_eligibility;
        if ($eligibility['is_eligible']) {
            $member->update(['eligible_for_promotion' => true]);
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', "Progress updated for {$requirement->title_en} ({$progress->current_value}/{$requirement->target_value}). Remaining: {$progress->remaining}.");
    }

    /**
     * Review training reflection (Approve to unlock next training or Reject with feedback).
     */
    public function reviewTrainingReflection(Request $request, AcademyTrainingProgress $progress, AcademyCertificateService $certService): RedirectResponse
    {
        $validated = $request->validate([
            'action' => ['required', 'in:approve,reject'],
            'admin_feedback' => ['nullable', 'string', 'max:1000'],
            'certificate_file' => ['nullable', 'file', 'mimes:pdf,jpeg,jpg,png,webp', 'max:12288'],
        ]);

        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';
        $member = $progress->member;
        $training = $progress->training;

        if ($validated['action'] === 'approve') {
            $progress->update([
                'status' => 'approved',
                'reviewed_by' => $adminName,
                'admin_feedback' => $validated['admin_feedback'] ?: 'Reflection approved. Excellent comprehension demonstrated.',
                'reviewed_at' => now(),
            ]);

            // If admin provided a custom edited certificate file, confer and email it immediately
            if ($request->hasFile('certificate_file')) {
                $certService->issueOrUpdateCustomCertificate($member, $request->file('certificate_file'), $member->rank_tier);
            } else {
                // If all trainings for rank are completed, ensure certificate is issued
                $certService->ensureTrainingCompletionCertificate($member->fresh());
            }

            // Check if member is now eligible for promotion
            if ($member->fresh()->promotion_eligibility['is_eligible']) {
                $member->update(['eligible_for_promotion' => true]);
            }

            $msg = "Training \"{$training->title_en}\" for {$member->full_name} APPROVED. Next module unlocked!";
            if ($request->hasFile('certificate_file')) {
                $msg .= " Custom certificate conferred and emailed to {$member->email}!";
            }
        } else {
            $progress->update([
                'status' => 'rejected',
                'reviewed_by' => $adminName,
                'admin_feedback' => $validated['admin_feedback'] ?: 'Please expand on your reflections and submit your learnings again.',
                'reviewed_at' => now(),
            ]);

            $msg = "Training \"{$training->title_en}\" for {$member->full_name} marked REJECTED with feedback for resubmission.";
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', $msg);
    }

    /**
     * Directly grant / approve a training module for a specific member.
     */
    public function grantMemberTraining(Request $request, AcademyMember $member, AcademyTraining $training, AcademyCertificateService $certService): RedirectResponse
    {
        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';

        AcademyTrainingProgress::updateOrCreate(
            ['member_id' => $member->id, 'training_id' => $training->id],
            [
                'status' => 'approved',
                'reviewed_by' => $adminName,
                'reviewed_at' => now(),
                'reflection_submission' => $request->input('reflection_notes') ?: 'Conferred directly by Academy Administrator during leadership session.',
                'admin_feedback' => $request->input('admin_feedback') ?: 'Directly certified and accredited by Academy Executive Leadership.',
            ]
        );

        // Auto-issue certificate if 100% completed
        $certService->ensureTrainingCompletionCertificate($member->fresh());

        if ($member->fresh()->promotion_eligibility['is_eligible']) {
            $member->update(['eligible_for_promotion' => true]);
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', "Training #{$training->order} \"{$training->title_en}\" directly approved for {$member->full_name}. Next module unlocked!");
    }

    /**
     * Directly grant / approve ALL training modules of the current rank for a specific member.
     */
    public function grantAllMemberTrainings(Request $request, AcademyMember $member, AcademyCertificateService $certService): RedirectResponse
    {
        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';
        $rank = $member->rank_tier ?? 'Rookie';
        $trainings = AcademyTraining::where('rank_tier', $rank)->orderBy('order')->get();

        foreach ($trainings as $t) {
            AcademyTrainingProgress::updateOrCreate(
                ['member_id' => $member->id, 'training_id' => $t->id],
                [
                    'status' => 'approved',
                    'reviewed_by' => $adminName,
                    'reviewed_at' => now(),
                    'reflection_submission' => 'Conferred directly by Academy Administrator during intensive leadership track.',
                    'admin_feedback' => 'Directly certified and accredited by Academy Executive Leadership.',
                ]
            );
        }

        // Auto-issue certificate
        $certService->ensureTrainingCompletionCertificate($member->fresh());

        if ($member->fresh()->promotion_eligibility['is_eligible']) {
            $member->update(['eligible_for_promotion' => true]);
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', "All {$trainings->count()} training modules under {$rank} tier have been fully completed and accredited for {$member->full_name}! Completion Certificate generated.");
    }

    /**
     * Grant / approve a training module to ALL approved members in that rank tier.
     */
    public function grantTrainingToAllMembers(Request $request, AcademyTraining $training, AcademyCertificateService $certService): RedirectResponse
    {
        $adminName = auth()->guard('admin')->user()?->name ?? 'Administrator';
        $members = AcademyMember::where('status', 'Approved')
            ->where('rank_tier', $training->rank_tier)
            ->get();

        $count = 0;
        foreach ($members as $m) {
            AcademyTrainingProgress::updateOrCreate(
                ['member_id' => $m->id, 'training_id' => $training->id],
                [
                    'status' => 'approved',
                    'reviewed_by' => $adminName,
                    'reviewed_at' => now(),
                    'reflection_submission' => "Conferred in batch leadership seminar by Academy Administrator ({$adminName}).",
                    'admin_feedback' => 'Batch certified and accredited by Academy Executive Leadership.',
                ]
            );

            // Auto-issue certificate if all modules completed
            $certService->ensureTrainingCompletionCertificate($m->fresh());

            if ($m->fresh()->promotion_eligibility['is_eligible']) {
                $m->update(['eligible_for_promotion' => true]);
            }
            $count++;
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', "Training module #{$training->order} \"{$training->title_en}\" successfully granted and approved for {$count} active members in {$training->rank_tier} tier!");
    }

    /**
     * Upload custom edited certificate for a member.
     */
    public function uploadMemberCertificate(Request $request, AcademyMember $member, AcademyCertificateService $certService): RedirectResponse
    {
        $validated = $request->validate([
            'certificate_file' => ['required', 'file', 'mimes:pdf,jpeg,jpg,png,webp', 'max:12288'],
            'rank_tier' => ['nullable', 'in:Rookie,Elite,Master,Grand Master,Legend'],
        ]);

        $rank = $validated['rank_tier'] ?? ($member->rank_tier ?? 'Rookie');
        $cert = $certService->issueOrUpdateCustomCertificate($member, $request->file('certificate_file'), $rank);

        RealtimeController::flushAcademyCache();

        return back()->with('success', "Edited certificate for {$member->full_name} [{$rank}] uploaded, conferred, and emailed to {$member->email}!");
    }

    /**
     * Download certificate from admin side.
     */
    public function downloadCertificate(AcademyCertificate $certificate, AcademyCertificateService $service)
    {
        if ($certificate->file_path && Storage::disk('public')->exists($certificate->file_path)) {
            $ext = strtolower(pathinfo($certificate->file_path, PATHINFO_EXTENSION));
            $filename = "LegacyClubAcademy_Certificate_{$certificate->certificate_number}." . $ext;
            return Storage::disk('public')->download($certificate->file_path, $filename);
        }

        $pdf = $service->generatePdf($certificate);
        $filename = "LegacyClubAcademy_Certificate_{$certificate->certificate_number}.pdf";

        return $pdf->download($filename);
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

        $previousTier = $member->rank_tier;
        $member->update($validated);

        // If rank tier changed, initialize progression for the new tier while preserving all previous tier progress & points
        if (!empty($validated['rank_tier']) && $validated['rank_tier'] !== $previousTier) {
            $member->initializeRankProgression($validated['rank_tier']);
        }

        RealtimeController::flushAcademyCache();

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

        RealtimeController::flushAcademyCache();

        return back()->with('success', "Member {$name} deleted successfully.");
    }

    /**
     * Store new announcement or recognition post.
     */
    public function storeAnnouncement(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'type' => ['nullable', 'in:announcement,recognition,weekly_achiever,training_finisher'],
            'badge_text' => ['nullable', 'string', 'max:60'],
            'featured_member_id' => ['nullable', 'exists:academy_members,id'],
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
            'type' => $validated['type'] ?? 'announcement',
            'badge_text' => $validated['badge_text'] ?? null,
            'featured_member_id' => $validated['featured_member_id'] ?? null,
            'image_path' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'created_by' => $adminName,
            'published_at' => now(),
        ]);

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Announcement / Recognition published successfully.');
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
        RealtimeController::flushAcademyCache();

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

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Announcement removed successfully.');
    }

    /**
     * Store new training module (bilingual) with optional multi-file attachments.
     */
    public function storeTraining(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rank_tier' => ['required', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'target_member_id' => ['nullable', 'exists:academy_members,id'],
            'order' => ['required', 'integer', 'min:1'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_tl' => ['required', 'string', 'max:255'],
            'description_en' => ['nullable', 'string'],
            'description_tl' => ['nullable', 'string'],
            'content_en' => ['required', 'string'],
            'content_tl' => ['required', 'string'],
            'video_url' => ['nullable', 'string', 'max:500'],
            'duration_minutes' => ['required', 'integer', 'min:5'],
            'reflection_prompt_en' => ['nullable', 'string'],
            'reflection_prompt_tl' => ['nullable', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'attachments' => ['nullable', 'array', 'max:10'],
            'attachments.*' => [
                'file',
                'mimes:pdf,jpg,jpeg,png,webp,gif,doc,docx,xls,xlsx,ppt,pptx,txt,csv,rtf,odt,ods,odp,zip',
                'max:15360',
            ],
        ]);

        unset($validated['attachments']);
        $validated['is_published'] = $request->boolean('is_published', true);

        $uploadedFiles = $request->file('attachments', []);
        if (!empty($uploadedFiles)) {
            if (!\Illuminate\Support\Facades\Schema::hasColumn('academy_trainings', 'attachments')) {
                return back()->withErrors([
                    'attachments' => 'Database migration required for training attachments. Please run php artisan migrate.',
                ]);
            }
            $validated['attachments'] = AcademyTraining::storeUploadedAttachments(
                is_array($uploadedFiles) ? $uploadedFiles : [$uploadedFiles]
            );
        }

        $training = AcademyTraining::create($validated);

        if (!empty($validated['target_member_id'])) {
            AcademyTrainingProgress::firstOrCreate(
                ['member_id' => $validated['target_member_id'], 'training_id' => $training->id],
                ['status' => 'not_started']
            );
            $member = AcademyMember::find($validated['target_member_id']);
            RealtimeController::flushAcademyCache();

            return back()->with('success', "Training module \"{$training->title_en}\" specifically created and assigned to {$member?->full_name}.");
        }

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Training module published successfully for all members in ' . $training->rank_tier . ' tier.');
    }

    /**
     * Update training module (bilingual) including adding/removing attachments.
     */
    public function updateTraining(Request $request, AcademyTraining $training): RedirectResponse
    {
        $validated = $request->validate([
            'rank_tier' => ['required', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'target_member_id' => ['nullable', 'exists:academy_members,id'],
            'order' => ['required', 'integer', 'min:1'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_tl' => ['required', 'string', 'max:255'],
            'description_en' => ['nullable', 'string'],
            'description_tl' => ['nullable', 'string'],
            'content_en' => ['required', 'string'],
            'content_tl' => ['required', 'string'],
            'video_url' => ['nullable', 'string', 'max:500'],
            'duration_minutes' => ['required', 'integer', 'min:5'],
            'reflection_prompt_en' => ['nullable', 'string'],
            'reflection_prompt_tl' => ['nullable', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'attachments' => ['nullable', 'array', 'max:10'],
            'attachments.*' => [
                'file',
                'mimes:pdf,jpg,jpeg,png,webp,gif,doc,docx,xls,xlsx,ppt,pptx,txt,csv,rtf,odt,ods,odp,zip',
                'max:15360',
            ],
            'remove_attachments' => ['nullable', 'array'],
            'remove_attachments.*' => ['string'],
        ]);

        unset($validated['attachments'], $validated['remove_attachments']);
        $validated['is_published'] = $request->boolean('is_published', (bool) $training->is_published);

        $hasAttachmentsColumn = \Illuminate\Support\Facades\Schema::hasColumn('academy_trainings', 'attachments');
        $uploadedFiles = $request->file('attachments', []);
        $removeIds = array_map('strval', $request->input('remove_attachments', []));

        if ((!empty($uploadedFiles) || !empty($removeIds)) && !$hasAttachmentsColumn) {
            return back()->withErrors([
                'attachments' => 'Database migration required for training attachments. Please run php artisan migrate.',
            ]);
        }

        if ($hasAttachmentsColumn) {
            $current = is_array($training->attachments) ? $training->attachments : [];
            $kept = [];

            foreach ($current as $item) {
                $itemId = isset($item['id']) ? (string) $item['id'] : '';
                if ($itemId !== '' && in_array($itemId, $removeIds, true)) {
                    if (!empty($item['path']) && Storage::disk('public')->exists($item['path'])) {
                        Storage::disk('public')->delete($item['path']);
                    }
                    continue;
                }
                $kept[] = $item;
            }

            if (!empty($uploadedFiles)) {
                $newItems = AcademyTraining::storeUploadedAttachments(
                    is_array($uploadedFiles) ? $uploadedFiles : [$uploadedFiles]
                );
                $kept = array_merge($kept, $newItems);
            }

            $validated['attachments'] = array_values($kept);
        }

        $training->update($validated);

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Training module updated successfully.');
    }

    /**
     * Download or preview a training attachment from Admin console.
     */
    public function downloadTrainingAttachment(Request $request, AcademyTraining $training, string $attachmentId)
    {
        $attachment = $training->findAttachment($attachmentId);
        if (!$attachment || empty($attachment['path']) || !Storage::disk('public')->exists($attachment['path'])) {
            abort(404, 'Attachment not found.');
        }

        $safeName = str_replace(['"', "\r", "\n"], '', (string) ($attachment['name'] ?? basename($attachment['path'])));
        $ext = strtolower((string) ($attachment['extension'] ?? pathinfo($safeName, PATHINFO_EXTENSION)));
        $canPreview = in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'], true);

        if ($request->boolean('inline') && $canPreview) {
            $fullPath = Storage::disk('public')->path($attachment['path']);
            $mime = !empty($attachment['mime']) ? $attachment['mime'] : (mime_content_type($fullPath) ?: 'application/octet-stream');

            return response()->file($fullPath, [
                'Content-Type' => $mime,
                'Content-Disposition' => 'inline; filename="' . $safeName . '"',
            ]);
        }

        return Storage::disk('public')->download($attachment['path'], $safeName);
    }

    /**
     * Delete training module.
     */
    public function deleteTraining(AcademyTraining $training): RedirectResponse
    {
        $training->delete();
        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Training module deleted.');
    }

    /**
     * Store rank requirement definition.
     */
    public function storeRequirement(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rank_tier' => ['required', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'code' => ['required', 'string', 'max:50', 'unique:academy_rank_requirements,code'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_tl' => ['required', 'string', 'max:255'],
            'description_en' => ['nullable', 'string'],
            'description_tl' => ['nullable', 'string'],
            'target_value' => ['required', 'integer', 'min:1'],
            'unit' => ['required', 'string', 'max:50'],
            'order' => ['required', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        AcademyRankRequirement::create($validated);

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Rank requirement created successfully.');
    }

    /**
     * Update rank requirement definition.
     */
    public function updateRequirement(Request $request, AcademyRankRequirement $requirement): RedirectResponse
    {
        $validated = $request->validate([
            'rank_tier' => ['required', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_tl' => ['required', 'string', 'max:255'],
            'description_en' => ['nullable', 'string'],
            'description_tl' => ['nullable', 'string'],
            'target_value' => ['required', 'integer', 'min:1'],
            'unit' => ['required', 'string', 'max:50'],
            'order' => ['required', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $requirement->update($validated);

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Rank requirement updated successfully.');
    }

    /**
     * Delete rank requirement definition.
     */
    public function deleteRequirement(AcademyRankRequirement $requirement): RedirectResponse
    {
        $requirement->delete();
        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Rank requirement deleted.');
    }

    /**
     * Store a new commandment for a specific rank tier.
     */
    public function storeCommandment(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rank_tier' => ['required', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'order' => ['nullable', 'integer', 'min:1', 'max:999'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_tl' => ['nullable', 'string', 'max:255'],
            'description_en' => ['nullable', 'string', 'max:2000'],
            'description_tl' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $nextOrder = (int) AcademyCommandment::where('rank_tier', $validated['rank_tier'])->max('order') + 1;
        $admin = auth('admin')->user();

        AcademyCommandment::create([
            'rank_tier' => $validated['rank_tier'],
            'order' => $validated['order'] ?? $nextOrder,
            'title_en' => trim($validated['title_en']),
            'title_tl' => !empty($validated['title_tl']) ? trim($validated['title_tl']) : trim($validated['title_en']),
            'description_en' => !empty($validated['description_en']) ? trim($validated['description_en']) : null,
            'description_tl' => !empty($validated['description_tl'])
                ? trim($validated['description_tl'])
                : (!empty($validated['description_en']) ? trim($validated['description_en']) : null),
            'is_active' => array_key_exists('is_active', $validated) ? (bool) $validated['is_active'] : true,
            'created_by' => $admin?->name ?? $admin?->username ?? 'Admin',
        ]);

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Commandment added for ' . $validated['rank_tier'] . ' tier.');
    }

    /**
     * Update an existing tier commandment.
     */
    public function updateCommandment(Request $request, AcademyCommandment $commandment): RedirectResponse
    {
        $validated = $request->validate([
            'rank_tier' => ['required', 'in:Rookie,Elite,Master,Grand Master,Legend'],
            'order' => ['nullable', 'integer', 'min:1', 'max:999'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_tl' => ['nullable', 'string', 'max:255'],
            'description_en' => ['nullable', 'string', 'max:2000'],
            'description_tl' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $commandment->update([
            'rank_tier' => $validated['rank_tier'],
            'order' => $validated['order'] ?? $commandment->order,
            'title_en' => trim($validated['title_en']),
            'title_tl' => !empty($validated['title_tl']) ? trim($validated['title_tl']) : trim($validated['title_en']),
            'description_en' => !empty($validated['description_en']) ? trim($validated['description_en']) : null,
            'description_tl' => !empty($validated['description_tl'])
                ? trim($validated['description_tl'])
                : (!empty($validated['description_en']) ? trim($validated['description_en']) : null),
            'is_active' => array_key_exists('is_active', $validated) ? (bool) $validated['is_active'] : $commandment->is_active,
        ]);

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Commandment updated successfully.');
    }

    /**
     * Toggle active/hidden state of a tier commandment.
     */
    public function toggleCommandment(AcademyCommandment $commandment): RedirectResponse
    {
        $commandment->is_active = !$commandment->is_active;
        $commandment->save();

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Commandment ' . ($commandment->is_active ? 'activated' : 'hidden') . '.');
    }

    /**
     * Delete a tier commandment.
     */
    public function deleteCommandment(AcademyCommandment $commandment): RedirectResponse
    {
        $commandment->delete();
        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Commandment deleted successfully.');
    }
}
