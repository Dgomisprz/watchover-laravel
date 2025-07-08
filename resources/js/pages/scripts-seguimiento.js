window.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
    const botonesFollow = document.querySelectorAll('.btn-follow');
    botonesFollow.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const userId = boton.getAttribute('data-user-id');
            const isFollowing = boton.getAttribute('data-is-following') === 'true';
            if (isFollowing) {
                dejarDeSeguir(userId, boton);
            } else {
                seguir(userId, boton);
            }
        });
    });
}

async function seguir(userId, boton) {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
            throw new Error('Token CSRF no encontrado');
        }

        const baseUrl = '/watchover-laravel/public';
        const url = `${baseUrl}/follow/${userId}`;
        console.log('Enviando solicitud POST a:', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const responseText = await response.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`No se pudo parsear la respuesta como JSON: ${responseText.substring(0, 100)}...`);
        }

        if (!response.ok) {
            throw new Error(data.message || `Error al seguir usuario (estado ${response.status})`);
        }

        // Actualizar botón
        boton.textContent = 'Dejar de seguir';
        boton.setAttribute('data-is-following', 'true');

        // Mostrar mensaje de éxito
        const alertContainer = document.getElementById('alert-container');
        if (alertContainer) {
            alertContainer.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        const alertContainer = document.getElementById('alert-container');
        if (alertContainer) {
            alertContainer.innerHTML = `<div class="alert alert-danger">No se pudo seguir al usuario: ${error.message}</div>`;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 5000);
        }
    }
}

async function dejarDeSeguir(userId, boton) {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
            throw new Error('Token CSRF no encontrado');
        }

        const baseUrl = '/watchover-laravel/public';
        const url = `${baseUrl}/unfollow/${userId}`;
        console.log('Enviando solicitud POST a:', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const responseText = await response.text();
        console.log('Respuesta cruda del servidor:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`No se pudo parsear la respuesta como JSON: ${responseText.substring(0, 100)}...`);
        }

        if (!response.ok) {
            throw new Error(data.message || `Error al dejar de seguir usuario (estado ${response.status})`);
        }

        // Actualizar botón
        boton.textContent = 'Seguir';
        boton.setAttribute('data-is-following', 'false');

        // Mostrar mensaje de éxito
        const alertContainer = document.getElementById('alert-container');
        if (alertContainer) {
            alertContainer.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        const alertContainer = document.getElementById('alert-container');
        if (alertContainer) {
            alertContainer.innerHTML = `<div class="alert alert-danger">No se pudo dejar de seguir al usuario: ${error.message}</div>`;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 5000);
        }
    }
}