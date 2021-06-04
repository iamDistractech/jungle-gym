<script>
	import { fly } from 'svelte/transition';
	export let snackbarMessage;

	let showSnackbar = true;
</script>

<main>
	{#if showSnackbar}
		<article in:fly={{ x: -400, duration: 500 }} out:fly={{ x: -400, duration: 500 }}>
			<h1>{snackbarMessage}</h1>
			<button on:click={() => (showSnackbar = !showSnackbar)}>Close</button>
		</article>
	{/if}
</main>

<style>
	article {
		position: fixed;
		bottom: 1%;
		right: 5%;
		left: 5%;
		margin-bottom: 0.1em;
		display: flex;
		justify-content: space-between;
		align-content: center;
		background-color: var(--color-black);
		padding: 0.5em 1em;
		border-radius: 0.5em;
	}

	h1 {
		color: var(--color-white);
		font-size: 0.8em;
		font-weight: 200;
	}

	article button {
		color: var(--color-white);
		cursor: pointer;
		border: none;
		background-color: transparent;
	}
</style>
