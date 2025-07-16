// galeria.js
// Imágenes sin sección
const imagenes = [
    { src: 'Img/slide1.jpg', descripcion: 'Acto institucional' },
    { src: 'Img/slide2.jpg', descripcion: 'Jornada de capacitación' },
    { src: 'Img/slide3.jpg', descripcion: 'Visita educativa' },
    { src: 'Img/baner_instituto.jpeg', descripcion: 'Fachada del instituto' },
    { src: 'Img/baner_instituto_1.jpeg', descripcion: 'Banner institucional' },
    { src: 'Img/logo26.png', descripcion: 'Logo institucional' }
];

function cargarGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;
    grid.innerHTML = '';
    imagenes.forEach(img => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.descripcion}" class="img-thumbnail" />
            <div class="overlay">${img.descripcion}</div>
        `;
        grid.appendChild(item);
    });
}

// Modal para ampliar imagen
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('img-thumbnail')) {
        mostrarModalImagen(e.target.src);
    }
});

function mostrarModalImagen(src) {
    let modal = document.getElementById('modal-galeria');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-galeria';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '99999';
        modal.innerHTML = `<img src="${src}" class="modal-img"/><span style="position:absolute;top:20px;right:40px;font-size:2rem;color:#fff;cursor:pointer;" id="cerrar-modal-galeria">&times;</span>`;
        document.body.appendChild(modal);
    } else {
        modal.querySelector('img').src = src;
        modal.style.display = 'flex';
    }
    document.getElementById('cerrar-modal-galeria').onclick = function() {
        modal.style.display = 'none';
    };
}

// Export para uso dinámico
window.cargarGaleria = cargarGaleria;
