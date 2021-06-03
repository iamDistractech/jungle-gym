<script lang="ts">
	import type { Game } from '$lib/games';

	export let game: Game;

	let targetGroupArr;
	const isNestedArray = game.targetGroup[0].group;

	if (isNestedArray) {
		// Strapi API

		const targetGroupRawArr = game.targetGroup;
		targetGroupArr = targetGroupRawArr.map((a) => parseInt(a.group));

		targetGroupArr.sort(function (a, b) {
			return a - b;
		});
	} else {
		// Custom API

		targetGroupArr = game.targetGroup;
		targetGroupArr.sort(function (a, b) {
			return a - b;
		});
	}

	// Target Group Functionality
	const minGroup = targetGroupArr[0];
	const maxGroup = targetGroupArr.slice(-1)[0];

	let targetGroupString;
	if (minGroup === 1 && maxGroup === 8) {
		targetGroupString = 'Alle groepen';
	} else {
		targetGroupString = `Groep ${minGroup} t/m ${maxGroup}`;
	}
</script>

<article>
	<h1>{game.name}</h1>
	{#if game.offline}
		<h2>Offline beschikbaar</h2>
	{/if}
	<ul>
		<li>{targetGroupString}</li>
		<li class="category-label">{game.category.name || game.category}</li>
		<li class="min-players-label">
			{game.minimumPlayers}
		</li>
	</ul>
</article>

<style>
	article {
		background-color: var(--color-white);
		border-radius: 1.5em;
		margin: 1em 0;
		padding: 1em;
		justify-content: space-between;
		filter: drop-shadow(0 0.2em 0.2em hsl(120, 46%, 89%));
	}
	li.offline {
		background-color: var(--color-grey);
		color: var(--color-white);
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
		display: flex;
		justify-content: space-between;
		margin: 0;
		line-height: 2em;
		font-size: 1.25em;
	}

	article h1::after {
		content: '';
		background: url('$lib/assets/icons/GameCard/cardArrow.svg') no-repeat center;
		width: 2em;
		height: 2em;
	}
	.min-players-label::before {
		content: '';
		background: url('$lib/assets/icons/GameCard/minPlayers.svg') no-repeat center;
		width: 2em;
		height: 2em;
	}

	article h2 {
		margin: 0;
		margin-bottom: 2em;
		padding: 0;
		font-family: var(--font-body);
		font-size: 0.8em;
		font-weight: normal;
		font-style: italic;
		opacity: 0.5;
	}

	li {
		display: flex;
		align-items: center;
		background-color: var(--color-light-orange);
		color: var(--color-black);
		padding: 0.3em 1em;
		border-radius: 1em;
		margin-right: 0.5em;
		font-size: 0.8em;
		margin-bottom: 0.5em;
	}

	ul {
		margin-top: 1em;
	}

	.category-label {
		text-transform: capitalize;
	}
</style>
