const CACHE_NAME = "my-react-app-cache-v1";
const urlsToCache = [
  "/",
  "/add-item",
  "/dashboard",
  "/item",
  "/item/[id]",
  "/my-account",
];

if (typeof self !== "undefined") {
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });

  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}
