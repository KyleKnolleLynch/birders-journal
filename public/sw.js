const staticCache = 'site-static-v2';
const dynamicCache = 'site-dynamic-v2';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/style.css',
  '/css/materialize.min.css',
  '/img/logo-bird.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'https://fonts.googleapis.com/css?family=Calistoga&display=swap',
  'https://fonts.gstatic.com/s/calistoga/v1/6NUU8F2OJg6MeR7l4e0fvMwB8dQ.woff2',
  'https://fonts.gstatic.com/s/calistoga/v1/6NUU8F2OJg6MeR7l4e0fs8wB.woff2',
  '/pages/notFound.html'
];

//  limit cache size
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//  install service worker
self.addEventListener('install', evt => {
  // console.log("service worker has been installed!");
  evt.waitUntil(
    caches.open(staticCache).then(cache => {
      // console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

//  activate event
self.addEventListener('activate', evt => {
  // console.log("service worker has been activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCache && key !== dynamicCache)
          .map(key => caches.delete(key))
      );
    })
  );
});

//  fetch event
self.addEventListener('fetch', evt => {
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(evt.request).then(fetchRes => {
              return caches.open(dynamicCache).then(cache => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 20);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.includes('.html')) {
            return caches.match('/pages/notFound.html');
          }
        })
    );
  }
});
