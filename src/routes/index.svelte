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

<script>
	import GameList from '$lib/GameList/GameList.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';
	import { onMount } from 'svelte';

	export let games;

	const data = [
		{
			titleGame: 'Pionnenroof',
			groups: 'Alle groepen',
			gameName: 'Tikspel',
			personAmount: 'Min 2',
			gameSlug: 'pionnenroof'
		},
		{
			titleGame: 'Fopbal',
			groups: 'Alle groepen',
			gameName: 'Balspel',
			personAmount: 'Min 3',
			gameSlug: 'fopbal'
		},
		{
			titleGame: 'Leeuwenkooi',
			groups: 'Alle groepen',
			gameName: 'Tikspel',
			personAmount: 'Min 5',
			gameSlug: 'leeuwenkooi'
		}
	];

	let gameTypeFilter = [];

	const getGameTypes = () => {
		for (let gameObj of data) {
			if (!gameTypeFilter.includes(gameObj.gameName)) {
				gameTypeFilter = [...gameTypeFilter, gameObj.gameName];
			}
		}
		gameTypeFilter = gameTypeFilter.sort();
	};

	onMount(() => getGameTypes());
</script>

<GameListFilter />

<GameList {games} />

<style>
</style>
