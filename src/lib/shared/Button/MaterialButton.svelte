<button on:click>
	<slot>Button</slot>
</button>

<style>
	button {
		font-size: 1em;
		padding: 0.4em 2.5rem;
		min-width: 7em;
		text-align: center;
		color: var(--color-accent-dark);
		border: 0.15em solid var(--color-base-light);
		background-color: var(--color-base-light);
		border-radius: 0.75em;
		margin: 0em 1rem 1rem 0;
		transition: 0.2s;
	}

	button:hover,
	button:focus {
		border: 0.15em solid var(--color-base-light);
		background: transparent;
	}
</style>
