<script>
	import { page } from '$app/stores';
	import Snackbar from '$lib/shared/Snackbar/Snackbar.svelte';
	import '../fonts.css';
	import '../app.css';

	import { session as sessionStore } from '$app/stores';

	let authenticated = false;

	sessionStore.subscribe((session) => (authenticated = session.authenticated));

	$: pathName = $page.path;
</script>

<header>
	<div>
		<img src="/logo-512.png" alt="Logo Jungle Gym" />
		<h1>Jungle Gym</h1>
	</div>
	<nav>
		<ul>
			<li>
				<a class={pathName === '/' ? 'active-path' : ''} href="/"
					><i class="material-icons">home</i>Home</a
				>
			</li>
			<li>
				<a class={/(spellen)/.test(pathName) ? 'active-path' : ''} href="/spellen"
					><i class="material-icons">format_list_bulleted</i>Speloverzicht</a
				>
			</li>
			{#if authenticated}
				<li>
					<a href="/account" class={pathName === '/account' ? 'active-path' : ''}
						><i class="material-icons">person</i>Account</a
					>
				</li>
			{:else}
				<li>
					<a href="/inloggen" class={pathName === '/inloggen' ? 'active-path' : ''}
						><i class="material-icons">person</i>Inloggen</a
					>
				</li>
			{/if}
		</ul>
	</nav>
</header>
<slot />

<Snackbar />

<style>
	header {
		padding-top: 0.5rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 2px 6px 2px rgba(201, 201, 201, 0.2);
		background-color: var(--color-white);
	}

	header > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	header > div img {
		width: 2.5em;
		padding-right: 1rem;
	}
	header > div h1 {
		text-align: center;
		font-size: var(--font-heading-base-size);
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
		flex: 1 1 auto;
	}

	header nav a {
		--active-underline-color: var(--color-white);
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		padding: 1em;
		color: var(--color-base-normal);
		border-bottom: solid 2px var(--active-underline-color);
	}

	header nav a i {
		font-size: 1em;
		margin-right: 0.2rem;
	}

	header nav a:hover,
	header nav a:focus {
		color: var(--color-accent-action);
	}
	header nav a.active-path {
		--active-underline-color: var(--color-black);
		font-weight: bolder;
		color: var(--color-black);
	}
</style>
