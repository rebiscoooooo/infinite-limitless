<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Inquiry;
use App\Models\MemberRegistration;
use App\Models\ProductStat;
use App\Models\SiteStat;
use App\Models\WorldPlanRegistration;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the main admin dashboard with stats, recent inquiries, and charts.
     */
    public function index(): Response
    {
        $totalInquiries = Inquiry::count();
        $unreadInquiries = Inquiry::where('is_read', false)->count();
        $pendingWorldPlan = WorldPlanRegistration::where('status', 'Pending')->count();
        $approvedWorldPlan = WorldPlanRegistration::where('status', 'Approved')->count();
        $totalMembers = MemberRegistration::count();

        $siteStats = SiteStat::first() ?? new SiteStat([
            'total_visits' => 12540,
            'active_users' => 312,
            'product_clicks' => 8432,
            'bounce_rate' => '45%',
        ]);

        $products = ProductStat::orderBy('clicks', 'desc')->take(6)->get();
        $recentInquiries = Inquiry::orderBy('created_at', 'desc')->take(5)->get();
        $recentLogs = ActivityLog::orderBy('created_at', 'desc')->take(6)->get();
        $recentRegistrations = WorldPlanRegistration::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'total_inquiries' => $totalInquiries,
                'unread_inquiries' => $unreadInquiries,
                'pending_world_plan' => $pendingWorldPlan,
                'approved_world_plan' => $approvedWorldPlan,
                'total_members' => $totalMembers,
                'total_visits' => number_format($siteStats->total_visits),
                'active_users' => number_format($siteStats->active_users),
                'product_clicks' => number_format($siteStats->product_clicks),
                'bounce_rate' => $siteStats->bounce_rate,
            ],
            'products' => $products,
            'recentInquiries' => $recentInquiries,
            'recentLogs' => $recentLogs,
            'recentRegistrations' => $recentRegistrations,
        ]);
    }
}
