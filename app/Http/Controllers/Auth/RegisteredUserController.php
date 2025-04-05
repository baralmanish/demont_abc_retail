<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Cart;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Migrate session cart to DB on login
        $this->migrateSessionCartToDatabase($request);

        if (Auth::user()->role === 'ADMIN') {
            return to_route('dashboard');
        } else {
            return redirect()->intended(route('home', absolute: false));
        }
    }

    private function migrateSessionCartToDatabase(Request $request): void
    {
        $sessionCart = $request->session()->get('cart', []);
        $userId = $request->user()->id;

        foreach ($sessionCart as $productId => $item) {
            Cart::updateOrCreate(
                ['user_id' => $userId, 'product_id' => $productId],
                ['quantity' => DB::raw("quantity + {$item['quantity']}")]
            );
        }

        // Clear the session cart
        $request->session()->forget('cart');
    }
}