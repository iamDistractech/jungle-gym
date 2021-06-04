<script lang="ts">
	export let label: string;
	export let icon: string | undefined;
</script>

<p>
	{#if icon}
		<i class="material-icons">{icon}</i>
	{/if}
	{label}
</p>

<style>
	p {
		display: flex;
		align-items: center;
		background-color: var(--color-base-light);
		color: var(--color-black);
		padding: 0.3em 1em;
		border-radius: 1em;
		font-size: 0.8em;
		margin: 0;
		text-transform: capitalize;
	}

	i {
		font-size: inherit;
		margin-right: 0.2rem;
	}
</style>
