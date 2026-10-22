<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdminUser::updateOrCreate(
            ['username' => 'admin'],
            [
                'password' => Hash::make('Infinite#1230'),
                'last_login' => now(),
                'last_ip' => '127.0.0.1',
                'last_device' => 'Desktop PC (Windows Chrome)',
            ]
        );

        AdminUser::updateOrCreate(
            ['username' => 'infinite_admin'],
            [
                'password' => Hash::make('Infinite#1230'),
                'last_login' => now(),
                'last_ip' => '127.0.0.1',
                'last_device' => 'Desktop PC (Windows Chrome)',
            ]
        );
    }
}
