<script lang="ts">
	import type { Game } from '$lib/games';

	import { formatTargetGroups } from '$lib/Utils/format';
	export let game: Game[];

	const targetGroupString = formatTargetGroups(game.targetGroup);
</script>

<section>
	<h1>Uitgelichte spel</h1>
	<ul>
		<a href="spellen/{game.slug}">
			<div>
				<h1>{game.name}</h1>
				<p>{targetGroupString} | {game.category}</p>
			</div>
		</a>
	</ul>
</section>

<style>
	h1 {
		font-size: 1.2em;
		font-weight: 600;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		background-color: var(--color-base-light);
		border-radius: 1em;
		margin-bottom: 2em;
		padding: 1.5rem 2rem;
		display: flex;
		box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.06);
		text-decoration: none;
	}

	ul a div {
		width: 100%;
	}

	ul a div h1 {
		font-size: 1em;
		color: var(--color-accent-dark);
		margin: 0;
		display: flex;
		justify-content: space-between;
		font-weight: 600;
	}

	ul a div h1::after {
		content: '';
		background: url('$lib/assets/icons/GameCard/cardArrow.svg') no-repeat top center;
		background-size: 0.5em;
		width: 2em;
		height: 2em;
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
