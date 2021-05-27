<script>
	export let ErrorMessage;
</script>

<article>
	<h1>{ErrorMessage}</h1>
	<p>The following games are offline available:</p>
</article>

<style>
	article {
		background-color: var(--color-lighter-grey);
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		justify-content: space-between;
	}

	article h1 {
		color: var(--color-dark-blue);
		display: flex;
		justify-content: space-between;
		margin: 0;
		margin-bottom: 1em;
	}

	article p {
	}
</style>
