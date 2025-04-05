<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => 1,
            'total_price' => 0, // Will be updated after adding items
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled']),
            'shipping_address' => 'Fake Address',
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            $totalPrice = 0;
            $items = OrderItem::factory(fake()->numberBetween(1, 5))->create([
            'order_id' => $order->id,
            'product_id' => Product::inRandomOrder()->first()->id ?? Product::factory(),
            ]);

            foreach ($items as $item) {
                $totalPrice += $item->price * $item->quantity;
            }

            $order->update(['total_price' => $totalPrice]);
        });
    }
}