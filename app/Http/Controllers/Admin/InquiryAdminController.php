<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class InquiryAdminController extends Controller
{
    /**
     * List all inquiries with filtering and archive support.
     */
    public function index(Request $request): Response
    {
        $query = Inquiry::query()->orderBy('created_at', 'desc');

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
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->input('status') === 'unread') {
                $query->where('is_read', false);
            } elseif ($request->input('status') === 'read') {
                $query->where('is_read', true);
            }
        }

        $inquiries = $query->paginate(15)->withQueryString();

        $counts = [
            'total' => Inquiry::count(),
            'active' => Inquiry::unarchived()->count(),
            'archived' => Inquiry::archived()->count(),
            'unread' => Inquiry::unarchived()->where('is_read', false)->count(),
        ];

        return Inertia::render('Admin/Inquiries', [
            'inquiries' => $inquiries,
            'counts' => $counts,
            'filters' => $request->only(['search', 'status', 'view']),
        ]);
    }

    /**
     * Toggle read status of an inquiry.
     */
    public function toggleRead(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update([
            'is_read' => !$inquiry->is_read,
        ]);

        return back()->with('success', 'Inquiry status updated.');
    }

    /**
     * Send reply to an inquiry.
     */
    public function reply(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $request->validate([
            'reply_subject' => 'required|string|max:255',
            'reply_message' => 'required|string',
        ]);

        $subject = $request->input('reply_subject');
        $message = $request->input('reply_message');

        try {
            Mail::to($inquiry->email)->queue(new \App\Mail\InquiryReplyMail($inquiry, $subject, $message));

            ActivityLog::create([
                'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
                'action_type' => "Sent Reply to {$inquiry->email}",
                'device_type' => 'Desktop PC',
                'os_browser' => request()->userAgent() ?? '',
                'ip_address' => request()->ip() ?? '127.0.0.1',
                'status' => 'Success',
                'created_at' => now(),
            ]);

            $inquiry->update(['is_read' => true]);

            return back()->with('success', "Reply sent successfully to {$inquiry->name} ({$inquiry->email}).");
        } catch (\Throwable $e) {
            Log::error("Failed to send reply to {$inquiry->email}: " . $e->getMessage());
            report($e);

            ActivityLog::create([
                'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
                'action_type' => "Failed to Send Reply to {$inquiry->email}",
                'device_type' => 'Desktop PC',
                'os_browser' => request()->userAgent() ?? '',
                'ip_address' => request()->ip() ?? '127.0.0.1',
                'status' => 'Failed',
                'created_at' => now(),
            ]);

            return back()->with('error', "Could not send reply email to {$inquiry->email}: " . $e->getMessage());
        }
    }

    /**
     * Delete an inquiry.
     */
    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $name = $inquiry->name;
        $inquiry->delete();

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => 'Deleted Inquiry',
            'device_type' => 'Desktop PC',
            'os_browser' => request()->userAgent() ?? '',
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Inquiry from {$name} deleted successfully.");
    }

    /**
     * Bulk archive inquiries.
     */
    public function bulkArchive(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:inquiries,id'],
        ]);

        $count = Inquiry::whereIn('id', $validated['ids'])->update(['archived_at' => now()]);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => "Bulk Archived Inquiries ({$count})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ?? '',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Successfully archived {$count} contact inquiry/inquiries.");
    }

    /**
     * Bulk restore inquiries.
     */
    public function bulkRestore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:inquiries,id'],
        ]);

        $count = Inquiry::whereIn('id', $validated['ids'])->update(['archived_at' => null]);

        return back()->with('success', "Successfully restored {$count} contact inquiry/inquiries.");
    }

    /**
     * Bulk permanently delete inquiries.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:inquiries,id'],
        ]);

        $count = Inquiry::whereIn('id', $validated['ids'])->delete();

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin',
            'action_type' => "Bulk Deleted Inquiries ({$count})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ?? '',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Permanently deleted {$count} contact inquiry/inquiries from database.");
    }
}
