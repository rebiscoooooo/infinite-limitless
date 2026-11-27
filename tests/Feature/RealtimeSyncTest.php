<?php

namespace Tests\Feature;

use App\Models\AcademyCertificate;
use App\Models\AcademyMember;
use App\Models\AcademyTraining;
use App\Models\AcademyTrainingProgress;
use App\Models\AdminUser;
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

    public function test_academy_member_and_training_changes_update_realtime_snapshot_instantly(): void
    {
        $this->seed(\Database\Seeders\AcademyCurriculumSeeder::class);

        $admin = AdminUser::create([
            'username' => 'rtadmin',
            'name' => 'Realtime Admin',
            'email' => 'rtadmin@example.com',
            'password' => bcrypt('Secret123!'),
            'role' => 'Super Admin',
            'status' => 'Active',
        ]);

        // Initial snapshot baseline (warms the 1s cache)
        $before = $this->get('/realtime/pulse')->assertStatus(200);
        $initialAcademyHash = $before->json('academy.hash');
        $this->assertNotEmpty($initialAcademyHash);

        // Create approved member & authenticate as Academy member
        $member = AcademyMember::create([
            'first_name' => 'Liza',
            'last_name' => 'Reyes',
            'phone_country_code' => '+63',
            'phone_number' => '9171234567',
            'email' => 'liza.rt@example.com',
            'password' => 'Secret1234!',
            'address' => 'Manila',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');
        \App\Http\Controllers\RealtimeController::flushAcademyCache();

        $this->actingAs($member, 'academy');
        $afterMember = $this->get('/realtime/pulse')->assertStatus(200);
        $this->assertNotEquals($initialAcademyHash, $afterMember->json('academy.hash'));
        $this->assertEquals(1, $afterMember->json('academy.members.count'));
        $this->assertEquals($member->id, $afterMember->json('academy_member.id'));
        $initialMemberHash = $afterMember->json('academy_member.hash');

        // Member submits reflection -> must bust cache and update both admin & member snapshots immediately
        $training1 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 1)->first();
        $this->post(route('academy.trainings.reflect', $training1->id), [
            'reflection_submission' => 'Deep reflection on foundational leadership module 1 for realtime verification.',
        ])->assertSessionHasNoErrors();

        $afterReflect = $this->get('/realtime/pulse')->assertStatus(200);
        $this->assertEquals(1, $afterReflect->json('academy.reflections.pending_count'));
        $this->assertEquals(1, $afterReflect->json('academy_member.training_submitted'));
        $this->assertNotEquals($initialMemberHash, $afterReflect->json('academy_member.hash'));
        $hashAfterReflect = $afterReflect->json('academy_member.hash');

        // Admin approves reflection -> must bust cache and immediately reflect in member's pulse
        $prog = AcademyTrainingProgress::where('member_id', $member->id)->where('training_id', $training1->id)->first();
        $this->actingAs($admin, 'admin');
        $this->post(route('admin.academy.trainings.review', $prog->id), [
            'action' => 'approve',
            'admin_feedback' => 'Great job!',
        ])->assertSessionHasNoErrors();

        $this->actingAs($member, 'academy');
        $afterApprove = $this->get('/realtime/pulse')->assertStatus(200);
        $this->assertEquals(0, $afterApprove->json('academy.reflections.pending_count'));
        $this->assertEquals(1, $afterApprove->json('academy_member.training_approved'));
        $this->assertNotEquals($hashAfterReflect, $afterApprove->json('academy_member.hash'));

        // Certificate conferral updates certificates hash immediately
        $certHashBefore = $afterApprove->json('academy_member.certificates_hash');
        AcademyCertificate::create([
            'member_id' => $member->id,
            'rank_tier' => 'Rookie',
            'certificate_type' => 'training',
            'certificate_number' => 'LCAC-ROOKIE-99999-2026',
            'issued_at' => now(),
            'template_design' => 'classic-gold',
        ]);
        \App\Http\Controllers\RealtimeController::flushAcademyCache();

        $afterCert = $this->get('/realtime/pulse')->assertStatus(200);
        $this->assertEquals(1, $afterCert->json('academy_member.certificates_count'));
        $this->assertNotEquals($certHashBefore, $afterCert->json('academy_member.certificates_hash'));
    }
}
