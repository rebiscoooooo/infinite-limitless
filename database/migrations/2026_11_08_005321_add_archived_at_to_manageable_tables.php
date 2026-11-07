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
        if (Schema::hasTable('inquiries') && !Schema::hasColumn('inquiries', 'archived_at')) {
            Schema::table('inquiries', function (Blueprint $table) {
                $table->timestamp('archived_at')->nullable()->after('updated_at');
            });
        }

        if (Schema::hasTable('world_plan_registrations') && !Schema::hasColumn('world_plan_registrations', 'archived_at')) {
            Schema::table('world_plan_registrations', function (Blueprint $table) {
                $table->timestamp('archived_at')->nullable()->after('updated_at');
            });
        }

        if (Schema::hasTable('activity_logs') && !Schema::hasColumn('activity_logs', 'archived_at')) {
            Schema::table('activity_logs', function (Blueprint $table) {
                $table->timestamp('archived_at')->nullable()->after('created_at');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inquiries') && Schema::hasColumn('inquiries', 'archived_at')) {
            Schema::table('inquiries', function (Blueprint $table) {
                $table->dropColumn('archived_at');
            });
        }

        if (Schema::hasTable('world_plan_registrations') && Schema::hasColumn('world_plan_registrations', 'archived_at')) {
            Schema::table('world_plan_registrations', function (Blueprint $table) {
                $table->dropColumn('archived_at');
            });
        }

        if (Schema::hasTable('activity_logs') && Schema::hasColumn('activity_logs', 'archived_at')) {
            Schema::table('activity_logs', function (Blueprint $table) {
                $table->dropColumn('archived_at');
            });
        }
    }
};
