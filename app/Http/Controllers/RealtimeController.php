<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\AdminUser;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RealtimeController extends Controller
{
    /**
     * Get a lightweight system snapshot to detect state changes in real time.
     */
    public function pulse(Request $request): JsonResponse
    {
        $snapshot = Cache::remember('realtime_pulse_snapshot', 1, function () {
            return $this->getSystemSnapshot();
        });

        return response()->json($snapshot);
    }

    /**
     * Server-Sent Events (SSE) stream for instant real-time push updates.
     */
    public function stream(Request $request): StreamedResponse
    {
        return response()->stream(function () {
            // Disable time limits for this stream connection
            @set_time_limit(30);

            $lastSnapshot = null;
            $startTime = time();

            // Run for up to 25 seconds per HTTP streaming connection
            // EventSource will automatically re-open immediately with zero downtime
            while (time() - $startTime < 25) {
                if (connection_aborted()) {
                    break;
                }

                $snapshot = $this->getSystemSnapshot();
                $snapshotJson = json_encode($snapshot);

                if ($lastSnapshot !== $snapshotJson) {
                    $lastSnapshot = $snapshotJson;
                    echo "event: update\n";
                    echo "data: {$snapshotJson}\n\n";
                } else {
                    // Send a lightweight comment heartbeat to keep connection alive
                    echo ": ping\n\n";
                }

                if (ob_get_level() > 0) {
                    @ob_flush();
                }
                @flush();

                // Sleep for 1.5 seconds between internal checks
                sleep(2);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ]);
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
            'server_time' => now()->toIso8601String(),
            'timestamp' => now()->timestamp,
        ];
    }
}

