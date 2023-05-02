<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Song;
use App\Models\Album;
use Illuminate\Http\Request;
use App\Http\Requests\SongUploadRequest;

class MusicController extends Controller
{
    public function index_songs()
    {
        $songs = Song::all()->sortBy("created_at");
        return response()->json($songs);
    }

    public function my_albums(Request $request)
    {
        $user_id = $request->user()['id'];
        $albums = Album::where("user_id", $user_id)->get();
        return response()->json($albums);
    }
}