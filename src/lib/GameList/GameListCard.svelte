<script lang="ts">
	import type { Game } from '$lib/games';

	export let game: Game;
</script>

<article>
	<h1>{game.name}</h1>
	<ul class="label-container">
		<li class="label">{game.targetGroup.join(', ')}</li>
		<li class="label">{game.category}</li>
		<li class="label">{game.minimumPlayers}</li>
	</ul>
</article>

<style>
	article {
		background-color: var(--color-lighter-grey);
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		justify-content: space-between;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 5px;
	}

	article h1 {
		color: var(--color-dark-blue);
		display: flex;
		justify-content: space-between;
		margin-bottom: -0.4em;
	}

	article h1::after {
		content: '>';
		background: var(--color-light-orange);
		border-radius: 50%;
		width: 2em;
		height: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
	}

	li {
		background-color: var(--color-light-orange);
		padding: 0.3em 1em;
		border-radius: 1em;
		margin-right: 0.5em;
		font-size: 0.8em;
		margin-bottom: 0;
	}
</style>
