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
	import { messageStore } from '$lib/Stores/message';

	const { query } = $page;
	const session = sessionStore;

	export let redirectPage;

	if (query.has('page')) {
		redirectPage = query.get('page');
		messageStore.set('Je moet eerst inloggen om deze pagina te zien');
	}

	function redirectToProfile() {
		// The session needs to be written (only once) due to a Svelte Bug. `goto()` doens't give the cookie on redirects
		session.set({ authenticated: true });
		goto(redirectPage ? redirectPage : '/account');
	}

	function handleError(event) {
		let error = event.detail.message;
		messageStore.set(error);
	}
</script>

<main class="leaves-bg">
	<section>
		<h2>Inloggen bij Jungle Gym</h2>
		<LoginForm on:success={redirectToProfile} on:error={handleError} on:failure={handleError} />
	</section>
</main>

<style>
	main {
		height: 100%;
	}
	section {
		margin: 0;
	}

	section h2 {
		font-size: 1.2em;
		margin-bottom: 1rem;
	}
</style>
