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
        Schema::create('academy_members', function (Blueprint $table) {
            $table->id();
            $table->string('member_id', 30)->unique()->nullable()->index();
            $table->string('first_name');
            $table->string('middle_initial', 10)->nullable();
            $table->string('last_name');
            $table->string('phone_country_code', 10)->default('+63');
            $table->string('phone_number');
            $table->string('email')->unique();
            $table->string('password');
            $table->text('address');
            $table->string('profile_picture')->nullable();
            $table->string('status', 30)->default('Pending')->index(); // Pending, Approved, Rejected
            $table->string('rank_tier', 40)->nullable()->index(); // Rookie, Elite, Master, Grand Master, Legend
            $table->text('rejection_reason')->nullable();
            $table->text('admin_notes')->nullable();
            $table->string('agreed_terms', 10)->default('Yes');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip', 45)->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_members');
    }
};
