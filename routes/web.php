<?php

use App\Http\Controllers\Frontend\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'home')->name('home');
});

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
