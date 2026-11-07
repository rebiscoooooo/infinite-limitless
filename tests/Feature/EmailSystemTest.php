<?php

namespace Tests\Feature;

use App\Mail\InquiryConfirmationUserMail;
use App\Mail\InquiryReceivedAdminMail;
use App\Mail\InquiryReplyMail;
use App\Mail\WorldPlanReceivedAdminMail;
use App\Mail\WorldPlanReceivedConfirmationMail;
use App\Mail\WorldPlanStatusUpdatedMail;
use App\Models\AdminUser;
use App\Models\Inquiry;
use App\Models\WorldPlanRegistration;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class EmailSystemTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);

        if (!AdminUser::where('username', 'admin')->exists()) {
            AdminUser::create([
                'username' => 'admin',
                'password' => Hash::make('Infinite#1230'),
            ]);
        }
    }

    public function test_inquiry_submission_dispatches_email_to_admin_and_confirmation_to_user(): void
    {
        Mail::fake();

        $response = $this->postJson('/inquiries', [
            'name' => 'Maria Santos',
            'email' => 'maria.santos@example.com',
            'subject' => 'Order Barley',
            'message' => 'I would like to order 5 boxes of Infinite Barley.',
        ]);

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);

        // Check user inquiry saved in database
        $this->assertDatabaseHas('inquiries', [
            'email' => 'maria.santos@example.com',
            'subject' => 'Order Barley',
        ]);

        $adminEmail = config('mail.admin_address', 'infinitelimitless123@gmail.com');

        // Check email notification sent to admin
        Mail::assertQueued(InquiryReceivedAdminMail::class, function ($mail) use ($adminEmail) {
            return $mail->hasTo($adminEmail);
        });

        // Check email confirmation sent to user
        Mail::assertQueued(InquiryConfirmationUserMail::class, function ($mail) {
            return $mail->hasTo('maria.santos@example.com');
        });
    }

    public function test_admin_inquiry_reply_sends_email_to_inquiry_email_address(): void
    {
        Mail::fake();

        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);

        $inquiry = Inquiry::create([
            'name' => 'Kouame Yao',
            'email' => 'kouame.yao@example.com',
            'subject' => 'Distributor Question',
            'message' => 'How can I register as a distributor in Abidjan?',
        ]);

        $replySubject = 'Re: Distributor Question - Welcome to Infinite';
        $replyBody = 'Hello Kouame, we would be delighted to partner with you in Abidjan.';

        $response = $this->post("/admin/inquiries/{$inquiry->id}/reply", [
            'reply_subject' => $replySubject,
            'reply_message' => $replyBody,
        ]);

        $response->assertRedirect();

        Mail::assertQueued(InquiryReplyMail::class, function ($mail) use ($inquiry, $replySubject) {
            return $mail->hasTo('kouame.yao@example.com') &&
                   $mail->envelope()->subject === $replySubject;
        });

        $this->assertTrue((bool)$inquiry->fresh()->is_read);

        $this->assertDatabaseHas('activity_logs', [
            'admin_user' => 'admin',
            'action_type' => "Sent Reply to kouame.yao@example.com",
            'status' => 'Success',
        ]);
    }

    public function test_world_plan_registration_status_update_approved_sends_approval_email(): void
    {
        Mail::fake();

        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);

        $registration = WorldPlanRegistration::create([
            'username' => 'leader_approved_' . uniqid(),
            'email' => 'approved_leader_' . uniqid() . '@example.com',
            'first_name' => 'Emmanuel',
            'last_name' => 'Badu',
            'birthdate' => '1988-11-20',
            'contact_no' => '+233241122334',
            'address' => 'Accra, Ghana',
            'package_type' => 'exec-ruby',
            'payment_date' => '2026-11-01',
            'payment_proof' => 'ghana_slip.jpg',
            'status' => 'Pending',
        ]);

        $response = $this->patch("/admin/world-plan/{$registration->id}/status", [
            'status' => 'Approved',
        ]);

        $response->assertRedirect();
        $this->assertEquals('Approved', $registration->fresh()->status);

        Mail::assertQueued(WorldPlanStatusUpdatedMail::class, function ($mail) use ($registration) {
            return $mail->hasTo($registration->email) &&
                   str_contains($mail->envelope()->subject, 'Approved');
        });
    }

    public function test_world_plan_registration_status_update_rejected_sends_rejection_email(): void
    {
        Mail::fake();

        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);

        $registration = WorldPlanRegistration::create([
            'username' => 'leader_rejected_' . uniqid(),
            'email' => 'rejected_leader_' . uniqid() . '@example.com',
            'first_name' => 'Kwame',
            'last_name' => 'Mensah',
            'birthdate' => '1992-03-14',
            'contact_no' => '+233249988776',
            'address' => 'Kumasi, Ghana',
            'package_type' => 'exec-pearl',
            'payment_date' => '2026-11-02',
            'payment_proof' => 'invalid_slip.jpg',
            'status' => 'Pending',
        ]);

        $response = $this->patch("/admin/world-plan/{$registration->id}/status", [
            'status' => 'Rejected',
        ]);

        $response->assertRedirect();
        $this->assertEquals('Rejected', $registration->fresh()->status);

        Mail::assertQueued(WorldPlanStatusUpdatedMail::class, function ($mail) use ($registration) {
            return $mail->hasTo($registration->email) &&
                   str_contains($mail->envelope()->subject, 'Application');
        });
    }

    public function test_api_inquiries_and_reply_endpoints(): void
    {
        Mail::fake();

        // 1. Submit via REST API
        $response = $this->postJson('/api/inquiries', [
            'name' => 'API Customer',
            'email' => 'api.client@example.com',
            'subject' => 'Wholesale Inquiry',
            'message' => 'Please provide the bulk wholesale tier rates.',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        $inquiryId = $response->json('inquiry_id');
        $this->assertNotNull($inquiryId);

        // 2. Reply via REST API
        $replyResponse = $this->postJson("/api/inquiries/{$inquiryId}/reply", [
            'reply_subject' => 'Re: Wholesale Inquiry',
            'reply_message' => 'Here are our distributor tier rates.',
        ]);

        $replyResponse->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);

        Mail::assertQueued(InquiryReplyMail::class, function ($mail) {
            return $mail->hasTo('api.client@example.com');
        });
    }

    public function test_api_world_plan_status_update_endpoint(): void
    {
        Mail::fake();

        $registration = WorldPlanRegistration::create([
            'username' => 'api_leader_' . uniqid(),
            'email' => 'api_leader_' . uniqid() . '@example.com',
            'first_name' => 'Fatima',
            'last_name' => 'Diallo',
            'birthdate' => '1994-07-22',
            'contact_no' => '+221770001122',
            'address' => 'Dakar, Senegal',
            'package_type' => 'exec-diamond',
            'payment_date' => '2026-11-03',
            'payment_proof' => 'senegal_slip.jpg',
            'status' => 'Pending',
        ]);

        $response = $this->postJson("/api/world-plan/registrations/{$registration->id}/status", [
            'status' => 'Approved',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'email_sent' => true,
            ]);

        $this->assertEquals('Approved', $registration->fresh()->status);

        Mail::assertQueued(WorldPlanStatusUpdatedMail::class, function ($mail) use ($registration) {
            return $mail->hasTo($registration->email);
        });
    }

    public function test_legacy_backend_php_endpoints_compatibility(): void
    {
        Mail::fake();

        // 1. POST /backend/submit_inquiry.php
        $res1 = $this->post('/backend/submit_inquiry.php', [
            'name' => 'Legacy Inquirer',
            'email' => 'legacy.inquiry@example.com',
            'subject' => 'Coffee Inquiry',
            'message' => 'Can I order Robustus Coffee?',
        ]);
        $res1->assertStatus(200)
            ->assertJson(['status' => 'success']);

        // 2. POST /backend/send_contact.php
        $res2 = $this->post('/backend/send_contact.php', [
            'name' => 'Legacy Contact',
            'email' => 'legacy.contact@example.com',
            'subject' => 'Product Feedback',
            'message' => 'Great results with the serum!',
        ]);
        $res2->assertStatus(200)
            ->assertJson(['status' => 'success']);

        // 3. POST /backend/api_send_reply.php
        $inquiry = Inquiry::create([
            'name' => 'Legacy Reply Target',
            'email' => 'legacy.target@example.com',
            'subject' => 'Need Help',
            'message' => 'How to log in?',
        ]);

        $res3 = $this->post('/backend/api_send_reply.php', [
            'inquiry_id' => $inquiry->id,
            'reply_subject' => 'Re: Need Help',
            'reply_message' => 'You can log in at /admin/login.',
        ]);
        $res3->assertStatus(200)
            ->assertJson(['status' => 'success']);

        Mail::assertQueued(InquiryReplyMail::class, function ($mail) {
            return $mail->hasTo('legacy.target@example.com');
        });
    }

    public function test_registration_module_renders_successfully(): void
    {
        $response = $this->get('/registration');
        $response->assertStatus(200);
    }

    public function test_registration_submission_creates_record_with_agreed_terms_and_dispatches_emails(): void
    {
        Mail::fake();
        Storage::fake('public');

        $file = UploadedFile::fake()->create('receipt.jpg', 150, 'image/jpeg');

        $response = $this->post('/registration', [
            'username' => 'new_world_leader_' . uniqid(),
            'email' => 'new_leader_' . uniqid() . '@example.com',
            'firstName' => 'John',
            'lastName' => 'Doe',
            'birthdate' => '1990-05-15',
            'contact' => '+639171234567',
            'country' => 'Philippines',
            'address' => '123 Bonifacio St, Taguig',
            'packageType' => 'Ruby Executive Global Plan',
            'productSet' => 'Set A - Complete O\'Lamour Luxury Skincare + Infinite Barley Pack',
            'paymentMethod' => 'Wise (Multi-Currency Transfer)',
            'amountPaid' => '$1,750 USD',
            'paymentDate' => '2026-11-05',
            'paymentProof' => $file,
            'agreedTerms' => 'on',
        ]);

        $response->assertRedirect();

        $registration = WorldPlanRegistration::where('first_name', 'John')->latest()->first();
        $this->assertNotNull($registration);
        $this->assertEquals('Yes', $registration->agreed_terms);
        $this->assertNotNull($registration->agreed_terms_at);
        $this->assertNotNull($registration->edit_token);
        $this->assertNotNull($registration->edit_url);

        $adminEmail = config('mail.admin_address', 'infinitelimitless123@gmail.com');
        Mail::assertQueued(WorldPlanReceivedAdminMail::class, function ($mail) use ($adminEmail) {
            return $mail->hasTo($adminEmail);
        });

        Mail::assertQueued(WorldPlanReceivedConfirmationMail::class, function ($mail) use ($registration) {
            return $mail->hasTo($registration->email);
        });
    }

    public function test_registration_edit_allows_user_to_update_details(): void
    {
        Mail::fake();

        $registration = WorldPlanRegistration::create([
            'username' => 'editable_' . uniqid(),
            'email' => 'editable_' . uniqid() . '@example.com',
            'first_name' => 'Sara',
            'last_name' => 'Connor',
            'birthdate' => '1985-02-10',
            'contact_no' => '+15551234567',
            'address' => 'Los Angeles, USA',
            'package_type' => 'Emerald Executive Global Plan',
            'payment_date' => '2026-11-01',
            'payment_proof' => 'receipt.jpg',
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
            'agreed_terms_at' => now(),
            'edit_token' => 'edit_token_' . uniqid(),
        ]);

        // GET edit page
        $editGet = $this->get("/registration/edit/{$registration->edit_token}");
        $editGet->assertStatus(200);

        // POST update
        $updatePost = $this->post("/registration/edit/{$registration->edit_token}", [
            'firstName' => 'Sarah',
            'middleName' => 'Jean',
            'lastName' => 'Connor',
            'birthdate' => '1985-02-10',
            'contact' => '+15559876543',
            'address' => '456 Hollywood Blvd, LA',
            'packageType' => 'Ruby Executive Global Plan',
            'productSet' => 'Set B - Infinite Barley Supreme Organic Health & Wellness Pack',
            'paymentDate' => '2026-11-01',
        ]);

        $updatePost->assertRedirect();
        $this->assertEquals('Sarah', $registration->fresh()->first_name);
        $this->assertEquals('+15559876543', $registration->fresh()->contact_no);
        $this->assertEquals('Ruby Executive Global Plan', $registration->fresh()->package_type);
    }
}

