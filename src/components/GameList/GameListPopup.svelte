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
</script>

<section class="filter-popup">
	<h1>Filter op groepen</h1>
	<form on:submit|preventDefault={submitForm}>
		{#if filterTitle !== 'minimumPlayers'}
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
		{:else}
			<fieldset class="min-player-fieldset">
				<!-- <label for="minimumPlayerFilter">Voer minimaal aantal spelers in:</label>

				<input type="number" id="minimumPlayerFilter" name="minimumPlayerFilter" min="0" max="99" /> -->

				<div class="number">
					<span>-</span>
					<input type="text" value="1" />
					<span>+</span>
				</div>
			</fieldset>
		{/if}

		<button class="submit-btn" type="submit">Toepassen</button>
	</form>
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
		justify-content: space-between;
	}

	.min-player-fieldset input {
		display: block;
	}

	.min-player-fieldset div {
		display: flex;
	}

	.min-player-fieldset div span {
		padding: 1rem;
		background: #f2f2f2;
		border-radius: 0.4em;
		border: 1px solid #ddd;
	}
</style>
