<?php

namespace Tests\Feature;

use App\Models\AdminUser;
use App\Models\Product;
use App\Models\SiteStat;
use App\Models\WorldPlanRegistration;
use App\Providers\AppServiceProvider;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AutoSeederTest extends TestCase
{
    /**
     * Test that empty tables are automatically seeded without manual intervention.
     */
    public function test_auto_seeder_populates_missing_baseline_data(): void
    {
        // 1. Trigger auto-seeder
        app()->getProvider(AppServiceProvider::class)->autoSeedIfNeeded();

        // 2. Verify admin accounts exist with default credentials
        $admin = AdminUser::where('username', 'admin')->first();
        $this->assertNotNull($admin);
        $this->assertTrue(Hash::check('Infinite#1230', $admin->password));

        // 3. Verify products exist
        $this->assertGreaterThanOrEqual(18, Product::count());

        // 4. Verify stats exist
        $this->assertNotNull(SiteStat::first());

        // 5. Test on-demand auto-seed when a table is truncated
        AdminUser::truncate();
        $this->assertEquals(0, AdminUser::count());

        // Call auto-seeder again
        app()->getProvider(AppServiceProvider::class)->autoSeedIfNeeded();

        $this->assertEquals(2, AdminUser::count());
        $restoredAdmin = AdminUser::where('username', 'admin')->first();
        $this->assertNotNull($restoredAdmin);
        $this->assertTrue(Hash::check('Infinite#1230', $restoredAdmin->password));
    }
}
