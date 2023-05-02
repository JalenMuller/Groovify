<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    function index_genres()
    {
        $genres = Genre::all();
        return response()->json($genres);
    }
}