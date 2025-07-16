// 🌙 MODO OSCURO CON PERSISTENCIA
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
}

// Si el usuario ya tenía activado el modo oscuro, se aplica automáticamente
if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
}

// CARGA DINÁMICA DE carreras.html
const linkCarreras = document.getElementById('linkCarreras');
if (linkCarreras) {
    linkCarreras.addEventListener('click', function (e) {
        e.preventDefault();
        fetch('secciones/carreras/carreras.html')
            .then(response => {
                if (!response.ok) throw new Error('No se pudo cargar el contenido');
                return response.text();
            })
            .then(html => {
                const banner = document.querySelector('.banner');
                if (!banner) return;
                banner.classList.remove('animado');
                banner.innerHTML = html;
                const linkEstilosCarreras = document.createElement('link');
                linkEstilosCarreras.rel = 'stylesheet';
                linkEstilosCarreras.href = 'secciones/carreras/estilos-carreras.css';
                document.head.appendChild(linkEstilosCarreras);
                banner.style.backgroundImage = "url('Img/baner_instituto_1.jpeg')";
                banner.style.backgroundSize = "cover";
                banner.style.backgroundPosition = "center";
                banner.style.backgroundRepeat = "no-repeat";
                banner.style.color = "#1c244b";
                crearBotonIrArriba();
            })
            .catch(error => {
                console.error('Error al cargar carreras.html:', error);
                const banner = document.querySelector('.banner');
                if (banner) banner.innerHTML = '<p>Error al cargar el contenido.</p>';
            });
    });
}

// CARGA DINÁMICA DE galeria.html
const linkGaleria = document.getElementById('linkGaleria');
if (linkGaleria) {
    linkGaleria.addEventListener('click', function (e) {
        e.preventDefault();
        fetch('secciones/galeria/galeria.html')
            .then(response => {
                if (!response.ok) throw new Error('No se pudo cargar el contenido');
                return response.text();
            })
            .then(html => {
                const banner = document.querySelector('.banner');
                if (!banner) return;
                banner.classList.remove('animado');
                banner.innerHTML = html;
                // Cargar estilos de galería
                const linkEstilosGaleria = document.createElement('link');
                linkEstilosGaleria.rel = 'stylesheet';
                linkEstilosGaleria.href = 'secciones/galeria/estilos-galeria.css';
                document.head.appendChild(linkEstilosGaleria);
                // Cargar JS de galería
                const scriptGaleria = document.createElement('script');
                scriptGaleria.src = 'secciones/galeria/galeria.js';
                scriptGaleria.onload = function() {
                    // Inicializar galería y tabs
                    if (window.cargarGaleria) window.cargarGaleria('institucional');
                    const tabs = document.querySelectorAll('#galeriaTabs button');
                    tabs.forEach(tab => {
                        tab.onclick = function() {
                            tabs.forEach(t => t.classList.remove('active'));
                            this.classList.add('active');
                            window.cargarGaleria(this.getAttribute('data-seccion'));
                        };
                    });
                };
                document.body.appendChild(scriptGaleria);
                // Fondo neutro para galería
                banner.style.backgroundImage = 'none';
                banner.style.backgroundColor = '#f8f9fa';
                banner.style.color = '#1c244b';
                crearBotonIrArriba();
            })
            .catch(error => {
                console.error('Error al cargar galeria.html:', error);
                const banner = document.querySelector('.banner');
                if (banner) banner.innerHTML = '<p>Error al cargar el contenido.</p>';
            });
    });
}

// CAMBIO DE IMAGEN EN GALERÍA DESTACADA
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

// MENÚ RESPONSIVE TIPO HAMBURGUESA
const botonMenu = document.querySelector('.menu-toggle');
if (botonMenu) {
    botonMenu.addEventListener('click', () => {
        document.getElementById('scrollMenu').classList.toggle('show');
    });
    document.querySelectorAll('#scrollMenu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('scrollMenu').classList.remove('show');
        });
    });
}

// BOTÓN PARA IR ARRIBA
function crearBotonIrArriba() {
    let btnIrArriba = document.getElementById('btn-ir-arriba');
    if (!btnIrArriba) {
        btnIrArriba = document.createElement('button');
        btnIrArriba.id = 'btn-ir-arriba';
        btnIrArriba.className = 'btn-ir-arriba';
        btnIrArriba.title = 'Ir arriba';
        btnIrArriba.innerHTML = '⬆️';
        document.body.appendChild(btnIrArriba);
    }
    btnIrArriba.className = 'btn-ir-arriba'; // Unifica clase
    btnIrArriba.style.display = 'none';
    btnIrArriba.style.position = 'fixed';
    btnIrArriba.style.bottom = '30px';
    btnIrArriba.style.right = '30px';
    btnIrArriba.style.zIndex = '9999';
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnIrArriba.style.display = 'block';
        } else {
            btnIrArriba.style.display = 'none';
        }
    });
    btnIrArriba.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

document.addEventListener('DOMContentLoaded', crearBotonIrArriba);

