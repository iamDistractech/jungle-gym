<button on:click type="submit">
	<slot>Button</slot>
</button>

<style>
	button {
		padding: 0.75em;
		border-radius: 1em;
		border: none;
		font-size: 1em;
		background: var(--color-light-orange);
		color: var(--color-black);
		margin: 0.5em 0;
		cursor: pointer;
		min-width: 7em;
		text-align: center;
	}
</style>
