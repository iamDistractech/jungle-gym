import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	if (!cookies.session_id) request.locals.authenticated = false;
	else {
		const accessToken = await sessionDB.get(cookies.session_id);

		request.locals.accessToken = accessToken;
		request.locals.authenticated = true;
		request.locals.sessionId = cookies.session_id;
	}

	console.log(
		request.locals.authenticated
		? `User with ${request.locals.sessionId} made a request`
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

	if (request.locals.authenticated && request.locals.sessionId) {

		return {
			authenticated: true
		};
	} else
		return {
			authenticated: false
		};
};
