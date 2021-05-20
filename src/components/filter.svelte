<script>
	import FilterPopUp from '../components/FilterPopUp.svelte';
	import FilterButton from '../components/button/FilterButton.svelte';

	let open = false;

	function showDropdown() {
		open = !open;
	}

	let filterState = false;

	function handleFilterToggle() {
		filterState = !filterState;
	}
</script>

<section id="filter-container">
	<button id="filter-dropdown-button" class="no-transform-button" on:click={showDropdown}>
		Filter
		<img src="../icons/filter.svg" alt="Filter icon" />
		<img
			class:dropdown-close={open}
			class:dropdown-open={!open}
			src="../icons/dropdown.svg"
			alt="Dropdown icon"
		/>
	</button>
	<article id="filter-options" class:filter-options-close={!open} class:filter-options-open={open}>
		<FilterButton filterTitle="Spelsoort" on:click={handleFilterToggle} />
		<FilterButton filterTitle="Groepen" on:click={handleFilterToggle} />
		<FilterButton filterTitle="Leerlingenaantal" on:click={handleFilterToggle} />
		<FilterButton filterTitle="Materialen" on:click={handleFilterToggle} />
	</article>
</section>

{#if filterState}
	<FilterPopUp on:close={handleFilterToggle} />
{/if}

<style>
	button {
		font-family: var(--font-heading);
		font-size: 1rem;
		border-radius: 1em;
		cursor: pointer;
		border: none;
	}

	#filter-container button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-light-orange);
		padding: 0em 1em;
		width: 100%;
		height: 3em;
	}

	#filter-container button img:nth-of-type(1) {
		padding: 0em 0.5em;
		width: 1.1em;
		height: 1.1em;
	}

	.dropdown-close {
		padding: 0em 0.5em;
		margin-left: auto;
		width: 0.75em;
		height: 0.75em;
		transform: rotate(180deg);
		transition: transform 200ms linear;
	}

	.dropdown-open {
		padding: 0em 0.5em;
		margin-left: auto;
		width: 0.75em;
		height: 0.75em;
		transform: rotate(0deg);
		transition: transform 200ms linear;
	}

	#filter-options {
		background-color: var(--color-light-orange);
		margin-top: -1em;
		border-radius: 0em 0em 2em 2em;
	}

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

	#filter-options button {
		width: 90%;
		margin: 0.5em auto;
		background-color: var(--color-white);
	}
</style>
