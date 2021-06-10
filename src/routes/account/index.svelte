<script lang="ts">
	import { goto } from '$app/navigation';
	import { session as sessionStore } from '$app/stores';

	const session = sessionStore;

	let user = $sessionStore.user;

	function logout() {
		return fetch('/account/uitloggen.json')
			.then(() => session.set({ authenticated: false }))
			.then(() => goto('/'));
	}
</script>

<h1>Hello {user.name}</h1>

<section>
	<button on:click={logout}>Uitloggen</button>
</section>
