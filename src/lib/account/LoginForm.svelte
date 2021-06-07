<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {onMount} from 'svelte'
	
	const dispatch = createEventDispatcher();

	let username: string;
	let password: string;

	let offline = false

	onMount(() => {
		if(!navigator.onLine) {
			offline = true
			dispatch('error', 'Je kan niet inloggen wanneer je offline bent')
		}
	})

	async function login() {
		try {
			const init = {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await fetch('/inloggen.json', init);

			if (response.ok) {
				const body = await response.json();
				dispatch('success', body);
			} else {
				dispatch('failure', await response.json());
			}
		} catch (error) {
			if(offline) dispatch('error', 'Je kan niet inloggen wanneer je offline bent')
			dispatch('error', error);
		}
	}
</script>

<form on:submit|preventDefault={login} action="/account/inloggen.json" method="POST">
	<label for="username">Gebruikersnaam</label>
	<input bind:value={username} name="username" type="text" disabled="{offline}" />
	<label for="password">Wachtwoord</label>
	<input bind:value={password} name="password" type="text" disabled="{offline}" />
	<button type="submit">Inloggen</button>
</form>

<style>
	form {
		display: flex;
		flex-flow: column nowrap;
		max-width: 80%;
		margin: 0 auto;
	}

	form input {
		margin-bottom: 15px;
	}
</style>
