<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/Cards/GameCard.svelte';

	export let gamesData: Game[];
</script>


<ul>
	{#each gamesData as game}
		<li>
			<a href="/spellen/{game.slug}">
				<GameCard {game} />
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
		padding-bottom: .3rem;
		margin-left: -1rem;
		margin-right: -1rem;
	}

	ul a {
		text-decoration: none;
	}

	ul li {
		height: auto;
		min-width: 13rem;
	}

	ul a:focus {
		cursor: pointer;
	}
</style>
