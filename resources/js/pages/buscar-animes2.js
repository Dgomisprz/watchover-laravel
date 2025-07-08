window.addEventListener('load', iniciar);

function iniciar() {
    primeraPagina();
    let buscador = document.getElementById('buscador');
    buscador.addEventListener('input', buscarAnimes);
    let selectGeneros = document.getElementById('filtroGenero');
    selectGeneros.addEventListener('change', filtroGeneros);
    scrollAnimes();
}

let animesCargados = [];
let textoBuscar = '';
let generoSeleccionado = '';
let paginaActual = 1;
let hasNextPage = true;
let isLoading = false;

function scrollAnimes() {
    const contenedor = document.getElementById('cAnimes');
    contenedor.addEventListener('scroll', () => {
        //verifica si el contenedor ha llegado al final o si no hay mas paginas que cargar
        if (isLoading || !hasNextPage) return;

        const limiteContenedor = contenedor.scrollTop + contenedor.scrollHeight >= contenedor.clientHeight -25;
        // Si el el ususario hace scroll hasta el final del contenedor hace una llamada a la api para cargar las siguientes paginas
        if (limiteContenedor) {
            cargarSiguientePagina();
        }
    });
}

async function cargarSiguientePagina() {
    //Evita que haga mas llamadas si ya esta cargando una o no hay mas paginas
    if (isLoading || !hasNextPage) return;
    isLoading = true;
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'block';

    try {
        const urlCompleta = "https://api.jikan.moe/v4/anime";
        paginaActual++;
        const url = `${urlCompleta}?page=${paginaActual}`;
        console.log(`Solicitando página ${paginaActual}: ${url}`);
        const response = await fetch(url);
        console.log('estado:', response.statusText);
        

        const datos = await response.json();
        console.log(datos.genres);
        const filtro = datos.data.filter(anime => {
            return !anime.genres.some(genero => genero.name.toLowerCase() === 'hentai');
        });

        animesCargados = animesCargados.concat(filtro);
        hasNextPage = datos.pagination?.has_next_page || false;

        if (generoSeleccionado) {
            filtroGeneros();
        } else if (textoBuscar) {
            buscarAnimes();
        } else {
            maquetarAnimes(animesCargados);
        }
    } catch (error) {
        console.error('Error al cargar la siguiente página:', error);
    } finally {
        isLoading = false;
        if (spinner) spinner.style.display = 'none';
    }
}

async function primeraPagina() {
    try {
        const url = "https://api.jikan.moe/v4/anime?page=1";
        const response = await fetch(url);
        const datos = await response.json();
        animesCargados = datos.data.filter(anime => {
            return !anime.genres.some(genero => genero.name.toLowerCase() === 'hentai');
        });
        hasNextPage = datos.pagination?.has_next_page || false;
        maquetarAnimes(animesCargados);
    } catch (error) {
        console.error('Error al cargar la primera página:', error);
    }
}

function maquetarAnimes(animesCargados) {
    const contenedor = document.getElementById('cAnimes');
    contenedor.innerHTML = ''; 
    const spinner = document.getElementById('loadingSpinner');
    
            //Bucle para craar filas de 6 animes 
    for (let i = 0; i < animesCargados.length; i += 6) {
        const divFilas = document.createElement('div');
        divFilas.classList.add('row', 'justify-content-center', 'g-3');

        for (let j = i; j < i + 6 && j < animesCargados.length; j++) {
            const anime = animesCargados[j];
            const portada = anime.images.jpg.image_url;
            const animeId = anime.mal_id;
            const titulo = anime.title;

            const divCol = document.createElement('div');
            divCol.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'mb-3');

            const carta = document.createElement('div');
            carta.classList.add('card', 'cartaAnime');
            carta.addEventListener('click', () => {
                window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
            });

            const imagenCarta = document.createElement('img');
            imagenCarta.classList.add('card-img');
            imagenCarta.src = portada;
            imagenCarta.loading = 'lazy';

            const tituloCarta = document.createElement('h6');
            tituloCarta.classList.add('tituloAnime');
            tituloCarta.textContent = titulo;

            carta.append(imagenCarta);
            divCol.append(carta, tituloCarta);
            divFilas.appendChild(divCol);
        }

        contenedor.insertBefore(divFilas, spinner); 
    }
}

function buscarAnimes(event) {
    generoSeleccionado = '';
    document.getElementById('filtroGenero').value = '';
    textoBuscar = event?.target?.value.trim().toLowerCase() || '';
    let filtroAnimes = animesCargados.filter(anime => {
        return anime.title.toLowerCase().includes(textoBuscar);
    });
    maquetarAnimes(filtroAnimes);
}

function filtroGeneros() {
    generoSeleccionado = document.getElementById('filtroGenero').value;
    textoBuscar = '';
    document.getElementById('buscador').value = '';
    let filtroAnimes = animesCargados;
    if (generoSeleccionado) {
        filtroAnimes = animesCargados.filter(anime => {
            return anime.genres.some(genero => genero.name === generoSeleccionado);
        });
    }
    console.log(`Animes encontrados para género "${generoSeleccionado}": ${filtroAnimes.length}`);
    maquetarAnimes(filtroAnimes);
}