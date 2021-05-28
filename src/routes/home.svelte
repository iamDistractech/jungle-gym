<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const { query } = page;
		const res = await fetch(`/games.json?${query.toString()}`);

		if (res.ok) {
			const games = await res.json();

			return {
				props: {
					games,
					query
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

<script>
	import GameListHighlighted from '$lib/GameList/GameListHighlighted.svelte';
	import GameListCarousel from '$lib/GameList/GameListCarousel.svelte';

	export let games;
	const newestGames = games.slice(Math.max(games.length - 4, 0));
</script>

<header>
	<h1>Jungle Gym</h1>
</header>

<GameListHighlighted {games} />
<GameListCarousel gamesData={newestGames} carouselTitle="Nieuwe spellen" />
<GameListCarousel gamesData={games} carouselTitle="Favoriete spellen" />

<style>
	h1 {
		text-align: center;
	}

	header {
		font-family: var(--font-heading);
		padding: 2rem 0 1rem;
	}
</style>
