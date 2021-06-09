<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/* Components */
	import SubmitButton from '$lib/shared/Button/SubmitButton.svelte';
	import CancelButton from '$lib/shared/Button/CancelButton.svelte';

	/* Stores */
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { playerCount } from '$lib/Stores/playerCount';

	/* Animations */
	import { fade, fly } from 'svelte/transition';

	export let activeQueries;
	export let filterItems;
	export let filterTitle;
	export let filterQuery;

	let minimalPlayerCount;

	playerCount.subscribe((value) => {
		minimalPlayerCount = value;
	});

	const { query } = $page;

	const dispatch = createEventDispatcher();

	function closeFilter() {
		dispatch('close');
	}

	let filterButtons =
		filterQuery === 'targetGroup' ? activeQueries.map((query) => Number(query)) : activeQueries;

	let targetGroupAll = filterButtons.length === 8;

	function submitForm() {
		let queries = filterButtons.map((activeFilter) => [filterQuery, activeFilter]);
		const searchParams = new URLSearchParams(queries);
		for (const [key, value] of query.entries()) {
			if (key !== filterQuery) {
				searchParams.append(key, value);
			}
		}

		goto(`/spellen/?${searchParams.toString()}`).then(() => closeFilter());
	}

	function submitMinimalPlayerForm(minimalPlayerCount) {
		let queries = [filterQuery, minimalPlayerCount];
		const searchParams = new URLSearchParams([queries]);
		for (const [key, value] of query.entries()) {
			if (key !== filterQuery) {
				searchParams.append(key, value);
			}
		}

		goto(`/spellen/?${searchParams.toString()}`).then(() => closeFilter());
	}

	const decreaseCount = () => {
		playerCount.update((n) => n - 1);
	};
	const increaseCount = () => {
		playerCount.update((n) => n + 1);
	};

	function checkTargetGroupAll() {
		filterButtons = targetGroupAll ? [1, 2, 3, 4, 5, 6, 7, 8] : [];
	}
</script>

<section in:fly={{ y: 500, duration: 500 }} out:fly={{ y: 500, duration: 500 }}>
	<h1>Filter op <span>{filterTitle}</span></h1>
	{#if filterQuery !== 'minimumPlayers'}
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
				{#if filterQuery === 'targetGroup'}
					<input
						bind:checked={targetGroupAll}
						on:change={checkTargetGroupAll}
						type="checkbox"
						id="target-group-all"
						name="target-group-all"
					/>
					<label for="target-group-all"><span />Alle groepen</label>
				{/if}
			</fieldset>
			<SubmitButton>Toepassen</SubmitButton>
		</form>
	{:else}
		<form on:submit|preventDefault={() => submitMinimalPlayerForm(minimalPlayerCount)}>
			<fieldset class="min-player-fieldset">
				<div class="number">
					<span on:click={decreaseCount}>-</span>
					<input type="number" bind:value={minimalPlayerCount} />
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
		margin: 0;
		border-radius: 3em 3em 0em 0em;
	}

	section h1 {
		text-align: center;
		padding-bottom: 1em;
	}

	section h1 span {
		text-transform: capitalize;
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
		overflow: auto;
		height: 18em;
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

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input {
		height: 0em;
		width: 0em;
	}

	.number > input {
		height: 2em;
		width: 2em;
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
		border: 1px solid var(--color-base-light);
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
		border: 1px solid var(--color-base-light);
		color: var(--color-base-light);
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
		height: 5%;
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
			border-color: var(--color-base-light);
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
			border-color: var(--color-base-light);
			transform: translate3d(0, -0.5em, 0) rotate(45deg);
		}
	}
</style>
