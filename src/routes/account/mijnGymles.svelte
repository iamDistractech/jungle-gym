<!-- <script>
/* Hier komt request naar API voor de favorieten data */
</script> -->
<script lang="ts">
	/* Typings */
	import type { Game } from '$lib/games';

	/* Components */
	import List from '$lib/GameViews/List.svelte';
	import NoFavoriteCard from '$lib/Cards/InfoCard.svelte';

	// export let games: Game[];
	// export let query;
</script>

<main class="leaves-bg">
	<!-- {#if favoriteGames}
	<List {games} {query} />
	{:else} -->
	<NoFavoriteCard
		Title="Je hebt nog geen spellen opgeslagen"
		Message="Mijn gymles functioneert als een bladwijzer om spellen op een makkelijke manier terug te vinden"
	/>
	<!-- {/if} -->
</main>
