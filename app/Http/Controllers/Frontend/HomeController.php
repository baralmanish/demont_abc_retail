<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\ContactMail;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Payment;
use App\Models\Order;
use App\Models\OrderItem;

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

    public function productDetails($id)
    {
        $product = Product::with('category:id,name')->findOrFail($id);
        return Inertia::render('frontend/product-details', [
            'product' => $product,
        ]);
    }

    public function cart()
    {
        return Inertia::render('frontend/cart');
    }

    public function checkout()
    {
        $cartItems = Cart::getCartItems();

        if ($cartItems->isEmpty()) {
            return redirect()->route('home');
        }

        return Inertia::render('frontend/checkout');
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

    public function updateCartItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        if (Auth::check()) {
            Cart::where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->update(['quantity' => $request->quantity]);
        } else {
            $cart = session()->get('cart', []);
            if (isset($cart[$request->product_id])) {
                $cart[$request->product_id]['quantity'] = $request->quantity;
                session()->put('cart', $cart);
            }
        }

        return back()->with('success', 'Cart updated successfully.');
    }

    public function removeCartItem($id)
    {
        if (Auth::check()) {
            Cart::where('user_id', Auth::id())
                ->where('product_id', $id)
                ->delete();
        } else {
            $cart = session()->get('cart', []);
            unset($cart[$id]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Item removed from cart.');
    }

    public function placeOrder(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string|max:255',
            'payment_method' => 'required|in:cash,card',
            'total_price' => 'required|numeric|min:1',
        ]);

        DB::beginTransaction();
        
        try {
            $cartItems = Cart::getCartItems();

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_price' => $request->total_price,
                'shipping_address' => $request->shipping_address,
                'status' => 'pending',
            ]);
    

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            Payment::create([
                'order_id' => $order->id,
                'payment_method' => $request->payment_method,
                'amount' => $request->total_price,
                'payment_status' => 'paid',
            ]);

            Cart::clearCart();
            DB::commit();
            
            return redirect()->route('order.success')->with('success', 'Your order has been placed successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()->with('error', 'Something went wrong while placing the order. Please try again.');
        }
    }

    public function orderSuccess()
    {
        return Inertia::render('frontend/order-success');
    }
}