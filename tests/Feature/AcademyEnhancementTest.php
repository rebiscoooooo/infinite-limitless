<?php

namespace Tests\Feature;

use App\Models\AcademyCertificate;
use App\Models\AcademyMember;
use App\Models\AcademyRankRequirement;
use App\Models\AcademyTraining;
use App\Models\AcademyTrainingProgress;
use App\Models\AdminUser;
use App\Services\AcademyCertificateService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AcademyEnhancementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed curriculum
        $this->seed(\Database\Seeders\AcademyCurriculumSeeder::class);

        AdminUser::create([
            'username' => 'testadmin',
            'name' => 'Admin Tester',
            'email' => 'admin@test.com',
            'password' => bcrypt('Secret123!'),
            'role' => 'Super Admin',
            'status' => 'Active',
        ]);
    }

    public function test_new_registration_automatically_assigns_rookie_rank_and_60day_cycle(): void
    {
        Storage::fake('public');

        $payload = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone_country_code' => '+63',
            'phone_number' => '9123456789',
            'email' => 'john.rookie@example.com',
            'password' => 'Secret1234!',
            'password_confirmation' => 'Secret1234!',
            'address' => '123 Rizal St, Manila',
            'preferred_language' => 'tl',
            'profile_picture' => UploadedFile::fake()->create('profile.jpg', 100, 'image/jpeg'),
            'terms' => 'on',
        ];

        $response = $this->post(route('academy.register.submit'), $payload);
        $response->assertRedirect(route('academy.verify'));

        $member = AcademyMember::where('email', 'john.rookie@example.com')->first();
        $this->assertNotNull($member);
        $this->assertEquals('Rookie', $member->rank_tier);
        $this->assertEquals('tl', $member->preferred_language);
        $this->assertNotNull($member->program_start_date);
        $this->assertEquals(60, $member->program_progress['days_remaining']);
        $this->assertEquals(1, $member->program_progress['current_day']);
    }

    public function test_member_portal_displays_current_rank_requirements_only(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Maria',
            'last_name' => 'Santos',
            'phone_country_code' => '+63',
            'phone_number' => '9987654321',
            'email' => 'maria.santos@example.com',
            'password' => 'Secret1234!',
            'address' => 'Makati City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
            'program_start_date' => now()->toDateString(),
            'program_target_date' => now()->addDays(60)->toDateString(),
        ]);
        $member->initializeRankProgression('Rookie');

        $this->actingAs($member, 'academy');
        $response = $this->get(route('academy.portal'));
        $response->assertStatus(200);

        // Verify requirements returned are strictly Rookie requirements
        $reqs = $member->requirements_stats['items'];
        $this->assertNotEmpty($reqs);
        foreach ($reqs as $r) {
            $this->assertStringStartsWith('ROOKIE-', $r['code']);
        }
    }

    public function test_sequential_training_unlocking_mechanism(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Carlo',
            'last_name' => 'Reyes',
            'phone_country_code' => '+63',
            'phone_number' => '9111222333',
            'email' => 'carlo.reyes@example.com',
            'password' => 'Secret1234!',
            'address' => 'Quezon City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');

        $training1 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 1)->first();
        $training2 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 2)->first();

        $this->actingAs($member, 'academy');

        // Attempting to submit reflection for Training #2 before Training #1 is approved should fail
        $res = $this->post(route('academy.trainings.reflect', $training2->id), [
            'reflection_submission' => 'Trying to bypass sequential order and submit module 2 directly.',
        ]);
        $res->assertSessionHasErrors('reflection_submission');

        // Submit reflection for Training #1
        $res1 = $this->post(route('academy.trainings.reflect', $training1->id), [
            'reflection_submission' => 'Here are my genuine learnings and commitments from module 1 foundational onboarding.',
        ]);
        $res1->assertSessionHasNoErrors();

        $prog1 = AcademyTrainingProgress::where('member_id', $member->id)->where('training_id', $training1->id)->first();
        $this->assertNotNull($prog1);
        $this->assertEquals('submitted', $prog1->status);

        // Admin reviews and approves Training #1
        $admin = AdminUser::first() ?? AdminUser::create([
            'name' => 'Super Admin',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'Super Admin',
        ]);

        $this->actingAs($admin, 'admin');
        $adminRes = $this->post(route('admin.academy.trainings.review', $prog1->id), [
            'action' => 'approve',
            'admin_feedback' => 'Excellent work on foundational onboarding!',
        ]);
        $adminRes->assertSessionHasNoErrors();

        $this->assertEquals('approved', $prog1->fresh()->status);

        // Now member should be able to submit reflection for Training #2
        $this->actingAs($member, 'academy');
        $res2 = $this->post(route('academy.trainings.reflect', $training2->id), [
            'reflection_submission' => 'My key realizations regarding core product mastery and chlorophyll benefits.',
        ]);
        $res2->assertSessionHasNoErrors();

        $prog2 = AcademyTrainingProgress::where('member_id', $member->id)->where('training_id', $training2->id)->first();
        $this->assertEquals('submitted', $prog2->status);
    }

    public function test_admin_updates_requirement_progress_and_calculates_remaining(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Elena',
            'last_name' => 'Cruz',
            'phone_country_code' => '+63',
            'phone_number' => '9444555666',
            'email' => 'elena.cruz@example.com',
            'password' => 'Secret1234!',
            'address' => 'Pasig City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');

        $sponsorReq = AcademyRankRequirement::where('code', 'ROOKIE-REQ-1')->first(); // target = 3

        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');

        // Admin updates progress to 2/3 verified
        $res = $this->post(route('admin.academy.requirements.update', ['member' => $member->id, 'requirement' => $sponsorReq->id]), [
            'current_value' => 2,
            'is_verified' => true,
            'admin_notes' => 'Onboarded 2 verified personal sponsors.',
        ]);
        $res->assertSessionHasNoErrors();

        $memberProg = $member->requirements_stats['items'][0];
        $this->assertEquals(2, $memberProg['current_value']);
        $this->assertEquals(1, $memberProg['remaining']);
        $this->assertFalse($memberProg['is_completed']);

        // Admin updates progress to 3/3 verified
        $this->post(route('admin.academy.requirements.update', ['member' => $member->id, 'requirement' => $sponsorReq->id]), [
            'current_value' => 3,
            'is_verified' => true,
        ]);

        $memberProgUpdated = $member->fresh()->requirements_stats['items'][0];
        $this->assertEquals(3, $memberProgUpdated['current_value']);
        $this->assertEquals(0, $memberProgUpdated['remaining']);
        $this->assertTrue($memberProgUpdated['is_completed']);
    }

    public function test_dual_eligibility_and_promotion_workflow(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Leo',
            'last_name' => 'Valdez',
            'phone_country_code' => '+63',
            'phone_number' => '9777888999',
            'email' => 'leo.valdez@example.com',
            'password' => 'Secret1234!',
            'address' => 'Cebu City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');

        $this->assertFalse($member->promotion_eligibility['is_eligible']);

        // Fulfill all trainings
        $trainings = AcademyTraining::where('rank_tier', 'Rookie')->get();
        foreach ($trainings as $t) {
            AcademyTrainingProgress::updateOrCreate(
                ['member_id' => $member->id, 'training_id' => $t->id],
                ['status' => 'approved', 'reviewed_by' => 'Admin', 'reviewed_at' => now()]
            );
        }

        // Fulfill all requirements
        $reqs = AcademyRankRequirement::where('rank_tier', 'Rookie')->get();
        foreach ($reqs as $r) {
            $member->requirementProgress()->updateOrCreate(
                ['requirement_id' => $r->id],
                ['current_value' => $r->target_value, 'is_verified' => true, 'verified_at' => now()]
            );
        }

        // Now member should be eligible for promotion to ELITE!
        $eligibility = $member->fresh()->promotion_eligibility;
        $this->assertTrue($eligibility['is_eligible']);
        $this->assertEquals('Elite', $eligibility['next_rank']);

        // Certificate should also be conferred for training completion
        $certService = app(AcademyCertificateService::class);
        $cert = $certService->ensureTrainingCompletionCertificate($member->fresh());
        $this->assertNotNull($cert);
        $this->assertStringContainsString('LCAC-ROOKIE', $cert->certificate_number);

        // Admin executes promotion
        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');

        $promRes = $this->post(route('admin.academy.member.promote', $member->id));
        $promRes->assertSessionHasNoErrors();

        $promotedMember = $member->fresh();
        $this->assertEquals('Elite', $promotedMember->rank_tier);
        $this->assertEquals(60, $promotedMember->program_progress['days_remaining']);
        $this->assertEquals(1, $promotedMember->program_progress['current_day']);

        // Requirements should now be Elite requirements!
        $eliteReqs = $promotedMember->requirements_stats['items'];
        $this->assertStringStartsWith('ELITE-', $eliteReqs[0]['code']);
    }

    public function test_certificate_download_endpoint(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Grace',
            'last_name' => 'Perez',
            'phone_country_code' => '+63',
            'phone_number' => '9333444555',
            'email' => 'grace.perez@example.com',
            'password' => 'Secret1234!',
            'address' => 'Davao City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);

        $cert = AcademyCertificate::create([
            'member_id' => $member->id,
            'rank_tier' => 'Rookie',
            'certificate_type' => 'training',
            'certificate_number' => 'LCAC-ROOKIE-00001-2026',
            'issued_at' => now(),
            'template_design' => 'classic-gold',
        ]);

        $this->actingAs($member, 'academy');
        $response = $this->get(route('academy.certificates.download', $cert->id));
        $response->assertStatus(200);
        $this->assertStringContainsString('application/pdf', $response->headers->get('content-type'));
    }

    public function test_language_switch_endpoint(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Daniel',
            'last_name' => 'Tan',
            'phone_country_code' => '+63',
            'phone_number' => '9555666777',
            'email' => 'daniel.tan@example.com',
            'password' => 'Secret1234!',
            'address' => 'Baguio City',
            'status' => 'Approved',
            'preferred_language' => 'en',
        ]);

        $this->actingAs($member, 'academy');
        $res = $this->post(route('academy.portal.language'), ['language' => 'tl']);
        $res->assertSessionHasNoErrors();

        $this->assertEquals('tl', $member->fresh()->preferred_language);
    }

    public function test_admin_can_crud_trainings_and_requirements(): void
    {
        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');

        // Create Training
        $trainingRes = $this->post(route('admin.academy.trainings.store'), [
            'rank_tier' => 'Rookie',
            'order' => 6,
            'title_en' => 'Bonus Advanced Module',
            'title_tl' => 'Karagdagang Modulo',
            'content_en' => 'Bonus training syllabus and concepts.',
            'content_tl' => 'Nilalaman ng karagdagang pagsasanay.',
            'duration_minutes' => 45,
            'is_published' => true,
        ]);
        $trainingRes->assertSessionHasNoErrors();

        $training = AcademyTraining::where('title_en', 'Bonus Advanced Module')->first();
        $this->assertNotNull($training);

        // Update Training
        $updateTrainRes = $this->put(route('admin.academy.trainings.update', $training->id), [
            'rank_tier' => 'Rookie',
            'order' => 6,
            'title_en' => 'Bonus Advanced Module (Updated)',
            'title_tl' => 'Karagdagang Modulo (Na-update)',
            'content_en' => 'Updated bonus training syllabus.',
            'content_tl' => 'Na-update na nilalaman.',
            'duration_minutes' => 50,
            'is_published' => true,
        ]);
        $updateTrainRes->assertSessionHasNoErrors();
        $this->assertEquals('Bonus Advanced Module (Updated)', $training->fresh()->title_en);

        // Delete Training
        $delTrainRes = $this->delete(route('admin.academy.trainings.destroy', $training->id));
        $delTrainRes->assertSessionHasNoErrors();
        $this->assertNull(AcademyTraining::find($training->id));

        // Create Requirement Definition
        $reqRes = $this->post(route('admin.academy.requirements.store'), [
            'rank_tier' => 'Rookie',
            'code' => 'ROOKIE-TEST-CRITERIA',
            'title_en' => 'Retail Sales Volume',
            'title_tl' => 'Benta ng Produkto',
            'target_value' => 10,
            'unit' => 'Boxes',
            'order' => 4,
            'is_active' => true,
        ]);
        $reqRes->assertSessionHasNoErrors();

        $req = AcademyRankRequirement::where('code', 'ROOKIE-TEST-CRITERIA')->first();
        $this->assertNotNull($req);

        // Update Requirement Definition
        $updateReqRes = $this->put(route('admin.academy.requirements.definition.update', $req->id), [
            'rank_tier' => 'Rookie',
            'code' => 'ROOKIE-TEST-CRITERIA',
            'title_en' => 'Retail Sales Volume (Updated)',
            'title_tl' => 'Benta ng Produkto (Na-update)',
            'target_value' => 15,
            'unit' => 'Boxes',
            'order' => 4,
            'is_active' => true,
        ]);
        $updateReqRes->assertSessionHasNoErrors();
        $this->assertEquals(15, $req->fresh()->target_value);

        // Delete Requirement Definition
        $delReqRes = $this->delete(route('admin.academy.requirements.destroy', $req->id));
        $delReqRes->assertSessionHasNoErrors();
        $this->assertNull(AcademyRankRequirement::find($req->id));
    }

    public function test_admin_can_directly_grant_and_bulk_grant_trainings(): void
    {
        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');

        $member1 = AcademyMember::create([
            'first_name' => 'Carla',
            'last_name' => 'Ramos',
            'phone_country_code' => '+63',
            'phone_number' => '9111222333',
            'email' => 'carla.ramos@example.com',
            'password' => 'Secret1234!',
            'address' => 'Makati City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member1->initializeRankProgression('Rookie');

        $member2 = AcademyMember::create([
            'first_name' => 'Marco',
            'last_name' => 'Santos',
            'phone_country_code' => '+63',
            'phone_number' => '9222333444',
            'email' => 'marco.santos@example.com',
            'password' => 'Secret1234!',
            'address' => 'Quezon City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member2->initializeRankProgression('Rookie');

        $training1 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 1)->first();

        // 1. Direct grant single training to member1
        $grantRes = $this->post(route('admin.academy.trainings.grant', [
            'member' => $member1->id,
            'training' => $training1->id,
        ]));
        $grantRes->assertSessionHasNoErrors();

        $prog1 = AcademyTrainingProgress::where('member_id', $member1->id)->where('training_id', $training1->id)->first();
        $this->assertNotNull($prog1);
        $this->assertEquals('approved', $prog1->status);

        // 2. Bulk grant training1 to ALL active Rookies (so member2 gets it as well)
        $bulkRes = $this->post(route('admin.academy.trainings.grant-rank-all', [
            'training' => $training1->id,
        ]));
        $bulkRes->assertSessionHasNoErrors();

        $prog2 = AcademyTrainingProgress::where('member_id', $member2->id)->where('training_id', $training1->id)->first();
        $this->assertNotNull($prog2);
        $this->assertEquals('approved', $prog2->status);

        // 3. Grant ALL 5 trainings for member1
        $allRes = $this->post(route('admin.academy.trainings.grant-member-all', [
            'member' => $member1->id,
        ]));
        $allRes->assertSessionHasNoErrors();

        $this->assertEquals(100, $member1->fresh()->training_stats['percentage']);
        $this->assertTrue($member1->fresh()->training_stats['has_certificate']);
    }

    public function test_admin_can_upload_custom_certificate_for_member_and_serve_it(): void
    {
        Storage::fake('public');
        \Illuminate\Support\Facades\Mail::fake();

        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');

        $member = AcademyMember::create([
            'first_name' => 'Custom',
            'last_name' => 'Recipient',
            'phone_country_code' => '+63',
            'phone_number' => '9111888999',
            'email' => 'custom.recipient@example.com',
            'password' => 'Secret1234!',
            'address' => 'Taguig City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);

        $customPdf = UploadedFile::fake()->create('custom_certificate_edited.pdf', 250, 'application/pdf');

        $uploadRes = $this->post(route('admin.academy.certificates.upload', $member->id), [
            'certificate_file' => $customPdf,
            'rank_tier' => 'Rookie',
            'admin_notes' => 'Custom edited certificate uploaded directly by admin.',
        ]);
        $uploadRes->assertSessionHasNoErrors();

        $cert = AcademyCertificate::where('member_id', $member->id)->first();
        $this->assertNotNull($cert);
        $this->assertEquals('custom-admin-provided', $cert->template_design);
        $this->assertNotNull($cert->file_path);
        Storage::disk('public')->assertExists($cert->file_path);

        // Verify member can download their custom uploaded certificate
        $this->actingAs($member, 'academy');
        $downRes = $this->get(route('academy.certificates.download', $cert->id));
        $downRes->assertStatus(200);
        $this->assertEquals('application/pdf', $downRes->headers->get('content-type'));

        // Verify email was queued with attachment
        \Illuminate\Support\Facades\Mail::assertQueued(\App\Mail\AcademyCertificateConferredMail::class, function ($mail) use ($member) {
            return $mail->hasTo($member->email);
        });
    }

    public function test_admin_can_attach_custom_certificate_when_approving_training_reflection(): void
    {
        Storage::fake('public');
        \Illuminate\Support\Facades\Mail::fake();

        $admin = AdminUser::first();
        $member = AcademyMember::create([
            'first_name' => 'Final',
            'last_name' => 'Trainee',
            'phone_country_code' => '+63',
            'phone_number' => '9123888777',
            'email' => 'final.trainee@example.com',
            'password' => 'Secret1234!',
            'address' => 'Pasay City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');

        $training5 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 5)->first();

        // Update existing training progress initialized by initializeRankProgression
        $prog = AcademyTrainingProgress::updateOrCreate(
            ['member_id' => $member->id, 'training_id' => $training5->id],
            [
                'status' => 'submitted',
                'reflection_submission' => 'Completed final graduation training module reflection!',
                'submitted_at' => now(),
            ]
        );

        $customCertImage = UploadedFile::fake()->create('edited_cert.png', 300, 'image/png');

        $this->actingAs($admin, 'admin');
        $reviewRes = $this->post(route('admin.academy.trainings.review', $prog->id), [
            'action' => 'approve',
            'admin_feedback' => 'Approved! Here is your official personalized certificate.',
            'certificate_file' => $customCertImage,
        ]);
        $reviewRes->assertSessionHasNoErrors();

        $this->assertEquals('approved', $prog->fresh()->status);

        $cert = AcademyCertificate::where('member_id', $member->id)->first();
        $this->assertNotNull($cert);
        $this->assertNotNull($cert->file_path);
        Storage::disk('public')->assertExists($cert->file_path);

        // Verify email queued
        \Illuminate\Support\Facades\Mail::assertQueued(\App\Mail\AcademyCertificateConferredMail::class);
    }

    public function test_all_eight_separate_academy_portal_pages_render_dedicated_components(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Portal',
            'last_name' => 'Navigator',
            'phone_country_code' => '+63',
            'phone_number' => '9171234567',
            'email' => 'portal.navigator@example.com',
            'password' => 'Secret1234!',
            'address' => 'Bonifacio Global City, Taguig',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
            'program_start_date' => now()->toDateString(),
            'program_target_date' => now()->addDays(60)->toDateString(),
        ]);
        $member->initializeRankProgression('Rookie');

        $this->actingAs($member, 'academy');

        $routesAndComponents = [
            'academy.portal' => 'Academy/Profile',
            'academy.profile' => 'Academy/Profile',
            'academy.trainings' => 'Academy/Trainings',
            'academy.requirements' => 'Academy/Requirements',
            'academy.certificates' => 'Academy/Certificates',
            'academy.leaderboards' => 'Academy/Leaderboards',
            'academy.announcements' => 'Academy/Announcements',
            'academy.rank-matrix' => 'Academy/RankMatrix',
            'academy.settings' => 'Academy/Settings',
        ];

        foreach ($routesAndComponents as $routeName => $expectedComponent) {
            $response = $this->get(route($routeName));
            $response->assertStatus(200);
            $response->assertInertia(fn ($page) => $page
                ->component($expectedComponent)
                ->has('member')
                ->has('portalCounts')
                ->has('popupAnnouncements')
            );
        }
    }
}
