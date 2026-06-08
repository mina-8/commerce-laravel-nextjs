<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/home' , [HomeController::class,'index']);

Route::controller(ProductController::class)
->group(function (){
    Route::get('/product/{slug}', 'show');
});

Route::controller(AuthController::class)
->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::post('checkout/preview' , [CheckOutController::class , 'checkout']);
});
