<button on:click>
	<slot>Button</slot>
</button>

<style>
	button {
		font-size: 1em;
		padding: 0.75em;
		min-width: 7em;
		text-align: center;
		color: var(--color-accent-dark);
		border: 0.15em solid var(--color-base-light);
		border-radius: 0.75em;
		background-color: transparent;
	}
</style>
