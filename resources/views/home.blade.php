@extends('layouts.app')

@section('title', 'Home - WatchOver')

@section('extra-head')
    @vite(['resources/js/pages/prueba-api.js'])
@endsection

@section('content')
    <div class="container-fluid justify-content-center" id="contenedorHome">
        <div class="container-fluid" id="contenedor1">
            <h3 id="tituloC1">La nueva forma de vivir tu hobby</h3>
            <p id="textoC1">Estate informado de los actuales y últimos lanzamientos, <br> descubre y comparte tus gustos de series de anime con tus amigos con Watchover, <br> la nueva plataforma de catálogo para series de animación japonesa</p>
            <div class="container" id="contenedor2">
                <div class="row row-cols-2">
                    <div class="col" id="apartadoHome">
                        <h4>Ponte al día</h4>
                        <p>Busca toda la información sobre cualquier título de anime que te apetezca y enterate de los próximos lanzamientos.</p>
                    </div>
                    <div class="col" id="apartadoHome">
                        <h4>Personaliza tu experiencia</h4>
                        <p>Crea listas personalizadas para llevar un seguimiento de las series que has visto o quieres ver en un futuro.</p>
                    </div>
                    <div class="col" id="apartadoHome">
                        <h4>Conecta con tus amigos</h4>
                        <p>Crea tu perfil, sigue a tus amigos y compartid entre vosotros vuestras listas.</p>
                    </div>
                    <div class="col" id="apartadoHome">
                        <h4>No te pierdas nada</h4>
                        <p>Todo tu contenido organizado de manera simple y visual para que no pierdas el tiempo buscando la informacion.</p>
                    </div>
                </div>
            </div>
            <a href="{{ route('login') }}" class="btn btn-primary btn-lg" id="botonHome">Empieza ya
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
            </a>
        </div>
        <h3><a href="{{ route('top-anime') }}">TOP ANIMES</a></h3>
        <div class="row max-auto my-auto justify-content-center contenedorCarusel">
            <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000" data-bs-pause="hover">
                <div class="carousel-inner" role="listbox" id="contenedorTop"></div>
            </div>
            <div class="carousel-botones d-flex justify-content-center mt-3">
                <button class="btn btn-carrusel me-3" data-bs-target="#recipeCarousel" data-bs-slide="prev">
                    <i class="bi bi-arrow-left-circle"></i>
                </button>
                <button class="btn btn-carrusel" data-bs-target="#recipeCarousel" data-bs-slide="next">
                    <i class="bi bi-arrow-right-circle"></i>
                </button>
            </div>
        </div>
        <h3>ANIMES DE TEMPORADA</h3>
        <div class="row max-auto my-auto justify-content-center contenedorCarusel">
            <div id="recipeCarouselTemporada" class="carousel slide cTemporada" data-bs-ride="carousel" data-bs-interval="6000" data-bs-pause="hover">
                <div class="carousel-inner" role="listbox" id="contenedorTemporada"></div>
            </div>
            <div class="carousel-botones d-flex justify-content-center mt-3">
                <button class="btn btn-carrusel me-3" data-bs-target="#recipeCarouselTemporada" data-bs-slide="prev">
                    <i class="bi bi-arrow-left-circle"></i>
                </button>
                <button class="btn btn-carrusel" data-bs-target="#recipeCarouselTemporada" data-bs-slide="next">
                    <i class="bi bi-arrow-right-circle"></i>
                </button>
            </div>
        </div>
        <h3>PRÓXIMOS LANZAMIENTOS</h3>
        <div class="row max-auto my-auto justify-content-center contenedorCarusel">
            <div id="recipeCarouselLanzamientos" class="carousel slide cLanzamientos" data-bs-ride="carousel" data-bs-interval="6000" data-bs-pause="hover">
                <div class="carousel-inner" role="listbox" id="contenedorLanzamientos"></div>
            </div>
            <div class="carousel-botones d-flex justify-content-center mt-3">
                <button class="btn btn-carrusel me-3" data-bs-target="#recipeCarouselLanzamientos" data-bs-slide="prev">
                    <i class="bi bi-arrow-left-circle"></i>
                </button>
                <button class="btn btn-carrusel" data-bs-target="#recipeCarouselLanzamientos" data-bs-slide="next">
                    <i class="bi bi-arrow-right-circle"></i>
                </button>
            </div>
        </div>
    </div>
@endsection