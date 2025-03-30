<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $totalCategories = Category::count();
        $totalProducts = Product::count();
        $totalOrder = Order::count();
        $orders = Order::getOrders();

        return Inertia::render('dashboard/index', [
            'totalCategories' => $totalCategories,
            'totalProducts' => $totalProducts,
            'totalOrder' => $totalOrder,
            'orders' => $orders,
        ]);
    }

    public function categories()
    {
        return Inertia::render('dashboard/categories');
    }

    public function products()
    {
        return Inertia::render('dashboard/products');
    }

    public function orders()
    {
        return Inertia::render('dashboard/orders');
    }

    public function testimonials()
    {
        return Inertia::render('dashboard/testimonials');
    }

    public function seo()
    {
        return Inertia::render('dashboard/seo');
    }

    public function socialLinks()
    {
        return Inertia::render('dashboard/social-links');
    }
}
