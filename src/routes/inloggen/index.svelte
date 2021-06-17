<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		if (session.authenticated)
			return {
				status: 302,
				redirect: '/account'
			};

		return {};
	};
</script>

<script>
	import LoginForm from '$lib/account/LoginForm.svelte';
	import { goto } from '$app/navigation';
	import { session as sessionStore, page } from '$app/stores';
	import { messageStore } from '$lib/stores/message';

	const { query } = $page;
	const session = sessionStore;

	export let redirectPage;

	if (query.has('page') && query.get('page') === '/gymles') {
		redirectPage = query.get('page');
		messageStore.set('Je moet eerst inloggen om deze pagina te zien');
	}

	async function redirectToProfile() {
		// The session needs to be written (only once) due to a Svelte Bug. `goto()` doens't give the cookie on redirects
		session.set({ authenticated: true });
		try {
			goto(redirectPage ? redirectPage : '/gymles');
		} catch (error) {
			handleError(undefined);
		}
	}

	function handleFailure(event) {
		let error = event.detail;
		messageStore.set(error);
	}

	function handleError(event) {
		if (event.detail) messageStore.set(event.detail);
		else messageStore.set('Er ging iets mis met inloggen');
	}
</script>

<main class="leaves-bg gymles-main">
	<section>
		<h2>Inloggen bij Jungle Gym</h2>
		<LoginForm on:success={redirectToProfile} on:error={handleError} on:failure={handleFailure} />
	</section>
</main>

<style>
	section {
		margin: 0;
	}

	section h2 {
		font-size: 1.2em;
		margin-bottom: 1rem;
	}
</style>
