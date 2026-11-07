<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

echo "--- CLEANING MYSQL DATABASE ---" . PHP_EOL;
DB::statement('SET FOREIGN_KEY_CHECKS = 0');
$tablesToEmpty = [
    'activity_logs',
    'admin_logs',
    'inquiries',
    'world_plan_registrations',
    'members_registration',
    'messages',
];

foreach ($tablesToEmpty as $table) {
    if (Schema::hasTable($table)) {
        DB::table($table)->truncate();
        echo "Truncated MySQL table: {$table} (Rows: " . DB::table($table)->count() . ")" . PHP_EOL;
    }
}
DB::statement('SET FOREIGN_KEY_CHECKS = 1');

echo PHP_EOL . "--- CLEANING SQLITE DATABASE (IF EXISTS) ---" . PHP_EOL;
$sqlitePath = database_path('database.sqlite');
if (file_exists($sqlitePath)) {
    $sqlitePdo = new PDO('sqlite:' . $sqlitePath);
    foreach ($tablesToEmpty as $table) {
        try {
            $sqlitePdo->exec("DELETE FROM {$table};");
            $sqlitePdo->exec("DELETE FROM sqlite_sequence WHERE name='{$table}';");
            echo "Truncated SQLite table: {$table}" . PHP_EOL;
        } catch (Exception $e) {
            // Table might not exist in sqlite, skip
        }
    }
}

echo PHP_EOL . "--- VERIFYING FINAL COUNTS IN MYSQL ---" . PHP_EOL;
echo "Admin Users: " . DB::table('admin_users')->count() . " (admin & infinite_admin)" . PHP_EOL;
echo "Products: " . DB::table('products')->count() . " (18 original authentic products)" . PHP_EOL;
echo "Site Stats: " . DB::table('site_stats')->count() . PHP_EOL;
echo "Product Stats: " . DB::table('product_stats')->count() . PHP_EOL;
echo "Inquiries: " . DB::table('inquiries')->count() . " (CLEAN)" . PHP_EOL;
echo "World Plan Registrations: " . DB::table('world_plan_registrations')->count() . " (CLEAN)" . PHP_EOL;
echo "Activity Logs: " . DB::table('activity_logs')->count() . " (CLEAN)" . PHP_EOL;

