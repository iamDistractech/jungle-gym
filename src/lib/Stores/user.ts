import { derived, writable } from 'svelte/store';
import { session } from '$app/stores';
import type { Game } from '$lib/games';

interface User {
	name: string,
	admin: boolean, 
	username: string,
	savedGames: Game['slug'][]
}

function createUserStore() {	
	const { subscribe, set, update } = writable<User>(undefined)


	// User
	
	// // Saved Games
	// const savedGames: string[] = []
	// const savedGamesStore = writable(savedGames)

	// const addToGymles = (slug: string | string[]) => {
	// 	if(Array.isArray(slug))	savedGamesStore.update((savedGames) => [...new Set([...savedGames, ...slug])] )
	// 	else return savedGamesStore.update((savedGames) => [...new Set([...savedGames, slug])])
	// }

	// const { subscribe } = derived([userStore, savedGamesStore], ([$userStore, $savedGamesStore]) => {
	// 	const user = $userStore

	// 	// user.savedGames = $savedGamesStore
	// 	return user
	// })


	return {
		subscribe,
		clearUser: () : void => set(undefined),
		fetchUser: () : Promise<void> => getUserFromApi().then(set).then(() => undefined)
	};
}

async function getUserFromApi() : Promise<User> {
	const response = await fetch('/api/user.json')
	const body = await response.json()

	if(!response.ok) {
		// 401 (access token expired) should end the svelte session as well
		throw body
	}

	return body
}

export const user = createUserStore();
