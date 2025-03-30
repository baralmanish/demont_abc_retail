<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SocialLink;

class SocialLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!SocialLink::where('id', 1)->exists()) {
            SocialLink::create([
                'facebook' => 'https://www.facebook.com/abc-retail',
                'instagram' => '',
                'twitter' => '',
                'youtube' => '',
                'linkedin' => '',
            ]);
        }
    }
}
