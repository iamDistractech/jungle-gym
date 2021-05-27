<script>
	import { fade } from 'svelte/transition';
	export let filterTitle;
</script>

<button transition:fade on:click>{filterTitle}</button>

<style>
	button {
		font-family: var(--font-heading);
		background-color: var(--color-white);
		font-size: 1em;
		border-radius: 1em;
		cursor: pointer;
		border: none;
		width: 100%;
		padding: 0.7em 1em;
		margin-bottom: 0.8em;
	}
</style>
