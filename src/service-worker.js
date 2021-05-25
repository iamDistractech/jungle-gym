import { build, files, timestamp } from '$service-worker';

const assets = [...build, '/offline'];

const staticCacheName = `staticCache-${timestamp}`;

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(staticCacheName)
			.then((cache) => cache.addAll(assets))
			.then(self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => key !== staticCacheName).map((key) => caches.delete(key))
			);
		})
	);
});
