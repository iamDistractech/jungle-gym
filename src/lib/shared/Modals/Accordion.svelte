<script>
import { each } from 'svelte/internal';

	import { slide } from 'svelte/transition';
	
	export let variations;
	console.log(variations)
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<!-- <button on:click={toggle} aria-expanded={isOpen}> {variation.description} </button> -->

<ul>
	{#each variations as variation}
		<li>
			<p>{variation.description}</p>
			<ul>
				{#each variation.actions as action }
					<li>{action}</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul li p {
		font-weight: bolder;
		border: 2px solid var(--color-base-light);
		padding: 0.7rem 1rem;
		border-radius: 0.6rem;
	}

	ul li ul {
		list-style: initial;
		padding-left: 1.5em;
	}


	/* button {
	
		width: 100%;
	
		margin-top: 1rem;
		background: transparent;
	}

	button:first-of-type {
		margin-top: 0;
	}

	ul {
		border: 2px solid var(--color-base-light);
		padding: 1.2rem 2rem;
		border-radius: 0 0 0.6rem 0.6rem;
		border-top: 0;
		margin-top: -0.3rem;
	} */
</style>
