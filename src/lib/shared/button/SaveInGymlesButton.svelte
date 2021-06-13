<script lang="ts">
	import { saveInCache, deleteInCache } from '$lib/utils/offline';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let savedGame: boolean;
	export let slug: string;

	async function downloadGame() {
		saveInCache(slug).then((success) => dispatcher('saved', { success }));
	}

	async function deleteGame() {
		deleteInCache(slug).then((success) => dispatcher('deleted', { success }));
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
