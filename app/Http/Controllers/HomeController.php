<?php

namespace App\Http\Controllers;

use App\Models\ProductStat;
use App\Models\SiteStat;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the Infinite landing page.
     */
    public function index(): Response
    {
        $siteStats = SiteStat::first();
        $products = ProductStat::orderBy('clicks', 'desc')->get();

        $partners = [
            [
                'country' => 'Burkina Faso',
                'code' => 'bf',
                'flag' => '/assets/image/flags/1.png',
                'name' => 'Alexandre Kaboré',
                'role' => 'Country Director',
                'phone' => '+226 70 12 34 56',
                'city' => 'Ouagadougou',
            ],
            [
                'country' => 'Cameroon',
                'code' => 'cm',
                'flag' => '/assets/image/flags/cameroon.png',
                'name' => 'Jean-Paul Nguema',
                'role' => 'Regional Ambassador',
                'phone' => '+237 67 89 01 23',
                'city' => 'Douala',
            ],
            [
                'country' => 'Côte d\'Ivoire',
                'code' => 'ci',
                'flag' => '/assets/image/flags/cote.png',
                'name' => 'Marie Diallo',
                'role' => 'Executive Leader',
                'phone' => '+225 07 45 67 89',
                'city' => 'Abidjan',
            ],
            [
                'country' => 'Papua New Guinea',
                'code' => 'png',
                'flag' => '/assets/image/flags/pp.png',
                'name' => 'Solomon Waima',
                'role' => 'Pacific Operations Lead',
                'phone' => '+675 7123 4567',
                'city' => 'Port Moresby',
            ],
            [
                'country' => 'Philippines',
                'code' => 'ph',
                'flag' => '/assets/image/flags/ph.png',
                'name' => 'Headquarters Global Hub',
                'role' => 'Global Distribution Center',
                'phone' => '+63 917 123 4567',
                'city' => 'Metro Manila',
            ],
            [
                'country' => 'Democratic Republic of Congo',
                'code' => 'drc',
                'flag' => '/assets/image/flags/dc.png',
                'name' => 'Michel Lumumba',
                'role' => 'Central Africa Lead',
                'phone' => '+243 81 234 5678',
                'city' => 'Kinshasa',
            ],
            [
                'country' => 'Uganda',
                'code' => 'ug',
                'flag' => '/assets/image/flags/ug.png',
                'name' => 'Grace Omondi',
                'role' => 'East Africa Director',
                'phone' => '+256 77 123 4567',
                'city' => 'Kampala',
            ],
            [
                'country' => 'South Africa',
                'code' => 'sa',
                'flag' => '/assets/image/flags/sa.png',
                'name' => 'Thabo Nkosi',
                'role' => 'Southern Africa Ambassador',
                'phone' => '+27 82 345 6789',
                'city' => 'Johannesburg',
            ],
        ];

        $testimonials = [
            [
                'id' => 1,
                'name' => 'Brenda M.',
                'location' => 'Abidjan, Côte d\'Ivoire',
                'product' => 'Infinite Organic Barley',
                'beforeImg' => '/assets/image/testimony/before(1).jpeg',
                'afterImg' => '/assets/image/testimony/after(1).jpeg',
                'quote' => 'My chronic fatigue and high blood sugar levels normalized within 3 weeks of the morning activation protocol. Infinite Barley is now an indispensable part of my family’s daily life.',
                'rating' => 5,
            ],
            [
                'id' => 2,
                'name' => 'Moussa T.',
                'location' => 'Ouagadougou, Burkina Faso',
                'product' => 'Infinite Robustus Black Coffee',
                'beforeImg' => '/assets/image/testimony/before(2).jpeg',
                'afterImg' => '/assets/image/testimony/after(2).jpeg',
                'quote' => 'Zero acidity, sustained focus throughout my 12-hour shifts, and I lost 4kg in the first month without strict dieting because of the high Chlorogenic Acid content.',
                'rating' => 5,
            ],
            [
                'id' => 3,
                'name' => 'Amina S.',
                'location' => 'Douala, Cameroon',
                'product' => 'O\'Lamour Clinical Skincare Set',
                'beforeImg' => '/assets/image/testimony/before(3).jpeg',
                'afterImg' => '/assets/image/testimony/after(3).jpeg',
                'quote' => 'My hyperpigmentation and hormonal breakout scars faded noticeably in 14 days. People keep asking what luxury spa treatment I had done!',
                'rating' => 5,
            ],
            [
                'id' => 4,
                'name' => 'Kila P.',
                'location' => 'Port Moresby, PNG',
                'product' => 'White Plus Glutathione',
                'beforeImg' => '/assets/image/testimony/100.png',
                'afterImg' => '/assets/image/testimony/101.png',
                'quote' => 'Deeper sleep from day one, clearer mind, and an unbelievable natural skin glow. NAC + master antioxidants make a massive clinical difference.',
                'rating' => 5,
            ],
        ];

        return Inertia::render('Home', [
            'siteStats' => $siteStats,
            'products' => $products,
            'partners' => $partners,
            'testimonials' => $testimonials,
        ]);
    }
}
