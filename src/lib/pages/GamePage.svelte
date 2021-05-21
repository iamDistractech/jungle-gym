<script lang="ts">
	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import MaterialModal from '$lib/GamePage/MaterialModal.svelte';

	let isModalOpen = false;
	let clickedMaterial;

	function toggleModal(material) {
		isModalOpen = !isModalOpen;
		clickedMaterial = material;
	}

	export let game;
</script>

<header>
	<h1>{game.title}</h1>
	<a class="hide-underline" href="/">&larr</a>
</header>

<div class="image-card" />

<main>
	<header>
		<h2>{game.category} | {game.title}</h2>
		<small>{game.audience} | {game.difficulty}</small>
	</header>

	<p>{game.description}</p>

	{#if isModalOpen}
		<MaterialModal material={clickedMaterial} on:close={toggleModal} />
	{/if}

	<h3>Materialen</h3>
	<ul class="material-list">
		{#each game.materials as material}
			<li>
				<ButtonLight on:click={toggleModal(material)}>{material.title}</ButtonLight>
			</li>
		{/each}
	</ul>

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

	header a {
		border-radius: 50%;
		background-color: var(--color-white);
		border: 1px solid var(--color-dark-blue);
		height: 2.5em;
		width: 2.5em;
		margin-right: 2.5em;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-card {
		background-color: var(--color-turquoise);
		height: 15em;
		border-radius: 1.5em;
	}

	.material-list {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.material-list > li {
		margin: 0.3em;
		margin-left: 0;
	}

	main header {
		display: flex;
		flex-direction: column-reverse;
		margin-top: 1em;
	}

	main header small {
		font-size: 1em;
		color: var(--color-grey);
	}

	main header h2 {
		margin-bottom: 0;
	}
</style>
