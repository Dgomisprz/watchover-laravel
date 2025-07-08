@extends('layouts.app')

@section('title', 'Usuarios Seguidos - WatchOver')

@section('extra-head')
    @vite(['resources/js/pages/scripts-seguimiento.js'])
    <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('content')
<div class="container-fluid justify-content-center" id="contenedorSeguidos">
    <div class="container-fluid" id="contenedor1">
        <h3 id="tituloSeguidos">Usuarios Seguidos</h3>
        <p id="subtituloSeguidos">Aquí puedes ver los usuarios que sigues</p>
    </div>

    <div id="alert-container"></div>

    <div class="container-fluid" id="cUsuarios">
        @if ($following->count() > 0)
            <div class="row justify-content-start g-3">
                @foreach ($following as $user)
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2 columnas-cartasUsers">
                        <div class="card cartaUsuario">
                            <div class="card-body text-center">
                                <h5 class="card-title">{{ $user->name }}</h5>
                                <a href="/watchover-laravel/public/{{ $user->name }}/listavistas" class="btn btn-sm btn-primary mb-2 btn-list">Ver Lista</a>
                                <button class="btn btn-follow" data-user-id="{{ $user->id }}" data-is-following="true">
                                    Dejar de seguir
                                </button>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            {{ $following->links() }}
        @else
            <p>No sigues a ningún usuario</p>
        @endif
    </div>
</div>
@endsection