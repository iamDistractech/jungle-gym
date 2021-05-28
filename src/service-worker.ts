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
		console.log('A request to games.json!');
		event.waitUntil(
			fetch(event.request)
				.then((response) => {
					if (response.ok) return response.json();
					else throw response;
				})
				.then((games: Game[]) => {
					return Promise.all(
						games.map((game: Game) => {
							return caches
								.open('gamesCache')
								.then((cache) => {
									cache.keys().then(console.log);
									return cache.match(`/games/${game.slug}.json`);
								})
								.then((response: Response | undefined) => {
									console.log('got something for', game.slug, response);
									if (response) game.offline = true;
									else game.offline = false;
									console.log(game.slug, game.offline);
									return game;
								});
						})
					);
				})
				.then((games) =>
					event.respondWith(new Response(JSON.stringify(games), { status: 200, statusText: 'ok' }))
				)
				.catch((response) => {
					throw caches
						.open('gamesCache')
						.then((cache) => cache.matchAll(`/games`))
						.then((cachesResponses) => {
							return Promise.all(
								cachesResponses.map((response) =>
									response.json().then((game: Game) => (game.offline = true))
								)
							);
						})
						.then((games) => event.respondWith(new Response(JSON.stringify(games))));
				})
		);
	} else
		event.respondWith(
			caches.match(event.request).then((cacheRes) => cacheRes || fetch(event.request))
		);
});
