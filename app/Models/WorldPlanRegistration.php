<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorldPlanRegistration extends Model
{
    use HasFactory;

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
        'package_type',
        'payment_date',
        'payment_proof',
        'status',
    ];

    protected $appends = [
        'full_name',
        'payment_proof_url',
        'payment_receipt',
    ];

    protected function casts(): array
    {
        return [
            'birthdate' => 'date',
            'payment_date' => 'date',
        ];
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

        if (str_starts_with($this->payment_proof, 'payment_proofs/')) {
            return '/storage/' . $this->payment_proof;
        }

        return '/storage/payment_proofs/' . $this->payment_proof;
    }

    /**
     * Backwards-compatible alias for payment_proof.
     */
    public function getPaymentReceiptAttribute(): ?string
    {
        return $this->payment_proof;
    }
}
