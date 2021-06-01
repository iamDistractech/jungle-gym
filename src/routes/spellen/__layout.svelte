<nav>
	<a href="/">terug naar speloverzicht</a>
</nav>

<slot />

<style>
	nav a {
		text-decoration: none;
		font-size: 80%;
	}

	nav a::before {
		content: '<';
	}
</style>
