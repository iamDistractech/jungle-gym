import type { Request, RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';

export const get: RequestHandler = async (request: Request) => {
	const { locals } = request;

	if (!sessionDB)
		return {
			status: 500,
			body: { message: 'SessionDB offline' }
		};

	await sessionDB.del(locals.session_id);

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
