<script lang="ts">
	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import { saveInCache, deleteInCache } from '$lib/Utils/offline';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let offline: boolean;
	export let slug: string;

	async function downloadGame() {
		saveInCache(slug).then((success) => dispatcher('saved', { success }));
	}

	async function deleteGame() {
		deleteInCache(slug).then((success) => dispatcher('deleted', { success }));
	}
</script>

{#if offline}
	<ButtonLight on:click={deleteGame}>Verwijder download</ButtonLight>
{:else}
	<ButtonLight on:click={downloadGame}>Download dit spel</ButtonLight>
{/if}
