<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;

// Test route
Route::get('/test', function() {
    return response()->json(['message' => 'API is working!', 'timestamp' => now()]);
});

Route::post('/test-register', function(Request $request) {
    try {
        $user = \App\Models\User::create([
            'name' => 'Test User',
            'email' => 'test' . time() . '@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        ]);
        return response()->json(['success' => true, 'user' => $user]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Product API Routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/{id}', [ProductController::class, 'show']);
