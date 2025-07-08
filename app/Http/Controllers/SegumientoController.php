<?php

namespace App\Http\Controllers;

use App\Models\Segumiento;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SegumientoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function follow(User $user)
    {
        try {
            $currentUser = User::find(Auth::id());
            if (!$currentUser) {
                return response()->json(['message' => 'Debes iniciar sesión para seguir a alguien'], 401);
            }

            if ($currentUser->id === $user->id) {
                return response()->json(['message' => 'No puedes seguirte a ti mismo'], 422);
            }

            if ($currentUser->siguiendo()->where('seguido_id', $user->id)->exists()) {
                return response()->json(['message' => 'Ya sigues a ' . $user->name], 422);
            }

            $currentUser->siguiendo()->attach($user->id);

            return response()->json(['message' => 'Ahora sigues a ' . $user->name], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al seguir usuario: ' . $e->getMessage()], 500);
        }
    }

    public function unfollow(User $user)
    {
        try {
            $currentUser = User::find(Auth::id());
            if (!$currentUser) {
                return response()->json(['message' => 'Debes iniciar sesión para dejar de seguir a alguien'], 401);
            }

            if ($currentUser->id === $user->id) {
                return response()->json(['message' => 'No puedes dejar de seguirte a ti mismo'], 422);
            }

            if (!$currentUser->siguiendo()->where('seguido_id', $user->id)->exists()) {
                return response()->json(['message' => 'No sigues a ' . $user->name], 422);
            }

            $currentUser->siguiendo()->detach($user->id);


            return response()->json(['message' => 'Has dejado de seguir a ' . $user->name], 200);
        } catch (\Exception $e) {

            return response()->json(['message' => 'Error al dejar de seguir usuario: ' . $e->getMessage()], 500);
        }
    }

    public function search(Request $request)
    {
        $currentUser = User::find(Auth::id());
        if (!$currentUser) {
            return redirect()->route('login')->with('error', 'Debes iniciar sesión para buscar usuarios');
        }

        $query = $request->input('query');
        $users = User::query()
            ->when($query, function ($queryBuilder, $searchTerm) {
                return $queryBuilder->where('name', 'LIKE', "%{$searchTerm}%");
            })
            ->where('id', '!=', $currentUser->id)
            ->paginate(10);

        return view('Seguimiento.search', compact('users', 'query', 'currentUser'));
    }

    public function following()
    {
        $currentUser = User::find(Auth::id());
        if (!$currentUser) {
            return redirect()->route('login')->with('error', 'Debes iniciar sesión para ver tus seguidos');
        }

        $following = $currentUser->siguiendo()->paginate(10);
        return view('Seguimiento.following', compact('following', 'currentUser')); }
}
