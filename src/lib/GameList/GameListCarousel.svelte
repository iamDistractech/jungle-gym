<script lang="ts">
	import type { Game } from '$lib/games';
	import GameListCard from '$lib/GameList/GameListCard.svelte';
	export let gamesData: Game[];
	export let carouselTitle;
</script>

<section>
	<h1>{carouselTitle} - {gamesData.length}</h1>
	<ul>
		{#each gamesData as game}
			<li>
				<a href="spellen/{game.slug}">
					<!-- <h1>{game.name}</h1>
				<div>
					<p class="label">Groep: {game.targetGroup}</p>
					<p class="label">{game.category}</p>
					<p class="label">Min. {game.minimumPlayers} spelers</p>
				</div> -->

					<GameListCard {game} />
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
		gap: 10px;
		padding-bottom: 1rem;
		margin-left: -1.4rem;
		margin-right: -1.4rem;
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
