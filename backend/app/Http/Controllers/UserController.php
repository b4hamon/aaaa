<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{





    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->nombre;
        $user->email = $request->correo;
        $user->password = bcrypt($request->contrasenia);
        $user->save();
        return response()->json($user);
    }

    public function show(string $id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
