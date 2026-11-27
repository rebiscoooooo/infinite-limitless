<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademyTrainingProgress extends Model
{
    use HasFactory;

    protected $table = 'academy_training_progress';

    protected $fillable = [
        'member_id',
        'training_id',
        'status', // not_started, in_progress, submitted, approved, rejected
        'reflection_submission',
        'submitted_at',
        'reviewed_by',
        'admin_feedback',
        'reviewed_at',
    ];

    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(AcademyMember::class, 'member_id');
    }

    public function training(): BelongsTo
    {
        return $this->belongsTo(AcademyTraining::class, 'training_id');
    }

    public function getIsApprovedAttribute(): bool
    {
        return $this->status === 'approved';
    }

    public function getIsSubmittedAttribute(): bool
    {
        return $this->status === 'submitted';
    }
}
