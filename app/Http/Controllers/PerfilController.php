<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class PerfilController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $currentUser = User::find(Auth::id());
        return view('perfil.edit', compact('currentUser'));
    }

    public function update(Request $request)
    {
        try {

            $currentUser = User::find(Auth::id());

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $currentUser->id,
                'password' => 'nullable|string|min:8|confirmed',
            ]);

            $currentUser->name = $validated['name'];
            $currentUser->email = $validated['email'];

            if (!empty($validated['password'])) {
                $currentUser->password = Hash::make($validated['password']);
            }

            $currentUser->save();

            return redirect()->route('home')->with('mensaje', 'Perfil actualizado correctamente');
        } catch (\Exception $e) {

            return redirect()->route('perfil.edit')->with('error', 'Error al actualizar el perfil: ' . $e->getMessage());
        }
    }
}