<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Extend academy_members table
        Schema::table('academy_members', function (Blueprint $table) {
            $table->string('preferred_language', 10)->default('en')->after('agreed_terms'); // 'en' or 'tl'
            $table->date('program_start_date')->nullable()->after('approved_at');
            $table->date('program_target_date')->nullable()->after('program_start_date');
            $table->string('program_status', 30)->default('Active')->after('program_target_date'); // Active, Completed, Extended
            $table->boolean('eligible_for_promotion')->default(false)->after('program_status');
            $table->timestamp('promoted_at')->nullable()->after('eligible_for_promotion');
        });

        // 2. Rank Requirements Definition table
        Schema::create('academy_rank_requirements', function (Blueprint $table) {
            $table->id();
            $table->string('rank_tier', 40)->index(); // Rookie, Elite, Master, Grand Master, Legend
            $table->string('code', 50)->unique();
            $table->string('title_en');
            $table->string('title_tl');
            $table->text('description_en')->nullable();
            $table->text('description_tl')->nullable();
            $table->integer('target_value')->default(1);
            $table->string('unit', 50)->default('Count'); // e.g., Personal Sponsors, Direct Referrals, Volume Points
            $table->integer('order')->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Member Requirement Progress table
        Schema::create('academy_member_requirement_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('academy_members')->cascadeOnDelete();
            $table->foreignId('requirement_id')->constrained('academy_rank_requirements')->cascadeOnDelete();
            $table->integer('current_value')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->text('admin_notes')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['member_id', 'requirement_id'], 'member_requirement_unique');
        });

        // 4. Academy Trainings table (Bilingual & Sequential)
        Schema::create('academy_trainings', function (Blueprint $table) {
            $table->id();
            $table->string('rank_tier', 40)->index(); // Rookie, Elite, Master, Grand Master, Legend
            $table->integer('order')->default(1);
            $table->string('title_en');
            $table->string('title_tl');
            $table->text('description_en')->nullable();
            $table->text('description_tl')->nullable();
            $table->longText('content_en');
            $table->longText('content_tl');
            $table->string('video_url')->nullable();
            $table->integer('duration_minutes')->default(30);
            $table->text('reflection_prompt_en')->nullable();
            $table->text('reflection_prompt_tl')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        // 5. Member Training Progress & Reflection Submissions table
        Schema::create('academy_training_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('academy_members')->cascadeOnDelete();
            $table->foreignId('training_id')->constrained('academy_trainings')->cascadeOnDelete();
            $table->string('status', 30)->default('not_started'); // not_started, in_progress, submitted, approved, rejected
            $table->longText('reflection_submission')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->string('reviewed_by')->nullable();
            $table->text('admin_feedback')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->unique(['member_id', 'training_id'], 'member_training_unique');
        });

        // 6. Academy Certificates table
        Schema::create('academy_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('academy_members')->cascadeOnDelete();
            $table->string('rank_tier', 40);
            $table->string('certificate_type', 30)->default('training'); // training, promotion
            $table->string('certificate_number', 60)->unique();
            $table->timestamp('issued_at');
            $table->string('template_design', 50)->default('classic-gold');
            $table->string('file_path')->nullable();
            $table->timestamps();
        });

        // 7. Enhance academy_announcements table
        Schema::table('academy_announcements', function (Blueprint $table) {
            $table->string('type', 40)->default('announcement')->after('title'); // announcement, recognition, weekly_achiever, training_finisher
            $table->foreignId('featured_member_id')->nullable()->after('type')->constrained('academy_members')->nullOnDelete();
            $table->string('badge_text', 60)->nullable()->after('featured_member_id');
            $table->timestamp('published_at')->nullable()->after('is_active');
            $table->timestamp('archived_at')->nullable()->after('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('academy_announcements', function (Blueprint $table) {
            $table->dropForeign(['featured_member_id']);
            $table->dropColumn(['type', 'featured_member_id', 'badge_text', 'published_at', 'archived_at']);
        });

        Schema::dropIfExists('academy_certificates');
        Schema::dropIfExists('academy_training_progress');
        Schema::dropIfExists('academy_trainings');
        Schema::dropIfExists('academy_member_requirement_progress');
        Schema::dropIfExists('academy_rank_requirements');

        Schema::table('academy_members', function (Blueprint $table) {
            $table->dropColumn([
                'preferred_language',
                'program_start_date',
                'program_target_date',
                'program_status',
                'eligible_for_promotion',
                'promoted_at',
            ]);
        });
    }
};
