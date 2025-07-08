
window.addEventListener('DOMContentLoaded', iniciar);

function iniciar(){
    caruselTopAnimes();
    animesTemporada();
    futurosAnimes();
    
    
}



async function caruselTopAnimes(){


    try{
        let url = "https://api.jikan.moe/v4/top/anime";

        let response = await fetch(url);

        

        if(!response.ok){
            throw new Error(response.statusText);

        }

        let datos = await response.json();
        let contenedor = document.getElementById('contenedorTop');
        //la llamada devuelve 25 elementos pero lo recorto a 24 para ser un numero par 
        let top24 = datos.data.slice(0,24);

        contenedor.innerHTML = '';

        //bucle para generar un item del carusel que contiene 6 cartas por item
        for (let i = 0; i < top24.length; i += 6) {
            let divCarousel = document.createElement('div');
            divCarousel.classList.add('carousel-item');
            if (i === 0) {
                divCarousel.classList.add('active');}
                
            let row = document.createElement('div');
            row.classList.add('row', 'justify-content-center');
            // este codigo del principio me evita que se sigan generando cartas si el bucle pasa de la longitud de la lista
            let finalLista = Math.min(i + 6, top24.length);
            top24.slice(i, finalLista).forEach(anime => {
                let portada = anime.images.jpg.image_url;
                let titulo = anime.title;
                let animeId = anime.mal_id;

                let divCol = document.createElement('div');
                divCol.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'mb-3');

                let carta = document.createElement('div');
                carta.classList.add('card', 'dCarta');
                carta.addEventListener('click', () => {
                    window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
                });

                let imagenCarta = document.createElement('img');
                imagenCarta.classList.add('card-img');
                imagenCarta.src = portada;

                let tituloCarta = document.createElement('h6');
                tituloCarta.id = 'tituloTop';
                tituloCarta.textContent = titulo;

                carta.append(imagenCarta, tituloCarta);
                divCol.appendChild(carta);
                row.appendChild(divCol);
            });

            divCarousel.appendChild(row);
            contenedor.appendChild(divCarousel);
        }
      
    } catch(error){
        console.log(error);
    }
    
}


async function animesTemporada(){
    try{
        let url = "https://api.jikan.moe/v4/seasons/now";

        let response = await fetch(url);

        

        if(!response.ok){
            throw new Error(response.statusText);

        }

        let datos = await response.json();
        let contenedor = document.getElementById('contenedorTemporada');
        //la llamada devuelve 25 elementos pero lo recorto a 24 para ser un numero par 
        let top24 = datos.data.slice(0,24);

        contenedor.innerHTML = '';

        //bucle para generar un item del carusel que contiene 6 cartas por item
        for (let i = 0; i < top24.length; i += 6) {
            let divCarousel = document.createElement('div');
            divCarousel.classList.add('carousel-item');
            if (i === 0) {
                divCarousel.classList.add('active');}
                
            let row = document.createElement('div');
            row.classList.add('row', 'justify-content-center');
            // este codigo del principio me evita que se sigan generando cartas si el bucle pasa de la longitud de la lista
            let finalLista = Math.min(i + 6, top24.length);
            top24.slice(i, finalLista).forEach(anime => {
                let portada = anime.images.jpg.image_url;
                let titulo = anime.title;
                let animeId = anime.mal_id;

                let divCol = document.createElement('div');
                divCol.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'mb-3');

                let carta = document.createElement('div');
                carta.classList.add('card', 'dCarta');
                carta.addEventListener('click', () => {
                    window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
                });

                let imagenCarta = document.createElement('img');
                imagenCarta.classList.add('card-img');
                imagenCarta.src = portada;

                let tituloCarta = document.createElement('h6');
                tituloCarta.id = 'tituloTop';
                tituloCarta.textContent = titulo;

                carta.append(imagenCarta, tituloCarta);
                divCol.appendChild(carta);
                row.appendChild(divCol);
            });

            divCarousel.appendChild(row);
            contenedor.appendChild(divCarousel);

        }
      
    } catch(error){
        console.log(error);
    }
}

async function futurosAnimes(){

    try{
    let url = "https://api.jikan.moe/v4/seasons/upcoming";

    let response = await fetch(url);

    

    if(!response.ok){
        throw new Error(response.statusText);

    }

    let datos = await response.json();
    let contenedor = document.getElementById('contenedorLanzamientos');
    //la llamada devuelve 25 elementos pero lo recorto a 24 para ser un numero par 
    let top24 = datos.data.slice(0,24);

    contenedor.innerHTML = '';

    //bucle para generar un item del carusel que contiene 6 cartas por item
    for (let i = 0; i < top24.length; i += 6) {
        let divCarousel = document.createElement('div');
        divCarousel.classList.add('carousel-item');
        if (i === 0) {
            divCarousel.classList.add('active');}
            
        let row = document.createElement('div');
        row.classList.add('row', 'justify-content-center');
        // este codigo del principio me evita que se sigan generando cartas si el bucle pasa de la longitud de la lista
        let finalLista = Math.min(i + 6, top24.length);
        top24.slice(i, finalLista).forEach(anime => {
            let portada = anime.images.jpg.image_url;
            let titulo = anime.title;
            let animeId = anime.mal_id; 

            let divCol = document.createElement('div');
            divCol.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'mb-3');

            let carta = document.createElement('div');
            carta.classList.add('card', 'dCarta');
            carta.addEventListener('click', () => {
                window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
            });

            let imagenCarta = document.createElement('img');
            imagenCarta.classList.add('card-img');
            imagenCarta.src = portada;

            let tituloCarta = document.createElement('h6');
            tituloCarta.id = 'tituloTop';
            tituloCarta.textContent = titulo;

            carta.append(imagenCarta, tituloCarta);
            divCol.appendChild(carta);
            row.appendChild(divCol);
        });

        divCarousel.appendChild(row);
        contenedor.appendChild(divCarousel);

        
        console.log(datos.data);
    }
  
} catch(error){
    console.log(error);
}
}





