<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/Cards/GameCard.svelte';
	import ErrorCard from '$lib/Cards/InfoCard.svelte';

	export let games: Game[];

	// Sort the array with the last updated game first
	games.sort(function (a, b) {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});

	let ErrorMessage =
		games.length === 0
			? 'Er zijn geen offline spellen beschikbaar'
			: 'De volgende spellen zijn offline beschikbaar';
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
