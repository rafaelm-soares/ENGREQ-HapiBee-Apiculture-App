/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v1.0';

// PWA Configurations
// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// Configure Workbox caching
workbox.core.setCacheNameDetails({ prefix: `hapibee-${version}` });

// Precache essential assets
workbox.routing.registerRoute(
  ({ request }) => {
    if (request.destination === 'script' || request.destination === 'style' ||
      request.destination === 'image') {
      new workbox.strategies.CacheFirst()
    }
  }
);

// List the files to precache
const precacheResources = ['/', '/index.html', '/css/*.css', '/js/*.js', '/js/app/*.js', '/js/lib/*.js'];

self.addEventListener('install', (event) => {
  // Install and activate the service worker
  event.waitUntil(self.skipWaiting());
  let safeChachName = `hapibee-${version}`;
  // When the service worker is installing, open the cache and add the precache resources to it
  event.waitUntil(caches.open(safeChachName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Call activate event - Deletes older caches with deferent versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          // Check if the cache name matches the prefix and is not the current cache
          return cacheName.startsWith('hapibee-') && cacheName !== workbox.core.cacheNames.runtime;
        }).map((cacheName) => {
          // Delete the cache
          return caches.delete(cacheName);
        })
      );
    })
      .then(() => {
        // Clean up outdated caches
        return workbox.precaching.cleanupOutdatedCaches();
      })
  );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Cached resource:', cachedResponse)
        return cachedResponse;
      }
      console.log('Fetch requested:', event.request.url);
      return fetch(event.request);
    }),
  );
});
