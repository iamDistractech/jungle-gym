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
	import MaterialButton from '$lib/shared/Button/MaterialButton.svelte';
	import Accordion from '$lib/shared/Modals/Accordion.svelte';
	import MaterialModal from '$lib/shared/Modals/MaterialModal.svelte';
	import CardLabel from '$lib/shared/Label/CardLabel.svelte';
	import OfflineLabel from '$lib/shared/Label/OfflineLabel.svelte';
	import SaveInGymlesButton from '$lib/shared/Button/SaveInGymlesButton.svelte';
	import BackButton from '$lib/shared/Button/BackButton.svelte';

	/* Utils */
	import { formatTargetGroups } from '$lib/Utils/formatTargetGroups';
	import { patchSingleGameOfflineStatus } from '$lib/Utils/offline';
	import { onMount } from 'svelte';

	/* Stores */
	import { page } from '$app/stores';
	import { messageStore } from '$lib/Stores/message';

	export let game: Game;
	let gameSlug: string = $page.params.game;
	let pwa = false;

	let message: string | undefined;

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
		if ('caches' in window) {
			pwa = true;
			patchSingleGameOfflineStatus(game).then((patchedGame) => (game = patchedGame));
		}
	});
</script>

<main>
	<header>
		<section class="utility-bar">
			{#if pwa}
				<SaveInGymlesButton
					on:saved={savedHandler}
					on:deleted={deletedHandler}
					offline={game.offline}
					slug={gameSlug}
				/>
			{/if}
		</section>
		<h2>{game.name}</h2>
		<BackButton returnLink="spellen" title="Speloverzicht" />
		{#if game.offline}
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

	<section class="rules">
		<h1>Spelregels</h1>
		<ul>
			{#each game.rules as rule}
				<li>{rule}</li>
			{/each}
		</ul>
	</section>

	<section class="=variations">
		<h1>Variaties</h1>
		<Accordion variations={game.variation} />
	</section>
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

	section {
		padding: 0 0.5rem;
		margin-top: 0;
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
</style>
