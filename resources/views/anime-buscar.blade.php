@extends('layouts.app')

@section('title', 'Home - WatchOver')

@section('extra-head')
    @vite(['resources/js/pages/buscar-animes.js'])
@endsection

@section('content')
<div class="container-fluid justify-content-center" id="contenedorBuscar">
        <div class="contenedor-filtros">
          <div class="input-group rounded">
            <input type="search" id="buscador" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          </div>
          <select id="filtroGenero" class="form-select rounded">
            <option value="">Géneros</option>
            <option value="Action">Accion</option>
            <option value="Adventure">Aventura</option>
            <option value="Comedy">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasia</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Misterio</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Slice of Life">Slice of Life</option>
            <option value="Sports">Deportes</option>
        </select>
        </div>

        <div class="container-fluid" id="cAnimes">
            
          
        </div>
      </div>
@endsection

