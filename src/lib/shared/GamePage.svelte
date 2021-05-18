<script>
	import ButtonLight from '../Button/ButtonLight.svelte';

	export let game;
</script>

<header>
	<h1>{game.title}</h1>
	<button>&larr;</button>
</header>

<div class="image-card" />

<main>
	<div class="main-content-header">
		<h2>{game.category} | {game.title}</h2>
		<small>{game.audience} | {game.difficulty}</small>
	</div>

	<p>{game.description}</p>

	<h3>Materialen</h3>
	<div class="material-list">
		{#each game.materials as material}
			<ButtonLight>{material}</ButtonLight>
		{/each}
	</div>

	<h3>Spelregels</h3>
	<ol>
		{#each game.rules as rule}
			<li>{rule}</li>
		{/each}
	</ol>

	<h3>Differentiaties</h3>

	<h4>{game.differentiations.easierForOne.title}</h4>
	<ul>
		{#each game.differentiations.easierForOne.actions as action}
			<li>
				{action}
			</li>
		{/each}
	</ul>

	<h4>{game.differentiations.easierForTwo.title}</h4>
	<ul>
		{#each game.differentiations.easierForTwo.actions as action}
			<li>
				{action}
			</li>
		{/each}
	</ul>
</main>

<ButtonLight>Spel opslaan</ButtonLight>

<style>
	header {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: flex-end;
		padding: 1.5em 0;
	}

	header h1 {
		font-size: 1.5em;
		font-weight: 600;
		font-family: var(--font-heading);
	}

	header button {
		border-radius: 50%;
		background-color: var(--color-white);
		border: 1px solid var(--color-dark-blue);
		height: 2.5em;
		width: 2.5em;
		margin-right: 2.5em;
	}

	.image-card {
		background-color: var(--color-turquoise);
		height: 15em;
		border-radius: 1.5em;
	}

	.material-list {
		display: flex;
	}

	.main-content-header {
		display: flex;
		flex-direction: column-reverse;
		margin-top: 1em;
	}

	.main-content-header small {
		font-size: 1em;
		color: var(--color-grey);
	}

	.main-content-header h2 {
		margin-bottom: 0;
	}
</style>
