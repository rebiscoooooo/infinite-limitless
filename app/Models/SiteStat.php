<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteStat extends Model
{
    use HasFactory;

    protected $table = 'site_stats';

    protected $fillable = [
        'total_visits',
        'active_users',
        'product_clicks',
        'bounce_rate',
    ];

    protected function casts(): array
    {
        return [
            'total_visits' => 'integer',
            'active_users' => 'integer',
            'product_clicks' => 'integer',
        ];
    }
}
