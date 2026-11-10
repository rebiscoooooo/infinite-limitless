<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class WorldPlanRegistration extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::saved(function () {
            Cache::forget('realtime_pulse_snapshot');
        });

        static::deleted(function () {
            Cache::forget('realtime_pulse_snapshot');
        });
    }

    protected $table = 'world_plan_registrations';

    protected $fillable = [
        'username',
        'email',
        'first_name',
        'middle_name',
        'last_name',
        'birthdate',
        'contact_no',
        'address',
        'country',
        'sponsor',
        'package_type',
        'product_set',
        'payment_method',
        'amount_paid',
        'payment_date',
        'payment_proof',
        'status',
        'agreed_terms',
        'agreed_terms_at',
        'edit_token',
        'admin_notes',
        'rejection_reason',
        'archived_at',
    ];

    protected $appends = [
        'full_name',
        'payment_proof_url',
        'payment_receipt',
        'is_pdf_receipt',
        'receipt_exists',
        'edit_url',
        'is_archived',
    ];

    protected function casts(): array
    {
        return [
            'birthdate' => 'date',
            'payment_date' => 'date',
            'agreed_terms_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    public function getIsArchivedAttribute(): bool
    {
        return !is_null($this->archived_at);
    }

    public function scopeUnarchived(Builder $query): Builder
    {
        return $query->whereNull('archived_at');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->whereNotNull('archived_at');
    }

    /**
     * Get the secure edit URL for this registration.
     */
    public function getEditUrlAttribute(): ?string
    {
        if (empty($this->edit_token)) {
            return null;
        }

        return url('/registration/edit/' . $this->edit_token);
    }

    /**
     * Get the full name of the member.
     */
    public function getFullNameAttribute(): string
    {
        $parts = array_filter([$this->first_name, $this->middle_name, $this->last_name]);
        return implode(' ', $parts);
    }

    /**
     * Get the public URL to view the uploaded payment proof.
     */
    public function getPaymentProofUrlAttribute(): ?string
    {
        if (empty($this->payment_proof)) {
            return null;
        }

        if (str_starts_with($this->payment_proof, 'http')) {
            return $this->payment_proof;
        }

        $clean = basename($this->payment_proof);

        return '/storage/payment_proofs/' . $clean;
    }

    /**
     * Determine if the uploaded receipt is a PDF document.
     */
    public function getIsPdfReceiptAttribute(): bool
    {
        if (empty($this->payment_proof)) {
            return false;
        }

        $clean = strtolower(basename($this->payment_proof));
        return str_ends_with($clean, '.pdf');
    }

    /**
     * Determine if the receipt file actually exists on the filesystem.
     */
    public function getReceiptExistsAttribute(): bool
    {
        if (empty($this->payment_proof)) {
            return false;
        }

        $clean = basename($this->payment_proof);

        return file_exists(storage_path('app/public/payment_proofs/' . $clean))
            || file_exists(public_path('storage/payment_proofs/' . $clean))
            || file_exists(public_path('uploads/payments/' . $clean))
            || file_exists(base_path('uploads/payments/' . $clean));
    }

    /**
     * Backwards-compatible alias for payment_proof.
     */
    public function getPaymentReceiptAttribute(): ?string
    {
        return $this->payment_proof;
    }
}
