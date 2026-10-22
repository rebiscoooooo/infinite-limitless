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
        Schema::create('site_stats', function (Blueprint $table) {
            $table->id();
            $table->integer('total_visits')->default(0);
            $table->integer('active_users')->default(0);
            $table->integer('product_clicks')->default(0);
            $table->string('bounce_rate', 10)->default('0%');
            $table->timestamps();
        });

        Schema::create('product_stats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('clicks')->default(0);
            $table->string('trend_dir', 10)->default('up');
            $table->string('trend_text', 50)->nullable();
            $table->string('status', 50)->default('Active');
            $table->string('status_class', 50)->default('bg-teal-500');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_stats');
        Schema::dropIfExists('site_stats');
    }
};
