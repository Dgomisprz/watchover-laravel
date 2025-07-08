<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'WatchOver')</title>
    <!-- Fuente de letra -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
        rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    @vite(['resources/js/app.js', 'resources/css/app.css'])
    @yield('extra-head')
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid" id="nBar">
            <a class="navbar-brand" href="{{ route('home') }}">WatchOver</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="{{ route('home') }}">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            data-bs-auto-close="false" aria-expanded="false">
                            Anime
                        </a>
                        <ul class="dropdown-menu dropdown-dark">
                            <li><a class="dropdown-item" href="{{ route('buscar-anime') }}">Buscar Anime</a></li>
                            <li><a class="dropdown-item" href="{{ route('top-anime') }}">Ranking Animes</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="dropdown">
                    <button class="btn btn-link nav-link" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                            class="bi bi-person-video" viewBox="0 0 16 16">
                            <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                            <path
                                d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1z" />
                        </svg>
                    </button>
                    <ul class="dropdown-menu dropdown-dark">
                        @guest
                            <li><a class="dropdown-item" href="{{ route('login') }}">Iniciar Sesión</a></li>
                            <li><a class="dropdown-item" href="{{ route('register') }}">Registrarse</a></li>
                        @else
                            <li><a class="dropdown-item" href="/watchover-laravel/public/{{ Auth::user()->name }}/listapendientes">Lista Pendientes</a></li>
                            <li><a class="dropdown-item" href="/watchover-laravel/public/{{ Auth::user()->name }}/listavistas">Lista Vistas</a></li>
                            <li><a class="dropdown-item" href="{{ route('following') }}">Siguiendo</a></li>
                            <li><a class="dropdown-item" href="{{ route('users.search') }}">Buscar Usuarios</a></li>
                            <li><a class="dropdown-item" href="{{ route('perfil.edit') }}">Editar Perfil</a></li>
                            <li>
                                <form action="{{ route('logout') }}" method="POST">
                                    @csrf
                                    <button type="submit" class="dropdown-item">Cerrar Sesión</button>
                                </form>
                            </li>

                        @endauth

                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <main>
        @yield('content')
    </main>

    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p class="col-md-4 mb-0 text-body-primary">© 2025 Company, Inc</p>
        <a href="/"
            class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            aria-label="Bootstrap">
            <svg class="bi me-2" width="40" height="32" aria-hidden="true">
                <use xlink:href="#bootstrap"></use>
            </svg>
        </a>
        <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">Features</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">Pricing</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">FAQs</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-primary">About</a></li>
        </ul>
    </footer>

    @yield('scripts')
</body>

</html>
