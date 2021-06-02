<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({session, page}) => {
		const { query } = page
		const redirectPage = query.get('page')

		console.log(session)

		if(session.authenticated) return {
			status: 302,
			redirect: '/account'
		}

		return {
			props: {
				redirectPage
			}
		}

	}
</script>

<script>
	import { goto } from '$app/navigation';
	import LoginForm from '$lib/account/LoginForm.svelte'
	import { session } from "$app/stores";

	// Session is a workaround of a Svelte bug
	let currentSession = $session;

	export let redirectPage
	export let error

	function redirectToProfile(event){
		// The session needs to be written (only once) due to a Svelte Bug. `goto()` doens't give the cookie on redirects
		session.set({authenticated: true, user: event.detail.user})
		if(redirectPage) goto(redirectPage)
		goto('/account')
	}

	function handleError(event){
		console.log(event.detail)
		error = event.detail.message
	}

</script>


<main>
	<h1>Inloggen bij Jungle Gym</h1>
	<LoginForm on:success={redirectToProfile} on:error={handleError} on:failure={handleError} />
</main>

{#if error} 
	<p>{error}</p>
{/if}

{#if redirectPage} 
	<p>Please login first to view this page</p>
{/if}

