// 🌙 MODO OSCURO CON PERSISTENCIA
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
}

// Si el usuario ya tenía activado el modo oscuro, se aplica automáticamente
if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
}

// 📄 CARGA DINÁMICA DE carreras.html
const linkCarreras = document.getElementById('linkCarreras');
if (linkCarreras) {
    linkCarreras.addEventListener('click', function (e) {
        e.preventDefault();

        fetch('carreras.html')
            .then(response => {
                if (!response.ok) throw new Error('No se pudo cargar el contenido');
                return response.text();
            })
            .then(html => {
                const banner = document.querySelector('.banner');
                if (!banner) return;

                banner.classList.remove('animado');
                banner.innerHTML = html;

                // Estilo del nuevo contenido del banner
                banner.style.backgroundImage = "url('Img/baner_instituto.jpeg')";
                banner.style.backgroundSize = "cover";
                banner.style.backgroundPosition = "center";
                banner.style.backgroundRepeat = "no-repeat";
                banner.style.color = "#1c244b";
            })
            .catch(error => {
                console.error('Error al cargar carreras.html:', error);
                const banner = document.querySelector('.banner');
                if (banner) banner.innerHTML = '<p>Error al cargar el contenido.</p>';
            });
    });
}

// 🖼️ CAMBIO DE IMAGEN EN GALERÍA DESTACADA
function cambiarImagen(elemento) {
    const imagenActiva = document.getElementById("imagenActiva");
    if (!imagenActiva || !elemento) return;

    // Efecto de desvanecimiento
    imagenActiva.style.opacity = 0;

    setTimeout(() => {
        imagenActiva.src = elemento.src;
        imagenActiva.style.opacity = 1;
    }, 200);

    // Actualiza miniatura activa
    document.querySelectorAll(".miniaturas img").forEach(img => {
        img.classList.remove("activa");
    });
    elemento.classList.add("activa");
}

// Al cargar la página, se marca la primera miniatura como activa
document.addEventListener("DOMContentLoaded", () => {
    const primeraMiniatura = document.querySelector(".miniaturas img");
    if (primeraMiniatura) primeraMiniatura.classList.add("activa");
});

// 📱 MENÚ RESPONSIVE TIPO HAMBURGUESA
const botonMenu = document.querySelector('.menu-toggle');
if (botonMenu) {
    botonMenu.addEventListener('click', () => {
        document.getElementById('scrollMenu').classList.toggle('show');
    });

    // Opcional: cerrar menú al hacer clic en algún enlace del nav
    document.querySelectorAll('#scrollMenu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('scrollMenu').classList.remove('show');
        });
    });
}