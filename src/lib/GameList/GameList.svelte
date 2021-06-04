<script lang="ts">
	import type { Game } from '$lib/games';
	import GameListCard from '$lib/GameList/GameListCard.svelte';
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
	<h1>Spellen</h1>

	<GameListFilterButtons {query} />
	<ul>
		{#if offline}
			<OfflineCard ErrorTitle={'Oeps, je bent nu offline!'} {ErrorMessage} />
		{/if}
		{#each games as game}
			<li><a sveltekit:prefetch href="/spellen/{game.slug}"><GameListCard {game} /> </a></li>
		{/each}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		text-decoration: none;
	}
</style>
