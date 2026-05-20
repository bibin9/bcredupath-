/* BCRedupath service worker
 * - Network-first for API + dashboard pages (so leaderboard / XP stay fresh)
 * - Cache-first for static assets (fonts, CSS, icon)
 * - Stale-while-revalidate for question-bank pages so offline reading works
 */

const CACHE_VERSION = "v2"; // bump on shipping major UI changes to invalidate stale clients
const STATIC_CACHE = `bcr-static-${CACHE_VERSION}`;
const PAGE_CACHE = `bcr-pages-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.includes(CACHE_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Auth callbacks and POST routes should always hit the network
  if (url.pathname.startsWith("/api/auth")) return;

  // Network-first for API calls — fall back to cached response if offline
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  // Stale-while-revalidate for question-bank pages (good for offline reading)
  if (url.pathname.startsWith("/dashboard/bank")) {
    event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
    return;
  }

  // Network-first for other dashboard pages
  if (url.pathname.startsWith("/dashboard")) {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  // Cache-first for everything else (static assets, fonts)
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

async function networkFirst(req, cacheName) {
  try {
    const fresh = await fetch(req);
    if (fresh.ok) {
      const cache = await caches.open(cacheName);
      cache.put(req, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    return caches.match("/offline.html");
  }
}

async function cacheFirst(req, cacheName) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh.ok) {
      const cache = await caches.open(cacheName);
      cache.put(req, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    return caches.match("/offline.html");
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => cached || caches.match("/offline.html"));
  return cached || fetchPromise;
}
