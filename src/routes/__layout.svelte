<script>
	import '../fonts.css';
	import '../app.css';
</script>

<header>
	<h1>John Doe</h1>
	<h2>Goedemorgen!</h2>
</header>
<main>
	<slot />
</main>

<style>
	header {
		font-family: var(--font-heading);
		display: flex;
		flex-direction: column-reverse;
		padding: 2rem 0 1rem;
	}

	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}
</style>
