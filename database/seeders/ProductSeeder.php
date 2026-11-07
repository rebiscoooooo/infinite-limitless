<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Seeds ONLY the 18 original products with the 3 original categories:
     * - Skincare (skincare)
     * - Wellness (wellness)
     * - O'Lamour (o'lamour)
     */
    public function run(): void
    {
        $products = [
            // ==========================================
            // SKINCARE (10 Original Products)
            // ==========================================
            [
                'name' => 'Infinite Botox Serum',
                'slug' => 'infinite-botox-serum',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract.',
                'description' => 'INFINITE BOTOX Serum, a high-performance blend of Niacinamide, Aloe Vera, Tea Tree Extract, Glutathione, Snail Extract, and Sakura Extract. This unique formula mimics Botox effects without the needles, smoothing fine lines, wrinkles, and blemishes while deeply hydrating your skin. Perfect for a non-invasive, age- defying solution, it delivers a youthful, radiant glow with every use.',
                'image' => '/assets/image/product/INFINITE_BOTOX_SERUM.png',
                'display_order' => 1,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'INFINITE Brightening Serum',
                'slug' => 'infinite-brightening-serum',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract.',
                'description' => 'Achieve brighter, clearer skin with INFINITE BRIGHTENING Serum, featuring Rose Water, Niacinamide, Vitamin C, and Tea Tree Extract. This lightweight, glow-boosting formula hydrates, evens out skin tone, and combats blemishes, leaving your complexion refreshed and radiant. Say goodbye to dullness and hello to a youthful, luminous glow.',
                'image' => '/assets/image/product/INFINITE_Brightening_Serum.png',
                'display_order' => 2,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'INFINITE White Body Lotion',
                'slug' => 'infinite-white-body-lotion',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin.',
                'description' => 'Achieve a luminous, even complexion with INFINITE WHITE Body Lotion, a luxurious formula designed to brighten and perfect your skin. Infused with AHA, Vitamin C, and Niacinamide, it fades dark spots, hyperpigmentation, and discoloration while promoting a radiant glow. This advanced lotion leaves your skin smoother, brighter, and more youthful, delivering visible results with every use.',
                'image' => '/assets/image/product/INFINITE_White_Body_Lotion.png',
                'display_order' => 3,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'INFINITE Glow-Up Soap',
                'slug' => 'infinite-glow-up-soap',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide.',
                'description' => 'Unveil your skin’s natural glow with INFINITE GLOW UP Soap, enriched with Kojic Acid, Arbutin, and Niacinamide. This powerful trio works together to brighten, even out your skin tone, and reduce dark spots and pigmentation. Perfect for tackling uneven skin tone and hyperpigmentation, it leaves your skin smoother, clearer, and radiant.',
                'image' => '/assets/image/product/INFINITE_Glow_Up_Soap.png',
                'display_order' => 4,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'INFINITE Deowhite Soap',
                'slug' => 'infinite-deowhite-soap',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint.',
                'description' => 'Experience the refreshing power of INFINITE DEOWHITE Soap, featuring Tea Tree Oil, Niacinamide, and Peppermint. This all-natural soap cleanses, fights odor, and cools the skin, leaving you feeling fresh and invigorated. Ideal for daily use, it combines antibacterial properties, soothing benefits, and a refreshing sensation to keep you energized all day.',
                'image' => '/assets/image/product/INFINITE_Deowhite_Soap.png',
                'display_order' => 5,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'Vida Lotus Soothing Toner',
                'slug' => 'vida-lotus-soothing-toner',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Vida Skin Lotus Soothing Toner rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin.',
                'description' => 'Rejuvenates and restores hydration for tired skin creating refreshed and vibrant skin texture with its powerful moisturizing effect.',
                'image' => '/assets/image/product/Vida_Lotus_Soothing_Toner.png',
                'display_order' => 6,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'Vida Tone-Up Sun Serum',
                'slug' => 'vida-tone-up-sun-serum',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients.',
                'description' => 'Vida Skin Tone-Up Sun Serum provides lightweight, hydrating sun protection with natural mineral powders and brightening ingredients like niacinamide and glutathione. This serum helps even skin tone while delivering a radiant, glowing finish-perfect for daily wear.',
                'image' => '/assets/image/product/Vida_Tone_Up_Sun Serum.png',
                'display_order' => 7,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'Vida Doux Cleanser',
                'slug' => 'vida-doux-cleanser',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => "Vida Skin Doux Cleanser's fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed.",
                'description' => "Vida Skin Doux Cleanser's fine bubble system removes excess sebum and other residues within the pores leaving skin feeling refreshed and comfortable, yet not drying with powerful hydrating and calming properties.",
                'image' => '/assets/image/product/Vida_Doux_Cleanser.png',
                'display_order' => 8,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'Vida Skin Lotus Booster Ampoule',
                'slug' => 'vida-skin-lotus-booster-ampoule',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => 'Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening barrier.',
                'description' => 'Vida Skin Lotus Booster Ampoule keeps the skin moisturized from the inside and softens the skin texture by strengthening the skin barrier creating a firm and healthy skin.',
                'image' => '/assets/image/product/Vida_Skin_Lotus_Booster_Ampoule.png',
                'display_order' => 9,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'Vida Skin Glow Vita Cream',
                'slug' => 'vida-skin-glow-vita-cream',
                'category' => 'skincare',
                'category_name' => 'Skincare',
                'short_description' => "Vida Skin Glow Vita Cream uses VIDA's special formula to balance healthy skin oil and moisture levels, creating healthy skin.",
                'description' => "Vida Skin Glow Vita Cream uses VIDA's special formula to balance healthy skin oil and moisture levels, creating healthy moisturized and vitalized skin conditions.",
                'image' => '/assets/image/product/Vida_Skin_Glow_Vita_Cream.png',
                'display_order' => 10,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],

            // ==========================================
            // WELLNESS (3 Original Products)
            // ==========================================
            [
                'name' => 'Barley Pure Organic Powder',
                'slug' => 'barley-pure-organic-powder',
                'category' => 'wellness',
                'category_name' => 'Wellness',
                'short_description' => 'A natural supplement made from 100% organic barley grass, rich in vitamins, minerals, and antioxidants.',
                'description' => 'A nutrient-rich superfood made from pure, organic young barley grass. Rich in antioxidants and fiber, INFINITE BARLEY supports immune health, aids digestion, promotes detoxification, and helps boost energy levels naturally.',
                'image' => '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png',
                'display_order' => 11,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'INFINITE Black Coffee with Pure Organic Barley',
                'slug' => 'infinite-black-coffee-pure-organic-barley',
                'category' => 'wellness',
                'category_name' => 'Wellness',
                'short_description' => 'INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with stevia.',
                'description' => 'INFINITE ROBUSTUS blends the bold richness of black coffee with nourishing power of pure organic barley, lightly sweetened with natural stevia for a guilt-free boost. Designed to energize between flavor and function. Enjoy a cup that satisfies your craving and elevates your daily routine.',
                'image' => '/assets/image/product/INFINITE_Black_Coffe_with_Pure_Organic_Barley_Powdered_Drink_mix.png',
                'display_order' => 12,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => 'White Plus Glutathione',
                'slug' => 'white-plus-glutathione',
                'category' => 'wellness',
                'category_name' => 'Wellness',
                'short_description' => 'Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, NAC, Vitamin C, Collagen.',
                'description' => 'Harness the power of Glutathione with INFINITE WHITE PLUS, an advanced formula featuring Glutathione, N-Acetylcysteine, Vitamin C, Collagen, and Alpha Lipoic Acid. This potent supplement detoxifies your system, neutralizes free radicals, and supports overall wellness. Boost your health and vitality with every dose for a brighter, more energized you.',
                'image' => '/assets/image/product/White_Plus_Glutathione.png',
                'display_order' => 13,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],

            // ==========================================
            // O'LAMOUR (5 Original Products)
            // ==========================================
            [
                'name' => "O'Lamour Facial Essence",
                'slug' => 'olamour-facial-essence',
                'category' => "o'lamour",
                'category_name' => "O'Lamour",
                'short_description' => 'A scientifically advanced multi-function Facial Essence designed to revitalize, and improve skin clarity.',
                'description' => 'Formulated with BIO E.G.F, it stimulates skin renewal. Hydrolyzed Collagen and Volufiline work in synergy and help to plump, firm and lift-the skin for a youthful complexion.',
                'image' => '/assets/image/product/O_LAMOUR_Facial_Essence.png',
                'display_order' => 14,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => "O'Lamour Aeterna BB Cream",
                'slug' => 'olamour-aeterna-bb-cream',
                'category' => "o'lamour",
                'category_name' => "O'Lamour",
                'short_description' => 'A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel.',
                'description' => 'A multi-functional complexion refiner designed to deliver full coverage with an exceptionally lightweight and breathable feel. Formulated with SPF 50 / PA+++ broad-spectrum protection, it shields the skin against UVA and UVB damage while preserving comfort and long-lasting wear throughtout the day.',
                'image' => '/assets/image/product/O’LAMOUR_Aeterna_BB_Cream.png',
                'display_order' => 15,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => "O'Lamour Quintessence Ampoule",
                'slug' => 'olamour-quintessence-ampoule',
                'category' => "o'lamour",
                'category_name' => "O'Lamour",
                'short_description' => 'A premium multi-function skincare innovation expertly formulated to help reduce the appearance of wrinkles and brighten skin.',
                'description' => "A premium multi-function skincare innvation expertly formulated to help reduce the apperance of wrinkles and help brighten the skin. Powered by PDRN (Polydeoxyribonu-cleo-tide) Sodium DNA, a clinically recognized bioactive compound plus 12X plant-based essential extracts, this fast-acting ampoule works at the skin's foundational level to reveal a more radiant complexion.",
                'image' => '/assets/image/product/O’LAMOUR_Quintessence_Ampoule.png',
                'display_order' => 16,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => "O'Lamour Core La Crème",
                'slug' => 'olamour-core-la-creme',
                'category' => "o'lamour",
                'category_name' => "O'Lamour",
                'short_description' => 'An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and EGF for youthful radiance.',
                'description' => 'An ultra-premium, science-driven cream powered by Centella Asiatica Leaf, Hydrolyzed Collagen, and Epidermal Growth Factor (EGF) for a youthful radiance. Infused with PDRN Sodium DNA, Niacinamide, Euphorbia Cerifera, and Chamomilla Recutita, it deeply hydrates skin tone for a smoother, brighter complexion.',
                'image' => '/assets/image/product/O’LAMOUR_CoreLaCrème.png',
                'display_order' => 17,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => false,
            ],
            [
                'name' => "O'Lamour Essence Bar",
                'slug' => 'olamour-essence-bar',
                'category' => "o'lamour",
                'category_name' => "O'Lamour",
                'short_description' => 'An exquisitely crafted cleansing bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin.',
                'description' => 'An exquisitely crafted cleansin bar soap infused with 2X AHA + BHA complex to gently cleanse and brighten the skin. Glycolic and Lactic Acids refine texture and enhance luminosity, while Salicylic Acid puurifies pores for a smoother,cleaer apperance.',
                'image' => '/assets/image/product/O’LAMOUR_Essence_Bar.png',
                'display_order' => 18,
                'is_active' => true,
                'is_featured' => true,
                'is_coming_soon' => true,
            ],
        ];

        // Sync ONLY these 18 products
        $validSlugs = array_column($products, 'slug');
        Product::whereNotIn('slug', $validSlugs)->delete();

        foreach ($products as $p) {
            Product::updateOrCreate(
                ['slug' => $p['slug']],
                $p
            );
        }
    }
}
