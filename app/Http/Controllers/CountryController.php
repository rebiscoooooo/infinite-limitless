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
            ['name' => 'Burkina Faso', 'code' => 'bf', 'flag' => '/assets/image/flags/bf.svg', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Cameroon', 'code' => 'cm', 'flag' => '/assets/image/flags/cm.svg', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Côte D\'ivoire', 'code' => 'ci', 'flag' => '/assets/image/flags/ci.svg', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Democratic Republic Of Congo', 'code' => 'drc', 'flag' => '/assets/image/flags/cd.svg', 'currency' => 'USD / CDF', 'symbol' => '$'],
            ['name' => 'Papua New Guinea', 'code' => 'png', 'flag' => '/assets/image/flags/pg.svg', 'currency' => 'PGK', 'symbol' => 'K'],
            ['name' => 'Philippines', 'code' => 'ph', 'flag' => '/assets/image/flags/ph.svg', 'currency' => 'PHP', 'symbol' => '₱'],
            ['name' => 'South Africa', 'code' => 'sa', 'flag' => '/assets/image/flags/za.svg', 'currency' => 'ZAR', 'symbol' => 'R'],
            ['name' => 'Togo', 'code' => 'tg', 'flag' => '/assets/image/flags/tg.svg', 'currency' => 'CFA', 'symbol' => 'CFA'],
            ['name' => 'Uganda', 'code' => 'ug', 'flag' => '/assets/image/flags/ug.svg', 'currency' => 'UGX', 'symbol' => 'USh'],
            ['name' => 'Zimbabwe', 'code' => 'zw', 'flag' => '/assets/image/flags/zw.svg', 'currency' => 'USD', 'symbol' => '$'],
            ['name' => 'Other Countries (Global)', 'code' => 'others', 'flag' => '/assets/image/logo-infinite.webp', 'currency' => 'USD', 'symbol' => '$'],
        ];

        return Inertia::render('SelectCountry', [
            'countries' => $countries,
        ]);
    }
}
