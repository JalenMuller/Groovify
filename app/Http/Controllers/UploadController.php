<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlbumSongRequest;
use App\Http\Requests\SongUploadRequest;
use App\Http\Requests\AlbumRequest;
use App\Http\Resources\SongResource;
use App\Models\Album;
use App\Models\Song;

class UploadController extends Controller
{
    public function upload_song(SongUploadRequest $request)
    {
        // return response()->json($request->user()['id']);
        $data = $request->validated();
        if ($request->hasFile('cover')) {
            $cover_file_name = $request->file('cover')->hashName();
            $request->file('cover')->storeAs('uploads/images/covers', $cover_file_name, 'public_html');
        } else {
            return response()->json(['message' => 'Something went wrong with your image upload.']);
        }
        if ($request->hasFile('song')) {
            $song_file_name = $request->file('song')->hashName();
            $request->file('song')->storeAs('uploads/songs', $song_file_name, 'public_html');
        } else {
            return response()->json(['message' => 'Something went wrong with your song upload.']);
        }
        if (isset($data['features'])) {
            $features = $data['features'];
        } else {
            $features = NULL;
        }
        $song = Song::create([
            'name' => $data['name'],
            'artist' => $data['artist'],
            'features' => $features,
            'length' => $data['length'],
            'release_date' => $data['release_date'],
            'genre_id' => $data['genre'],
            'cover_path' => $cover_file_name,
            'song_path' => $song_file_name,
            'user_id' => $request->user()['id']
        ]);

        return response()->json([
            'message' => "Successfully published song!",
            'song' => new SongResource($song),
        ]);
    }
    public function upload_album_song(AlbumSongRequest $request)
    {
        $data = $request->validated();
        $album_id = $data['album_id'];
        $album = Album::where('id', $album_id)->first();

        if ($request->hasFile('song')) {
            $song_file_name = $request->file('song')->hashName();
            $request->file('song')->storeAs('uploads/songs', $song_file_name, 'public_html');
        } else {
            return response()->json(['message' => 'Something went wrong with your song upload.']);
        }
        if (isset($data['features'])) {
            $features = $data['features'];
        } else {
            $features = NULL;
        }
        $song = Song::create([
            'name' => $data['name'],
            'artist' => $album['artist'],
            'features' => $features,
            'length' => $data['length'],
            'release_date' => $album['release_date'],
            'genre_id' => $album['genre_id'],
            'album_id' => $album['id'],
            'album_order' => $album['song_amount'] + 1,
            'song_path' => $song_file_name,
            'cover_path' => $album['cover'],
            'user_id' => $request->user()['id']
        ]);

        $album->song_amount = $album['song_amount'] + 1;
        $album->save();
        return response()->json([
            'message' => "Successfully published song!",
            'song' => new SongResource($song),
        ]);
    }
    public function createAlbum(AlbumRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover')) {
            $cover_file_name = $request->file('cover')->hashName();
            $request->file('cover')->storeAs('uploads/images/covers', $cover_file_name, 'public_html');
        } else {
            return response()->json(['message' => 'Something went wrong with your image upload.']);
        }

        $album = Album::create([
            'title' => $data['title'],
            'artist' => $data['artist'],
            'cover' => $cover_file_name,
            'genre_id' => $data['genre'],
            'release_date' => $data['release_date'],
            'user_id' => $request->user()['id'],
        ]);

        return response()->json([
            'message' => "Successfully created album!",
            'album' => $album,
        ]);
    }
}