<?php

use App\Models\Listapendientes;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ListapendientesController;
use App\Http\Controllers\ListavistasController;
use App\Http\Controllers\SegumientoController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PerfilController;
use App\Models\User;

// Homepage
Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/anime-buscar', function () {
    return view('anime-buscar');
})->name('buscar-anime');

Route::get('/anime-view', function () {
    return view('anime-view');
})->name('detalles-anime');


Route::get('/top-animes', function () {
    return view('top-animes');
})->name('top-anime');  


//Rutas para CRUD de la lista de pendientes
Route::get('/{nombreusuario}/listapendientes', [ListapendientesController::class, 'index'])->name('listapendientes');
Route::post('/listapendientes/store-ajax', [ListapendientesController::class, 'storeAjax'])->name('listapendientes.store-ajax');
Route::delete('/listapendientes/{id}', [ListapendientesController::class, 'destroy'])->name('listapendientes.destroy');
Route::resource('listapendientes', ListapendientesController::class);

//Rutas para CRUD de la lista de vistas
// Rutas para lista de vistas
Route::get('/{nombreusuario}/listavistas', [ListavistasController::class, 'index'])->name('listavistas');
Route::post('/listavistas/store-ajax', [ListavistasController::class, 'storeAjax'])->name('listavistas.store-ajax');
Route::delete('/listavistas/{id}', [ListavistasController::class, 'destroy'])->name('listavistas.destroy');
Route::resource('listavistas', ListavistasController::class);



Auth::routes();
Route::post('/follow/{user}', [SegumientoController::class, 'follow'])->name('follow');
Route::post('/unfollow/{user}', [SegumientoController::class, 'unfollow'])->name('unfollow');
Route::get('/users/search', [SegumientoController::class, 'search'])->name('users.search');
Route::get('/following', [SegumientoController::class, 'following'])->name('following');

// Nuevas rutas para el perfil
Route::middleware('auth')->group(function () {
    Route::get('/perfil/editar', [PerfilController::class, 'edit'])->name('perfil.edit');
    Route::put('/perfil', [PerfilController::class, 'update'])->name('perfil.update');
});

