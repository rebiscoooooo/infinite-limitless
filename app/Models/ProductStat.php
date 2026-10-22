<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStat extends Model
{
    use HasFactory;

    protected $table = 'product_stats';

    protected $fillable = [
        'name',
        'clicks',
        'trend_dir',
        'trend_text',
        'status',
        'status_class',
    ];

    protected function casts(): array
    {
        return [
            'clicks' => 'integer',
        ];
    }
}
