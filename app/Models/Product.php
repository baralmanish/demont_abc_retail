<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'status',
        'category_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $appends = ['price_formatted'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cartItems()
    {
        return $this->hasMany(Cart::class);
    }

    public function getPriceFormattedAttribute()
    {
        return 'AED ' . number_format($this->price, 2);
    }
}
