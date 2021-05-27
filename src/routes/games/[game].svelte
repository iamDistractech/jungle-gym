<script context='module' lang="ts">
import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({page, fetch }) => {
		const res = await fetch(`/games/${page.params.game}.json`);

		if (res.ok) {
			const game = await res.json();

			return {
				props: {
					game
				}
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message),
		};
	};
</script>


<script lang="ts">
	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import MaterialModal from '$lib/GamePage/MaterialModal.svelte';
	import type { Game, material } from '$lib/games';

	let isModalOpen = false;
	let clickedMaterial;

	function toggleModal(material) :any {
		isModalOpen = !isModalOpen;
		clickedMaterial = material;
	}

	export let game: Game;
</script>

<header>
	<h1>{game.name}</h1>
	<a class="hide-underline" href="/">&larr</a>
</header>

<div class="image-card" />

<main>
	<header>
		<h2>{game.category} | {game.name}</h2>
		<small>{game.minimumPlayers} | {game.name}</small>
	</header>

	<p>{game.description}</p>

	{#if isModalOpen}
		<MaterialModal material={clickedMaterial} on:close={toggleModal} />
	{/if}

	<h3>Materialen</h3>
	<ul class="material-list">
		{#each game.materials as material}
			<li>
				<ButtonLight on:click={toggleModal(material)}>{material.name}</ButtonLight>
			</li>
		{/each}
	</ul>

	<h3>Spelregels</h3>
	<ol>
		{#each game.rules as rule}
			<li>{rule}</li>
		{/each}
	</ol>

	<h3>Variaties</h3>

	{#each game.variation as variation }
		<h4>{variation.description}</h4>
		<ul>
			{#each variation.actions as action}
				<li>
					{action}
				</li>
			{/each}
		</ul>
	{/each}
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
