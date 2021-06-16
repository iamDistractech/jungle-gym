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
	/* Typings */
	import type { Game, Material } from '$lib/games';

	/* Components */
	import MaterialButton from '$lib/shared/button/MaterialButton.svelte';
	import Accordion from '$lib/shared/modals/Accordion.svelte';
	import MaterialModal from '$lib/shared/modals/MaterialModal.svelte';
	import CardLabel from '$lib/shared/label/CardLabel.svelte';
	import OfflineLabel from '$lib/shared/label/OfflineLabel.svelte';
	import SaveInGymlesButton from '$lib/shared/button/SaveInGymlesButton.svelte';
	import BackButton from '$lib/shared/button/BackButton.svelte';
	import GameReview from '$lib/views/GameReview.svelte';

	/* Utils */
	import { formatTargetGroups } from '$lib/utils/format';
	import { patchSingleGameOfflineStatus } from '$lib/utils/offline';
	import { onMount } from 'svelte';

	/* Stores */
	import { page, session as SessionStorage } from '$app/stores';
	import { messageStore } from '$lib/stores/message';

	export let game: Game;

	const isAuthenticated = $SessionStorage.authenticated;

	let gameSlug: string = $page.params.game;
	let message: string | undefined;
	let userIsOnline = true;
	let pwa = false;

	const targetGroupString = formatTargetGroups(game.targetGroup);

	let isModalOpen = false;
	let clickedMaterial;

	function toggleModal(material: Material['name']) {
		isModalOpen = !isModalOpen;
		clickedMaterial = material;
	}

	function savedHandler(event) {
		const { success } = event.detail;
		if (success) {
			message = 'Dit spel is nu gedownload';
			game.offline = true;
		} else message = 'Er ging iets mis met opslaan';
		messageStore.set(message);
	}

	function deletedHandler(event) {
		const { success } = event.detail;
		if (success) {
			message = 'De download van dit spel is verwijderd';
			game.offline = false;
		} else message = 'Er ging iets mis met verwijderen';
		messageStore.set(message);
	}

	onMount(() => {
		userIsOnline = window.navigator.onLine ? true : false;

		if ('caches' in window) {
			pwa = true;
			patchSingleGameOfflineStatus(game).then((patchedGame) => (game = patchedGame));
		}
	});
</script>

<main>
	<header>
		{#if isAuthenticated}
			<section class="utility-bar">
				{#if pwa}
					<SaveInGymlesButton
						on:saved={savedHandler}
						on:deleted={deletedHandler}
						savedGame={game.offline}
						slug={gameSlug}
					/>
				{/if}
			</section>
		{/if}
		<h2>{game.name}</h2>
		<BackButton returnLink="/spellen" title="Speloverzicht" />
		{#if game.offline && isAuthenticated && userIsOnline}
			<OfflineLabel />
		{/if}
		<ul>
			<li><CardLabel label={targetGroupString} icon={undefined} /></li>
			<li><CardLabel label={game.category} icon={undefined} /></li>
			<li><CardLabel label={`Min. ${game.minimumPlayers} `} icon="group" /></li>
		</ul>
	</header>

	<section class="description">
		<h1>Beschrijving</h1>
		<p>{game.description}</p>
	</section>

	{#if isModalOpen}
		<MaterialModal material={clickedMaterial} on:close={toggleModal} />
	{/if}

	<section class="materials">
		<h1>Materialen</h1>
		<ul>
			{#each game.materials as material}
				<li>
					<MaterialButton on:click={toggleModal(material)}>{material.name}</MaterialButton>
				</li>
			{/each}
		</ul>
	</section>

	{#if game.image.url !== ''}
		<h1>Speelveld</h1>
		<section class="image">
			<img src={game.image.url} alt="" />
		</section>
	{/if}

	<section class="rules">
		<h1>Spelregels</h1>
		<ul>
			{#each game.rules as rule}
				<li>{rule}</li>
			{/each}
		</ul>
	</section>

	<section class="variations">
		<h1>Variaties</h1>
		<Accordion variations={game.variation} />
	</section>

	{#if userIsOnline}
		<section>
			<h1>Wat vind jij van het spel?</h1>
			<GameReview />
		</section>
	{/if}
</main>

<style>
	/* Content Heading */
	header {
		padding: 0 0.5rem;
		display: flex;
		flex-flow: column;
	}
	header h2 {
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
	section h1 {
		margin-left: 0;
	}

	/* Content sections */
	section.materials ul {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	section.materials ul li {
		margin: 0 0.3em;
		margin-left: 0;
	}

	section.utility-bar {
		order: -2;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding: 0;
	}

	section.image {
		text-align: center;
	}
	section.image img {
		margin-top: 1.5em;
		width: 90vw;
		max-width: 600px;
		max-height: 50vh;
	}
</style>
