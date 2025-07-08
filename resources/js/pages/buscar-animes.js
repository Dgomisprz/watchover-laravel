window.addEventListener('load', iniciar);

function iniciar(){
    primeraPagina();
    cargarAnimes();
    let buscador = document.getElementById('buscador');
    buscador.addEventListener('input', buscarAnimes);
    let selectGeneros = document.getElementById('filtroGenero');
    selectGeneros.addEventListener('change', filtroGeneros);
}
let animesCargados = [];

let textoBuscar = '';
let generoSeleccionado = '';


//Codigo para cargar y buscar animes
async function cargarAnimes(){

    

    try{

        let page = 2;
        let hasNextPage = true;
        const urlBase = "https://api.jikan.moe/v4/anime";
        while(hasNextPage){

            let url = `${urlBase}?page=${page}`;

            console.log(`Solicitando página ${page}: ${url}`);
            let response = await fetch(url);

    

            if(!response.ok){
                throw new Error(response.statusText);
        
            }
    
            let datos = await response.json();

            const filtro = datos.data.filter(anime =>{
                return!anime.genres.some(genero => genero.name.toLowerCase() === 'hentai');
            })
            
            // cargamos los datos en el array y verificamos si hay mas paginas en la llamada de la api
            animesCargados = animesCargados.concat(filtro);
            // console.log(`Animes cargados hasta ahora: ${animesCargados.length}`);
            // console.log('Respuesta de la lista:', animesCargados);

            hasNextPage = datos.pagination?.has_next_page || false;
            
            page++;
            
            //pequeño retraso para no sobrecargar la api
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (generoSeleccionado) {
                filtroGeneros();
            } else if (textoBuscar) {
                buscarAnimes();
            } else {
                maquetarAnimes(animesCargados);
            }
             

            console.log(datos.data.genres);         

        }
              

    } catch(error){
        console.log(error);
    }
}


function maquetarAnimes(animesCargados){
    let contenedor = document.getElementById('cAnimes');
    
    contenedor.innerHTML = '';
    for(let i = 0 ; i < animesCargados.length ; i += 6 ){
        

        let divFilas = document.createElement('div');
        divFilas.classList.add('row', 'justify-content-center', 'g-3');

        for (let j = i; j < i + 6 && j < animesCargados.length; j++) {
            
            
            let animes = animesCargados[j];
            let portada = animes.images.jpg.image_url;
            let animeId = animes.mal_id;
            
            let titulo = animes.title;
            
            let divCol = document.createElement('div');
            divCol.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'mb-3');

            let carta = document.createElement('div');
            carta.classList.add('card', 'cartaAnime');
            carta.addEventListener('click', () => {
                window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
            });
            let imagenCarta = document.createElement('img');
            imagenCarta.classList.add('card-img');
            imagenCarta.src = portada;

            let tituloCarta = document.createElement('h6');
            tituloCarta.classList.add( 'tituloAnime');
            tituloCarta.textContent = titulo;

            carta.append(imagenCarta);
            divCol.append(carta, tituloCarta);
            divFilas.appendChild(divCol)

        };
        
        contenedor.appendChild(divFilas);

    }

}

async function primeraPagina(){

    try{

        let url = "https://api.jikan.moe/v4/anime";

        let response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);
    
        }
        let datos = await response.json();
        animesCargados = datos.data;
        maquetarAnimes(animesCargados);

        
    }catch(error){
        console.log(error);
    }
}

function buscarAnimes(event){
    generoSeleccionado = ''; 
    document.getElementById('filtroGenero').value = ''; 
    textoBuscar = event.target.value.trim().toLowerCase();
    let filtroAnimes;
 

   filtroAnimes = animesCargados.filter(animes => {
        return animes.title.toLowerCase().includes(textoBuscar);
    })

    maquetarAnimes(filtroAnimes);
}

function filtroGeneros(){
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
