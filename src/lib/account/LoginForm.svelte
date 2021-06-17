<script lang="ts">
	import SubmitButton from '$lib/shared/button/SubmitButton.svelte';

	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	import { messageStore } from '$lib/stores/message';

	const dispatch = createEventDispatcher();

	let username: string;
	let password: string;

	let offline = false;

	onMount(() => {
		if (!navigator.onLine) {
			offline = true;
			dispatch('error', 'Je kan niet inloggen wanneer je offline bent');
		} else offline = false;
	});

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
			const { message = 'Er ging iets mis met inloggen' } = await response.json()

			if (response.ok) {
				messageStore.set('Je bent nu ingelogd');
				dispatch('success');
			} else {
				dispatch('failure', message);
			}
		} catch (error) {
			if (offline) dispatch('error', 'Je kan niet inloggen wanneer je offline bent');
			dispatch('error', error);
		}
	}
</script>

<form on:submit|preventDefault={login} action="/account/inloggen.json" method="POST">
	<label for="username">Gebruikersnaam:</label>
	<input
		bind:value={username}
		name="username"
		type="text"
		autocorrect="off"
		autocapitalize="none"
		disabled={offline}
	/>
	<label for="password">Wachtwoord:</label>
	<input bind:value={password} name="password" type="password" disabled={offline} />
	<SubmitButton>Inloggen</SubmitButton>
</form>

<style>
	form {
		display: flex;
		flex-flow: column nowrap;
		margin: 0 auto;
		height: 50vh;
	}

	form label {
		padding-bottom: 0.2em;
	}

	form input {
		margin-bottom: 15px;
		border-radius: 1em;
		padding: 0.5em 1.3em;
		widows: 100%;
		border: 2px solid var(--color-base-light);
		outline: none;
	}

	form input:focus {
		border-color: var(--color-base-normal);
	}
</style>
