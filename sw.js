const CACHE_NAME = 'ad-boca-da-mata-v2';
const urlsToCache = [
    'index.html',
    'cultos.html',
    'departamentos.html',
    'secretaria.html',
    'doacoes.html',
    'fotos.html',
    'localizacao.html',
    'pastores.html',
    'style.css',
    'script.js',
    'manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});