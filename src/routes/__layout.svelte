<script>
	import '../fonts.css';
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style>
	header {
		font-family: var(--font-heading);
		display: flex;
		flex-direction: column-reverse;
		padding: 2em 0 1em;
	}

	header h2 {
		margin: 0;
		color: var(--color-grey);
		font-weight: 400;
		font-size: 1em;
	}
</style>
