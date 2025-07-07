<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductContentController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('/posts', \App\Http\Controllers\PostController::class);
    Route::resource('/products', \App\Http\Controllers\ProductController::class);
    Route::resource('product-contents', ProductContentController::class);

    Route::prefix('dashboard')->group(function () {
        Route::resource('/users', \App\Http\Controllers\UserController::class);
    });

    Route::prefix('product-content/')->group(function () {
        Route::resource('/', \App\Http\Controllers\ProductContentController::class);
        Route::resource('/diplays', \App\Http\Controllers\ProductContentDisplayController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentFeatureController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentMarketplaceController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentMetaController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentQnaController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentReviewController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentSpecificationController::class);
        // Route::resource('/diplays', \App\Http\Controllers\ProductContentVideoController::class);
        Route::resource('/', \App\Http\Controllers\ProductContentController::class);
    });
});




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
