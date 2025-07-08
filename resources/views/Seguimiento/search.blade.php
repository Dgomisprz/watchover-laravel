@extends('layouts.app')

@section('title', 'Home - WatchOver')
@section('extra-head')
    @vite(['resources/js/pages/scripts-seguimiento.js'])>
@endsection
@section('content')
<div class="container-fluid justify-content-center" id="contenedorBusqueda">
    <div class="container-fluid" id="contenedor1">
        <h3 id="tituloBusqueda">Buscar Usuarios</h3>
        <p id="subtituloBusqueda">Encuentra otros usuarios para seguir sus listas</p>
    </div>

    <div id="alert-container"></div>

    <div class="container-fluid mb-3">
        <form method="GET" action="{{ route('users.search') }}" class="d-flex formulario-busqueda">
            <input type="text" name="query" class="form-control me-2" id="buscarUser" placeholder="Buscar por nombre" value="{{ $query ?? '' }}">
            <button type="submit" class="btn btn-primary boton-buscar">Buscar</button>
        </form>
    </div>

    <div class="container-fluid" id="cUsuarios">
        @if ($users->count() > 0)
            <div class="row justify-content-start g-3">
                @foreach ($users as $user)
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2 columnas-cartasUsers">
                        <div class="card cartaUsuario">
                            <div class="card-body text-center">
                                <h5 class="card-title">{{ $user->name }}</h5>
                                <a href="/watchover-laravel/public/{{ $user->name }}/listavistas" class="btn btn-sm btn-primary mb-2 btn-list">Ver Lista</a>
                                <button class="btn btn-follow" data-user-id="{{ $user->id }}"
                                    data-is-following="{{ $currentUser->siguiendo()->where('seguido_id', $user->id)->exists() ? 'true' : 'false' }}">
                                    {{ $currentUser->siguiendo()->where('seguido_id', $user->id)->exists() ? 'Dejar de seguir' : 'Seguir' }}
                                </button>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            {{ $users->links() }}
        @else
            <p>No se encontraron usuarios</p>
        @endif
    </div>
</div>
@endsection