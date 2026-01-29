<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!'], 200);
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Sanctum Auth)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/change-password', [UserController::class, 'changePassword']);

    // Users (all authenticated)
    Route::get('/users/{id}', [UserController::class, 'show']);

    // Admin + SuperAdmin
    Route::middleware(['role:admin,superadmin'])->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::put('/users/{id}', [UserController::class, 'update']);
    });

    // SuperAdmin only
    Route::middleware(['role:superadmin'])->group(function () {
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------------
    | Company Routes
    |--------------------------------------------------------------------------
    */

    // Full CRUD
    Route::apiResource('companies', CompanyController::class);

    // Analytics (ADMIN ONLY)
    Route::middleware(['role:admin,superadmin'])->group(function () {
        Route::get('/companies/{id}/analytics', [CompanyController::class, 'analytics']);
        Route::get('/companies/{id}/scheduled-posts', [CompanyController::class, 'scheduledPosts']);
    });
});
Route::post('/companies/{id}/posts', [CompanyController::class, 'addPost']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/companies', [CompanyController::class, 'index']);

    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/admin', [TaskController::class, 'adminTasks']);
    Route::get('/tasks/my', [TaskController::class, 'myTasks']);
    Route::put('/tasks/{id}/complete', [TaskController::class, 'complete']);
    Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

});
Route::middleware('auth:sanctum')->get('/users', function () {
    return \App\Models\User::select('id', 'name')->get();
});

