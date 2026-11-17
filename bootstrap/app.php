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
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Report exceptions to Flare if configured
        $exceptions->report(function (\Throwable $e) {
            if (app()->bound(\Spatie\FlareClient\Flare::class) && config('flare.key')) {
                app(\Spatie\FlareClient\Flare::class)->report($e);
            }
        });

        // Allow forced Flare-Ignition error page inspection (e.g. ?flare=1 or ?ignition=1)
        // while preserving standard validation, authentication, and HTTP redirects
        $exceptions->render(function (\Throwable $e, \Illuminate\Http\Request $request) {
            if ($e instanceof \Illuminate\Validation\ValidationException ||
                $e instanceof \Illuminate\Auth\AuthenticationException ||
                $e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                return null; // Let Laravel handle standard redirect and validation flows
            }

            $forceIgnition = $request->has('_ignition') || $request->has('flare') || $request->has('ignition');
            if ($forceIgnition) {
                if (app()->bound(\Illuminate\Contracts\Foundation\ExceptionRenderer::class)) {
                    return response(
                        app(\Illuminate\Contracts\Foundation\ExceptionRenderer::class)->render($e),
                        500
                    );
                }
            }

            return null;
        });
    })->create();
