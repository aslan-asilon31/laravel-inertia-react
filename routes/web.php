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

    Route::get('product-contents', [ProductContentController::class, 'index'])->name('product-contents.index');
    Route::get('product-contents/create', [ProductContentController::class, 'create'])->name('product-contents.create');
    Route::post('product-contents', [ProductContentController::class, 'store'])->name('product-contents.store');
    Route::get('product-contents/{id}', [ProductContentController::class, 'show'])->name('product-contents.show');
    Route::get('product-contents/{id}/edit', [ProductContentController::class, 'edit'])->name('product-contents.edit');
    Route::put('product-contents/{id}', [ProductContentController::class, 'update'])->name('product-contents.update');
    Route::delete('product-contents/{id}', [ProductContentController::class, 'destroy'])->name('product-contents.destroy');

    Route::prefix('dashboard')->group(function () {
        Route::resource('/users', \App\Http\Controllers\UserController::class);
    });

    Route::prefix('product-content/')->group(function () {
        Route::resource('/diplays', \App\Http\Controllers\ProductContentDisplayController::class);
        Route::resource('/product-content-features', \App\Http\Controllers\ProductContentFeatureController::class);
    });
});




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
