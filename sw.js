const CACHE_NAME = "live4style-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/productos.html",
  "/sobre-nosotros.html",
  "/sucursales.html",
  "/contacto.html",
  "/css/styles.css",
  "/js/main.js",
  "/img/logo.jpg",
  "/img/icono.ico"
];

// INSTALAR SW Y CACHEAR ARCHIVOS
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Cacheando archivos");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// ACTIVAR SW Y LIMPIAR CACHES ANTIGUAS
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// INTERCEPTAR PETICIONES
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si existe en cache → lo devuelve
      if (cachedResponse) return cachedResponse;

      // Sino lo pide a la red
      return fetch(event.request).catch(() =>
        // Si falla (offline), devuelve el index o una página fallback
        caches.match("/index.html")
      );
    })
  );
});
