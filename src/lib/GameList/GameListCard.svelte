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
	}

	article h1::after {
		content: '>';
		border: 0.2em solid var(--color-light-orange);
		background-color: var(--color-light-orange);
		padding: 0.1em 0.6em;
		border-radius: 10em;
	}

	li {
		background-color: var(--color-light-orange);
		padding: 0.3em 1em;
		border-radius: 1em;
		margin-right: 0.5em;
		font-size: 0.8em;
		margin-bottom: 0;
	}

	/* .label-container {
		display: flex;
		flex-wrap: wrap;
	}

	.highlighted-card {
		height: 12em;
		background-color: var(--color-turquoise);
		border-radius: 1em;
		margin: 4em 0 2em 0;
		padding: 0.1em 1em;
	}

	.highlighted-card div h1 {
		font-size: 1.5em;
		color: var(--color-dark-blue);
	}

	.highlighted-card:focus {
		cursor: pointer;
	}  */
</style>
