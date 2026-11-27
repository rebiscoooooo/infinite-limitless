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
        Schema::table('academy_trainings', function (Blueprint $table) {
            if (!Schema::hasColumn('academy_trainings', 'target_member_id')) {
                $table->foreignId('target_member_id')->nullable()->after('rank_tier')->constrained('academy_members')->nullOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('academy_trainings', function (Blueprint $table) {
            if (Schema::hasColumn('academy_trainings', 'target_member_id')) {
                $table->dropForeign(['target_member_id']);
                $table->dropColumn('target_member_id');
            }
        });
    }
};
