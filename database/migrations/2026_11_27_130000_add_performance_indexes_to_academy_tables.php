<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('academy_training_progress', function (Blueprint $table) {
            $table->index('status', 'atp_status_idx');
        });

        Schema::table('academy_certificates', function (Blueprint $table) {
            $table->index(['member_id', 'rank_tier', 'certificate_type'], 'acert_member_rank_type_idx');
            $table->index('issued_at', 'acert_issued_at_idx');
        });

        Schema::table('academy_trainings', function (Blueprint $table) {
            $table->index(['rank_tier', 'is_published', 'order'], 'atrain_rank_pub_order_idx');
        });

        Schema::table('academy_rank_requirements', function (Blueprint $table) {
            $table->index(['rank_tier', 'is_active', 'order'], 'areq_rank_active_order_idx');
        });

        Schema::table('academy_members', function (Blueprint $table) {
            $table->index(['status', 'rank_tier'], 'amem_status_rank_idx');
        });
    }

    public function down(): void
    {
        Schema::table('academy_members', fn (Blueprint $t) => $t->dropIndex('amem_status_rank_idx'));
        Schema::table('academy_rank_requirements', fn (Blueprint $t) => $t->dropIndex('areq_rank_active_order_idx'));
        Schema::table('academy_trainings', fn (Blueprint $t) => $t->dropIndex('atrain_rank_pub_order_idx'));
        Schema::table('academy_certificates', function (Blueprint $t) {
            $t->dropIndex('acert_issued_at_idx');
            $t->dropIndex('acert_member_rank_type_idx');
        });
        Schema::table('academy_training_progress', fn (Blueprint $t) => $t->dropIndex('atp_status_idx'));
    }
};
