<script>
	import { slide } from 'svelte/transition';
	export let variation;
	console.log(variation);
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<button on:click={toggle} aria-expanded={isOpen}> {variation.description} </button>

{#each variation.actions as action}
	{#if isOpen}
		<ul transition:slide={{ duration: 300 }}>
			{#each variation.actions as action}
				{action.description || action}
			{/each}
		</ul>
	{/if}
{/each}

<style>
	button {
		background: transparent;
		border: 2px solid var(--color-light-orange);
		width: 100%;
		padding: 0.7rem 1rem;
		border-radius: 0.6rem;
		margin-top: 1rem;
	}

	button:first-of-type {
		margin-top: 0;
	}

	ul {
		border: 2px solid var(--color-light-orange);
		padding: 1.2rem 2rem;
		border-radius: 0 0 0.6rem 0.6rem;
		border-top: 0;
		margin-top: -0.3rem;
	}
</style>
