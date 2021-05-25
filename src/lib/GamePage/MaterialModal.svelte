<script>
	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	export let material;
</script>

<section class="material-modal">
	<h1>{material.title}</h1>

	{#if material.amount}
		<p><b>Aantal: </b>{material.amount}</p>
	{/if}

	{#if material.notes}
		<p><b>Omschrijving: </b>{material.notes}</p>
	{/if}

	<ButtonLight on:click={closeModal}>Sluiten</ButtonLight>
</section>

<div class="black-overlay" />

<style>
	.material-modal {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--color-white);
		z-index: 1;
		padding: 3em 1.5em 1em 1.5em;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		border-top-left-radius: 1em;
		border-top-right-radius: 1em;
		overflow-y: hidden;
	}

	.material-modal h1 {
		margin: 0 auto;
	}

	.material-modal p {
		margin: 0.4em 0;
	}

	.material-modal p:last-of-type {
		margin-bottom: 1.5em;
	}

	.black-overlay {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-black);
		opacity: 0.8;
		z-index: 0;
	}
</style>
