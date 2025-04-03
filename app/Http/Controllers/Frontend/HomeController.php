<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $categories = Category::all();

        return Inertia::render('frontend/home', [
            'categories' => $categories,
        ]);
    }
}
