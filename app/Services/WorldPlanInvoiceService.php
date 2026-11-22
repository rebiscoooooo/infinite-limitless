<?php

namespace App\Services;

use App\Models\WorldPlanRegistration;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class WorldPlanInvoiceService
{
    /**
     * Master catalog of package definitions, pricing, tiers, and product inclusions.
     */
    protected static array $packageCatalog = [
        // Executive Global Plans
        'exec-diamond' => [
            'name' => 'Diamond Executive Global Plan',
            'tier' => 'Diamond Tier - VIP Council',
            'prices' => [
                'USD' => '$5,000 USD',
                'PHP' => '₱268,888 PHP',
                'CFA' => 'CFA 2,800,000',
                'PGK' => 'PGK 18,500',
            ],
            'price_default' => '$5,000 USD / CFA 2,800,000 / ₱268,888',
            'rebate' => '19%',
            'highlights' => [
                'VIP Diamond Council Status',
                'Maximum Weekly Income Cap Allocation',
                'Complete O\'Lamour Luxury Line Allotment',
                'Top Rebate Tier (19%) & Global Royalty Sharing',
            ],
            'inclusions' => [
                '11x O\'Lamour Facial Essence (100ml)',
                '11x O\'Lamour CoreLaCreme Anti-Aging Cream (50g)',
                '11x O\'Lamour Quintessence Ampoule (30ml)',
                '20x O\'Lamour PrimeRenew BB Cream SPF 50+',
                'Complete Infinite Organic Barley Supreme Family Pack',
                'Robustus Premium Alkaline Coffee Master Box',
                'VIP Diamond Executive Council Certificate & Gold Pin',
            ],
        ],
        'exec-sapphire' => [
            'name' => 'Sapphire Executive Global Plan',
            'tier' => 'Sapphire Tier - Senior Executive',
            'prices' => [
                'USD' => '$3,400 USD',
                'PHP' => '₱178,888 PHP',
                'CFA' => 'CFA 1,850,000',
                'PGK' => 'PGK 12,800',
            ],
            'price_default' => '$3,400 USD / CFA 1,850,000 / ₱178,888',
            'rebate' => '15%',
            'highlights' => [
                'Senior Executive Status',
                'High Volume Product Allotment',
                'Advanced Leadership Overrides',
                'Team Rebates (15%)',
            ],
            'inclusions' => [
                '8x O\'Lamour Facial Essence (100ml)',
                '8x O\'Lamour CoreLaCreme Anti-Aging Cream (50g)',
                '8x O\'Lamour Quintessence Ampoule (30ml)',
                '14x O\'Lamour PrimeRenew BB Cream SPF 50+',
                'Infinite Organic Barley Health Allotment',
                'Robustus Premium Coffee Allotment',
            ],
        ],
        'exec-ruby' => [
            'name' => 'Ruby Executive Global Plan',
            'tier' => 'Ruby Tier - International Leader',
            'prices' => [
                'USD' => '$1,750 USD',
                'PHP' => '₱72,888 PHP',
                'CFA' => 'CFA 750,000',
                'PGK' => 'PGK 6,500',
            ],
            'price_default' => '$1,750 USD / CFA 750,000 / ₱72,888',
            'rebate' => '11%',
            'highlights' => [
                'Most Recommended for International Leaders',
                'Balanced Inventory & High Retail Margin',
                'Team Rebates (11%)',
                'Rapid Breakeven ROI',
            ],
            'inclusions' => [
                '5x O\'Lamour Facial Essence (100ml)',
                '5x O\'Lamour CoreLaCreme Anti-Aging Cream (50g)',
                '5x O\'Lamour Quintessence Ampoule (30ml)',
                '8x O\'Lamour PrimeRenew BB Cream SPF 50+',
                'Infinite Barley Supreme & Robustus Defense Pack',
            ],
        ],
        'exec-pearl' => [
            'name' => 'Pearl Executive Global Plan',
            'tier' => 'Pearl Tier - Pro Starter',
            'prices' => [
                'USD' => '$680 USD',
                'PHP' => '₱28,888 PHP',
                'CFA' => 'CFA 295,000',
                'PGK' => 'PGK 2,600',
            ],
            'price_default' => '$680 USD / CFA 295,000 / ₱28,888',
            'rebate' => '7%',
            'highlights' => [
                'Pro Starter Inclusions',
                'Team Rebates (7%)',
                'Global Backoffice Access',
            ],
            'inclusions' => [
                '2x O\'Lamour Facial Essence (100ml)',
                '2x O\'Lamour CoreLaCreme Anti-Aging Cream (50g)',
                '2x O\'Lamour Quintessence Ampoule (30ml)',
                '3x O\'Lamour PrimeRenew BB Cream SPF 50+',
                'Infinite Glow Up & Brightening Skincare Set',
            ],
        ],
        'exec-emerald' => [
            'name' => 'Emerald Executive Global Plan',
            'tier' => 'Emerald Tier - Executive Member',
            'prices' => [
                'USD' => '$350 USD',
                'PHP' => '₱14,888 PHP',
                'CFA' => 'CFA 156,000',
                'PGK' => 'PGK 1,350',
            ],
            'price_default' => '$350 USD / CFA 156,000 / ₱14,888',
            'rebate' => '3%',
            'highlights' => [
                'Entry Executive Membership',
                'Team Rebates (3%)',
                'Full Digital Tools & Referral Link',
            ],
            'inclusions' => [
                '1x O\'Lamour Facial Essence (100ml)',
                '1x O\'Lamour CoreLaCreme Anti-Aging Cream (50g)',
                '1x O\'Lamour Quintessence Ampoule (30ml)',
                '2x O\'Lamour PrimeRenew BB Cream SPF 50+',
                'Infinite Starter Wellness Line Pack',
            ],
        ],
        'reg-starter' => [
            'name' => 'Regular Wholesale Plan',
            'tier' => 'Regular Wholesale Member',
            'prices' => [
                'USD' => '$250 USD',
                'PHP' => '₱9,888 PHP',
                'CFA' => 'CFA 110,000',
                'PGK' => 'PGK 950',
            ],
            'price_default' => '$250 USD / CFA 110,000 / ₱9,888',
            'rebate' => 'Standard',
            'highlights' => [
                'Standard Lifetime Membership',
                'Core Retail Margins (25% - 40%)',
                'Direct Referral Commission Program',
            ],
            'inclusions' => [
                'Essential Product Starter Kit',
                'Infinite Wellness Assortment',
                'Official Distributor Certificate',
            ],
        ],

        // World Wholesale Packages
        'world-starter' => [
            'name' => 'World Starter Package',
            'tier' => 'Starter Wholesale Rank',
            'prices' => [
                'PHP' => '₱3,000 PHP',
                'USD' => '$60 USD',
                'PGK' => 'PGK 299',
            ],
            'price_default' => '₱3,000 PHP / $60 USD / PGK 299',
            'rebate' => 'Standard',
            'highlights' => ['Entry-level Wholesale Account', 'Instant Product Value', 'Lifetime Validity'],
            'inclusions' => [
                '2x Infinite Glow Up Soap',
                '2x Infinite Deowhite Soap',
                '1x Infinite Botox Serum',
                '2x Infinite Brightening Serum',
                '1x Infinite White Body Lotion',
            ],
        ],
        'world-basic' => [
            'name' => 'World Basic Package',
            'tier' => 'Basic Wholesale Rank',
            'prices' => [
                'PHP' => '₱8,880 PHP',
                'USD' => '$189 USD',
                'PGK' => 'PGK 880',
            ],
            'price_default' => '₱8,880 PHP / $189 USD / PGK 880',
            'rebate' => 'Standard Plus',
            'highlights' => ['Most Popular Starter Option', 'Balanced Beauty & Wellness', 'Retail Ready'],
            'inclusions' => [
                '2x Whiteplus Glutathione',
                '3x Infinite Glow Up Soap',
                '3x Infinite Deowhite Soap',
                '2x Infinite Botox Serum',
                '3x Infinite Brightening Serum',
                '2x Infinite White Body Lotion',
            ],
        ],
        'world-advance' => [
            'name' => 'World Advance Package',
            'tier' => 'Executive Rank Status',
            'prices' => [
                'PHP' => '₱18,880 PHP',
                'USD' => '$359 USD',
                'PGK' => 'PGK 1,599',
            ],
            'price_default' => '₱18,880 PHP / $359 USD / PGK 1,599',
            'rebate' => 'Executive',
            'highlights' => ['Executive Rank Status', 'O\'Lamour French Luxury Line', 'Enhanced Earning Points'],
            'inclusions' => [
                '2x O\'Lamour Facial Essence',
                '1x O\'Lamour CoreLaCreme',
                '2x O\'Lamour Quintessence Ampoule',
                '2x O\'Lamour PrimeRenew BB Cream',
            ],
        ],
        'world-pro' => [
            'name' => 'World Pro Package',
            'tier' => '1-Star Executive Rank Status',
            'prices' => [
                'PHP' => '₱49,800 PHP',
                'USD' => '$929 USD',
                'PGK' => 'PGK 5,199',
            ],
            'price_default' => '₱49,800 PHP / $929 USD / PGK 5,199',
            'rebate' => '1-Star Executive',
            'highlights' => ['1-Star Executive Rank Status', 'High Volume Inventory', 'Maximum Matching Cap'],
            'inclusions' => [
                '4x O\'Lamour Facial Essence',
                '4x O\'Lamour CoreLaCreme',
                '4x O\'Lamour Quintessence Ampoule',
                '9x O\'Lamour PrimeRenew BB Cream',
            ],
        ],
        'world-supreme' => [
            'name' => 'World Supreme Package',
            'tier' => '2-Star Executive Rank Status',
            'prices' => [
                'PHP' => '₱125,000 PHP',
                'USD' => '$2,229 USD',
                'PGK' => 'PGK 12,599',
            ],
            'price_default' => '₱125,000 PHP / $2,229 USD / PGK 12,599',
            'rebate' => '2-Star Executive',
            'highlights' => ['2-Star Executive Rank Status', 'Master Stockist Volume', 'Highest Residual Earnings'],
            'inclusions' => [
                '11x O\'Lamour Facial Essence',
                '11x O\'Lamour CoreLaCreme',
                '11x O\'Lamour Quintessence Ampoule',
                '20x O\'Lamour PrimeRenew BB Cream',
            ],
        ],
    ];

    /**
     * Resolve normalized catalog metadata for a given registration.
     */
    public function getInvoiceData(WorldPlanRegistration $registration): array
    {
        $packageKey = $this->resolvePackageKey($registration->package_type);
        $catalog = self::$packageCatalog[$packageKey] ?? null;

        $currency = $this->resolveCurrency($registration);
        $currencySymbol = match ($currency) {
            'PHP' => '₱',
            'USD' => '$',
            'PGK' => 'PGK ',
            'CFA' => 'CFA ',
            'AED' => 'AED ',
            'EUR' => '€',
            default => '$',
        };

        // Determine Package Name
        $packageName = $catalog['name'] ?? ($registration->package_type ? ucwords(str_replace(['-', '_'], ' ', $registration->package_type)) : 'World Plan Package');
        $tierName = $catalog['tier'] ?? 'Executive Global Member';

        // Determine Price: use registration amount_paid if available, otherwise catalog price
        $priceDisplay = '';
        if (!empty($registration->amount_paid)) {
            $priceDisplay = trim($registration->amount_paid);
            if (!Str::contains($priceDisplay, ['$', '₱', 'PGK', 'CFA', 'AED', 'EUR', 'PHP', 'USD'])) {
                $priceDisplay = $currencySymbol . number_format((float) preg_replace('/[^0-9.]/', '', $priceDisplay), 2);
            }
        } elseif ($catalog) {
            $priceDisplay = $catalog['prices'][$currency] ?? $catalog['price_default'];
        } else {
            $priceDisplay = '$350.00 USD';
        }

        // Determine Inclusions & Product Set
        $inclusions = $catalog['inclusions'] ?? [];
        if (!empty($registration->product_set)) {
            // Check if product_set has specific items
            $customItems = array_map('trim', explode(',', $registration->product_set));
            if (count($customItems) > 1) {
                $inclusions = $customItems;
            } else {
                array_unshift($inclusions, $registration->product_set);
            }
        }

        $regId = str_pad((string) $registration->id, 5, '0', STR_PAD_LEFT);
        $invoiceNumber = 'INV-WP-' . $regId . '-' . ($registration->created_at ? $registration->created_at->format('Y') : date('Y'));
        $referenceNumber = 'WP-' . $regId;

        $invoiceDate = $registration->updated_at ? $registration->updated_at->format('F d, Y') : now()->format('F d, Y');
        $paymentDate = $registration->payment_date ? $registration->payment_date->format('F d, Y') : ($registration->created_at ? $registration->created_at->format('F d, Y') : now()->format('F d, Y'));

        $customerName = $registration->full_name ?: trim(($registration->first_name ?? '') . ' ' . ($registration->last_name ?? ''));
        if (empty($customerName)) {
            $customerName = $registration->username ?: 'Valued Executive Member';
        }

        return [
            'registration' => $registration,
            'invoice_number' => $invoiceNumber,
            'reference_number' => $referenceNumber,
            'invoice_date' => $invoiceDate,
            'payment_date' => $paymentDate,
            'status' => 'PAID & APPROVED',
            'customer_name' => $customerName,
            'username' => $registration->username,
            'email' => $registration->email,
            'contact_no' => $registration->contact_no ?: 'N/A',
            'address' => $registration->address ?: 'Global Distribution Address',
            'country' => $registration->country ?: 'International',
            'sponsor' => $registration->sponsor ?: 'INFINITE Corporate / Direct',
            'payment_method' => $registration->payment_method ?: 'Bank Remittance / Electronic Verification',
            'package_name' => $packageName,
            'package_tier' => $tierName,
            'price_display' => $priceDisplay,
            'currency' => $currency,
            'currency_symbol' => $currencySymbol,
            'inclusions' => $inclusions,
            'highlights' => $catalog['highlights'] ?? ['Official Executive Global Membership', 'Lifetime Non-Refundable Validity', '24/7 International Business Portal Access'],
            'admin_notes' => $registration->admin_notes,
        ];
    }

    /**
     * Generate DomPDF instance for invoice.
     */
    public function generateInvoicePdf(WorldPlanRegistration $registration): \Barryvdh\DomPDF\PDF
    {
        $data = $this->getInvoiceData($registration);

        $pdf = Pdf::loadView('pdf.world_plan_invoice', $data);
        $pdf->setPaper('a4', 'portrait');
        $pdf->setOptions([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
            'defaultFont' => 'DejaVu Sans',
        ]);

        return $pdf;
    }

    /**
     * Return raw binary PDF content.
     */
    public function generateInvoiceRawPdf(WorldPlanRegistration $registration): string
    {
        return $this->generateInvoicePdf($registration)->output();
    }

    /**
     * Save generated PDF to local storage and return absolute file path.
     */
    public function saveInvoiceToStorage(WorldPlanRegistration $registration): string
    {
        $dir = storage_path('app/invoices');
        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true, true);
        }

        $fileName = $this->getInvoiceFileName($registration);
        $filePath = $dir . DIRECTORY_SEPARATOR . $fileName;

        $rawPdf = $this->generateInvoiceRawPdf($registration);
        File::put($filePath, $rawPdf);

        return $filePath;
    }

    /**
     * Get clean standard invoice filename.
     */
    public function getInvoiceFileName(WorldPlanRegistration $registration): string
    {
        $regId = str_pad((string) $registration->id, 5, '0', STR_PAD_LEFT);
        $cleanUsername = Str::slug($registration->username ?: 'member', '_');

        return "INFINITE_Invoice_WP-{$regId}_{$cleanUsername}.pdf";
    }

    /**
     * Match arbitrary package string to normalized catalog key.
     */
    protected function resolvePackageKey(?string $input): string
    {
        if (empty($input)) {
            return 'exec-emerald';
        }

        $clean = strtolower(trim($input));

        if (Str::contains($clean, 'diamond')) {
            return 'exec-diamond';
        }
        if (Str::contains($clean, 'sapphire')) {
            return 'exec-sapphire';
        }
        if (Str::contains($clean, 'ruby')) {
            return 'exec-ruby';
        }
        if (Str::contains($clean, 'pearl')) {
            return 'exec-pearl';
        }
        if (Str::contains($clean, 'emerald')) {
            return 'exec-emerald';
        }
        if (Str::contains($clean, ['regular', 'wholesale'])) {
            return 'reg-starter';
        }

        // World series
        if (Str::contains($clean, 'supreme')) {
            return 'world-supreme';
        }
        if (Str::contains($clean, 'pro')) {
            return 'world-pro';
        }
        if (Str::contains($clean, 'advance')) {
            return 'world-advance';
        }
        if (Str::contains($clean, 'basic')) {
            return 'world-basic';
        }
        if (Str::contains($clean, 'starter')) {
            return 'world-starter';
        }

        return 'exec-emerald';
    }

    /**
     * Resolve currency from registration fields.
     */
    protected function resolveCurrency(WorldPlanRegistration $registration): string
    {
        $country = strtolower($registration->country ?? '');
        $amount = $registration->amount_paid ?? '';

        if (Str::contains($amount, '₱') || Str::contains($amount, 'php')) {
            return 'PHP';
        }
        if (Str::contains($amount, '$') || Str::contains($amount, 'usd')) {
            return 'USD';
        }
        if (Str::contains($amount, ['pgk', 'k '])) {
            return 'PGK';
        }
        if (Str::contains($amount, 'cfa')) {
            return 'CFA';
        }

        if (Str::contains($country, 'philippines') || Str::contains($country, 'ph')) {
            return 'PHP';
        }
        if (Str::contains($country, 'papua') || Str::contains($country, 'png')) {
            return 'PGK';
        }
        if (Str::contains($country, ['togo', 'ivory', 'ivoire', 'cameroon', 'burkina', 'benin', 'senegal', 'cfa'])) {
            return 'CFA';
        }
        if (Str::contains($country, ['uae', 'emirates', 'dubai'])) {
            return 'AED';
        }

        return 'USD';
    }
}
