<script>
	import '../fonts.css';
	import '../app.css';
</script>

<header>
	<h1>Jungle Gym</h1>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/spellen">Speloverzicht</a></li>
			<li><a href="/login">Inloggen</a></li>
		</ul>
	</nav>
</header>
<slot />

<style>
	header {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}
	h1 {
		text-align: center;
		margin: 0;
		padding: 0;
	}

	header nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	nav a {
		text-decoration: none;
		color: var(--color-black);
	}
</style>
