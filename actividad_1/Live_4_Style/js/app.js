// ====== Live 4 Style - main.js ======
console.log("Live 4 Style JS cargado correctamente ✅");

// Selección de elementos
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");

// === FUNCIONALIDAD: menú hamburguesa ===
menuToggle.addEventListener("click", () => {
  // Alterna clases activas
  navbar.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// === CIERRA MENÚ al hacer clic en un enlace (en móviles) ===
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});

// === OPCIONAL: Cambiar color del header al hacer scroll ===
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
