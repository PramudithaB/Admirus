<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return file_get_contents(public_path('../public/index.html'));
});

Route::get('/{path}', function () {
    return file_get_contents(public_path('../public/index.html'));
})->where('path', '.*');
