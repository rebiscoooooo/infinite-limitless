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
}
