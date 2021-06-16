<script>
	export let title;
	export let message;
</script>

<article>
	<h1>{title}</h1>
	<p>{message}</p>
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
		margin-bottom: 0.5em;
		font-size: 1em;
	}

	article p {
		margin: 0;
	}
</style>
