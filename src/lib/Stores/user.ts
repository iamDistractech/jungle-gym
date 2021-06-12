import { derived, writable } from 'svelte/store';
import { session } from '$app/stores';

function createUserStore() {
	// User
	const userStore = derived(session, ($session, set) => {
		console.log($session)
		if ($session.authenticated) {
			// auth! get user data!
			fetch('/api/user.json').then(async (res) => {
				if (res.ok) {
					const user = await res.json();
					set(user);
				}
			}).catch(console.error)
		} else {
			console.log('in uauth')
			// not auth any more, so remove user data
			set({});
		}
	});
	
	// Saved Games
	const savedGames: string[] = []
	const savedGamesStore = writable(savedGames)

	const addToGymles = (slug: string | string[]) => {
		if(Array.isArray(slug))	savedGamesStore.update((savedGames) => [...new Set([...savedGames, ...slug])] )
		else return savedGamesStore.update((savedGames) => [...new Set([...savedGames, slug])])
	}

	const { subscribe } = derived([userStore, savedGamesStore], ([$userStore, $savedGamesStore]) => {
		const user = $userStore
		console.log($userStore)
		// user.savedGames = $savedGamesStore

		// console.log(user)
		return user
	})


	return {
		addToGymles,
		subscribe
	};
}

export const user = createUserStore();
