<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\AdminUser;
use App\Models\Inquiry;
use App\Models\WorldPlanRegistration;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InfiniteMigrationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);
        // Seed database if empty
        if (!AdminUser::where('username', 'admin')->exists()) {
            AdminUser::create([
                'username' => 'admin',
                'password' => Hash::make('Infinite#1230'),
            ]);
        }
    }

    public function test_public_pages_render_expected_inertia_components(): void
    {
        $this->get('/')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Home'));

        $this->get('/barley')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Barley'));

        $this->get('/olamour')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Olamour'));

        $this->get('/info')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Info')
                ->has('executiveTiers', 4)
                ->has('proofs.receipts')
                ->has('proofs.certifications')
            );

        $this->get('/select-country')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('SelectCountry'));

        $this->get('/join-community/burkina-faso')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('JoinCommunity')
                ->where('country.name', 'Burkina Faso')
            );

        $this->get('/world-plan')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('WorldPlan'));
    }

    public function test_inquiry_submission_validates_and_stores(): void
    {
        Mail::fake();

        $response = $this->postJson('/inquiries', [
            'name' => 'Jean-Luc Test',
            'email' => 'jeanluc@example.com',
            'subject' => 'Order Barley',
            'message' => 'I would like to inquire about bulk ordering for West Africa distribution.',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        $this->assertDatabaseHas('inquiries', [
            'email' => 'jeanluc@example.com',
            'subject' => 'Order Barley',
        ]);
    }

    public function test_world_plan_registration_upload_and_stores(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('proof.jpg', 150, 'image/jpeg');

        $response = $this->from('/world-plan')->post('/register-world-plan', [
            'username' => 'testleader_' . uniqid(),
            'email' => 'leader' . uniqid() . '@example.com',
            'firstName' => 'Michael',
            'middleName' => 'K',
            'lastName' => 'Osei',
            'birthdate' => '1990-05-15',
            'contact' => '+22670112233',
            'address' => 'Secteur 15, Ouagadougou',
            'packageType' => 'exec-ruby',
            'paymentDate' => '2026-10-20',
            'paymentProof' => $file,
        ]);

        $response->assertRedirect('/world-plan');
        $this->assertDatabaseHas('world_plan_registrations', [
            'package_type' => 'exec-ruby',
            'first_name' => 'Michael',
            'status' => 'Pending',
        ]);
    }

    public function test_admin_authentication_and_dashboard_access(): void
    {
        $loginResponse = $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);

        $loginResponse->assertRedirect('/admin/dashboard');

        // Check activity log was created
        $this->assertDatabaseHas('activity_logs', [
            'admin_user' => 'admin',
            'action_type' => 'Login',
        ]);

        // Dashboard accessible
        $dashboardResponse = $this->get('/admin/dashboard');
        $dashboardResponse->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Dashboard'));
    }

    public function test_admin_can_manage_inquiries_and_world_plan(): void
    {
        // Login as admin
        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);

        // Create inquiry
        $inquiry = Inquiry::create([
            'name' => 'Admin Test User',
            'email' => 'inquiry_test@infinite.com',
            'subject' => 'Join Us',
            'message' => 'Interested in becoming a country distributor.',
            'is_read' => false,
        ]);

        // View Inquiries
        $this->get('/admin/inquiries')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Inquiries'));

        // Mark as read
        $this->patch("/admin/inquiries/{$inquiry->id}/toggle-read")
            ->assertRedirect();
        $this->assertTrue((bool)$inquiry->fresh()->is_read);

        // Create pending world plan registration
        $registration = WorldPlanRegistration::create([
            'username' => 'directortest_' . uniqid(),
            'email' => 'director' . uniqid() . '@example.com',
            'first_name' => 'Amadou',
            'last_name' => 'Traore',
            'birthdate' => '1985-04-12',
            'contact_no' => '+22670998877',
            'address' => 'Ouagadougou, Burkina Faso',
            'package_type' => 'exec-diamond',
            'payment_date' => '2026-10-22',
            'payment_proof' => 'sample_proof.jpg',
            'status' => 'Pending',
        ]);

        // View World Plan registrations
        $this->get('/admin/world-plan')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Admin/WorldPlanRegistrations'));

        // Approve registration
        $this->patch("/admin/world-plan/{$registration->id}/status", [
            'status' => 'Approved',
        ])->assertRedirect();

        $this->assertEquals('Approved', $registration->fresh()->status);

        // Delete inquiry
        $this->delete("/admin/inquiries/{$inquiry->id}")
            ->assertRedirect();
        $this->assertDatabaseMissing('inquiries', ['id' => $inquiry->id]);
    }

    public function test_unauthenticated_user_cannot_access_admin(): void
    {
        $response = $this->get('/admin/dashboard');
        $response->assertRedirect('/admin/login');
    }

    public function test_admin_login_supports_fallback_passwords(): void
    {
        $response = $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'admin123',
        ]);
        $response->assertRedirect('/admin/dashboard');
    }

    public function test_admin_inquiry_reply_dispatches_email(): void
    {
        Mail::fake();

        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);

        $inquiry = Inquiry::create([
            'name' => 'Email Recipient',
            'email' => 'client@example.com',
            'subject' => 'Product Query',
            'message' => 'Please provide the catalog.',
        ]);

        $response = $this->post("/admin/inquiries/{$inquiry->id}/reply", [
            'reply_subject' => 'Re: Product Query',
            'reply_message' => 'Thank you for contacting us. Here is the catalog link.',
        ]);

        $response->assertRedirect();

        Mail::assertQueued(\App\Mail\InquiryReplyMail::class, function ($mail) use ($inquiry) {
            return $mail->hasTo('client@example.com');
        });
    }

    public function test_world_plan_registration_payment_proof_url_accessor(): void
    {
        $registration = new WorldPlanRegistration([
            'payment_proof' => 'sample_file.png',
        ]);

        $this->assertStringContainsString('sample_file.png', $registration->payment_proof_url);
        $this->assertEquals('sample_file.png', $registration->payment_receipt);
    }
}

