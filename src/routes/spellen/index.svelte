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
	import OfflineCard from '$lib/cards/InfoCard.svelte';

	/* Utils */
	import { onMount } from 'svelte';
	import { patchAllGamesOfflineStatus } from '$lib/utils/offline';
	import { page } from '$app/stores';

	export let games: Game[];
	export let query;

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
	{#if offline}
		<OfflineCard
			title="Je bent offline"
			message="Als je geen internet hebt, kun je wel altijd bij de spellen die je opgeslagen hebt in mijn gymles"
		/>
		<a href="/gymles">Ga naar Mijn Gymles<i class="material-icons">person</i></a>
	{:else}
		<SearchBar on:searchFilter={filterGames} {query} />

		{#if !offline}
			<Filter {query} />
			<FilterButtons {query} />
		{/if}

		<List {games} />
	{/if}
</main>

<style>
	a {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		padding: 0.75em;
		min-width: 7em;
		text-align: center;
		color: var(--color-accent-dark);
		border: none;
		border-radius: 0.5em;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(161, 161, 161, 0.3) 0px 1px 3px -1px;
		background-color: var(--color-base-light);
	}

	a i {
		font-size: inherit;
		margin-left: 0.5em;
	}
</style>
