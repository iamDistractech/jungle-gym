<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import GameCard from '$lib/Cards/GameCard.svelte';

	export let gamesData: Game[];
	export let carouselTitle;
</script>

<section>
	<h1>{carouselTitle} - {gamesData.length}</h1>
	<ul>
		{#each gamesData as game}
			<li>
				<a href="/spellen/{game.slug}">
					<GameCard {game} />
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0 1.3rem;
		overflow-x: auto;
		display: flex;
		max-width: 100%;
		gap: 10px;
		padding-bottom: 1rem;
		margin-left: -0.5rem;
		margin-right: -0.5rem;
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
