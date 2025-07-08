@extends('layouts.app')

@section('title', 'Home - WatchOver')
@section('extra-head')
    @vite(['resources/js/pages/scripts-listas.js'])
@endsection


@section('content')
<div class="container-fluid justify-content-center" id="contenedorLista">
        <div class="container-fluid" id="contenedor1">
            <h3 id="tituloLista">Animes pendientes de {{ $user->name }}</h3>
            <p id="subtituloLista">Aqui podras ver los animes que tienes pendientes para ver</p>

        </div>
        <div class="container-fluid" id="cAnimesListaPendientes">
            @if (isset($listapendientes) && count($listapendientes) != 0)
            <div class="row justify-content-center, g-3">
                    @foreach ($listapendientes as $animependiente)
                        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                            <div class="card cartaAnime" id="{{ $animependiente->anime_id }}">
                                <img src="{{ $animependiente->imagen }}" class="card-img">
                            <button class="btn-eliminar" data-anime-id="{{ $animependiente->id }}" >
                                <i class="bi bi-x-square"></i>
                            </button>
                            </div>
                            <h6 class=tituloAnime>{{ $animependiente->titulo }}</h6>

                        </div>
                    @endforeach
                </div>
            @else
                <p>No hay animes pendientes para ver</p>
            @endif
        </div>
@endsection




