import { build, timestamp, files } from '$service-worker';

declare const self;

const applicationCache = `applicationCache-v${timestamp}`;
const staticCache = `staticCache-v${timestamp}`;

// Caches the svelte app (not the data)
self.addEventListener('install', (event) => {
	event.waitUntil(
		Promise.all([
			caches.open(applicationCache).then((cache) => cache.addAll(build)),
			caches.open(staticCache).then((cache) => cache.addAll(files))
		]).then(self.skipWaiting())
	);
});

// Removes old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => key !== applicationCache).map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener('fetch', (event) =>
	event.respondWith(
		caches.match(event.request).then((cacheRes) => cacheRes || fetch(event.request))
	)
);
