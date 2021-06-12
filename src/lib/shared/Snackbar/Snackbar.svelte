<script>
	import { fly } from 'svelte/transition';
	import { messageStore } from '$lib/stores/message';

	let message;
	let timeOut;
	let showSnackbar = false;

	messageStore.subscribe((newMessage) => {
		if (newMessage) {
			showSnackbar = true;
			message = newMessage;
			timeOut = setTimeout(() => {
				showSnackbar = false;
			}, 5000);
		}
	});
</script>

{#if showSnackbar}
	<aside in:fly={{ x: -400, duration: 500 }} out:fly={{ x: -400, duration: 500 }}>
		<h1>{message}</h1>
		<button on:click={() => (showSnackbar = !showSnackbar)} on:click={() => clearTimeout(timeOut)}
			>Close</button
		>
	</aside>
{/if}

<style>
	aside {
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

	aside button {
		color: var(--color-white);
		cursor: pointer;
		border: none;
		background-color: transparent;
	}
</style>
