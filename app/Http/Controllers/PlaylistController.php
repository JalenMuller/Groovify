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
        $data = $request->validated();
        $user_id = $request->user()['id'];
        $playlist = Playlist::where('id', $data['playlist_id'])->first();
        if ($playlist['user_id'] != $user_id) {
            return response('Unauthorized', 403);
        }
        // check for duplicate song in playlist
        if (PlaylistSong::where('song_id', $data['song_id'])->count() >= 1) {
            return response()->json(['message' => "You've already added that song"]);
        }
        $playlist_song = PlaylistSong::create([
            'song_id' => $data['song_id'],
            'playlist_id' => $data['playlist_id'],
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