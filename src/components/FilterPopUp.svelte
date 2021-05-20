<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeFilter() {
		dispatch('close');
	}
</script>

<section class="filter-popup">
	<h1>Filter op groepen</h1>
	<form>
		<fieldset>
			<legend>Groepen</legend>

			<input type="checkbox" id="group-1-2" name="filter-group" value="12" />
			<label for="group-1-2">Groep 1 en 2</label>
			<input type="checkbox" id="group-3-4" name="filter-group" value="34" />
			<label for="group-3-4">Groep 3 en 4</label>
			<input type="checkbox" id="group-5-6" name="filter-group" value="45" />
			<label for="group-5-6">Groep 5 en 6</label>
			<input type="checkbox" id="group-7-8" name="filter-group" value="67" />
			<label for="group-7-8">Groep 7 en 8</label>
			<input type="checkbox" id="all-groups" name="filter-group" value="all" />
			<label for="all-groups">Alle jaarlagen</label>
		</fieldset>

		<button class="submit-btn" type="submit">Toepassen</button>
	</form>
	<button class="cancel-btn" on:click={closeFilter}>Annuleren</button>
</section>

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

	.filter-popup.hide {
		display: none;
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
