<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class AcademyTraining extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'academy_trainings';

    protected $fillable = [
        'rank_tier',
        'target_member_id',
        'order',
        'title_en',
        'title_tl',
        'description_en',
        'description_tl',
        'content_en',
        'content_tl',
        'video_url',
        'duration_minutes',
        'reflection_prompt_en',
        'reflection_prompt_tl',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'target_member_id' => 'integer',
            'order' => 'integer',
            'duration_minutes' => 'integer',
            'is_published' => 'boolean',
        ];
    }

    public function targetMember(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(AcademyMember::class, 'target_member_id');
    }

    public function memberProgress(): HasMany
    {
        return $this->hasMany(AcademyTrainingProgress::class, 'training_id');
    }

    public function getLocalizedTitle(string $lang = 'en'): string
    {
        return $lang === 'tl' && !empty($this->title_tl) ? $this->title_tl : $this->title_en;
    }

    public function getLocalizedDescription(string $lang = 'en'): string
    {
        return $lang === 'tl' && !empty($this->description_tl) ? $this->description_tl : ($this->description_en ?? '');
    }

    public function getLocalizedContent(string $lang = 'en'): string
    {
        return $lang === 'tl' && !empty($this->content_tl) ? $this->content_tl : $this->content_en;
    }

    public function getLocalizedPrompt(string $lang = 'en'): string
    {
        return $lang === 'tl' && !empty($this->reflection_prompt_tl)
            ? $this->reflection_prompt_tl
            : ($this->reflection_prompt_en ?? 'Please summarize your key takeaways and actionable commitments from this training:');
    }
}
