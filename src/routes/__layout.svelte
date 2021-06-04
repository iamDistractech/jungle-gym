<script>
	import { page } from '$app/stores';
	import '../fonts.css';
	import '../app.css';

	$: pathName = $page.path;

</script>

<header>
	<h1>Jungle Gym</h1>
	<nav>
		<ul>
			<li><a class="{ pathName === '/' ? 'active-path' : ''}" href="/"><i class="material-icons">home</i>Home</a></li>
			<li><a class="{ /(spellen)/.test(pathName) ? 'active-path' : ''}" href="/spellen"><i class="material-icons">format_list_bulleted</i>Speloverzicht</a></li>
			<li><a href="#" class="{ pathName === '/inloggen' ? 'active-path' : ''}"><i class="material-icons">person</i>Inloggen</a></li>
		</ul>
	</nav>
</header>
<slot />

<style>
	
	header {
		padding-top: .5rem;
		margin-bottom: 2rem;
		box-shadow: 0 2px 6px 2px rgba(201, 201, 201, 0.2);
	}
	h1 {
		text-align: center;
		font-size: var(--font-heading-base-size) ;
		padding: 0;
		margin: 0;
	}

	header nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: stretch;
		
	}

	header nav li {
		flex: 1 1 auto
	}

	header nav a {
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .8em;
		/* font-weight: bolder; */
		padding: 1em;
		color: var(--color-accent-1);
	}

	header nav a i{
		font-size: 1em;
		margin-right: .2rem;
	}

	header nav a:hover,
	header nav a:focus {
		color: var(--color-accent-2)
	}
	header nav a.active-path {
		font-weight: bolder;
		color: var(--color-black)
	}
</style>
