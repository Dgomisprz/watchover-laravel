window.addEventListener('DOMContentLoaded', iniciar);

function iniciar(){
    const cartasAnime = document.querySelectorAll('.cartaAnime');
    cartasAnime.forEach(carta => {
        carta.addEventListener('click', () => {
            const animeId = carta.id;
            window.location.href = `/watchover-laravel/public/anime-view?animeId=${animeId}`;
        });
    });
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const animeId = boton.getAttribute('data-anime-id');

            // Confirmar eliminación
            if (confirm('¿Estás seguro de que quieres eliminar este anime de la lista?')) {
                eliminarAnime(animeId, boton);
            }
        });
    });
    
    
}

async function eliminarAnime(animeId, boton) {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
            throw new Error('Token CSRF no encontrado');
        }

        // Determinar si estamos en listavistas o listapendientes
        const isListavistas = window.location.pathname.includes('listavistas');
        const url = isListavistas 
            ? `/watchover-laravel/public/listavistas/${animeId}`
            : `/watchover-laravel/public/listapendientes/${animeId}`;

        console.log('Enviando solicitud DELETE a:', url);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar el anime');
        }

        const data = await response.json();

        // Eliminar la tarjeta de la interfaz
        const tarjeta = boton.closest('.col-6');
        if (tarjeta) {
            tarjeta.remove();
        }

        // Mostrar mensaje de éxito
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = `<div class="alert alert-success">${data.message || 'Anime eliminado de la lista'}</div>`;
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = `<div class="alert alert-danger">No se pudo eliminar el anime: ${error.message}</div>`;
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
    }
}