<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityLogAdminController extends Controller
{
    /**
     * Display activity audit logs with search and device filtering.
     */
    public function index(Request $request): Response
    {
        $query = ActivityLog::query()->orderBy('created_at', 'desc');

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

        return Inertia::render('Admin/ActivityLogs', [
            'logs' => $logs,
            'filters' => $request->only(['search', 'device']),
        ]);
    }
}
