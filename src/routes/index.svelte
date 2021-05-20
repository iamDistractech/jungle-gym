<script context="module" lang="ts">
	import { fetcher } from '../utils/fetcher';

	export async function load(): Promise<unknown> {
		const url = 'https://acc-jungle-gym-api.herokuapp.com/games';

		try {
			const games = await fetcher(url);

			return {
				props: {
					games
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

<script lang="ts">
	import GameList from '$lib/GameList/GameList.svelte';
	// import GameListCard from '$lib/GameList/GameListCard.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';
	// import GameListPopup from '$lib/GameList/GameListPopup.svelte';

	export let games;
</script>

<GameListFilter />
<!-- <section>
	<GameListCard
		titleGame="Kat en Muis"
		groups="Alle groepen"
		gameName="Tikspel"
		personAmount="Min 5"
		gameSlug="kat-en-muis"
		isHighlighted={true}
	/>
</section> -->
<GameList {games} />

<!-- <GameListPopup /> -->
<style>
</style>
