<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'songs',
        'artist',
        'cover',
        'genre_id',
        'user_id',
        'release_date',
    ];
}