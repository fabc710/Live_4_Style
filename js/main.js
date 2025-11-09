// ====== Live 4 Style - main.js ======
console.log("✅ Live 4 Style JS cargado correctamente");

// ===== Selección de elementos =====
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector(".header");

// === FUNCIONALIDAD: menú hamburguesa ===
if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    // Alterna la visibilidad del menú
    navbar.classList.toggle("active");
    menuToggle.classList.toggle("open"); // 'open' para animar la X
  });
}

// === CIERRA MENÚ al hacer clic en un enlace (en móviles) ===
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});

// === EFECTO: cambia color del header al hacer scroll ===
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});
