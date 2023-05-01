<?php

namespace App\Http\Controllers;

use App\Http\Requests\SongUploadRequest;
use App\Http\Resources\SongResource;
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
            'length' => $data['length'],
            'release_date' => $data['release_date'],
            'genre_id' => $data['genre_id'],
            'cover_path' => $cover_file_name,
            'song_path' => $song_file_name,
            'user_id' => $request->user()['id']
        ]);

        return response()->json([
            'message' => "Successfully published song!",
            'song' => new SongResource($song),
        ]);
    }
}