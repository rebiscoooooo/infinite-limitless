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
        'public_image_url',
        'local_image_path',
        'is_archived',
    ];

    public function getImageUrlAttribute(): string
    {
        if (empty($this->image)) {
            return asset('assets/image/Barley.png');
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

        $clean = ltrim($this->image, '/');

        if (file_exists(public_path('assets/image/product/' . $clean))) {
            return asset('assets/image/product/' . $clean);
        }

        if (file_exists(public_path('assets/image/' . $clean))) {
            return asset('assets/image/' . $clean);
        }

        if (file_exists(public_path('storage/products/' . $clean))) {
            return asset('storage/products/' . $clean);
        }

        if (file_exists(public_path('assets/image/products/' . $clean))) {
            return asset('assets/image/products/' . $clean);
        }

        return asset('assets/image/product/' . $clean);
    }

    /**
     * Get the absolute local filesystem path for the product image (used for attachments & CID embedding).
     */
    public function getLocalImagePathAttribute(): ?string
    {
        if (empty($this->image)) {
            $default = public_path('assets/image/Barley.png');
            return file_exists($default) ? $default : null;
        }

        if (Str::startsWith($this->image, ['http://', 'https://'])) {
            return null;
        }

        $clean = ltrim($this->image, '/');

        if (file_exists(public_path($clean))) {
            return public_path($clean);
        }

        $basename = basename($clean);

        if (file_exists(public_path('assets/image/product/' . $basename))) {
            return public_path('assets/image/product/' . $basename);
        }

        if (file_exists(public_path('assets/image/' . $basename))) {
            return public_path('assets/image/' . $basename);
        }

        if (file_exists(public_path('storage/products/' . $basename))) {
            return public_path('storage/products/' . $basename);
        }

        if (file_exists(storage_path('app/public/products/' . $basename))) {
            return storage_path('app/public/products/' . $basename);
        }

        $default = public_path('assets/image/Barley.png');
        return file_exists($default) ? $default : null;
    }

    /**
     * Get guaranteed publicly accessible external URL for emails / marketing.
     */
    public function getPublicImageUrlAttribute(): string
    {
        $url = $this->image_url;

        // Convert localhost / 127.0.0.1 to production live domain
        if (preg_match('#^https?://(127\.0\.0\.1|localhost)(:\d+)?(/.*)?$#i', $url, $m)) {
            $path = $m[3] ?? '';
            return 'https://infinite-limitless.com' . $path;
        }

        if (Str::startsWith($url, '/')) {
            return 'https://infinite-limitless.com' . $url;
        }

        return $url;
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
