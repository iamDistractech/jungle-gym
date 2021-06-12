import type { Request, RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';
import { api } from '../api/_api';

export const post: RequestHandler = async (request: Request) => {
	const defaultServerError = {
		status: 500,
		body: 'Er ging iets fout op de server tijdens het inloggen'
	};

	if (!sessionDB) {
		console.error('[uitloggen.json]', 'SessionDB offline');
		return defaultServerError;
	}

	const { locals } = request;

	try {
		await api(request, 'auth/revoke');
	} catch (error) {
		console.error('[uitloggen.json]', error);
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
