/* Forklift Safety – service worker v4
   - index.html: network first (so updates show up), cache when offline
   - own files (icons, manifest): cache first, refreshed in the background
   - CDN files (Tailwind, Chart.js, Font Awesome, Inter): saved on first visit so the app works offline
   To release an update, change VERSION below. */
const VERSION = "v12";
const SHELL_CACHE = `forklift-shell-${VERSION}`;
const CDN_CACHE = "forklift-cdn-v1";
const SCOPE = self.registration.scope;

const SHELL = ["./", "index.html", "manifest.json", "app-icon-192.png", "app-icon-512.png",
               "app-icon-maskable-192.png", "app-icon-maskable-512.png", "favicon-32.png", "lion-banner.jpg", "header-logo.png"].map(p => new URL(p, SCOPE).href);

const CDN_HOSTS = ["cdn.tailwindcss.com", "cdn.jsdelivr.net", "cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com"];
const CDN_PRECACHE = [
  "https://cdn.tailwindcss.com",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    for (const url of SHELL) {
      try { const r = await fetch(url, { cache: "reload" }); if (r.ok) await shell.put(url, r); }
      catch (e) { console.warn("Not cached:", url); }
    }
    const cdn = await caches.open(CDN_CACHE);
    for (const url of CDN_PRECACHE) {
      try { await cdn.put(url, await fetch(url, { mode: "no-cors" })); }
      catch (e) { console.warn("Not cached:", url); }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => (k.startsWith("forklift-safety-shell-") || k.startsWith("forklift-shell-")) && k !== SHELL_CACHE)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

const canStore = r => r && (r.ok || r.type === "opaque");

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request, { cache: "no-cache" });
    if (canStore(fresh)) cache.put(request, fresh.clone()).catch(() => {});
    return fresh;
  } catch (e) {
    return (await cache.match(request)) || (fallbackUrl && await cache.match(fallbackUrl)) || Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request).then(r => { if (canStore(r)) cache.put(request, r.clone()).catch(() => {}); return r; }).catch(() => null);
  if (cached) return cached;
  return (await refresh) || Response.error();
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const indexUrl = new URL("index.html", SCOPE).href;

  if (req.mode === "navigate" || url.href === indexUrl) {
    event.respondWith(networkFirst(req, SHELL_CACHE, indexUrl));
  } else if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, SHELL_CACHE));
  } else if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(req, CDN_CACHE));
  }
});
