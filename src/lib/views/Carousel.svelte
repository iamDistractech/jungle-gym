<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/cards/GameCard.svelte';

	export let gamesData: Game[];
	export let hideDownloadedState: boolean;
</script>

<ul>
	{#each gamesData as game}
		<li>
			<a href="/spellen/{game.slug}">
				<GameCard {game} {hideDownloadedState} />
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0 1.3rem;
		overflow-x: auto;
		display: flex;
		max-width: 100%;
		gap: 10px;
		padding-bottom: 0.3rem;
		margin-left: -1rem;
		margin-right: -1rem;
		scroll-snap-type: x mandatory;
		padding-left: 4em;
		padding-right: 4em;
	}

	ul a {
		text-decoration: none;
	}

	ul li {
		scroll-snap-align: center;
		height: auto;
		min-width: 16rem;
	}

	ul a:focus {
		cursor: pointer;
	}
</style>
