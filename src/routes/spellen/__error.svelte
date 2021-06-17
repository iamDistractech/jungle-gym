<script context="module" lang="ts">
	export function load(): { props: { error?: Record<symbol, symbol>; status?: number } } {
		return {
			props: {}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';

	let offline = false;
	onMount(() => {
		if (!navigator.onLine) offline = true;
		else offline = false;
	});
</script>

<header>
	<h1>Spel niet opgeslagen</h1>
</header>
<main>
	<p>Dit spel is niet opgeslagen in MijnGymles en dus niet offline beschikbaar.</p>
</main>

<style>
	header h1 {
		font-size: 1.5em;
		font-weight: 600;
		font-family: var(--font-heading);
		margin-top: 0.2em;
	}
</style>
