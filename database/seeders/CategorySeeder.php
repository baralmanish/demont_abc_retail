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
            ['name' => 'Almonds', 'description' => 'Healthy and nutritious almonds.', 'image' => 'https://placehold.co/400'],
            ['name' => 'Biscuits', 'description' => 'Crunchy and tasty biscuits.', 'image' => 'https://placehold.co/400'],
            ['name' => 'Bread', 'description' => 'Freshly baked bread.', 'image' => 'https://placehold.co/400'],
            ['name' => 'Cheese', 'description' => 'Delicious dairy cheese.', 'image' => 'https://placehold.co/400'],
            ['name' => 'Coffee', 'description' => 'Premium quality coffee.', 'image' => 'https://placehold.co/400'],
            ['name' => 'Elaichi', 'description' => 'Aromatic cardamom spice.', 'image' => 'https://placehold.co/400'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
