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
	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import MaterialButton from '$lib/shared/Button/MaterialButton.svelte';
	import Accordion from '$lib/GamePage/Accordion.svelte';
	import MaterialModal from '$lib/GamePage/MaterialModal.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Game } from '$lib/games';

	export let gameSlug: string;
	export let game: Game;

	page.subscribe((page) => (gameSlug = page.params.game));

	let isModalOpen = false;
	let likes = 0;
	let liked = false;
	let clickedMaterial;

	function likedGame() {
		liked = !liked;
		liked ? (likes += 1) : (likes -= 1);
	}

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
		<h2>{game.category.name || game.category} | {game.name}</h2>
	</header>

	<p>{game.description}</p>

	<div class="image-card" />

	<button
		class="like-btn"
		on:click={likedGame}
		class:is-liked-background={liked}
		class:not-liked-background={!liked}
	>
		<i class="material-icons bouncy" class:is-liked={!liked} class:not-liked={liked}
			>favorite_border</i
		>
		<i class="material-icons bouncy" class:is-liked={liked} class:not-liked={!liked}>favorite</i>
		<span>{likes}</span>
	</button>

	{#if isModalOpen}
		<MaterialModal material={clickedMaterial} on:close={toggleModal} />
	{/if}

	<section>
		<h3>Materialen</h3>
		<ul class="material-list">
			{#each game.materials as material}
				<li>
					<MaterialButton on:click={toggleModal(material)}
						>{material.name || material.material.name}</MaterialButton
					>
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
</main>

<section class="download-button-container">
	{#if game.offline}
		<ButtonLight on:click={deleteCache}>Spel is gedownload</ButtonLight>
	{:else}
		<ButtonLight on:click={saveCache}>Download dit spel</ButtonLight>
	{/if}

	<p><i>Download het spel, zodat jij het kunt bekijken zonder internet.</i></p>
</section>

<style>
	header {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: flex-end;
		padding: 0 0 1.5em 0;
	}

	h3 {
		font-size: 1.7em;
	}

	.like-btn {
		position: relative;
		border: none;
		width: 4.5em;
		height: 3em;
		border-radius: 0.5em;
		background: var(--color-light-grey);
		display: flex;
		justify-content: space-around;
		align-items: center;
		transition: all 0.4s;
		overflow: hidden;
	}

	.like-btn span {
		color: var(--color-white);
	}

	.like-btn i:nth-child(1) {
		color: var(--color-white);
	}

	.like-btn i:nth-child(2) {
		color: var(--color-white);
	}

	.is-liked {
		display: block;
	}

	.not-liked {
		display: none;
	}

	.is-liked-background {
		background-color: var(--color-accent-action);
		transition: all 0.2s ease-in;
	}

	.not-liked-background {
		transition: all 0.2s ease-in;
	}

	@keyframes bouncy {
		from,
		to {
			transform: scale(1, 1);
		}
		25% {
			transform: scale(0.9, 1.1);
		}
		50% {
			transform: scale(1.1, 0.9);
		}
		75% {
			transform: scale(0.95, 1.05);
		}
	}

	.bouncy {
		-webkit-animation: bouncy 0.6s;
		animation: bouncy 0.6s;
		-webkit-animation-duration: 0.6s;
		animation-duration: 0.6s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

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
	}

	main header {
		display: flex;
		flex-direction: column-reverse;
		margin-top: 1em;
	}

	main header h2 {
		margin-bottom: 0;
		font-size: 2em;
	}

	.download-button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 3rem 2rem;
	}

	.download-button-container p {
		text-align: center;
	}

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
