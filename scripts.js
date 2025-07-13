// === 1. Scroll horizontal del menú ===
const scrollMenu = document.getElementById("scrollMenu");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

btnLeft.addEventListener("click", () => {
  scrollMenu.scrollBy({ left: -200, behavior: "smooth" });
});
btnRight.addEventListener("click", () => {
  scrollMenu.scrollBy({ left: 200, behavior: "smooth" });
});

// Sentinelas para mostrar/ocultar botones
const observerOptions = { root: scrollMenu, threshold: 1.0 };
const leftSentinel = document.createElement("li");
leftSentinel.style.width = "1px";
scrollMenu.insertBefore(leftSentinel, scrollMenu.firstChild);

const rightSentinel = document.createElement("li");
rightSentinel.style.width = "1px";
scrollMenu.appendChild(rightSentinel);

new IntersectionObserver((entries) => {
  btnLeft.classList.toggle("hidden", entries[0].isIntersecting);
}, observerOptions).observe(leftSentinel);

new IntersectionObserver((entries) => {
  btnRight.classList.toggle("hidden", entries[0].isIntersecting);
}, observerOptions).observe(rightSentinel);

// === 2. Modo oscuro persistente ===
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const activo = document.body.classList.contains("dark-mode");
  localStorage.setItem("modoOscuro", activo);
}

if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("dark-mode");
}

// === 3. Carga dinámica de secciones (usado en "Carreras") ===
function cargarSeccion(url, contenedorSelector, callback) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar el contenido");
      return res.text();
    })
    .then((html) => {
      const contenedor = document.querySelector(contenedorSelector);
      if (!contenedor) return;

      contenedor.innerHTML = html;

      // Si es el banner, restaurar fondo
      if (contenedor.classList.contains("banner")) {
        Object.assign(contenedor.style, {
          backgroundImage: "url('Img/baner_instituto.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#1c244b",
        });
        contenedor.classList.remove("animado");
      }

      if (typeof callback === "function") callback();
    })
    .catch((err) => {
      console.error(`Error al cargar ${url}:`, err);
      const contenedor = document.querySelector(contenedorSelector);
      if (contenedor) contenedor.innerHTML = "<p>Error al cargar el contenido.</p>";
    });
}

// === 4. Inicialización de galería destacada ===
function initGaleriaDestacada() {
  const imagenActiva = document.getElementById("imagenActiva");
  const miniaturas = document.querySelectorAll(".miniatura");

  if (miniaturas.length > 0 && imagenActiva) {
    miniaturas[0].classList.add("activa");
    imagenActiva.alt = miniaturas[0].alt;
  }

  miniaturas.forEach((img) => {
    img.addEventListener("click", () => {
      imagenActiva.src = img.src;
      imagenActiva.alt = img.alt;
      miniaturas.forEach((i) => i.classList.remove("activa"));
      img.classList.add("activa");
    });
  });
}

// === 5. Activación inicial del sitio ===
document.addEventListener("DOMContentLoaded", () => {
  initGaleriaDestacada();

  const btnCarreras = document.getElementById("linkCarreras");
  if (btnCarreras) {
    btnCarreras.addEventListener("click", (e) => {
      e.preventDefault();
      cargarSeccion("carreras.html", ".banner", initGaleriaDestacada);
    });
  }
});

