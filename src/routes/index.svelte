<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		try {
			const { query } = page;
			const res = await fetch(`/games.json?${query.toString()}`);

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
						return cache.match(`/games/${game.slug}.json`);
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

<header>
	<h1>John Doe</h1>
	<h2>Goedemorgen!</h2>
</header>

{#if !offline}
	<GameListFilter {query} />
{/if}

<GameList {games} {offline} />

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
