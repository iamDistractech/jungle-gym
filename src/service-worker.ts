import type { Game } from '$lib/games';
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
				keys
					.filter((key) => key !== applicationCache && key !== staticCache && key !== 'gameCache')
					.map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	const request: Request = event.request;
	const requestURL = new URL(request.url);

	if (/(games\.json)/.test(requestURL.pathname)) {
		const returnOfflineGames = () => {
			return fetch(event.request).catch((error) => {
				return caches
					.open('gamesCache')
					.then((cache) => {
						return cache.keys().then((cacheKeys) => {
							console.log(cacheKeys);
							return Promise.all(cacheKeys.map((cacheKey) => cache.match(cacheKey)));
						});
					})
					.then((cachesResponses) =>
						Promise.all(cachesResponses.map((response) => response.json()))
					)
					.then((games) => {
						console.log(games);
						return new Response(JSON.stringify(games));
					});
			});
		};

		event.respondWith(returnOfflineGames());
	} else event.respondWith(caches.match(request).then((cacheRes) => cacheRes || fetch(request)));
});
