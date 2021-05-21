<script lang="ts">
	import GamePage from '../../components/pages/GamePage.svelte';

	let game = {
		title: 'Fopbal',
		description:
			'Maak een grote kring met één iemand in het midden (de fopper), die heeft de bal. De leerlingen in de kring (de vangers) houden de handen achter de rug. De leerling in het midden mag steeds de bal echt of nep (fop) gooien. Gooit de leerling nep, maar komen jouw handen wel zichtbaar achter jouw rug vandaag? Dan ben je af en ga je zitten. Gooit de leerling de bal echt maar vang jij deze niet? Dan ben je ook af en ga je zitten. Vang je de bal wel of blijven je handen netjes achter je rug als de fopper jou fopt? Dan blijf je meedoen. De laatste die over blijft wint en wordt de nieuwe fopper nemen.',
		image: undefined,
		category: 'Balspel',
		difficulty: 'Makkelijk',
		materials: ['Een bal', 'Fluitje'],
		minimumAttendees: 3,
		audience: 'Alle jaarlagen',
		rules: ['Bal onderhands gooien', 'Een slecht aangegooide bal telt niet. Opnieuw proberen'],
		differentiations: {
			easierForOne: {
				title: 'Makkelijker',
				actions: [
					'Alle leerlingen in de kring hebben een extra kans. Tweede keer fout gemaakt? Dan pas ben je echt af en ga je zitten',
					'Kring groter maken om afstand van het gooien te vergroten'
				]
			},
			easierForTwo: {
				title: 'Moeilijker',
				actions: ['Kring kleiner maken om afstand van gooien te verkleinen']
			}
		}
	};
</script>

<GamePage {game} />
