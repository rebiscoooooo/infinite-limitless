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

        $training1 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 1)->first();
        $training5 = AcademyTraining::where('rank_tier', 'Rookie')->where('order', 5)->first();

        // Update existing training progress initialized by initializeRankProgression
        AcademyTrainingProgress::updateOrCreate(
            ['member_id' => $member->id, 'training_id' => $training1->id],
            [
                'status' => 'submitted',
                'reflection_submission' => 'Module 1 submission should not be flagged as last module.',
                'submitted_at' => now()->subMinute(),
            ]
        );
        $prog = AcademyTrainingProgress::updateOrCreate(
            ['member_id' => $member->id, 'training_id' => $training5->id],
            [
                'status' => 'submitted',
                'reflection_submission' => 'Completed final graduation training module reflection!',
                'submitted_at' => now(),
            ]
        );

        // Verify admin pendingReflections flags only the final level module as is_last_module = true
        $this->actingAs($admin, 'admin');
        $this->get(route('admin.academy.index'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->where('pendingReflections.0.training_id', $training5->id)
                ->where('pendingReflections.0.is_last_module', true)
                ->where('pendingReflections.1.training_id', $training1->id)
                ->where('pendingReflections.1.is_last_module', false)
            );

        $customCertImage = UploadedFile::fake()->create('edited_cert.png', 300, 'image/png');

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

    public function test_points_carry_over_and_accumulate_after_rank_promotion(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Carry',
            'last_name' => 'Points',
            'phone_country_code' => '+63',
            'phone_number' => '9171112233',
            'email' => 'carry.points@example.com',
            'password' => 'Secret1234!',
            'address' => 'Manila',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');

        // 1. Complete ALL 5 Rookie trainings (5 * 15 = 75 pts) and ALL 3 Rookie requirements (3 * 20 + 100 = 160 pts) => 235 pts
        foreach (AcademyTraining::where('rank_tier', 'Rookie')->get() as $t) {
            AcademyTrainingProgress::updateOrCreate(
                ['member_id' => $member->id, 'training_id' => $t->id],
                ['status' => 'approved', 'reviewed_by' => 'Admin', 'reviewed_at' => now()]
            );
        }
        foreach (AcademyRankRequirement::where('rank_tier', 'Rookie')->get() as $r) {
            $member->requirementProgress()->updateOrCreate(
                ['requirement_id' => $r->id],
                ['current_value' => $r->target_value, 'is_verified' => true, 'verified_at' => now()]
            );
        }

        $before = $member->fresh()->computeCumulativePoints();
        $this->assertEquals(235, $before['total']);
        $this->assertEquals(0, $before['previous_tiers']);
        $this->assertEquals(235, $before['current_tier']);

        // 2. Promote Rookie -> Elite: previously earned 235 pts MUST remain intact (NOT reset to 0!)
        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');
        $this->post(route('admin.academy.member.promote', $member->id))->assertSessionHasNoErrors();

        $promoted = $member->fresh();
        $this->assertEquals('Elite', $promoted->rank_tier);

        $afterPromotion = $promoted->computeCumulativePoints();
        $this->assertEquals(235, $afterPromotion['total']);
        $this->assertEquals(235, $afterPromotion['previous_tiers']);
        $this->assertEquals(0, $afterPromotion['current_tier']);

        // 3. Complete 1 Elite training (+15 pts) and 1 of 3 Elite requirements (+20 + 33 = +53 pts) => 235 + 68 = 303 pts
        $eliteTraining1 = AcademyTraining::where('rank_tier', 'Elite')->where('order', 1)->first();
        AcademyTrainingProgress::updateOrCreate(
            ['member_id' => $promoted->id, 'training_id' => $eliteTraining1->id],
            ['status' => 'approved', 'reviewed_by' => 'Admin', 'reviewed_at' => now()]
        );

        $eliteReq1 = AcademyRankRequirement::where('rank_tier', 'Elite')->orderBy('order')->first();
        $promoted->requirementProgress()->updateOrCreate(
            ['requirement_id' => $eliteReq1->id],
            ['current_value' => $eliteReq1->target_value, 'is_verified' => true, 'verified_at' => now()]
        );

        \App\Http\Controllers\RealtimeController::flushAcademyCache();

        $afterNewWork = $promoted->fresh()->computeCumulativePoints();
        $this->assertEquals(303, $afterNewWork['total']);
        $this->assertEquals(235, $afterNewWork['previous_tiers']);
        $this->assertEquals(68, $afterNewWork['current_tier']);

        // 4. Verify Leaderboards page serves the cumulative 303 pts score
        $this->actingAs($promoted->fresh(), 'academy');
        $this->get(route('academy.leaderboards'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('Academy/Leaderboards')
                ->where('member.total_points', 303)
                ->where('leaderboards.overall.0.score', 303)
                ->where('leaderboards.overall.0.previous_tiers_points', 235)
                ->where('leaderboards.overall.0.current_tier_points', 68)
                ->where('leaderboards.tiers.Elite.0.score', 303)
            );
    }

    public function test_academy_emails_use_production_legacy_portal_login_url(): void
    {
        $member = AcademyMember::create([
            'first_name' => 'Mail',
            'last_name' => 'Recipient',
            'phone_country_code' => '+63',
            'phone_number' => '9179990000',
            'email' => 'mail.recipient@example.com',
            'password' => 'Secret1234!',
            'address' => 'Manila',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);

        $cert = AcademyCertificate::create([
            'member_id' => $member->id,
            'rank_tier' => 'Rookie',
            'certificate_type' => 'training',
            'certificate_number' => 'LCAC-ROOKIE-99999-2026',
            'issued_at' => now(),
            'template_design' => 'classic-gold',
        ]);

        $expectedUrl = 'https://infinite-limitless.com/academy-login';

        $statusMail = new \App\Mail\AcademyStatusUpdatedMail($member);
        $statusMail->assertSeeInHtml($expectedUrl);
        $statusMail->assertSeeInText($expectedUrl);

        $certMail = new \App\Mail\AcademyCertificateConferredMail($member, $cert);
        $certMail->assertSeeInHtml($expectedUrl);
        $certMail->assertSeeInText($expectedUrl);
    }

    public function test_admin_can_crud_commandments_per_tier_and_members_receive_them(): void
    {
        $admin = AdminUser::first();

        // 0. By default there are NO pre-seeded commandments — only what Admin inputs
        $this->assertEquals(0, \App\Models\AcademyCommandment::count());

        $this->actingAs($admin, 'admin');

        // 1. Admin creates a new commandment for Elite tier (leaving Filipino optional to verify auto-fallback)
        $createRes = $this->post(route('admin.academy.commandments.store'), [
            'rank_tier' => 'Elite',
            'order' => 1,
            'title_en' => 'Always Inspire Excellence',
            'description_en' => 'Elevate the standards of every leader you mentor.',
            'is_active' => true,
        ]);
        $createRes->assertSessionHasNoErrors();

        $cmd = \App\Models\AcademyCommandment::where('title_en', 'Always Inspire Excellence')->first();
        $this->assertNotNull($cmd);
        $this->assertEquals('Elite', $cmd->rank_tier);
        $this->assertEquals('Always Inspire Excellence', $cmd->title_tl);

        // 2. Admin updates the commandment with Filipino translation
        $updateRes = $this->put(route('admin.academy.commandments.update', $cmd->id), [
            'rank_tier' => 'Elite',
            'order' => 1,
            'title_en' => 'Always Inspire Excellence (Updated)',
            'title_tl' => 'Laging Magbigay ng Inspirasyon',
            'description_en' => 'Updated guidance for Elite members.',
            'description_tl' => 'Na-update na gabay para sa mga Elite.',
            'is_active' => true,
        ]);
        $updateRes->assertSessionHasNoErrors();
        $this->assertEquals('Laging Magbigay ng Inspirasyon', $cmd->fresh()->title_tl);

        // 3. Approved Elite member sees ONLY the admin-added commandment in Portal Profile & Rank Matrix (and 0 for Rookie)
        $member = AcademyMember::create([
            'first_name' => 'Elena',
            'last_name' => 'Elite',
            'phone_country_code' => '+63',
            'phone_number' => '9175556677',
            'email' => 'elena.commandment@example.com',
            'password' => 'Secret1234!',
            'address' => 'Makati City',
            'status' => 'Approved',
            'rank_tier' => 'Elite',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Elite');

        $this->actingAs($member, 'academy');
        $this->get(route('academy.portal'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('Academy/Profile')
                ->has('commandmentsByTier.Elite', 1)
                ->has('commandmentsByTier.Rookie', 0)
            );

        $this->get(route('academy.rank-matrix'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('Academy/RankMatrix')
                ->has('commandmentsByTier.Elite', 1)
                ->has('commandmentsByTier.Rookie', 0)
            );

        // 4. Admin toggles hidden -> member portal now shows 0 active Elite commandments
        $this->actingAs($admin, 'admin');
        $this->patch(route('admin.academy.commandments.toggle', $cmd->id))->assertSessionHasNoErrors();
        $this->assertFalse($cmd->fresh()->is_active);

        $this->actingAs($member, 'academy');
        $this->get(route('academy.portal'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->has('commandmentsByTier.Elite', 0));

        // 5. Admin deletes the commandment
        $this->actingAs($admin, 'admin');
        $this->delete(route('admin.academy.commandments.destroy', $cmd->id))->assertSessionHasNoErrors();
        $this->assertNull(\App\Models\AcademyCommandment::find($cmd->id));
    }

    public function test_leaderboards_expose_full_ranking_for_every_tier_to_any_member(): void
    {
        $makeMember = function (string $first, string $tier, string $email) {
            $m = AcademyMember::create([
                'first_name' => $first,
                'last_name' => 'Ranker',
                'phone_country_code' => '+63',
                'phone_number' => '9' . random_int(100000000, 999999999),
                'email' => $email,
                'password' => 'Secret1234!',
                'address' => 'Manila',
                'status' => 'Approved',
                'rank_tier' => $tier,
                'approved_at' => now(),
            ]);
            $m->initializeRankProgression($tier);
            return $m;
        };

        $rookie = $makeMember('Rick', 'Rookie', 'rick.rookie@example.com');
        $makeMember('Eli', 'Elite', 'eli.elite@example.com');
        $makeMember('Leo', 'Legend', 'leo.legend@example.com');

        $this->actingAs($rookie, 'academy');
        $this->get(route('academy.leaderboards'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('Academy/Leaderboards')
                ->has('leaderboards.tiers.Rookie', 1)
                ->has('leaderboards.tiers.Elite', 1)
                ->has('leaderboards.tiers.Master', 0)
                ->has('leaderboards.tiers.Grand Master', 0)
                ->has('leaderboards.tiers.Legend', 1)
                ->where('leaderboards.tier_counts.Legend', 1)
            );
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

    public function test_admin_can_upload_manage_training_attachments_and_members_can_download_unlocked_ones(): void
    {
        Storage::fake('public');

        $admin = AdminUser::first();
        $this->actingAs($admin, 'admin');

        // Clear seeded Rookie trainings so we have exact sequential modules #1 and #2
        AcademyTraining::where('rank_tier', 'Rookie')->delete();

        $pdfFile = UploadedFile::fake()->create('Rookie_Handbook.pdf', 120, 'application/pdf');
        $tinyPng = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
        $imgFile = UploadedFile::fake()->createWithContent('Flowchart_Diagram.png', $tinyPng);

        // 1. Admin creates Module #1 with 2 attachments (PDF + PNG)
        $createRes = $this->post(route('admin.academy.trainings.store'), [
            'rank_tier' => 'Rookie',
            'order' => 1,
            'title_en' => 'Module One With Files',
            'title_tl' => 'Modyul Una May Kalakip',
            'description_en' => 'Intro with resources',
            'description_tl' => 'Panimula na may mga gabay',
            'content_en' => 'Read the attached handbook and study the diagram carefully.',
            'content_tl' => 'Basahin ang kalakip na gabay at pag-aralan ang larawan.',
            'duration_minutes' => 30,
            'is_published' => 1,
            'attachments' => [$pdfFile, $imgFile],
        ]);
        $createRes->assertSessionHasNoErrors();

        $module1 = AcademyTraining::where('title_en', 'Module One With Files')->firstOrFail();
        $this->assertCount(2, $module1->attachments);

        $pdfAtt = $module1->attachments[0];
        $imgAtt = $module1->attachments[1];
        Storage::disk('public')->assertExists($pdfAtt['path']);
        Storage::disk('public')->assertExists($imgAtt['path']);

        // Admin can download and preview attachment
        $this->get(route('admin.academy.trainings.attachments.download', [$module1->id, $pdfAtt['id']]))
            ->assertStatus(200);
        $this->get(route('admin.academy.trainings.attachments.download', ['training' => $module1->id, 'attachmentId' => $imgAtt['id'], 'inline' => 1]))
            ->assertStatus(200);

        // 2. Admin updates Module #1 via POST + _method=PUT (Inertia multipart FormData pattern):
        //    removes Flowchart_Diagram.png and adds a Word document workbook.docx
        $docFile = UploadedFile::fake()->create(
            'Action_Workbook.docx',
            80,
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );

        $updateRes = $this->post(route('admin.academy.trainings.update', $module1->id), [
            '_method' => 'PUT',
            'rank_tier' => 'Rookie',
            'order' => 1,
            'title_en' => 'Module One Updated',
            'title_tl' => 'Modyul Una Na-update',
            'description_en' => 'Updated intro',
            'description_tl' => 'Na-update na panimula',
            'content_en' => 'Updated content with handbook and workbook.',
            'content_tl' => 'Na-update na aralin.',
            'duration_minutes' => 35,
            'is_published' => 1,
            'remove_attachments' => [$imgAtt['id']],
            'attachments' => [$docFile],
        ]);
        $updateRes->assertSessionHasNoErrors();

        $module1->refresh();
        $this->assertCount(2, $module1->attachments);
        Storage::disk('public')->assertMissing($imgAtt['path']);
        Storage::disk('public')->assertExists($pdfAtt['path']);
        $docAtt = collect($module1->attachments)->firstWhere('name', 'Action_Workbook.docx');
        $this->assertNotNull($docAtt);
        Storage::disk('public')->assertExists($docAtt['path']);

        // 3. Admin creates Module #2 with 1 attachment (initially locked for a new member)
        $lockedPdf = UploadedFile::fake()->create('Advanced_Notes.pdf', 90, 'application/pdf');
        $this->post(route('admin.academy.trainings.store'), [
            'rank_tier' => 'Rookie',
            'order' => 2,
            'title_en' => 'Module Two Locked',
            'title_tl' => 'Modyul Pangalawa',
            'description_en' => 'Second sequential module',
            'description_tl' => 'Pangalawang aralin',
            'content_en' => 'Unlocked after module 1.',
            'content_tl' => 'Mabubuksan pagkatapos ng modyul 1.',
            'duration_minutes' => 40,
            'is_published' => 1,
            'attachments' => [$lockedPdf],
        ])->assertSessionHasNoErrors();

        $module2 = AcademyTraining::where('title_en', 'Module Two Locked')->firstOrFail();
        $lockedAtt = $module2->attachments[0];

        // 4. Approved Rookie member views Trainings page & tests attachment access
        $member = AcademyMember::create([
            'first_name' => 'Ana',
            'last_name' => 'Learner',
            'phone_country_code' => '+63',
            'phone_number' => '9172223344',
            'email' => 'ana.attachments@example.com',
            'password' => 'Secret1234!',
            'address' => 'Quezon City',
            'status' => 'Approved',
            'rank_tier' => 'Rookie',
            'approved_at' => now(),
        ]);
        $member->initializeRankProgression('Rookie');

        $this->actingAs($member, 'academy');

        $this->get(route('academy.trainings'))
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page
                ->component('Academy/Trainings')
                ->where('sequentialTrainings.0.id', $module1->id)
                ->where('sequentialTrainings.0.is_unlocked', true)
                ->has('sequentialTrainings.0.attachments', 2)
                ->where('sequentialTrainings.1.id', $module2->id)
                ->where('sequentialTrainings.1.is_unlocked', false)
                ->where('sequentialTrainings.1.attachments_count', 1)
                ->has('sequentialTrainings.1.attachments', 0)
            );

        // Unlocked Module #1: member CAN download DOCX and preview PDF inline
        $this->get(route('academy.trainings.attachments.download', [$module1->id, $docAtt['id']]))
            ->assertStatus(200)
            ->assertHeader('content-disposition', 'attachment; filename=Action_Workbook.docx');

        $this->get(route('academy.trainings.attachments.download', ['training' => $module1->id, 'attachmentId' => $pdfAtt['id'], 'inline' => 1]))
            ->assertStatus(200);

        // Locked Module #2: member receives HTTP 403
        $this->get(route('academy.trainings.attachments.download', [$module2->id, $lockedAtt['id']]))
            ->assertStatus(403);

        // 5. Once Admin approves Module #1, Module #2 unlocks and member CAN download its attachment
        AcademyTrainingProgress::updateOrCreate(
            ['member_id' => $member->id, 'training_id' => $module1->id],
            ['status' => 'approved', 'reviewed_by' => 'Admin', 'reviewed_at' => now()]
        );

        $this->get(route('academy.trainings.attachments.download', [$module2->id, $lockedAtt['id']]))
            ->assertStatus(200);
    }
}
