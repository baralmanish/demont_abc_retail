<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Models\Product;
use App\Mail\ContactMail;

class HomeController extends Controller
{
    public function home()
    {
        $products = Product::where('status', 'active')->latest()->take(8)->get();

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

    public function sendContact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email',
            'subject' => 'required|string|max:100',
            'message' => 'required|string|max:500',
        ]);

        // Send an email or store the message in the database
        Mail::to('info@abc-retail.ae')->send(new ContactMail($request->all()));

        return back()->with('success', 'Your message has been sent successfully.');

    }

    public function product()
    {
        $products = Product::where('status', 'active')->latest()->get();
        return Inertia::render('frontend/product', [
            'products' => $products,
        ]);
    }
}
