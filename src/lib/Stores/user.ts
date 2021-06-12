import { derived, writable } from 'svelte/store';
import { session } from '$app/stores';
import type { Game } from '$lib/games';

interface User {
	name: string,
	admin: boolean, 
	username: string,
	savedGames: Game['slug'][]
}

let user: User | undefined = undefined;

function createUserStore() {	
	const { subscribe, set, update } = writable<User>(undefined)

	/**
	 * Get the users details, fetches the users details if needed and updates the store
	 * @param inputFetch the `fetch` input parameter from the load method
	 * @returns the users details
	 */
	const getUser = async (inputFetch?) : Promise<User> => {
		if(!user) user = await getUserFromApi(inputFetch)
		set(user)
		return user
	}

	/**
	 * Clears a user from the store
	 */
	const clearUser = () : void => {
		user = undefined
		set(undefined)
	}

	return {
		subscribe,
		clearUser,
		getUser
	}
}

async function getUserFromApi(inputFetch) : Promise<User> {
	const response = inputFetch ? await inputFetch('/api/user.json') : await fetch('/api/user.json')
	const body = await response.json()

	if(!response.ok) {
		// 401 (access token expired) should end the svelte session as well
		throw body
	}

	return body
}

export const userStore = createUserStore();
