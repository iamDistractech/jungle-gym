import type { Game } from '$lib/games';

/**
 * Sorts the array with the last updated game first
 * @param games an array with all the games
 * @returns the new (sorted) array
 */
export function sortGameArray(games: Game[]): Game[] {
	return games.sort(function (a, b) {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});
}
