<script lang="ts">
	import type { Game } from '$lib/games';

	export let game: Game;

	// Target Group Functionality
	const targetGroupArr = game.targetGroup;
	targetGroupArr.sort(function (a, b) {
		return a - b;
	});

	const minGroup = targetGroupArr[0];
	const maxGroup = targetGroupArr.slice(-1)[0];

	const targetGroupString = `Groep ${minGroup} t/m ${maxGroup}`;
</script>

<article>
	<h1>{game.name}</h1>
	<ul>
		<li>{targetGroupString}</li>
		<li class="category-label">{game.category}</li>
		<li>Min. spelers: {game.minimumPlayers}</li>
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
		margin: 0;
		margin-bottom: 1em;
	}

	article h1::after {
		content: '>';
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

	.category-label {
		text-transform: capitalize;
	}
</style>
