<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ActivityLogAdminController extends Controller
{
    /**
     * Display activity audit logs with search, device, and archive filtering.
     */
    public function index(Request $request): Response
    {
        $query = ActivityLog::query()->orderBy('created_at', 'desc');

        // View filter: active, archived, all
        $view = $request->input('view', 'active');
        if ($view === 'archived') {
            $query->archived();
        } elseif ($view === 'active') {
            $query->unarchived();
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('admin_user', 'like', "%{$search}%")
                  ->orWhere('action_type', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%")
                  ->orWhere('os_browser', 'like', "%{$search}%");
            });
        }

        if ($request->filled('device') && $request->input('device') !== 'all') {
            $query->where('device_type', $request->input('device'));
        }

        $logs = $query->paginate(20)->withQueryString();

        $counts = [
            'total' => ActivityLog::count(),
            'active' => ActivityLog::unarchived()->count(),
            'today' => ActivityLog::whereDate('created_at', today())->count(),
            'archived' => ActivityLog::archived()->count(),
        ];

        return Inertia::render('Admin/ActivityLogs', [
            'logs' => $logs,
            'counts' => $counts,
            'filters' => $request->only(['search', 'device', 'view']),
        ]);
    }

    /**
     * Bulk archive activity logs.
     */
    public function bulkArchive(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:activity_logs,id'],
        ]);

        $count = ActivityLog::whereIn('id', $validated['ids'])->update(['archived_at' => now()]);

        return back()->with('success', "Successfully archived {$count} activity audit log(s).");
    }

    /**
     * Bulk restore activity logs.
     */
    public function bulkRestore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:activity_logs,id'],
        ]);

        $count = ActivityLog::whereIn('id', $validated['ids'])->update(['archived_at' => null]);

        return back()->with('success', "Successfully restored {$count} activity audit log(s).");
    }

    /**
     * Bulk permanently delete activity logs.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:activity_logs,id'],
        ]);

        $count = ActivityLog::whereIn('id', $validated['ids'])->delete();

        return back()->with('success', "Permanently deleted {$count} activity audit log(s) from database.");
    }
}
