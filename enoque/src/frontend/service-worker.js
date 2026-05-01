const CACHE_NAME = "enoque-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./minha-roda.html",
  "./plano-acao.html",
  "./style.css",
  "./app.js",
  "./minha-roda.js",
  "./plano-acao.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Instala o service worker e salva arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e limpa cache antigo
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Busca arquivos do cache primeiro
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});