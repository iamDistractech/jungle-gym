import type { Game } from '$lib/games';

/**
 * Adds the `offline` property to an single game, based on the games cached status
 * @param game a game
 * @returns A promise that resolves to the game with a `offline` property
 */
export function patchSingleGameOfflineStatus(game: Game): Promise<Game> {
	return caches
		.open('gamesCache')
		.then((cache) => {
			return cache.match(`/spellen/${game.slug}.json`);
		})
		.then((response: Response | undefined) => {
			if (response) game.offline = true;
			else game.offline = false;
			return game;
		});
}

export function checkOfflineStatus(slug: Game['slug']): Promise<boolean> {
	return caches
		.open('gamesCache')
		.then((cache) => {
			return cache.match(`/spellen/${slug}.json`);
		})
		.then((response: Response | undefined) => {
			if (response) return true;
			else return false;
		});
}

/**
 * Adds the `offline` property to an array of games, based on their cached status returns only offline games when `appOffline = true`
 * @param games An array of games
 * @param appOffline A boolean wether the app is offline, filtering out games that are not cached
 * @returns A promise that resolves to games with an `offline` property and only offline games when `appOffline = true`
 */
export function patchAllGamesOfflineStatus(games: Game[], appOffline?: boolean): Promise<Game[]> {
	return Promise.all(games.map(patchSingleGameOfflineStatus)).then((games) =>
		appOffline ? games.filter((game) => game.offline) : games
	);
}

/**
 * Saves a game in the cache based on its slug
 * @param gameSlug the slug of the game to save
 * @returns True if saved to cache, false on error
 */
export function saveInCache(gameSlug: string): Promise<boolean> {
	return Promise.all([
		caches.open('gamesCache').then((cache) => cache.add(`/spellen/${gameSlug}.json`)),
		caches.open('gamesCacheSSR').then((cache) => cache.add(`/spellen/${gameSlug}`))
	])
		.then(() => true)
		.catch(() => false);
}

/**
 * Deletes a game in the cache based on its slug
 * @param gameSlug the slug of the game to save
 * @returns True if deleted and false if not
 */
export function deleteInCache(gameSlug: string): Promise<boolean> {
	return Promise.all([
		caches.open('gamesCache').then((cache) => cache.delete(`/spellen/${gameSlug}.json`)),
		caches.open('gamesCacheSSR').then((cache) => cache.delete(`/spellen/${gameSlug}`))
	]).then(([dataSuccess, ssrSuccess]) => dataSuccess && ssrSuccess);
}
