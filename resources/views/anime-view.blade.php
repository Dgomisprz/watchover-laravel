@extends('layouts.app')

@section('title', 'Home - WatchOver')

@section('extra-head')
    @vite(['resources/js/pages/detalles-anime.js'])
@endsection

@section('content')
 <div class="container-fluid justify-content-center" id="contenedorAnime">
        <div class="row">
            <div class="col col-4">
                <h3 id="titulo"></h3>
                <div class="card " id="cartaPortada">

                </div>
                <p id="fecha">FECHA DE LANZAMIENTO: </p>
                <p id="estudio">ESTUDIO DE ANIMACION</p>
                <p id="capitulos">CAPITULOS:</p>
                <p id="genero">GENERO:</p>
                @guest
                @else
                <!-- Botón para agregar a la lista -->
                <button id="addToCompleted" class="btn btn-primary mt-3">Agregar a Lista Vista</button>
                <button id="addToPending" class="btn btn-primary mt-3">Agregar a Lista Pendiente</button>
                <!-- Área para el mensaje de éxito -->
                <div id="successMessage" class="alert alert-success mt-3" style="display: none;"></div>
                @endauth
            </div>
            <div class="col col-8">
                <div class="container-fluid">
                    <h3>TRAILER</h3>
                    <iframe width="920" height="505" src="" id="trailerAnime">
                        <p>Hola trailer</p>
                    </iframe>
                </div>
                <h3>SINOPSIS</h3>
                <p id="sinopsisAnime"></p>
                <button id="botonSinopsis" style="display: none;">Leer más</button>
                <h3>PERSONAJES</h3>
                <p>Protagonistas</p>
                <div class="container-fluid" id="contenedorPj">

                </div>
                <p>Secundarios</p>
                <div class="container-fluid" id="contenedorPjSecundario">

                </div>
            </div>

        </div>


    </div>
@endsection


