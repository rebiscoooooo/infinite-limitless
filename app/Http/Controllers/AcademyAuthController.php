<?php

namespace App\Http\Controllers;

use App\Models\AcademyAnnouncement;
use App\Models\AcademyCertificate;
use App\Models\AcademyMember;
use App\Models\AcademyMemberRequirementProgress;
use App\Models\AcademyRankRequirement;
use App\Models\AcademyTraining;
use App\Models\AcademyTrainingProgress;
use App\Services\AcademyCertificateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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
            'preferred_language' => ['nullable', 'string', 'in:en,tl'],
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

        // Create member with initial rank: ROOKIE and active 60-day development program
        $member = AcademyMember::create([
            'first_name' => $validated['first_name'],
            'middle_initial' => !empty($validated['middle_initial']) ? strtoupper(trim(str_replace('.', '', $validated['middle_initial']))) : null,
            'last_name' => $validated['last_name'],
            'phone_country_code' => $validated['phone_country_code'],
            'phone_number' => $validated['phone_number'],
            'email' => $validated['email'],
            'password' => $validated['password'], // Casts will hash automatically
            'address' => $validated['address'],
            'profile_picture' => $profilePath,
            'status' => 'Pending',
            'rank_tier' => 'Rookie', // Default initial rank: ROOKIE
            'preferred_language' => $validated['preferred_language'] ?? 'en',
            'program_start_date' => now()->toDateString(),
            'program_target_date' => now()->addDays(60)->toDateString(),
            'program_status' => 'Active',
            'agreed_terms' => 'Yes',
        ]);

        $member->initializeRankProgression('Rookie');
        RealtimeController::flushAcademyCache();

        // Store reference ID in session so /academy-verify can update live when approved
        session()->put('submitted_member_id', $member->id);
        session()->flash('submitted_member', [
            'id' => $member->id,
            'member_id' => $member->member_id,
            'full_name' => $member->full_name,
            'email' => $member->email,
            'phone_country_code' => $member->phone_country_code,
            'status' => $member->status,
            'rank_tier' => $member->rank_tier,
            'created_at' => $member->created_at?->toIso8601String(),
        ]);

        return redirect()->route('academy.verify')->with('success', 'Your application to the Legacy Club Academy has been submitted successfully and is now pending executive review.');
    }

    /**
     * Show Application Pending Verification Page.
     */
    public function showVerify(): Response
    {
        $submitted = session('submitted_member');
        $submittedId = $submitted['id'] ?? session('submitted_member_id');

        if ($submittedId) {
            $fresh = AcademyMember::find($submittedId);
            if ($fresh) {
                $submitted = [
                    'id' => $fresh->id,
                    'member_id' => $fresh->member_id,
                    'full_name' => $fresh->full_name,
                    'email' => $fresh->email,
                    'phone_country_code' => $fresh->phone_country_code,
                    'country_info' => $fresh->country_info,
                    'status' => $fresh->status,
                    'rank_tier' => $fresh->rank_tier,
                    'rejection_reason' => $fresh->rejection_reason,
                    'created_at' => $fresh->created_at?->toIso8601String(),
                ];
            }
        }

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
     * Build shared portal shell props (member snapshot, sidebar counts, latest announcement).
     */
    private function buildPortalShell(AcademyMember $member, AcademyCertificateService $certService): array
    {
        $certService->ensureTrainingCompletionCertificate($member);
        $snapshot = $member->progressSnapshot();

        $certificatesCount = $member->certificates()->count();
        $announcementsCount = AcademyAnnouncement::where('is_active', true)->count();
        $popupAnnouncements = AcademyAnnouncement::where('is_active', true)
            ->with('featuredMember')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'type' => $a->type ?? 'announcement',
                'badge_text' => $a->badge_text,
                'image_url' => $a->image_path ? asset('storage/' . $a->image_path) : null,
                'featured_member' => $a->featuredMember ? [
                    'id' => $a->featuredMember->id,
                    'full_name' => $a->featuredMember->full_name,
                    'avatar_url' => $a->featuredMember->avatar_url,
                    'rank_tier' => $a->featuredMember->rank_tier,
                ] : null,
                'created_at' => $a->created_at->format('M d, Y'),
            ])
            ->values();

        $latestAnnouncement = $popupAnnouncements->first();

        return [
            'snapshot' => $snapshot,
            'props' => [
                'member' => $member->toSharedArray($snapshot),
                'portalCounts' => [
                    'trainings_completed' => $snapshot['training']['completed'] ?? 0,
                    'trainings_total' => $snapshot['training']['total'] ?? 0,
                    'requirements_completed' => $snapshot['requirements']['completed'] ?? 0,
                    'requirements_total' => $snapshot['requirements']['total'] ?? 0,
                    'certificates' => $certificatesCount,
                    'announcements' => $announcementsCount,
                ],
                'latestAnnouncement' => $latestAnnouncement,
                'popupAnnouncements' => $popupAnnouncements,
            ],
        ];
    }

    /**
     * Build ordered sequential trainings for a member's current rank + member-specific modules.
     */
    private function buildSequentialTrainings(AcademyMember $member): array
    {
        $lang = $member->preferred_language ?? 'en';
        $currentRank = $member->rank_tier ?? 'Rookie';

        $trainings = AcademyTraining::where(function ($q) use ($currentRank, $member) {
                $q->where(function ($sub) use ($currentRank) {
                    $sub->where('rank_tier', $currentRank)
                        ->whereNull('target_member_id');
                })->orWhere('target_member_id', $member->id);
            })
            ->where('is_published', true)
            ->orderBy('order')
            ->get();

        $trainingProgressMap = $member->trainingProgress()
            ->whereIn('training_id', $trainings->pluck('id'))
            ->get()
            ->keyBy('training_id');

        $sequentialTrainings = [];
        $previousApproved = true;

        foreach ($trainings as $idx => $t) {
            $prog = $trainingProgressMap->get($t->id);
            $isUnlocked = ($idx === 0) || $previousApproved;

            $status = $prog ? $prog->status : 'not_started';
            $previousApproved = ($status === 'approved');

            $sequentialTrainings[] = [
                'id' => $t->id,
                'order' => $t->order,
                'title' => $t->getLocalizedTitle($lang),
                'title_en' => $t->title_en,
                'title_tl' => $t->title_tl,
                'description' => $t->getLocalizedDescription($lang),
                'description_en' => $t->description_en,
                'description_tl' => $t->description_tl,
                'content' => $t->getLocalizedContent($lang),
                'content_en' => $t->content_en,
                'content_tl' => $t->content_tl,
                'duration_minutes' => $t->duration_minutes,
                'video_url' => $t->video_url,
                'reflection_prompt' => $t->getLocalizedPrompt($lang),
                'reflection_prompt_en' => $t->reflection_prompt_en,
                'reflection_prompt_tl' => $t->reflection_prompt_tl,
                'is_unlocked' => $isUnlocked,
                'status' => $status,
                'reflection_submission' => $prog?->reflection_submission,
                'submitted_at' => $prog?->submitted_at?->format('M d, Y h:i A'),
                'reviewed_by' => $prog?->reviewed_by,
                'admin_feedback' => $prog?->admin_feedback,
                'reviewed_at' => $prog?->reviewed_at?->format('M d, Y h:i A'),
            ];
        }

        return $sequentialTrainings;
    }

    /**
     * Build active announcements and recognitions list.
     */
    private function buildAnnouncements(int $limit = 30)
    {
        return AcademyAnnouncement::where('is_active', true)
            ->with('featuredMember')
            ->latest()
            ->take($limit)
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'type' => $a->type ?? 'announcement',
                'badge_text' => $a->badge_text,
                'image_url' => $a->image_path ? asset('storage/' . $a->image_path) : null,
                'featured_member' => $a->featuredMember ? [
                    'id' => $a->featuredMember->id,
                    'full_name' => $a->featuredMember->full_name,
                    'avatar_url' => $a->featuredMember->avatar_url,
                    'rank_tier' => $a->featuredMember->rank_tier,
                ] : null,
                'created_at' => $a->created_at->format('M d, Y'),
            ]);
    }

    /**
     * Build member certificates list.
     */
    private function buildCertificates(AcademyMember $member)
    {
        return $member->certificates()
            ->latest('issued_at')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'rank_tier' => $c->rank_tier,
                'certificate_type' => $c->certificate_type,
                'certificate_number' => $c->certificate_number,
                'issued_at' => $c->issued_at->format('M d, Y'),
                'download_url' => route('academy.certificates.download', $c->id),
                'is_custom' => !empty($c->file_path),
            ]);
    }

    /**
     * Page 1: Academy Member Portal — Dashboard & Profile.
     */
    public function showPortal(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Profile', array_merge($shell['props'], [
            'currentRankRequirements' => $shell['snapshot']['requirements']['items'],
            'sequentialTrainings' => $this->buildSequentialTrainings($member),
            'certificates' => $this->buildCertificates($member),
            'announcements' => $this->buildAnnouncements(20),
        ]));
    }

    /**
     * Page 2: Sequential Trainings.
     */
    public function showTrainings(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Trainings', array_merge($shell['props'], [
            'sequentialTrainings' => $this->buildSequentialTrainings($member),
            'certificates' => $this->buildCertificates($member),
        ]));
    }

    /**
     * Page 3: Rank Requirements.
     */
    public function showRequirements(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Requirements', array_merge($shell['props'], [
            'currentRankRequirements' => $shell['snapshot']['requirements']['items'],
        ]));
    }

    /**
     * Page 4: Certificates.
     */
    public function showCertificates(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Certificates', array_merge($shell['props'], [
            'certificates' => $this->buildCertificates($member),
        ]));
    }

    /**
     * Page 5: Academy Leaderboards.
     */
    public function showLeaderboards(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Leaderboards', array_merge($shell['props'], [
            'leaderboards' => $this->calculateLeaderboards($member),
        ]));
    }

    /**
     * Page 6: Announcements & Recognitions.
     */
    public function showAnnouncements(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Announcements', array_merge($shell['props'], [
            'announcements' => $this->buildAnnouncements(40),
        ]));
    }

    /**
     * Page 7: 5-Tier Rank Matrix.
     */
    public function showRankMatrix(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/RankMatrix', $shell['props']);
    }

    /**
     * Page 8: Profile Settings.
     */
    public function showSettings(AcademyCertificateService $certService): Response
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user()->fresh();
        $shell = $this->buildPortalShell($member, $certService);

        return Inertia::render('Academy/Settings', $shell['props']);
    }

    /**
     * Submit reflection for a sequential training.
     */
    public function submitReflection(Request $request, AcademyTraining $training): RedirectResponse
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user();

        // Validate training belongs to this member (either their rank curriculum or specifically assigned to them)
        if ($training->target_member_id !== null) {
            if ((int) $training->target_member_id !== (int) $member->id) {
                return back()->withErrors(['reflection_submission' => 'This training module is not assigned to your account.']);
            }
        } elseif ($training->rank_tier !== $member->rank_tier) {
            return back()->withErrors(['reflection_submission' => 'This training does not belong to your current rank curriculum.']);
        }

        // Sequential validation matching showPortal order
        $orderedTrainings = AcademyTraining::where(function ($q) use ($member) {
                $q->where(function ($sub) use ($member) {
                    $sub->where('rank_tier', $member->rank_tier)
                        ->whereNull('target_member_id');
                })->orWhere('target_member_id', $member->id);
            })
            ->where('is_published', true)
            ->orderBy('order')
            ->get()
            ->values();

        $currentIndex = $orderedTrainings->search(fn($t) => (int) $t->id === (int) $training->id);
        if ($currentIndex !== false && $currentIndex > 0) {
            $prevTraining = $orderedTrainings->get($currentIndex - 1);
            if ($prevTraining) {
                $prevProg = AcademyTrainingProgress::where('member_id', $member->id)
                    ->where('training_id', $prevTraining->id)
                    ->first();

                if (!$prevProg || $prevProg->status !== 'approved') {
                    return back()->withErrors(['reflection_submission' => 'You cannot submit this reflection until the previous training has been completed and approved by administration.']);
                }
            }
        }

        $validated = $request->validate([
            'reflection_submission' => ['required', 'string', 'min:20', 'max:5000'],
        ], [
            'reflection_submission.min' => 'Please provide a thoughtful reflection of at least 20 characters summarizing your learnings and realizations.',
        ]);

        AcademyTrainingProgress::updateOrCreate(
            [
                'member_id' => $member->id,
                'training_id' => $training->id,
            ],
            [
                'status' => 'submitted',
                'reflection_submission' => $validated['reflection_submission'],
                'submitted_at' => now(),
                'admin_feedback' => null,
                'reviewed_at' => null,
                'reviewed_by' => null,
            ]
        );

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Your reflection for "' . $training->getLocalizedTitle($member->preferred_language ?? 'en') . '" has been submitted for administrative review.');
    }

    /**
     * Download training completion certificate as PDF.
     */
    public function downloadCertificate(AcademyCertificate $certificate, AcademyCertificateService $service)
    {
        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user();

        if ($member && $certificate->member_id !== $member->id) {
            abort(403, 'Unauthorized access to certificate.');
        }

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
     * Switch language preference.
     */
    public function switchLanguage(Request $request): RedirectResponse
    {
        $lang = $request->input('language', 'en');
        if (!in_array($lang, ['en', 'tl'])) {
            $lang = 'en';
        }

        /** @var AcademyMember $member */
        $member = Auth::guard('academy')->user();
        if ($member) {
            $member->preferred_language = $lang;
            $member->save();
        }

        session()->put('academy_language', $lang);

        return back()->with('success', $lang === 'tl' ? 'Matagumpay na pinalitan ang wika sa Filipino.' : 'Language preference updated to English.');
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

        if (!empty($validated['new_password']) && empty($validated['current_password'])) {
            return back()->withErrors(['current_password' => 'Please enter your current password to set a new password.']);
        }

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

        RealtimeController::flushAcademyCache();

        return back()->with('success', 'Profile information successfully updated.');
    }

    /**
     * Calculate leaderboards across 4 categories based strictly on verified & approved data.
     */
    private function calculateLeaderboards(AcademyMember $currentMember): array
    {
        // Computing every member's stats is expensive; share one result for all viewers for 60s
        $mapped = Cache::remember('academy_leaderboard_rows', 60, function () {
            return AcademyMember::where('status', 'Approved')->get()->map(function (AcademyMember $m) {
                $snap = $m->progressSnapshot();
                $train = $snap['training'];
                $reqs = $snap['requirements'];
                $score = ($train['completed'] * 15) + ($reqs['completed'] * 20) + $reqs['percentage'];

                return [
                    'id' => $m->id,
                    'member_id' => $m->member_id,
                    'full_name' => $m->full_name,
                    'avatar_url' => $m->avatar_url,
                    'rank_tier' => $m->rank_tier ?? 'Rookie',
                    'badge_image' => $m->rank_details['badge_image'] ?? '/assets/image/academy/badge-rookie.png',
                    'country_info' => $m->country_info,
                    'training_completed' => $train['completed'],
                    'training_total' => $train['total'],
                    'training_pct' => $train['percentage'],
                    'requirements_completed' => $reqs['completed'],
                    'requirements_total' => $reqs['total'],
                    'requirements_pct' => $reqs['percentage'],
                    'score' => $score,
                ];
            })->all();
        });
        $mapped = collect($mapped);

        // 1. Overall
        $overall = $mapped->sortByDesc('score')->values()->take(10)->map(function ($item, $idx) {
            $item['rank_position'] = $idx + 1;
            return $item;
        });

        // 2. Training Completion
        $training = $mapped->sortByDesc('training_completed')->values()->take(10)->map(function ($item, $idx) {
            $item['rank_position'] = $idx + 1;
            return $item;
        });

        // 3. Requirements Completion
        $requirements = $mapped->sortByDesc('requirements_pct')->values()->take(10)->map(function ($item, $idx) {
            $item['rank_position'] = $idx + 1;
            return $item;
        });

        // 4. Rank-Based (same rank as current member)
        $currentRank = $currentMember->rank_tier ?? 'Rookie';
        $rankBased = $mapped->where('rank_tier', $currentRank)->sortByDesc('score')->values()->take(10)->map(function ($item, $idx) {
            $item['rank_position'] = $idx + 1;
            return $item;
        });

        return [
            'overall' => $overall,
            'training' => $training,
            'requirements' => $requirements,
            'rank_based' => $rankBased,
            'current_member_rank' => $currentRank,
        ];
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
