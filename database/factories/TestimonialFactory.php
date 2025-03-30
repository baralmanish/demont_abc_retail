<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'image' => 'https://via.placeholder.com/150', // Placeholder image
            'review' => $this->faker->paragraph(),
            'rating' => $this->faker->numberBetween(1, 5),
            'order' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
