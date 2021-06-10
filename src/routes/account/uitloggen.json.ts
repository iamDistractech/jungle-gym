import type { Request, RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';
import { api } from '../_api';

export const get: RequestHandler = async (request: Request) => {
	const { locals } = request;

	if (!sessionDB)
		return {
			status: 500,
			body: { message: 'SessionDB offline' }
		};

	try {
		const revoke = await api(request, 'auth/revoke')
	} catch(error) {
		console.error(error)
	}

	await sessionDB.del(locals.sessionId);

	return {
		status: 200,
		headers: {
			'Set-Cookie': cookie.serialize('session_id', 'deleted', {
				httpOnly: true,
				expires: new Date(0),
				sameSite: true,
				path: '/'
			})
		},
		body: { message: 'success' }
	};
};
