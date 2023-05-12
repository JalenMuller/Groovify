<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaylistRequest;
use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    public function index(Request $request)
    {
        $playlist = Playlist::where([['id', $request['id']], ['user_id', $request->user()['id']]])->first();
        return response()->json($playlist);
    }

    public function create(CreatePlaylistRequest $request)
    {
        $data = $request->validated();
        Playlist::create([
            'name' => $data['name'],
            'user_id' => $request->user()['id']
        ]);
    }
    public function my_playlists(Request $request)
    {
        $playlists = Playlist::where('user_id', $request->user()['id'])->get();
        return response()->json($playlists);
    }
}