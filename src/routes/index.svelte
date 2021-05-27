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
	import GameList from '$lib/GameList/GameList.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';

	export let games;
	export let query;
</script>

<header>
	<h1>John Doe</h1>
	<h2>Goedemorgen!</h2>
</header>

<GameListFilter {query} />

<GameList {games} />

<style>
	header {
		font-family: var(--font-heading);
		display: flex;
		flex-direction: column-reverse;
		padding: 2rem 0 1rem;
	}
	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}
</style>
