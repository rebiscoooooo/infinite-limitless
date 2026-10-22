<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberRegistration extends Model
{
    use HasFactory;

    protected $table = 'members_registration';

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'sponsor_name',
        'selected_package',
        'country',
        'status',
        'package_price',
        'marketing_day',
        'last_emailed',
    ];

    protected function casts(): array
    {
        return [
            'package_price' => 'decimal:2',
            'marketing_day' => 'integer',
            'last_emailed' => 'datetime',
        ];
    }
}
