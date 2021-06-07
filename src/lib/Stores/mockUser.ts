import { writable } from 'svelte/store'

export const userStore = writable({
	username: 'johndoe',
	password: 'abce',
	name: 'John Doe',
	admin: false
})