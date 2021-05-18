<header>
	<h1>John Doe</h1>
	<h2>Goedemorgen</h2>
</header>
<section id="search-container">
	<input type="text" placeholder="Zoeken" />
	<button>F</button>
</section>
<div class="highlight-image" />
<section>
	<h2>Spellen</h2>
	<article>
		<h3>Hoepel</h3>
		<p>Groep 3-6</p>
	</article>
	<article>
		<h3>Verstoppertje</h3>
		<p>Groep 3-8</p>
	</article>
</section>

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

	article {
		background-color: #f3f3f3;
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		display: flex;
		flex-direction: column-reverse;
	}

	article h3 {
		margin: 0.5em 0;
	}

	article p {
		margin: 0;
	}

	button:hover {
		cursor: pointer;
	}

	button:active {
		transform: scale(0.98);
		transition: transform 0.2s;
	}
	.highlight-image {
		width: 100%;
		height: 12.5em;
		background-color: var(--color-turquoise);
		border-radius: 1em;
		margin: 2em 0;
	}

	#search-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	#search-container button {
		background-color: var(--color-light-orange);
		border: none;
		border-radius: 1em;
		width: 4em;
		height: 4em;
	}

	#search-container input[type='text'] {
		width: 80%;
		height: 4em;
		border-radius: 1em;
		border: none;
		background-color: #fafafa;
	}
</style>
