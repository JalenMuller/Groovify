<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
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
    // auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    // profile
    Route::post('/update-profile', [UserController::class, 'update_profile']);
    // music uploads
    Route::post('/upload-song', [UploadController::class, 'upload_song']);
    Route::delete('/delete-song/{id}', [MusicController::class, 'destroy_song']);
    Route::post('/upload-album-song', [UploadController::class, 'upload_album_song']);
    Route::delete('/delete-album-song/{id}', [MusicController::class, 'destroy_album_song']);
    // playlists
    Route::post('/playlist/create', [PlaylistController::class, 'create']);
    Route::post('/playlist/add-song', [PlaylistController::class, 'add_song']);
    Route::get('/playlist/my-playlists', [PlaylistController::class, 'my_playlists']);
    Route::get('/playlist/{id}', [PlaylistController::class, 'index']);
    // albums
    Route::post('/create-album', [UploadController::class, 'createAlbum']);
    Route::delete('/delete-album/{id}', [MusicController::class, 'destroy_album']);
    Route::get('/album/{id}', [MusicController::class, 'index_album']);
    Route::get('/my-albums', [MusicController::class, 'my_albums']);
    // fetch music
    Route::get('/recent-songs', [MusicController::class, 'index_songs']);
    Route::get('/recent-albums', [MusicController::class, 'index_albums']);
    Route::get('/my-singles', [MusicController::class, 'my_singles']);
    Route::get('/search', [MusicController::class, 'search']);
    // general
    Route::get('/genres', [GenreController::class, 'index_genres']);
});
// Route::get('/genres', [MusicController::class, 'index_songs']);