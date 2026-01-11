<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@lms.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
        ]);

        // Create Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@lms.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create Customer
        User::create([
            'name' => 'Customer User',
            'email' => 'customer@lms.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        // Create User
        User::create([
            'name' => 'Regular User',
            'email' => 'user@lms.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
