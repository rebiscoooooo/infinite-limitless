<?php

namespace Tests\Feature;

use App\Mail\WorldPlanStatusUpdatedMail;
use App\Models\AdminUser;
use App\Models\WorldPlanRegistration;
use App\Services\WorldPlanInvoiceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class WorldPlanInvoiceTest extends TestCase
{
    use RefreshDatabase;

    protected function createAdmin(): AdminUser
    {
        return AdminUser::create([
            'username' => 'testadmin',
            'name' => 'Test Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'role' => 'Super Admin',
            'status' => 'Active',
            'permissions' => ['all'],
        ]);
    }

    protected function createRegistration(array $overrides = []): WorldPlanRegistration
    {
        return WorldPlanRegistration::create(array_merge([
            'username' => 'globalvip_' . rand(100, 999),
            'email' => 'member_' . rand(1000, 9999) . '@example.com',
            'first_name' => 'Alexander',
            'middle_name' => 'V',
            'last_name' => 'Mercer',
            'birthdate' => '1990-05-15',
            'contact_no' => '+1 (555) 234-5678',
            'address' => '742 Evergreen Terrace, Springfield',
            'country' => 'United States',
            'sponsor' => 'Global Diamond Council',
            'package_type' => 'exec-diamond',
            'product_set' => 'Set A - Complete O\'Lamour Luxury Skincare + Infinite Barley Pack',
            'payment_method' => 'Wire Transfer',
            'amount_paid' => '$5,000 USD',
            'payment_date' => now()->toDateString(),
            'payment_proof' => 'receipt_test.jpg',
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
            'agreed_terms_at' => now(),
            'edit_token' => bin2hex(random_bytes(20)),
        ], $overrides));
    }

    public function test_world_plan_invoice_service_generates_valid_pdf(): void
    {
        $registration = $this->createRegistration();
        $invoiceService = app(WorldPlanInvoiceService::class);

        $data = $invoiceService->getInvoiceData($registration);
        $this->assertEquals('Diamond Executive Global Plan', $data['package_name']);
        $this->assertEquals('$5,000 USD', $data['price_display']);
        $this->assertEquals('PAID & APPROVED', $data['status']);
        $this->assertStringContainsString('INV-WP-', $data['invoice_number']);

        $pdfBytes = $invoiceService->generateInvoiceRawPdf($registration);
        $this->assertNotEmpty($pdfBytes);
        $this->assertStringStartsWith('%PDF-', $pdfBytes);
        $this->assertGreaterThan(5000, strlen($pdfBytes));
    }

    public function test_world_plan_status_updated_mail_attaches_pdf_invoice_when_approved(): void
    {
        $registration = $this->createRegistration(['status' => 'Approved']);
        $mailable = new WorldPlanStatusUpdatedMail($registration);

        $attachments = $mailable->attachments();
        $this->assertNotEmpty($attachments);

        // Find PDF invoice attachment
        $pdfAttachment = null;
        foreach ($attachments as $att) {
            $prop = new \ReflectionProperty($att, 'as');
            $asName = $prop->getValue($att);
            if (str_ends_with(strtolower($asName), '.pdf')) {
                $pdfAttachment = $att;
                break;
            }
        }

        $this->assertNotNull($pdfAttachment, 'Invoice PDF attachment must be present when approved.');
    }

    public function test_admin_can_download_invoice_pdf(): void
    {
        $admin = $this->createAdmin();
        $registration = $this->createRegistration(['status' => 'Approved']);

        $response = $this->actingAs($admin, 'admin')
            ->get(route('admin.world-plan.invoice', $registration));

        $response->assertStatus(200);
        $this->assertStringContainsString('application/pdf', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment;', $response->headers->get('Content-Disposition'));
    }

    public function test_approving_registration_dispatches_email_with_pdf_invoice(): void
    {
        Mail::fake();

        $admin = $this->createAdmin();
        $registration = $this->createRegistration(['status' => 'Pending']);

        $response = $this->actingAs($admin, 'admin')
            ->patch(route('admin.world-plan.status', $registration), [
                'status' => 'Approved',
                'admin_notes' => 'Welcome to the Diamond Executive circle!',
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('world_plan_registrations', [
            'id' => $registration->id,
            'status' => 'Approved',
            'admin_notes' => 'Welcome to the Diamond Executive circle!',
        ]);

        Mail::assertQueued(WorldPlanStatusUpdatedMail::class, function ($mail) use ($registration) {
            return $mail->registration->id === $registration->id;
        });
    }
}
