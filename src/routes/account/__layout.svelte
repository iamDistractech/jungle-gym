<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ session, page }) => {
		const { authenticated } = session;

		if (!authenticated) {
			const query = new URLSearchParams();
			query.append('page', page.path);

			return {
				status: 302,
				redirect: `/inloggen?${query.toString()}`
			};
		}
		
		return {}
	};
</script>

<slot />
