<script lang="ts">
	import type { Game } from '$lib/games';
	import CardLabel from '$lib/shared/label/CardLabel.svelte';
	import OfflineLabel from '$lib/shared/label/OfflineLabel.svelte';
	import { formatTargetGroups } from '$lib/utils/format';

	import { session as SessionStorage } from '$app/stores';

	const isAuthenticated = $SessionStorage.authenticated;

	export let game: Game;
	export let hideDownloadedState: boolean;

	const targetGroupString = formatTargetGroups(game.targetGroup);
</script>

<article>
	<h1>{game.name}</h1>
	{#if game.offline && hideDownloadedState !== true && isAuthenticated}
		<OfflineLabel />
	{/if}
	<ul>
		<li><CardLabel label={targetGroupString} icon={undefined} /></li>
		<li><CardLabel label={game.category} icon={undefined} /></li>
		<li><CardLabel label={`Min. ${game.minimumPlayers} `} icon="group" /></li>
	</ul>
</article>

<style>
	article {
		background-color: var(--color-white);
		border-radius: 1.5em;
		padding: 1em;
		justify-content: space-between;
		filter: drop-shadow(0 0.2em 0.2em hsl(92, 30%, 64%));
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

	ul {
		margin-top: 1em;
	}
</style>
