<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('academy_trainings', 'attachments')) {
            Schema::table('academy_trainings', function (Blueprint $table) {
                $table->json('attachments')->nullable()->after('video_url');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('academy_trainings', 'attachments')) {
            Schema::table('academy_trainings', function (Blueprint $table) {
                $table->dropColumn('attachments');
            });
        }
    }
};
