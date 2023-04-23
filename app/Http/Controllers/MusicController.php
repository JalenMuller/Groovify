<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Song;
use Illuminate\Http\Request;

class MusicController extends Controller {
    public function index_songs(){
        $songs = Song::all()->sortBy("created_at");
        return response()->json($songs);
    }
}