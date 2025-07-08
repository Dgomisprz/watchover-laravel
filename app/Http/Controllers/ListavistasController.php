<?php

namespace App\Http\Controllers;

use App\Models\Listavistas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Events\AnimeAddToList;

class ListavistasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($nombreusuario)
    {
       $user = User::where('name', $nombreusuario)->firstOrFail();
        $currentUser = Auth::user();
        $listavistas = Listavistas::where('user_id', $user->id)->get();

        return view('listavistas.index', compact('listavistas', 'user', 'currentUser'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $listavistas = Listavistas::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $datos = $request->except('_token');
        // Verificar si el anime_id ya existe en la lista de vistas
        if (isset($datos['anime_id']) && Listavistas::where('anime_id', $datos['anime_id'])->exists()) {
            return redirect('listavistas')->with('error', 'El anime ya está en la lista de vistas');
        }
        Listavistas::insert($datos);
        return redirect('listavistas')->with('mensaje', 'Anime agregado a la lista de vistas');
    }

    public function storeAjax(Request $request)
    {
                try {
            // Registrar datos recibidos
            Log::info('Datos recibidos en storeAjax:', $request->all());

            // Validar datos
            $validated = $request->validate([
                'anime_id' => 'required|integer',
                'titulo' => 'required|string|max:255',
                'imagen' => 'required|string|max:255'
            ]);

            // Verificar duplicados
            if (Listavistas::where('user_id', Auth::id())->where('anime_id', $validated['anime_id'])->exists()) {
                return response()->json(['message' => 'El anime ya está en tu lista de vistas'], 422);
            }

            // Preparar datos
            $datos = [
                'user_id' => Auth::id(),
                'anime_id' => $validated['anime_id'],
                'titulo' => $validated['titulo'],
                'imagen' => $validated['imagen']
            ];

            // Crear registro
            $anime = Listavistas::create($datos);

            return response()->json([
                'message' => 'Anime agregado a la lista de vistas',
                'anime' => $anime
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al agregar el anime: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
       try {
            $listavistas = Listavistas::where('id', $id)->where('user_id', Auth::id())->firstOrFail(); 
            $listavistas->delete();
            return response()->json(['message' => 'Anime eliminado de la lista de vistas'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el anime: ' . $e->getMessage()], 500);
        }
    }
}
