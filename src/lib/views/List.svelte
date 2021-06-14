<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/cards/GameCard.svelte';
	import ErrorCard from '$lib/cards/InfoCard.svelte';

	/* Utils */
	import { sortGameArray } from '$lib/utils/sort';

	export let games: Game[];

	games = sortGameArray(games);
</script>

<section>
	<ul>
		{#each games as game}
			<li><a sveltekit:prefetch href="/spellen/{game.slug}"><GameCard {game} /> </a></li>
		{/each}

		{#if games.length == 0}
			<ErrorCard Title={'Oeps...'} Message="Er zijn geen spellen gevonden." />
		{/if}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul li {
		margin: 1em 0;
	}
	ul a {
		text-decoration: none;
	}
</style>
