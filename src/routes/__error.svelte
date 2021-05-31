<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	import ButtonLight from '$lib/shared/Button/ButtonLight.svelte';
	import SubmitButton from '$lib/shared/Button/SubmitButton.svelte';

	/** @type {number} */
	export let status;

	/** @type {Error} */
	export let error;
</script>

{#if status === 404}
	<h1>Pagina bestaat niet</h1>
	<p>De pagina die jij probeert te bereiken, bestaat niet.</p>
	<p>
		Probeer het nogmaals en neem anders contact op met de administrator. Deze gaat het proberen op
		te lossen.
	</p>

	<!-- TODO: You (eventually) want to go back to the previous route. This has to be stored somehow -->
	<a href="/"> Terug naar home </a>

	<form action="mailto:hi@example.org">
		<ButtonLight>Contact opnemen</ButtonLight>
	</form>
{:else}
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if error.stack}
		<pre>{error.stack}</pre>
	{/if}
{/if}

<style>
	h1 {
		margin-top: 2.5em;
	}
	form {
		text-align: center;
		margin-top: 1.5em;
	}
</style>
