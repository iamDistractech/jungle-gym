<script context="module" lang="ts">
	import { fetcher } from '$lib/utils/fetcher';

	export async function load({ page }: { page: { query: URLSearchParams } }): Promise<unknown> {
		const url = new URL('https://acc-jungle-gym-api.herokuapp.com/games');
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
	}
</script>

<script>
	import GameList from '$lib/GameList/GameList.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';

	export let games;
	export let query;

</script>

<GameListFilter {query} />

<GameList {games} />

<style>
</style>
