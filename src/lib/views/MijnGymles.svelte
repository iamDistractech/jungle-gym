<script lang="ts">
	import type { Game } from '$lib/games';
	import GameCard from '$lib/cards/GameCard.svelte';
	import { onMount } from 'svelte';

	import { session as SessionStorage } from '$app/stores';

	const isAuthenticated = $SessionStorage.authenticated;

	export let savedGames: Game[] = [];
	export let hideDownloadedState: boolean;

	// Get the slugs of saved games
	// Gilter games based on the slugs
	onMount(() => {
		if (savedGames.length > 1) document.getElementById('scroll').scrollBy(320, 0);
	});
</script>

<ul id="scroll">
	<li>
		<a href="/gymles">
			<article>
				<h1>Mijn Gymles</h1>
				<p>Vind makkelijk jouw opgeslagen spellen, ook zonder internet</p>
			</article>
		</a>
	</li>
	{#if isAuthenticated}
		{#each savedGames as game}
			<li>
				<a href="/spellen/{game.slug}">
					<GameCard {game} {hideDownloadedState} />
				</a>
			</li>
		{/each}
	{/if}
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
		display: block;
		text-decoration: none;
		height: 100%;
	}

	ul li {
		scroll-snap-align: center;
		height: auto;
		min-width: 16rem;
	}

	ul a:focus {
		cursor: pointer;
	}

	article {
		box-sizing: border-box;
		height: 100%;
		background-color: var(--color-light-grey);
		border-radius: 1.5em;
		padding: 1em;
		justify-content: space-between;
		box-shadow: 0px 2px 4px 2px rgba(21, 45, 21, 0.1);
	}

	article h1 {
		display: flex;
		justify-content: space-between;
		margin: 0;
		line-height: 1em;
		font-size: 1em;
		margin-bottom: 1em;
	}

	article h1::after {
		content: '';
		background: url('$lib/assets/icons/GameCard/cardArrow.svg') no-repeat top center;
		background-size: 0.5em;
		width: 0.5em;
	}

	article p {
		margin: 0;
	}
</style>
