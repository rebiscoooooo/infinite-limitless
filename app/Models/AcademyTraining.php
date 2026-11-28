<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AcademyTraining extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'academy_trainings';

    /**
     * Ensure the attachments JSON column exists even if migrations have not yet been run manually.
     */
    public static function ensureAttachmentsColumn(): void
    {
        if (!Schema::hasTable('academy_trainings') || Schema::hasColumn('academy_trainings', 'attachments')) {
            return;
        }

        Schema::table('academy_trainings', function (Blueprint $table) {
            $table->json('attachments')->nullable()->after('video_url');
        });
    }

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
        'attachments',
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
            'attachments' => 'array',
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

    /**
     * Format bytes into human-readable file size.
     */
    public static function formatBytes(int $bytes): string
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 1) . ' MB';
        }
        if ($bytes >= 1024) {
            return number_format($bytes / 1024, 1) . ' KB';
        }
        return max(0, $bytes) . ' B';
    }

    /**
     * Store uploaded attachment files on the public disk and return normalized metadata rows.
     *
     * @param  array<int, UploadedFile>  $files
     * @return array<int, array<string, mixed>>
     */
    public static function storeUploadedAttachments(array $files): array
    {
        $stored = [];
        foreach ($files as $file) {
            if (!$file instanceof UploadedFile || !$file->isValid()) {
                continue;
            }

            $id = (string) Str::uuid();
            $originalName = trim((string) $file->getClientOriginalName());
            $safeBase = preg_replace('/[^\pL\pN\s._-]/u', '_', basename($originalName)) ?: ('attachment_' . $id);
            $ext = strtolower($file->getClientOriginalExtension() ?: pathinfo($safeBase, PATHINFO_EXTENSION));
            $storedFilename = 'training_att_' . time() . '_' . Str::random(10) . ($ext ? '.' . $ext : '');
            $path = $file->storeAs('academy_training_attachments', $storedFilename, 'public');

            $stored[] = [
                'id' => $id,
                'name' => $safeBase,
                'path' => $path,
                'mime' => $file->getMimeType() ?: ($file->getClientMimeType() ?: 'application/octet-stream'),
                'size' => (int) ($file->getSize() ?: 0),
                'extension' => $ext,
            ];
        }

        return $stored;
    }

    /**
     * Return formatted attachments ready for Admin or Member frontend consumption.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getFormattedAttachments(string $routeName): array
    {
        $raw = $this->attachments;
        if (!is_array($raw) || empty($raw)) {
            return [];
        }

        $imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        $formatted = [];

        foreach ($raw as $item) {
            if (!is_array($item) || empty($item['id']) || empty($item['path'])) {
                continue;
            }

            $name = (string) ($item['name'] ?? basename((string) $item['path']));
            $ext = strtolower((string) ($item['extension'] ?? pathinfo($name, PATHINFO_EXTENSION)));
            $size = (int) ($item['size'] ?? 0);
            $isImage = in_array($ext, $imageExts, true);
            $isPdf = $ext === 'pdf';

            $formatted[] = [
                'id' => (string) $item['id'],
                'name' => $name,
                'extension' => $ext,
                'mime' => (string) ($item['mime'] ?? ''),
                'size' => $size,
                'size_label' => self::formatBytes($size),
                'is_image' => $isImage,
                'is_pdf' => $isPdf,
                'can_preview' => $isImage || $isPdf,
                'download_url' => route($routeName, [
                    'training' => $this->id,
                    'attachmentId' => $item['id'],
                ]),
                'preview_url' => route($routeName, [
                    'training' => $this->id,
                    'attachmentId' => $item['id'],
                    'inline' => 1,
                ]),
            ];
        }

        return $formatted;
    }

    /**
     * Locate a single raw attachment entry by its UUID.
     */
    public function findAttachment(string $attachmentId): ?array
    {
        $raw = $this->attachments;
        if (!is_array($raw)) {
            return null;
        }

        foreach ($raw as $item) {
            if (is_array($item) && isset($item['id']) && (string) $item['id'] === $attachmentId) {
                return $item;
            }
        }

        return null;
    }
}
