<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaylistRequest;
use App\Http\Requests\PlaylistSongRequest;
use App\Models\Playlist;
use App\Models\PlaylistSong;
use App\Models\Song;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    public function index(Request $request)
    {
        $playlist = Playlist::where([['id', $request['id']], ['user_id', $request->user()['id']]])->first();
        $playlist_songs = PlaylistSong::where('playlist_id', $playlist['id'])->get();
        $song_array = [];
        foreach ($playlist_songs as $playlist_song) {
            array_push($song_array, Song::where('id', $playlist_song['song_id'])->first());
        }
        return response()->json(['playlist_info' => $playlist, 'songs' => $song_array]);
    }

    public function create(CreatePlaylistRequest $request)
    {
        $data = $request->validated();
        Playlist::create([
            'name' => $data['name'],
            'user_id' => $request->user()['id']
        ]);
    }
    public function add_song(PlaylistSongRequest $request)
    {
        $user_id = $request->user()['id'];
        $playlist = Playlist::where('id', $request['playlist_id'])->first();
        if ($playlist['user_id'] != $user_id) {
            return response()->json(['message' => "You can only add songs to your own playlist."]);
        }

        $playlist_song = PlaylistSong::create([
            'song_id' => $request['song_id'],
            'playlist_id' => $request['playlist_id'],
            'user_id' => $user_id
        ]);
        return response()->json($playlist_song);
    }
    public function my_playlists(Request $request)
    {
        $playlists = Playlist::where('user_id', $request->user()['id'])->get();
        return response()->json($playlists);
    }
}