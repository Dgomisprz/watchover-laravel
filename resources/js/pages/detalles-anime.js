window.addEventListener('load', iniciar);

function iniciar(){
detallesAnime();

    mostrarPersonajes();
   // Asignar el evento al botón
    registrarEventoBoton();
    const botonVistas = document.getElementById('addToCompleted');
    botonVistas.addEventListener('click', () => {
        agregarAListaVistas();
    });

}
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('animeId');
function registrarEventoBoton() {
    const boton = document.getElementById('addToPending');
    if (boton) {
        console.log('Botón addToPending encontrado');
        boton.addEventListener('click', () => {
            console.log('Clic en addToPending detectado');
            agregarAListaPendientes();
        });
    } else {
        console.error('Botón addToPending no encontrado');
    }
}

async function detallesAnime(){
    try{
        let url = `https://api.jikan.moe/v4/anime/${animeId}/full`;

        let response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);
    
        }
        
        let datos = await response.json();
        console.log(datos.data);
        //cargamos la imagen
        let cartaImagen = document.getElementById('cartaPortada');
        let portada = document.createElement('img');
        portada.classList.add('card-img')
        portada.src = datos.data.images.jpg.image_url;
        cartaImagen.appendChild(portada);
        //sinopsis
        let sinopsisAnime = document.getElementById('sinopsisAnime');
        let toggleBtn = document.getElementById('botonSinopsis');
        let sinopsisCompleta = datos.data.synopsis;
        
        // recortamos la sinopsis en pantallas mas pequeñas
        if (window.innerWidth < 768 && sinopsisCompleta.length > 50) {
            let sinopsisRecortada = sinopsisCompleta.slice(0, 50) + "...";
            let mostrandoCompleta = false;
        
            sinopsisAnime.innerHTML = sinopsisRecortada;
            toggleBtn.style.display = "inline-block";
        
            toggleBtn.addEventListener("click", () => {
                mostrandoCompleta = !mostrandoCompleta;
                sinopsisAnime.innerHTML = mostrandoCompleta ? sinopsisCompleta : sinopsisRecortada;
                toggleBtn.innerText = mostrandoCompleta ? "Leer menos" : "Leer más";
            });
        } else {
            // En pantallas mas grandes lo muestro todo
            sinopsisAnime.innerHTML = sinopsisCompleta;
            toggleBtn.style.display = "none";
        }
        //trailer video

        let video = document.getElementById('trailerAnime');
        video.src = datos.data.trailer.embed_url;

        //caracteristicas
        let titulo = document.getElementById('titulo');
        titulo.innerHTML = datos.data.title;
        let fechaL = document.getElementById('fecha');
        fechaL.innerHTML = `FECHA DE LANZAMIENTO:  ${new Date(datos.data.aired.from).toLocaleDateString()}`;
        let director = document.getElementById('estudio');
        director.innerHTML = `ESTUDIO DE ANIMACION:  ${datos.data.studios[0].name}`;
        let capitulos = document.getElementById('capitulos');
        capitulos.innerHTML = `CAPITULOS:  ${datos.data.episodes}`;
        let generos = document.getElementById('genero');
        generos.innerHTML = `GENEROS:  ${datos.data.genres.map(g => g.name).join(', ')}`;

    }catch(error){
        console.log(error);
    }
}

async function mostrarPersonajes(){
    try{
        let url = `https://api.jikan.moe/v4/anime/${animeId}/characters`;

        let response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);
    
        }
        
        let datos = await response.json();
        console.log(datos.data);
        //filtramos pjs por roles

        let personajesMain = datos.data.filter(pj => pj.role === 'Main');
        let personajesSecundarios = datos.data.filter(pj=> pj.role === 'Supporting');

        for(let i = 0; i< personajesMain.length ; i+= 3){

            let contenedorMain = document.getElementById('contenedorPj');
            let row = document.createElement('div');
            row.classList.add('row', 'justify-content-flex-start');
            let grupo = personajesMain.slice(i, i + 3);

            grupo.forEach(pj => {
                let imagen = pj.character.images.jpg.image_url;
                let nombre = pj.character.name;

                let divCol = document.createElement('div');
                divCol.classList.add('col-3', 'mb-3');

                let carta = document.createElement('div');
                carta.classList.add('card', 'cartaPj');
                

                let imagenCarta = document.createElement('img');
                imagenCarta.classList.add('card-img');
                imagenCarta.src = imagen;

                let tituloCarta = document.createElement('h6');
                tituloCarta.classList.add('nombrePj');
                tituloCarta.textContent = nombre;

                carta.append(imagenCarta, tituloCarta);
                divCol.appendChild(carta);
                row.appendChild(divCol);
            })
            contenedorMain.appendChild(row);
        }

        for(let i = 0; i< personajesSecundarios.length ; i+= 4){

            let contenedorSecundario = document.getElementById('contenedorPjSecundario');
            let divRow = document.createElement('div');
            divRow.classList.add('row', 'justify-content-flex-start');
            let grupo = personajesSecundarios.slice(i, i + 4);

            grupo.forEach(pj => {
                let imagen = pj.character.images.jpg.image_url;
                let nombre = pj.character.name;

                let divCol = document.createElement('div');
                divCol.classList.add('col-3', 'mb-3');

                let carta = document.createElement('div');
                carta.classList.add('card', 'cartaPj');
                

                let imagenCarta = document.createElement('img');
                imagenCarta.classList.add('card-img');
                imagenCarta.src = imagen;

                let tituloCarta = document.createElement('h6');
                tituloCarta.classList.add('nombrePj');
                tituloCarta.textContent = nombre;

                carta.append(imagenCarta, tituloCarta);
                divCol.appendChild(carta);
                divRow.appendChild(divCol);
            })
            contenedorSecundario.appendChild(divRow);
        }

        
    }catch(error){
        console.log(error);
    }


}

