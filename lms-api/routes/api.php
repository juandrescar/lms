<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//publics
Route::get('books', [BookController::class, 'index']);
Route::get('books/search', [BookController::class, 'search']);
Route::get('books/{book}', [BookController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);

//protected
Route::middleware('auth:sanctum')->group(function () {
    Route::post('books', [BookController::class, 'store']);
    Route::put('books/{book}', [BookController::class, 'update']);
    Route::delete('books/{book}', [BookController::class, 'destroy']);
    Route::apiResource('users', UserController::class);
    Route::post('logout', [AuthController::class, 'logout']);
});

