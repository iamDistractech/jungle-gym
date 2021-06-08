<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let query;

	let search;

	let searchQuery;

	$: searchQuery = query.get('search');

	const submitForm = () => {
		if (search.length == 0) {
			goto(`/spellen/`);
			return;
		} else {
			const searchParams = new URLSearchParams([['search', search]]);

			goto(`/spellen/?${searchParams.toString()}`)
				.then(() => dispatch('searchFilter'))
				.then(() => clearFilter);
		}
	};

	const clearFilter = (event) => {
		event.target[0].value = '';
	};

	const resetSearchFilter = () => {
		goto(`/spellen/`);
	};
</script>

<form on:submit|preventDefault={submitForm}>
	<input type="text" placeholder="Search..." bind:value={search} />
	<button type="submit"><i class="material-icons"> search </i></button>

	<button on:click|preventDefault={resetSearchFilter}
		><i class="material-icons"> restart_alt </i></button
	>
</form>

{#if searchQuery}
	<p>Er wordt gefilterd op: {searchQuery}</p>
{/if}

<style>
	input {
		border: 2px solid var(--color-base-light);
		border-radius: 1rem;
		padding: 0.5rem 1.3rem;
		width: 100%;
		margin-right: 0.3rem;
	}

	form {
		display: flex;
	}

	i {
		font-size: 1.7rem;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		border: none;
	}
</style>
