// ===== Live 4 Style - main.js (Versión optimizada 2025) =====

// Confirmación de carga
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Live 4 Style JS cargado correctamente");

  // ==== Selección de elementos ====
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.querySelector(".header");

  // ==== Menú hamburguesa ====
  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isActive = navbar.classList.toggle("active");
      menuToggle.classList.toggle("open", isActive);

      // Cambiar aria-label para accesibilidad
      menuToggle.setAttribute(
        "aria-label",
        isActive ? "Cerrar menú" : "Abrir menú"
      );
    });
  }

  // ==== Cerrar menú al hacer clic en un enlace (modo móvil) ====
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  });

  // ==== Cambiar color del header al hacer scroll ====
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // ejecutar al cargar
});
