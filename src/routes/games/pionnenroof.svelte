<script lang="ts">
	import GamePage from '../../shared/GamePage.svelte';

	let game = {
		title: 'Pionnenroof',
		description:
			'Er worden twee teams gemaakt. De spelers uit 1 team zijn de rovers, de spelers uit het andere team zijn de tikkers. Beide teams beginnen aan hun eigen kant van het veld. De tikkers hebben voor hen een rij met pionnen. Voor de rovers is het doel om zoveel mogelijk pionnen te roven. Zodra een rover een pion heeft gepakt mag deze getikt worden door een tikker. De rover moet proberen zonder getikt te worden de pion over de eigen achterlijn te krijgen. Ben je wel getikt? Dan moet de pion weer teruggelegd worden. Hoeveel pionnen kunnen de rovers pakken binnen 2 minuten?',
		image: undefined,
		category: 'Tikspel',
		difficulty: 'Makkelijk',
		materials: ['20 pionnen of hoedjes', 'Eventueel lintjes', 'Klok voor tijd', 'Fluitje'],
		minimumAttendees: 2,
		audience: 'Alle jaarlagen',
		rules: [
			'Rover met pion over de eigen lijn? Pion houden',
			'Rover met pion getikt voordat eigen lijn bereikt is? Pion inleveren aan tikker',
			'Tikker mag rover pas tikker als deze een pion gepakt heeft'
		],
		differentiations: {
			easierForOne: {
				title: 'Makkelijker voor de tikkers/moeilijker voor de rovers',
				actions: [
					'1 leerling tegelijk laten roven',
					'Afstand tussen startlijn en tikker vergroten',
					'2 tikkers gebruiken'
				]
			},
			easierForTwo: {
				title: 'Moelijker voor de tikkers/makkelijker voor de rovers:',
				actions: ['Alle leerlingen tegelijk laten starten met roven', 'Speelveld kleiner maken']
			}
		}
	};
</script>

<GamePage {game} />
