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

// Debug endpoint - remove this in production
Route::get('/debug-db', function () {
    try {
        $pdo = DB::connection()->getPdo();
        $usersCount = DB::table('users')->count();
        $dbName = DB::connection()->getDatabaseName();
        
        return response()->json([
            'status' => 'success',
            'database' => $dbName,
            'users_count' => $usersCount,
            'connection' => 'OK',
            'driver' => config('database.default'),
            'host' => config('database.connections.mysql.host'),
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ], 500);
    }
});

// Test registration without authentication - DEBUGGING ONLY
Route::post('/test-register', function (Illuminate\Http\Request $request) {
    try {
        \Log::info('Test registration attempt', $request->all());
        
        // Test database write
        $user = \App\Models\User::create([
            'name' => 'Debug Test User ' . time(),
            'email' => 'debug' . time() . '@test.com',
            'password' => \Hash::make('password123'),
            'role' => 'user',
            'is_active' => true,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Test user created successfully!',
            'user' => $user,
            'database' => DB::connection()->getDatabaseName(),
        ], 201);
    } catch (\Exception $e) {
        \Log::error('Test registration failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
        ], 500);
    }
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

    // Posts (authenticated)
    Route::post('/companies/{id}/posts', [CompanyController::class, 'addPost']);
    Route::put('/posts/{id}/status', [CompanyController::class, 'updateStatus']);

    /*
    |--------------------------------------------------------------------------
    | Task Routes
    |--------------------------------------------------------------------------
    */

    // USER actions
    Route::put('/tasks/{id}/start', [TaskController::class, 'userStartTask']);
    Route::put('/tasks/{id}/submit', [TaskController::class, 'userSubmitTask']);

    // ADMIN actions
    Route::put('/tasks/{id}/complete', [TaskController::class, 'adminCompleteTask']);
    Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);

    // List tasks
    Route::get('/tasks/admin', [TaskController::class, 'adminTasks']);
    Route::get('/tasks/my', [TaskController::class, 'myTasks']);

    // Create new task
    Route::post('/tasks', [TaskController::class, 'store']);
});

