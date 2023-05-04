<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Song;
use App\Models\Album;
use Illuminate\Http\Request;
use App\Http\Requests\SongUploadRequest;
use Illuminate\Support\Facades\DB;

class MusicController extends Controller
{
    public function index_songs()
    {
        // $songs = Song::all()->sortBy("created_at");
        // foreach ($songs as $song) {
        //     if ($song['album_id'] !== NULL) {
        //         return response()->json('has album');
        //     }
        // }
        $songs = DB::table('songs')
            ->leftJoin('albums', 'songs.album_id', '=', 'albums.id')
            ->select('songs.*', 'albums.title as album_title')
            ->get();
        return response()->json($songs);
    }

    public function my_albums(Request $request)
    {
        $user_id = $request->user()['id'];
        $albums = Album::where("user_id", $user_id)->get();
        return response()->json($albums);
    }
    public function index_album($id)
    {
        $album = Album::where('id', $id)->first();
        $songs = Song::where('album_id', $id)->get();

        return response()->json(['album' => $album, 'songs' => $songs]);
    }
}