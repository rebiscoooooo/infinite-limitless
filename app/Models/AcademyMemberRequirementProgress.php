<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademyMemberRequirementProgress extends Model
{
    use HasFactory;

    protected $table = 'academy_member_requirement_progress';

    protected $fillable = [
        'member_id',
        'requirement_id',
        'current_value',
        'is_verified',
        'admin_notes',
        'verified_at',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'current_value' => 'integer',
            'is_verified' => 'boolean',
            'verified_at' => 'datetime',
        ];
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(AcademyMember::class, 'member_id');
    }

    public function requirement(): BelongsTo
    {
        return $this->belongsTo(AcademyRankRequirement::class, 'requirement_id');
    }

    public function getRemainingAttribute(): int
    {
        $target = $this->requirement?->target_value ?? 1;
        return max(0, $target - $this->current_value);
    }

    public function getPercentageAttribute(): int
    {
        $target = $this->requirement?->target_value ?? 1;
        if ($target <= 0) {
            return 100;
        }
        return min(100, (int) round(($this->current_value / $target) * 100));
    }

    public function getIsCompletedAttribute(): bool
    {
        $target = $this->requirement?->target_value ?? 1;
        return $this->current_value >= $target && $this->is_verified;
    }
}
