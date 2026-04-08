// PZAI Business PWA — Service Worker
// Offline-first caching of the app shell + push notification scaffold.
// VAPID + push server endpoint are placeholders — wire real values in Phase 1.

const CACHE_NAME = 'pzai-business-shell-v0.1.0';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/pages/menu.html',
  '/pages/hours.html',
  '/pages/traffic.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// --- Install: cache the shell ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll fails the whole install on a single 404, so we use individual puts.
      return Promise.all(
        SHELL_ASSETS.map((url) =>
          fetch(url, { cache: 'no-cache' })
            .then((res) => res.ok && cache.put(url, res))
            .catch(() => null)
        )
      );
    })
  );
  self.skipWaiting();
});

// --- Activate: clean old caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// --- Fetch: cache-first for shell, network-first for everything else ---
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isShell = SHELL_ASSETS.includes(url.pathname);

  if (isShell) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Stash a copy in cache for offline fallback
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => null);
        return res;
      })
      .catch(() => caches.match(req))
  );
});

// --- Push notifications scaffold ---
// Phase 1 will replace this with real VAPID-signed pushes from the Flask service.

self.addEventListener('push', (event) => {
  let payload = { title: 'PZAI Business', body: "Time for a quick freshness check." };
  try {
    if (event.data) payload = event.data.json();
  } catch (e) {
    if (event.data) payload.body = event.data.text();
  }

  const options = {
    body: payload.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: payload.tag || 'pzai-nudge',
    renotify: true,
    requireInteraction: false,
    data: { url: payload.url || '/?action=review-pass' },
    actions: [
      { action: 'all-good', title: "Everything's good" },
      { action: 'open', title: 'Open app' }
    ]
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl =
    event.action === 'all-good'
      ? '/?action=review-pass&source=push'
      : (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const client of wins) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});

// --- Push subscription change (re-subscribe with placeholder VAPID key) ---
self.addEventListener('pushsubscriptionchange', (event) => {
  // PLACEHOLDER: replace with real VAPID public key in Phase 1
  const VAPID_PUBLIC_KEY_PLACEHOLDER = 'REPLACE_ME_WITH_REAL_VAPID_PUBLIC_KEY';
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY_PLACEHOLDER
      })
      .catch((err) => console.warn('[sw] re-subscribe failed', err))
  );
});
