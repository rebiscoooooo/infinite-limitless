<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AcademyCommandment extends Model
{
    use HasFactory;

    public const TIERS = ['Rookie', 'Elite', 'Master', 'Grand Master', 'Legend'];

    /**
     * Ensure the academy_commandments table exists even if migrations have not yet been run manually.
     */
    public static function ensureTableExists(): void
    {
        if (Schema::hasTable('academy_commandments')) {
            return;
        }

        Schema::create('academy_commandments', function (Blueprint $table) {
            $table->id();
            $table->string('rank_tier', 50)->index();
            $table->unsignedInteger('order')->default(1);
            $table->string('title_en', 255);
            $table->string('title_tl', 255)->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_tl')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->string('created_by', 120)->nullable();
            $table->timestamps();
            $table->index(['rank_tier', 'is_active', 'order'], 'acmd_tier_active_order_idx');
        });
    }

    protected $fillable = [
        'rank_tier',
        'order',
        'title_en',
        'title_tl',
        'description_en',
        'description_tl',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function toPortalArray(): array
    {
        return [
            'id' => $this->id,
            'rank_tier' => $this->rank_tier,
            'order' => $this->order,
            'title_en' => $this->title_en,
            'title_tl' => $this->title_tl ?: $this->title_en,
            'text_en' => $this->description_en ?? '',
            'text_tl' => $this->description_tl ?: ($this->description_en ?? ''),
            'description_en' => $this->description_en ?? '',
            'description_tl' => $this->description_tl ?? '',
            'is_active' => (bool) $this->is_active,
            'created_by' => $this->created_by,
        ];
    }

    /**
     * Return active admin-created commandments grouped by canonical rank tier for the member portal.
     */
    public static function groupedForPortal(): array
    {
        $grouped = [];
        foreach (self::TIERS as $tier) {
            $grouped[$tier] = [];
        }

        if (!Schema::hasTable('academy_commandments')) {
            return $grouped;
        }

        $rows = self::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        foreach ($rows as $row) {
            $tierKey = $row->rank_tier;
            if (!array_key_exists($tierKey, $grouped)) {
                $grouped[$tierKey] = [];
            }
            $grouped[$tierKey][] = $row->toPortalArray();
        }

        return $grouped;
    }
}
