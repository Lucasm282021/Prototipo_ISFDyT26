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
