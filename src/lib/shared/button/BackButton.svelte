<script>
	export let returnLink = '/spellen'
	export let title = 'Speloverzicht'

</script>

<a href={returnLink}><i class="material-icons">arrow_back</i>{title}</a>

<style>
	a {
		order: -1;
		display: flex;
		align-items: center;
		color: var(--color-accent-dark);
		font-size: 14px;
		font-style: italic;
		margin-bottom: 0.5em;
	}

	a i {
		font-size: inherit;
		border: solid 2px var(--color-accent-dark);
		border-radius: 100%;
		padding: 0.2rem;
		margin-right: 0.5em;
	}

	a:hover,
	a:focus {
		--color-accent-dark: var(--color-accent-action);
	}
</style>
