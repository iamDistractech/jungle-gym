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
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import List from '$lib/GameViews/List.svelte';
	import Filter from '$lib/Filters/Filter.svelte';
	import FilterButtons from '$lib/Filters/FilterButtons.svelte';

	/* Utils */
	import { onMount } from 'svelte';
	import { patchAllGamesOfflineStatus } from '$lib/Utils/offline';

	export let games: Game[];
	export let query;

	let offline = false;

	console.log('test', games);

	onMount(() => {
		if (!navigator.onLine) offline = true;

		if ('caches' in window) {
			patchAllGamesOfflineStatus(games, offline).then((patchedGames) => (games = patchedGames));
		}
	});
</script>

<main class="leaves-bg">
	{#if !offline}
		<Filter {query} />
		<FilterButtons {query} />
	{/if}

	<List {games} {offline} {query} />
</main>

<style>
</style>
