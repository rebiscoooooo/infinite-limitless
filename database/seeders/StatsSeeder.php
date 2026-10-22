<?php

namespace Database\Seeders;

use App\Models\ProductStat;
use App\Models\SiteStat;
use Illuminate\Database\Seeder;

class StatsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteStat::updateOrCreate(
            ['id' => 1],
            [
                'total_visits' => 12540,
                'active_users' => 312,
                'product_clicks' => 8432,
                'bounce_rate' => '45%',
            ]
        );

        $defaultProducts = [
            [
                'name' => "O'LAMOUR Premium Set",
                'clicks' => 3120,
                'trend_dir' => 'up',
                'trend_text' => 'High Demand',
                'status' => 'Active',
                'status_class' => 'bg-emerald-500',
            ],
            [
                'name' => 'Infinite Organic Barley',
                'clicks' => 2854,
                'trend_dir' => 'up',
                'trend_text' => 'Trending',
                'status' => 'Active',
                'status_class' => 'bg-emerald-500',
            ],
            [
                'name' => 'Vida Skin Collection',
                'clicks' => 1950,
                'trend_dir' => 'down',
                'trend_text' => 'Stabilized',
                'status' => 'Stocked',
                'status_class' => 'bg-sky-500',
            ],
            [
                'name' => 'White Plus Glutathione',
                'clicks' => 1640,
                'trend_dir' => 'up',
                'trend_text' => 'Fast Growing',
                'status' => 'Active',
                'status_class' => 'bg-emerald-500',
            ],
            [
                'name' => 'Infinite Robustus Black Coffee',
                'clicks' => 1420,
                'trend_dir' => 'up',
                'trend_text' => 'Steady Surge',
                'status' => 'Active',
                'status_class' => 'bg-emerald-500',
            ],
        ];

        foreach ($defaultProducts as $product) {
            ProductStat::updateOrCreate(
                ['name' => $product['name']],
                $product
            );
        }
    }
}
