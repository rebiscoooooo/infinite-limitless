<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademyCertificate extends Model
{
    use HasFactory;

    protected $table = 'academy_certificates';

    protected $fillable = [
        'member_id',
        'rank_tier',
        'certificate_type', // training, promotion
        'certificate_number',
        'issued_at',
        'template_design',
        'file_path',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
        ];
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(AcademyMember::class, 'member_id');
    }

    public function getDownloadUrlAttribute(): string
    {
        return route('academy.certificates.download', $this->id);
    }
}
