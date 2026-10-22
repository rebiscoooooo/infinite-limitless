<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogAdminActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Check if admin is authenticated or if it's an admin route
        if (Auth::guard('admin')->check() || $request->is('admin*')) {
            $adminUser = Auth::guard('admin')->user()?->username ?? 'System';
            $ip = $request->ip() ?? 'Unknown';
            $userAgent = $request->userAgent() ?? '';

            // Detect Device
            $deviceType = 'Desktop PC';
            if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', strtolower($userAgent))) {
                $deviceType = 'Tablet';
            } elseif (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile)/i', strtolower($userAgent))) {
                $deviceType = 'Mobile Phone';
            }

            // Detect OS and Browser
            $os = 'Unknown OS';
            if (preg_match('/windows|win32/i', $userAgent)) $os = 'Windows';
            elseif (preg_match('/macintosh|mac os x/i', $userAgent)) $os = 'Mac OS';
            elseif (preg_match('/linux/i', $userAgent)) $os = 'Linux';
            elseif (preg_match('/iphone|ipad|ipod/i', $userAgent)) $os = 'iOS';
            elseif (preg_match('/android/i', $userAgent)) $os = 'Android';

            $browser = 'Unknown Browser';
            if (preg_match('/Edge/i', $userAgent)) $browser = 'Edge';
            elseif (preg_match('/Chrome/i', $userAgent)) $browser = 'Chrome';
            elseif (preg_match('/Firefox/i', $userAgent)) $browser = 'Firefox';
            elseif (preg_match('/Safari/i', $userAgent)) $browser = 'Safari';
            elseif (preg_match('/Opera/i', $userAgent)) $browser = 'Opera';

            $osBrowser = $os . ' - ' . $browser;

            // Determine action type from path and method
            $actionType = 'Navigated ' . $request->path();
            if ($request->is('admin/login') && $request->isMethod('post')) {
                $actionType = 'Login Attempt';
            } elseif ($request->is('admin/logout')) {
                $actionType = 'Logout';
            } elseif ($request->isMethod('post') || $request->isMethod('delete') || $request->isMethod('put') || $request->isMethod('patch')) {
                $actionType = 'Admin Action: ' . $request->method() . ' ' . $request->path();
            }

            // Only log write actions or admin access events to prevent log table explosion
            if ($request->isMethod('post') || $request->isMethod('delete') || $request->is('admin') || $request->is('admin/dashboard') || $request->is('admin/logout')) {
                try {
                    ActivityLog::create([
                        'admin_user' => $adminUser,
                        'action_type' => $actionType,
                        'device_type' => $deviceType,
                        'os_browser' => $osBrowser,
                        'ip_address' => substr($ip, 0, 45),
                        'status' => $response->getStatusCode() < 400 ? 'Success' : 'Failed',
                        'created_at' => now(),
                    ]);
                } catch (\Throwable $e) {
                    // Silently ignore to avoid breaking execution
                }
            }
        }

        return $response;
    }
}
