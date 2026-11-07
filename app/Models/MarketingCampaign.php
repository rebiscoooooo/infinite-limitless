<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketingCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'product_name',
        'subject',
        'sent_date',
        'recipients_count',
        'status',
        'notes',
    ];

    protected $casts = [
        'sent_date' => 'date',
        'recipients_count' => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

