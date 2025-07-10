// Scroll horizontal del menú
const scrollMenu = document.getElementById('scrollMenu');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

function scrollLeft() {
    scrollMenu.scrollBy({ left: -200, behavior: 'smooth' });
}

function scrollRight() {
    scrollMenu.scrollBy({ left: 200, behavior: 'smooth' });
}

btnLeft.addEventListener('click', scrollLeft);
btnRight.addEventListener('click', scrollRight);

// Ocultar botones si se llega al extremo
const observerOptions = { root: scrollMenu, threshold: 1.0 };
const leftSentinel = document.createElement('li');
leftSentinel.style.width = '1px';
scrollMenu.insertBefore(leftSentinel, scrollMenu.firstChild);

const rightSentinel = document.createElement('li');
rightSentinel.style.width = '1px';
scrollMenu.appendChild(rightSentinel);

const leftObserver = new IntersectionObserver((entries) => {
    btnLeft.classList.toggle('hidden', entries[0].isIntersecting);
}, observerOptions);

const rightObserver = new IntersectionObserver((entries) => {
    btnRight.classList.toggle('hidden', entries[0].isIntersecting);
}, observerOptions);

leftObserver.observe(leftSentinel);
rightObserver.observe(rightSentinel);

// Modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
}

// Carga dinámica de carreras.html desde el botón del menú
document.getElementById('linkCarreras').addEventListener('click', function (e) {
    e.preventDefault();

    fetch('carreras.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el contenido');
            return response.text();
        })
        .then(html => {
            const banner = document.querySelector('.banner');
            banner.classList.remove('animado');
            banner.innerHTML = html;
            banner.style.backgroundImage = "url('Img/baner_instituto.jpeg')";
            banner.style.backgroundSize = "cover";
            banner.style.backgroundPosition = "center";
            banner.style.backgroundRepeat = "no-repeat";
            banner.style.color = "#1c244b";
        })
        .catch(error => {
            console.error('Error al cargar carreras.html:', error);
            document.querySelector('.banner').innerHTML = '<p>Error al cargar el contenido.</p>';
        });
});
// Cambiar imagen principal y actualizar alt
function cambiarImagen(elemento) {
    const imagenActiva = document.getElementById("imagenActiva");
    imagenActiva.src = elemento.src;
    imagenActiva.alt = elemento.alt;
    document.querySelectorAll(".miniaturas img").forEach(img => {
        img.classList.remove("activa");
    });
    elemento.classList.add("activa");
}
// Al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const primera = document.querySelector(".miniaturas img");
    if (primera) {
        primera.classList.add("activa");
        document.getElementById("imagenActiva").alt = primera.alt;
    }
    // Abrir modal al hacer clic en la imagen principal
    const imagenActiva = document.getElementById("imagenActiva");
    if (imagenActiva) {
        imagenActiva.addEventListener("click", () => {
            const modal = document.getElementById("modalImagen");
            const imagenAmpliada = document.getElementById("imagenAmpliada");
            const pieDeFoto = document.getElementById("pieDeFoto");
            imagenAmpliada.src = imagenActiva.src;
            pieDeFoto.textContent = imagenActiva.alt || "Imagen destacada";
            modal.style.display = "block";
        });
    }
    // Cerrar modal al presionar Esc o hacer clic fuera de la imagen
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarModal();
    });
    document.getElementById("modalImagen").addEventListener("click", (e) => {
        if (e.target.id === "modalImagen") cerrarModal();
    });
});
// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modalImagen").style.display = "none";
}

