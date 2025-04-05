<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Cart;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Migrate session cart to DB on login
        $this->migrateSessionCartToDatabase($request);

        if (Auth::user()->role === 'ADMIN') {
            return redirect()->intended(route('dashboard', absolute: false));
        } else {
            return redirect()->intended(route('home', absolute: false));

        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    private function migrateSessionCartToDatabase(Request $request): void
    {
        $sessionCart = $request->session()->get('cart', []);
        $userId = $request->user()->id;

        if (!empty($sessionCart)) {
            foreach ($sessionCart as $productId => $item) {
                if (!isset($item['quantity']) || !is_numeric($item['quantity'])) {
                    continue;
                }
    
                Cart::updateOrCreate(
                    ['user_id' => $userId, 'product_id' => intval($productId)],
                    ['quantity' => DB::raw('quantity + ' . intval($item['quantity']))]
                );
            }
    
            // Clear the session cart
            $request->session()->forget('cart');
        }
    }
}