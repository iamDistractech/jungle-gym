<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";
	export const load: Load = ({session, page}) => {
		const {user, authenticated} = session

		if(!authenticated) {
			const query = new URLSearchParams()
			query.append('page', page.path)

			return {
				status: 302,
				redirect: `/account/inloggen?${query.toString()}`
			}
		}

		return {
			props: {
				user
			}
		}	
	}
</script>

<script>

	export let user

</script>


<h1>Hello {user.name}</h1>