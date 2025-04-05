<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Models\Product;
use App\Mail\ContactMail;
use App\Models\Cart;

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

    public function productDetails(Request $request, $id)
    {
        // $request->session()->forget('cart');
        $product = Product::with('category:id,name')->findOrFail($id);
        return Inertia::render('frontend/product-details', [
            'product' => $product,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $product = Product::findOrFail($request->product_id);

        if (Auth::check()) {
            // Authenticated user
            Cart::updateOrCreate(
                ['user_id' => Auth::id(), 'product_id' => $product->id],
                ['quantity' => DB::raw("quantity + {$request->quantity}")]
            );

        } else {
            // Guest user - store in session
            $cartItem = session()->get('cart', []);

            if (isset($cartItem[$product->id])) {
                $cartItem[$product->id]['quantity'] += $request->quantity;
            } else {
                $cartItem[$product->id] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->image,
                    'quantity' => $request->quantity,
                ];
            }

            session()->put('cart', $cartItem);
        }

        return back()->with('success', 'Product added to cart.');
    }
}