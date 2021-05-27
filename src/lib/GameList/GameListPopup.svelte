<script>
	import { createEventDispatcher } from 'svelte';
	import SubmitButton from '$lib/shared/Button/SubmitButton.svelte';
	import CancelButton from '$lib/shared/Button/CancelButton.svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	export let activeQueries;
	export let filterItems;
	export let filterTitle;

	const dispatch = createEventDispatcher();

	function closeFilter() {
		dispatch('close');
	}

	let filterButtons = activeQueries;

	function submitForm() {
		let queries = filterButtons.map((activeFilter) => [filterTitle, activeFilter]);

		const searchParams = new URLSearchParams(queries);
		goto(`/?${searchParams.toString()}`).then(() => closeFilter());
	}

	function submitMinimalPlayerForm(minimulPlayerCount) {
		let queries = [filterTitle, minimulPlayerCount];

		const searchParams = new URLSearchParams([queries]);
		goto(`/?${searchParams.toString()}`).then(() => closeFilter());
	}

	let minimulPlayerCount = 1;
	const decreaseCount = () => {
		minimulPlayerCount = minimulPlayerCount - 1;
	};
	const increaseCount = () => {
		minimulPlayerCount = minimulPlayerCount + 1;
	};
</script>

<section in:fly={{ y: 500, duration: 500 }} out:fly={{ y: 500, duration: 500 }}>
	<hr />
	<h1>Filter op {filterTitle}</h1>
	{#if filterTitle !== 'minimumPlayers'}
		<form on:submit|preventDefault={submitForm}>
			<fieldset>
				{#if filterItems}
					{#each filterItems as { name, value }}
						<input
							bind:group={filterButtons}
							type="checkbox"
							id={name}
							name="filter-group"
							{value}
						/>
						<label for={name}>{name}</label>
					{/each}
				{/if}
			</fieldset>
			<SubmitButton>Toepassen</SubmitButton>
		</form>
	{:else}
		<form on:submit|preventDefault={() => submitMinimalPlayerForm(minimulPlayerCount)}>
			<fieldset class="min-player-fieldset">
				<div class="number">
					<span on:click={decreaseCount}>-</span>
					<input type="number" bind:value={minimulPlayerCount} />
					<span on:click={increaseCount}>+</span>
				</div>
			</fieldset>
			<SubmitButton>Toepassen</SubmitButton>
		</form>
	{/if}
	<CancelButton on:click={closeFilter}>Annuleren</CancelButton>
</section>
<div transition:fade class="black-overlay" on:click={closeFilter} />

<style>
	section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--color-white);
		z-index: 1;
		padding: 1em;
		border-radius: 3em 3em 0em 0em;
	}

	section h1 {
		text-align: center;
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
		padding: 0.7em 2em;
		border: 1px solid black;
		border-radius: 1em;
		margin-bottom: 1em;
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

	.min-player-fieldset {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 2em 0;
	}

	.min-player-fieldset input {
		display: block;
		text-align: center;

		font-size: 1.6em;
		border: 1px solid #ddd;
		border-radius: 0.4em;
	}

	.min-player-fieldset div {
		display: flex;
	}

	.min-player-fieldset div span {
		padding: 1em;
		background: #f2f2f2;
		border-radius: 0.4em;
		border: 1px solid #ddd;
		margin: 0em 0.4em;

		cursor: pointer;
	}
</style>
