<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!Setting::where('id', 1)->exists()) {
            Setting::create([
                'business_name' => 'ABC Retail',
                'email' => 'info@abc-retail.ae',
            ]);
        }
    }
}
