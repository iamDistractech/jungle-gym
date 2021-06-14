import { writable } from 'svelte/store';
import type { Game } from '$lib/games';
import { deleteInCache, saveInCache } from '$lib/utils/offline';

interface User {
	name: string;
	admin: boolean;
	username: string;
	savedGames: Game['slug'][];
}

let user: User | undefined = undefined;

function createUserStore() {
	const { subscribe, set, update } = writable<User>(undefined);
	const savedGames = new Set([])

	/**
	 * Get the users details, fetches the users details if needed and updates the store
	 * @param inputFetch the `fetch` input parameter from the load method
	 * @returns the users details
	 */
	const getUser = async (inputFetch?): Promise<User> => {
		if (!user) user = await getUserFromApi(inputFetch);
		set(user);
		return user;
	};

	/**
	 * Clears a user from the store
	 */
	const clearUser = (): void => {
		user = undefined;
		set(undefined);
	};

	/**
	 * Saves a slug into the users details
	 * @param slug the slug of the game to save
	 */
	const saveGame = async (slug: string) : Promise<boolean> => {
		const success = await saveInCache(slug)
		if(success) {
			savedGames.add(slug)
			update((user) => {
				user.savedGames = [...savedGames]
				return user
			})
		}

		return success
	}

	/**
	 * Deletes a slug into the users details
	 * @param slug the slug of the game to save
	 */
	const removeGame = async (slug : string) : Promise<boolean> => {
		const success = await deleteInCache(slug)
		if(success) {
			savedGames.delete(slug)
			update((user) => {
				user.savedGames = [...savedGames]
				return user
			})
		}

		return success
	}

	return {
		subscribe,
		clearUser,
		saveGame,
		removeGame,
		getUser
	};
}

async function getUserFromApi(inputFetch): Promise<User> {
	const response = inputFetch ? await inputFetch('/api/user.json') : await fetch('/api/user.json');
	const body = await response.json();

	if (!response.ok) {
		// 401 (access token expired) should end the svelte session as well
		throw body;
	}

	body.savedGames = []

	return body;
}

export const userStore = createUserStore();
