<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\WorldPlanStatusUpdatedMail;
use App\Models\ActivityLog;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class WorldPlanAdminController extends Controller
{
    /**
     * List world plan registrations with status filtering and payment proof preview.
     */
    public function index(Request $request): Response
    {
        $query = WorldPlanRegistration::query()->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('package_type', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $registrations = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/WorldPlanRegistrations', [
            'registrations' => $registrations,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Update status (Approve or Reject).
     */
    public function updateStatus(Request $request, WorldPlanRegistration $registration): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:Approved,Rejected,Pending'],
        ]);

        $newStatus = $request->input('status');
        $oldStatus = $registration->status;
        $registration->update(['status' => $newStatus]);

        // Send queued email notification on status change
        if ($oldStatus !== $newStatus && in_array($newStatus, ['Approved', 'Rejected'])) {
            try {
                Mail::to($registration->email)->queue(new WorldPlanStatusUpdatedMail($registration));
            } catch (\Throwable $e) {
                report($e);
            }
        }

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => "Updated Registration Status to {$newStatus}",
            'device_type' => 'Desktop PC',
            'os_browser' => request()->userAgent() ?? '',
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Registration for {$registration->full_name} updated to {$newStatus}.");
    }

    /**
     * Delete registration.
     */
    public function destroy(WorldPlanRegistration $registration): RedirectResponse
    {
        $name = $registration->full_name;
        $registration->delete();

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => 'Deleted World Plan Registration',
            'device_type' => 'Desktop PC',
            'os_browser' => request()->userAgent() ?? '',
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Registration of {$name} deleted successfully.");
    }
}
