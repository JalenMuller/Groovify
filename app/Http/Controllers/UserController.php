<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateProfileRequest;

class UserController extends Controller
{
    public function update_profile(UpdateProfileRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('avatar')) {
            $avatar_file_name = $request->file('avatar')->hashName();
            $request->file('avatar')->storeAs('uploads/images/avatars', $avatar_file_name, 'public_html');
        } else {
            $avatar_file_name = null;

        }
        $user = $request->user();
        $user->name = $data['name'];
        $user->email = $data['email'];
        if (isset($avatar_file_name)) {
            $user->avatar = $avatar_file_name;
        }
        $user->save();
        return response()->json([
            'message' => "Successfully updated your profile",
        ]);


    }
}