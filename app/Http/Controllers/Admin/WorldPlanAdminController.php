<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\WorldPlanStatusUpdatedMail;
use App\Models\ActivityLog;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class WorldPlanAdminController extends Controller
{
    /**
     * List world plan registrations with status filtering and archive support.
     */
    public function index(Request $request): Response
    {
        $query = WorldPlanRegistration::query()->orderBy('created_at', 'desc');

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
                $q->where('username', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('package_type', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $registrations = $query->paginate(15)->withQueryString();

        $counts = [
            'total' => WorldPlanRegistration::count(),
            'active' => WorldPlanRegistration::unarchived()->count(),
            'archived' => WorldPlanRegistration::archived()->count(),
            'pending' => WorldPlanRegistration::unarchived()->where('status', 'Pending')->count(),
            'approved' => WorldPlanRegistration::unarchived()->where('status', 'Approved')->count(),
            'rejected' => WorldPlanRegistration::unarchived()->where('status', 'Rejected')->count(),
        ];

        return Inertia::render('Admin/WorldPlanRegistrations', [
            'registrations' => $registrations,
            'counts' => $counts,
            'filters' => $request->only(['search', 'status', 'view']),
        ]);
    }

    /**
     * Update status (Approve or Reject).
     */
    public function updateStatus(Request $request, WorldPlanRegistration $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:Approved,Rejected,Pending'],
            'admin_notes' => ['nullable', 'string', 'max:2000'],
            'rejection_reason' => ['nullable', 'string', 'max:2000'],
        ]);

        $newStatus = $validated['status'];
        $oldStatus = $registration->status;

        $updateData = ['status' => $newStatus];
        if ($request->has('admin_notes')) {
            $updateData['admin_notes'] = $request->input('admin_notes');
        }
        if ($request->has('rejection_reason')) {
            $updateData['rejection_reason'] = $request->input('rejection_reason');
        }

        $registration->update($updateData);

        $mailSent = false;
        $mailError = null;

        // Send email notification on status change
        if ($oldStatus !== $newStatus && in_array($newStatus, ['Approved', 'Rejected'])) {
            try {
                Mail::to($registration->email)->queue(new WorldPlanStatusUpdatedMail($registration));
                $mailSent = true;
            } catch (\Throwable $e) {
                $mailError = $e->getMessage();
                Log::error("Failed to send status update email to {$registration->email}: " . $mailError);
                report($e);
            }
        }

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => "Updated Registration Status to {$newStatus}" . ($mailSent ? ' (Email Sent)' : ($mailError ? ' (Email Failed)' : '')),
            'device_type' => 'Desktop PC',
            'os_browser' => request()->userAgent() ?? '',
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        $message = "Registration for {$registration->full_name} updated to {$newStatus}.";
        if ($mailSent) {
            $message .= " Confirmation email sent to {$registration->email}.";
        } elseif ($mailError) {
            $message .= " (Email warning: {$mailError})";
        }

        return back()->with('success', $message);
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

    /**
     * Bulk archive registrations.
     */
    public function bulkArchive(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:world_plan_registrations,id'],
        ]);

        $count = WorldPlanRegistration::whereIn('id', $validated['ids'])->update(['archived_at' => now()]);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => "Bulk Archived Registrations ({$count})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ?? '',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Successfully archived {$count} World Plan registration(s).");
    }

    /**
     * Bulk restore registrations.
     */
    public function bulkRestore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:world_plan_registrations,id'],
        ]);

        $count = WorldPlanRegistration::whereIn('id', $validated['ids'])->update(['archived_at' => null]);

        return back()->with('success', "Successfully restored {$count} World Plan registration(s).");
    }

    /**
     * Bulk permanently delete registrations.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:world_plan_registrations,id'],
        ]);

        $count = WorldPlanRegistration::whereIn('id', $validated['ids'])->delete();

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => "Bulk Deleted Registrations ({$count})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ?? '',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Permanently deleted {$count} registration(s) from database.");
    }
}
