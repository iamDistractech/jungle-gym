<script>
	import OverviewListItem from '../components/OverviewListItem.svelte';
	import Filter from '../components/filter.svelte';
	import FilterPopUp from '../components/FilterPopUp.svelte';
</script>

<div class="container">
	<header>
		<h1>John Doe</h1>
		<h2>Goedemorgen!</h2>
	</header>

	<Filter />

	<a href="/spel/kat-en-muis" class="hide-underline">
		<div class="highlight-image">
			<p>Nieuw!</p>
			<div>
				<h3>Kat en Muis</h3>
				<div class="label-container">
					<p class="label">Alle groepen</p>
					<p class="label">Tikspel</p>
					<p class="label">Min 5</p>
				</div>
			</div>
		</div>
	</a>
	<section>
		<h2>Spellen</h2>
		<OverviewListItem
			titleGame="Pionnenroof"
			groups="Alle groepen"
			gameName="Tikspel"
			personAmount="Min 2"
			gameSlug="pionnenroof"
		/>
		<OverviewListItem
			titleGame="Fopbal"
			groups="Alle groepen"
			gameName="Balspel"
			personAmount="Min 3"
			gameSlug="fopbal"
		/>
		<OverviewListItem
			titleGame="Leeuwenkooi"
			groups="Alle groepen"
			gameName="Tikspel"
			personAmount="Min 5"
			gameSlug="leeuwenkooi"
		/>
	</section>

	<!-- <FilterPopUp /> -->
</div>

<style>
	header {
		font-family: var(--font-heading);
		display: flex;
		flex-direction: column-reverse;
		margin-top: 5em;
	}

	header h1 {
		margin: 0.5em 0;
	}

	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}

	button:hover {
		cursor: pointer;
	}

	button:active {
		transform: scale(0.98);
		transition: transform 0.2s;
	}

	.highlight-image {
		height: 12.5em;
		background-color: var(--color-turquoise);
		border-radius: 1em;
		margin: 2em 0;
		padding: 0.1rem 1rem;
		display: flex;
		flex-direction: column;
	}

	.highlight-image div {
		text-align: center;
	}

	.highlight-image:focus {
		cursor: pointer;
	}

	.label {
		background-color: var(--color-light-orange);
		padding: 0.3rem 1rem;
		border-radius: 1rem;
		margin-right: 0.5rem;
		font-size: 0.8rem;
		margin-bottom: 0;
	}
	.label-container {
		display: flex;
		flex-wrap: wrap;
	}
</style>
