<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller
{
    public function home()
    {
        $products = Product::latest()->take(8)->get();

        return Inertia::render('frontend/home', [
            'products' => $products,
        ]);
    }

    public function about()
    {

        return Inertia::render('frontend/about');
    }

    public function contact()
    {

        return Inertia::render('frontend/contact');
    }
}
