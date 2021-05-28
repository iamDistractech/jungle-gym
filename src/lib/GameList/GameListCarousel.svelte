<script lang="ts">
	import type { Game } from '$lib/games';
	export let gamesData: Game[];
	export let carouselTitle;
</script>

<section>
	<h2>{carouselTitle} - {gamesData.length}</h2>
	<ul>
		{#each gamesData as game}
			<a href="games/{game.slug}">
				<h1>{game.name}</h1>
				<div>
					<p class="label">Groep: {game.targetGroup}</p>
					<p class="label">{game.category}</p>
					<p class="label">Min. {game.minimumPlayers} spelers</p>
				</div>
			</a>
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
		padding-bottom: 1rem;
		margin-left: -1.4rem;
		margin-right: -1.4rem;
	}

	ul a {
		text-decoration: none;
	}

	ul a {
		border-radius: 1em;
		margin: 1em 0.4rem;
		padding: 1.5rem 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 11rem;
		min-width: 11rem;
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
	}

	ul a div {
		width: 100%;
	}

	a h1 {
		font-size: 1.2em;
		color: var(--color-dark-blue);
		font-weight: 600;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a h1::after {
		content: '>';
		border-radius: 50%;
		padding: 0.3rem 0 0.3rem 0.3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		font-size: 1em;
	}

	h2 {
		font-size: 1.2em;
		font-weight: 600;
		margin-bottom: 0;
	}

	ul a:focus {
		cursor: pointer;
	}

	p {
		margin: 0;
		font-size: 0.8em;
		font-weight: 400;
	}

	.label {
		background-color: var(--color-light-orange);
		padding: 0.3em 1em;
		border-radius: 1em;
		margin-right: 0.5em;
		font-size: 0.8em;
		margin-bottom: 0.5em;
		width: fit-content;
	}
</style>
