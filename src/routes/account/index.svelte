<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/Stores/user';
	import { session as SessionStore } from '$app/stores'
	
	export let user;
	$: console.log(user)

	userStore.subscribe((newUserData) => {if(newUserData) user = newUserData});

	function logout() {
		return fetch('/account/uitloggen.json', {method: 'POST'})
			.then(() => SessionStore.set({ authenticated: false }))
			.then(() => goto('/'));
	}
</script>

{#if user}
<h1>Hello {user.name}</h1>
{/if}

<section>
	<button on:click={logout}>Uitloggen</button>
</section>