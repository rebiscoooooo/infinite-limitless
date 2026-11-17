<?php

namespace Tests\Feature;

use App\Mail\ProductMarketingMail;
use App\Models\ActivityLog;
use App\Models\AdminUser;
use App\Models\Inquiry;
use App\Models\MarketingCampaign;
use App\Models\MarketingUnsubscribe;
use App\Models\Product;
use App\Models\User;
use App\Models\WorldPlanRegistration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class NewFeaturesTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);

        if (!AdminUser::where('username', 'admin')->exists()) {
            AdminUser::create([
                'name' => 'Master Admin',
                'username' => 'admin',
                'email' => 'admin@infinite-limitless.com',
                'password' => Hash::make('Infinite#1230'),
                'role' => 'Super Admin',
                'status' => 'Active',
            ]);
        }
    }

    private function loginAdmin(): void
    {
        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);
    }

    /**
     * Test 1: Daily product marketing email gathers emails and dispatches.
     */
    public function test_daily_marketing_command_dispatches_to_database_recipients(): void
    {
        Mail::fake();

        // Seed product
        Product::updateOrCreate(
            ['slug' => 'test-barley-powder'],
            [
                'name' => 'INFINITE Organic Barley Powder',
                'category' => 'wellness',
                'short_description' => 'Test organic barley',
                'description' => 'Rich in nutrients.',
                'benefits' => ['Detox', 'Energy'],
                'price' => 35.00,
                'is_active' => true,
            ]
        );

        $inqEmail = 'jane_' . uniqid() . '@example.com';
        $regEmail = 'bob_' . uniqid() . '@example.com';
        $adminEmail = 'admin_target_' . uniqid() . '@infinite-limitless.com';

        // Seed inquiries, registrations, admin accounts
        Inquiry::create([
            'name' => 'Inquirer Jane',
            'email' => $inqEmail,
            'phone' => '123456789',
            'subject' => 'Product question',
            'message' => 'Tell me more about barley.',
        ]);

        WorldPlanRegistration::create([
            'username' => 'bob_' . uniqid(),
            'email' => $regEmail,
            'first_name' => 'Bob',
            'last_name' => 'Registered',
            'birthdate' => '1990-01-01',
            'contact_no' => '987654321',
            'address' => 'Manila, Philippines',
            'package_type' => 'Package Alpha',
            'payment_date' => '2026-11-08',
            'payment_proof' => 'proof.png',
            'status' => 'Rejected', // even rejected should receive marketing
            'agreed_terms' => true,
            'agreed_privacy' => true,
        ]);

        AdminUser::create([
            'name' => 'Internal Staff Admin',
            'username' => 'staff_' . uniqid(),
            'email' => $adminEmail,
            'password' => Hash::make('password123'),
            'role' => 'Admin',
            'status' => 'Active',
        ]);

        // Run marketing command with dry-run
        $this->artisan('marketing:send-daily-product', [
            '--dry-run' => true,
            '--force' => true,
        ])->assertExitCode(0);

        Mail::assertNothingSent();

        // Run marketing command with live dispatch
        $this->artisan('marketing:send-daily-product', [
            '--force' => true,
        ])->assertExitCode(0);

        // Verify Inquiry and World Plan recipients received marketing
        Mail::assertQueued(ProductMarketingMail::class, function ($mail) use ($inqEmail) {
            return $mail->recipientEmail === $inqEmail;
        });

        Mail::assertQueued(ProductMarketingMail::class, function ($mail) use ($regEmail) {
            return $mail->recipientEmail === $regEmail;
        });

        // Strictly verify that Admin account DID NOT receive marketing
        Mail::assertNotQueued(ProductMarketingMail::class, function ($mail) use ($adminEmail) {
            return $mail->recipientEmail === $adminEmail;
        });
    }

    /**
     * Test 1b: Unsubscribed users are excluded from marketing.
     */
    public function test_unsubscribed_users_are_excluded_from_marketing(): void
    {
        Mail::fake();

        $optOutEmail = 'optout_' . uniqid() . '@example.com';

        Product::updateOrCreate(
            ['slug' => 'test-barley-powder'],
            [
                'name' => 'INFINITE Organic Barley Powder',
                'category' => 'wellness',
                'short_description' => 'Test organic barley',
                'is_active' => true,
            ]
        );

        Inquiry::create([
            'name' => 'Unsubscribed User',
            'email' => $optOutEmail,
            'subject' => 'Hi',
            'message' => 'Hello',
        ]);

        MarketingUnsubscribe::create([
            'email' => $optOutEmail,
            'reason' => 'User clicked unsubscribe',
        ]);

        $this->artisan('marketing:send-daily-product', [
            '--force' => true,
        ])->assertExitCode(0);

        Mail::assertNotQueued(ProductMarketingMail::class, function ($mail) use ($optOutEmail) {
            return $mail->recipientEmail === $optOutEmail;
        });
    }

    /**
     * Test 1c: Unsubscribe endpoint functions properly.
     */
    public function test_marketing_unsubscribe_endpoint(): void
    {
        $email = 'member_' . uniqid() . '@example.com';
        $token = hash_hmac('sha256', strtolower(trim($email)), config('app.key'));

        $response = $this->get("/unsubscribe?email=" . urlencode($email) . "&token=" . $token);
        $response->assertStatus(200);

        $this->assertDatabaseHas('marketing_unsubscribes', [
            'email' => $email,
        ]);
    }

    /**
     * Test 2: Admin Products module CRUD.
     */
    public function test_admin_can_crud_products(): void
    {
        $this->loginAdmin();

        // Create product
        $createResponse = $this->from('/admin/products')->post('/admin/products', [
            'name' => 'INFINITE New Super Shake',
            'category' => 'wellness',
            'category_name' => 'Wellness',
            'short_description' => 'Organic vegan shake',
            'description' => 'Full nutritional meal replacement.',
            'benefits' => "High protein\n24 vitamins\nPlant based",
            'price' => 49.99,
            'price_display' => '$49.99 USD',
            'display_order' => 5,
            'is_active' => 1,
            'is_featured' => 1,
        ]);

        $createResponse->assertRedirect('/admin/products');
        $this->assertDatabaseHas('products', [
            'name' => 'INFINITE New Super Shake',
            'category' => 'wellness',
        ]);

        $newProduct = Product::where('name', 'INFINITE New Super Shake')->first();

        // Update product
        $updateResponse = $this->from('/admin/products')->post("/admin/products/{$newProduct->id}", [
            'name' => 'INFINITE New Super Shake Deluxe',
            'category' => 'wellness',
            'price' => 59.99,
            'is_active' => 1,
        ]);
        $updateResponse->assertRedirect('/admin/products');
        $this->assertDatabaseHas('products', [
            'id' => $newProduct->id,
            'name' => 'INFINITE New Super Shake Deluxe',
        ]);

        // Bulk archive
        $this->from('/admin/products')->post('/admin/products/bulk-archive', ['ids' => [$newProduct->id]])->assertRedirect('/admin/products');
        $this->assertNotNull($newProduct->fresh()->archived_at);

        // Bulk restore
        $this->from('/admin/products')->post('/admin/products/bulk-restore', ['ids' => [$newProduct->id]])->assertRedirect('/admin/products');
        $this->assertNull($newProduct->fresh()->archived_at);

        // Bulk delete
        $this->from('/admin/products')->post('/admin/products/bulk-delete', ['ids' => [$newProduct->id]])->assertRedirect('/admin/products');
        $this->assertDatabaseMissing('products', ['id' => $newProduct->id]);
    }

    /**
     * Test 3: Admin creation and management module.
     */
    public function test_admin_can_create_and_manage_admins(): void
    {
        $this->loginAdmin();
        $currentAdmin = AdminUser::where('username', 'admin')->first();

        $newUsername = 'staff_' . uniqid();
        $newEmail = 'staff_' . uniqid() . '@infinite.com';

        // Create new admin
        $response = $this->from('/admin/admins')->post('/admin/admins', [
            'name' => 'New Regional Admin',
            'username' => $newUsername,
            'email' => $newEmail,
            'password' => 'SecurePass2026!',
            'password_confirmation' => 'SecurePass2026!',
            'role' => 'Admin',
            'status' => 'Active',
        ]);

        $response->assertRedirect('/admin/admins');
        $this->assertDatabaseHas('admin_users', [
            'username' => $newUsername,
            'email' => $newEmail,
            'role' => 'Admin',
        ]);

        $newAdmin = AdminUser::where('username', $newUsername)->first();
        $this->assertTrue(Hash::check('SecurePass2026!', $newAdmin->password));

        // Safeguard: Cannot delete self
        $this->from('/admin/admins')->delete("/admin/admins/{$currentAdmin->id}")->assertRedirect('/admin/admins');
        $this->assertDatabaseHas('admin_users', ['id' => $currentAdmin->id]);

        // Can delete other admin
        $this->from('/admin/admins')->delete("/admin/admins/{$newAdmin->id}")->assertRedirect('/admin/admins');
        $this->assertDatabaseMissing('admin_users', ['id' => $newAdmin->id]);
    }

    /**
     * Test 4: Bulk actions on Inquiries, World Plan Registrations, Activity Logs.
     */
    public function test_bulk_archive_restore_delete_across_modules(): void
    {
        $this->loginAdmin();

        // 1. Inquiries
        $inq = Inquiry::create([
            'name' => 'Bulk Inquiry',
            'email' => 'bulk_inq_' . uniqid() . '@example.com',
            'subject' => 'Bulk test',
            'message' => 'Testing bulk operations',
        ]);

        $this->from('/admin/inquiries')->post('/admin/inquiries/bulk-archive', ['ids' => [$inq->id]])->assertRedirect('/admin/inquiries');
        $this->assertNotNull($inq->fresh()->archived_at);

        $this->from('/admin/inquiries')->post('/admin/inquiries/bulk-restore', ['ids' => [$inq->id]])->assertRedirect('/admin/inquiries');
        $this->assertNull($inq->fresh()->archived_at);

        $this->from('/admin/inquiries')->post('/admin/inquiries/bulk-delete', ['ids' => [$inq->id]])->assertRedirect('/admin/inquiries');
        $this->assertDatabaseMissing('inquiries', ['id' => $inq->id]);

        // 2. World Plan Registrations
        $wpr = WorldPlanRegistration::create([
            'username' => 'bulk_user_' . uniqid(),
            'email' => 'bulk_reg_' . uniqid() . '@example.com',
            'first_name' => 'Bulk',
            'last_name' => 'Registrant',
            'birthdate' => '1992-05-15',
            'contact_no' => '1234567890',
            'address' => 'Nairobi, Kenya',
            'package_type' => 'Package Alpha',
            'payment_date' => '2026-11-08',
            'payment_proof' => 'proof.jpg',
            'agreed_terms' => true,
            'agreed_privacy' => true,
        ]);

        $this->from('/admin/world-plan')->post('/admin/world-plan/bulk-archive', ['ids' => [$wpr->id]])->assertRedirect('/admin/world-plan');
        $this->assertNotNull($wpr->fresh()->archived_at);

        $this->from('/admin/world-plan')->post('/admin/world-plan/bulk-restore', ['ids' => [$wpr->id]])->assertRedirect('/admin/world-plan');
        $this->assertNull($wpr->fresh()->archived_at);

        $this->from('/admin/world-plan')->post('/admin/world-plan/bulk-delete', ['ids' => [$wpr->id]])->assertRedirect('/admin/world-plan');
        $this->assertDatabaseMissing('world_plan_registrations', ['id' => $wpr->id]);

        // 3. Activity Logs
        $log = ActivityLog::create([
            'admin_user' => 'bulk_tester',
            'action_type' => 'Test Action',
            'device_type' => 'Desktop PC',
            'os_browser' => 'Chrome 120 / Windows 11',
            'ip_address' => '127.0.0.1',
            'status' => 'Success',
        ]);

        $this->from('/admin/activity-logs')->post('/admin/activity-logs/bulk-archive', ['ids' => [$log->id]])->assertRedirect('/admin/activity-logs');
        $this->assertNotNull($log->fresh()->archived_at);

        $this->from('/admin/activity-logs')->post('/admin/activity-logs/bulk-restore', ['ids' => [$log->id]])->assertRedirect('/admin/activity-logs');
        $this->assertNull($log->fresh()->archived_at);

        $this->from('/admin/activity-logs')->post('/admin/activity-logs/bulk-delete', ['ids' => [$log->id]])->assertRedirect('/admin/activity-logs');
        $this->assertDatabaseMissing('activity_logs', ['id' => $log->id]);
    }

    /**
     * Test receipt serving, streaming, and download routes.
     */
    public function test_receipt_serving_and_download_endpoints(): void
    {
        $dir = storage_path('app/public/payment_proofs');
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $testFile = 'unit_test_receipt_' . uniqid() . '.jpg';
        $testPath = $dir . '/' . $testFile;
        file_put_contents($testPath, 'fake_image_binary_content');

        try {
            // View endpoint
            $viewResp = $this->get('/storage/payment_proofs/' . $testFile);
            $viewResp->assertStatus(200);
            $viewResp->assertHeader('Content-Disposition', 'inline; filename="' . $testFile . '"');

            // Download endpoint
            $dlResp = $this->get('/storage/payment_proofs/' . $testFile . '/download');
            $dlResp->assertStatus(200);

            // Alternate alias endpoint
            $aliasResp = $this->get('/receipts/' . $testFile);
            $aliasResp->assertStatus(200);

            // Missing file fallback
            $missingResp = $this->get('/storage/payment_proofs/missing_receipt_12345.jpg');
            $missingResp->assertStatus(404);
            $missingResp->assertHeader('Content-Type', 'image/svg+xml');
        } finally {
            if (file_exists($testPath)) {
                unlink($testPath);
            }
        }
    }

    /**
     * Test product marketing mail includes photo attachment and viewable public image.
     */
    public function test_product_marketing_mail_includes_photo_attachment_and_public_image(): void
    {
        $product = Product::updateOrCreate(
            ['slug' => 'test-barley-spotlight'],
            [
                'name' => 'INFINITE Barley Spotlight',
                'category' => 'barley',
                'short_description' => 'Spotlight test item',
                'description' => 'Rich organic nutrients.',
                'image' => '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png',
                'is_active' => true,
            ]
        );

        $this->assertNotNull($product->local_image_path);
        $this->assertFileExists($product->local_image_path);
        $this->assertStringStartsWith('https://infinite-limitless.com', $product->public_image_url);

        $mail = new ProductMarketingMail(
            $product,
            'recipient@example.com',
            'https://infinite-limitless.com/unsubscribe?token=abc'
        );

        // Verify attachment
        $attachments = $mail->attachments();
        $this->assertNotEmpty($attachments);

        // Verify content definition
        $content = $mail->content();
        $this->assertEquals('emails.product_marketing', $content->view);
        $this->assertNotNull($content->with['localImagePath']);
        $this->assertNotNull($content->with['productImageUrl']);

        // Verify Blade renders with photo
        $rendered = $mail->render();
        $this->assertStringContainsString('INFINITE Barley Spotlight', $rendered);
        $this->assertStringContainsString('Official High-Resolution Product Photo attached', $rendered);
    }

    /**
     * Test WorldPlanRegistration receipt attributes and PDF detection.
     */
    public function test_world_plan_registration_receipt_attributes(): void
    {
        $pdfReg = new WorldPlanRegistration([
            'payment_proof' => 'sample_remittance.pdf',
        ]);

        $this->assertTrue($pdfReg->is_pdf_receipt);
        $this->assertEquals('/storage/payment_proofs/sample_remittance.pdf', $pdfReg->payment_proof_url);

        $imgReg = new WorldPlanRegistration([
            'payment_proof' => 'payment_proofs/nested_receipt.png',
        ]);

        $this->assertFalse($imgReg->is_pdf_receipt);
        $this->assertEquals('/storage/payment_proofs/nested_receipt.png', $imgReg->payment_proof_url);
    }

    /**
     * Test admin can dispatch official portal login credentials to client via email.
     */
    public function test_admin_can_send_world_plan_credentials_email(): void
    {
        Mail::fake();

        $this->loginAdmin();

        $suffix = uniqid();
        $email = "alexander.{$suffix}@example.com";
        $username = "alex_{$suffix}";
        $newUsername = "alex_official_{$suffix}";

        $reg = WorldPlanRegistration::create([
            'first_name' => 'Alexander',
            'last_name' => 'Vanguard',
            'full_name' => 'Alexander Vanguard',
            'birthdate' => '1990-01-01',
            'contact_no' => '+639171234567',
            'address' => 'Manila, Philippines',
            'email' => $email,
            'contact_number' => '+639171234567',
            'country' => 'Philippines',
            'package_type' => 'Infinite Legacy',
            'amount_paid' => '₱50,000.00',
            'payment_date' => '2026-11-10',
            'status' => 'Approved',
            'username' => $username,
            'payment_proof' => 'sample_receipt.png',
            'agreed_terms' => true,
            'agreed_privacy' => true,
        ]);

        $response = $this->post("/admin/world-plan/{$reg->id}/send-credentials", [
            'username' => $newUsername,
            'password' => 'Pass#Secure2026',
        ]);

        $response->assertSessionHas('success');

        // Verify username was synchronized
        $this->assertDatabaseHas('world_plan_registrations', [
            'id' => $reg->id,
            'username' => $newUsername,
        ]);

        // Verify mail queued for sending
        Mail::assertQueued(\App\Mail\WorldPlanCredentialsMail::class, function ($mail) use ($email, $newUsername) {
            $hasRecipient = $mail->hasTo($email);
            $correctUsername = $mail->username === $newUsername;
            $correctPassword = $mail->password === 'Pass#Secure2026';
            $correctPortal = $mail->portalUrl === 'https://helloinfinity.net/iprosperity';

            return $hasRecipient && $correctUsername && $correctPassword && $correctPortal;
        });

        // Verify Activity Log
        $this->assertDatabaseHas('activity_logs', [
            'action_type' => "Dispatched Login Credentials to {$email} (Email Sent)",
            'status' => 'Success',
        ]);
    }

    /**
     * Test credentials email template rendering and anti-spam headers.
     */
    public function test_world_plan_credentials_mail_renders_correctly(): void
    {
        $reg = new WorldPlanRegistration([
            'id' => 99,
            'full_name' => 'Maria Santos',
            'first_name' => 'Maria',
            'last_name' => 'Santos',
            'email' => 'maria.santos@example.com',
            'package_type' => 'Diamond Elite',
        ]);

        $mail = new \App\Mail\WorldPlanCredentialsMail(
            registration: $reg,
            username: 'maria_elite',
            password: 'My#Password!99',
            portalUrl: 'https://helloinfinity.net/iprosperity'
        );

        // Verify envelope
        $envelope = $mail->envelope();
        $this->assertStringContainsString('Official Portal Login Credentials', $envelope->subject);
        $this->assertStringContainsString('Maria Santos', $envelope->subject);

        // Verify anti-spam headers
        $headers = $mail->headers();
        $this->assertArrayHasKey('X-Entity-Ref-ID', $headers->text);
        $this->assertArrayHasKey('X-Auto-Response-Suppress', $headers->text);

        // Verify Blade rendered content
        $html = $mail->render();
        $this->assertStringContainsString('Dear Maria Santos', $html);
        $this->assertStringContainsString('maria_elite', $html);
        $this->assertStringContainsString('My#Password!99', $html);
        $this->assertStringContainsString('DIAMOND ELITE', $html);
        $this->assertStringContainsString('helloinfinity.net/iprosperity', $html);
        $this->assertStringContainsString('From the Infinite Limitless Team', $html);
    }

    /**
     * Test credentials dispatch validation for missing fields.
     */
    public function test_send_world_plan_credentials_validation(): void
    {
        $this->loginAdmin();

        $suffix = uniqid();
        $reg = WorldPlanRegistration::create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'full_name' => 'Test User',
            'birthdate' => '1995-02-02',
            'contact_no' => '+639171234568',
            'address' => 'Cebu, Philippines',
            'email' => "test.user.{$suffix}@example.com",
            'contact_number' => '+639171234568',
            'country' => 'Philippines',
            'package_type' => 'Infinite Basic',
            'amount_paid' => '₱5,000.00',
            'payment_date' => '2026-11-10',
            'status' => 'Pending',
            'username' => "testuser_{$suffix}",
            'payment_proof' => 'proof_test.png',
            'agreed_terms' => true,
            'agreed_privacy' => true,
        ]);

        $response = $this->post("/admin/world-plan/{$reg->id}/send-credentials", [
            'username' => '',
            'password' => '',
        ]);

        $response->assertSessionHasErrors(['username', 'password']);
    }

    /**
     * Test logged-in admin can change their own password via /admin/change-password.
     */
    public function test_logged_in_admin_can_change_own_password_successfully(): void
    {
        $this->loginAdmin();
        $admin = AdminUser::where('username', 'admin')->first();

        $response = $this->post('/admin/change-password', [
            'current_password' => 'Infinite#1230',
            'password' => 'NewAdminPass#2026',
            'password_confirmation' => 'NewAdminPass#2026',
        ]);

        $response->assertSessionHas('success');
        $this->assertTrue(Hash::check('NewAdminPass#2026', $admin->fresh()->password));

        // Verify activity log recorded
        $this->assertDatabaseHas('activity_logs', [
            'admin_user' => 'admin',
            'action_type' => 'Changed Admin Password',
            'status' => 'Success',
        ]);

        // Restore default password for subsequent tests
        $admin->update(['password' => Hash::make('Infinite#1230')]);
    }

    /**
     * Test changing password fails when current password is wrong.
     */
    public function test_change_password_requires_correct_current_password(): void
    {
        $this->loginAdmin();

        $response = $this->post('/admin/change-password', [
            'current_password' => 'WrongPassword123!',
            'password' => 'NewAdminPass#2026',
            'password_confirmation' => 'NewAdminPass#2026',
        ]);

        $response->assertSessionHasErrors(['current_password']);
    }

    /**
     * Test validation rules for changing password (min 8, confirmed, different).
     */
    public function test_change_password_validation_rules(): void
    {
        $this->loginAdmin();

        // 1. Mismatched confirmation
        $res1 = $this->post('/admin/change-password', [
            'current_password' => 'Infinite#1230',
            'password' => 'NewAdminPass#2026',
            'password_confirmation' => 'DifferentPass#2026',
        ]);
        $res1->assertSessionHasErrors(['password']);

        // 2. Too short (< 8 chars)
        $res2 = $this->post('/admin/change-password', [
            'current_password' => 'Infinite#1230',
            'password' => 'Short1!',
            'password_confirmation' => 'Short1!',
        ]);
        $res2->assertSessionHasErrors(['password']);

        // 3. Same as current password
        $res3 = $this->post('/admin/change-password', [
            'current_password' => 'Infinite#1230',
            'password' => 'Infinite#1230',
            'password_confirmation' => 'Infinite#1230',
        ]);
        $res3->assertSessionHasErrors(['password']);
    }

    /**
     * Test admin can reset another admin's password via /admin/admins/{id}/change-password.
     */
    public function test_admin_can_reset_another_admin_password(): void
    {
        $this->loginAdmin();

        $username = 'operator_' . uniqid();
        $target = AdminUser::create([
            'name' => 'Support Operator',
            'username' => $username,
            'email' => "{$username}@infinite.com",
            'password' => Hash::make('InitialPass#123'),
            'role' => 'Manager',
            'status' => 'Active',
        ]);

        $response = $this->post("/admin/admins/{$target->id}/change-password", [
            'password' => 'ResetPass#Secure99',
            'password_confirmation' => 'ResetPass#Secure99',
        ]);

        $response->assertSessionHas('success');
        $this->assertTrue(Hash::check('ResetPass#Secure99', $target->fresh()->password));

        // Verify activity log
        $this->assertDatabaseHas('activity_logs', [
            'action_type' => "Reset Password for Admin (@{$username})",
            'status' => 'Success',
        ]);
    }

    /**
     * Test admin update via PUT method handles password update cleanly.
     */
    public function test_admin_update_handles_password_change_via_put(): void
    {
        $this->loginAdmin();

        $username = 'lead_' . uniqid();
        $target = AdminUser::create([
            'name' => 'Team Lead',
            'username' => $username,
            'email' => "{$username}@infinite.com",
            'password' => Hash::make('InitialPass#123'),
            'role' => 'Admin',
            'status' => 'Active',
        ]);

        $response = $this->put("/admin/admins/{$target->id}", [
            'name' => 'Team Lead Updated',
            'username' => $username,
            'email' => "{$username}@infinite.com",
            'role' => 'Admin',
            'status' => 'Active',
            'password' => 'BrandNewSecret#2026',
            'password_confirmation' => 'BrandNewSecret#2026',
        ]);

        $response->assertSessionHas('success');
        $this->assertTrue(Hash::check('BrandNewSecret#2026', $target->fresh()->password));
        $this->assertEquals('Team Lead Updated', $target->fresh()->name);
    }

    /**
     * Test admin can trigger 8:00 AM daily marketing dispatch from dashboard.
     */
    public function test_admin_can_dispatch_daily_marketing_from_dashboard(): void
    {
        Mail::fake();
        $this->loginAdmin();

        $response = $this->post('/admin/marketing/dispatch-daily');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('activity_logs', [
            'action_type' => 'Triggered 8:00 AM Daily Email Marketing Dispatch',
            'status' => 'Success',
        ]);
    }
}
