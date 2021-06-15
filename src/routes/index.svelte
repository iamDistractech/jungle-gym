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

	/* Stores */
	import { userStore } from '$lib/stores/user';

	export let user = $userStore;
	export let games: Game[];

	let savedGames = [];

	// Update savedGames array if user is defined (logged in)
	if (user) {
		savedGames =
			games && Array.isArray(games)
				? games.filter((game) => user.savedGames.includes(game.slug))
				: [];
		savedGames = savedGames;
	}
	// Create a new array with the newest games first
	const sortedGamesArray = sortGameArray(games);

	//Create a new array with the four newest games
	const newestGames = sortedGamesArray.slice(Math.max(games.length - 4, 0));

	//Select the game that is highlighted. If more. Select the one that is last updated
	const highlightedGame = sortedGamesArray.find((game) => game.highlighted === true);

	const highlightedGameAvailable = highlightedGame !== undefined;
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
	{#if user}
		<section>
			<h1>Opgeslagen spellen</h1>
			<MijnGymles {savedGames} hideDownloadedState={true} />
		</section>
	{/if}
</main>

<style>
</style>
