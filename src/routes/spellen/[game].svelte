<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		try {
			const res = await fetch(`/spellen/${page.params.game}.json`);

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
				status: res.status
			};
		} catch (error) {
			return {
				error: 'offline',
				status: 400
			};
		}
	};
</script>

<script lang="ts">
	import CardLabel from '$lib/shared/Label/CardLabel.svelte';
	import { formatTargetGroups } from '$lib/Utils/formatTargetGroups';

	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import MaterialButton from '$lib/shared/Button/MaterialButton.svelte';
	import Accordion from '$lib/GamePage/Accordion.svelte';
	import MaterialModal from '$lib/GamePage/MaterialModal.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Game } from '$lib/games';

	export let gameSlug: string = $page.params.game;
	export let game: Game;

	const targetGroupString = formatTargetGroups(game.targetGroup);

	let isModalOpen = false;
	let clickedMaterial;

	function toggleModal(material): any {
		isModalOpen = !isModalOpen;
		clickedMaterial = material;
	}

	onMount(() => {
		patchGame();
	});

	function patchGame() {
		return caches
			.open('gamesCache')
			.then((cache) => {
				return cache.match(`/spellen/${game.slug}.json`);
			})
			.then((response: Response | undefined) => {
				if (response) game.offline = true;
				else game.offline = false;
				return game;
			});
	}

	function saveCache() {
		return Promise.all([
			caches.open('gamesCache').then((cache) => cache.add(`/spellen/${gameSlug}.json`)),
			caches.open('gamesCacheSSR').then((cache) => cache.add(`/spellen/${gameSlug}`))
		]).then(() => (game.offline = true));
	}

	function deleteCache() {
		return Promise.all([
			caches.open('gamesCache').then((cache) => cache.delete(`/spellen/${gameSlug}.json`)),
			caches.open('gamesCacheSSR').then((cache) => cache.delete(`/spellen/${gameSlug}`))
		]).then(() => (game.offline = false));
	}
</script>

<main>
	<header>
		<a href="/spellen"><i class="material-icons">arrow_back</i>Speloverzicht</a>
		<h1>{game.name}</h1>
		{#if game.offline}
			<h2><i class="material-icons">cloud_download</i>Gedownload</h2>
		{/if}
		<ul>
			<li><CardLabel label={targetGroupString} icon={undefined} /></li>
			<li><CardLabel label={game.category} icon={undefined} /></li>
			<li><CardLabel label={`Min. ${game.minimumPlayers} `} icon="group" /></li>
		</ul>
	</header>
	<section>
		<h1>Beschrijving</h1>
		<p>{game.description}</p>
	</section>

	<div class="image-card" />
	<!-- 
	
<!-- 
	{#if isModalOpen}
		<MaterialModal material={clickedMaterial} on:close={toggleModal} />
	{/if} -->

	<!-- <section>
		<h3>Materialen</h3>
		<ul class="material-list">
			{#each game.materials as material}
				<li>
					<MaterialButton on:click={toggleModal(material)}>{material.name || material.material.name}</MaterialButton>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h3>Spelregels</h3>
		<ul>
			{#each game.rules as rule}
				<li>{rule.description || rule}</li>
			{/each}
		</ul>
	</section>

	<section>
		<h3>Variaties</h3>
		{#each game.variation as variation}
			<Accordion {variation} />
		{/each}
	</section>


<section class="download-button-container">
	{#if game.offline}
		<ButtonLight on:click={deleteCache}>Spel is gedownload</ButtonLight>
	{:else}
		<ButtonLight on:click={saveCache}>Download dit spel</ButtonLight>
	{/if}

	<p><i>Download het spel, zodat jij het kunt bekijken zonder internet.</i></p> 
</section> -->
</main>

<style>
	header {
		padding: 0 0.5rem;
	}
	header h1 {
		font-size: 1.5em;
		margin-bottom: 0.5rem;
	}

	header ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
		min-height: 3em;
	}

	header ul li {
		margin: 2px;
	}

	section {
		padding: 0 0.5rem;
	}
	section h1 {
		margin-left: 0;
	}

	a {
		display: flex;
		align-items: center;
		color: var(--color-accent-dark);
		font-size: 14px;
		font-style: italic;
		margin-bottom: 1.5em;
	}

	a i {
		font-size: inherit;
		border: solid 2px var(--color-accent-dark);
		border-radius: 100%;
		padding: 0.2rem;
		margin-right: 0.5em;
	}

	a:hover,
	a:focus {
		--color-accent-dark: var(--color-accent-action);
	}

	/* 
	.image-card {
		background-color: var(--color-base-light);
		height: 15em;
		border-radius: 1.5em;
		margin: 2em 0;
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
	} */

	/* main header {
		display: flex;
		flex-direction: column-reverse;
		margin-top: 1em;
	}

	main header h2 {
		margin-bottom: 0;
		font-size: 2em;
	} */

	/* .download-button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 3rem 2rem;
	}

	.download-button-container p {
		text-align: center;
	} */

	/* .edit-element {
		position: fixed;
		right: 5%;
		bottom: 2%;
		height: 5em;
		width: 5em;
		background-color: var(--color-base-light);
		border: none;
		border-radius: 1em;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.edit-element img {
		height: 3em;
		width: 3em;
	} */
</style>
