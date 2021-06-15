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
						query
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
	import List from '$lib/views/List.svelte';
	import Filter from '$lib/filters/Filter.svelte';
	import FilterButtons from '$lib/filters/FilterButtons.svelte';
	import SearchBar from '$lib/filters/SearchBar.svelte';

	/* Utils */
	import { onMount } from 'svelte';
	import { patchAllGamesOfflineStatus } from '$lib/utils/offline';
	import { page } from '$app/stores';

	export let games: Game[];
	export let query;

	console.log(games);

	const backupGames = games;

	page.subscribe((page) => (query = page.query));

	let offline = false;

	onMount(() => {
		if (!navigator.onLine) offline = true;

		if ('caches' in window) {
			patchAllGamesOfflineStatus(games, offline).then((patchedGames) => (games = patchedGames));
		}
	});

	function filterGames() {
		if (query.has('search')) {
			let cleanedQuery = query.get('search').toLowerCase();

			games = backupGames.filter((game) => game.name.toLowerCase().includes(cleanedQuery));
		} else {
			games = backupGames;
		}
	}
</script>

<main class="leaves-bg">
	<SearchBar on:searchFilter={filterGames} {query} />

	{#if !offline}
		<Filter {query} />
		<FilterButtons {query} />
	{/if}

	<List {games} {offline} />
</main>

<style>
</style>
