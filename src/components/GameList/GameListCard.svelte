<script lang="ts">
	export let titleGame: string;
	export let groups: string;
	export let gameName: string;
	export let personAmount: string;
	export let gameSlug: string;
	export let isHighlighted: boolean;
</script>

<article class:highlighted-card={isHighlighted}>
	<a href="/spel/{gameSlug}" class="hide-underline">
		{#if isHighlighted}
			<p>Nieuw!</p>
		{/if}

		<h1>{titleGame}</h1>
		<ul class="label-container">
			<li class="label">{groups}</li>
			<li class="label">{gameName}</li>
			<li class="label">{personAmount}</li>
		</ul>
	</a>
</article>

<style>
	article {
		background-color: var(--color-light-grey);
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		justify-content: space-between;
	}

	a {
		height: 100%;
	}

	ul {
		display: flex;
		flex-wrap: no-wrap;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 5px;
	}

	article h1 {
		color: var(--color-dark-blue);
		display: flex;
		justify-content: space-between;
	}

	article h1::after {
		content: '>';
	}

	.label {
		background-color: var(--color-light-orange);
		padding: 0.3em 1em;
		border-radius: 1em;
		margin-right: 0.5em;
		font-size: 0.8em;
		margin-bottom: 0;
	}

	.label-container {
		display: flex;
		flex-wrap: wrap;
	}

	.highlighted-card {
		height: 12em;
		background-color: var(--color-turquoise);
		border-radius: 1em;
		margin: 4em 0 2em 0;
		padding: 0.1em 1em;
	}

	.highlighted-card div h1 {
		font-size: 1.5em;
		color: var(--color-dark-blue);
	}

	.highlighted-card:focus {
		cursor: pointer;
	}
</style>
