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
			<li><a href="/">Inloggen</a></li>
		</ul>
	</nav>
</header>
<slot />

<style>
	header {
		margin-top: 1.5rem;
		margin-bottom: 2rem;
	}
	h1 {
		text-align: center;
		margin: 0.5em;
		padding: 0;
	}

	header nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		gap: 30px;
	}

	nav a {
		text-decoration: none;
		color: var(--color-light-orange-hover);
		position: relative;
		display: block;
		padding: 0.8em 0;
		letter-spacing: 1px;
		transition: color 0.1s, background-color 0.1s, padding 0.2s ease-in;
	}

	a:hover,
	a:focus,
	a:active {
		color: var(--color-black);
		text-decoration: none;
	}

	a::before {
		content: '';
		position: absolute;
		bottom: 10%;
		left: 0;
		height: 0.1em;
		width: 100%;
		background-color: var(--color-black);
		transform-origin: right top;
		transform: scale(0, 1);
		transition: color 0.1s, transform 0.2s ease-out;
	}
	a:active::before {
		background-color: var(--color-black);
	}
	a:hover::before,
	a:focus::before {
		transform-origin: left top;
		transform: scale(1, 1);
	}
</style>
