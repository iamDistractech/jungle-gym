<script>
	import { goto } from '$app/navigation';

	export let query;
	let categoryFiltered;
	$: categoryFiltered = query.getAll('category');
	const removeCategoryFilter = () => {
		query.delete('category');

		goto(`/spellen/?${query}`);
		categoryFiltered.length = 0;
	};
</script>

<div>
	{#if categoryFiltered.length > 0}
		<button on:click={removeCategoryFilter}>Categorie <span>-</span></button>
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
