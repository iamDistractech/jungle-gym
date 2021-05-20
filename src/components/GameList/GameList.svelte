<script>
		import GameListCard from '$lib/GameList/GameListCard.svelte';



</script>

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

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0
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