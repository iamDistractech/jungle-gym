<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page, fetch }) => {
		const { query } = page;
		const res = await fetch(`/spellen.json?${query.toString()}`);

		if (res.ok) {
			const games = await res.json();

			return {
				props: {
					games
				}
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message),
			props: {
				query
			}
		};
	};
</script>

<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCardHighlighted from '$lib/Cards/GameCardHighlighted.svelte';
	import Carousel from '$lib/GameViews/Carousel.svelte';

	/* Utils */
	import { sortGameArray } from '$lib/Utils/sort';

	export let games: Game[];

	/* Create a new array with the four newest games */
	const newestGames = games.slice(Math.max(games.length - 4, 0));

	/* Create a new array with the newest games first */
	const sortedArray = sortGameArray(games);

	/* Select the game that is highlighted. If more. Select the one that is last updated
	 */
	const highlightedGame = sortedArray.find((game) => game.highlighted === true);

	const highlightedGameAvailable = highlightedGame !== undefined;
</script>

<main class="leaves-bg">
	{#if highlightedGameAvailable}
		<GameCardHighlighted game={highlightedGame} />
	{/if}
	<Carousel gamesData={newestGames} carouselTitle="Nieuwe spellen" />
	<Carousel gamesData={games} carouselTitle="Favoriete spellen" />
</main>

<style>
</style>
