import { build, files, timestamp } from '$service-worker';

const assets = [...build, '/fallback.html', '/'];

const staticCacheName = `staticCache-v${timestamp}`;
const dynamicCacheName = `dynamicCache-v${timestamp}`;

self.addEventListener('install', (event) => {
	console.log('install');
	event.waitUntil(
		caches
			.open(staticCacheName)
			.then((cache) => cache.addAll(assets))
			.then(self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	console.log('Activate');
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCacheName && key !== dynamicCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener('fetch', (evt) => {
	console.log(build);

	evt.respondWith(
		caches
			.match(evt.request)
			.then((cacheRes) => {
				return (
					cacheRes ||
					fetch(evt.request).then((fetchRes) => {
						return caches.open(dynamicCacheName).then((cache) => {
							cache.put(evt.request.url, fetchRes.clone());
							return fetchRes;
						});
					})
				);
			})
			.catch((error) => {
				return caches
					.open(staticCacheName)
					.then((cache) => cache.match('/_app/pages/offline.svelte-dc2af9e5.js'));
			})
	);
});
