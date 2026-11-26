<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\OptimizeResponse::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'backend/*',
            'api/*',
        ]);

        $middleware->alias([
            'admin.auth' => \App\Http\Middleware\AuthenticateAdmin::class,
            'admin.activity' => \App\Http\Middleware\LogAdminActivity::class,
            'academy.auth' => \App\Http\Middleware\AuthenticateAcademyMember::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Report exceptions to Flare if configured
        $exceptions->report(function (\Throwable $e) {
            if (app()->bound(\Spatie\FlareClient\Flare::class) && config('flare.key')) {
                app(\Spatie\FlareClient\Flare::class)->report($e);
            }
        });

        // Always render rich Flare-Ignition error page for unhandled application errors
        $exceptions->render(function (\Throwable $e, \Illuminate\Http\Request $request) {
            // Preserve standard redirects for validation and authentication flows
            if ($e instanceof \Illuminate\Validation\ValidationException ||
                $e instanceof \Illuminate\Auth\AuthenticationException ||
                $e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                return null;
            }

            // Preserve standard JSON error responses for API calls unless explicit
            if ($request->expectsJson() && ! $request->has('_ignition') && ! $request->has('flare') && ! $request->has('ignition')) {
                return null;
            }

            // Render interactive Flare-Ignition error page
            if (app()->bound(\Illuminate\Contracts\Foundation\ExceptionRenderer::class)) {
                try {
                    $html = app(\Illuminate\Contracts\Foundation\ExceptionRenderer::class)->render($e);
                    return response($html, 500)->header('Content-Type', 'text/html; charset=UTF-8');
                } catch (\Throwable $ignitionError) {
                    return null;
                }
            }

            return null;
        });
    })->create();
