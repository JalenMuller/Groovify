<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'artist',
        'features',
        'length',
        'album_id',
        'album_order',
        'genre',
        'release_date',
        'cover_path',
        'song_path',
        'user_id',
    ];
}