<script>
	import { goto } from '$app/navigation';
	import LoginForm from '$lib/account/LoginForm.svelte'

	export let error;

	function redirectToProfile(){
		goto('/')
	}

	function handleError(event){
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