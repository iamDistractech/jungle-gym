import type { RequestHandler } from '@sveltejs/kit';
import { api } from '../api/_api';

export const get: RequestHandler = async (request) => {
	try {
		const response = await api(request, `games?${request.query.toString()}`);

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
		console.error('[spellen.json]:', error);
		return {
			status: 500,
			body: 'Internal Server Error'
		};
	}
};
