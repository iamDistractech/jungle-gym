<script lang="ts">
	import type { Game } from '$lib/games';
	import GameListCard from '$lib/GameList/GameListCard.svelte';
	import OfflineCard from '$lib/ErrorCard/ErrorCard.svelte';

	export let games: Game[];
	export let offline: boolean;

	let ErrorMessage =
		games.length === 0
			? 'Er zijn geen offline spellen beschikbaar'
			: 'De volgende spellen zijn offline beschikbaar';
</script>

<section>
	<h1>Spellen</h1>
	<ul>
		{#if offline}
			<OfflineCard ErrorTitle={'Oeps, je bent nu offline!'} {ErrorMessage} />
		{/if}
		{#each games as game}
			<li><a sveltekit:prefetch href="games/{game.slug}"><GameListCard {game} /> </a></li>
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

	/* .highlight-image {
		height: 12.5em;
		background-color: var(--color-turquoise);
		border-radius: 1em;
		margin: 2em 0;
		padding: 0.1rem 1rem;
		display: flex;
		flex-direction: column;
	}

	.highlight-image div {
		text-align: center;
	}

	.highlight-image div h1 {
		font-size: 1.5em;
		color: var(--color-dark-blue);
	}

	.highlight-image:focus {
		cursor: pointer;
	}

	.label {
		background-color: var(--color-light-orange);
		padding: 0.3rem 1rem;
		border-radius: 1rem;
		margin-right: 0.5rem;
		font-size: 0.8rem;
		margin-bottom: 0;
	}
	.label-container {
		display: flex;
		flex-wrap: wrap;
	} */
</style>
