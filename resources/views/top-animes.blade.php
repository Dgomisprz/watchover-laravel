@extends('layouts.app')

@section('title', 'Home - WatchOver')

@section('extra-head')
    @vite(['resources/js/pages/top-animes.js'])
@endsection

@section('content')
<div class="container-fluid justify-content-center" id="contenedorRanking">
        <h3>RANKING DE ANIMES</h3>
        <div class="container" id="contenedorElementos">
            <div class="row" id="filaRankings">
              <div class="col col-2"><span>RANK</span></div>
              <div class="col col-4"><span>PORTADA</span></div>
              <div class="col col-4"><span>TITULO</span></div>
              <div class="col col-2"><span>PUNTAJE</span></div>
            </div>
        </div>
      </div>
@endsection

