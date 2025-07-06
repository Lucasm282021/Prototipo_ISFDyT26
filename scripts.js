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

// Carga dinámica de carreras.html
document.getElementById('linkCarreras').addEventListener('click', function (e) {
    e.preventDefault();

    fetch('carreras.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el contenido');
            return response.text();
        })
        .then(html => {
            const banner = document.querySelector('.banner');
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
