<script>
	export let ErrorTitle;
	export let ErrorMessage;
</script>

<article>
	<h1>{ErrorTitle}</h1>
	<p>{ErrorMessage}</p>
</article>

<style>
	article {
		background-color: var(--color-light-grey);
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		justify-content: space-between;
	}

	article h1 {
		display: flex;
		justify-content: space-between;
		margin: 0;
		margin-bottom: 1em;
	}

	article p {
		color: var(--color-grey);
	}
</style>
