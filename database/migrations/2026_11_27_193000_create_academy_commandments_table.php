<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('academy_commandments', function (Blueprint $table) {
            $table->id();
            $table->string('rank_tier', 50);
            $table->unsignedInteger('order')->default(1);
            $table->string('title_en');
            $table->string('title_tl')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_tl')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('created_by', 120)->nullable();
            $table->timestamps();

            $table->index(['rank_tier', 'is_active', 'order'], 'idx_academy_commandments_tier_active_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academy_commandments');
    }
};
