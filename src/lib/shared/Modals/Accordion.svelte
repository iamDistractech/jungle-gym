<script lang="ts">
	import type { Game } from '$lib/games';
	import { slide } from 'svelte/transition';

	export let variations: Game['variation'];

	const open = variations.reduce((isOpen, variation) => {
		isOpen[variation.description] = false;
		return isOpen;
	}, {});

	const toggle = (description) => (open[description] = !open[description]);
</script>

<ul>
	{#each variations as variation}
		<li class="variation-item">
			<div on:click={() => toggle(variation.description)}>
				<p>{variation.description}</p>
				<i class="material-icons"> expand_more </i>
			</div>
			{#if open[variation.description]}
				<ul transition:slide={{ duration: 300 }}>
					{#each variation.actions as action}
						<li>{action}</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul li div {
		font-weight: bolder;
		border: 2px solid var(--color-base-light);
		padding: 0.7rem 1rem;
		border-radius: 0.6rem;
		display: flex;
		align-items: center;
	}

	ul li ul {
		list-style: initial;
		border: 2px solid var(--color-base-light);
		padding: 1.2rem 2rem;
		border-radius: 0 0 0.6rem 0.6rem;
		border-top: 0;
		margin-top: -0.3rem;
	}

	p {
		margin: 0;
		font-weight: 500;
	}

	.variation-item {
		margin-bottom: 1rem;
	}
</style>
