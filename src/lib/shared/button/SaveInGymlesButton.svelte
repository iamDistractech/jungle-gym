<script lang="ts">
	import { messageStore } from '$lib/stores/message';

	import { userStore } from '$lib/stores/user';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let savedGame: boolean;
	export let slug: string;

	async function downloadGame() {
		if (navigator.onLine)
			userStore.saveGame(slug).then((success) => dispatcher('saved', { success }));
		else messageStore.set('Zonder internet kan je de game niet opslaan in Mijn Gymles');
	}

	async function deleteGame() {
		if (navigator.onLine)
			userStore.removeGame(slug).then((success) => dispatcher('deleted', { success }));
		else messageStore.set('Zonder internet kan je de game niet verwijderen uit Mijn Gymles');
	}
</script>

{#if savedGame}
	<button class="remove" on:click={deleteGame}
		><i class="material-icons">bookmark_remove</i>Verwijder uit mijn gymles</button
	>
{:else}
	<button on:click={downloadGame}
		><i class="material-icons-outlined">bookmark_add</i>Opslaan in mijn gymles</button
	>
{/if}

<style>
	button {
		margin: 0 0.25em;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		padding: 0.75em;
		min-width: 7em;
		text-align: center;
		color: var(--color-accent-dark);
		border: none;
		border-radius: 0.5em;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(161, 161, 161, 0.3) 0px 1px 3px -1px;
		background-color: var(--color-base-light);
	}

	button i {
		font-size: inherit;
		margin-right: 0.5em;
	}

	.remove {
		--color-base-light: var(--color-light-grey);
	}
</style>
