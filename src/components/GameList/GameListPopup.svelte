<script>
	import { createEventDispatcher } from 'svelte';
	export let filterItems;
	export let filterTitle;
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function closeFilter() {
		dispatch('close');
	}

	let filterButtons = [];

	function submitForm() {
		let queries = filterButtons.map((activeFilter) => [filterTitle, activeFilter]);
		const searchParams = new URLSearchParams(queries);
		goto(`/?${searchParams.toString()}`).then(() => closeFilter());
	}
</script>

<section in:fly={{ y: 500, duration: 500 }} out:fly={{ y: 500, duration: 500 }}>
	<hr />
	<h1>Filter op groepen</h1>
	<form on:submit|preventDefault={submitForm}>
		<fieldset>
			{#if filterItems}
				{#each filterItems as { name, value }}
					<input bind:group={filterButtons} type="checkbox" id={name} name="filter-group" {value} />
					<label for={name}>{name}</label>
				{/each}
			{/if}
		</fieldset>

		<button class="submit-btn" type="submit">Toepassen</button>
	</form>
	<button class="cancel-btn" on:click={closeFilter}>Annuleren</button>
</section>
<div transition:fade class="black-overlay" on:click={closeFilter} />

<style>
	.filter-options-open {
		max-height: 31.25em;
		padding: 1.5em 1em;
		overflow: hidden;
		transition: max-height 0.25s ease-in, padding 0.25s ease-in;
	}

	.filter-options-close {
		max-height: 0;
		padding: 0 1rem;
		transition: max-height 0.15s ease-out, padding 0.15s ease-out;
		overflow: hidden;
	}

	section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
		z-index: 1;
		padding: 1rem;
		border-radius: 3em 3em 0em 0em;
	}

	section h1 {
		text-align: center;
	}

	section hr {
		width: 10%;
		border: 2px solid var(--color-light-orange);
		border-radius: 2em;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		border: none;
		padding: 0;
		margin: 0;
		max-height: 30vh;
		overflow-y: auto;
	}

	label {
		padding: 0.7rem 2rem;
		border: 1px solid black;
		border-radius: 1rem;
		margin-bottom: 1rem;
		cursor: pointer;
		transition: 0.2s;
	}

	input {
		display: none;
	}

	input:checked + label {
		border: 1px solid var(--color-light-orange);
		color: var(--color-light-orange);
	}

	.black-overlay {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 0;
	}
</style>
