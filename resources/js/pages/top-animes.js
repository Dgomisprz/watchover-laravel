window.addEventListener('load', iniciar);

function iniciar(){
    primerRank();
    cargarTopAnimes();

}
let animesCargados = [];

async function cargarTopAnimes(){
    try{

        let page = 2;
        //url base de la api
        const urlBase = "https://api.jikan.moe/v4/top/anime";
        while(page <= 4){

            let url = `${urlBase}?page=${page}`;

            console.log(`Solicitando página ${page}: ${url}`);
            let response = await fetch(url);

    

            if(!response.ok){
                throw new Error(response.statusText);
        
            }
    
            let datos = await response.json();

            
            // cargamos los datos en el array y verificamos si hay mas paginas en la llamada de la api
            let filtro = datos.data.filter(anime => anime.rank != null && anime.rank > 0);
            animesCargados = animesCargados.concat(filtro);

            
            
            page++;
            
            //pequeño retraso para no sobrecargar la api
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            animesCargados.sort((a, b) => a.rank - b.rank);
            maquetarRanking(animesCargados)
            console.log(datos.data);        

        }

              

        

    } catch(error){
        console.log(error);
    }
}

async function primerRank(){

    try{

        let url = "https://api.jikan.moe/v4/top/anime";

        let response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);
    
        }
        let datos = await response.json();
        animesCargados = datos.data;
        animesCargados.sort((a, b) => a.rank - b.rank);
        maquetarRanking(animesCargados);

        
    }catch(error){
        console.log(error);
    }
}

function maquetarRanking(animesCargados){
    let contenedor = document.getElementById('contenedorElementos');
    while (contenedor.children.length > 1) {
        contenedor.removeChild(contenedor.lastChild);
    }

    for(let i = 0; i < animesCargados.length; i++){
        let anime = animesCargados[i];
        let portada = anime.images.jpg.image_url;
        let animeId = anime.mal_id;
        let titulo = anime.title;
        let rank = anime.rank;
        let puntaje = anime.score;

        let divFila = document.createElement('div');
        divFila.classList.add('row', 'filasElementos');
        let divColRank = document.createElement('div');
        divColRank.classList.add('col', 'col-2');
        let ranking = document.createElement('span');
        ranking.innerHTML = rank;
        let divColImg = document.createElement('div');
        divColImg.classList.add('col', 'col-4');
        let divContenedorImg = document.createElement('div');
        divContenedorImg.classList.add('card', 'cartaImagen');
        divContenedorImg.addEventListener('click', () => {
            window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
        });
        let img = document.createElement('img');
        img.classList.add('card-img')
        img.src = portada;
        let divTitulo = document.createElement('div');
        divTitulo.classList.add('col', 'col-4');
        let tituloAnime = document.createElement('span');
        tituloAnime.innerHTML = titulo;
        let divPuntaje = document.createElement('div');
        divPuntaje.classList.add('col', 'col-2');
        let spanPuntaje = document.createElement('span');
        spanPuntaje.innerHTML = puntaje;

        //maquetamos los rankings

        divColRank.appendChild(ranking);
        divContenedorImg.appendChild(img);
        divColImg.appendChild(divContenedorImg);
        divTitulo.appendChild(tituloAnime);
        divPuntaje.appendChild(spanPuntaje);
        divFila.append(divColRank, divColImg, divTitulo, divPuntaje);

        contenedor.appendChild(divFila);
    };
   

}