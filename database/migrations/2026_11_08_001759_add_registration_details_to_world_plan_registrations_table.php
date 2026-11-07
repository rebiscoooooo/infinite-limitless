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
        Schema::table('world_plan_registrations', function (Blueprint $table) {
            if (!Schema::hasColumn('world_plan_registrations', 'country')) {
                $table->string('country')->nullable()->after('address');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'sponsor')) {
                $table->string('sponsor')->nullable()->after('country');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'product_set')) {
                $table->string('product_set')->nullable()->after('package_type');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'payment_method')) {
                $table->string('payment_method')->nullable()->after('product_set');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'amount_paid')) {
                $table->string('amount_paid')->nullable()->after('payment_method');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'agreed_terms')) {
                $table->string('agreed_terms')->default('Yes')->after('status');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'agreed_terms_at')) {
                $table->timestamp('agreed_terms_at')->nullable()->after('agreed_terms');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'edit_token')) {
                $table->string('edit_token', 64)->nullable()->unique()->after('agreed_terms_at');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'admin_notes')) {
                $table->text('admin_notes')->nullable()->after('edit_token');
            }
            if (!Schema::hasColumn('world_plan_registrations', 'rejection_reason')) {
                $table->text('rejection_reason')->nullable()->after('admin_notes');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('world_plan_registrations', function (Blueprint $table) {
            $columns = [
                'country', 'sponsor', 'product_set', 'payment_method',
                'amount_paid', 'agreed_terms', 'agreed_terms_at',
                'edit_token', 'admin_notes', 'rejection_reason'
            ];
            foreach ($columns as $column) {
                if (Schema::hasColumn('world_plan_registrations', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
