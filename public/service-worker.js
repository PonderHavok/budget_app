const cache = "static-cache-v1";
const dataCache = "data-cache-v1";
const cacheFiles = [
  "/",
  "/index.html",
  "/db.js",
  "/index.js",
  "/favicon.ico",
  "/manifest.webmanifest",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cache).then((cache) => {
      console.log(cache);
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches
        .open(dataCache)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch((error) => {
              console.log(error);
              return cache.match(event.request);
            });
        })
        .catch((error) => {
          console.log(error);
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/");
        }
      });
    })
  );
});
