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
    
    Route::post('/cart/add', 'addToCart')->name('cart.add');
});

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';