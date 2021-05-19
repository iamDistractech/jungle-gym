<script lang="ts">
	export let titleGame: string;
	export let groups: string;
	export let gameName: string;
	export let personAmount: string;
	export let gameSlug: string;
</script>

<article>
	<a class="hide-underline" href="/spel/{gameSlug}">
		<h1>{titleGame}</h1>
		<div class="label-container">
			<p class="label">{groups}</p>
			<p class="label">{gameName}</p>
			<p class="label">{personAmount}</p>
		</div>
	</a>
	<span>></span>
</article>

<style>
	article {
		background-color: var(--color-light-grey);
		border-radius: 1em;
		margin: 1em 0;
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	article span {
		background: var(--color-light-orange);
		border-radius: 50%;
		width: 2em;
		height: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
	}

	article h1 {
		color: var(--color-dark-blue);
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
</style>