async function agregarAListaPendientes() {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        if (!csrfToken) {
            throw new Error('Token CSRF no encontrado. Asegúrate de incluir <meta name="csrf-token" content="{{ csrf_token() }}"> en el <head>.');
        }

        console.log('Obteniendo datos del anime con animeId:', animeId);
        let url = `https://api.jikan.moe/v4/anime/${animeId}/full`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la API de Jikan: ${response.statusText}`);
        }
        let datos = await response.json();
        let anime = datos.data;
        console.log('Anime a agregar:', anime);

        let animeData = {
            anime_id: anime.mal_id,
            titulo: anime.title,
            imagen: anime.images.jpg.image_url
        };
        console.log('Datos enviados:', animeData);

        let ajaxResponse = await fetch('/watchover-laravel/public/listapendientes/store-ajax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: JSON.stringify(animeData)
        });

        const responseText = await ajaxResponse.text();
        console.log('Respuesta cruda del servidor:', responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`No se pudo parsear la respuesta como JSON: ${responseText.substring(0, 100)}...`);
        }

        console.log('Respuesta parseada:', result);

        if (ajaxResponse.ok) {
            let successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('alert-danger');
            successMessage.classList.add('alert-success');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            throw new Error(result.message || `Error en la solicitud al servidor (estado ${ajaxResponse.status})`);
        }
    } catch (error) {
        console.error('Error al agregar a la lista:', error);
        let successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('alert-success');
        successMessage.classList.add('alert-danger');
        successMessage.textContent = error.message || 'Error al agregar el anime a la lista.';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}
async function agregarAListaVistas() {
       try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        if (!csrfToken) {
            throw new Error('Token CSRF no encontrado. Asegúrate de incluir <meta name="csrf-token" content="{{ csrf_token() }}"> en el <head>.');
        }

        console.log('Obteniendo datos del anime con animeId:', animeId);
        let url = `https://api.jikan.moe/v4/anime/${animeId}/full`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la API de Jikan: ${response.statusText}`);
        }
        let datos = await response.json();
        let anime = datos.data;
        console.log('Anime a agregar:', anime);

        let animeData = {
            anime_id: anime.mal_id,
            titulo: anime.title,
            imagen: anime.images.jpg.image_url
        };
        console.log('Datos enviados:', animeData);

        let ajaxResponse = await fetch('/watchover-laravel/public/listavistas/store-ajax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: JSON.stringify(animeData)
        });

        const responseText = await ajaxResponse.text();
        console.log('Respuesta cruda del servidor:', responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`No se pudo parsear la respuesta como JSON: ${responseText.substring(0, 100)}...`);
        }

        console.log('Respuesta parseada:', result);

        if (ajaxResponse.ok) {
            let successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('alert-danger');
            successMessage.classList.add('alert-success');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            throw new Error(result.message || `Error en la solicitud al servidor (estado ${ajaxResponse.status})`);
        }
    } catch (error) {
        console.error('Error al agregar a la lista:', error);
        let successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('alert-success');
        successMessage.classList.add('alert-danger');
        successMessage.textContent = error.message || 'Error al agregar el anime a la lista.';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}
async function ___agregarAListaVistas() {
    try {
        // Verificar si el token CSRF existe
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        console.log('Token CSRF:', csrfToken);
        if (!csrfToken) {
            throw new Error('Token CSRF no encontrado. Asegúrate de incluir <meta name="csrf-token" content="{{ csrf_token() }}"> en el <head>.');
        }

        // Obtener datos del anime
        console.log('Obteniendo datos del anime con animeId:', animeId);
        let url = `https://api.jikan.moe/v4/anime/${animeId}/full`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la API de Jikan: ${response.statusText}`);
        }
        let datos = await response.json();
        let anime = datos.data;
        console.log('Anime a agregar:', anime);

        // Preparar datos para enviar
        let animeData = {
            anime_id: anime.mal_id,
            titulo: anime.title,
            imagen: anime.images.jpg.image_url,
            _token: csrfToken
        };
        console.log('Datos enviados:', animeData);

        // Enviar solicitud AJAX
        console.log('Enviando solicitud AJAX a /listavistas/store-ajax');
        let ajaxResponse = await fetch('/watchover-laravel/public/listavistas/store-ajax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': animeData._token
            },
            body: JSON.stringify(animeData)
        });

        // Registrar la respuesta cruda
        const responseText = await ajaxResponse.text();
        console.log('Respuesta cruda del servidor:', responseText);

        // Intentar parsear como JSON
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`No se pudo parsear la respuesta como JSON: ${responseText.substring(0, 100)}...`);
        }

        console.log('Respuesta parseada:', result);

        if (ajaxResponse.ok) {
            let successMessage = document.getElementById('successMessage');
            successMessage.textContent = result.message;
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            throw new Error(result.message || `Error en la solicitud al servidor (estado ${ajaxResponse.status})`);
        }
    } catch (error) {
        console.error('Error al agregar a la lista:', error);
        let successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('alert-success');
        successMessage.classList.add('alert-danger');
        successMessage.textContent = error.message || 'Error al agregar el anime a la lista.';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}


