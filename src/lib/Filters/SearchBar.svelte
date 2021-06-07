<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// export let data;
	// console.log(data);
	let search;

	const submitForm = (event) => {
		const searchParams = new URLSearchParams([['search', search]]);

		goto(`/spellen/?${searchParams.toString()}`)
			.then(() => dispatch('searchFilter'))
			.then(() => clearFilter);
	};

	const clearFilter = (event) => {
		event.target[0].value = '';
	};
</script>

<form on:submit|preventDefault={submitForm}>
	<input type="text" placeholder="Search..." bind:value={search} />
	<button type="submit">Submit</button>
</form>

<!-- {#if data}
	<p>Er wordt gefilterd op: {data}</p>
{/if} -->
