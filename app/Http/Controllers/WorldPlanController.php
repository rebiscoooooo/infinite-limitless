<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorldPlanRequest;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorldPlanController extends Controller
{
    /**
     * Display the World Plan overview and registration form.
     */
    public function index(): Response
    {
        $packageOptions = [
            [
                'id' => 'exec-diamond',
                'name' => 'Diamond Executive Global Plan',
                'price' => '$5,000 USD / CFA 2,800,000 / ₱268,888',
                'tier' => 'Diamond',
                'popular' => false,
                'highlights' => ['VIP Diamond Council Status', 'Maximum Weekly Income Cap', 'Complete O\'Lamour Luxury Line', 'Top Rebate Tier (19%)'],
            ],
            [
                'id' => 'exec-sapphire',
                'name' => 'Sapphire Executive Global Plan',
                'price' => '$3,400 USD / CFA 1,850,000 / ₱178,888',
                'tier' => 'Sapphire',
                'popular' => false,
                'highlights' => ['Senior Executive Status', 'High Volume Product Allotment', 'Advanced Leadership Overrides', 'Team Rebates (15%)'],
            ],
            [
                'id' => 'exec-ruby',
                'name' => 'Ruby Executive Global Plan',
                'price' => '$1,750 USD / CFA 750,000 / ₱72,888',
                'tier' => 'Ruby',
                'popular' => true,
                'highlights' => ['Most Recommended for International Leaders', 'Balanced Inventory & Retail Margin', 'Team Rebates (11%)', 'Rapid Breakeven ROI'],
            ],
            [
                'id' => 'exec-pearl',
                'name' => 'Pearl Executive Global Plan',
                'price' => '$680 USD / CFA 295,000 / ₱28,888',
                'tier' => 'Pearl',
                'popular' => false,
                'highlights' => ['Pro Starter Inclusions', 'Team Rebates (7%)', 'Global Backoffice Access'],
            ],
            [
                'id' => 'exec-emerald',
                'name' => 'Emerald Executive Global Plan',
                'price' => '$350 USD / CFA 156,000 / ₱14,888',
                'tier' => 'Emerald',
                'popular' => false,
                'highlights' => ['Entry Executive Membership', 'Team Rebates (3%)', 'Full Digital Tools'],
            ],
        ];

        return Inertia::render('WorldPlan', [
            'packageOptions' => $packageOptions,
        ]);
    }

    /**
     * Store new World Plan registration with uploaded payment proof.
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

        $registration = WorldPlanRegistration::create([
            'username' => $request->validated('username'),
            'email' => $request->validated('email'),
            'first_name' => $request->validated('firstName'),
            'middle_name' => $request->validated('middleName'),
            'last_name' => $request->validated('lastName'),
            'birthdate' => $request->validated('birthdate'),
            'contact_no' => $request->validated('contact'),
            'address' => $request->validated('address'),
            'package_type' => $request->validated('packageType'),
            'payment_date' => $request->validated('paymentDate'),
            'payment_proof' => $proofPath,
            'status' => 'Pending',
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Your World Plan registration has been submitted successfully and is pending administrator review.',
                'registration_id' => $registration->id,
            ]);
        }

        return redirect()->back()->with('success', 'Your World Plan registration has been submitted successfully and is pending administrator review.');
    }
}
