<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/Cards/GameCard.svelte';
	import OfflineCard from '$lib/Cards/InfoCard.svelte';

	export let games: Game[];
	export let offline: boolean;

	let ErrorMessage =
		games.length === 0
			? 'Er zijn geen offline spellen beschikbaar'
			: 'De volgende spellen zijn offline beschikbaar';
</script>

<section>
	<ul>
		{#if offline}
			<OfflineCard Title={'Oeps, je bent nu offline!'} {ErrorMessage} />
		{/if}
		{#each games as game}
			<li><a sveltekit:prefetch href="/spellen/{game.slug}"><GameCard {game} /> </a></li>
		{/each}
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
