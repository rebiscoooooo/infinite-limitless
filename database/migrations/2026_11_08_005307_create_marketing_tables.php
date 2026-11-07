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
        Schema::create('marketing_campaigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('product_name');
            $table->string('subject');
            $table->date('sent_date')->index();
            $table->integer('recipients_count')->default(0);
            $table->string('status')->default('Sent');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('marketing_unsubscribes', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('reason')->nullable();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketing_unsubscribes');
        Schema::dropIfExists('marketing_campaigns');
    }
};
