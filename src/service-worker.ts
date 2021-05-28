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
				keys.filter((key) => key !== applicationCache).map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	const request: Request = event.request;
	const requestURL = new URL(request.url);

	if (/(games\.json)/.test(requestURL.pathname)) {
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					if (response.ok) return response.json();
					else throw response;
				})
				.then((games: Game[]) =>
					games.map((game: Game) => {
						return caches
							.open('gamesCache')
							.then((cache) => cache.match(`/games/${game.slug}`))
							.then((response: Response | undefined) => {
								if (response) game.offline = true;
								else game.offline = false;
								return game;
							});
					})
				)
				.then(Promise.all)
				.then((games: Game[]) => new Response(JSON.stringify(games)))
				.catch((response) => {
					throw caches
						.open('gamesCache')
						.then((cache) => cache.matchAll(`/games`))
						.then((cachesResponses) =>
							cachesResponses.map((response) =>
								response.json().then((game: Game) => (game.offline = true))
							)
						)
						.then(Promise.all)
						.then((games) => new Response(JSON.stringify(games)));
				})
		);
	} else
		event.respondWith(
			caches.match(event.request).then((cacheRes) => cacheRes || fetch(event.request))
		);
});
