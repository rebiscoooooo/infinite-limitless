<?php

namespace App\Http\Controllers;

use App\Models\WorldPlanRegistration;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    /**
     * Show legitimacy, leadership wall, certificates, and logistics proof.
     */
    public function legitimacy(): Response
    {
        $approvedUsers = WorldPlanRegistration::where('status', 'Approved')
            ->orderBy('id', 'asc')
            ->get();

        $tierMembers = [
            'diamond' => [],
            'sapphire' => [],
            'ruby' => [],
            'pearl' => []
        ];

        foreach ($approvedUsers as $user) {
            $fullName = strtoupper(trim($user->first_name . ' ' . $user->last_name));
            $country = strtoupper(trim(explode(',', $user->address)[count(explode(',', $user->address)) - 1] ?? 'GLOBAL'));
            $pkg = strtolower(trim($user->package_type));

            $memberData = [
                'name' => $fullName,
                'country' => $country,
                'flag' => strtolower($country),
                'img' => '/assets/image/placeholder-user.jpg',
                'coming_soon' => false,
            ];

            if (str_contains($pkg, 'supreme') || str_contains($pkg, 'diamond')) {
                $tierMembers['diamond'][] = $memberData;
            } elseif (str_contains($pkg, 'pro') || str_contains($pkg, 'sapphire')) {
                $tierMembers['sapphire'][] = $memberData;
            } elseif (str_contains($pkg, 'advance') || str_contains($pkg, 'ruby')) {
                $tierMembers['ruby'][] = $memberData;
            } else {
                $tierMembers['pearl'][] = $memberData;
            }
        }

        $fillSlots = function ($members, $maxSlots) {
            $filled = $members;
            $currentCount = count($filled);
            if ($currentCount < $maxSlots) {
                for ($i = $currentCount; $i < $maxSlots; $i++) {
                    $filled[] = [
                        'name' => 'RESERVED SLOT',
                        'country' => 'AVAILABLE',
                        'flag' => '',
                        'img' => '',
                        'coming_soon' => true,
                    ];
                }
            }
            return $filled;
        };

        $executiveTiers = [
            [
                'id' => 'diamond',
                'theme_class' => 'diamond-theme',
                'gem_img' => '/assets/image/diamond.png',
                'rank_name' => 'DIAMOND EXECUTIVES',
                'rank_sub' => 'HIGHEST LEADERSHIP COUNCIL',
                'is_diamond_layout' => true,
                'max_slots' => 3,
                'leaders' => $fillSlots($tierMembers['diamond'], 3),
            ],
            [
                'id' => 'sapphire',
                'theme_class' => 'sapphire-theme',
                'gem_img' => '/assets/image/sapphire.png',
                'rank_name' => 'SAPPHIRE',
                'rank_sub' => 'SENIOR EXECUTIVES',
                'is_diamond_layout' => false,
                'max_slots' => 4,
                'leaders' => $fillSlots($tierMembers['sapphire'], 4),
            ],
            [
                'id' => 'ruby',
                'theme_class' => 'ruby-theme',
                'gem_img' => '/assets/image/ruby.png',
                'rank_name' => 'RUBY',
                'rank_sub' => 'ADVANCED DIRECTORS',
                'is_diamond_layout' => false,
                'max_slots' => 4,
                'leaders' => $fillSlots($tierMembers['ruby'], 4),
            ],
            [
                'id' => 'pearl',
                'theme_class' => 'pearl-theme',
                'gem_img' => '/assets/image/pearl.png',
                'rank_name' => 'PEARL',
                'rank_sub' => 'REGIONAL LEADERS',
                'is_diamond_layout' => false,
                'max_slots' => 4,
                'leaders' => $fillSlots($tierMembers['pearl'], 4),
            ],
        ];

        $proofs = [
            'receipts' => [
                ['title' => 'Bulk Customs Clearance Batch #A-489', 'img' => '/assets/image/product-received/1.jpg', 'date' => '2026-08'],
                ['title' => 'West Africa Central Hub Inflow', 'img' => '/assets/image/product-received/2.jpg', 'date' => '2026-07'],
                ['title' => 'Pacific Hub Port Moresby Dispatch', 'img' => '/assets/image/product-received/3.jpg', 'date' => '2026-06'],
                ['title' => 'Philippines Central Warehouse Release', 'img' => '/assets/image/product-received/4.jpg', 'date' => '2026-05'],
            ],
            'logistics' => [
                ['title' => 'DHL Global Express Air Freight', 'img' => '/assets/image/product-received/5.jpg', 'desc' => 'Door-to-door insured air shipments.'],
                ['title' => 'Direct Port Container Cargo', 'img' => '/assets/image/product-received/6.jpg', 'desc' => 'Climate-controlled supply chain transport.'],
            ],
            'certifications' => [
                ['title' => 'Australian Organic Farming Certificate', 'code' => 'ACO-4192', 'img' => '/assets/image/logoAnzcham.png'],
                ['title' => 'Halal Certified Quality Assurance', 'code' => 'HALAL-GLOBAL', 'img' => '/assets/image/logoHadsap.png'],
                ['title' => 'FDA Philippines / DOH Accreditation', 'code' => 'FDA-CPR', 'img' => '/assets/image/logoCCIP.png'],
                ['title' => 'ECCP European Chamber Partner', 'code' => 'ECCP-EU', 'img' => '/assets/image/logoECCP.png'],
            ],
            'gallery' => [
                '/assets/image/gallery/1.jpg',
                '/assets/image/gallery/2.jpg',
                '/assets/image/gallery/3.jpg',
                '/assets/image/gallery/4.jpg',
            ]
        ];

        return Inertia::render('Info', [
            'executiveTiers' => $executiveTiers,
            'proofs' => $proofs,
        ]);
    }
}
