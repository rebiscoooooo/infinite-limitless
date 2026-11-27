<?php

use App\Models\AcademyMember;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('academy_members')) {
            return;
        }

        // Convert existing legacy LCA-XXXXX (or blank) member IDs to uppercase email-prefix Member IDs
        AcademyMember::withTrashed()
            ->orderBy('id')
            ->get()
            ->each(function (AcademyMember $member) {
                $current = trim((string) $member->member_id);
                if ($current === '' || str_starts_with(strtoupper($current), 'LCA-')) {
                    $member->member_id = AcademyMember::generateMemberIdFromEmail($member->email, $member->id);
                    $member->saveQuietly();
                }
            });
    }

    public function down(): void
    {
        // Irreversible data backfill; keep existing email-based Member IDs intact.
    }
};
