<script>
	import { createEventDispatcher } from 'svelte';
	export let filterItems;

	const dispatch = createEventDispatcher();

	function closeFilter() {
		dispatch('close');
	}

	import { onMount } from 'svelte';
	export let checkedInputs = [];

	function selectValue() {
		const inputs = document.querySelectorAll('fieldset input');
		inputs.forEach((input) => {
			input.addEventListener('click', () => {
				if (input.checked == true) {
					checkedInputs.push(input.value);
				} else if (input.checked == false) {
					checkedInputs.pop(input.value);
				}
			});
		});

		const submitBtn = document.querySelector('.submit-btn');
		submitBtn.addEventListener('click', (event) => {
			event.preventDefault();
			console.log('prevented?');
		});
	}

	onMount(() => selectValue());
</script>

<section class="filter-popup">
	<h1>Filter op groepen</h1>
	<form>
		<fieldset>
			{#if filterItems}
				{#each filterItems as { name }}
					<input type="checkbox" id={name} name="filter-group" value={name} />
					<label for={name}>{name}</label>
				{/each}
			{/if}
		</fieldset>

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
		overflow-y: auto;
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
		height: 18em;
		overflow: scroll;
		padding: 0;
		margin: 0;
	}

	label {
		padding: 1rem 2rem;
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

	legend {
		padding-bottom: 1rem;
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
