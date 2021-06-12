import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export const get: RequestHandler = async (request) => {
	try {
		const response = await api(request, 'user');

		if (response.ok) {
			return {
				body: await response.json()
			};
		} else {
			return {
				status: response.status,
				body:
					response.body &&
					response.headers.has('Content-Type') &&
					response.headers.get('Content-Type') === 'application/json'
						? await response.json()
						: response.body
			};
		}
	} catch (error) {
		console.error('[user.json]:', error);
		return {
			status: 500,
			body: 'Internal Server Error'
		};
	}
};
