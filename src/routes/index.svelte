<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const { query } = page;
		const res = await fetch(`/api/games.json?${query.toString()}`);

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
</style>
