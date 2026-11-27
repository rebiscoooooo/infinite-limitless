<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademyRankRequirement extends Model
{
    use HasFactory;

    protected $table = 'academy_rank_requirements';

    protected $fillable = [
        'rank_tier',
        'code',
        'title_en',
        'title_tl',
        'description_en',
        'description_tl',
        'target_value',
        'unit',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'target_value' => 'integer',
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function memberProgress(): HasMany
    {
        return $this->hasMany(AcademyMemberRequirementProgress::class, 'requirement_id');
    }

    public function getLocalizedTitle(string $lang = 'en'): string
    {
        return $lang === 'tl' && !empty($this->title_tl) ? $this->title_tl : $this->title_en;
    }

    public function getLocalizedDescription(string $lang = 'en'): string
    {
        return $lang === 'tl' && !empty($this->description_tl) ? $this->description_tl : ($this->description_en ?? '');
    }
}
