<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\CategoryController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ProductController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\TestimonialController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');

        Route::get('/dashboard/orders', 'orders')->name('dashboard.orders');

        Route::get('/dashboard/seo', 'seo')->name('dashboard.seo');
        Route::get('/dashboard/social-links', 'socialLinks')->name('dashboard.socialLinks');
        Route::post('/dashboard/social-links', 'socialLinksUpdate')->name('dashboard.socialLinks.update');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/dashboard/categories', 'index')->name('dashboard.categories');
        Route::get('/dashboard/categories/add', 'add')->name('dashboard.categories.add');
        Route::get('/dashboard/categories/{id}/edit', 'edit')->name('dashboard.categories.edit');
        Route::post('/dashboard/categories/add', 'create')->name('dashboard.categories.create');
        Route::post('/dashboard/categories/{id}/edit', 'update')->name('dashboard.categories.update');
        Route::delete('/dashboard/categories/{id}/delete', 'delete')->name('dashboard.categories.delete');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/dashboard/products', 'index')->name('dashboard.products');
        Route::get('/dashboard/products/add', 'add')->name('dashboard.products.add');
        Route::get('/dashboard/products/{id}/edit', 'edit')->name('dashboard.products.edit');
        Route::post('/dashboard/products/add', 'create')->name('dashboard.products.create');
        Route::post('/dashboard/products/{id}/edit', 'update')->name('dashboard.products.update');
        Route::delete('/dashboard/products/{id}/delete', 'delete')->name('dashboard.products.delete');
    });

    Route::controller(TestimonialController::class)->group(function () {
        Route::get('/dashboard/testimonials', 'index')->name('dashboard.testimonials');
        Route::get('/dashboard/testimonials/add', 'add')->name('dashboard.testimonials.add');
        Route::get('/dashboard/testimonials/{id}/edit', 'edit')->name('dashboard.testimonials.edit');
        Route::post('/dashboard/testimonials/add', 'create')->name('dashboard.testimonials.create');
        Route::post('/dashboard/testimonials/{id}/edit', 'update')->name('dashboard.testimonials.update');
        Route::delete('/dashboard/testimonials/{id}/delete', 'delete')->name('dashboard.testimonials.delete');
    });


    Route::get('settings/site', function () {
        return Inertia::render('settings/site');
    })->name('settings.site');
});
