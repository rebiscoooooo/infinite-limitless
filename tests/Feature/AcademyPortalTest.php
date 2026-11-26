<?php

namespace Tests\Feature;

use App\Mail\AcademyStatusUpdatedMail;
use App\Models\AcademyAnnouncement;
use App\Models\AcademyMember;
use App\Models\AdminUser;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AcademyPortalTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);

        AcademyMember::query()->forceDelete();
        AcademyAnnouncement::query()->forceDelete();

        AdminUser::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Master Admin',
                'email' => 'admin@infinite-limitless.com',
                'password' => Hash::make('Infinite#1230'),
                'role' => 'Super Admin',
                'status' => 'Active',
            ]
        );
    }

    private function loginAdmin(): void
    {
        $this->post('/admin/login', [
            'username' => 'admin',
            'password' => 'Infinite#1230',
        ]);
    }

    /**
     * Test 1: Public registration page loads successfully.
     */
    public function test_academy_registration_page_is_accessible(): void
    {
        $response = $this->get('/academy-register');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Academy/Register'));
    }

    /**
     * Test 2: Member registration submission saves pending member and redirects to /academy-verify.
     */
    public function test_member_can_register_and_status_is_pending(): void
    {
        Storage::fake('public');

        $photo = UploadedFile::fake()->create('avatar.jpg', 100, 'image/jpeg');

        $response = $this->post('/academy-register', [
            'first_name' => 'Alexander',
            'middle_initial' => 'M',
            'last_name' => 'Mercer',
            'phone_country_code' => '+63',
            'phone_number' => '9171234567',
            'email' => 'alexander.mercer@example.com',
            'password' => 'Secret1234!',
            'password_confirmation' => 'Secret1234!',
            'address' => '123 Sky Tower, Bonifacio Global City, Taguig',
            'profile_picture' => $photo,
            'terms' => '1',
        ]);

        $response->assertRedirect('/academy-verify');

        $this->assertDatabaseHas('academy_members', [
            'email' => 'alexander.mercer@example.com',
            'first_name' => 'Alexander',
            'last_name' => 'Mercer',
            'status' => 'Pending',
        ]);

        $member = AcademyMember::where('email', 'alexander.mercer@example.com')->first();
        $this->assertNotNull($member);
        $this->assertStringStartsWith('LCA-', $member->member_id);
    }

    /**
     * Test 3: Verification pending page loads successfully.
     */
    public function test_academy_verification_page_is_accessible(): void
    {
        $response = $this->get('/academy-verify');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Academy/Verify'));
    }

    /**
     * Test 4: Dedicated login page loads.
     */
    public function test_academy_login_page_is_accessible(): void
    {
        $response = $this->get('/academy-login');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Academy/Login'));
    }

    /**
     * Test 5: Pending member cannot log in and receives informative notification.
     */
    public function test_pending_member_cannot_log_in(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Pending',
            'last_name' => 'User',
            'phone_country_code' => '+63',
            'phone_number' => '9111111111',
            'email' => 'pending.user@example.com',
            'password' => 'Secret1234!',
            'address' => 'Manila, Philippines',
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
        ]);

        $response = $this->from('/academy-login')->post('/academy-login', [
            'email' => 'pending.user@example.com',
            'password' => 'Secret1234!',
        ]);

        $response->assertRedirect('/academy-login');
        $response->assertSessionHasErrors(['email']);
        $this->assertFalse(Auth::guard('academy')->check());
    }

    /**
     * Test 6: Admin can access /admin/verify-academy console.
     */
    public function test_admin_can_access_academy_verification_console(): void
    {
        $this->loginAdmin();

        $response = $this->get('/admin/verify-academy');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Admin/VerifyAcademy'));
    }

    /**
     * Test 7: Admin can approve member with official Rank Tier selection and email is dispatched.
     */
    public function test_admin_can_approve_member_with_rank_selection(): void
    {
        Mail::fake();
        $this->loginAdmin();

        $member = AcademyMember::create([
            'first_name' => 'Elena',
            'last_name' => 'Reyes',
            'phone_country_code' => '+63',
            'phone_number' => '9188888888',
            'email' => 'elena.reyes@example.com',
            'password' => 'Secret1234!',
            'address' => 'Makati City, Philippines',
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
        ]);

        $response = $this->patch("/admin/verify-academy/{$member->id}/status", [
            'status' => 'Approved',
            'rank_tier' => 'Grand Master',
            'admin_notes' => 'Exceptional professional profile.',
        ]);

        $response->assertRedirect();

        $member->refresh();
        $this->assertEquals('Approved', $member->status);
        $this->assertEquals('Grand Master', $member->rank_tier);
        $this->assertNotNull($member->approved_at);

        Mail::assertQueued(AcademyStatusUpdatedMail::class, function ($mail) use ($member) {
            return $mail->hasTo($member->email) && $mail->member->rank_tier === 'Grand Master';
        });
    }

    /**
     * Test 8: Admin can reject member with reason and email is sent.
     */
    public function test_admin_can_reject_member_with_reason(): void
    {
        Mail::fake();
        $this->loginAdmin();

        $member = AcademyMember::create([
            'first_name' => 'Declined',
            'last_name' => 'Applicant',
            'phone_country_code' => '+63',
            'phone_number' => '9144444444',
            'email' => 'declined.applicant@example.com',
            'password' => 'Secret1234!',
            'address' => 'Quezon City, Philippines',
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
        ]);

        $response = $this->patch("/admin/verify-academy/{$member->id}/status", [
            'status' => 'Rejected',
            'rejection_reason' => 'Incomplete address and identification proof.',
        ]);

        $response->assertRedirect();

        $member->refresh();
        $this->assertEquals('Rejected', $member->status);
        $this->assertEquals('Incomplete address and identification proof.', $member->rejection_reason);

        Mail::assertQueued(AcademyStatusUpdatedMail::class, function ($mail) use ($member) {
            return $mail->hasTo($member->email);
        });

        // Rejected member cannot log in
        $loginRes = $this->from('/academy-login')->post('/academy-login', [
            'email' => 'declined.applicant@example.com',
            'password' => 'Secret1234!',
        ]);
        $loginRes->assertRedirect('/academy-login');
        $this->assertFalse(Auth::guard('academy')->check());
    }

    /**
     * Test 9: Approved member can successfully log in and access portal.
     */
    public function test_approved_member_can_log_in_and_access_portal(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Marcus',
            'last_name' => 'Vance',
            'phone_country_code' => '+63',
            'phone_number' => '9199999999',
            'email' => 'marcus.vance@example.com',
            'password' => 'Secret1234!',
            'address' => 'Cebu City, Philippines',
            'status' => 'Approved',
            'rank_tier' => 'Legend',
            'agreed_terms' => 'Yes',
        ]);

        $response = $this->post('/academy-login', [
            'email' => 'marcus.vance@example.com',
            'password' => 'Secret1234!',
        ]);

        $response->assertRedirect('/academy-portal');
        $this->assertTrue(Auth::guard('academy')->check());

        // Access portal in black & white styling
        $portalResponse = $this->get('/academy-portal');
        $portalResponse->assertStatus(200);
        $portalResponse->assertInertia(fn ($page) => $page->component('Academy/Profile'));
    }

    /**
     * Test 10: Active announcement appears in member portal.
     */
    public function test_announcements_appear_in_academy_portal(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Sophia',
            'last_name' => 'Loren',
            'phone_country_code' => '+63',
            'phone_number' => '9177777777',
            'email' => 'sophia.loren@example.com',
            'password' => 'Secret1234!',
            'address' => 'Davao City, Philippines',
            'status' => 'Approved',
            'rank_tier' => 'Elite',
            'agreed_terms' => 'Yes',
        ]);

        AcademyAnnouncement::create([
            'title' => 'Annual Leadership Masterclass 2026',
            'content' => 'Exclusive masterclass scheduled for all active academy members.',
            'is_active' => true,
            'created_by' => 'Executive Committee',
        ]);

        $this->actingAs($member, 'academy');

        $response = $this->get('/academy-portal');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Academy/Profile')
            ->has('announcements', 1)
        );
    }

    /**
     * Test 11: Member can update their profile from portal.
     */
    public function test_member_can_update_profile(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Carlos',
            'last_name' => 'Santana',
            'phone_country_code' => '+63',
            'phone_number' => '9155555555',
            'email' => 'carlos.santana@example.com',
            'password' => 'Secret1234!',
            'address' => 'Baguio City, Philippines',
            'status' => 'Approved',
            'rank_tier' => 'Master',
            'agreed_terms' => 'Yes',
        ]);

        $this->actingAs($member, 'academy');

        $response = $this->post('/academy-profile', [
            'phone_country_code' => '+1',
            'phone_number' => '5551234567',
            'address' => '456 Sunset Boulevard, Los Angeles, CA',
        ]);

        $response->assertRedirect();

        $member->refresh();
        $this->assertEquals('+1', $member->phone_country_code);
        $this->assertEquals('5551234567', $member->phone_number);
        $this->assertEquals('456 Sunset Boulevard, Los Angeles, CA', $member->address);
    }

    /**
     * Test 12: Admin can publish, toggle, and delete announcements.
     */
    public function test_admin_announcements_crud(): void
    {
        $this->loginAdmin();

        // Create
        $response = $this->post('/admin/verify-academy/announcements', [
            'title' => 'New Mastermind Circle Launch',
            'content' => 'Registration is now open for private sessions.',
            'is_active' => '1',
        ]);
        $response->assertRedirect();

        $this->assertDatabaseHas('academy_announcements', [
            'title' => 'New Mastermind Circle Launch',
            'is_active' => true,
        ]);

        $announcement = AcademyAnnouncement::where('title', 'New Mastermind Circle Launch')->first();

        // Toggle
        $toggleRes = $this->patch("/admin/verify-academy/announcements/{$announcement->id}/toggle");
        $toggleRes->assertRedirect();
        $announcement->refresh();
        $this->assertFalse($announcement->is_active);

        // Delete
        $deleteRes = $this->delete("/admin/verify-academy/announcements/{$announcement->id}");
        $deleteRes->assertRedirect();
        $this->assertSoftDeleted('academy_announcements', ['id' => $announcement->id]);
    }

    /**
     * Test 13: Member can log out successfully.
     */
    public function test_member_can_log_out(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Lucas',
            'last_name' => 'Gray',
            'phone_country_code' => '+63',
            'phone_number' => '9166666666',
            'email' => 'lucas.gray@example.com',
            'password' => 'Secret1234!',
            'address' => 'Iloilo City, Philippines',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'agreed_terms' => 'Yes',
        ]);

        $this->actingAs($member, 'academy');
        $this->assertTrue(Auth::guard('academy')->check());

        $response = $this->post('/academy-logout');
        $response->assertRedirect('/academy-login');
        $this->assertFalse(Auth::guard('academy')->check());
    }
}
