<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public static function getCartItems()
    {
        if (Auth::check()) {
            return self::with('product')
                ->where('user_id', Auth::id())
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'image' => $item->product->image,
                        'quantity' => $item->quantity,
                    ];
                });
        } else {
            return collect(session()->get('cart', []))->values();
        }
    }
}