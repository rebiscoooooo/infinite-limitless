<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class AcademyMember extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'academy_members';

    protected $fillable = [
        'member_id',
        'first_name',
        'middle_initial',
        'last_name',
        'phone_country_code',
        'phone_number',
        'email',
        'password',
        'address',
        'profile_picture',
        'status',
        'rank_tier',
        'rejection_reason',
        'admin_notes',
        'agreed_terms',
        'approved_at',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'full_name',
        'avatar_url',
        'rank_details',
        'country_info',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'approved_at' => 'datetime',
            'last_login_at' => 'datetime',
        ];
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($member) {
            if (empty($member->member_id)) {
                $lastId = static::max('id') ?? 0;
                $member->member_id = 'LCA-' . str_pad((string) ($lastId + 1), 5, '0', STR_PAD_LEFT);
            }
        });
    }

    public function getFullNameAttribute(): string
    {
        $mi = !empty($this->middle_initial) ? strtoupper(trim(str_replace('.', '', $this->middle_initial))) . '. ' : '';
        return trim("{$this->first_name} {$mi}{$this->last_name}");
    }

    public function getAvatarUrlAttribute(): ?string
    {
        if (!empty($this->profile_picture)) {
            if (str_starts_with($this->profile_picture, 'http://') || str_starts_with($this->profile_picture, 'https://')) {
                return $this->profile_picture;
            }
            return asset('storage/' . ltrim($this->profile_picture, '/'));
        }
        return null;
    }

    public function getRankDetailsAttribute(): array
    {
        $tier = $this->rank_tier ? trim($this->rank_tier) : 'Rookie';

        return match (strtolower($tier)) {
            'legend' => [
                'name' => 'LEGEND',
                'tier' => 'Legend',
                'stars' => 5,
                'stars_display' => '★★★★★',
                'theme' => 'ruby-gold',
                'badge_image' => '/assets/image/academy/badge-legend.png',
                'bg_gradient' => 'from-red-600 via-amber-500 to-yellow-400',
                'border_color' => '#f59e0b',
                'glow_color' => 'rgba(239, 68, 68, 0.45)',
                'badge_icon' => 'crown',
                'title' => 'Supreme Sovereign Member',
                'description' => 'The highest echelon of distinction in the Legacy Club Academy, distinguished by unparalleled achievement and imperial leadership.',
            ],
            'grand master' => [
                'name' => 'GRAND MASTER',
                'tier' => 'Grand Master',
                'stars' => 4,
                'stars_display' => '★★★★',
                'theme' => 'royal-purple',
                'badge_image' => '/assets/image/academy/badge-grand-master.png',
                'bg_gradient' => 'from-purple-700 via-violet-600 to-fuchsia-500',
                'border_color' => '#a855f7',
                'glow_color' => 'rgba(168, 85, 247, 0.45)',
                'badge_icon' => 'eagle',
                'title' => 'Distinguished Champion',
                'description' => 'An accomplished vanguard demonstrating exceptional mastery, eagle-eyed vision, and strategic excellence.',
            ],
            'master' => [
                'name' => 'MASTER',
                'tier' => 'Master',
                'stars' => 3,
                'stars_display' => '★★★',
                'theme' => 'radiant-gold',
                'badge_image' => '/assets/image/academy/badge-master.png',
                'bg_gradient' => 'from-amber-600 via-yellow-500 to-amber-300',
                'border_color' => '#eab308',
                'glow_color' => 'rgba(234, 179, 8, 0.45)',
                'badge_icon' => 'lion',
                'title' => 'Elite Lionheart Member',
                'description' => 'Exemplifying fearless leadership, steadfast resilience, and formidable prowess across all academy milestones.',
            ],
            'elite' => [
                'name' => 'ELITE',
                'tier' => 'Elite',
                'stars' => 2,
                'stars_display' => '★★',
                'theme' => 'electric-blue',
                'badge_image' => '/assets/image/academy/badge-elite.png',
                'bg_gradient' => 'from-blue-600 via-cyan-500 to-sky-400',
                'border_color' => '#06b6d4',
                'glow_color' => 'rgba(6, 182, 212, 0.45)',
                'badge_icon' => 'chart',
                'title' => 'High-Performance Pioneer',
                'description' => 'Ascending rapidly with proven momentum, continuous upward trajectory, and high-impact accomplishments.',
            ],
            default => [
                'name' => 'ROOKIE',
                'tier' => 'Rookie',
                'stars' => 1,
                'stars_display' => '★',
                'theme' => 'silver-frost',
                'badge_image' => '/assets/image/academy/badge-rookie.png',
                'bg_gradient' => 'from-slate-500 via-gray-300 to-zinc-100',
                'border_color' => '#e2e8f0',
                'glow_color' => 'rgba(226, 232, 240, 0.35)',
                'badge_icon' => 'mountain',
                'title' => 'Ascending Mountaineer',
                'description' => 'Embarking on the foundational ascent toward excellence in the Legacy Club Academy.',
            ],
        };
    }

    public function getCountryInfoAttribute(): array
    {
        $dial = trim((string) ($this->phone_country_code ?? '+63'));
        $clean = str_starts_with($dial, '+') ? $dial : "+{$dial}";

        $map = [
            '+63' => ['flag' => '🇵🇭', 'country' => 'Philippines', 'code' => 'PH'],
            '+1'  => ['flag' => '🇺🇸', 'country' => 'United States', 'code' => 'US'],
            '+44' => ['flag' => '🇬🇧', 'country' => 'United Kingdom', 'code' => 'GB'],
            '+61' => ['flag' => '🇦🇺', 'country' => 'Australia', 'code' => 'AU'],
            '+65' => ['flag' => '🇸🇬', 'country' => 'Singapore', 'code' => 'SG'],
            '+81' => ['flag' => '🇯🇵', 'country' => 'Japan', 'code' => 'JP'],
            '+82' => ['flag' => '🇰🇷', 'country' => 'South Korea', 'code' => 'KR'],
            '+971'=> ['flag' => '🇦🇪', 'country' => 'United Arab Emirates', 'code' => 'AE'],
            '+966'=> ['flag' => '🇸🇦', 'country' => 'Saudi Arabia', 'code' => 'SA'],
            '+852'=> ['flag' => '🇭🇰', 'country' => 'Hong Kong', 'code' => 'HK'],
            '+886'=> ['flag' => '🇹🇼', 'country' => 'Taiwan', 'code' => 'TW'],
            '+60' => ['flag' => '🇲🇾', 'country' => 'Malaysia', 'code' => 'MY'],
            '+62' => ['flag' => '🇮🇩', 'country' => 'Indonesia', 'code' => 'ID'],
            '+66' => ['flag' => '🇹🇭', 'country' => 'Thailand', 'code' => 'TH'],
            '+84' => ['flag' => '🇻🇳', 'country' => 'Vietnam', 'code' => 'VN'],
            '+91' => ['flag' => '🇮🇳', 'country' => 'India', 'code' => 'IN'],
            '+86' => ['flag' => '🇨🇳', 'country' => 'China', 'code' => 'CN'],
            '+49' => ['flag' => '🇩🇪', 'country' => 'Germany', 'code' => 'DE'],
            '+33' => ['flag' => '🇫🇷', 'country' => 'France', 'code' => 'FR'],
            '+39' => ['flag' => '🇮🇹', 'country' => 'Italy', 'code' => 'IT'],
            '+34' => ['flag' => '🇪🇸', 'country' => 'Spain', 'code' => 'ES'],
            '+226'=> ['flag' => '🇧🇫', 'country' => 'Burkina Faso', 'code' => 'BF'],
            '+675'=> ['flag' => '🇵🇬', 'country' => 'Papua New Guinea', 'code' => 'PG'],
            '+234'=> ['flag' => '🇳🇬', 'country' => 'Nigeria', 'code' => 'NG'],
            '+27' => ['flag' => '🇿🇦', 'country' => 'South Africa', 'code' => 'ZA'],
            '+55' => ['flag' => '🇧🇷', 'country' => 'Brazil', 'code' => 'BR'],
            '+52' => ['flag' => '🇲🇽', 'country' => 'Mexico', 'code' => 'MX'],
            '+64' => ['flag' => '🇳🇿', 'country' => 'New Zealand', 'code' => 'NZ'],
            '+31' => ['flag' => '🇳🇱', 'country' => 'Netherlands', 'code' => 'NL'],
            '+41' => ['flag' => '🇨🇭', 'country' => 'Switzerland', 'code' => 'CH'],
            '+46' => ['flag' => '🇸🇪', 'country' => 'Sweden', 'code' => 'SE'],
            '+47' => ['flag' => '🇳🇴', 'country' => 'Norway', 'code' => 'NO'],
            '+45' => ['flag' => '🇩🇰', 'country' => 'Denmark', 'code' => 'DK'],
            '+353'=> ['flag' => '🇮🇪', 'country' => 'Ireland', 'code' => 'IE'],
            '+351'=> ['flag' => '🇵🇹', 'country' => 'Portugal', 'code' => 'PT'],
            '+48' => ['flag' => '🇵🇱', 'country' => 'Poland', 'code' => 'PL'],
            '+30' => ['flag' => '🇬🇷', 'country' => 'Greece', 'code' => 'GR'],
            '+90' => ['flag' => '🇹🇷', 'country' => 'Turkey', 'code' => 'TR'],
            '+20' => ['flag' => '🇪🇬', 'country' => 'Egypt', 'code' => 'EG'],
            '+974'=> ['flag' => '🇶🇦', 'country' => 'Qatar', 'code' => 'QA'],
            '+965'=> ['flag' => '🇰🇼', 'country' => 'Kuwait', 'code' => 'KW'],
            '+968'=> ['flag' => '🇴🇲', 'country' => 'Oman', 'code' => 'OM'],
            '+973'=> ['flag' => '🇧🇭', 'country' => 'Bahrain', 'code' => 'BH'],
        ];

        return $map[$clean] ?? ['flag' => '🌐', 'country' => 'International', 'code' => 'INTL', 'dial' => $clean];
    }

    public function toSharedArray(): array
    {
        return [
            'id' => $this->id,
            'member_id' => $this->member_id,
            'first_name' => $this->first_name,
            'middle_initial' => $this->middle_initial,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone_country_code' => $this->phone_country_code,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'profile_picture' => $this->profile_picture,
            'avatar_url' => $this->avatar_url,
            'status' => $this->status,
            'rank_tier' => $this->rank_tier,
            'rank_details' => $this->rank_details,
            'badge_image' => $this->rank_details['badge_image'] ?? '/assets/image/academy/badge-rookie.png',
            'country_info' => $this->country_info,
            'rejection_reason' => $this->rejection_reason,
            'approved_at' => $this->approved_at?->format('M d, Y h:i A'),
            'created_at' => $this->created_at?->format('M d, Y'),
        ];
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'Pending');
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'Approved');
    }

    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', 'Rejected');
    }
}
