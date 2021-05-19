<script lang="ts">
	import GamePage from '../../shared/GamePage.svelte';

	let game = {
		title: 'Leeuwenkooi',
		description:
			'Er worden twee tikkers gekozen, dit zijn de leeuwen. Beiden gaan in hun eigen vak staan. Alle andere leerlingen zijn de lopers en beginnen op de beginlijn. Deze leerlingen pakken allemaal een eigen stuk vlees (hoedje). Het doel is om als loper langs de twee leeuwen het vlees op de barbecue te krijgen. Hiervoor moet je aan de overkant zien te komen zonder getikt te worden. Word je toch getikt? Dan moet je het stuk vlees in het leeuwenhol leggen en moet je bij de slager een nieuw stuk vlees halen om het opnieuw te proberen. Lukt het om voorbij de leeuwen te komen en niet getikt te worden? Dan mag het stuk vlees op de barbecue. Het spel is afgelopen als alle stukken vlees op zijn',
		image: undefined,
		category: 'Tikspel',
		difficulty: 'Makkelijk',
		materials: ['Twee lintjes', '20 hoedjes', '3 hoepels', 'Fluitje'],
		minimumAttendees: 5,
		audience: 'Alle jaarlagen',
		rules: [
			'Leeuwen mogen alleen in hun kooi tikken',
			'Lopers mogen maar 1 stuk vlees per keer meenemen'
		],
		differentiations: {
			easierForOne: {
				title: 'Makkelijker voor tikkers',
				actions: ['Veld kleiner maken', 'Meer leeuwen per kooi']
			},
			easierForTwo: {
				title: 'Moeilijker voor tikkers',
				actions: ['Veld groter maken', 'Minder leeuwen per kooi']
			}
		}
	};
</script>

<GamePage {game} />
