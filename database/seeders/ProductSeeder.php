<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there are categories before seeding products
        if (Category::count() === 0) {
            $this->call(CategorySeeder::class);
        }

        // Create 10 sample products
        Product::factory()->count(10)->create();
    }
}
