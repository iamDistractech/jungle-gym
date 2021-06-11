<script>
	export let Title;
	export let Message;
</script>

<article>
	<h1>{Title}</h1>
	<p>{Message}</p>
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
		margin-bottom: .5em;
		font-size: 1em;
	}

	article p {
		margin: 0;
	}
</style>
