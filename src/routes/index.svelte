<script>
	import GameListCard from '../components/GameList/GameListCard.svelte';
	import GameListFilter from '../components/GameList/GameListFilter.svelte';
	import GameListPopup from '../components/GameList/GameListPopup.svelte';
</script>

<header>
	<h1>John Doe</h1>
	<h2>Goedemorgen!</h2>
</header>
<GameListFilter/>
<section>
	<h1>Nieuw Spel</h1>
	<a href="/spel/kat-en-muis">
		<GameListCard
			titleGame="Kat en Muis"
			groups="Alle groepen"
			gameName="Tikspel"
			personAmount="Min 5"
		/>
	</a>
</section>
<section>
	<h1>Spellen</h1>
	<ul>
		<li>
			<a>
				<GameListCard
					titleGame="Pionnenroof"
					groups="Alle groepen"
					gameName="Tikspel"
					personAmount="Min 2"
					gameSlug="pionnenroof"
				/>
			</a>
		</li>
		<li>
			<a>
				<GameListCard
					titleGame="Fopbal"
					groups="Alle groepen"
					gameName="Balspel"
					personAmount="Min 3"
					gameSlug="fopbal"
				/>
			</a>
		</li>
		<li>
			<a>
				<GameListCard
				titleGame="Leeuwenkooi"
				groups="Alle groepen"
				gameName="Tikspel"
				personAmount="Min 5"
				gameSlug="leeuwenkooi"
				/>
			</a>
		</li>
	</ul>
</section>

<!-- <GameListPopup /> -->
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

	ul {
		list-style: none;
		margin: 0;
		padding: 0
	}

	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}

	section a {
		text-decoration: none;
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

	.highlight-image div h1 {
		font-size: 1.5em;
		color: var(--color-dark-blue);
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
