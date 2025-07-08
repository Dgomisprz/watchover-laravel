<?php

namespace App\Http\Controllers;

use App\Models\Listapendientes;
use App\Models\User;
use Illuminate\Http\Request;
use Termwind\Components\Li;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class ListapendientesController extends Controller
{

    public function index($nombreusuario)
    {
        //
        $user = User::where('name', $nombreusuario)->firstOrFail();

        if (Auth::id() !== $user->id) {
            return redirect()->route('home')->with('error', 'No tienes permiso para ver esta lista.');
        }

        $listapendientes = Listapendientes::where('user_id', $user->id)->get();
        return view('listapendientes.index', compact('listapendientes', 'user'));
    }


    public function store(Request $request)
    {
        //

        $datos = $request->except('_token');
        // Verificar si el anime_id ya existe en la lista de pendientes
        if (isset($datos['anime_id']) && Listapendientes::where('anime_id', $datos['anime_id'])->exists()) {
            return redirect('listapendientes')->with('error', 'El anime ya está en la lista de pendientes');
        }
        Listapendientes::insert($datos);
        return redirect('listapendientes')->with('mensaje', 'Anime agregado a la lista de pendientes');
    }

    public function storeAjax(Request $request)
    {
        try {
            // Registrar datos recibidos
            Log::info('Datos recibidos en storeAjax (pendientes):', ['input' => $request->all(), 'json' => $request->json()->all()]);

            // Obtener datos JSON
            $data = $request->json()->all();

            // Validar datos
            $validated = $request->validate([
                'anime_id' => 'required|integer',
                'titulo' => 'required|string|max:255',
                'imagen' => 'required|string|max:255'
            ]);

            // Verificar duplicados
            if (Listapendientes::where('user_id', Auth::id())->where('anime_id', $validated['anime_id'])->exists()) {
                return response()->json(['message' => 'El anime ya está en tu lista de pendientes'], 422);
            }

            // Preparar datos, incluyendo user_id
            $datos = [
                'user_id' => Auth::id(),
                'anime_id' => $validated['anime_id'],
                'titulo' => $validated['titulo'],
                'imagen' => $validated['imagen']
            ];

            // Registrar datos a insertar
            Log::info('Datos a insertar en listapendientes:', $datos);

            // Crear registro
            $anime = Listapendientes::create($datos);

            return response()->json([
                'message' => 'Anime agregado a la lista de pendientes',
                'anime' => $anime
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error en storeAjax (pendientes): ' . $e->getMessage(), [
                'request' => $request->all(),
                'json' => $request->json()->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Error al agregar el anime: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        //
       
       try {
            $listapendientes = Listapendientes::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
            $listapendientes->delete();
            return response()->json(['message' => 'Anime eliminado de la lista de vistas'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el anime: ' . $e->getMessage()], 500);
        }
    }
}
