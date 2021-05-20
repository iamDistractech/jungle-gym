<script>
	import GameListCard from '../components/GameList/GameListCard.svelte';
	import GameListFilter from '../components/GameList/GameListFilter.svelte';
	import GameListPopup from '../components/GameList/GameListPopup.svelte';
</script>

<header>
	<h1>John Doe</h1>
	<h2>Goedemorgen!</h2>
</header>
<GameListFilter />
<section>
	<GameListCard
		titleGame="Kat en Muis"
		groups="Alle groepen"
		gameName="Tikspel"
		personAmount="Min 5"
		gameSlug="kat-en-muis"
		isHighlighted={true}
	/>
</section>
<section>
	<h1>Spellen</h1>
	<ul>
		<li>
			<GameListCard
				titleGame="Pionnenroof"
				groups="Alle groepen"
				gameName="Tikspel"
				personAmount="Min 2"
				gameSlug="pionnenroof"
			/>
		</li>
		<li>
			<GameListCard
				titleGame="Fopbal"
				groups="Alle groepen"
				gameName="Balspel"
				personAmount="Min 3"
				gameSlug="fopbal"
			/>
		</li>
		<li>
			<GameListCard
				titleGame="Leeuwenkooi"
				groups="Alle groepen"
				gameName="Tikspel"
				personAmount="Min 5"
				gameSlug="leeuwenkooi"
			/>
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
		padding: 0;
	}

	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}
</style>
