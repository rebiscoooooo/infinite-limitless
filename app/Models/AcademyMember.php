<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class AcademyMember extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'academy_members';

    protected $fillable = [
        'member_id',
        'first_name',
        'middle_initial',
        'last_name',
        'phone_country_code',
        'phone_number',
        'email',
        'password',
        'address',
        'profile_picture',
        'status',
        'rank_tier',
        'rejection_reason',
        'admin_notes',
        'agreed_terms',
        'preferred_language',
        'program_start_date',
        'program_target_date',
        'program_status',
        'eligible_for_promotion',
        'promoted_at',
        'approved_at',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'full_name',
        'avatar_url',
        'rank_details',
        'country_info',
        'next_rank',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'approved_at' => 'datetime',
            'last_login_at' => 'datetime',
            'program_start_date' => 'date',
            'program_target_date' => 'date',
            'eligible_for_promotion' => 'boolean',
            'promoted_at' => 'datetime',
        ];
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($member) {
            if (empty($member->member_id)) {
                $member->member_id = static::generateMemberIdFromEmail($member->email);
            }
        });
    }

    /**
     * Generate a unique uppercase Member ID derived from the email's local part
     * (everything before "@domain.com"), e.g. "jrsaturno66@gmail.com" -> "JRSATURNO66".
     */
    public static function generateMemberIdFromEmail(?string $email, ?int $ignoreId = null): string
    {
        $trimmed = trim((string) $email);
        $localPart = str_contains($trimmed, '@')
            ? strstr($trimmed, '@', true)
            : $trimmed;

        $clean = strtoupper(trim((string) $localPart));
        $clean = preg_replace('/[^A-Z0-9._-]/', '', $clean) ?? '';
        $clean = trim($clean, '._-');

        if ($clean === '') {
            $nextNum = (int) (static::withTrashed()->max('id') ?? 0) + 1;
            $clean = 'MEMBER' . str_pad((string) $nextNum, 5, '0', STR_PAD_LEFT);
        }

        $maxLen = 30;
        $base = substr($clean, 0, $maxLen);
        $candidate = $base;
        $counter = 2;

        while (
            static::withTrashed()
                ->when($ignoreId !== null, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->where('member_id', $candidate)
                ->exists()
        ) {
            $suffix = '-' . $counter;
            $candidate = substr($base, 0, $maxLen - strlen($suffix)) . $suffix;
            $counter++;
        }

        return $candidate;
    }

    public function getFullNameAttribute(): string
    {
        $mi = !empty($this->middle_initial) ? strtoupper(trim(str_replace('.', '', $this->middle_initial))) . '. ' : '';
        return trim("{$this->first_name} {$mi}{$this->last_name}");
    }

    public function getAvatarUrlAttribute(): ?string
    {
        if (!empty($this->profile_picture)) {
            if (str_starts_with($this->profile_picture, 'http://') || str_starts_with($this->profile_picture, 'https://')) {
                return $this->profile_picture;
            }
            return asset('storage/' . ltrim($this->profile_picture, '/'));
        }
        return null;
    }

    public function getRankDetailsAttribute(): array
    {
        $tier = $this->rank_tier ? trim($this->rank_tier) : 'Rookie';

        return match (strtolower($tier)) {
            'legend' => [
                'name' => 'LEGEND',
                'tier' => 'Legend',
                'stars' => 5,
                'stars_display' => '★★★★★',
                'theme' => 'ruby-gold',
                'badge_image' => '/assets/image/academy/badge-legend.png',
                'bg_gradient' => 'from-red-600 via-amber-500 to-yellow-400',
                'border_color' => '#f59e0b',
                'glow_color' => 'rgba(239, 68, 68, 0.45)',
                'badge_icon' => 'crown',
                'title' => 'Supreme Sovereign Member',
                'description' => 'The highest echelon of distinction in the Legacy Club Academy, distinguished by unparalleled achievement and imperial leadership.',
            ],
            'grand master' => [
                'name' => 'GRAND MASTER',
                'tier' => 'Grand Master',
                'stars' => 4,
                'stars_display' => '★★★★',
                'theme' => 'royal-purple',
                'badge_image' => '/assets/image/academy/badge-grand-master.png',
                'bg_gradient' => 'from-purple-700 via-violet-600 to-fuchsia-500',
                'border_color' => '#a855f7',
                'glow_color' => 'rgba(168, 85, 247, 0.45)',
                'badge_icon' => 'eagle',
                'title' => 'Distinguished Champion',
                'description' => 'An accomplished vanguard demonstrating exceptional mastery, eagle-eyed vision, and strategic excellence.',
            ],
            'master' => [
                'name' => 'MASTER',
                'tier' => 'Master',
                'stars' => 3,
                'stars_display' => '★★★',
                'theme' => 'radiant-gold',
                'badge_image' => '/assets/image/academy/badge-master.png',
                'bg_gradient' => 'from-amber-600 via-yellow-500 to-amber-300',
                'border_color' => '#eab308',
                'glow_color' => 'rgba(234, 179, 8, 0.45)',
                'badge_icon' => 'lion',
                'title' => 'Elite Lionheart Member',
                'description' => 'Exemplifying fearless leadership, steadfast resilience, and formidable prowess across all academy milestones.',
            ],
            'elite' => [
                'name' => 'ELITE',
                'tier' => 'Elite',
                'stars' => 2,
                'stars_display' => '★★',
                'theme' => 'electric-blue',
                'badge_image' => '/assets/image/academy/badge-elite.png',
                'bg_gradient' => 'from-blue-600 via-cyan-500 to-sky-400',
                'border_color' => '#06b6d4',
                'glow_color' => 'rgba(6, 182, 212, 0.45)',
                'badge_icon' => 'chart',
                'title' => 'High-Performance Pioneer',
                'description' => 'Ascending rapidly with proven momentum, continuous upward trajectory, and high-impact accomplishments.',
            ],
            default => [
                'name' => 'ROOKIE',
                'tier' => 'Rookie',
                'stars' => 1,
                'stars_display' => '★',
                'theme' => 'silver-frost',
                'badge_image' => '/assets/image/academy/badge-rookie.png',
                'bg_gradient' => 'from-slate-500 via-gray-300 to-zinc-100',
                'border_color' => '#e2e8f0',
                'glow_color' => 'rgba(226, 232, 240, 0.35)',
                'badge_icon' => 'mountain',
                'title' => 'Ascending Mountaineer',
                'description' => 'Embarking on the foundational ascent toward excellence in the Legacy Club Academy.',
            ],
        };
    }

    public function getCountryInfoAttribute(): array
    {
        $dial = trim((string) ($this->phone_country_code ?? '+63'));
        $clean = str_starts_with($dial, '+') ? $dial : "+{$dial}";

        $map = [
            '+63' => ['flag' => '🇵🇭', 'country' => 'Philippines', 'code' => 'PH'],
            '+1' => ['flag' => '🇺🇸', 'country' => 'United States', 'code' => 'US'],
            '+44' => ['flag' => '🇬🇧', 'country' => 'United Kingdom', 'code' => 'GB'],
            '+61' => ['flag' => '🇦🇺', 'country' => 'Australia', 'code' => 'AU'],
            '+65' => ['flag' => '🇸🇬', 'country' => 'Singapore', 'code' => 'SG'],
            '+81' => ['flag' => '🇯🇵', 'country' => 'Japan', 'code' => 'JP'],
            '+82' => ['flag' => '🇰🇷', 'country' => 'South Korea', 'code' => 'KR'],
            '+971' => ['flag' => '🇦🇪', 'country' => 'United Arab Emirates', 'code' => 'AE'],
            '+966' => ['flag' => '🇸🇦', 'country' => 'Saudi Arabia', 'code' => 'SA'],
            '+852' => ['flag' => '🇭🇰', 'country' => 'Hong Kong', 'code' => 'HK'],
            '+886' => ['flag' => '🇹🇼', 'country' => 'Taiwan', 'code' => 'TW'],
            '+60' => ['flag' => '🇲🇾', 'country' => 'Malaysia', 'code' => 'MY'],
            '+62' => ['flag' => '🇮🇩', 'country' => 'Indonesia', 'code' => 'ID'],
            '+66' => ['flag' => '🇹🇭', 'country' => 'Thailand', 'code' => 'TH'],
            '+84' => ['flag' => '🇻🇳', 'country' => 'Vietnam', 'code' => 'VN'],
            '+91' => ['flag' => '🇮🇳', 'country' => 'India', 'code' => 'IN'],
            '+86' => ['flag' => '🇨🇳', 'country' => 'China', 'code' => 'CN'],
            '+49' => ['flag' => '🇩🇪', 'country' => 'Germany', 'code' => 'DE'],
            '+33' => ['flag' => '🇫🇷', 'country' => 'France', 'code' => 'FR'],
            '+39' => ['flag' => '🇮🇹', 'country' => 'Italy', 'code' => 'IT'],
            '+34' => ['flag' => '🇪🇸', 'country' => 'Spain', 'code' => 'ES'],
            '+226' => ['flag' => '🇧🇫', 'country' => 'Burkina Faso', 'code' => 'BF'],
            '+675' => ['flag' => '🇵🇬', 'country' => 'Papua New Guinea', 'code' => 'PG'],
            '+234' => ['flag' => '🇳🇬', 'country' => 'Nigeria', 'code' => 'NG'],
            '+27' => ['flag' => '🇿🇦', 'country' => 'South Africa', 'code' => 'ZA'],
            '+55' => ['flag' => '🇧🇷', 'country' => 'Brazil', 'code' => 'BR'],
            '+52' => ['flag' => '🇲🇽', 'country' => 'Mexico', 'code' => 'MX'],
            '+64' => ['flag' => '🇳🇿', 'country' => 'New Zealand', 'code' => 'NZ'],
            '+31' => ['flag' => '🇳🇱', 'country' => 'Netherlands', 'code' => 'NL'],
            '+41' => ['flag' => '🇨🇭', 'country' => 'Switzerland', 'code' => 'CH'],
            '+46' => ['flag' => '🇸🇪', 'country' => 'Sweden', 'code' => 'SE'],
            '+47' => ['flag' => '🇳🇴', 'country' => 'Norway', 'code' => 'NO'],
            '+45' => ['flag' => '🇩🇰', 'country' => 'Denmark', 'code' => 'DK'],
            '+353' => ['flag' => '🇮🇪', 'country' => 'Ireland', 'code' => 'IE'],
            '+351' => ['flag' => '🇵🇹', 'country' => 'Portugal', 'code' => 'PT'],
            '+48' => ['flag' => '🇵🇱', 'country' => 'Poland', 'code' => 'PL'],
            '+30' => ['flag' => '🇬🇷', 'country' => 'Greece', 'code' => 'GR'],
            '+90' => ['flag' => '🇹🇷', 'country' => 'Turkey', 'code' => 'TR'],
            '+20' => ['flag' => '🇪🇬', 'country' => 'Egypt', 'code' => 'EG'],
            '+974' => ['flag' => '🇶🇦', 'country' => 'Qatar', 'code' => 'QA'],
            '+965' => ['flag' => '🇰🇼', 'country' => 'Kuwait', 'code' => 'KW'],
            '+968' => ['flag' => '🇴🇲', 'country' => 'Oman', 'code' => 'OM'],
            '+973' => ['flag' => '🇧🇭', 'country' => 'Bahrain', 'code' => 'BH'],
        ];

        return $map[$clean] ?? ['flag' => '🌐', 'country' => 'International', 'code' => 'INTL', 'dial' => $clean];
    }

    public function requirementProgress(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AcademyMemberRequirementProgress::class, 'member_id');
    }

    public function trainingProgress(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AcademyTrainingProgress::class, 'member_id');
    }

    public function certificates(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AcademyCertificate::class, 'member_id');
    }

    public function getNextRankAttribute(): ?string
    {
        $current = strtolower(trim($this->rank_tier ?? 'Rookie'));
        return match ($current) {
            'rookie' => 'Elite',
            'elite' => 'Master',
            'master' => 'Grand Master',
            'grand master' => 'Legend',
            default => null,
        };
    }

    /**
     * Compute training, requirements, program and promotion data in ONE pass
     * (5 queries total instead of ~12 when the accessors are used one by one).
     */
    public function progressSnapshot(): array
    {
        $training = $this->computeTrainingStats();
        $requirements = $this->computeRequirementsStats();
        $points = $this->computeCumulativePoints();

        return [
            'training' => $training,
            'requirements' => $requirements,
            'program' => $this->computeProgramProgress($training, $requirements),
            'promotion' => $this->computePromotionEligibility($training, $requirements),
            'points' => $points,
        ];
    }

    /**
     * Compute cumulative lifetime points across ALL rank tiers so promoting a member
     * never resets or removes previously earned points — newly earned points simply add on top.
     */
    public function computeCumulativePoints(): array
    {
        $tiers = ['Rookie', 'Elite', 'Master', 'Grand Master', 'Legend'];
        $currentRank = $this->rank_tier ?? 'Rookie';

        // 1. Approved trainings grouped by rank tier (15 pts each)
        $approvedRows = $this->trainingProgress()
            ->where('status', 'approved')
            ->join('academy_trainings', 'academy_trainings.id', '=', 'academy_training_progress.training_id')
            ->whereNull('academy_trainings.deleted_at')
            ->selectRaw('academy_trainings.rank_tier, COUNT(*) as completed_count')
            ->groupBy('academy_trainings.rank_tier')
            ->get();

        $approvedByTier = [];
        foreach ($approvedRows as $row) {
            $approvedByTier[strtolower(trim((string) $row->rank_tier))] = (int) $row->completed_count;
        }

        // 2. Active rank requirements grouped by tier
        $activeReqsByTier = AcademyRankRequirement::where('is_active', true)
            ->get(['id', 'rank_tier', 'target_value'])
            ->groupBy(fn($r) => strtolower(trim((string) $r->rank_tier)));

        // 3. Verified requirement progress records for this member
        $verifiedProgressMap = $this->requirementProgress()
            ->where('is_verified', true)
            ->get(['requirement_id', 'current_value'])
            ->keyBy('requirement_id');

        $totalPoints = 0;
        $currentTierPoints = 0;
        $previousTiersPoints = 0;
        $lifetimeTrainingsCompleted = 0;
        $lifetimeRequirementsCompleted = 0;
        $byTier = [];

        foreach ($tiers as $tier) {
            $tierKey = strtolower($tier);
            $trainCompleted = $approvedByTier[$tierKey] ?? 0;
            $lifetimeTrainingsCompleted += $trainCompleted;

            $tierReqs = $activeReqsByTier->get($tierKey, collect());
            $tierReqTotal = $tierReqs->count();
            $tierReqCompleted = 0;

            foreach ($tierReqs as $req) {
                $prog = $verifiedProgressMap->get($req->id);
                if ($prog && $prog->current_value >= $req->target_value) {
                    $tierReqCompleted++;
                }
            }

            $lifetimeRequirementsCompleted += $tierReqCompleted;
            $tierReqPct = $tierReqTotal > 0 ? (int) round(($tierReqCompleted / $tierReqTotal) * 100) : 0;

            $tierPoints = ($trainCompleted * 15) + ($tierReqCompleted * 20) + $tierReqPct;
            $byTier[$tier] = $tierPoints;
            $totalPoints += $tierPoints;

            if (strcasecmp($tier, $currentRank) === 0) {
                $currentTierPoints = $tierPoints;
            } else {
                $previousTiersPoints += $tierPoints;
            }
        }

        return [
            'total' => $totalPoints,
            'current_tier' => $currentTierPoints,
            'previous_tiers' => $previousTiersPoints,
            'lifetime_trainings_completed' => $lifetimeTrainingsCompleted,
            'lifetime_requirements_completed' => $lifetimeRequirementsCompleted,
            'by_tier' => $byTier,
        ];
    }

    public function getProgramProgressAttribute(): array
    {
        return $this->computeProgramProgress($this->computeTrainingStats(), $this->computeRequirementsStats());
    }

    protected function computeProgramProgress(array $trainingStats, array $requirementsStats): array
    {
        $startDate = $this->program_start_date ?? ($this->approved_at ? $this->approved_at->toDateString() : $this->created_at->toDateString());
        $start = \Carbon\Carbon::parse($startDate)->startOfDay();
        $targetDate = $this->program_target_date ?? $start->copy()->addDays(60)->toDateString();
        $target = \Carbon\Carbon::parse($targetDate)->startOfDay();

        $daysElapsed = max(0, (int) $start->diffInDays(now()->startOfDay(), false));
        $currentDay = min(60, $daysElapsed + 1);
        $daysRemaining = max(0, 60 - $daysElapsed);

        $trainPct = $trainingStats['percentage'] ?? 0;
        $reqPct = $requirementsStats['percentage'] ?? 0;
        $isCompletedEarly = ($trainPct === 100 && $reqPct === 100);

        $status = $isCompletedEarly ? 'Completed' : ($daysElapsed >= 60 ? 'Extended' : ($this->program_status ?: 'Active'));

        return [
            'start_date' => $start->format('M d, Y'),
            'target_date' => $target->format('M d, Y'),
            'current_day' => $currentDay,
            'days_remaining' => $daysRemaining,
            'days_elapsed' => $daysElapsed,
            'status' => $status,
            'is_ahead' => $isCompletedEarly && $daysRemaining > 0,
            'progress_percentage' => min(100, (int) round(($currentDay / 60) * 100)),
        ];
    }

    public function getTrainingStatsAttribute(): array
    {
        return $this->computeTrainingStats();
    }

    public function computeTrainingStats(): array
    {
        $rank = $this->rank_tier ?? 'Rookie';
        $trainings = AcademyTraining::where(function ($q) use ($rank) {
            $q->where(function ($sub) use ($rank) {
                $sub->where('rank_tier', $rank)
                    ->whereNull('target_member_id');
            })->orWhere('target_member_id', $this->id);
        })
            ->where('is_published', true)
            ->orderBy('order')
            ->get();

        $total = $trainings->count();
        if ($total === 0) {
            return [
                'total' => 0,
                'completed' => 0,
                'pending' => 0,
                'percentage' => 100,
                'has_certificate' => false,
                'certificate_id' => null,
                'certificate_number' => null,
            ];
        }

        $progressList = $this->trainingProgress()->whereIn('training_id', $trainings->pluck('id'))->get()->keyBy('training_id');

        $completed = 0;
        $pending = 0;
        $items = [];
        foreach ($trainings as $t) {
            $prog = $progressList->get($t->id);
            $status = $prog ? $prog->status : 'not_started';
            if ($prog && $prog->status === 'approved') {
                $completed++;
            } elseif ($prog && $prog->status === 'submitted') {
                $pending++;
            }
            $items[] = [
                'id' => $t->id,
                'order' => $t->order,
                'title_en' => $t->title_en,
                'title_tl' => $t->title_tl,
                'duration_minutes' => $t->duration_minutes,
                'status' => $status,
                'reviewed_by' => $prog?->reviewed_by,
                'reviewed_at' => $prog?->reviewed_at?->format('M d, Y h:i A'),
                'reflection' => $prog?->reflection_submission,
                'admin_feedback' => $prog?->admin_feedback,
                'progress_id' => $prog?->id,
            ];
        }

        $pct = $total > 0 ? (int) round(($completed / $total) * 100) : 0;

        $cert = $this->certificates()
            ->where('rank_tier', $rank)
            ->where('certificate_type', 'training')
            ->first();

        return [
            'total' => $total,
            'completed' => $completed,
            'pending' => $pending,
            'percentage' => $pct,
            'has_certificate' => (bool) $cert,
            'certificate_id' => $cert?->id,
            'certificate_number' => $cert?->certificate_number,
            'items' => $items,
        ];
    }

    public function getRequirementsStatsAttribute(): array
    {
        return $this->computeRequirementsStats();
    }

    public function computeRequirementsStats(): array
    {
        $rank = $this->rank_tier ?? 'Rookie';
        $requirements = AcademyRankRequirement::where('rank_tier', $rank)
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        $total = $requirements->count();
        if ($total === 0) {
            return [
                'total' => 0,
                'completed' => 0,
                'remaining' => 0,
                'percentage' => 100,
                'items' => [],
            ];
        }

        $memberProgress = $this->requirementProgress()->whereIn('requirement_id', $requirements->pluck('id'))->get()->keyBy('requirement_id');

        $completedCount = 0;
        $items = [];

        foreach ($requirements as $req) {
            $prog = $memberProgress->get($req->id);
            $curVal = $prog ? $prog->current_value : 0;
            $isVerified = $prog ? (bool) $prog->is_verified : false;
            $remaining = max(0, $req->target_value - $curVal);
            $pct = $req->target_value > 0 ? min(100, (int) round(($curVal / $req->target_value) * 100)) : 100;
            $isDone = ($curVal >= $req->target_value) && $isVerified;

            if ($isDone) {
                $completedCount++;
            }

            $items[] = [
                'id' => $req->id,
                'code' => $req->code,
                'title_en' => $req->title_en,
                'title_tl' => $req->title_tl,
                'description_en' => $req->description_en,
                'description_tl' => $req->description_tl,
                'target_value' => $req->target_value,
                'unit' => $req->unit,
                'current_value' => $curVal,
                'remaining' => $remaining,
                'percentage' => $pct,
                'is_verified' => $isVerified,
                'is_completed' => $isDone,
                'admin_notes' => $prog?->admin_notes,
                'verified_at' => $prog?->verified_at?->format('M d, Y'),
            ];
        }

        $overallPct = $total > 0 ? (int) round(($completedCount / $total) * 100) : 0;

        return [
            'total' => $total,
            'completed' => $completedCount,
            'remaining' => $total - $completedCount,
            'percentage' => $overallPct,
            'items' => $items,
        ];
    }

    public function getPromotionEligibilityAttribute(): array
    {
        return $this->computePromotionEligibility($this->computeTrainingStats(), $this->computeRequirementsStats());
    }

    protected function computePromotionEligibility(array $training, array $reqs): array
    {
        $next = $this->next_rank;

        $isEligible = ($training['percentage'] === 100) && ($reqs['percentage'] === 100) && ($next !== null);

        return [
            'is_eligible' => $isEligible,
            'current_rank' => $this->rank_tier ?? 'Rookie',
            'next_rank' => $next,
            'training_completed' => $training['percentage'] === 100,
            'requirements_completed' => $reqs['percentage'] === 100,
            'message' => $isEligible
                ? "Congratulations! You have satisfied 100% of both Training and Requirements for {$this->rank_tier}. You are eligible for promotion to {$next}."
                : ($next === null
                    ? "You have reached the apex rank of LEGEND in the Academy."
                    : "Complete all required trainings and fulfill all rank requirements to become eligible for {$next}."),
        ];
    }

    public function initializeRankProgression(?string $rank = null): void
    {
        $rank = $rank ?? ($this->rank_tier ?: 'Rookie');
        $this->rank_tier = $rank;

        if (!$this->program_start_date) {
            $this->program_start_date = now()->toDateString();
            $this->program_target_date = now()->addDays(60)->toDateString();
            $this->program_status = 'Active';
        }
        $this->eligible_for_promotion = false;
        $this->save();

        // Seed initial requirement progress records for this rank
        $requirements = AcademyRankRequirement::where('rank_tier', $rank)->get();
        foreach ($requirements as $req) {
            AcademyMemberRequirementProgress::firstOrCreate(
                [
                    'member_id' => $this->id,
                    'requirement_id' => $req->id,
                ],
                [
                    'current_value' => 0,
                    'is_verified' => false,
                ]
            );
        }

        // Seed initial training progress records for this rank
        $trainings = AcademyTraining::where('rank_tier', $rank)->orderBy('order')->get();
        foreach ($trainings as $t) {
            AcademyTrainingProgress::firstOrCreate(
                [
                    'member_id' => $this->id,
                    'training_id' => $t->id,
                ],
                [
                    'status' => 'not_started',
                ]
            );
        }
    }

    public function promoteToNextRank(?string $adminName = null): bool
    {
        $nextRank = $this->next_rank;
        if (!$nextRank) {
            return false;
        }

        $this->rank_tier = $nextRank;
        $this->promoted_at = now();
        $this->program_start_date = now()->toDateString();
        $this->program_target_date = now()->addDays(60)->toDateString();
        $this->program_status = 'Active';
        $this->eligible_for_promotion = false;
        $this->save();

        $this->initializeRankProgression($nextRank);

        return true;
    }

    public function toSharedArray(?array $snapshot = null): array
    {
        $snapshot ??= $this->progressSnapshot();
        $rankDetails = $this->rank_details;

        return [
            'id' => $this->id,
            'member_id' => $this->member_id,
            'first_name' => $this->first_name,
            'middle_initial' => $this->middle_initial,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone_country_code' => $this->phone_country_code,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'profile_picture' => $this->profile_picture,
            'avatar_url' => $this->avatar_url,
            'status' => $this->status,
            'rank_tier' => $this->rank_tier,
            'rank_details' => $rankDetails,
            'badge_image' => $rankDetails['badge_image'] ?? '/assets/image/academy/badge-rookie.png',
            'country_info' => $this->country_info,
            'preferred_language' => $this->preferred_language ?? 'en',
            'program_progress' => $snapshot['program'],
            'training_stats' => $snapshot['training'],
            'requirements_stats' => $snapshot['requirements'],
            'total_points' => $snapshot['points']['total'] ?? 0,
            'points_breakdown' => $snapshot['points'] ?? null,
            'next_rank' => $this->next_rank,
            'promotion_eligibility' => $snapshot['promotion'],
            'rejection_reason' => $this->rejection_reason,
            'approved_at' => $this->approved_at?->format('M d, Y h:i A'),
            'created_at' => $this->created_at?->format('M d, Y'),
        ];
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'Pending');
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'Approved');
    }

    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', 'Rejected');
    }
}
