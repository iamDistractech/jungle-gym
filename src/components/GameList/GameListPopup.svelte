<script>
	import { createEventDispatcher } from 'svelte';
	export let filterItems;
	export let filterTitle;
	import { goto } from '$app/navigation';

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

<section class="filter-popup">
	<h1>Filter op groepen</h1>
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
			<button class="submit-btn" type="submit">Toepassen</button>
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
			<button class="submit-btn" type="submit">Toepassen</button>
		</form>
	{/if}
	<button class="cancel-btn" on:click={closeFilter}>Annuleren</button>
</section>

<div class="black-overlay" />

<style>
	.filter-popup {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
		z-index: 1;
		padding: 1rem;
	}

	.filter-popup h1 {
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
		max-height: 60vh;
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

	.min-player-fieldset {
		display: flex;
		flex-direction: row;
		justify-content: center;

		padding: 2rem 0;
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
		padding: 1rem;
		background: #f2f2f2;
		border-radius: 0.4em;
		border: 1px solid #ddd;
		margin: 0rem 0.4rem;

		cursor: pointer;
	}
</style>
