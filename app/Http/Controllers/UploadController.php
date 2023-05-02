<?php

namespace App\Http\Controllers;

use App\Http\Requests\SongUploadRequest;
use App\Http\Requests\AlbumRequest;
use App\Http\Resources\SongResource;
use App\Models\Album;
use App\Models\Song;

class UploadController extends Controller
{
    public function uploadSong(SongUploadRequest $request)
    {
        // return response()->json($request->user()['id']);
        $data = $request->validated();
        if ($request->hasFile('cover')) {
            $request->file('cover')->storePublicly('public/images/covers');
            $cover_file_name = $request->file('cover')->hashName();
        } else {
            return response()->json(['message' => 'Something went wrong with your image upload.']);
        }
        if ($request->hasFile('song')) {
            $request->file('song')->storePublicly('public/songs');
            $song_file_name = $request->file('song')->hashName();
        } else {
            return response()->json(['message' => 'Something went wrong with your song upload.']);
        }

        $song = Song::create([
            'name' => $data['name'],
            'artist' => $data['artist'],
            'features' => $data['features'],
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
    public function createAlbum(AlbumRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover')) {
            $request->file('cover')->storePublicly('public/images/covers');
            $cover_file_name = $request->file('cover')->hashName();
        } else {
            return response()->json(['message' => 'Something went wrong with your image upload.']);
        }

        $album = Album::create([
            'title' => $data['title'],
            'artist' => $data['artist'],
            'cover' => $cover_file_name,
            'genre_id' => $data['genre'],
            'release_date' => $data['release_date'],
            'user_id' => 1,
        ]);

        return response()->json([
            'message' => "Successfully created album!",
            'song' => $album,
        ]);
    }
}