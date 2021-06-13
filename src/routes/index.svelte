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
	import Carousel from '$lib/views/Carousel.svelte';
	import MijnGymles from '$lib/views/mijnGymles.svelte';

	export let games: Game[];
	const newestGames = games.slice(Math.max(games.length - 4, 0));
</script>

<main class="leaves-bg">
	<section>
		<h1>Uitgelichte spellen</h1>
		<GameCardHighlighted />
	</section>
	<section>
		<h1>Nieuwste spellen</h1>
		<Carousel gamesData={newestGames} />
	</section>
	<section>
		<h1>Opgeslagen spellen</h1>
		<MijnGymles gamesData={games} />
	</section>
</main>

<style>
</style>
