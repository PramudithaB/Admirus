<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
});

Route::get('/{path}', function () {
    return file_get_contents(public_path('index.html'));
})->where('path', '.*');
