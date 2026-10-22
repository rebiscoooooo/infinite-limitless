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

        if (ProductStat::count() < 10) {
            $initialProducts = [
                ["name" => "Infinite Robustus Coffee", "clicks" => 15420, "trend_dir" => "up", "trend_text" => "+14.5%"],
                ["name" => "Infinite Barley Powder", "clicks" => 14105, "trend_dir" => "up", "trend_text" => "+12.2%"],
                ["name" => "White Plus Glutathione", "clicks" => 12850, "trend_dir" => "up", "trend_text" => "+8.4%"],
                ["name" => "O'Lamour Core La Crème", "clicks" => 11200, "trend_dir" => "up", "trend_text" => "+5.1%"],
                ["name" => "Infinite Botox Serum", "clicks" => 9850, "trend_dir" => "up", "trend_text" => "+4.2%"],
                ["name" => "Infinite Brightening Serum", "clicks" => 9100, "trend_dir" => "down", "trend_text" => "-1.5%"],
                ["name" => "O'Lamour Aeterna BB Cream", "clicks" => 8750, "trend_dir" => "up", "trend_text" => "+2.8%"],
                ["name" => "Infinite White Body Lotion", "clicks" => 8100, "trend_dir" => "up", "trend_text" => "+3.1%"],
                ["name" => "O'Lamour Quintessence Ampoule", "clicks" => 7650, "trend_dir" => "down", "trend_text" => "-0.5%"],
                ["name" => "Infinite Glow-Up Soap", "clicks" => 7200, "trend_dir" => "up", "trend_text" => "+10.2%"],
                ["name" => "Vida Tone-Up Sun Serum", "clicks" => 6800, "trend_dir" => "up", "trend_text" => "+6.7%"],
                ["name" => "O'Lamour Facial Essence", "clicks" => 6400, "trend_dir" => "down", "trend_text" => "-2.1%"],
                ["name" => "Infinite Deowhite Soap", "clicks" => 5900, "trend_dir" => "up", "trend_text" => "+1.4%"],
                ["name" => "Vida Lotus Soothing Toner", "clicks" => 5400, "trend_dir" => "up", "trend_text" => "+0.8%"],
                ["name" => "Vida Doux Cleanser", "clicks" => 4900, "trend_dir" => "down", "trend_text" => "-1.2%"],
                ["name" => "O'Lamour Essence Bar", "clicks" => 4500, "trend_dir" => "up", "trend_text" => "+4.5%"],
                ["name" => "Vida Skin Lotus Booster Ampoule", "clicks" => 4100, "trend_dir" => "down", "trend_text" => "-3.4%"],
                ["name" => "Vida Skin Glow Vita Cream", "clicks" => 3800, "trend_dir" => "stable", "trend_text" => "0.0%"],
            ];
            foreach ($initialProducts as $p) {
                ProductStat::firstOrCreate(
                    ['name' => $p['name']],
                    [
                        'clicks' => $p['clicks'],
                        'trend_dir' => $p['trend_dir'],
                        'trend_text' => $p['trend_text'],
                        'status' => 'Active',
                        'status_class' => 'bg-emerald-500'
                    ]
                );
            }
        }

        $products = ProductStat::orderBy('clicks', 'desc')->take(8)->get();
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
