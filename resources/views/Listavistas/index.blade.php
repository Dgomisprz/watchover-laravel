@extends('layouts.app')

@section('title', 'Home - WatchOver')
@section('extra-head')
    @vite(['resources/js/pages/scripts-listas.js'])
@endsection


@section('content')
    <div class="container-fluid justify-content-center" id="contenedorLista">
        <div class="container-fluid" id="contenedor1">
            <h3 id="tituloLista">Animes vistos de {{ $user->name }}</h3>
            <p id="subtituloLista">Aqui podras ver los animes que has terminado</p>

        </div>
        <div class="container-fluid" id="cAnimesLista">
            @if (isset($listavistas) && count($listavistas) != 0)
                <div class="row justify-content-center, g-3">
                    @foreach ($listavistas as $animevisto)
                        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                            <div class="card cartaAnime" id="{{ $animevisto->anime_id }}">
                                <img src="{{ $animevisto->imagen }}" class="card-img">
                                @if ($currentUser && $currentUser->id === $user->id)
                                    <button class="btn-eliminar" data-anime-id="{{ $animevisto->id }}">
                                        <i class="bi bi-x-square"></i>
                                    </button>
                                @endif
                            </div>
                            <h6 class=tituloAnime>{{ $animevisto->titulo }}</h6>

                        </div>
                    @endforeach
                </div>
            @else
                <p>No hay animes pendientes para ver</p>
            @endif
        </div>
    @endsection
