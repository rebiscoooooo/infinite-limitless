<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'admin' => Auth::guard('admin')->user() ? [
                    'id' => Auth::guard('admin')->user()->id,
                    'username' => Auth::guard('admin')->user()->username,
                    'name' => Auth::guard('admin')->user()->name,
                    'email' => Auth::guard('admin')->user()->email,
                    'role' => Auth::guard('admin')->user()->role,
                    'last_login' => Auth::guard('admin')->user()->last_login,
                ] : null,
                'academy' => Auth::guard('academy')->user() ? Auth::guard('academy')->user()->toSharedArray() : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'message' => fn () => $request->session()->get('message'),
            ],
            'appName' => config('app.name', 'INFINITE: Live Limitless'),
        ]);
    }
}
