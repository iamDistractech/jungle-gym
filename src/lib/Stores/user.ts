import { derived } from 'svelte/store';
import { session } from '$app/stores';

function createUserStore() {
	// const { subscribe, set, update  } = writable(null)

	const { subscribe } = derived(session, ($session, set) => {
		if ($session.authenticated) {
			// auth! get user data!
			fetch('/api/user.json').then(async (res) => {
				if (res.ok) {
					const user = await res.json();
					set(user);
				}
			});
		} else {
			// not auth any more, so remove user data
			set(undefined);
		}
	});

	return {
		subscribe
	};
}

export const userStore = createUserStore();
