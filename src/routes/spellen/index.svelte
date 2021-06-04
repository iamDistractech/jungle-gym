<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		try {
			const { query } = page;
			const res = await fetch(`spellen.json?${query.toString()}`);

			if (res.ok) {
				const games = await res.json();

				return {
					props: {
						games,
						query,
						offline: res.statusText === 'offline'
					}
				};
			}

			return {
				props: {
					status: res.status,
					error: await res.json(),
					query
				}
			};
		} catch (error) {
			return {
				status: 500,
				error
			};
		}
	};
</script>

<script lang="ts">
	import GameList from '$lib/GameList/GameList.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';

	import { onMount } from 'svelte';
	import type { Game } from '$lib/games';

	export let offline;
	export let games: Game[];
	export let query;

	onMount(() => {
		if (!navigator.onLine) offline = true;
		patchGames();
	});

	function patchGames() {
		Promise.all(
			games.map((game: Game) => {
				return caches
					.open('gamesCache')
					.then((cache) => {
						return cache.match(`/spellen/${game.slug}.json`);
					})
					.then((response: Response | undefined) => {
						if (response) game.offline = true;
						else game.offline = false;
						return game;
					});
			})
		)
			.then((patchGames: Game[]) => (games = patchGames))
			.then(() => {
				if (offline) games = games.filter((game) => game.offline);
			});
	}
</script>

<main class="leaves-bg">
	{#if !offline}
		<GameListFilter {query} />
	{/if}

	<GameList {games} {offline} {query} />
</main>


<style>



</style>