<script lang="ts">
	import type { Game } from '$lib/games';

	import { formatTargetGroups } from '$lib/utils/format';
	export let game: Game;

	const targetGroupString = formatTargetGroups(game.targetGroup);
</script>

<ul>
	<li>
		<a href="spellen/#">
			<article>
				<h1>{game.name}</h1>
				<p>{targetGroupString} | {game.category}</p>
			</article>
		</a>
	</li>
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul article {
		background-color: var(--color-base-light);
		border-radius: 1em;
		padding: 1.5rem 2rem;
		display: flex;
		flex-flow: column;
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.06);
		text-decoration: none;
	}
	article h1 {
		display: flex;
		justify-content: space-between;
		font-weight: 600;
	}

	article h1::after {
		content: '';
		background: url('$lib/assets/icons/GameCard/cardArrow.svg') no-repeat top center;
		background-size: 0.5em;
		border-radius: 50%;
		width: 2em;
		height: 2em;
		border: none;
	}

	ul a:focus {
		cursor: pointer;
	}

	p {
		margin: 0;
		font-size: 0.8em;
		font-weight: 400;
	}
</style>
