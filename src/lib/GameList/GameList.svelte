<script lang="ts">
	import type { Game } from '$lib/games';
	import GameCard from '$lib/GameList/GameCard.svelte';
	import OfflineCard from '$lib/ErrorCard/ErrorCard.svelte';
	import GameListFilterButtons from '$lib/GameList/GameListFilterButtons.svelte';

	export let games: Game[];
	export let query: string;
	export let offline: boolean;

	let ErrorMessage =
		games.length === 0
			? 'Er zijn geen offline spellen beschikbaar'
			: 'De volgende spellen zijn offline beschikbaar';
</script>

<section>
	<GameListFilterButtons {query} />
	<ul>
		{#if offline}
			<OfflineCard ErrorTitle={'Oeps, je bent nu offline!'} {ErrorMessage} />
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
