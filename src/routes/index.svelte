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
	import GameCardHighlighted from '$lib/cards/GameCardHighlighted.svelte';
	import Carousel from '$lib/views/Carousel.svelte';
	import MijnGymles from '$lib/views/MijnGymles.svelte';

	/* Utils */
	import { sortGameArray } from '$lib/utils/sort';

	import { onMount } from 'svelte';
	import { patchAllGamesOfflineStatus } from '$lib/utils/offline';

	/* Stores */
	export let games: Game[];

	// Create a new array with the newest games first
	const sortedGamesArray = sortGameArray(games);

	//Create a new array with the four newest games
	const newestGames = sortedGamesArray.slice(Math.max(games.length - 4, 0));

	//Select the game that is highlighted. If more. Select the one that is last updated
	const highlightedGame = sortedGamesArray.find((game) => game.highlighted === true);

	const highlightedGameAvailable = highlightedGame !== undefined;

	let offline = false;
	let savedGames = [];

	onMount(async () => {
		if (!navigator.onLine) offline = true;

		// Get all the offline status of every game
		if ('caches' in window) {
			await patchAllGamesOfflineStatus(games, offline).then(
				(patchedGames) => (games = patchedGames)
			);
		}

		// Create new array based on the offline status
		games.forEach((game) => {
			if (game.offline === true) {
				savedGames = [...savedGames, game];
			}
		});
	});
</script>

<main class="leaves-bg">
	{#if highlightedGameAvailable}
		<section>
			<h1>Uitgelichte spellen</h1>
			<GameCardHighlighted game={highlightedGame} />
		</section>
	{/if}
	<section>
		<h1>Nieuwste spellen</h1>
		<Carousel gamesData={newestGames} hideDownloadedState={true} />
	</section>
	<section>
		<h1>Opgeslagen spellen</h1>
		<MijnGymles {savedGames} hideDownloadedState={true} />
	</section>
</main>

<style>
</style>
