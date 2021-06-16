<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { userStore } from '$lib/stores/user';

	export const load: Load = async ({ session, fetch }) => {
		if (session.authenticated) {
			const user = await userStore.getUser(fetch);
			const response = await fetch('/spellen.json');
			const games = response.ok ? await response.json() : undefined;

			return {
				props: {
					user,
					games
				}
			};
		}
		return {};
	};
</script>

<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import List from '$lib/views/List.svelte';
	import NoFavoriteCard from '$lib/cards/InfoCard.svelte';
	import LoginRequiredCard from '$lib/cards/LoginRequiredCard.svelte';
	import LogOutButton from '$lib/shared/button/LogOutButton.svelte';

	/* Stores */
	import { session as SessionStorage, page } from '$app/stores';
	import { onMount } from 'svelte';
	export let user;
	export let games: Game[];

	userStore.subscribe((newUser) => user = newUser);

	$: games =
		games && Array.isArray(games)
			? games.filter((game) => user.savedGames.includes(game.slug))
			: [];

	onMount(() => {
		if ('caches' in window) userStore.syncOffline();
	});

	const pathName = $page.path;
	const redirectPage = new URLSearchParams([['page', pathName]]);

	const isAuthenticated = $SessionStorage.authenticated;
</script>

<main class="leaves-bg gymles-main">
	<header>
		<h2>Mijn Gymles</h2>
		{#if isAuthenticated}
			<nav>
				<LogOutButton />
				<a href="https://jungle-gym-cms.herokuapp.com/admin/" target="_blank"
					><i class="material-icons">open_in_new</i>Jungle Gym CMS</a
				>
			</nav>
		{/if}
	</header>
	{#if games.length > 0}
		<List {games} />
	{:else}
		<NoFavoriteCard
			title="Je hebt nog geen spellen opgeslagen"
			message="In Mijn gymles kun je spellen opslaan, zodat je ze makkelijk terug te vinden, zelfs als je geen internet hebt"
		/>
	{/if}
	{#if !isAuthenticated}
		<LoginRequiredCard
			redirectPage={redirectPage.toString()}
			Message="Om 'Mijn Gymles' te gebruiken moet je eerst inloggen"
		/>
	{/if}
</main>

<style>
	header {
		display: flex;
		flex-flow: column-reverse;
	}

	header nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	header nav a {
		margin: 0 0.25em;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		padding: 0.75em;
		min-width: 7em;
		text-align: center;
		color: var(--color-accent-dark);
		border: none;
		border-radius: 0.5em;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(161, 161, 161, 0.3) 0px 1px 3px -1px;
		background-color: var(--color-light-grey);
	}

	header nav i {
		font-size: inherit;
		margin-right: 0.5em;
	}
</style>
