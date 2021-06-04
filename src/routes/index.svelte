<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page, fetch }) => {
		const { query } = page;
		const res = await fetch(`/spellen.json?${query.toString()}`);

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

<script lang="ts">
	import GameListHighlighted from '$lib/GameList/GameListHighlighted.svelte';
	import GameListCarousel from '$lib/GameList/GameListCarousel.svelte';
	import type { Game } from '$lib/games';

	export let games: Game[];
	const newestGames = games.slice(Math.max(games.length - 4, 0));
</script>

<main class="leaves-bg">
	<GameListHighlighted />
	<GameListCarousel gamesData={newestGames} carouselTitle="Nieuwe spellen" />
	<GameListCarousel gamesData={games} carouselTitle="Favoriete spellen" />
</main>

<style>
	
</style>
