<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAcademyMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::guard('academy')->check()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
            return redirect()->guest(route('academy.login'))->with('error', 'Please log in to access your Legacy Club Academy portal.');
        }

        $member = Auth::guard('academy')->user();
        if ($member->status !== 'Approved') {
            Auth::guard('academy')->logout();
            return redirect()->route('academy.login')->with('error', 'Your academy account status is not approved.');
        }

        return $next($request);
    }
}
