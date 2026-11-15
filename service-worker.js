const CACHE_NAME = "forklift-safety-shell-v3";
const APP_SHELL = [
  new URL("./", self.registration.scope).href,
  new URL("index.html", self.registration.scope).href,
  new URL("manifest.json", self.registration.scope).href,
  new URL("app-icon-192.png", self.registration.scope).href,
  new URL("app-icon-512.png", self.registration.scope).href,
  new URL("favicon-32.png", self.registration.scope).href
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of APP_SHELL) {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) await cache.put(url, response);
      } catch (error) {
        console.warn("Could not cache app shell resource:", url, error);
      }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("forklift-safety-shell-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      if (event.request.mode === "navigate") {
        const fallback = await caches.match(new URL("index.html", self.registration.scope).href);
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
