<script>
	let open = false;

	function showDropdown() {
		open = !open;
	}
</script>

<section id="filter-container">
	<button id="filterDropdownButton" on:click={showDropdown}
		>Filter
		<img src="../icons/filter.svg" alt="Filter icon" />
		<img
			class:dropdownClose={open}
			class:dropdownOpen={!open}
			src="../icons/dropdown.svg"
			alt="Dropdown icon"
		/>
	</button>
	<article id="filter-options" class:filterOptionsClose={!open} class:filterOptionsOpen={open}>
		<button>Spelsoort</button>
		<button>Groepen</button>
		<button>Leerlingenaantal</button>
		<button>Materialen</button>
	</article>
</section>

<style>
	button {
		font-family: var(--font-heading);
		font-size: 1.2rem;
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
		width: 32x;
		height: 32px;
	}

	.dropdownClose {
		padding: 0em 0.5em;
		margin-left: auto;
		width: 20px;
		height: 20px;
		transform: rotate(0deg);
		transition: transform 200ms linear;
	}

	.dropdownOpen {
		padding: 0em 0.5em;
		margin-left: auto;
		width: 20px;
		height: 20px;
		transform: rotate(90deg);
		transition: transform 200ms linear;
	}

	#filter-options {
		background-color: var(--color-light-orange);
		margin-top: -1em;
		border-radius: 0em 0em 2em 2em;
	}

	.filterOptionsOpen {
		max-height: 500px;
		padding: 1.5em 0em;
		overflow: hidden;
		transition: max-height 0.25s ease-in, padding 0.25s ease-in;
	}

	.filterOptionsClose {
		max-height: 0;
		padding: 0em;
		transition: max-height 0.15s ease-out, padding 0.15s ease-out;
		overflow: hidden;
		background: #d5d5d5;
	}

	#filter-options button {
		width: 90%;
		margin: 0.5em auto;
		background-color: var(--color-white);
	}
</style>
