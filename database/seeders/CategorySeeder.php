<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Almonds', 'description' => 'Healthy and nutritious almonds.', 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Biscuits', 'description' => 'Crunchy and tasty biscuits.', 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Bread', 'description' => 'Freshly baked bread.', 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Cheese', 'description' => 'Delicious dairy cheese.', 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Coffee', 'description' => 'Premium quality coffee.', 'image' => 'https://via.placeholder.com/150'],
            ['name' => 'Elaichi', 'description' => 'Aromatic cardamom spice.', 'image' => 'https://via.placeholder.com/150'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
