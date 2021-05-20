<script context='module'>
	
	import {fetcher} from '../utils/fetcher'

	export async function load({fetch}) {
		const url = 'https://acc-jungle-gym-api.herokuapp.com/games'

		try {
			const games = await fetcher(fetch, url)

			return { 
				props: { 
					games
				}
			}
		} catch(error) {
			const { message } = await res.json()
	
			return {
				status: 500,
				error: new Error(message)
			}
		}
	}

</script>

<script lang='ts'>
	import GameList from '$lib/GameList/GameList.svelte'
	import GameListCard from '$lib/GameList/GameListCard.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';
	import GameListPopup from '$lib/GameList/GameListPopup.svelte';

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
<GameList games={games}/>

<!-- <GameListPopup /> -->
<style>
	
	
</style>
