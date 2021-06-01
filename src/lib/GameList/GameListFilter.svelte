<script lang="ts">
	import GameListPopup from '$lib/GameList/GameListPopup.svelte';
	import FilterButton from '$lib/Button/FilterButton.svelte';
	import { goto } from '$app/navigation';

	export let query: URLSearchParams;

	let gameNames = [
		{
			name: 'Tikspel',
			value: 'tikspel'
		},
		{
			name: 'balspel',
			value: 'balspel'
		},
		{
			name: 'loopspel',
			value: 'loopspel'
		},
		{
			name: 'reactiespel',
			value: 'reactiespel'
		}
	];

	let groupNames = [
		{
			name: 'Groep 1',
			value: 1
		},
		{
			name: 'Groep 2',
			value: 2
		},
		{
			name: 'Groep 3',
			value: 3
		},
		{
			name: 'Groep 4',
			value: 4
		},
		{
			name: 'Groep 5',
			value: 5
		},
		{
			name: 'Groep 6',
			value: 6
		},
		{
			name: 'Groep 7',
			value: 7
		},
		{
			name: 'Groep 8',
			value: 8
		},
		{
			name: 'Alle groep',
			value: 'all'
		}
	];

	let childrenCount = [
		{
			name: '1 - 10 leerlingen',
			value: 1
		},
		{
			name: '11 - 20 leerlingen',
			value: 11
		},
		{
			name: '21 - 30 leerlingen',
			value: 21
		},
		{
			name: '31 - 40 leerlingen',
			value: 31
		}
	];

	let materialNames = [
		{
			name: 'pionnen'
		},
		{
			name: 'voetbal'
		},
		{
			name: 'lintjes'
		},
		{
			name: 'fluit'
		}
	];

	let open = false;

	function showDropdown() {
		open = !open;
	}

	let category = false;
	let targetGroup = false;
	let minimumPlayers = false;
	let materialen = false;

	const resetAllFilters = () => {
		goto('/spellen');
	};
</script>

<section>
	<button
		class="no-transform-button"
		on:click={showDropdown}
		class:border-change-close={!open}
		class:border-change-open={open}
	>
		Filter
		<img src="../icons/filter.svg" alt="Filter icon" />
		<img
			class:dropdown-close={open}
			class:dropdown-open={!open}
			src="../icons/dropdown.svg"
			alt="Dropdown icon"
		/>
	</button>
	<article class:filter-options-close={!open} class:filter-options-open={open}>
		<FilterButton filterTitle="Spelsoort" on:click={() => (category = !category)} />
		<!-- Disabled filters for now -->
		<!-- <FilterButton filterTitle="Groepen" on:click={() => (targetGroup = !targetGroup)} /> -->
		<!-- <FilterButton
			filterTitle="Minumum spelers"
			on:click={() => (minimumPlayers = !minimumPlayers)}
		/> -->
		<!-- <FilterButton filterTitle="materialen" on:click={() => (materialen = !materialen)} /> -->

		<p on:click={resetAllFilters}>Reset filters</p>
	</article>
</section>

{#if category}
	<GameListPopup
		filterTitle="category"
		filterItems={gameNames}
		activeQueries={query.getAll('category')}
		on:close={() => (category = !category)}
	/>
{/if}

{#if targetGroup}
	<GameListPopup
		filterTitle="targetGroup"
		filterItems={groupNames}
		on:close={() => (targetGroup = !targetGroup)}
	/>
{/if}

{#if minimumPlayers}
	<GameListPopup
		filterTitle="minimumPlayers"
		filterItems={childrenCount}
		on:close={() => (minimumPlayers = !minimumPlayers)}
	/>
{/if}

{#if materialen}
	<GameListPopup
		filterTitle="materialen"
		filterItems={materialNames}
		on:close={() => (materialen = !materialen)}
	/>
{/if}

<style>
	button {
		font-family: var(--font-heading);
		font-size: 1em;
		border-radius: 1em;
		cursor: pointer;
		border: none;
	}

	section button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-light-orange);
		padding: 0em 1em;
		width: 100%;
		height: 3em;
	}

	section button img:nth-of-type(1) {
		padding: 0em 0.5em;
		width: 1.1em;
		height: 1.1em;
	}

	.dropdown-close {
		padding: 0em 0.5em;
		margin-left: auto;
		width: 0.75em;
		height: 0.75em;
		transform: rotate(180deg);
		transition: transform 200ms linear;
	}

	.dropdown-open {
		padding: 0em 0.5em;
		margin-left: auto;
		width: 0.75em;
		height: 0.75em;
		transform: rotate(0deg);
		transition: transform 200ms linear;
	}

	article {
		background-color: var(--color-light-orange);
		border-radius: 0em 0em 2em 2em;
	}

	article p {
		text-align: end;
	}

	.filter-options-open {
		max-height: 31.25em;
		padding: 1.5em 1em 0;
		overflow: hidden;
		transition: max-height 0.25s ease-in, padding 0.25s ease-in;
	}

	.filter-options-close {
		max-height: 0;
		padding: 0 1em;
		transition: max-height 0.15s ease-out, padding 0.15s ease-out;
		overflow: hidden;
	}

	.border-change-close {
		border-radius: 1em;
		transition: border-radius 0.1s ease-in 0.1s;
	}

	.border-change-open {
		border-radius: 1em 1em 0em 0em;
	}
</style>
