<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CountryController extends Controller
{
    /**
     * Display region and country selector.
     */
    public function index(): Response
    {
        $countries = [
            ['name' => 'Burkina Faso', 'code' => 'bf', 'flag' => '/assets/image/flags/1.png', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Cameroon', 'code' => 'cm', 'flag' => '/assets/image/flags/cameroon.png', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Côte D\'ivoire', 'code' => 'ci', 'flag' => '/assets/image/flags/cote.png', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Democratic Republic Of Congo', 'code' => 'drc', 'flag' => '/assets/image/flags/dc.png', 'currency' => 'USD / CDF', 'symbol' => '$'],
            ['name' => 'Papua New Guinea', 'code' => 'png', 'flag' => '/assets/image/flags/pp.png', 'currency' => 'PGK', 'symbol' => 'K'],
            ['name' => 'Philippines', 'code' => 'ph', 'flag' => '/assets/image/flags/ph.png', 'currency' => 'PHP', 'symbol' => '₱'],
            ['name' => 'South Africa', 'code' => 'sa', 'flag' => '/assets/image/flags/sa.png', 'currency' => 'ZAR', 'symbol' => 'R'],
            ['name' => 'Togo', 'code' => 'tg', 'flag' => '/assets/image/flags/tg.png', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Uganda', 'code' => 'ug', 'flag' => '/assets/image/flags/ug.png', 'currency' => 'UGX', 'symbol' => 'USh'],
            ['name' => 'Other Countries (Global)', 'code' => 'others', 'flag' => '/assets/image/logo-infinite.webp', 'currency' => 'USD', 'symbol' => '$'],
        ];

        return Inertia::render('SelectCountry', [
            'countries' => $countries,
        ]);
    }
}
