<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class AcademyCommandment extends Model
{
    use HasFactory;

    public const TIERS = ['Rookie', 'Elite', 'Master', 'Grand Master', 'Legend'];

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
