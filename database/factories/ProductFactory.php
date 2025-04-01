<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 5, 100), // Price between 5 and 100
            'image' => 'https://placehold.co/400', // Placeholder image
            'category_id' => Category::inRandomOrder()->first()->id ?? 1, // Assign a random category
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
