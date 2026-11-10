<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OptimizeResponse
{
    /**
     * Compress HTTP response with gzip if supported by client and not in automated test suite.
     */
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        // Security & Cache-friendly headers
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Vary', 'Accept-Encoding', false);

        // Skip compression during unit testing to avoid interfering with AssertInertia
        if (app()->runningUnitTests()) {
            return $response;
        }

        // Compress HTML, JSON, and text responses if client supports gzip and gzencode is available
        $acceptEncoding = $request->header('Accept-Encoding', '');
        if (str_contains($acceptEncoding, 'gzip') && function_exists('gzencode')) {
            $contentType = $response->headers->get('Content-Type', '');

            if (
                str_contains($contentType, 'text/html') ||
                str_contains($contentType, 'application/json') ||
                str_contains($contentType, 'text/plain')
            ) {
                $content = $response->getContent();
                if ($content && strlen($content) > 1024 && !str_contains((string) $response->headers->get('Content-Encoding', ''), 'gzip')) {
                    $compressed = gzencode($content, 6);
                    if ($compressed !== false) {
                        $response->setContent($compressed);
                        $response->headers->set('Content-Encoding', 'gzip');
                        $response->headers->set('Content-Length', (string) strlen($compressed));
                    }
                }
            }
        }

        return $response;
    }
}

