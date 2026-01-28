const CACHE_NAME = 'koperasi-pwa-v1';

const BASE = '/Design-Koperasi-EGS';

const ASSETS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,

  // CSS
  `${BASE}/assets/compiled/css/app.css`,
  `${BASE}/assets/compiled/css/app-dark.css`,
  `${BASE}/assets/compiled/css/iconly.css`,
  `${BASE}/assets/custom.css`,

  // JS
  `${BASE}/assets/compiled/js/app.js`,
  `${BASE}/assets/script.js`,

  // Pages
  `${BASE}/members-simpanan.html`,
  `${BASE}/members-profile.html`,

  // Icons
  `${BASE}/assets/icons/icon-192.png`,
  `${BASE}/assets/icons/icon-512.png`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
