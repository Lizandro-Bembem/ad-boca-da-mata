const CACHE_NAME = 'ad-boca-da-mata-v3';
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
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Apaga caches de versões antigas para o site novo aparecer no celular
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(chaves => Promise.all(chaves.filter(c => c !== CACHE_NAME).map(c => caches.delete(c))))
            .then(() => self.clients.claim())
    );
});

// Tenta a internet primeiro (sempre a versão mais nova); se estiver sem internet, usa o cache
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request)
            .then(resposta => {
                if (resposta && resposta.ok && new URL(event.request.url).origin === self.location.origin) {
                    const copia = resposta.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copia));
                }
                return resposta;
            })
            .catch(() => caches.match(event.request))
    );
});