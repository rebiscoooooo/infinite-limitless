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

class AuthController extends Controller
{
    /**
     * Show admin login page.
     */
    public function showLogin(): Response|RedirectResponse
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Admin/Login');
    }

    /**
     * Handle admin login authentication.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $admin = AdminUser::where('username', $credentials['username'])->first();

        if ($admin && Hash::check($credentials['password'], $admin->password)) {
            Auth::guard('admin')->login($admin, $request->boolean('remember'));
            $request->session()->regenerate();

            // Update admin record
            $ip = $request->ip() ?? '127.0.0.1';
            $userAgent = $request->userAgent() ?? '';
            $admin->update([
                'last_login' => now(),
                'last_ip' => $ip,
                'last_device' => substr($userAgent, 0, 255),
            ]);

            // Track login in activity_logs
            ActivityLog::create([
                'admin_user' => $admin->username,
                'action_type' => 'Login',
                'device_type' => 'Desktop PC',
                'os_browser' => substr($userAgent, 0, 100),
                'ip_address' => substr($ip, 0, 45),
                'status' => 'Success',
                'created_at' => now(),
            ]);

            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'username' => 'Access Denied: Invalid administrator credentials.',
        ])->onlyInput('username');
    }

    /**
     * Handle admin logout.
     */
    public function logout(Request $request): RedirectResponse
    {
        $admin = Auth::guard('admin')->user();
        if ($admin) {
            ActivityLog::create([
                'admin_user' => $admin->username,
                'action_type' => 'Logout',
                'device_type' => 'Desktop PC',
                'os_browser' => substr($request->userAgent() ?? '', 0, 100),
                'ip_address' => substr($request->ip() ?? '127.0.0.1', 0, 45),
                'status' => 'Success',
                'created_at' => now(),
            ]);
        }

        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')->with('success', 'You have been logged out.');
    }
}
