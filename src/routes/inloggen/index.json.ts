import type { Request, RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import * as cookie from 'cookie';
import sessionDB from '$lib/Utils/sessionDB';
import { api } from '../api/_api';

export const post: RequestHandler = async (request: Request) => {
	const defaultServerError = {
		status: 500,
		body: 'Er ging iets fout op de server tijdens het inloggen'
	};

	if (!sessionDB) {
		console.error('[inloggen.json]', 'SessionDB offline');
		return defaultServerError;
	}

	try {
		const { username, password } = request.body;

		if (!username || !password) {
			console.error('[inloggen.json]', 'Missende gebruikersnaam of wachtwoord');
			return defaultServerError;
		}

		const response = await api(request, 'auth/token', { username, password }); // TODO password hash

		const serverSession =
			response.headers.has('content-type') &&
			/^(application\/json)/.test(response.headers.get('content-type'))
				? await response.json()
				: undefined;

		if (!response.ok && response.status === 401) {
			return {
				status: 401,
				body: 'Verkeerde gebruikersnaam of wachtwoord'
			};
		} else if (!response.ok) {
			return {
				status: response.status || 500,
				body: serverSession || 'Er ging iets fout op de server tijdens het inloggen'
			};
		}

		const accessToken =
			typeof serverSession['access_token'] === 'string' ? serverSession['access_token'] : undefined;
		const cookieId = uuidv4();

		if (!accessToken) {
			console.error('[inloggen.json]', 'Failed to find access token');
			return {
				status: 500,
				body: 'Er ging iets fout op de server tijdens het inloggen'
			};
		}

		const sessionSuccess = await sessionDB.set(cookieId, accessToken);

		if (sessionSuccess !== 'OK') {
			console.error('[inloggen.json]', 'Failed to set a session');
			return {
				status: 500,
				body: 'Er ging iets fout op de server tijdens het inloggen'
			};
		}

		const headers = {
			'Set-Cookie': cookie.serialize('session_id', cookieId, {
				httpOnly: true,
				maxAge: serverSession['expires_in'] / 1000,
				sameSite: true,
				path: '/'
			}),
			'content-type': 'application/json'
		};

		return {
			status: 200,
			headers,
			body: { message: 'success' }
		};
	} catch (error) {
		console.error('[inloggen.json]', error);

		return {
			status: 500,
			body: 'Er ging iets fout op de server tijdens het inloggen'
		};
	}
};
