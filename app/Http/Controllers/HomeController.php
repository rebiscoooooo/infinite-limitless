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
                'image' => '/assets/image/team/Sir_Primo.png',
                'name' => 'PRIMO ECALNE',
                'country' => 'PHILIPPINES',
                'country_code' => 'ph',
                'flag' => '/assets/image/flags/ph.png',
                'whatsapp' => '+63 916 735 4749',
                'email' => 'primoecalnejr@gmail.com',
                'role' => 'Global Ambassador / Diamond Executive',
            ],
            [
                'image' => '/assets/image/team/ma_am(2.png',
                'name' => 'AERA CLARIDAD',
                'country' => 'PHILIPPINES',
                'country_code' => 'ph',
                'flag' => '/assets/image/flags/ph.png',
                'whatsapp' => '+63 915 1988 522',
                'email' => 'aeraclaridad0809@gmail.com',
                'role' => 'Global Ambassador / Diamond Executive',
            ],
            [
                'image' => '/assets/image/team/team33.png',
                'name' => 'SPHOSETHU MABUDLE',
                'country' => 'DURBAN SOUTH AFRICA',
                'country_code' => 'sa',
                'flag' => '/assets/image/flags/sa.png',
                'whatsapp' => '+27 73 046 9892',
                'email' => 'smabudle@gmail.com',
                'role' => 'Regional Leader',
            ],
            [
                'image' => '/assets/image/team/team(4).png',
                'name' => 'SOUN SOUN LUC GEORGES',
                'country' => 'CAMEROON',
                'country_code' => 'cameroon',
                'flag' => '/assets/image/flags/cameroon.png',
                'whatsapp' => '+237 699 88 78 97',
                'email' => 'sounlucgeorges@yahoo.fr',
                'role' => 'Country Ambassador',
            ],
            [
                'image' => '/assets/image/team/team6.2.png',
                'name' => 'KYASIIMIRE PENNINAH',
                'country' => 'UGANDA',
                'country_code' => 'ug',
                'flag' => '/assets/image/flags/ug.png',
                'whatsapp' => '+256-779674736',
                'email' => 'kyasiimire29@gmail.com',
                'role' => 'Country Ambassador',
            ],
        ];

        $testimonials = [
            [
                'id' => 1,
                'brand' => 'VIDA SKIN',
                'before_img' => '/assets/image/testimony/before(1).jpeg',
                'after_img' => '/assets/image/testimony/after(1).jpeg',
                'product_img' => '/assets/image/testimony/100.png',
                'product_name' => 'VIDA SET',
                'product_desc' => 'Lightweight, hydrating sun protection with natural mineral powders and brightening ingredients.',
            ],
            [
                'id' => 2,
                'brand' => 'INFINITE',
                'before_img' => '/assets/image/testimony/before(2).jpeg',
                'after_img' => '/assets/image/testimony/after(2).jpeg',
                'product_img' => '/assets/image/testimony/101.png',
                'product_name' => 'INFINITE DEOWHITE SOAP AND INFINITE BODY LOTION',
                'product_desc' => 'Achieve brighter, clearer skin with Rose Water, Niacinamide, and Vitamin C for a luminous glow.',
            ],
            [
                'id' => 3,
                'brand' => 'INFINITE',
                'before_img' => '/assets/image/testimony/before(3).jpeg',
                'after_img' => '/assets/image/testimony/after(3).jpeg',
                'product_img' => '/assets/image/testimony/102.png',
                'product_name' => 'INFINITE GLOW UP SOAP AND BRIGHTENING SERUM',
                'product_desc' => 'A scientifically advanced multi-function Facial Essence designed to revitalize and improve skin clarity.',
            ],
        ];

        $reviews = [
            [
                'name' => 'WILMA BOHAGE',
                'loc' => 'Papua New Guinea',
                'image' => '/assets/image/wilma.png',
                'text' => 'From the very first try, my energy skyrocketed to levels I’ve never felt before! No more sluggish mornings, no more achy muscles — just pure vitality that lasts all day. INFINITE ROBUSTUS gave me my energy back, and the feeling is nothing short of miraculous!',
            ],
            [
                'name' => 'BILLIE MICHAEL',
                'loc' => 'Papua New Guinea',
                'image' => '/assets/image/billie.png',
                'text' => 'INFINITE Robustus coffee and INFINITE barley changed my life! I lost belly fat, normalized my cholesterol, and gained control over hypertension. Even at 85kg, I feel lighter, healthier, and more active — climbing ladders with ease and sleeping comfortably again. Truly thankful for these positive changes!',
            ],
            [
                'name' => 'RAVELYN RIVERA',
                'loc' => 'Philippines',
                'image' => '/assets/image/ravelyn.png',
                'text' => "INFINITE Barley is so magical for me. Last week I had a severe cough and asthma. I took so many medicine and antibiotics as well. I said, 'I have barley in my products, why not I take it?' When I drink the barley, and after 1 minute my severe cough and asthma is gone.",
            ],
        ];

        return Inertia::render('Home', [
            'siteStats' => $siteStats,
            'products' => $products,
            'partners' => $partners,
            'testimonials' => $testimonials,
            'reviews' => $reviews,
        ]);
    }
}
