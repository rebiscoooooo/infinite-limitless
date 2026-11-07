<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorldPlanRequest;
use App\Mail\WorldPlanReceivedAdminMail;
use App\Mail\WorldPlanReceivedConfirmationMail;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationController extends Controller
{
    /**
     * Display the dedicated World Plan registration module (/registration).
     */
    public function index(): Response
    {
        $packageOptions = [
            [
                'id' => 'exec-diamond',
                'name' => 'Diamond Executive Global Plan',
                'price' => '$5,000 USD / CFA 2,800,000 / ₱268,888',
                'tier' => 'Diamond',
                'badge' => '/assets/image/badge/diamond.png',
                'popular' => false,
                'rebate' => '19%',
                'highlights' => ['VIP Diamond Council Status', 'Maximum Weekly Income Cap', 'Complete O\'Lamour Luxury Line', 'Top Rebate Tier (19%)'],
            ],
            [
                'id' => 'exec-sapphire',
                'name' => 'Sapphire Executive Global Plan',
                'price' => '$3,400 USD / CFA 1,850,000 / ₱178,888',
                'tier' => 'Sapphire',
                'badge' => '/assets/image/badge/sapphire.png',
                'popular' => false,
                'rebate' => '15%',
                'highlights' => ['Senior Executive Status', 'High Volume Product Allotment', 'Advanced Leadership Overrides', 'Team Rebates (15%)'],
            ],
            [
                'id' => 'exec-ruby',
                'name' => 'Ruby Executive Global Plan',
                'price' => '$1,750 USD / CFA 750,000 / ₱72,888',
                'tier' => 'Ruby',
                'badge' => '/assets/image/badge/ruby.png',
                'popular' => true,
                'rebate' => '11%',
                'highlights' => ['Most Recommended for International Leaders', 'Balanced Inventory & Retail Margin', 'Team Rebates (11%)', 'Rapid Breakeven ROI'],
            ],
            [
                'id' => 'exec-pearl',
                'name' => 'Pearl Executive Global Plan',
                'price' => '$680 USD / CFA 295,000 / ₱28,888',
                'tier' => 'Pearl',
                'badge' => '/assets/image/badge/pearl.png',
                'popular' => false,
                'rebate' => '7%',
                'highlights' => ['Pro Starter Inclusions', 'Team Rebates (7%)', 'Global Backoffice Access'],
            ],
            [
                'id' => 'exec-emerald',
                'name' => 'Emerald Executive Global Plan',
                'price' => '$350 USD / CFA 156,000 / ₱14,888',
                'tier' => 'Emerald',
                'badge' => '/assets/image/badge/emerald.png',
                'popular' => false,
                'rebate' => '3%',
                'highlights' => ['Entry Executive Membership', 'Team Rebates (3%)', 'Full Digital Tools'],
            ],
            [
                'id' => 'reg-starter',
                'name' => 'Regular Wholesale Plan',
                'price' => '$250 USD / CFA 110,000 / ₱9,888',
                'tier' => 'Regular',
                'badge' => '/assets/image/badge/emerald.png',
                'popular' => false,
                'rebate' => 'Standard',
                'highlights' => ['Standard Lifetime Membership', 'Core Retail Margins', 'Direct Referral Commission'],
            ],
        ];

        $productSets = [
            'Set A - Complete O\'Lamour Luxury Skincare + Infinite Barley Pack',
            'Set B - Infinite Barley Supreme Organic Health & Wellness Pack',
            'Set C - Robustus Alkaline Coffee + White Plus Glutathione Defense Pack',
            'Set D - All-Product International Assortment (Skincare, Barley & Coffee)',
        ];

        $countries = [
            ['code' => 'PH', 'name' => 'Philippines (₱ PHP)'],
            ['code' => 'AE', 'name' => 'United Arab Emirates (AED)'],
            ['code' => 'PG', 'name' => 'Papua New Guinea (K PGK)'],
            ['code' => 'NG', 'name' => 'Nigeria (₦ NGN)'],
            ['code' => 'GH', 'name' => 'Ghana (₵ GHS)'],
            ['code' => 'KE', 'name' => 'Kenya (KSh KES)'],
            ['code' => 'ZA', 'name' => 'South Africa (R ZAR)'],
            ['code' => 'TG', 'name' => 'Togo (CFA)'],
            ['code' => 'CI', 'name' => 'Côte d\'Ivoire (CFA)'],
            ['code' => 'CM', 'name' => 'Cameroon (CFA)'],
            ['code' => 'BF', 'name' => 'Burkina Faso (CFA)'],
            ['code' => 'UG', 'name' => 'Uganda (USh UGX)'],
            ['code' => 'CD', 'name' => 'Democratic Republic of Congo (USD $)'],
            ['code' => 'US', 'name' => 'United States (USD $)'],
            ['code' => 'CA', 'name' => 'Canada (CAD $)'],
            ['code' => 'GB', 'name' => 'United Kingdom (GBP £)'],
            ['code' => 'OTHER', 'name' => 'Other International Destination'],
        ];

        $paymentMethods = [
            'Bank Deposit / Wire Transfer',
            'Wise (Multi-Currency Transfer)',
            'Telegraphic Transfer (TT)',
            'Credit / Debit Card (Online Gateway)',
            'Authorized Country Stockist / Dealer',
            'GCash / Maya (Philippines only)',
        ];

        return Inertia::render('Registration', [
            'packageOptions' => $packageOptions,
            'productSets' => $productSets,
            'countries' => $countries,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Store new registration submitted from /registration or /register-world-plan.
     */
    public function store(StoreWorldPlanRequest $request): JsonResponse|RedirectResponse
    {
        $proofPath = '';
        if ($request->hasFile('paymentProof')) {
            $file = $request->file('paymentProof');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
            
            // Store directly in storage/app/public/payment_proofs
            $file->storeAs('payment_proofs', $fileName, 'public');
            $proofPath = $fileName;
        }

        // Generate a secure unique edit token for the registrant
        $editToken = Str::random(40);

        $registration = WorldPlanRegistration::create([
            'username' => $request->validated('username'),
            'email' => $request->validated('email'),
            'first_name' => $request->validated('firstName'),
            'middle_name' => $request->validated('middleName'),
            'last_name' => $request->validated('lastName'),
            'birthdate' => $request->validated('birthdate'),
            'contact_no' => $request->validated('contact'),
            'address' => $request->validated('address'),
            'country' => $request->validated('country') ?? 'Philippines',
            'sponsor' => $request->validated('sponsor'),
            'package_type' => $request->validated('packageType'),
            'product_set' => $request->validated('productSet'),
            'payment_method' => $request->validated('paymentMethod'),
            'amount_paid' => $request->validated('amountPaid'),
            'payment_date' => $request->validated('paymentDate'),
            'payment_proof' => $proofPath,
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
            'agreed_terms_at' => now(),
            'edit_token' => $editToken,
        ]);

        // Send confirmation email to applicant and notification to administrator
        try {
            $adminEmail = config('mail.admin_address', env('ADMIN_EMAIL', 'infinitelimitless123@gmail.com'));
            Mail::to($adminEmail)->queue(new WorldPlanReceivedAdminMail($registration));
            Mail::to($registration->email)->queue(new WorldPlanReceivedConfirmationMail($registration, isUpdate: false));
        } catch (\Throwable $e) {
            Log::error("Failed to send registration emails for #{$registration->id}: " . $e->getMessage());
            report($e);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Your World Plan registration has been submitted successfully and is pending administrator review.',
                'registration_id' => $registration->id,
                'edit_url' => $registration->edit_url,
            ]);
        }

        return back()->with('success', 'Your World Plan registration has been submitted successfully! Please check your email for your confirmation details and edit link.');
    }

    /**
     * Show registration edit form for applicant using secure token.
     */
    public function edit(string $token): Response|RedirectResponse
    {
        $registration = WorldPlanRegistration::where('edit_token', $token)->first();

        if (!$registration) {
            return redirect()->route('registration')->with('error', 'Invalid or expired registration edit link.');
        }

        $packageOptions = [
            'Diamond Executive Global Plan',
            'Sapphire Executive Global Plan',
            'Ruby Executive Global Plan',
            'Pearl Executive Global Plan',
            'Emerald Executive Global Plan',
            'Regular Wholesale Plan',
        ];

        $productSets = [
            'Set A - Complete O\'Lamour Luxury Skincare + Infinite Barley Pack',
            'Set B - Infinite Barley Supreme Organic Health & Wellness Pack',
            'Set C - Robustus Alkaline Coffee + White Plus Glutathione Defense Pack',
            'Set D - All-Product International Assortment (Skincare, Barley & Coffee)',
        ];

        $paymentMethods = [
            'Bank Deposit / Wire Transfer',
            'Wise (Multi-Currency Transfer)',
            'Telegraphic Transfer (TT)',
            'Credit / Debit Card (Online Gateway)',
            'Authorized Country Stockist / Dealer',
            'GCash / Maya (Philippines only)',
        ];

        return Inertia::render('RegistrationEdit', [
            'registration' => $registration,
            'packageOptions' => $packageOptions,
            'productSets' => $productSets,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Update pending registration using secure token.
     */
    public function update(Request $request, string $token): RedirectResponse|JsonResponse
    {
        $registration = WorldPlanRegistration::where('edit_token', $token)->first();

        if (!$registration) {
            return redirect()->route('registration')->with('error', 'Registration record not found or link has expired.');
        }

        if ($registration->status !== 'Pending') {
            return redirect()->route('registration')->with('error', "This registration has already been {$registration->status} and cannot be modified.");
        }

        $validated = $request->validate([
            'firstName' => ['required', 'string', 'max:100'],
            'middleName' => ['nullable', 'string', 'max:100'],
            'lastName' => ['required', 'string', 'max:100'],
            'birthdate' => ['required', 'date'],
            'contact' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string', 'max:1000'],
            'country' => ['nullable', 'string', 'max:100'],
            'sponsor' => ['nullable', 'string', 'max:100'],
            'packageType' => ['required', 'string', 'max:100'],
            'productSet' => ['nullable', 'string', 'max:255'],
            'paymentMethod' => ['nullable', 'string', 'max:100'],
            'amountPaid' => ['nullable', 'string', 'max:100'],
            'paymentDate' => ['required', 'date'],
            'paymentProof' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:10240'],
        ]);

        $updateData = [
            'first_name' => $validated['firstName'],
            'middle_name' => $validated['middleName'] ?? null,
            'last_name' => $validated['lastName'],
            'birthdate' => $validated['birthdate'],
            'contact_no' => $validated['contact'],
            'address' => $validated['address'],
            'country' => $validated['country'] ?? $registration->country,
            'sponsor' => $validated['sponsor'] ?? $registration->sponsor,
            'package_type' => $validated['packageType'],
            'product_set' => $validated['productSet'] ?? $registration->product_set,
            'payment_method' => $validated['paymentMethod'] ?? $registration->payment_method,
            'amount_paid' => $validated['amountPaid'] ?? $registration->amount_paid,
            'payment_date' => $validated['paymentDate'],
        ];

        if ($request->hasFile('paymentProof')) {
            $file = $request->file('paymentProof');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
            $file->storeAs('payment_proofs', $fileName, 'public');
            $updateData['payment_proof'] = $fileName;
        }

        $registration->update($updateData);

        // Send revised confirmation email
        try {
            Mail::to($registration->email)->queue(new WorldPlanReceivedConfirmationMail($registration, isUpdate: true));
        } catch (\Throwable $e) {
            Log::error("Failed to re-send confirmation mail on update for #{$registration->id}: " . $e->getMessage());
        }

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Your registration details have been updated successfully!',
            ]);
        }

        return back()->with('success', 'Your registration details have been updated successfully! An updated confirmation has been sent to your email.');
    }

    /**
     * Display the join community page by country.
     */
    public function showCommunity(Request $request, string $country = 'ph'): Response
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
