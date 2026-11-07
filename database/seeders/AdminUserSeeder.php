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
                'name' => 'System Administrator',
                'email' => 'admin@infinite-limitless.com',
                'password' => Hash::make('Infinite#1230'),
                'role' => 'Super Admin',
                'status' => 'Active',
                'last_login' => now(),
                'last_ip' => '127.0.0.1',
                'last_device' => 'Desktop PC (Windows)',
            ]
        );

        AdminUser::updateOrCreate(
            ['username' => 'infinite_admin'],
            [
                'name' => 'Infinite Executive Admin',
                'email' => 'infinitelimitless123@gmail.com',
                'password' => Hash::make('Infinite#1230'),
                'role' => 'Super Admin',
                'status' => 'Active',
                'last_login' => now(),
                'last_ip' => '127.0.0.1',
                'last_device' => 'Desktop PC (Windows)',
            ]
        );
    }
}
