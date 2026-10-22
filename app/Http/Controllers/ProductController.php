<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Show Infinite Wellness (Barley, Robustus, White Plus Gluta).
     */
    public function barley(): Response
    {
        $variations = [
            [
                'product_title' => 'INFINITE ROBUSTUS',
                'sub_label' => 'BLENDED WITH STEVIA LEAVES',
                'sub_title' => 'BLACK COFFEE WITH PURE ORGANIC BARLEY',
                'bg_color' => '#2f1b02',
                'accent_color' => '#d97706',
                'main_image' => '/assets/image/blackco.png',
                'description' => 'Experience the bold taste of pure Robusta beans blended with our signature organic barley. This is a guilt-free wellness ritual designed for sustained physical energy and razor-sharp mental clarity without jitters or sugar crashes.',
                'jobs' => [
                    ['title' => 'Job 1: Zero Sugar Spike', 'text' => 'Sweetened strictly with Stevia leaves. It provides a rich, smooth flavor profile without triggering an insulin response, making it diabetic-friendly.'],
                    ['title' => 'Job 2: Fat Burning Catalyst', 'text' => 'Premium Robusta beans contain significantly higher levels of Chlorogenic Acid than Arabica, scientifically proven to boost resting metabolic rate and accelerate lipid oxidation.'],
                    ['title' => 'Job 3: Alkaline Acid Buffer', 'text' => 'The addition of alkaline Organic Barley neutralizes the high gastric acidity typical of roasted coffee, making it gentle on the stomach lining and preventing acid reflux.']
                ],
                'replaces' => 'High-Sugar Cafe Drinks + Synthetic Pre-Workouts + Acidic Instant Coffees'
            ],
            [
                'product_title' => 'INFINITE BARLEY',
                'sub_label' => '100% ORGANIC & HALAL CERTIFIED',
                'sub_title' => 'PURE ORGANIC BARLEY POWDER FROM AUSTRALIA',
                'bg_color' => '#2d4a22',
                'accent_color' => '#14b8a6',
                'main_image' => '/assets/image/Ley.png',
                'description' => 'A powerhouse daily superfood packed with 70+ organic trace minerals, vital chemical precursors, chlorophyll, and live structural enzymes harvested directly from pristine certified Australian farmland.',
                'jobs' => [
                    ['title' => 'Job 1: Cellular Anti-Aging', 'text' => 'Contains Superoxide Dismutase (S.O.D.), a critical primary enzyme that dismantles toxic reactive oxygen species (ROS) and free radicals, slowing down cellular breakdown.'],
                    ['title' => 'Job 2: Deep Blood Purifier', 'text' => 'Rich in bio-available natural Chlorophyll which acts as an internal cleanser, binding heavy metals and metabolic waste from the hepatic portal and bloodstream.'],
                    ['title' => 'Job 3: Gut Health & Weight Control', 'text' => 'High in soluble beta-glucan fiber to feed beneficial gut microbiota, normalize bowel motility, and balance lipid profiles.']
                ],
                'replaces' => 'Synthetic Multivitamins + Fiber Supplements + Detox Teas'
            ],
            [
                'product_title' => 'WHITE PLUS GLUTATHIONE',
                'sub_label' => 'NO APPROVED THERAPEUTIC CLAIMS',
                'sub_title' => 'ADVANCED FORMULA WITH NAC, VIT C, COLLAGEN & ALA (30 CAPSULES)',
                'bg_color' => '#1E3A5F',
                'accent_color' => '#38bdf8',
                'main_image' => '/assets/image/Plus.png',
                'description' => 'A clinical-grade cellular protector. Far beyond surface beauty, master antioxidant glutathione shields mitochondrial DNA, neutralizes neuro-inflammation, and optimizes hepatic phase II detoxification.',
                'jobs' => [
                    ['title' => 'Job 1: Liver & Toxin Defense', 'text' => 'Uses N-Acetyl Cysteine (NAC), the rate-limiting amino acid precursor that empowers hepatocytes to synthesize abundant intracellular glutathione natively.'],
                    ['title' => 'Job 2: Sleep & Nervous System Support', 'text' => 'By neutralizing neuro-inflammation and regulating glutamate signaling in the brain via NAC, it calms the central nervous system for restorative sleep.'],
                    ['title' => 'Job 3: Total Skin Transformation', 'text' => 'Buffered Vitamin C, Hydrolyzed Marine Collagen, and Alpha Lipoic Acid (ALA) recycle oxidized glutathione back into its active form for luminous skin tone.']
                ],
                'replaces' => 'Basic Gluta Pills + OTC Sleep Aids + Standalone Collagen'
            ]
        ];

        $bioActiveIngredients = [
            [
                'name' => 'Superoxide Dismutase (S.O.D.)',
                'source' => 'Australian Organic Barley',
                'description' => 'The body\'s primary frontline antioxidant enzyme that neutralizes billions of superoxide free radicals per second before cellular damage begins.',
                'icon' => 'ShieldCheck'
            ],
            [
                'name' => 'Chlorogenic Acid (CGA)',
                'source' => 'High-Altitude Robusta Beans',
                'description' => 'Powerful polyphenol that slows glucose absorption in the gut and stimulates AMPK pathways for resting fat metabolism.',
                'icon' => 'Flame'
            ],
            [
                'name' => 'N-Acetyl Cysteine (NAC)',
                'source' => 'White Plus Bio-Complex',
                'description' => 'Direct biochemical precursor to hepatic glutathione synthesis; essential for pulmonary health, brain glutamate balance, and detox.',
                'icon' => 'HeartPulse'
            ],
            [
                'name' => 'Alpha Lipoic Acid (ALA)',
                'source' => 'White Plus Bio-Complex',
                'description' => 'Universal fat- and water-soluble antioxidant that enters all cell compartments and recycles vitamins C and E.',
                'icon' => 'Sparkles'
            ]
        ];

        $barleyCategories = [
            [
                'title' => 'Cardiovascular & Blood',
                'color' => '#ef4444',
                'bg' => 'rgba(239, 68, 68, 0.1)',
                'items' => ['Anemia', 'Blood Pressure', 'Cholesterol', 'High Blood', 'Hypertension', 'Leukemia', 'Stroke']
            ],
            [
                'title' => 'Reproductive & Hormonal',
                'color' => '#ec4899',
                'bg' => 'rgba(236, 72, 153, 0.1)',
                'items' => ['Breast Health', 'Cervical Health', 'Dysmenorrhea', 'Endometriosis', 'Hormonal Imbalance', 'Infertility Support', 'Irregular Menstruation', 'Low Sperm Count', 'Myoma Support', 'Prostate Care']
            ],
            [
                'title' => 'Digestive & Internal Organs',
                'color' => '#f59e0b',
                'bg' => 'rgba(245, 158, 11, 0.1)',
                'items' => ['Constipation', 'Detoxification', 'Diabetes Care', 'Gallbladder Care', 'Goiter', 'Hepatitis Recovery', 'Hyperacidity', 'Kidney Support', 'Liver Rejuvenation', 'Thyroid Balance', 'Ulcers']
            ],
            [
                'title' => 'Immunity, Pain & Longevity',
                'color' => '#14b8a6',
                'bg' => 'rgba(20, 184, 166, 0.1)',
                'items' => ['Arthritis', 'Asthma', 'Bronchitis', 'Cellular Defense', 'Cataract Support', 'Gout', 'Immune Deficiency', 'Insomnia', 'Mental Fatigue', 'Migraine', 'Muscle & Nerve Recovery', 'Psoriasis / Skin Conditions', 'Anti-Aging']
            ]
        ];

        return Inertia::render('Barley', [
            'variations' => $variations,
            'bioActiveIngredients' => $bioActiveIngredients,
            'barleyCategories' => $barleyCategories,
        ]);
    }

    /**
     * Show O'Lamour Skincare showcase.
     */
    public function olamour(): Response
    {
        $products = [
            [
                'id' => 'facial-essence',
                'name' => 'O\'Lamour Cellular Renewal Facial Essence',
                'category' => 'Treatment Essence',
                'volume' => '120ml / 4.0 fl. oz.',
                'tagline' => 'Deep Dermal Hydration & Barrier Preparation',
                'image' => '/assets/image/product1.png',
                'description' => 'Infused with Galactomyces ferment filtrate, high-potency hyaluronic acid complexes, and marine peptides to quench micro-dehydration, refine pore texture, and optimize downstream serum absorption.',
                'keyBenefits' => ['Immediate +84% moisture surge', 'Refines uneven texture and pores', 'Preps skin mantle for active serums'],
            ],
            [
                'id' => 'quintessence-ampoule',
                'name' => 'O\'Lamour Quintessence Radiance Ampoule',
                'category' => 'Concentrated Serum',
                'volume' => '50ml / 1.7 fl. oz.',
                'tagline' => 'Advanced Melanogenesis Inhibitor & Brightener',
                'image' => '/assets/image/product2.png',
                'description' => 'Clinical-strength Niacinamide, encapsulated Tranexamic acid, and Glutathione microspheres target stubborn hyperpigmentation, melasma, and post-inflammatory acne marks.',
                'keyBenefits' => ['Fades stubborn dark spots in 14 days', 'Inhibits melanin transfer by 67%', 'Imparts a glass-skin translucent glow'],
            ],
            [
                'id' => 'corelacreme',
                'name' => 'O\'Lamour CoreLaCrème Intensive Barrier Recovery',
                'category' => 'Repair Cream',
                'volume' => '50g / 1.76 oz.',
                'tagline' => 'Multi-Ceramide Complex & Lipid Restorer',
                'image' => '/assets/image/product3.png',
                'description' => 'Formulated with Ceramides 1, 3, 6-II, Centella Asiatica, and botanical squalane to seal compromised skin barriers, eliminate redness, and shield against harsh environmental stressors.',
                'keyBenefits' => ['Rebuilds compromised lipid mantle', 'Soothes reactive skin & erythema', 'Non-comedogenic, velvet matte finish'],
            ],
            [
                'id' => 'bb-cream',
                'name' => 'O\'Lamour PrimeRenew BB Cream Broad Spectrum SPF 50+',
                'category' => 'Sun Shield & Tint',
                'volume' => '40ml / 1.35 fl. oz.',
                'tagline' => 'Skin-Adapting Coverage + UVA/UVB/Blue Light Defense',
                'image' => '/assets/image/product4.png',
                'description' => 'Combines broad-spectrum mineral UV filters with adaptogenic color pigments that seamlessly match diverse skin tones from fair to deep without ashy white casts.',
                'keyBenefits' => ['SPF 50+ PA++++ multi-ray defense', 'Self-adjusting tone adapt technology', 'Weightless anti-pollution shield'],
            ]
        ];

        return Inertia::render('Olamour', [
            'products' => $products,
        ]);
    }
}
