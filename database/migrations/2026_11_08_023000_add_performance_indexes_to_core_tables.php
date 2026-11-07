<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations to add high-performance lookup indexes.
     */
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->index('is_read');
            $table->index('created_at');
            $table->index('archived_at');
        });

        Schema::table('world_plan_registrations', function (Blueprint $table) {
            $table->index('status');
            $table->index('created_at');
            $table->index('archived_at');
            $table->index('edit_token');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->index('is_active');
            $table->index('display_order');
            $table->index(['is_active', 'display_order']);
        });

        Schema::table('activity_logs', function (Blueprint $table) {
            $table->index('created_at');
            $table->index('admin_user');
            $table->index('archived_at');
        });

        Schema::table('admin_users', function (Blueprint $table) {
            $table->index('status');
            $table->index('archived_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropIndex(['is_read']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['archived_at']);
        });

        Schema::table('world_plan_registrations', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['archived_at']);
            $table->dropIndex(['edit_token']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
            $table->dropIndex(['display_order']);
            $table->dropIndex(['is_active', 'display_order']);
        });

        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['admin_user']);
            $table->dropIndex(['archived_at']);
        });

        Schema::table('admin_users', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['archived_at']);
        });
    }
};

