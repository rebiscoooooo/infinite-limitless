<?php

namespace App\Http\Controllers;

use App\Models\AcademyAnnouncement;
use App\Models\AcademyCertificate;
use App\Models\AcademyCommandment;
use App\Models\AcademyMember;
use App\Models\AcademyMemberRequirementProgress;
use App\Models\AcademyRankRequirement;
use App\Models\AcademyTraining;
use App\Models\AcademyTrainingProgress;
use App\Models\ActivityLog;
use App\Models\AdminUser;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RealtimeController extends Controller
{
    /**
     * Immediately invalidate the short-lived global realtime snapshot cache.
     */
    public static function flushSnapshotCache(): void
    {
        Cache::forget('realtime_pulse_snapshot');
    }

    /**
     * Immediately invalidate all Academy realtime and computed caches so
     * Admin and Member portals receive zero-lag live updates on every change.
     */
    public static function flushAcademyCache(): void
    {
        Cache::forget('realtime_pulse_snapshot');
        Cache::forget('academy_eligible_count');
        Cache::forget('academy_leaderboard_rows');
    }

    /**
     * Get a lightweight system snapshot to detect state changes in real time.
     */
    public function pulse(Request $request): JsonResponse
    {
        $snapshot = Cache::remember('realtime_pulse_snapshot', 1, function () {
            return $this->getSystemSnapshot();
        });

        $memberSnapshot = $this->getCurrentAcademyMemberSnapshot($request);
        if ($memberSnapshot !== null) {
            $snapshot['academy_member'] = $memberSnapshot;
        }

        return response()->json($snapshot)->header('Cache-Control', 'no-store, no-cache, must-revalidate');
    }

    /**
     * Server-Sent Events (SSE) stream for instant real-time push updates.
     */
    public function stream(Request $request): StreamedResponse
    {
        // Resolve the active academy member id (if any) BEFORE closing the session
        $academyMemberId = Auth::guard('academy')->id()
            ?? ($request->hasSession() ? $request->session()->get('submitted_member_id') : null);

        // Release PHP session lock so concurrent requests from the same browser never queue behind SSE
        if (session_status() === PHP_SESSION_ACTIVE) {
            @session_write_close();
        }

        // Single-worker `php artisan serve` (cli-server) cannot serve concurrent requests while an SSE loop sleeps.
        // Emit one immediate snapshot with a short retry directive and return cleanly; on production (FPM/Apache/LiteSpeed)
        // hold a low-latency persistent push loop.
        $isSingleWorkerDevServer = PHP_SAPI === 'cli-server' && ((int) getenv('PHP_CLI_SERVER_WORKERS') <= 1);

        return response()->stream(function () use ($academyMemberId, $isSingleWorkerDevServer) {
            @set_time_limit(30);

            if ($isSingleWorkerDevServer) {
                $snapshot = $this->buildFullSnapshotForMember($academyMemberId);
                echo "retry: 2500\n";
                echo "event: update\n";
                echo 'data: ' . json_encode($snapshot) . "\n\n";
                if (ob_get_level() > 0) {
                    @ob_flush();
                }
                @flush();
                return;
            }

            $lastFingerprint = null;
            $startTime = time();

            // Run for up to 20 seconds per HTTP streaming connection; EventSource reconnects seamlessly
            while (time() - $startTime < 20) {
                if (connection_aborted()) {
                    break;
                }

                $snapshot = $this->buildFullSnapshotForMember($academyMemberId);

                // Compare everything except server_time/timestamp so unchanged ticks send a tiny heartbeat
                $fingerprintPayload = $snapshot;
                unset($fingerprintPayload['server_time'], $fingerprintPayload['timestamp']);
                $fingerprint = md5(json_encode($fingerprintPayload));

                if ($lastFingerprint !== $fingerprint) {
                    $lastFingerprint = $fingerprint;
                    echo "event: update\n";
                    echo 'data: ' . json_encode($snapshot) . "\n\n";
                } else {
                    echo ": ping\n\n";
                }

                if (ob_get_level() > 0) {
                    @ob_flush();
                }
                @flush();

                sleep(1);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ]);
    }

    /**
     * Build full snapshot (global + optional scoped academy member state).
     */
    protected function buildFullSnapshotForMember(?int $academyMemberId): array
    {
        $snapshot = $this->getSystemSnapshot();
        if ($academyMemberId) {
            $memberSnap = $this->getAcademyMemberSnapshotById($academyMemberId);
            if ($memberSnap !== null) {
                $snapshot['academy_member'] = $memberSnap;
            }
        }
        return $snapshot;
    }

    /**
     * Build the real-time system fingerprint snapshot.
     */
    protected function getSystemSnapshot(): array
    {
        // 1. Inquiries
        $latestInquiry = Inquiry::latest('id')->first(['id', 'name', 'subject', 'is_read', 'created_at']);
        $inquiriesCount = Inquiry::whereNull('archived_at')->count();
        $unreadInquiriesCount = Inquiry::whereNull('archived_at')->where('is_read', false)->count();

        // 2. World Plan Registrations
        $latestWorldPlan = WorldPlanRegistration::latest('id')->first([
            'id', 'first_name', 'last_name', 'package_type', 'status', 'created_at',
        ]);
        $worldPlanCount = WorldPlanRegistration::whereNull('archived_at')->count();
        $pendingWorldPlanCount = WorldPlanRegistration::whereNull('archived_at')->where('status', 'Pending')->count();

        // 3. Products
        $latestProduct = Product::latest('updated_at')->first(['id', 'updated_at']);
        $productsCount = Product::count();
        $productsHash = md5(($latestProduct ? $latestProduct->updated_at : 'none') . '-' . $productsCount);

        // 4. Activity Logs
        $latestLog = ActivityLog::latest('id')->first(['id', 'action_type', 'admin_user', 'created_at']);
        $logsCount = ActivityLog::count();

        // 5. Admin Users
        $latestAdmin = AdminUser::latest('updated_at')->first(['id', 'updated_at']);
        $adminsCount = AdminUser::count();
        $adminsHash = md5(($latestAdmin ? $latestAdmin->updated_at : 'none') . '-' . $adminsCount);

        // 6. Legacy Club Academy (Members, Reflections, Requirements, Curriculum, Announcements, Certificates)
        $academy = $this->getAcademyGlobalSnapshot();

        return [
            'inquiries' => [
                'count' => $inquiriesCount,
                'unread_count' => $unreadInquiriesCount,
                'latest_id' => $latestInquiry?->id,
                'latest_name' => $latestInquiry?->name,
                'latest_subject' => $latestInquiry?->subject,
                'latest_is_read' => $latestInquiry?->is_read,
                'latest_status' => $latestInquiry ? ($latestInquiry->is_read ? 'Read' : 'Unread') : null,
                'latest_at' => $latestInquiry?->created_at?->toIso8601String(),
            ],
            'world_plan' => [
                'count' => $worldPlanCount,
                'pending_count' => $pendingWorldPlanCount,
                'latest_id' => $latestWorldPlan?->id,
                'latest_name' => $latestWorldPlan ? trim($latestWorldPlan->first_name . ' ' . $latestWorldPlan->last_name) : null,
                'latest_package' => $latestWorldPlan?->package_type,
                'latest_status' => $latestWorldPlan?->status,
                'latest_at' => $latestWorldPlan?->created_at?->toIso8601String(),
            ],
            'products' => [
                'count' => $productsCount,
                'hash' => $productsHash,
                'latest_at' => $latestProduct?->updated_at?->toIso8601String(),
            ],
            'logs' => [
                'count' => $logsCount,
                'latest_id' => $latestLog?->id,
                'latest_action' => $latestLog?->action_type,
                'latest_admin' => $latestLog?->admin_user,
                'latest_at' => $latestLog?->created_at?->toIso8601String(),
            ],
            'admins' => [
                'count' => $adminsCount,
                'hash' => $adminsHash,
            ],
            'academy' => $academy,
            'server_time' => now()->toIso8601String(),
            'timestamp' => now()->timestamp,
        ];
    }

    /**
     * Lightweight global Legacy Club Academy state fingerprint.
     */
    protected function getAcademyGlobalSnapshot(): array
    {
        if (!Schema::hasTable('academy_members')) {
            return ['hash' => 'none'];
        }

        // Members summary
        $memberAgg = AcademyMember::selectRaw("
            COUNT(*) as total,
            SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending_count,
            SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved_count,
            MAX(updated_at) as max_updated
        ")->first();

        $latestMember = AcademyMember::latest('id')->first(['id', 'first_name', 'last_name', 'rank_tier', 'status', 'created_at']);
        $membersCount = (int) ($memberAgg->total ?? 0);
        $pendingMembersCount = (int) ($memberAgg->pending_count ?? 0);
        $approvedMembersCount = (int) ($memberAgg->approved_count ?? 0);
        $membersHash = md5(implode('|', [
            $membersCount,
            $pendingMembersCount,
            $approvedMembersCount,
            (string) ($memberAgg->max_updated ?? ''),
            (string) ($latestMember?->id ?? ''),
        ]));

        // Reflections & training progress summary
        $pendingReflectionsCount = 0;
        $latestReflection = null;
        $reflectionsHash = 'none';
        if (Schema::hasTable('academy_training_progress')) {
            $refAgg = AcademyTrainingProgress::selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as pending_count,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count,
                MAX(updated_at) as max_updated
            ")->first();
            $pendingReflectionsCount = (int) ($refAgg->pending_count ?? 0);
            $latestReflection = AcademyTrainingProgress::where('status', 'submitted')
                ->with(['member:id,first_name,last_name', 'training:id,title_en,order'])
                ->latest('submitted_at')
                ->first(['id', 'member_id', 'training_id', 'submitted_at']);
            $reflectionsHash = md5(implode('|', [
                (int) ($refAgg->total ?? 0),
                $pendingReflectionsCount,
                (int) ($refAgg->approved_count ?? 0),
                (string) ($refAgg->max_updated ?? ''),
            ]));
        }

        // Trainings curriculum fingerprint
        $trainingsHash = 'none';
        if (Schema::hasTable('academy_trainings')) {
            $trainAgg = AcademyTraining::withTrashed()
                ->selectRaw('COUNT(*) as total, MAX(updated_at) as max_updated, MAX(deleted_at) as max_deleted')
                ->first();
            $trainingsHash = md5(implode('|', [
                (int) ($trainAgg->total ?? 0),
                (string) ($trainAgg->max_updated ?? ''),
                (string) ($trainAgg->max_deleted ?? ''),
            ]));
        }

        // Requirements definitions + member progress fingerprint
        $requirementsHash = 'none';
        if (Schema::hasTable('academy_rank_requirements') && Schema::hasTable('academy_member_requirement_progress')) {
            $reqDefAgg = AcademyRankRequirement::selectRaw('COUNT(*) as total, MAX(updated_at) as max_updated')->first();
            $reqProgAgg = AcademyMemberRequirementProgress::selectRaw('COUNT(*) as total, COALESCE(SUM(current_value), 0) as sum_val, SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END) as verified_cnt, MAX(updated_at) as max_updated')->first();
            $requirementsHash = md5(implode('|', [
                (int) ($reqDefAgg->total ?? 0),
                (string) ($reqDefAgg->max_updated ?? ''),
                (int) ($reqProgAgg->total ?? 0),
                (int) ($reqProgAgg->sum_val ?? 0),
                (int) ($reqProgAgg->verified_cnt ?? 0),
                (string) ($reqProgAgg->max_updated ?? ''),
            ]));
        }

        // Announcements fingerprint
        $announcementsCount = 0;
        $latestAnnouncement = null;
        $announcementsHash = 'none';
        if (Schema::hasTable('academy_announcements')) {
            $annAgg = AcademyAnnouncement::selectRaw('COUNT(*) as total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_cnt, MAX(updated_at) as max_updated')->first();
            $announcementsCount = (int) ($annAgg->active_cnt ?? 0);
            $latestAnnouncement = AcademyAnnouncement::where('is_active', true)->latest('id')->first(['id', 'title', 'type', 'created_at']);
            $announcementsHash = md5(implode('|', [
                (int) ($annAgg->total ?? 0),
                $announcementsCount,
                (string) ($annAgg->max_updated ?? ''),
            ]));
        }

        // Certificates fingerprint
        $certificatesCount = 0;
        $certificatesHash = 'none';
        if (Schema::hasTable('academy_certificates')) {
            $certAgg = AcademyCertificate::selectRaw('COUNT(*) as total, MAX(updated_at) as max_updated, MAX(id) as max_id')->first();
            $certificatesCount = (int) ($certAgg->total ?? 0);
            $certificatesHash = md5(implode('|', [
                $certificatesCount,
                (string) ($certAgg->max_updated ?? ''),
                (string) ($certAgg->max_id ?? ''),
            ]));
        }

        // Commandments fingerprint
        $commandmentsHash = 'none';
        if (Schema::hasTable('academy_commandments')) {
            $cmdAgg = AcademyCommandment::selectRaw('COUNT(*) as total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_cnt, MAX(updated_at) as max_updated')->first();
            $commandmentsHash = md5(implode('|', [
                (int) ($cmdAgg->total ?? 0),
                (int) ($cmdAgg->active_cnt ?? 0),
                (string) ($cmdAgg->max_updated ?? ''),
            ]));
        }

        $masterHash = md5(implode('|', [
            $membersHash,
            $reflectionsHash,
            $trainingsHash,
            $requirementsHash,
            $announcementsHash,
            $certificatesHash,
            $commandmentsHash,
        ]));

        return [
            'hash' => $masterHash,
            'members' => [
                'count' => $membersCount,
                'pending_count' => $pendingMembersCount,
                'approved_count' => $approvedMembersCount,
                'latest_id' => $latestMember?->id,
                'latest_name' => $latestMember ? trim($latestMember->first_name . ' ' . $latestMember->last_name) : null,
                'latest_rank' => $latestMember?->rank_tier,
                'latest_status' => $latestMember?->status,
                'hash' => $membersHash,
            ],
            'reflections' => [
                'pending_count' => $pendingReflectionsCount,
                'latest_id' => $latestReflection?->id,
                'latest_member_name' => $latestReflection?->member ? trim($latestReflection->member->first_name . ' ' . $latestReflection->member->last_name) : null,
                'latest_training_title' => $latestReflection?->training?->title_en,
                'latest_training_order' => $latestReflection?->training?->order,
                'hash' => $reflectionsHash,
            ],
            'trainings_hash' => $trainingsHash,
            'requirements_hash' => $requirementsHash,
            'commandments_hash' => $commandmentsHash,
            'announcements' => [
                'active_count' => $announcementsCount,
                'latest_id' => $latestAnnouncement?->id,
                'latest_title' => $latestAnnouncement?->title,
                'hash' => $announcementsHash,
            ],
            'certificates' => [
                'count' => $certificatesCount,
                'hash' => $certificatesHash,
            ],
        ];
    }

    /**
     * Resolve per-member realtime fingerprint for the currently logged-in (or pending-verify) academy member.
     */
    protected function getCurrentAcademyMemberSnapshot(Request $request): ?array
    {
        $memberId = Auth::guard('academy')->id()
            ?? ($request->hasSession() ? $request->session()->get('submitted_member_id') : null);

        if (!$memberId) {
            return null;
        }

        return $this->getAcademyMemberSnapshotById((int) $memberId);
    }

    protected function getAcademyMemberSnapshotById(int $memberId): ?array
    {
        if (!Schema::hasTable('academy_members')) {
            return null;
        }

        $member = AcademyMember::find($memberId, [
            'id', 'status', 'rank_tier', 'eligible_for_promotion', 'preferred_language', 'updated_at',
        ]);

        if (!$member) {
            return null;
        }

        $trainApproved = 0;
        $trainSubmitted = 0;
        $trainRejected = 0;
        $trainHash = 'none';
        if (Schema::hasTable('academy_training_progress')) {
            $tAgg = AcademyTrainingProgress::where('member_id', $memberId)
                ->selectRaw("
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_cnt,
                    SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as submitted_cnt,
                    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_cnt,
                    MAX(updated_at) as max_updated
                ")->first();
            $trainApproved = (int) ($tAgg->approved_cnt ?? 0);
            $trainSubmitted = (int) ($tAgg->submitted_cnt ?? 0);
            $trainRejected = (int) ($tAgg->rejected_cnt ?? 0);
            $trainHash = md5(implode('|', [
                (int) ($tAgg->total ?? 0),
                $trainApproved,
                $trainSubmitted,
                $trainRejected,
                (string) ($tAgg->max_updated ?? ''),
            ]));
        }

        $reqHash = 'none';
        if (Schema::hasTable('academy_member_requirement_progress')) {
            $rAgg = AcademyMemberRequirementProgress::where('member_id', $memberId)
                ->selectRaw('COUNT(*) as total, COALESCE(SUM(current_value), 0) as sum_val, SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END) as verified_cnt, MAX(updated_at) as max_updated')
                ->first();
            $reqHash = md5(implode('|', [
                (int) ($rAgg->total ?? 0),
                (int) ($rAgg->sum_val ?? 0),
                (int) ($rAgg->verified_cnt ?? 0),
                (string) ($rAgg->max_updated ?? ''),
            ]));
        }

        $certCount = 0;
        $certHash = 'none';
        if (Schema::hasTable('academy_certificates')) {
            $cAgg = AcademyCertificate::where('member_id', $memberId)
                ->selectRaw('COUNT(*) as total, MAX(updated_at) as max_updated, MAX(id) as max_id')
                ->first();
            $certCount = (int) ($cAgg->total ?? 0);
            $certHash = md5(implode('|', [
                $certCount,
                (string) ($cAgg->max_updated ?? ''),
                (string) ($cAgg->max_id ?? ''),
            ]));
        }

        $memberHash = md5(implode('|', [
            $member->status,
            $member->rank_tier,
            (int) $member->eligible_for_promotion,
            $member->preferred_language,
            (string) $member->updated_at,
            $trainHash,
            $reqHash,
            $certHash,
        ]));

        return [
            'id' => $member->id,
            'status' => $member->status,
            'rank_tier' => $member->rank_tier,
            'eligible_for_promotion' => (bool) $member->eligible_for_promotion,
            'training_approved' => $trainApproved,
            'training_submitted' => $trainSubmitted,
            'training_rejected' => $trainRejected,
            'training_hash' => $trainHash,
            'req_hash' => $reqHash,
            'certificates_count' => $certCount,
            'certificates_hash' => $certHash,
            'hash' => $memberHash,
        ];
    }
}
