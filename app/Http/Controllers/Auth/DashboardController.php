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

    public function socialLinksUpdate(Request $request)
    {
        $socialLink = SocialLink::first();

        $validatedData = $request->validate([
            'facebook' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'instagram' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'twitter' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'youtube' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'linkedin' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
        ]);


        $socialLink->update($validatedData);

        return redirect()->route('dashboard.socialLinks')->with('success', 'Category updated successfully');
    }
}
