<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let filterTitle;

	function openFilter() {
		dispatch('open');
	}
</script>

<button on:click={openFilter}>{filterTitle}</button>

<style>
	button {
		font-family: var(--font-heading);
		font-size: 1rem;
		border-radius: 1em;
		cursor: pointer;
		border: none;
		width: 100%;
		padding: 0.7em 1em;
		margin-bottom: 0.8em;
	}
</style>
