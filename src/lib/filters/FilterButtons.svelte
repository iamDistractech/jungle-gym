<script>
	import { goto } from '$app/navigation';

	export let query;

	let categoryFiltered;
	let targetGroupFiltered;
	let minimumPlayersFiltered;
	let materialFiltered;

	$: categoryFiltered = query.getAll('category');
	$: targetGroupFiltered = query.getAll('targetGroup');
	$: minimumPlayersFiltered = query.getAll('minimumPlayers');
	$: materialFiltered = query.getAll('material');

	const removeCategoryFilter = () => {
		query.delete('category');
		goto(`/spellen/?${query}`);
		categoryFiltered.length = 0;
	};

	const removeTargetGroupFilter = () => {
		query.delete('targetGroup');
		goto(`/spellen/?${query}`);
		targetGroupFiltered.length = 0;
	};

	const removeMinimumPlayerFilter = () => {
		query.delete('minimumPlayers');
		goto(`/spellen/?${query}`);
		minimumPlayersFiltered.length = 0;
	};

	const removeMaterialFilter = () => {
		query.delete('material');
		goto(`/spellen/?${query}`);
		materialFiltered.length = 0;
	};
</script>

<div>
	{#if categoryFiltered.length > 0}
		<button on:click={removeCategoryFilter}>Spelsoort <span>-</span></button>
	{/if}
	{#if targetGroupFiltered.length > 0}
		<button on:click={removeTargetGroupFilter}>Groepen <span>-</span></button>
	{/if}
	{#if minimumPlayersFiltered.length > 0}
		<button on:click={removeMinimumPlayerFilter}>Minimum spelers <span>-</span></button>
	{/if}
	{#if materialFiltered.length > 0}
		<button on:click={removeMaterialFilter}>Materialen <span>-</span></button>
	{/if}
</div>

<style>
	button {
		padding: 0.3rem 0.7rem;
		border-radius: 1.5rem;
		background: none;
		margin: 1rem 1rem 1rem 0;
		border: 1px solid var(--color-grey);
		color: var(--color-grey);
		display: flex;
		align-items: center;
	}
	button span {
		font-size: 1.6rem;
		line-height: 0;
		padding-left: 0.3rem;
	}
</style>
