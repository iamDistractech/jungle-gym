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
	import DownloadButton from '$lib/shared/Button/DownloadButton.svelte';

	/* Utils */
	import { formatTargetGroups } from '$lib/Utils/formatTargetGroups';
	import { patchSingleGameOfflineStatus } from '$lib/Utils/offline';
	import { onMount } from 'svelte';
	import LikeButton from '$lib/shared/Button/LikeButton.svelte';

	/* Stores */
	import { page } from '$app/stores';
	import { messageStore } from '$lib/Stores/message';

	export let game: Game;
	let gameSlug: string = $page.params.game;
	let pwa = false;

	let message: string | undefined;
	let showSnackbar: boolean;

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
			message = 'De download van dit spel is verwijdererd';
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
		<h2>{game.name}</h2>
		<a href="/spellen"><i class="material-icons">arrow_back</i>Speloverzicht</a>
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

	<section class="utility-bar">
		{#if pwa}
			<DownloadButton
				on:saved={savedHandler}
				on:deleted={deletedHandler}
				offline={game.offline}
				slug={gameSlug}
			/>
		{/if}
		<LikeButton />
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
	}
	section h1 {
		margin-left: 0;
	}

	header a {
		order: -1;
		display: flex;
		align-items: center;
		color: var(--color-accent-dark);
		font-size: 14px;
		font-style: italic;
		margin-bottom: 1.5em;
	}

	header a i {
		font-size: inherit;
		border: solid 2px var(--color-accent-dark);
		border-radius: 100%;
		padding: 0.2rem;
		margin-right: 0.5em;
	}

	header a:hover,
	header a:focus {
		--color-accent-dark: var(--color-accent-action);
	}

	/* Content sections */
	section.materials ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	section.materials ul li {
		margin: 0.3em;
		margin-left: 0;
	}

	section.utility-bar {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
</style>
