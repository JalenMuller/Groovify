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
        $songs = DB::table('songs')
            ->leftJoin('albums', 'songs.album_id', '=', 'albums.id')
            ->select('songs.*', 'albums.title as album_title')
            ->paginate(100)->shuffle();
        return response()->json($songs);
    }
    public function index_albums()
    {
        $songs = Album::where('song_amount', '>', '0')->get();
        return response()->json($songs);
    }

    public function my_albums(Request $request)
    {
        $user_id = $request->user()['id'];
        $albums = Album::where("user_id", $user_id)->get();
        return response()->json($albums);
    }
    public function my_singles(Request $request)
    {
        $user_id = $request->user()['id'];
        $songs = Song::where([["user_id", $user_id], ["album_id", '=', null]])->get();
        return response()->json($songs);
    }
    public function index_album($id)
    {
        $album = Album::where('id', $id)->first();
        $songs = Song::where('album_id', $id)->get();

        return response()->json(['album' => $album, 'songs' => $songs]);
    }
    public function my_album(Request $request)
    {
        $album = Album::where('id', $request['id'])->first();
        if ($album['user_id'] !== $request->user()['id']) {
            return response()->json(['message' => "That's not your album"], 403);
        }
        $songs = Song::where('album_id', $request['id'])->get();

        return response()->json(['album' => $album, 'songs' => $songs]);
    }
    public function search(Request $request)
    {
        if ($request->type == "songs") {
            $result = Song::where('name', 'like', "%{$request->value}%")->get();
        } else {
            $result = Album::where('title', 'like', "%{$request->value}%")->get();
        }
        return response()->json($result);
    }
    public function destroy_song(Request $request)
    {
        $song_id = $request['id'];
        $user_id = $request->user()['id'];

        $song = Song::where('id', $song_id)->first();

        if ($song['user_id'] == $user_id) {
            $song->delete();
            return response()->json("Deleted " . $song['name']);
        } else {
            return response()->json("Not your song!", 403);
        }
    }
    public function destroy_album_song(Request $request)
    {
        $song_id = $request['id'];
        $user_id = $request->user()['id'];

        $song = Song::where('id', $song_id)->first();


        $album = Album::where('id', $song['album_id'])->first();
        $song_index = $song['album_order'];

        if ($song['user_id'] == $user_id) {
            // find songs after the deleted songs index and lower their number by 1
            $songs_after_index = Song::where([['album_id', $album['id']], ['album_order', '>', $song_index]])->get();
            foreach ($songs_after_index as $album_song) {
                $album_song['album_order'] = $album_song['album_order'] - 1;
                $album_song->save();
            }
            // lower the album song total by 1 and delete the song
            $album['song_amount'] = $album['song_amount'] - 1;
            $album->save();
            $song->delete();
            return response()->json([
                'message' => "Deleted song " . $song['name'],
            ]);
        } else {
            return response()->json([
                'message' => "Not your song!",
            ], 403);
        }
    }
    public function destroy_album(Request $request)
    {
        $album_id = $request['id'];
        $user_id = $request->user()['id'];

        $album = Album::where('id', $album_id)->first();

        if ($album['user_id'] == $user_id) {
            $album->delete();
            return response()->json([
                'message' => "Deleted " . $album['title'],
            ]);
        } else {
            return response()->json([
                'message' => "Not your album!",
            ]);
        }
    }
}