<script>
</script>

<section id="filter-container">
	<button
		>Filter
		<img src="../icons/filter.svg" alt="Filter icon" />
		<img src="../icons/dropdown.svg" alt="Dropdown icon" />
	</button>
</section>

<style>
	#filter-container button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		background-color: var(--color-light-orange);
		cursor: pointer;
		border: none;
		padding: 0em 1em;
		border-radius: 1em;
		width: 100%;
		height: 3em;
	}

	#filter-container button img:nth-of-type(1) {
		padding: 0em 0.5em;
		width: 32x;
		height: 32px;
	}

	#filter-container button img:nth-of-type(2) {
		padding: 0em 0.5em;
		margin-left: auto;
		transform: rotate(90deg);
		width: 20px;
		height: 20px;
	}
</style>
