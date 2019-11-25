const staticCacheName = "site-static-v1";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/style.css",
  "/css/materialize.min.css",
  "/img/logo.jpg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.gstatic.com/s/calistoga/v1/6NUU8F2OJg6MeR7l4e0fvMwB8dQ.woff2",
  "https://fonts.gstatic.com/s/calistoga/v1/6NUU8F2OJg6MeR7l4e0fs8wB.woff2"
];

//  install service worker
self.addEventListener("install", evt => {
  // console.log("service worker has been installed!");
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

//  activate event
self.addEventListener("activate", evt => {
  // console.log("service worker has been activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

//  fetch event
self.addEventListener("fetch", evt => {
  // console.log("fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
