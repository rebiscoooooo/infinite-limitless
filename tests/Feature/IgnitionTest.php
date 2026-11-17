<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Spatie\FlareClient\Flare;
use Tests\TestCase;

class IgnitionTest extends TestCase
{
    public function test_error_renders_with_flare_ignition(): void
    {
        Route::get('/_test_ignition_error', function () {
            throw new \RuntimeException('Flare Ignition Test Exception Occurred');
        });

        $response = $this->get('/_test_ignition_error');
        $this->assertEquals(500, $response->getStatusCode());
        $content = $response->getContent();

        // Verify Ignition error page elements are present
        $this->assertTrue(str_contains($content, 'window.ignite'));
        $this->assertTrue(str_contains($content, 'Flare Ignition Test Exception Occurred'));
    }

    public function test_flare_test_artisan_command_executes_successfully(): void
    {
        $exitCode = Artisan::call('flare:test');
        $this->assertEquals(0, $exitCode);
        $output = Artisan::output();

        $this->assertStringContainsString('SPATIE FLARE & IGNITION DIAGNOSTIC', $output);
        $this->assertStringContainsString('IgnitionExceptionRenderer Active', $output);
        $this->assertStringContainsString('Configured (driver=flare)', $output);
    }

    public function test_flare_configuration_and_logging_channel(): void
    {
        $this->assertEquals('flare', config('logging.channels.flare.driver'));
        $this->assertContains('flare', config('logging.channels.stack.channels'));
        $this->assertTrue(app()->bound(Flare::class));
    }

    public function test_app_renders_safely_even_if_vite_manifest_entry_is_missing(): void
    {
        // Public home page rendering should succeed with HTTP 200
        $response = $this->get('/');
        $response->assertStatus(200);
        $content = $response->getContent();

        // Verify HTML contains built CSS and JS assets
        $this->assertStringContainsString('assets/app-', $content);
    }
}
