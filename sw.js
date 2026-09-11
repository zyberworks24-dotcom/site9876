/* Zyberworks service worker: offline shell + fast repeat loads. */
const CACHE = 'zw-cache-v1';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './common.js',
  './script.js',
  './preloader.js',
  './transitions.js',
  './e8-assessment.js',
  './data/services.json',
  './data/partners.json',
  './data/clients.json',
  './assets/brand/logo.png',
  './assets/brand/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let cross-origin (fonts) hit the network normally

  // Navigations: network first, fall back to cache, so content stays fresh but works offline.
  if (req.mode === 'navigate'){
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: stale-while-revalidate. Serve cache instantly, refresh it in the
  // background, so a deploy never strands a repeat visitor on old CSS or JS for long.
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic'){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
