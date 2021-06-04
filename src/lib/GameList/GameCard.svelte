<script lang="ts">
	import type { Game } from '$lib/games';
	import CardLabel from '$lib/shared/Label/CardLabel.svelte';

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

	const targetGroupString =
		minGroup === 1 && maxGroup === 8 ? 'Alle groepen' : `Groep ${minGroup} - ${maxGroup}`;
</script>

<article>
	<h1>{game.name}</h1>
	{#if game.offline}
		<h2><i class="material-icons">cloud_download</i>Gedownload</h2>
	{/if}
	<ul>
		<li><CardLabel label={targetGroupString} icon={undefined} /></li>
		<li><CardLabel label={game.category.name || game.category} icon={undefined} /></li>
		<li><CardLabel label={`Min. ${game.minimumPlayers} `} icon="group" /></li>
	</ul>
</article>

<style>
	article {
		background-color: var(--color-white);
		border-radius: 1.5em;
		padding: 1em;
		justify-content: space-between;
		box-shadow: 0px 2px 4px 2px rgba(21, 45, 21, 0.1);
		/* filter: drop-shadow(0 0.2em 0.2em hsl(92, 30%, 64%)) alternatief shadow */
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
		min-height: 3em;
	}

	ul li {
		margin: 2px;
	}

	article h1 {
		display: flex;
		justify-content: space-between;
		margin: 0;
		line-height: 1em;
		font-size: 1em;
		min-height: 2em;
	}

	article h1::after {
		content: '';
		background: url('$lib/assets/icons/GameCard/cardArrow.svg') no-repeat top center;
		background-size: 0.5em;
		width: 0.5em;
	}

	article h2 {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0;
		font-family: var(--font-body);
		font-size: 0.8em;
		font-weight: normal;
		font-style: italic;
		/* opacity: 0.5; **/
	}

	h2 i {
		font-size: inherit;
		margin-right: 0.5em;
	}

	ul {
		margin-top: 1em;
	}
</style>
