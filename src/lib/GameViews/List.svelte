<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/Cards/GameCard.svelte';
	import ErrorCard from '$lib/Cards/ErrorCard.svelte';

	/* Utils */
	import { sortGameArray } from '$lib/Utils/sort';

	export let games: Game[];
	export let offline: boolean;

	sortGameArray(games);

	let ErrorMessage =
		games.length === 0
			? 'Er zijn geen offline spellen beschikbaar'
			: 'De volgende spellen zijn offline beschikbaar';
</script>

<section>
	<ul>
		{#if offline}
			<ErrorCard ErrorTitle={'Oeps, je bent nu offline!'} {ErrorMessage} />
		{/if}
		{#each games as game}
			<li><a sveltekit:prefetch href="/spellen/{game.slug}"><GameCard {game} /> </a></li>
		{/each}

		{#if games.length == 0}
			<ErrorCard ErrorTitle={'Oeps...'} ErrorMessage="Er zijn geen spellen gevonden." />
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
