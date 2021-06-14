import type { Game } from '$lib/games';

/**
 * Sorts the array with the last updated game first
 * @param games an array with all the games
 * @returns an array in the right order
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sortGameArray(games: Game) {
	games.sort(function (a, b) {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});
}
