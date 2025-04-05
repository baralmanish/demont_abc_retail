<?php

use App\Http\Controllers\Frontend\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/about-us', 'about')->name('about');

    Route::get('/contact-us', 'contact')->name('contact');
    Route::post('/contact-us', 'sendContact')->name('contact.send');
    
    Route::get('/products', 'product')->name('products');
    Route::get('/products/{id}', 'productDetails')->name('products.details');
    
    Route::get('/cart', 'cart')->name('cart');
    Route::post('/cart/add', 'addToCart')->name('cart.add');
    Route::post('/cart/update', 'updateCartItem')->name('cart.update');
    Route::delete('/cart/remove/{id}', 'removeCartItem')->name('cart.remove');

    Route::middleware(['auth'])->group(function () {
        Route::get('/checkout', 'checkout')->name('checkout');
        Route::post('/checkout/placeOrder', 'placeOrder')->name('checkout.placeOrder');
        Route::get('/order/success', 'orderSuccess')->name('order.success');
    });
});

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';