<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('frontend/home');
})->name('home');

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
