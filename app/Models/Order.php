<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function getTotalPriceFormattedAttribute()
    {
        return 'AED ' . number_format($this->total_price, 2);
    }

    public static function getOrders()
    {
        if (Auth::user()->role === 'ADMIN') {
            return self::with('user', 'orderItems')
            ->get(['id', 'user_id', 'total_price', 'status', 'created_at'])
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_date' => $order->created_at->format('Y-m-d H:i:s'),
                    'user_id' => $order->user_id,
                    'ordered_by' => $order->user->name ?? 'Unknown User',
                    'quantity' => $order->orderItems->sum('quantity'),
                    'total_price' => $order->total_price_formatted,
                    'status' => $order->status,
                ];
            });
        } else {
            return self::with('orderItems')
            ->where('user_id', Auth::id())
            ->get(['id', 'total_price', 'status', 'created_at'])
            ->map(function ($order) {
                return [
                    'order_date' => $order->created_at->format('Y-m-d H:i:s'),
                    'quantity' => $order->orderItems->sum('quantity'),
                    'total_price' => $order->total_price_formatted,
                    'status' => $order->status,
                ];
            });
        }
    }
}
