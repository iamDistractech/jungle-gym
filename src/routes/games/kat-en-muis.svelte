<script>
	import ButtonLight from '../../lib/Button/ButtonLight.svelte';

	const game = {
		title: 'Kat en Muis',
		description:
			'Er wordt een kat gekozen, de rest is een muis. Ben je een muis, dan stop je een lintje in je broek, zodat het lijkt op een staart. Het doel van het spel is dat de katten de muizen vangen. Dit doen ze door een lintje uit de broek te trekken. Als dit is gelukt moet het lintje aan de juf of meester gegeven worden. Is jouw lintje afgepakt? Dan ga je aan de kant zitten. Het spel is afgelopen als alle lintjes gepakt zijn.',
		image: undefined,
		category: 'Tikspel',
		difficulty: 'Makkelijk',
		materials: ['Lintjes', 'Fluitje'],
		minimumAttendees: 5,
		audience: 'Alle jaarlagen',
		rules: ['Lintje moet zichtbaar zijn voor de kat'],
		differentiations: {
			easierForCat: {
				title: 'Makkelijker kat/moeilijker muis',
				actions: [
					'Met meerdere katten beginnen',
					'Af? Dan word je ook een kat (bij een groep van 15 tot 30 leerlingen)',
					'Iedereen is een kat en iedereen is een muis, wordt jouw lintje afgepakt dan probeer je zo snel mogelijk een nieuw lintje af te pakken. Heb je een staart en pak je er nog een af, dan doe je die schuin om je nek.'
				]
			},
			easierForMouse: {
				title: 'Moeilijker kat/makkelijker muis',
				actions: [
					'Met minder katten beginnen',
					'Staarten korter, meer in de broek stoppen',
					'Af? Dan aan de kant staan'
				]
			}
		}
	};
</script>

<header>
	<h1>{game.title}</h1>
	<button>&larr;</button>
</header>

<div class="image-card" />

<main>
	<div class="main-content-header">
		<h2>{game.category} | {game.title}</h2>
		<small>{game.audience} | {game.difficulty}</small>
	</div>

	<p>{game.description}</p>

	<h3>Materialen</h3>
	<div class="material-list">
		{#each game.materials as material}
			<ButtonLight>{material}</ButtonLight>
		{/each}
	</div>

	<h3>Spelregels</h3>
	<ol>
		{#each game.rules as rule}
			<li>{rule}</li>
		{/each}
	</ol>

	<h3>Differentiaties</h3>

	<h4>{game.differentiations.easierForCat.title}</h4>
	<ul>
		{#each game.differentiations.easierForCat.actions as action}
			<li>
				{action}
			</li>
		{/each}
	</ul>

	<h4>{game.differentiations.easierForMouse.title}</h4>
	<ul>
		{#each game.differentiations.easierForMouse.actions as action}
			<li>
				{action}
			</li>
		{/each}
	</ul>
</main>

<ButtonLight>Spel opslaan</ButtonLight>

<style>
	header {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: flex-end;
		padding: 1.5em 0;
	}

	header h1 {
		font-size: 1.5em;
		font-weight: 600;
		font-family: var(--font-heading);
	}

	header button {
		border-radius: 50%;
		background-color: var(--color-white);
		border: 1px solid var(--color-dark-blue);
		height: 2.5em;
		width: 2.5em;
		margin-right: 2.5em;
	}

	.image-card {
		background-color: var(--color-turquoise);
		height: 15em;
		border-radius: 1.5em;
	}

	.material-list {
		display: flex;
	}

	.main-content-header {
		display: flex;
		flex-direction: column-reverse;
		margin-top: 1em;
	}

	.main-content-header small {
		font-size: 1em;
		color: var(--color-grey);
	}

	.main-content-header h2 {
		margin-bottom: 0;
	}
</style>
