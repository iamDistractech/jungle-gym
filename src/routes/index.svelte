<script context="module" lang="ts">
	import { fetcher } from '$lib/utils/fetcher';

	export async function load({ page }: { page: { query: URLSearchParams } }): Promise<unknown> {
		const baseURL = import.meta.env.VITE_API_URL;

		if (typeof baseURL === 'string') {
			const url = new URL(baseURL);
			url.search = page.query.toString();

			try {
				const games = await fetcher(url);

				return {
					props: {
						games,
						query: page.query
					}
				};
			} catch (error) {
				return {
					status: 500,
					error: new Error(error)
				};
			}
		} else {
			return {
				props: {
					games: undefined,
					query: page.query
				},
				status: 500,
				error: new Error('No valid API endpoint URL')
			};
		}
	}
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
