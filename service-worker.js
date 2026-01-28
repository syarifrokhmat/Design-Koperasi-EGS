const CACHE_NAME = 'koperasi-pwa-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',

  // CSS
  '/assets/compiled/css/app.css',
  '/assets/compiled/css/app-dark.css',
  '/assets/compiled/css/iconly.css',
  '/assets/custom.css',

  // JS
  '/assets/compiled/js/app.js',
  '/assets/script.js',

  // Pages
  '/members-simpanan.html',
  '/members-profile.html',

  // Icons
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate
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

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
