<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/upload-song', [UploadController::class, 'uploadSong']);
    Route::get('/songs', [MusicController::class, 'index_songs']);
    Route::get('/genres', [GenreController::class, 'index_genres']);
    Route::get('/my-albums', [MusicController::class, 'my_albums']);
});
Route::post('/create-album', [UploadController::class, 'createAlbum']);
// Route::get('/genres', [MusicController::class, 'index_songs']);