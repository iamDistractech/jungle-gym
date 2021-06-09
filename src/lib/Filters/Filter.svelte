<script lang="ts">
	import FilterPopup from '$lib/Filters/FilterPopup.svelte';
	import FilterButton from '$lib/shared/Button/FilterButton.svelte';
	import { goto } from '$app/navigation';

	export let query: URLSearchParams;

	let gameNames = [
		{
			name: 'Tikspel',
			value: 'Tikspel'
		},
		{
			name: 'Balspel',
			value: 'Balspel'
		},
		{
			name: 'Loopspel',
			value: 'Loopspel'
		},
		{
			name: 'Reactiespel',
			value: 'Reactiespel'
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
			name: 'Pionnen',
			value: 'Pion'
		},
		{
			name: 'Voetbal',
			value: 'Bal'
		},
		{
			name: 'Lintjes',
			value: 'Lintje'
		},
		{
			name: 'Fluit',
			value: 'Fluitje'
		},
		{
			name: 'Hoepel',
			value: 'Hoepel'
		},
		{
			name: 'Stopwatch',
			value: 'Stopwatch'
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

	const resetAllFilters = (event) => {
		event.preventDefault();
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
		<i class="material-icons">filter_list</i>
		<i class:dropdown-close={!open} class:dropdown-open={open} class="material-icons">expand_more</i
		>
	</button>
	<article class:filter-options-close={!open} class:filter-options-open={open}>
		<FilterButton filterTitle="Spelsoort" on:click={() => (category = !category)} />
		<FilterButton filterTitle="Groepen" on:click={() => (targetGroup = !targetGroup)} />
		<FilterButton
			filterTitle="Minimum spelers"
			on:click={() => (minimumPlayers = !minimumPlayers)}
		/>
		<FilterButton filterTitle="Materialen" on:click={() => (materialen = !materialen)} />

		<div>
			<a href="/spellen" on:click={resetAllFilters}
				>Reset filters<i class="material-icons">cached</i></a
			>
		</div>
	</article>
</section>

{#if category}
	<FilterPopup
		filterTitle="Spelsoort"
		filterItems={gameNames}
		filterQuery="category"
		activeQueries={query.getAll('category')}
		on:close={() => (category = !category)}
	/>
{/if}

{#if targetGroup}
	<FilterPopup
		filterTitle="Groepen"
		filterItems={groupNames}
		filterQuery="targetGroup"
		activeQueries={query.getAll('targetGroup')}
		on:close={() => (targetGroup = !targetGroup)}
	/>
{/if}

{#if minimumPlayers}
	<FilterPopup
		filterTitle="Minimum Spelers"
		filterItems={childrenCount}
		filterQuery="minimumPlayers"
		activeQueries={query.getAll('minimumPlayers')}
		on:close={() => (minimumPlayers = !minimumPlayers)}
	/>
{/if}

{#if materialen}
	<FilterPopup
		filterTitle="Materialen"
		filterItems={materialNames}
		filterQuery="material"
		activeQueries={query.getAll('material')}
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
		background-color: var(--color-base-light);
		padding: 0em 1em;
		width: 100%;
		height: 3em;
	}

	section button i:nth-of-type(1) {
		padding: 0em 0.5em;
		width: 1.1em;
		height: 1.1em;
	}

	.dropdown-close {
		padding: 0.2em 0.5em;
		margin-left: auto;
		width: 0.75em;
		height: 0.75em;
		transform: rotateX(180deg);
		transition: transform 200ms ease-in;
	}

	.dropdown-open {
		padding: 0 0.5em;
		margin-left: auto;
		width: 0.75em;
		height: 0.75em;
		transform: rotateX(0deg);
		transition: transform 200ms ease-in;
	}

	article {
		background-color: var(--color-base-light);
		border-radius: 0em 0em 2em 2em;
	}

	article div a {
		display: flex;
		justify-content: flex-end;
		text-decoration: none;
		color: var(--color-black);
		padding: 0.5rem;
		cursor: pointer;
	}

	article div a i {
		padding-left: 0.3em;
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

	.no-transform-button:active {
		transform: none;
	}
</style>
