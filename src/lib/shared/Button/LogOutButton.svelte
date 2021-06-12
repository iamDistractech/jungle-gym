<script>
	import { session as SessionStore } from '$app/stores';
	import { userStore } from '$lib/Stores/user';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	function logout() {
		return fetch('/account/uitloggen.json', { method: 'POST' })
			.then(() => SessionStore.set({ authenticated: false }))
			.then(() => userStore.clearUser())
			.then(() => dispatcher('logout'));
	}
</script>

<button on:click={logout}><i class="material-icons">logout</i>Uitloggen</button>

<style>
	button {
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

	button i {
		font-size: inherit;
		margin-right: 0.5em;
	}
</style>
