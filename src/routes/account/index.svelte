<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ session, page }) => {
		const { user, authenticated } = session;

		if (!authenticated) {
			const query = new URLSearchParams();
			query.append('page', page.path);

			return {
				status: 302,
				redirect: `/account/inloggen?${query.toString()}`
			};
		}

		return {
			props: {
				user
			}
		};
	};
</script>


<script lang='ts'>
import { goto } from '$app/navigation';
import { session } from '$app/stores';

const sessionData = $session

export let user;

	function logout() {
		return fetch('/account/uitloggen.json').then(() => goto('/?logout=true'))
	}

</script>

<h1>Hello {user.name}</h1>

<section>
	<button on:click={logout}>Uitloggen</button>
</section>
