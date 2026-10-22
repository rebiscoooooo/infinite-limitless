<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class InquiryAdminController extends Controller
{
    /**
     * List all inquiries with filtering.
     */
    public function index(Request $request): Response
    {
        $query = Inquiry::query()->orderBy('created_at', 'desc');

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

        return Inertia::render('Admin/Inquiries', [
            'inquiries' => $inquiries,
            'filters' => $request->only(['search', 'status']),
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
}
