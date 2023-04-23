<?php

namespace App\Http\Controllers;

use App\Http\Requests\SongUploadRequest;
use App\Http\Resources\SongResource;
use App\Models\Song;

class UploadController extends Controller
{
    public function uploadSong(SongUploadRequest $request) {

        $data = $request->validated();
        if($request->hasFile('cover')){    
            $file_name = $request->file('cover')->hashName();
            $cover_path = $request->file('cover')->storePublicly('public/images/covers');
        } else {
            return response()->json(['message' => 'Something went wrong with your image upload.']);
        }
        if($request->hasFile('song')){    
            $song_path = $request->file('song')->storePublicly('public/songs');
        } else {
            return response()->json(['message' => 'Something went wrong with your song upload.']);
        }

        $song = Song::create([
            'name' => $data['name'],
            'artists' => $data['artists'],
            'cover_path' => $file_name,
            'song_path' => $song_path
        ]);

        return response()->json([
            'message' => "Successfully published song!",
            'song' => new SongResource($song),
        ]);
    }
}
