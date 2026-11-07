<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\AdminUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    /**
     * Display a listing of administrator users with search and filtering.
     */
    public function index(Request $request): Response
    {
        $query = AdminUser::query()->orderBy('id', 'desc');

        // View filter: active, archived, all
        $view = $request->input('view', 'active');
        if ($view === 'archived') {
            $query->archived();
        } elseif ($view === 'active') {
            $query->unarchived();
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%");
            });
        }

        // Role filter
        if ($request->filled('role') && $request->input('role') !== 'all') {
            $query->where('role', $request->input('role'));
        }

        // Status filter
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        $admins = $query->paginate(15)->withQueryString();

        $stats = [
            'total' => AdminUser::count(),
            'active' => AdminUser::where('status', 'Active')->unarchived()->count(),
            'inactive' => AdminUser::where('status', 'Inactive')->unarchived()->count(),
            'archived' => AdminUser::archived()->count(),
            'super_admins' => AdminUser::where('role', 'Super Admin')->count(),
        ];

        return Inertia::render('Admin/AdminUsers', [
            'admins' => $admins,
            'currentAdminId' => Auth::guard('admin')->id(),
            'stats' => $stats,
            'filters' => $request->only(['search', 'role', 'status', 'view']),
        ]);
    }

    /**
     * Store a newly created administrator in the database.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'min:3', 'max:50', 'alpha_dash', 'unique:admin_users,username'],
            'email' => ['required', 'email', 'max:255', 'unique:admin_users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:Super Admin,Admin,Manager,Moderator'],
            'status' => ['required', 'string', 'in:Active,Inactive'],
        ]);

        $admin = AdminUser::create([
            'name' => $validated['name'],
            'username' => strtolower(trim($validated['username'])),
            'email' => strtolower(trim($validated['email'])),
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => $validated['status'],
        ]);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => "Created Admin Account (@{$admin->username})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ? substr($request->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Administrator account '@{$admin->username}' ({$admin->name}) created successfully!");
    }

    /**
     * Update an administrator account.
     */
    public function update(Request $request, AdminUser $admin): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'min:3', 'max:50', 'alpha_dash', 'unique:admin_users,username,' . $admin->id],
            'email' => ['required', 'email', 'max:255', 'unique:admin_users,email,' . $admin->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:Super Admin,Admin,Manager,Moderator'],
            'status' => ['required', 'string', 'in:Active,Inactive'],
        ]);

        $updateData = [
            'name' => $validated['name'],
            'username' => strtolower(trim($validated['username'])),
            'email' => strtolower(trim($validated['email'])),
            'role' => $validated['role'],
            'status' => $validated['status'],
        ];

        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $admin->update($updateData);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => "Updated Admin Account (@{$admin->username})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ? substr($request->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Administrator '@{$admin->username}' updated successfully!");
    }

    /**
     * Delete an administrator account.
     */
    public function destroy(AdminUser $admin): RedirectResponse
    {
        $currentAdmin = Auth::guard('admin')->user();
        if ($admin->id === $currentAdmin?->id) {
            return back()->with('error', 'Action prohibited: You cannot delete your own logged-in administrator account.');
        }

        if (AdminUser::count() <= 1) {
            return back()->with('error', 'Action prohibited: Cannot delete the sole remaining administrator account.');
        }

        $username = $admin->username;
        $admin->delete();

        ActivityLog::create([
            'admin_user' => $currentAdmin?->username ?? 'Administrator',
            'action_type' => "Deleted Admin Account (@{$username})",
            'device_type' => 'Desktop PC',
            'os_browser' => request()->userAgent() ? substr(request()->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Administrator account '@{$username}' permanently deleted.");
    }

    /**
     * Toggle active/inactive status.
     */
    public function toggleStatus(AdminUser $admin): RedirectResponse
    {
        $currentAdmin = Auth::guard('admin')->user();
        if ($admin->id === $currentAdmin?->id) {
            return back()->with('error', 'Action prohibited: You cannot deactivate your own account.');
        }

        $newStatus = $admin->status === 'Active' ? 'Inactive' : 'Active';
        $admin->update(['status' => $newStatus]);

        return back()->with('success', "Administrator '@{$admin->username}' status changed to {$newStatus}.");
    }

    /**
     * Bulk archive administrator accounts.
     */
    public function bulkArchive(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:admin_users,id'],
        ]);

        $currentId = Auth::guard('admin')->id();
        $safeIds = array_diff($validated['ids'], [$currentId]);

        if (empty($safeIds)) {
            return back()->with('error', 'You cannot archive your own active logged-in account.');
        }

        $count = AdminUser::whereIn('id', $safeIds)->update(['archived_at' => now()]);

        return back()->with('success', "Successfully archived {$count} administrator account(s).");
    }

    /**
     * Bulk restore administrator accounts.
     */
    public function bulkRestore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:admin_users,id'],
        ]);

        $count = AdminUser::whereIn('id', $validated['ids'])->update(['archived_at' => null]);

        return back()->with('success', "Successfully restored {$count} administrator account(s).");
    }

    /**
     * Bulk delete administrator accounts.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:admin_users,id'],
        ]);

        $currentId = Auth::guard('admin')->id();
        $safeIds = array_diff($validated['ids'], [$currentId]);

        if (empty($safeIds)) {
            return back()->with('error', 'You cannot delete your own logged-in administrator account.');
        }

        $count = AdminUser::whereIn('id', $safeIds)->delete();

        return back()->with('success', "Permanently deleted {$count} administrator account(s).");
    }
}

