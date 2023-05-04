<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class AlbumSongRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'length' => 'required|string|max:255',
            'features' => 'json|max:255',
            'album_id' => 'integer|max:10',
            'genre' => 'integer|max:10',
            'song' => [
                'required',
                File::types(['mp3'])
                    ->max(1024 * 1000 * 6),
                //6MB?
            ],
        ];
    }
}