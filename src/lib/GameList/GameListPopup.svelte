<script>
	import { createEventDispatcher } from 'svelte';
	import SubmitButton from '$lib/shared/Button/SubmitButton.svelte';
	import CancelButton from '$lib/shared/Button/CancelButton.svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	export let activeQueries;
	export let filterItems;
	export let filterTitle;

	const dispatch = createEventDispatcher();

	function closeFilter() {
		dispatch('close');
	}

	let filterButtons = activeQueries;

	function submitForm() {
		let queries = filterButtons.map((activeFilter) => [filterTitle, activeFilter]);

		const searchParams = new URLSearchParams(queries);
		goto(`/spellen/?${searchParams.toString()}`).then(() => closeFilter());
	}

	function submitMinimalPlayerForm(minimulPlayerCount) {
		let queries = [filterTitle, minimulPlayerCount];

		const searchParams = new URLSearchParams([queries]);
		goto(`/?${searchParams.toString()}`).then(() => closeFilter());
	}

	let minimulPlayerCount = 1;
	const decreaseCount = () => {
		minimulPlayerCount = minimulPlayerCount - 1;
	};
	const increaseCount = () => {
		minimulPlayerCount = minimulPlayerCount + 1;
	};
</script>

<section in:fly={{ y: 500, duration: 500 }} out:fly={{ y: 500, duration: 500 }}>
	<h1>Filter op {filterTitle}</h1>
	{#if filterTitle !== 'minimumPlayers'}
		<form on:submit|preventDefault={submitForm}>
			<fieldset>
				{#if filterItems}
					{#each filterItems as { name, value }}
						<input
							bind:group={filterButtons}
							type="checkbox"
							id={name}
							name="filter-group"
							{value}
						/>
						<label for={name}> <span />{name}</label>
					{/each}
				{/if}
			</fieldset>
			<SubmitButton>Toepassen</SubmitButton>
		</form>
	{:else}
		<form on:submit|preventDefault={() => submitMinimalPlayerForm(minimulPlayerCount)}>
			<fieldset class="min-player-fieldset">
				<div class="number">
					<span on:click={decreaseCount}>-</span>
					<input type="number" bind:value={minimulPlayerCount} />
					<span on:click={increaseCount}>+</span>
				</div>
			</fieldset>
			<SubmitButton>Toepassen</SubmitButton>
		</form>
	{/if}
	<CancelButton on:click={closeFilter}>Annuleren</CancelButton>
</section>
<div transition:fade class="black-overlay" on:click={closeFilter} />

<style>
	section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--color-white);
		z-index: 1;
		padding: 1em;
		border-radius: 3em 3em 0em 0em;
	}

	section h1 {
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		border: none;
		padding: 0;
		margin: 0;
		overflow-y: auto;
	}

	label {
		position: relative;
		display: flex;
		padding: 0.7em 2em;
		border: 1px solid var(--color-black);
		border-radius: 1em;
		cursor: pointer;
		margin: 0.3em 0;
		align-items: center;
		color: var(--color-black);
	}

	input {
		height: 0;
		width: 0;
	}

	input + label > span {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 1em;
		width: 1em;
		height: 1em;
		background: transparent;
		border: 1px solid var(--color-light-grey);
		border-radius: 2px;
		cursor: pointer;
		transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
	}

	input:checked + label > span {
		border: 1px solid var(--color-light-orange);
	}

	input:checked + label > span::before {
		content: '';
		position: absolute;
		top: 1.4em;
		left: 2.2em;
		border-right: 0.15em solid transparent;
		border-bottom: 0.15em solid transparent;
		transform: rotate(45deg);
		transform-origin: 0% 100%;
		animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
	}

	input:checked + label {
		border: 1px solid var(--color-light-orange);
		color: var(--color-light-orange);
	}

	.black-overlay {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-black);
		opacity: 0.7;
		z-index: 0;
	}

	.min-player-fieldset {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 2em 0;
	}

	.min-player-fieldset input {
		display: block;
		text-align: center;
		font-size: 1.6em;
		border: 1px solid var(--color-light-gray);
		border-radius: 0.4em;
	}

	.min-player-fieldset div {
		display: flex;
	}

	.min-player-fieldset div span {
		padding: 1em;
		background: var(--color-white);
		border-radius: 0.4em;
		border: 1px solid var(--color-light-gray);
		margin: 0em 0.4em;
		cursor: pointer;
	}

	@keyframes checkbox-check {
		0% {
			width: 0;
			height: 0;
			border-color: var(--color-light-orange);
			transform: translate3d(0, 0, 0) rotate(45deg);
		}
		33% {
			width: 0.2em;
			height: 0;
			transform: translate3d(0, 0, 0) rotate(45deg);
		}
		100% {
			width: 0.2em;
			height: 0.5em;
			border-color: var(--color-light-orange);
			transform: translate3d(0, -0.5em, 0) rotate(45deg);
		}
	}
</style>
