<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('role', 'ADMIN')->exists()) {
            User::create([
                'name' => 'ABC Retail',
                'email' => 'info@abc-retail.ae',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'), // Admin password
                'role' => 'ADMIN',
                'remember_token' => \Illuminate\Support\Str::random(10),
            ]);
        }
    }
}
