<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\Product;
use App\Models\WorldPlanRegistration;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RealtimeSyncTest extends TestCase
{
    use RefreshDatabase;

    public function test_realtime_pulse_endpoint_returns_valid_snapshot(): void
    {
        $response = $this->get('/realtime/pulse');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'inquiries' => ['count', 'unread_count', 'latest_id', 'latest_name', 'latest_subject', 'latest_at'],
            'world_plan' => ['count', 'pending_count', 'latest_id', 'latest_name', 'latest_package', 'latest_status', 'latest_at'],
            'products' => ['count', 'hash', 'latest_at'],
            'logs' => ['count', 'latest_id', 'latest_action', 'latest_admin'],
            'admins' => ['count', 'hash'],
            'server_time',
            'timestamp',
        ]);
    }

    public function test_api_realtime_pulse_endpoint_accessible(): void
    {
        $response = $this->getJson('/api/realtime/pulse');

        $response->assertStatus(200);
        $response->assertJson([
            'inquiries' => [
                'count' => 0,
            ],
            'world_plan' => [
                'count' => 0,
            ],
        ]);
    }

    public function test_new_inquiry_updates_realtime_snapshot(): void
    {
        $inquiry = Inquiry::create([
            'name' => 'Maria Clara',
            'email' => 'maria@example.com',
            'subject' => 'Product Inquiry',
            'message' => 'Interested in barley pack',
            'is_read' => false,
        ]);

        $response = $this->get('/realtime/pulse');

        $response->assertStatus(200);
        $response->assertJson([
            'inquiries' => [
                'count' => 1,
                'unread_count' => 1,
                'latest_id' => $inquiry->id,
                'latest_name' => 'Maria Clara',
                'latest_subject' => 'Product Inquiry',
            ],
        ]);
    }

    public function test_new_world_plan_registration_updates_realtime_snapshot(): void
    {
        $reg = WorldPlanRegistration::create([
            'username' => 'juandelacruz',
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'birthdate' => '1995-01-01',
            'email' => 'juan@example.com',
            'contact_no' => '+639123456789',
            'country' => 'Philippines',
            'address' => '123 Rizal St, Manila',
            'package_type' => 'Ruby Executive Global Plan',
            'payment_date' => '2026-11-08',
            'payment_proof' => 'proofs/sample.png',
            'amount_paid' => 15000,
            'status' => 'Pending',
            'agreed_terms' => true,
        ]);

        $response = $this->get('/realtime/pulse');

        $response->assertStatus(200);
        $response->assertJson([
            'world_plan' => [
                'count' => 1,
                'pending_count' => 1,
                'latest_id' => $reg->id,
                'latest_name' => 'Juan Dela Cruz',
                'latest_package' => 'Ruby Executive Global Plan',
                'latest_status' => 'Pending',
            ],
        ]);
    }

    public function test_product_modification_changes_products_hash(): void
    {
        $initialRes = $this->get('/realtime/pulse');
        $initialHash = $initialRes->json('products.hash');

        $product = Product::create([
            'name' => 'Test Realtime Product',
            'slug' => 'test-realtime-product',
            'category' => 'wellness',
            'category_name' => 'Wellness',
            'price' => '₱1,500.00',
            'is_active' => true,
        ]);

        $updatedRes = $this->get('/realtime/pulse');
        $newHash = $updatedRes->json('products.hash');

        $this->assertNotEquals($initialHash, $newHash);
        $this->assertEquals(1, $updatedRes->json('products.count'));
    }
}
