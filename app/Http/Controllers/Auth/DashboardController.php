<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\SocialLink;
use App\Models\Testimonial;
use Illuminate\Http\Request;

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
        $categories = Category::all();

        return Inertia::render('dashboard/categories/index', [
            'categories' => $categories
        ]);
    }

    public function addCategory()
    {
        return Inertia::render('dashboard/categories/add');
    }

    public function editCategory(Request $request)
    {
        return Inertia::render('dashboard/categories/edit');
    }

    public function products()
    {
        $products = Product::with(['category'])->get();

        return Inertia::render('dashboard/products', [
            'products' => $products
        ]);
    }

    public function orders()
    {
        return Inertia::render('dashboard/orders');
    }

    public function testimonials()
    {
        $testimonials = Testimonial::all();

        return Inertia::render('dashboard/testimonials', [
            'testimonials' => $testimonials
        ]);
    }

    public function seo()
    {
        return Inertia::render('dashboard/seo');
    }

    public function socialLinks()
    {
        $socialLink = SocialLink::first();

        return Inertia::render('dashboard/social-links', [
            'socialLink' => $socialLink
        ]);
    }
}
