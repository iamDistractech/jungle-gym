import type { Game } from '$lib/games';
import { build, timestamp, files } from '$service-worker';

declare const self;

const applicationCache = `applicationCache-v${timestamp}`;
const staticCache = `staticCache-v${timestamp}`;

// Caches the svelte app (not the data)
self.addEventListener('install', (event) => {
	event.waitUntil(
		Promise.all([
			caches.open('gameCacheSSR').then((cache) => cache.add('/')),
			caches.open(applicationCache).then((cache) => cache.addAll(build)),
			caches.open(staticCache).then((cache) => cache.addAll(files))
		])
			.then(self.skipWaiting())
			.then(() => console.log('installed'))
	);
});

// Removes old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		clients.claim(),
		caches
			.keys()
			.then((keys) => {
				return Promise.all(
					keys
						.filter(
							(key) =>
								key !== applicationCache &&
								key !== staticCache &&
								key !== 'gameCache' &&
								key !== 'gameCacheSSR'
						)
						.map((key) => caches.delete(key))
				);
			})
			.then(self.skipWaiting())
			.then(() => console.log('activated'))
	);
});

self.addEventListener('fetch', (event) => {
	const request: Request = event.request;
	const requestURL = new URL(request.url);

	if (/(spellen\.json)/.test(requestURL.pathname)) {
		const returnOfflineGames = () => {
			return fetch(event.request).catch((error) => {
				return caches
					.open('gamesCache')
					.then((cache) => {
						return cache.keys().then((cacheKeys) => {
							return Promise.all(cacheKeys.map((cacheKey) => cache.match(cacheKey)));
						});
					})
					.then((cachesResponses) => {
						return Promise.all(cachesResponses.map((response) => response.json()));
					})
					.then((games) => {
						const response = new Response(JSON.stringify(games), { statusText: 'offline' });
						return response;
					});
			});
		};

		event.respondWith(returnOfflineGames());
	} else event.respondWith(caches.match(request).then((cacheRes) => cacheRes || fetch(request)));
});
