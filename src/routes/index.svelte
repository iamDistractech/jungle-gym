<script>
	import GameList from '$lib/GameList/GameList.svelte'
	import GameListCard from '$lib/GameList/GameListCard.svelte';
	import GameListFilter from '$lib/GameList/GameListFilter.svelte';
	import GameListPopup from '$lib/GameList/GameListPopup.svelte';
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
<GameList/>

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

	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}

	
</style>
