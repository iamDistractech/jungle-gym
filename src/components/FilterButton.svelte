<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let filterTitle;

	function sayHello() {
		dispatch('toggle');
	}
</script>

<button on:click={sayHello}>{filterTitle}</button>

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
