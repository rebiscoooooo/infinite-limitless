<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    /**
     * Show country-specific community presentation and compensation plan.
     */
    public function showCommunity(string $country = 'ph'): Response
    {
        $countryMap = [
            'bf' => ['name' => 'Burkina Faso', 'currency' => 'CFA', 'prefix' => 'CFA '],
            'cm' => ['name' => 'Cameroon', 'currency' => 'CFA', 'prefix' => 'CFA '],
            'ci' => ['name' => 'Côte d\'Ivoire', 'currency' => 'CFA', 'prefix' => 'CFA '],
            'drc' => ['name' => 'Democratic Republic of Congo', 'currency' => 'USD', 'prefix' => '$'],
            'png' => ['name' => 'Papua New Guinea', 'currency' => 'PGK', 'prefix' => 'K '],
            'ph' => ['name' => 'Philippines', 'currency' => 'PHP', 'prefix' => '₱'],
            'sa' => ['name' => 'South Africa', 'currency' => 'ZAR', 'prefix' => 'R '],
            'tg' => ['name' => 'Togo', 'currency' => 'CFA', 'prefix' => 'CFA '],
            'ug' => ['name' => 'Uganda', 'currency' => 'UGX', 'prefix' => 'USh '],
            'zw' => ['name' => 'Zimbabwe', 'currency' => 'USD', 'prefix' => '$'],
            'others' => ['name' => 'Global Network', 'currency' => 'USD', 'prefix' => '$'],
        ];

        $countryKey = strtolower($country);
        $currentCountry = $countryMap[$countryKey] ?? [
            'name' => ucwords(str_replace(['-', '_'], ' ', $country)),
            'currency' => 'USD',
            'prefix' => '$',
        ];

        // Format prices based on country currency
        $isCfa = $currentCountry['currency'] === 'CFA';
        $isPhp = $currentCountry['currency'] === 'PHP';
        $isPng = $currentCountry['currency'] === 'PGK';

        $execPrices = [
            'emerald' => $isCfa ? 'CFA 156,000' : ($isPhp ? '₱14,888' : ($isPng ? 'K 1,200' : '$350')),
            'pearl' => $isCfa ? 'CFA 295,000' : ($isPhp ? '₱28,888' : ($isPng ? 'K 2,400' : '$680')),
            'ruby' => $isCfa ? 'CFA 750,000' : ($isPhp ? '₱72,888' : ($isPng ? 'K 6,200' : '$1,750')),
            'sapphire' => $isCfa ? 'CFA 1,850,000' : ($isPhp ? '₱178,888' : ($isPng ? 'K 15,500' : '$4,350')),
            'diamond' => $isCfa ? 'CFA 2,800,000' : ($isPhp ? '₱268,888' : ($isPng ? 'K 23,500' : '$6,500')),
        ];

        $regPrices = [
            'emerald' => $isCfa ? 'CFA 110,000' : ($isPhp ? '₱9,888' : ($isPng ? 'K 850' : '$250')),
            'pearl' => $isCfa ? 'CFA 185,000' : ($isPhp ? '₱17,888' : ($isPng ? 'K 1,500' : '$430')),
            'ruby' => $isCfa ? 'CFA 490,000' : ($isPhp ? '₱48,888' : ($isPng ? 'K 4,100' : '$1,150')),
            'sapphire' => $isCfa ? 'CFA 1,200,000' : ($isPhp ? '₱118,888' : ($isPng ? 'K 10,200' : '$2,850')),
            'diamond' => $isCfa ? 'CFA 1,950,000' : ($isPhp ? '₱188,888' : ($isPng ? 'K 16,500' : '$4,600')),
        ];

        $packages = [
            'executive' => [
                [
                    'id' => 'exec-emerald',
                    'tier' => 'EMERALD',
                    'name' => 'Executive Starter Set',
                    'price' => $execPrices['emerald'],
                    'worth' => '15% Extra Value Added',
                    'badge' => '/assets/image/badge/Emerald_logo.png',
                    'inclusions' => [
                        '1x O\'Lamour Facial Essence',
                        '1x O\'Lamour Quintessence Ampoule',
                        '1x O\'Lamour CoreLaCrème',
                        '3x PrimeRenew BB Creams',
                        'Executive Member ID & Backoffice',
                        '3% - 19% Team Executive Rebates',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 275,000' : ($isPhp ? '₱25,000' : '$650')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'exec-pearl',
                    'tier' => 'PEARL',
                    'name' => 'Executive Pro Set',
                    'price' => $execPrices['pearl'],
                    'worth' => '20% Extra Value Added',
                    'badge' => '/assets/image/badge/Pearl_logo.png',
                    'inclusions' => [
                        '2x O\'Lamour Facial Essence',
                        '2x O\'Lamour Quintessence Ampoule',
                        '2x O\'Lamour CoreLaCrème',
                        '6x PrimeRenew BB Creams',
                        'Executive Member ID & Backoffice',
                        '3% - 19% Team Executive Rebates',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 450,000' : ($isPhp ? '₱45,000' : '$1,100')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'exec-ruby',
                    'tier' => 'RUBY',
                    'name' => 'Executive Director Set',
                    'price' => $execPrices['ruby'],
                    'worth' => '25% Extra Value Added',
                    'badge' => '/assets/image/badge/Ruby_logo.png',
                    'inclusions' => [
                        '6x O\'Lamour Facial Essence',
                        '6x O\'Lamour Quintessence Ampoule',
                        '6x O\'Lamour CoreLaCrème',
                        '14x PrimeRenew BB Creams',
                        'Executive Member ID & Backoffice',
                        '3% - 19% Team Executive Rebates',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 830,000' : ($isPhp ? '₱85,000' : '$2,000')),
                    ],
                    'recommended' => true,
                ],
                [
                    'id' => 'exec-sapphire',
                    'tier' => 'SAPPHIRE',
                    'name' => 'Executive Ambassador Set',
                    'price' => $execPrices['sapphire'],
                    'worth' => '30% Extra Value Added',
                    'badge' => '/assets/image/badge/Sapphire_logo.png',
                    'inclusions' => [
                        '17x O\'Lamour Facial Essence',
                        '17x O\'Lamour Quintessence Ampoule',
                        '17x O\'Lamour CoreLaCrème',
                        '33x PrimeRenew BB Creams',
                        'Executive Member ID & Backoffice',
                        '3% - 19% Team Executive Rebates',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 1,380,000' : ($isPhp ? '₱140,000' : '$3,400')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'exec-diamond',
                    'tier' => 'DIAMOND',
                    'name' => 'Executive Supreme Set',
                    'price' => $execPrices['diamond'],
                    'worth' => '35% Extra Value Added',
                    'badge' => '/assets/image/badge/Diamond_logo.png',
                    'inclusions' => [
                        '26x O\'Lamour Facial Essence',
                        '26x O\'Lamour Quintessence Ampoule',
                        '26x O\'Lamour CoreLaCrème',
                        '55x PrimeRenew BB Creams',
                        'VIP Diamond Council Status',
                        '3% - 19% Team Executive Rebates',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 1,800,000' : ($isPhp ? '₱200,000' : '$5,000')),
                    ],
                    'recommended' => false,
                ],
            ],
            'regular' => [
                [
                    'id' => 'reg-gem',
                    'tier' => 'GEM',
                    'name' => 'Regular Starter Set',
                    'price' => $isCfa ? 'CFA 25,000' : ($isPhp ? '₱1,888' : ($isPng ? 'K 150' : '$45')),
                    'worth' => '10% Extra Value Added',
                    'badge' => '/assets/image/badge/GEM.png',
                    'inclusions' => [
                        '2x Infinite Robustus Black Coffee',
                        '1x Infinite Organic Barley Powder',
                        'Distributor ID & Reorder Discounts',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 135,000' : ($isPhp ? '₱12,500' : '$300')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'reg-emerald',
                    'tier' => 'EMERALD',
                    'name' => 'Regular Health Set',
                    'price' => $regPrices['emerald'],
                    'worth' => '10% Extra Value Added',
                    'badge' => '/assets/image/badge/emerald.png',
                    'inclusions' => [
                        '5x Infinite Robustus Black Coffee',
                        '3x Infinite Organic Barley Powder',
                        '2x White Plus Glutathione (30 caps)',
                        'Distributor ID & Reorder Discounts',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 275,000' : ($isPhp ? '₱25,000' : '$650')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'reg-pearl',
                    'tier' => 'PEARL',
                    'name' => 'Regular Pro Health Set',
                    'price' => $regPrices['pearl'],
                    'worth' => '15% Extra Value Added',
                    'badge' => '/assets/image/badge/pearl.png',
                    'inclusions' => [
                        '8x Infinite Robustus Black Coffee',
                        '5x Infinite Organic Barley Powder',
                        '5x White Plus Glutathione (30 caps)',
                        'Distributor ID & Reorder Discounts',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 450,000' : ($isPhp ? '₱45,000' : '$1,100')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'reg-ruby',
                    'tier' => 'RUBY',
                    'name' => 'Regular Director Health Set',
                    'price' => $regPrices['ruby'],
                    'worth' => '20% Extra Value Added',
                    'badge' => '/assets/image/badge/ruby.png',
                    'inclusions' => [
                        '20x Infinite Robustus Black Coffee',
                        '15x Infinite Organic Barley Powder',
                        '12x White Plus Glutathione (30 caps)',
                        'Distributor ID & Reorder Discounts',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 830,000' : ($isPhp ? '₱85,000' : '$2,000')),
                    ],
                    'recommended' => true,
                ],
                [
                    'id' => 'reg-sapphire',
                    'tier' => 'SAPPHIRE',
                    'name' => 'Regular Ambassador Health Set',
                    'price' => $regPrices['sapphire'],
                    'worth' => '25% Extra Value Added',
                    'badge' => '/assets/image/badge/sapphire.png',
                    'inclusions' => [
                        '50x Infinite Robustus Black Coffee',
                        '35x Infinite Organic Barley Powder',
                        '25x White Plus Glutathione (30 caps)',
                        'Distributor ID & Reorder Discounts',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 1,380,000' : ($isPhp ? '₱140,000' : '$3,400')),
                    ],
                    'recommended' => false,
                ],
                [
                    'id' => 'reg-diamond',
                    'tier' => 'DIAMOND',
                    'name' => 'Regular Supreme Health Set',
                    'price' => $regPrices['diamond'],
                    'worth' => '30% Extra Value Added',
                    'badge' => '/assets/image/badge/diamond.png',
                    'inclusions' => [
                        '80x Infinite Robustus Black Coffee',
                        '60x Infinite Organic Barley Powder',
                        '40x White Plus Glutathione (30 caps)',
                        'Distributor ID & Reorder Discounts',
                        'Weekly Cap: ' . ($isCfa ? 'CFA 1,800,000' : ($isPhp ? '₱200,000' : '$5,000')),
                    ],
                    'recommended' => false,
                ],
            ]
        ];

        $earningWays = [
            [
                'title' => '1. Direct Retail Profit (Up to 30%)',
                'desc' => 'Buy at wholesale partner discount and sell to retail customers at suggested retail price. Instant daily cash flow margin.',
            ],
            [
                'title' => '2. Enroller Bonus',
                'desc' => 'Receive direct cash bonuses every time you sponsor an entrepreneur who registers for an Executive or Regular product set.',
            ],
            [
                'title' => '3. Sales Match Pairing Matrix',
                'desc' => 'Build a Left and Right team. Whenever volume points match on both sides, automated matching commissions are generated and credited.',
            ],
            [
                'title' => '4. Weekly Potential Income Caps',
                'desc' => 'Generous weekly income caps scaling from Emerald to Diamond, allowing sustainable team-building and high earning leverage.',
            ],
            [
                'title' => '5. Semi-Monthly Cut-off Cash Incentives',
                'desc' => 'Performance milestones awarded twice a month (1st-15th and 16th-31st cut-offs) for top leaders and emerging producers.',
            ],
            [
                'title' => '6. INFINITE Leadership Overrides (10% to 30%)',
                'desc' => 'Earn matching percentage overrides on the total pairing checks earned by your personally mentored leaders.',
            ],
            [
                'title' => '7. Executive Level Bonus (3% to 19% Rebates)',
                'desc' => 'Exclusive to Executive package holders: unlock cascading unilevel rebates across entire downline reorder volumes.',
            ],
            [
                'title' => '8. Global Lifestyle & Travel Incentives',
                'desc' => 'Qualify for fully paid international leadership retreats, car program allowances, and luxury recognition galas.',
            ]
        ];

        return Inertia::render('JoinCommunity', [
            'country' => $currentCountry,
            'packages' => $packages,
            'earningWays' => $earningWays,
        ]);
    }
}
