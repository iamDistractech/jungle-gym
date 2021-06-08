import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	if (!cookies.session_id || cookies.session_id === 'deleted') request.locals.authenticated = false;
	else {
		request.locals.authenticated = true;
		request.locals.session_id = cookies.session_id;
	}

	console.log(
		request.locals.authenticated
			? `User with ${request.locals.session_id} made a request`
			: `Request without logged in user`
	);

	const response = await resolve(request);

	return response;
};

export const getSession: GetSession = async (request) => {
	if (!sessionDB)
		return {
			user: null,
			error: 'SessionDB offline',
			authenticated: false
		};

	if (request.locals.authenticated && request.locals.session_id) {
		const userJSON = await sessionDB.get(request.locals.session_id);
		const user = typeof userJSON === 'string' ? JSON.parse(userJSON) : null;
		console.log('hook', user, request.locals.authenticated, request.locals.session_id);

		return {
			user,
			authenticated: true
		};
	} else
		return {
			authenticated: false
		};
};
