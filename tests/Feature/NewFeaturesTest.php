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
        $userEmail = 'alice_' . uniqid() . '@example.com';

        // Seed inquiries, registrations, users
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

        User::create([
            'username' => 'alice_' . uniqid(),
            'name' => 'Customer Alice',
            'full_name' => 'Customer Alice',
            'email' => $userEmail,
            'password' => Hash::make('password123'),
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

        Mail::assertQueued(ProductMarketingMail::class, function ($mail) use ($inqEmail, $regEmail, $userEmail) {
            return in_array($mail->recipientEmail, [
                $inqEmail,
                $regEmail,
                $userEmail,
            ]);
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
}
