<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::saved(function () {
            Cache::forget('public_catalog_products');
            Cache::forget('realtime_pulse_snapshot');
        });

        static::deleted(function () {
            Cache::forget('public_catalog_products');
            Cache::forget('realtime_pulse_snapshot');
        });
    }

    protected $fillable = [
        'name',
        'slug',
        'category',
        'category_name',
        'short_description',
        'description',
        'benefits',
        'price',
        'price_display',
        'image',
        'badge',
        'display_order',
        'is_active',
        'is_featured',
        'is_coming_soon',
        'archived_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_coming_soon' => 'boolean',
        'display_order' => 'integer',
        'price' => 'decimal:2',
        'benefits' => 'array',
        'archived_at' => 'datetime',
    ];

    protected $appends = [
        'image_url',
        'is_archived',
    ];

    public function getImageUrlAttribute(): string
    {
        if (empty($this->image)) {
            return asset('assets/image/products/barley.png');
        }

        if (Str::startsWith($this->image, ['http://', 'https://'])) {
            return $this->image;
        }

        if (Str::startsWith($this->image, ['/assets/', 'assets/'])) {
            return asset(ltrim($this->image, '/'));
        }

        if (Str::startsWith($this->image, ['/storage/', 'storage/'])) {
            return asset(ltrim($this->image, '/'));
        }

        if (file_exists(public_path('storage/products/' . $this->image))) {
            return asset('storage/products/' . $this->image);
        }

        if (file_exists(public_path('assets/image/products/' . $this->image))) {
            return asset('assets/image/products/' . $this->image);
        }

        if (file_exists(public_path('assets/image/' . $this->image))) {
            return asset('assets/image/' . $this->image);
        }

        return asset('assets/image/products/' . ltrim($this->image, '/'));
    }

    public function getIsArchivedAttribute(): bool
    {
        return !is_null($this->archived_at);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->whereNull('archived_at');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeUnarchived(Builder $query): Builder
    {
        return $query->whereNull('archived_at');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->whereNotNull('archived_at');
    }
}
