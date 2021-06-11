<script>
	export let Message;
	export let redirectPage
</script>

<article>
	<h1>Inloggen</h1>
	<p>{Message}</p>
	<a  href="/inloggen?{redirectPage}">Inloggen<i class="material-icons">login</i></a>
</article>

<style>
	article {
		display: flex;
		flex-flow: column;
		background-color: var(--color-light-grey);
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		justify-content: space-between;
		align-items: flex-start;
	}

	article h1 {
		display: flex;
		justify-content: space-between;
		margin: 0;
		font-size: 1em;
	}

	article p {
		margin: .5em 0;
	}

	article a {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		padding: 0.75em;
		min-width: 7em;
		text-align: center;
		color: var(--color-accent-dark);
		border: none;
		border-radius: 0.5em;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(161, 161, 161, 0.3) 0px 1px 3px -1px;
		background-color: var(--color-base-light);
	}

	article a i {
		font-size: inherit;
		margin-left: .5em;
	}

</style>
