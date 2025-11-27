const CACHE_NAME = 'miapp-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for precached assets; network-fallback otherwise
self.addEventListener('fetch', event => {
  const req = event.request;
  // Optional: ignore non-GET, or external domains
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(cachedRes => {
      if (cachedRes) return cachedRes;
      return fetch(req).then(networkRes => {
        // Optionally cache runtime requests
        return caches.open(CACHE_NAME).then(cache => {
          // Avoid caching opaque responses unnecessarily
          if (networkRes && networkRes.type === 'basic') {
            cache.put(req, networkRes.clone());
          }
          return networkRes;
        });
      }).catch(() => {
        // Fallback page if needed
        if (req.mode === 'navigate') return caches.match('/offline.html');
      });
    })
  );
});
