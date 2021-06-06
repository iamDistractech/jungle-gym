<script context="module" lang="ts">
	export function load(): { props: { error?: Record<symbol, symbol>; status?: number } } {
		return {
			props: {}
		};
	}
</script>

<header>
	<h1>Spel niet offline beschikbaar</h1>
</header>
<main>
	<p>Dit spel is niet gedownload en dus niet offline beschikbaar.</p>
</main>

<style>
	header h1 {
		font-size: 1.5em;
		font-weight: 600;
		font-family: var(--font-heading);
		margin-top: 0.2em;
	}
</style>
